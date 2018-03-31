//Create an Express Server
var express = require('express');
var app = express();
// Using the http module, create an new http server and pass the express app as the listener for that new server
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];
var storeMessage = function(name, data){
    messages.push({name: name, data: data});
    if (messages.length > 10) {
        messages.shift();
    }
};

io.on('connection', function(client){
    //client.emit('message', { hello: 'world'});
    client.emit('connected', { status: true });
    client.on('join', function(nickname){
        // available both on the server and client
        messages.forEach(function(message) {
            client.emit("message", message.name + ": " + message.data);
        });
        //client.set('nickname', nickname);
        client.nickname = nickname;
        console.log('Client ' + nickname + ' connected...');
        client.broadcast.emit(nickname + ' joined the chat');
        client.emit('chatter', "You joined the chat");
    });
    client.on('message', function(message){
        var nickname = client.nickname;
        console.log(nickname + ' said: ' + message);
        client.broadcast.emit('message', nickname + ": " + message);
        storeMessage(nickname, message);
        client.emit('message', nickname + ": " + message);
    });
});

app.get('/', function (req, res){
    res.sendFile(__dirname + '/views/' + 'chattr-console.html');
});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));
server.listen(8080);
console.log('real time chattr is listing on 8080');