var containermodel = containermodel || {};
(function (model) {
	"use strict";
	model.Container = function () {
		return {
			"count": 1,
			"expose": [],
			"imageUuid": "docker:ubuntu:14.04.3",
			"name": "",
			"networkIds": [],
			"ports": [],
			"startOnCreate": true,
			"command": [],
			"publishAllPorts": false,
			"privileged": false,
			"capAdd": [],
			"capDrop": [],
			"dns": [],
			"dnsSearch": [],
			"stdinOpen": false,
			"tty": false,
			"entryPoint": [],
			"restartPolicy": null,
			"devices": [],
			"labels": {
				"io.rancher.container.pull_image": "always",
			},
			"healthCheck": null,
			"securityOpt": [],
			"logConfig": null,
			"extraHosts": [],
			"readOnly": false,
			"build": null,
			"networkMode": "managed",
			"dataVolumes": [],
			"dataVolumesFrom": [],
		};
	};
	model.ContainerAccessKeys = {
		GetContainers: 'containerlist',
		GetContainer: 'containerget',
		CreateContainer: 'containercreate',		
		StartContainer: 'containerstart',
		StopContainer: 'containerstop',
		RestartContainer: 'containerrestart',
		MigrateContainer: 'containermigrate',
		ExecuteContainer:'containerexecute',
		UpdateContainer: 'containerupdate',
		RestoreContainer: 'containerrestore',		
		RemoveContainer: 'containerremove',
		PurgeContainer: 'containerpurge',
		DeleteContainer: 'containerdelete',
		GetContainerLogs: 'containerlogs',
		SetContainerLabels: 'containersetlabels',
		ContainerStats:'containerstats'
	};
}(containermodel));
module.exports = containermodel;