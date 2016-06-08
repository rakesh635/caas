var environmentmodel = environmentmodel || {};
(function (model) {
	"use strict";
	model.Environment = function () {
		return {
			"description": "",
			"name": "",
			"members": [],
			"swarm": false,
			"kubernetes": false,
			"publicDns": false,
			"servicesPortRange": null,
		};
	};
	model.EnvironmentAccessKeys = {
		GetEnvironments: 'environmentlist',
		GetEnvironment: 'environmentget',
		GetAuditLogs: 'environmentauditlogs',
		GetNetworks:'environmentnetworks',
		CreateEnvironment: 'environmentcreate',
		CreateEnvironmentAPIKey: 'environmentcreateapikey',
		ActivateEnvironment: 'environmentactive',
		DeleteEnvironment: 'environmentdelete',
		UpdateEnvironment: 'environmentupdate',
		SetMembers:'environmentsetmembers',
		DeactivateEnvironment: 'environmentdeactive',
		PurgeEnvironment: 'environmentpurge',
		RemoveEnvironment: 'environmentremove',
		RestoreEnvironment:'environmentrestore',
		CreateCertificate: 'environmentcreatecertificate',
		GetCertificates: 'environmentcertificatelist',
		GetCertificate: 'environmentcertificate',
		GetContainerEvents: 'environmentcontainerevents',
		GetLabels: 'environmentlabels',
		GetImages: 'environmentimages',
		GetPorts: 'environmentports',
		GetPhysicalHosts: 'environmentphysicalhosts',
		GetIPAddresses:'environmentipaddresses'
    };
    model.EnvDaemonCreate = function () {
        return {
            "id": '',
            "name": '',
            "taskstatus": '',
            "pid": 0,
            "environment": {
                "envid": '',
                "domain": '',
                "envname": '',
                "envdesc": '',
                "imagename": '',
                "flavorname": ''
            }
        }
    };
    model.EnvDaemonDelete = function () {
        return {
            "id": '',
            "name": '',
            "taskstatus": '',
            "pid": 0,
            "environment": {
                "envid": '',
                "externalenvid": '',
                "envname": '',
                "envdesc": '',
                "imagename": '',
                "flavorname": '',
                "domain": '', 
                "vmid": '',
                "vmname": ''
            }
        }
    };
}(environmentmodel));
module.exports = environmentmodel;