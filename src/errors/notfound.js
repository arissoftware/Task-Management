export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `The url ${req.url} not found`,
  });
};
