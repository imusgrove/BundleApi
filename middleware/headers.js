module.exports = function(req, res, next){
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // if(req.method === "OPTIONS")
    //     res.send(200)
    next();
};