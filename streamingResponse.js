var http = require('http');

http.createServer(function(req, res){
	res.writeHead(200);
	res.write("<p>Dog is running.</p>");
	setTimeout(function(){
		res.write("<p>Dog is done.</p>");
		res.end();
	},5000);
}).listen(8080);

console.log('Server is listening on 8080');
