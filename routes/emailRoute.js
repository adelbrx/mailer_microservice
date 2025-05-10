const express = require("express");
const emailController = require("../controllers/emailController");

const router = express.Router();

router.post(
  "/send",
  emailController.uploadAttachment,
  emailController.sendEmail
);

exports.router = router;
