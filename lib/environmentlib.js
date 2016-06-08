var environmentlib = environmentlib || {},
	status = require('../api/helper/statushelper').Status,
	commonhelper = require('../api/helper/commonhelper.js'),
	environmentclient = require('../api/services/rancherservice/environmentclient.js');
(function (lib) {
	lib.GetEnvironments = function (callback) {
		environmentclient.GetEnvironments(function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetEnvironment = function (environmentid, callback) {
		environmentclient.GetEnvironment(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetAuditLogs = function (environmentid, callback) {
		environmentclient.GetAuditLogs(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetNetworks = function (environmentid, callback) {
		environmentclient.GetNetworks(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetContainerEvents = function (environmentid, callback) {
		environmentclient.GetContainerEvents(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetLabels = function (environmentid, callback) {
		environmentclient.GetLabels(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetImages = function (environmentid, callback) {
		environmentclient.GetImages(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetPorts = function (environmentid, callback) {
		environmentclient.GetPorts(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = status.Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetPhysicalHosts = function (environmentid, callback) {
		environmentclient.GetPhysicalHosts(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetIPAddresses = function (environmentid, callback) {
		environmentclient.GetIPAddresses(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.CreateAPIKey = function (environmentid, data, callback) {
		environmentclient.CreateAPIKey(environmentid, data, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var data = { name: body.name, publicValue: body.publicValue, secretValue: body.secretValue };
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.CreateCertificate = function (environmentid, data, callback) {
		environmentclient.CreateCertificate(environmentid, data, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.GetCertificate = function (environmentid, certificateid, callback) {
		environmentclient.GetCertificate(environmentid, certificateid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var resstatus = new status().Success;
				resstatus.data = commonhelper.FilterBodyContent(body);
				callback(resstatus);
			}
		});
	};
	lib.GetCertificates = function (environmentid, callback) {
		environmentclient.GetCertificates(environmentid, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var resstatus = new status().Success;
				resstatus.data = commonhelper.FilterBodyContent(body);
				callback(resstatus);
			}
		});
	};
	lib.CreateEnvironment = function (body, callback) {
		environmentclient.CreateEnvironment(body, function (err, resx, body) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				
				var sstatus = new status().Success;
				sstatus.data = commonhelper.FilterBodyContent(body);
				callback(sstatus);
			}
		});
	};
	lib.UpdateEnvironment = function (environmentid, callback) { 
		environmentclient.UpdateEnvironment(environmentid, function (err, resx, rbody) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = rbody;
				callback(sstatus);
			}
		});
	};
	lib.RestoreEnvironment = function (environmentid, callback) { 
		environmentclient.RestoreEnvironment(environmentid, function (err, resx, rbody) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = rbody;
				callback(sstatus);
			}
		});
	};
	lib.RemoveEnvironment = function (environmentid, callback) { 
		environmentclient.RemoveEnvironment(environmentid, function (err, resx, rbody) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = rbody;
				callback(sstatus);
			}
		});
	};
	lib.ActivateEnvironment = function (environmentid, callback) { 
		environmentclient.ActivateEnvironment(environmentid, function (err, resx, rbody) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = rbody;
				callback(sstatus);
			}
		});
	};
	lib.DeactivateEnvironment = function (environmentid, callback) { 
		environmentclient.DeactivateEnvironment(environmentid, function (err, resx, rbody) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = rbody;
				callback(sstatus);
			}
		});
	};
	lib.PurgeEnvironment = function (environmentid, callback) { 
		environmentclient.PurgeEnvironment(environmentid, function (err, resx, rbody) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = rbody;
				callback(sstatus);
			}
		});
	};
	lib.Setmembers = function (environmentid, callback) { 
		environmentclient.Setmembers(environmentid, body.data, function (err, resx, rbody) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = rbody;
				callback(sstatus);
			}
		});
	};
	lib.DeleteEnvironment = function (environmentid, callback) { 
		environmentclient.DeleteEnvironment(environmentid, function (err, resx, rbody) {
			if (err) {
				callback(new status().Failed);
			}
			else {
				var sstatus = new status().Success;
				sstatus.data = rbody;
				callback(sstatus);
			}
		});
	};
}(environmentlib));
module.exports = environmentlib;