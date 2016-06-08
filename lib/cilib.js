var cilib = cilib || {},
	statushelper = require('../api/helper/statushelper.js').Status
jenkinclient = require('../api/services/ciservice/jenkinclient.js');
(function (lib) {
	lib.CreateJob = function (body, callback) {
		jenkinclient.CreateJob(body, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.CopyJob = function (body, callback) {
		jenkinclient.CopyJob(body, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.DeleteJob = function (jobname, callback) {
		jenkinclient.DeleteJob(jobname, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.BuildJob = function (jobname, callback) {
		jenkinclient.BuildJob(jobname, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.EnableJob = function (jobname, callback) {
		jenkinclient.EnableJob(jobname, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.DisableJob = function (jobname, callback) {
		jenkinclient.DisableJob(req.params.name, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.GetJob = function (jobname, callback) {
		jenkinclient.GetJob(jobname, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.JobExists = function (jobname, callback) {
		jenkinclient.JobExist(req.params.name, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.GetJobList = function (callback) {
		jenkinclient.GetJobList(function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.GetBuild = function (body, callback) {
		jenkinclient.GetBuild(body, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.BuildLog = function (body, callback) {
		jenkinclient.GetBuildLog(body, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.StopBuild = function (body, callback) {
		jenkinclient.StopBuild(body, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.CreateNode = function (nodename, callback) {
		jenkinclient.CreateNode(nodename, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.DeleteNode = function (nodename, callback) {
		jenkinclient.DeleteNode(nodename, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.EnableNode = function (nodename, callback) {
		jenkinclient.EnableNode(nodename, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.DisableNode = function (nodename, callback) {
		jenkinclient.DeleteNode(nodename, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.NodeExists = function (nodename, callback) {
		jenkinclient.NodeExists(nodename, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.GetNode = function (nodename, callback) {
		jenkinclient.GetNode(nodename, function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.GetNodeList = function (callback) {
		jenkinclient.GetNodeList(function (err, sres, sbody) {
			if (err) {
				var failed = new statushelper().Failed;
				failed.message = err.message;
				callback(failed);
			}
			else {
				callback(sbody);
			}
		});
	};
	lib.CreateCredential = function (body, callback) {
		jenkinclient.CreateCredential(body, function (err, cres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				callback(new statushelper().Success);
			}
		});
	};
}(cilib));
module.exports = cilib;