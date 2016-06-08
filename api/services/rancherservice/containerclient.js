var containerclient = containerclient || {},
	appconfig = require('../../../appconfig.js'),
	util = require('util'),
	request = require('request');
(function (client) {
	client.GetContainers = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers', appconfig.Configurations.Url, projectid), 
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
	client.GetContainer = function (projectid, containerid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s', appconfig.Configurations.Url, projectid, containerid), 
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
	client.CreateContainer = function (projectid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers', appconfig.Configurations.Url, projectid),
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
	client.DeleteContainer = function (projectid, containerid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s', appconfig.Configurations.Url, projectid, containerid),
				method: 'DELETE', 
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
	client.StartContainer = function (projectid, containerid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=start', appconfig.Configurations.Url, projectid, containerid),
				method: 'POST', 
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
	client.RestartContainer = function (projectid, containerid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=restart', appconfig.Configurations.Url, projectid, containerid),
				method: 'POST', 
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
	client.MigrateContainer = function (projectid, containerid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=migrate', appconfig.Configurations.Url, projectid, containerid),
				method: 'POST', 
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
	client.ExecuteContainer = function (projectid, containerid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=execute', appconfig.Configurations.Url, projectid, containerid),
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
	client.StopContainer = function (projectid, containerid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=stop', appconfig.Configurations.Url, projectid, containerid),
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
	client.UpdateContainer = function (projectid, containerid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=update', appconfig.Configurations.Url, projectid, containerid),
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
	client.RestoreContainer = function (projectid, containerid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=restore', appconfig.Configurations.Url, projectid, containerid),
				method: 'POST', 
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
	client.RemoveContainer = function (projectid, containerid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=remove', appconfig.Configurations.Url, projectid, containerid),
				method: 'POST', 
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
	client.PurgeContainer = function (projectid, containerid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=purge', appconfig.Configurations.Url, projectid, containerid),
				method: 'POST', 
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
	client.SetContainerLabels = function (projectid, containerid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=setlabels', appconfig.Configurations.Url, projectid, containerid),
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
	client.GetContainerLogs = function (projectid, containerid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/?action=logs', appconfig.Configurations.Url, projectid, containerid),
				method: 'GET', 
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
	client.GetContainerStatsToken = function (projectid, containerid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/containers/%s/containerstats', appconfig.Configurations.Url, projectid, containerid),
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
}(containerclient));
module.exports = containerclient;