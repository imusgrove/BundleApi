require('dotenv').config();
const sequelize = require('./db');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

//not sure what this does
// const connect = require('connect');


app.use(cors());
sequelize.sync();
//for json encoded bodies
app.use(bodyParser.json());
//for url encoded bodies
app.use(bodyParser.urlencoded({
    extended:true
}))


// app.use(require('./middleware/validate-session'));
app.use('/user', require('./controllers/usercontroller'));
app.use('/donor',  require('./controllers/donorcontroller'));
app.use('/donation', require('./controllers/donationcontroller')

);


require("./associations");

http.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
});

// nodemailer
// houses the data to send in the email
let transporter = nodemailer.createTransport({
    service: 'gmail',
  //   make true if using ssl certificate
    secure: false,
  //   stmp port
    port: 25,
    auth: {
      user: 'iesha.musgrove@gmail.com',
      pass: 'Victory3395'
    },
  //   protocol
    tls: {
      rejectUnauthorized: false
    }
  });
  // use to construct body of email
  let HelperOptions = {
    from: '"Iesha" <iesha.musgrove@gmail.com',
    to: 'iesha.musgrove@gmail.com',
    subject: 'dd',
    text: 'dd'
  };
  
  // contains callback data
    transporter.sendMail(HelperOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("The donation was sent!");
      console.log(info);
    });
  