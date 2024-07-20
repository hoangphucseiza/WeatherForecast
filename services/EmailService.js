
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();


const sendEmailService =  async (user) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: "forecastweather230@gmail.com",
          pass: "vdtc yisl llfw jgrg",
        },
      });

      const IP = 'http://localhost:3000'; // Thay thế khi deploy
      const info = await transporter.sendMail({
        from: '"Weather Forecast" <forecastweather230@gmail.com>', 
        to: user.email, 
        subject: "Verify your Email...", 
        html: `<p>Hello ${user.email}, verify your email by clicking this link...</p>
        <a href='${IP}/emailToken=${user.emailToken}'>Verify Your Email</a>`, 
      }, (err, info) => {
          if(err) {
              console.log(err);
          } else {
              console.log("Email sent successfully!");
          }
      });
   
}

module.exports = sendEmailService;