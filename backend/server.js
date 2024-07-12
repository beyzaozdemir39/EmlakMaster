const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'beyzaozdemirr39@gmail.com',
    pass: '23525248764'
  }
});

app.post('/send-email', (req, res) => {
  const { to, subject, content } = req.body;

  const mailOptions = {
    from: 'beyzaozdemirr39L@gmail.com',
    to,
    subject,
    html: content
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
