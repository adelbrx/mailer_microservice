## Email Sending API

### Endpoint

`POST /api/email/send`

### Description

This API is used to send an email using the specified SMTP credentials and email details.

### Request Body

The request body should be a JSON object with the following structure:

```json
{
  "subject": "", // Subject of the email
  "template": "", // Email content or template (HTML AND CSS)
  "usernameReceiver": "", // Receiver's name
  "emailReceiver": "", // Receiver's email address
  "usernameSender": "", // Sender's name
  "emailSender": "", // Sender's email address
  "passwordSender": "", // Sender's email password
  "host": "", // SMTP host (e.g., Gmail => smtp.gmail.com)
  "port": "" // SMTP port (e.g., 587 for TLS)
}
```

### Response

    200 OK: Email sent successfully.
    400 Bad Request: Missing or invalid parameters.
    500 Internal Server Error: Failed to send the email.

### Notes

    Ensure to replace passwordSender and sensitive details with environment variables for security.
    Use valid SMTP credentials for sending emails.
