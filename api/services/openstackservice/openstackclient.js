var openstackclient = openstackclient || {},
	request = require('request'),
	util = require('util'),
	appconfig = require('../../../appconfig.js').Configurations;
(function (client) {
	client.GenerateToken = function (callback) {
		try {
			request({
				url: util.format('%s/tokens', appconfig.OpenStackAPI.IdentityURL), 
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				body: appconfig.OpenStackAPI.TokenParamters,
				headers: {
					'content-type': 'application/json'
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.CreateUser = function (authtoken,data, callback) {
		try {
			request({
				url: util.format('%s/users', appconfig.OpenStackAPI.IdentityURL), 
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				body: data,
				headers: {
					'content-type': 'application/json',
					'x-auth-token': authtoken
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
}(openstackclient));
module.exports = openstackclient;