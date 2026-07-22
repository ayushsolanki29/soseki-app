const { Resend } = require("resend");
const { mail: mailConfig } = require("../config/app.config");

const resend = new Resend(mailConfig.resendApiKey);

const transporter = {
  sendMail: async (mailOptions) => {
    const { data, error } = await resend.emails.send({
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: mailOptions.html,
    });
    
    if (error) {
      throw new Error(error.message || "Resend error");
    }
    return data;
  }
};

module.exports = transporter;
