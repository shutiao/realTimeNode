var http = require('http');

//curl -d 'hello' http://localhost:8080
http.createServer(function(req, res){
	res.writeHead(200);
	req.pipe(res);
}).listen(8080);
console.log('node is listening on 8080');
