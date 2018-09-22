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
app.use('/donation', require('./controllers/donationcontroller'));


require("./associations");

http.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
});