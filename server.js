//User Story: I can get the IP address, language and operating system for my browser.
var http = require('http');
var port = process.env.PORT || 8080;

var server = http.createServer(function(req, res){
    var ip = req.headers['x-forwarded-for'];
    var arch = req.headers['user-agent'];
    var lang = req.headers['accept-language'];
    lang = lang.split(',');
    lang = lang.shift(); //only want first part of language property
    arch = arch.replace(/[()]/g, '%').split("%"); //split user-agent string to isolate os info
    var obj = {
        ip: ip,
        software: arch[1],
        language: lang
    };
    
    var jsonstr = JSON.stringify(obj);
    var len = jsonstr.length;
    
    res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': len});
    res.end(jsonstr);
});

server.listen(port);