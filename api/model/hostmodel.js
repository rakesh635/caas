var hostmodel = hostmodel || {};
(function (model) {
	"use strict";	
	model.Host = function () {
		return {
			"description": "234",
			"name": "Rer",
			"port": 324,
		};
	};
	model.HostAccessKeys = {
		CreateHost: "hostcreate",
		ActivateHost: 'hostactivate',
		DeactivateHost:'hostdeactivate',
		GetHosts: 'hostlist',
		GetHost: 'hostget',
		RemoveHost: 'hostremove',
		UpdateHost: 'hostupdate',
		RestoreHost: 'hostrestore',
		PurgeHost:'hostpurge',
		CreateHostDockerSocket:'hostcreatedockersocket'
	};

}(hostmodel));
module.exports = hostmodel;