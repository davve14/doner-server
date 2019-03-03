const express = require('express')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://doner-client.herokuapp.com/")
    res.header("Access-Control-Allow-Headers", "Content-Type")
    next();
  });

app.post('/sendmail', (req, res) => {
    const output = `
      <h2>New message from Berlin Döner DB</h2>
      <h3>Contact Details</h3>
      <ul>  
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
      </ul>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

    var smtpConfig = {
        service: 'zoho',
        auth: {
            user: 'professorimbiss@zoho.com',
            pass: 'zK599zCH!'
        }
    }
    var transporter = nodemailer.createTransport(smtpConfig)
    var mailOptions = {
        from: '"Professor Imbiss" <professorimbiss@zoho.com>',
        to: "professorimbiss@zoho.com",
        subject: "Message from Professor Imbiss",
        html: output
    }
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500)
            res.json(error)
            return console.log(error);
        }
        res.json('Email sent')
    })
})
app.listen(process.env.PORT || 3000, () => console.log('Server started...'));