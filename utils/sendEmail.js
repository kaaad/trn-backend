const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASSWORD
    }
});
  
const sendMail = async (to,otp) => {
    try {
      let info = await transporter.sendMail({
        from: process.env.MAIL_EMAIL,
        to: to,
        subject: 'Naria OTP ✔',
        html: `
        <div
          class="container"
          style="max-width: 90%; margin: auto; padding-top: 20px"
        >
          <h2>Welcome back.</h2>
          <h4>Here is you OTP ✔</h4>
          <p style="margin-bottom: 30px;">Pleas enter the login OTP to get started</p>
          <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
     </div>
      `,
      });
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
};

module.exports = sendMail;