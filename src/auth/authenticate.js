import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError.js";
import "dotenv/config";
import { db } from "../db/db.js";

export const authenticate = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw new AppError(401, "Please login to continue");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new AppError(403, "Please login to continue");
  }

  const user = await db.user.findUnique({
    where: { email: decoded.email },
  });

  if (!user) {
    throw new AppError(403, "You are not authorized");
  }

  req.user = user;

  next();
};
