require('dotenv').config();
require('./db');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())
sequelize.sync();
app.use(bodyParser.json())
app.use('/user', require('./controllers/usercontroller'))
app.use(require('./middleware/validate-session'))
app.use('./donor', require('./controllers/donorcontroller'))
app.use('./donation', require('./controllers/donationcontroller'))

http.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})