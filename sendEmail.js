let transporter = nodemailer.createTransport({
    service: 'gmail',
    //   make true if using ssl certificate
    secure: false,
    //   stmp port
    port: 25,
    auth: {
      user: 'test.test@gmail.com',
      pass: 'password'
    },
    //   protocol
    tls: {
      rejectUnauthorized: false
    }
  });
  
  module.exports = function ({from, to, subject, text}) {
    // Promisify it, so you can easily chain it in the wild
    return new Promise(function (resolve, reject) {
      // use to construct body of email
      let HelperOptions = {
        from,
        to,
        subject,
        text
      };
  
      // contains callback data
      transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        console.log("The donation was sent!");
        console.log(info);
        resolve(info);
      });
    });
  };