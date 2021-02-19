var nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'william.automatic.emailer@gmail.com',
    pass: 'Mikkikisu04'
  }
});

const send_mail = () => {
    var mailOptions = {
    from: 'william.automatic.emailer@gmail.com',
    to: 'william.m.tuominiemi@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
}
