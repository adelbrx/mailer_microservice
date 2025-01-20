const express = require("express");
const cors = require("cors");
const emailRouter = require("./routes/emailRoute");
const globalErrorHandler = require("./controllers/errorController");

// INITIALIZE EXPRESS APP
const app = express();

// CORS Config
app.use(
  cors({
    origin: ["*"],
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);

// CONVERT JSON TO JAVASCRIPT OBJECT
app.use(express.json());

// ROUTES
app.use("/api/email", emailRouter.router);
app.all("*", (request, _) => {
  next(new AppError(`Can't find ${request.originalUrl} on this server!`, 404));
});

// ERROR HANDLER
app.use(globalErrorHandler);

module.exports = app;
