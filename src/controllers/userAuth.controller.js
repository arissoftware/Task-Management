import { AppError } from "../errors/appError.js";
import bcrypt from "bcryptjs";
import { genToken } from "../utils/genToken.js";
import { db } from "../db/db.js";

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new AppError(400, "All fields are required");
  }

  const userExist = await db.user.findUnique({
    where: { email: email },
  });
  if (userExist) {
    throw new AppError(429, "User already exist");
  }

  if (password.length < 6) {
    throw new AppError(400, "Password cannot be less than 6 characters");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await db.user.create({
    data: {
      name,
      email,
      password: passwordHash,
    },
  });

  return res.status(201).json({
    success: true,
    message: "User created successfully, Please login to continue.",
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new AppError(400, "All fields are required");
  }

  const loginUser = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!loginUser) {
    throw new AppError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, loginUser.password);
  if (!isMatch) {
    throw new AppError(401, "Invalid email or password");
  }

  genToken(loginUser, res);

  return res.status(200).json({
    success: true,
    message: "Login successful",
  });
};

export const dashboard = async (req, res) => {
  const id = req.user.id;

  const user = await db.user.findUnique({
    where: { id: id },
  });

  return res.status(200).json({
    name: user.name,
    email: user.email,
  });
};
