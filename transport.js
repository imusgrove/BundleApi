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
    //function to send email to donors that donor info was received
    var mailOptions = {
        from: 'iesha.musgrove@gmail.com',
        //grabs email input from donor fields where donor signs up
        to: request.body.email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    //code to insert to send notifications on each route
        transporter.sendMail(mailOptions, function(error, info){
            if(error) {
                alert(error);
            }else{
                alert('Email sent' + info.response);
            }
        });
        next();
}