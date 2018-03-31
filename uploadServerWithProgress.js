var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request', function(request, response){
	response.writeHead(200);
	
	var newFile = fs.createWriteStream("intro2node.pdf");
	var fileBytes = request.headers['content-length'];
	var uploadedBytes = 0;

	request.on('readable', function(){
		if (fileBytes){
			var chunk = null;
			while (null != (chunk = request.read())){
				uploadedBytes += chunk.length;
				var progress = (uploadedBytes / fileBytes) * 100;
				response.write('Progress: ' + parseInt(progress, 10) + "%\n");
			}
		}
	});
	request.pipe(newFile);
	request.on('end', function(){
		if (fileBytes){
			response.end('Progress: 100%\n');
		}
		else{
			fs.readFile('./views/uploadfile.html', function(err, html){
				response.write(html);
				response.end();
			});
		}
	});
	
});
server.listen(8080);
console.log('Node HTTP server is listening on 8080');

