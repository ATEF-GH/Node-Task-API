export default function errorHandler(err, req, res, next) {
  console.error("🔥 GLOBAL ERROR CAUGHT: ", err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message || "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}
