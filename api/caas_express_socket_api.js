var caas_express_api = caas_express_api || {},
	cors = require('./cors.js'),
	auth = require('basic-auth'),
	bodyParser = require('body-parser'),
	format = require('string-format'),
	qs = require('querystring'),
	url = require('url'),
	logger = require('../logger/logger.js'),
	fs = require('fs'),
	statushelper = require('./helper/statushelper.js').Status;
	crypto = require('crypto'),
	https = require('https'),
	request = require('request'),
	appconfig = require('../appconfig.js'),	
	tokenValidation = require('./helper/tokenvalidation.js'),
	dbconnection = require('../helper/dbconnection.js'),
	wsrequesthelper = require('./helper/wsrequesthelper.js'),
	wsrequestmodel = require('./model/wsrequestmodel.js'),
	socket_io = require('socket.io'),	
	WebSocket = require('ws'),	
	wsserver = WebSocket.Server,
	fs = require('fs');
(function (api) {
	"use strict";
	api.Init = function (app, isHTTPS) {
		try {			
			var apipath = appconfig.Configurations.APIPath;
			if (isHTTPS) {				
				var server = https.createServer(appconfig.Configurations.API.SSL_Certificate, app).listen(appconfig.Configurations.API.PORT_HTTPS, appconfig.Configurations.API.HOST);
				var io = socket_io.listen(server);
				app.use(cors());
				WebSocketConnection(io, apipath, true);
				console.log('HTTPS: Running Port: ' + appconfig.Configurations.API.PORT_HTTPS);
			}
			else {
				var server = app.listen(appconfig.Configurations.API.PORT_HTTP, appconfig.Configurations.API.HOST);
				WebSocketConnection(server, apipath);
				console.log('HTTP: Running Port: ' + appconfig.Configurations.API.PORT_HTTP);
			}
		}
		catch (er) {
			console.log('Exception: ' + er);
		}
		
	};
}(caas_express_api));
module.exports = caas_express_api;

function WebSocketConnection(server, apipath, issecure) {
	if (issecure) {
		
		/* Working Code for socket.IO Server*/
		
		server.on('connect', function (socket) {
			socket.on('message', function (param) {
				try {
					var msg = JSON.parse(param);
					tokenValidation.IsValidRequest(msg, true, wsrequestmodel.WebSocketAccessKeys.WebSocket, function (tres) {
						if (tres.status) {
							if (msg.body) {
								var wsurl = format('{0}{1}?token={2}', appconfig.Configurations.WSUrl, msg.body.path, msg.body.token);
								var wsclient = new WebSocket(wsurl);
								wsclient.onmessage = function (rmsg) {
									socket.send(rmsg.data);
								};
								wsclient.onopen = function () {
									console.log('Openned');
								};
								wsclient.onclose = function () {
									console.log('Closed');
								};
								wsclient.onerror = function (er) {
									console.log('error: ' + er);
								};
							}
							else {
								socket.send('Invalid Request');
							}
						}
						else {
							socket.send('Invalid Request');
						}
					});
				
				}
				catch (ex) {
					socket.send(new statushelper().Exception);
				}				
			});
		});
	}
	else {
		var ws = wsserver({ server: server , path: apipath });
		ws.on('connection', function (wsc) {
			wsc.on('message', function (param) {
				try {
					var msg = JSON.parse(param);
					tokenValidation.IsValidRequest(msg, true, wsrequestmodel.WebSocketAccessKeys.WebSocket, function (tres) {
						if (tres.status) {
							if (msg.body) {
								var wsurl = format('{0}{1}?token={2}', appconfig.Configurations.WSUrl, msg.body.path, msg.body.token);
								var wsclient = new WebSocket(wsurl);
								wsclient.onmessage = function (rmsg) {
									wsc.send(rmsg.data);
								};
								wsclient.onopen = function () {
									console.log('Openned');
								};
								wsclient.onclose = function () {
									console.log('Closed');
								};
								wsclient.onerror = function (er) {
									wsc.send(er);
								};
							}
							else {
								wsc.send('Invalid Request');
							}
						}
						else {
							wsc.send('Invalid Request');
						}
					});					
				}
				catch (ex) {
										
				}
					
			});
		
		});
				
	}
	
}

function errorresponse(err, res) {
	if (err.errno) {
		res.write(JSON.stringify({ status: "failure", data: 'Unable to connect Docker' }));
	}			
	else {
		res.write(JSON.stringify({ status: "failure", data: err }));
	}
}
function GetPassword(salt32, salt16, ePwd) {
	decipher = crypto.createDecipheriv('aes-256-cbc', salt32 , salt16);
	decipher.setAutoPadding(false);
	dec = decipher.update(ePwd, 'hex', 'utf8');
	return dec;
}