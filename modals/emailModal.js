const juice = require("juice");
const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");

class Email {
  constructor(sender, receiver) {
    // INITIALIZE SENDER AND RECIEVER
    this.sender = sender;
    this.receiver = receiver;
  }

  createTransport() {
    return nodemailer.createTransport({
      host: this.sender.host,
      port: this.sender.port,
      auth: {
        user: this.sender.email,
        pass: this.sender.password,
      },
    });
  }

  //send the actual email
  async send(templateHTML, subject) {
    // INLINE CSS (OPTIONAL FOR EMAIL COMPOTIBILITY)
    const inlinedHTML = juice(templateHTML);

    // DEFINE EMAIL OPTIONS
    const mailOptions = {
      from: `${this.sender.username}" <${this.sender.email}>`,
      to: this.receiver.email,
      subject: subject,
      html: inlinedHTML,
      text: htmlToText.convert(inlinedHTML),
    };

    // CREATE A TRANSPORT AND SEND EMAIL
    await this.createTransport().sendMail(mailOptions);
  }
}

module.exports = Email;
