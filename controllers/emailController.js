const Sender = require("../modals/emailSender");
const Reciever = require("../modals/emailReciever");
const Email = require("../modals/emailModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
exports.sendEmail = catchAsync(async (request, response, next) => {
  // EXTRACT DATA FROM REQUEST BODY
  const {
    subject,
    template,
    usernameReceiver,
    emailReceiver,
    usernameSender,
    emailSender,
    passwordSender,
    host,
    port,
  } = request.body;

  if (
    !subject ||
    !template ||
    !usernameReceiver ||
    !emailReceiver ||
    !usernameSender ||
    !emailSender ||
    !passwordSender ||
    !host ||
    !port
  ) {
    return next(new AppError("Please provide all the required fields", 403));
  }

  // CREATE SENDER
  const sender = new Sender(
    usernameSender,
    emailSender,
    passwordSender,
    host,
    port
  );

  // CREATE RECEIVER
  const receiver = new Reciever(usernameReceiver, emailReceiver);

  const email = new Email(sender, receiver);

  await email.send(template, subject);

  response.status(200).json({
    status: "success",
    message: "Email sent successfully!",
  });
});
