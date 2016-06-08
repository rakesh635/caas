var hostclient = hostclient || {},
	appconfig = require('../../../appconfig.js'),
	util = require('util'),
	request = require('request');

(function (client) {
	client.GetHosts = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts', appconfig.Configurations.Url, projectid),
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
	client.GetHost = function (projectid, hostid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts/%s', appconfig.Configurations.Url, projectid, hostid),
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
	client.CreateHost = function (projectid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts', appconfig.Configurations.Url, projectid),
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: body
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
	client.ActivateHost = function (projectid, hostid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts/%s/?action=activate', appconfig.Configurations.Url, projectid, hostid),
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: ''
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
	client.DeactivateHost = function (projectid, hostid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts/%s/?action=deactivate', appconfig.Configurations.Url, projectid, hostid),
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: ''
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
	client.RemoveHost = function (projectid, hostid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts/%s/?action=remove', appconfig.Configurations.Url, projectid, hostid),
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: ''
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	
	};
	client.CreateHostDockerSocket = function (projectid, hostid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts/%s/?action=dockersocket', appconfig.Configurations.Url, projectid, hostid),
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: ''
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
	client.UpdateHost = function (projectid, hostid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts/%s/?action=update', appconfig.Configurations.Url, projectid, hostid),
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: ''
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
	client.PurgeHost = function (projectid, hostid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts/%s/?action=purge', appconfig.Configurations.Url, projectid, hostid),
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: ''
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
	client.RestoreHost = function (projectid, hostid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/hosts/%s/?action=restore', appconfig.Configurations.Url, projectid, hostid),
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: ''
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
		
	};
}(hostclient));
module.exports = hostclient;
