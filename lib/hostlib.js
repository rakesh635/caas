"use strict";
var hostlib = hostlib || {},
	commonhelper = require('../api/helper/commonhelper.js'),
	statushelper = require('../api/helper/statushelper.js').Status,		
	hostclient = require('../api/services/rancherservice/hostclient.js');
(function (lib) {
	lib.GetHosts = function (environmentid, callback) {
		hostclient.GetHosts(environmentid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.GetHost = function (environmentid, hostid, callback) {
		hostclient.GetHost(environmentid, hostid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.CreateHost = function (environmentid, data, callback) {
		hostclient.CreateHost(environmentid, data, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.ActivateHost = function (environmentid, hostid, callback) {
		hostclient.ActivateHost(environmentid, hostid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.DeactivateHost = function (environmentid, hostid, callback) {
		hostclient.DeactivateHost(environmentid, hostid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.UpdateHost = function (environmentid, hostid, callback) {
		hostclient.UpdateHost(environmentid, hostid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.RemoveHost = function (environmentid, hostid, callback) {
		hostclient.RemoveHost(environmentid, hostid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.CreateHostDockerSocket = function (environmentid, hostid, callback) {
		hostclient.CreateHostDockerSocket(environmentid, hostid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.PurgeHost = function (environmentid, hostid, callback) { 
		hostclient.PurgeHost(environmentid, hostid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.RestoreHost = function (environmentid, hostid, callback) {
		hostclient.RestoreHost(environmentid, hostid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = new statushelper().Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
}(hostlib));
module.exports = hostlib;