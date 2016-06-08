"use strict";
var containerlib = containerlib || {},	
	statushelper = require('../api/helper/statushelper.js').Status,			
	containerstats_model = require('../api/model/containerstatsmodel.js'),
	commonhelper = require('../api/helper/commonhelper.js'),	
	containerclient = require('../api/services/rancherservice/containerclient.js');	
(function (lib) {
	lib.CreateContainer = function (body, callback) {
		containerclient.CreateContainer(body.environmentid, body.data, function (err, sres, sbody) {
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
	lib.GetContainers = function (body, callback) {
		containerclient.GetContainers(body.environmentid, function (err, sres, sbody) {
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
	lib.GetContainer = function (body, callback) {
		containerclient.GetContainer(body.environmentid, body.containerid, function (err, sres, sbody) {
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
	lib.StartContainer = function (body, callback) {
		containerclient.StartContainer(body.environmentid, body.containerid, function (err, sres, sbody) {
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
	lib.StopContainer = function (body, callback) {
		containerclient.StopContainer(body.environmentid, body.containerid, body.data, function (err, sres, sbody) {
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
	lib.UpdateContainer = function (body, callback) {
		containerclient.UpdateContainer(body.environmentid, body.containerid, body.data, function (err, sres, sbody) {
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
	lib.RestoreContainer = function (body, callback) {
		containerclient.RestoreContainer(body.environmentid, body.containerid, function (err, sres, sbody) {
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
	lib.PurgeContainer = function (body, callback) {
		containerclient.PurgeContainer(body.environmentid, body.containerid, function (err, sres, sbody) {
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
	lib.RemoveContainer = function (body, callback) {
		containerclient.RemoveContainer(body.environmentid, body.containerid, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var sstatus = statushelper.Success;
				sstatus.data = commonhelper.FilterBodyContent(sbody);
				callback(sstatus);
			}
		});
	};
	lib.DeleteContainer = function (body, callback) {
		containerclient.DeleteContainer(body.environmentid, body.containerid, function (err, sres, sbody) {
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
	lib.RestartContainer = function (body, callback) {
		containerclient.RestartContainer(body.environmentid, body.containerid, function (err, sres, sbody) {
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
	lib.MigrateContainer = function (body, callback) {
		containerclient.MigrateContainer(body.environmentid, body.containerid, function (err, sres, sbody) {
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
	lib.ExecuteContainer = function (body, callback) {
		containerclient.ExecuteContainer(body.environmentid, body.containerid, body.data, function (err, sres, sbody) {
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
	lib.SetContainerLabels = function (body, callback) {
		containerclient.SetContainerLabels(body.environmentid, body.containerid, body.data, function (err, sres, sbody) {
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
	lib.GetContainerLogs = function (body, callback) {
		containerclient.GetContainerLogs(body.environmentid, body.containerid, body.data, function (err, sres, sbody) {
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
	lib.ContainerStats = function (body, callback) {
		containerclient.GetContainerStatsToken(body.environmentid, body.containerid, body.data, function (err, sres, sbody) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				try {
					var sstatus = new statushelper().Success;
					var cstats = containerstats_model.ContainerStats();
					cstats.path = b_url.parse(sbody.url).pathname;
					cstats.token = sbody.token;
					sstatus.data = cstats;
					callback(sstatus);
				}
					catch (ex) {
					callback(new statushelper().Failed);
				}
			}
		});
	};
}(containerlib));
module.exports = containerlib;
