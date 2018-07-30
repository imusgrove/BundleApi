var jwt = require('jsonwebtoken');
var sequelize = require('../db')
var Donor = sequelize.import('../models/donor')

module.exports = function(req, res, next){
    if(req.method === 'OPTIONS'){
        next()
    }else{
        var sessionToken = req.headers.authorization;
        console.log(sessionToken)
        if(!sessionToken)return res.status(403).send({auth: false, message: 'No token provided'});
        else{
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if(decoded){
                    Donor.findOne({where:{id: decoded.id}}).then(donor => {
                        req.donor = donor;
                        next();
                    },
                    function(){
                        res.status(401).send({error: 'Not authorized'});
                    });
                }else{
                    res.status(400).send({error: 'Not authorized'})
                }
            })
        }
    }
}