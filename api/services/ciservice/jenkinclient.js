var jenkinclient = jenkinclient || {},	
	appconfig = require('../../../appconfig.js').Configurations,
	commonhelper = require('../../helper/commonhelper.js'),	
	util = require('util'),	
	jenkins = require('jenkins')(appconfig.CIServerAPI.fullurl),	
	statushelper = require('../../helper/statushelper.js').Status,
	request = require('request');

(function (client) {
	
	client.CreateJob = function (ibody, callback) {
		try {
			jenkins.job.create(ibody.name, ibody.data, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.CopyJob = function (ibody, callback) {
		try {
			jenkins.job.copy(ibody.sourcejob, ibody.newjob, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.DeleteJob = function (ibody, callback) {
		try {
			jenkins.job.destroy(ibody, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.BuildJob = function (ibody, callback) {
		try {
			jenkins.job.build(ibody, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.EnableJob = function (ibody, callback) {
		try {
			jenkins.job.enable(ibody, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.DisableJob = function (ibody, callback) {
		try {
			jenkins.job.disable(ibody, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.JobExist = function (ibody, callback) {
		try {
			jenkins.job.exists(ibody, function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetJob = function (ibody, callback) {
		try {
			jenkins.job.get(ibody, function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetJobList = function (callback) {
		try {
			jenkins.job.list(function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetBuild = function (ibody, callback) {
		try {
			jenkins.build.get(ibody.jobname, ibody.buildno, function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetBuildLog = function (ibody, callback) {
		try {
			jenkins.build.log(ibody.jobname, ibody.buildno, function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.StopBuild = function (ibody, callback) {
		try {
			jenkins.build.stop(ibody.jobname, ibody.buildno, function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.CreateNode = function (ibody, callback) {
		try {
			jenkins.node.create(ibody, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.DeleteNode = function (ibody, callback) {
		try {
			jenkins.node.destroy(ibody, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.EnableNode = function (ibody, callback) {
		try {
			jenkins.node.enable(ibody, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = statushelper.Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.DisableNode = function (ibody, callback) {
		try {
			jenkins.node.disable(ibody, function (err) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = statushelper.Success;
					status.data = null;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.NodeExists = function (ibody, callback) {
		try {
			jenkins.node.exists(ibody, function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = statushelper.Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetNode = function (ibody, callback) {
		try {
			jenkins.node.get(ibody, function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = statushelper.Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetNodeList = function (callback) {
		try {
			jenkins.node.list(function (err, data) {
				if (err) {
					callback(err, null, null);
				}
				else {
					var status = new statushelper().Success;
					status.data = data;
					callback(null, null, status);
				}
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.CreateCredential = function (ibody, callback) {		
		var x = "json=" + JSON.stringify(ibody);
		try {
			request({
				url: util.format('%s/credential-store/domain/_/createCredentials', appconfig.CIServerAPI.URL), 
				method: 'POST', 
				rejectUnauthorized: false,	
				json: false,	
				headers: {
					"Authorization": appconfig.CIServerAPI.Authorization,					
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body:x ,
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
}(jenkinclient));

module.exports = jenkinclient;
