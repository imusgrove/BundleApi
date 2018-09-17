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

//function for nodemailer
sendmail = function(request,response,next){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
         auth: {
             user: 'iesha.musgrove@gmail.com',
             pass: 'Victory!3395',
             host: 'smtp.gmail.com',
             ssl: true
         }
    });
    var mailOptions = {
        from: 'iesha.musgrove@gmail.com',
        to: request.body.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {
                alert(error);
            }else{
                alert('Email sent' + info.response);
            }
        });
        next();
}


// app.use(require('./middleware/validate-session'));
app.use('/user', require('./controllers/usercontroller'));
app.use('/donor', sendmail, require('./controllers/donorcontroller'));
app.use('/donation', require('./controllers/donationcontroller'));


require("./associations");

http.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
});