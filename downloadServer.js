var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request', function(request, response){
	response.writeHead(200, {'Content-Type': 'application/pdf'});
	var file = fs.createReadStream('intro2node.pdf');
	file.pipe(response);
});
server.listen(8080);
console.log('Node HTTP server is listening on 8080');

