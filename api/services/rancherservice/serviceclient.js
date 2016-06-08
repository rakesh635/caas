var serviceclient = serviceclient || {},
	appconfig = require('../../../appconfig.js'),
	util = require('util'),
	request = require('request');

(function (client) {
	client.GetServices = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices', appconfig.Configurations.Url, projectid),
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
	client.GetService = function (projectid, serviceid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s', appconfig.Configurations.Url, projectid, serviceid),
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
	client.CreateService = function (projectid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices', appconfig.Configurations.Url, projectid),
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
	client.ActivateService = function (projectid, serviceid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=activate', appconfig.Configurations.Url, projectid, serviceid),
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
	client.RollbackService = function (projectid, serviceid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=rollback', appconfig.Configurations.Url, projectid, serviceid),
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
	client.DeactivateService = function (projectid, serviceid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=deactivate', appconfig.Configurations.Url, projectid, serviceid),
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
	client.RemoveService = function (projectid, serviceid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=remove', appconfig.Configurations.Url, projectid, serviceid),
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
	client.RestartService = function (projectid, serviceid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=restart', appconfig.Configurations.Url, projectid, serviceid),
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
	client.RemoveServiceLink = function (projectid, serviceid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=removeservicelink', appconfig.Configurations.Url, projectid, serviceid),
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
	client.AddServiceLink = function (projectid, serviceid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=addservicelink', appconfig.Configurations.Url, projectid, serviceid),
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
	client.UpdateService = function (projectid, serviceid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=update', appconfig.Configurations.Url, projectid, serviceid),
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
	client.UpgradeService = function (projectid, serviceid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=upgrade', appconfig.Configurations.Url, projectid, serviceid),
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
	client.SetServiceLink = function (projectid, serviceid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/dnsservices/%s/?action=setservicelinks', appconfig.Configurations.Url, projectid, serviceid),
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

}(serviceclient));
module.exports = serviceclient;
