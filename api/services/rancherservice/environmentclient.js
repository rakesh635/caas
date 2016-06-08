var environmentclient = environmentclient || {},
	appconfig = require('../../../appconfig.js'),
	util = require('util'),
	request = require('request');
(function (client) {
	client.GetEnvironments = function (callback) {
		try {
			request({
				url: util.format('%s/projects', appconfig.Configurations.Url), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetEnvironment = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.CreateEnvironment = function (body, callback) {
		try {
			request({
				url: util.format('%s/projects', appconfig.Configurations.Url), 
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
	client.UpdateEnvironment = function (environmentid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/?action=update', appconfig.Configurations.Url, environmentid), 
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
	client.DeleteEnvironment = function (environmentid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/?action=delete', appconfig.Configurations.Url, environmentid), 
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
	client.RemoveEnvironment = function (environmentid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/?action=remove', appconfig.Configurations.Url, environmentid), 
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
	client.ActivateEnvironment = function (environmentid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/?action=activate', appconfig.Configurations.Url, environmentid), 
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
	client.DeactivateEnvironment = function (environmentid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/?action=deactivate', appconfig.Configurations.Url, environmentid), 
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
	client.RestoreEnvironment = function (environmentid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/?action=restore', appconfig.Configurations.Url, environmentid), 
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
	client.PurgeEnvironment = function (environmentid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/?action=purge', appconfig.Configurations.Url, environmentid), 
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
	client.Setmembers = function (environmentid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/?action=setmembers', appconfig.Configurations.Url, environmentid), 
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
	client.CreateCertificate = function (projectid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/certificates', appconfig.Configurations.Url, projectid), 
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: body
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetCertificates = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/certificates', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetCertificate = function (projectid, certificateid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/certificates/%s', appconfig.Configurations.Url, projectid, certificateid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: ''
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetAuditLogs = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/auditlogs', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetNetworks = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/networks', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetContainerEvents = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containerevents', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetLabels = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/labels', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetImages = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/images', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetPorts = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/ports', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetPhysicalHosts = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/physicalhosts', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetIPAddresses = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/ipaddresses', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				}
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.CreateAPIKey = function (projectid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/apikey', appconfig.Configurations.Url, projectid), 
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},
				body: body
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
}(environmentclient));
module.exports = environmentclient;