var app = require('./app');
var port = process.env.port || 4000;
var server = app.listen(port,function(){
    console.log("express app listening on port "+ port);
});

