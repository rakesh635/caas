var stackclient = stackclient || {},
	appconfig = require('../../../appconfig.js'),
	util = require('util'),
	request = require('request');
(function (client) {
	client.GetStacks = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments', appconfig.Configurations.Url, projectid), 
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
	client.GetStack = function (projectid, envid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s', appconfig.Configurations.Url, projectid, envid),
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
	client.CreateStack = function (projectid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments', appconfig.Configurations.Url, projectid),
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
	client.DeleteStack = function (projectid, envid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s', appconfig.Configurations.Url, projectid, envid),
				method: 'DELETE', 
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
	client.RemoveStack = function (projectid, envid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=remove', appconfig.Configurations.Url, projectid, envid),
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
	client.UpdateStack = function (projectid, envid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=update', appconfig.Configurations.Url, projectid, envid),
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
	client.UpgradeStack = function (projectid, envid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=upgrade', appconfig.Configurations.Url, projectid, envid),
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
	client.FinishUpgrade = function (projectid, envid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=finishupgrade', appconfig.Configurations.Url, projectid, envid),
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
	client.RolebackUpgrade = function (projectid, envid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=rollback', appconfig.Configurations.Url, projectid, envid),
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
	client.ExportConfig = function (projectid, envid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=exportconfig', appconfig.Configurations.Url, projectid, envid),
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
	client.AddOutputs = function (projectid, envid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=addoutputs', appconfig.Configurations.Url, projectid, envid),
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
	client.ActivateServices = function (projectid, envid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=activateservices', appconfig.Configurations.Url, projectid, envid),
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
	client.DeactivateServices = function (projectid, envid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/environments/%s/?action=deactivateservices', appconfig.Configurations.Url, projectid, envid),
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
}(stackclient));
module.exports = stackclient;
