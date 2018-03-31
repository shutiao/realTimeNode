var express = require('express');
var url = require('url');
var request = require('request');
var app = express();

app.get('/douban/:user', function(req, response) {
	//console.log('request comes in');
	var uid = req.params.user;
	options = {
		protocol: 'https:',
		host: 'api.douban.com',
		pathname: '/v2/user/' + uid
	};
	var UserInfoUrl = url.format(options);
	//console.log(UserInfoUrl);
	request(UserInfoUrl, function(err, res, body) {
		var userInfoObject = JSON.parse(body);
		//console.log(userInfoObject);
		//response.end(userInfoObject.toString());
		response.locals = {uid: uid, userInfoObject: userInfoObject};
		response.render('userInfo.ejs');
	});
});

app.listen(8080);
console.log('Express is listening on 8080');
