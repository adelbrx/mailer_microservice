const express = require("express");
const emailRouter = require("./routes/emailRoute");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");

// INITIALIZE EXPRESS APP
const app = express();

// CORS Config
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "https://hadathi.netlify.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

// CORS Preflight (important for Vercel)
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.status(200).end();
});

// CONVERT JSON TO JAVASCRIPT OBJECT
// Allow large payloads (up to 10MB)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ROUTES
app.use("/api/email", emailRouter.router);
app.all("*", (request, _) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server!`, 404));
});

// ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
