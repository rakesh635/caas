var volumeclient = volumeclient || {},
	appconfig = require('../../../appconfig.js'),
	util = require('util'),
	request = require('request');
(function (client) {
	client.CreateVolume = function (projectid, body, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes', appconfig.Configurations.Url, projectid), 
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
	client.ActivateVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s/?action=activate', appconfig.Configurations.Url, projectid, volumeid), 
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
	client.AllocateVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s/?action=allocate', appconfig.Configurations.Url, projectid, volumeid), 
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
	client.DeallocateVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s/?action=deallocate', appconfig.Configurations.Url, projectid, volumeid), 
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
	client.RemoveVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s/?action=remove', appconfig.Configurations.Url, projectid, volumeid), 
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
	client.UpdateVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s/?action=update', appconfig.Configurations.Url, projectid, volumeid), 
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
	client.PurgeVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s/?action=purge', appconfig.Configurations.Url, projectid, volumeid), 
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
	client.RestoreVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s/?action=restore', appconfig.Configurations.Url, projectid, volumeid), 
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
	client.DeleteVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s', appconfig.Configurations.Url, projectid, volumeid), 
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
	client.GetVolumes = function (projectid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes', appconfig.Configurations.Url, projectid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},			
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetVolume = function (projectid, volumeid, callback) {
		try {
			request({
				url: util.format('%s/projects/%s/volumes/%s', appconfig.Configurations.Url, projectid, volumeid), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: {
					'Authorization': appconfig.Configurations.Authorization
				},			
			}, function (err, resx, rbody) {
				callback(err, resx, rbody);
			});
		}
		catch (er) {
			callback(er, null, null);
		}		
	};
	
}(volumeclient));
module.exports = volumeclient;