const nodemailer = require('nodemailer');

let sendMail = async (email, subject, message) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PSW
        }
    });
  
    var mailOptions = {
        from: process.env.EMAIL_ID,
        to: email,
        subject: subject,
        html: message
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })
};

module.exports = sendMail;
