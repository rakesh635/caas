var servicemodel = servicemodel || {};
(function (model) {
	"use strict";
	model.Service = function () {
		return {
			"env_account_id": "" ,
			"data": {
				"name": "",
				"dockerCompose": "",
				"rancherCompose": ""
			}
		};
	};
	model.ServiceAccessKeys = {
		GetServices: 'servicelist',
		GetService: 'serviceget',
		CreateService: 'servicecreate',		
		RemoveService: 'serviceremove',
		RestartService: 'servicerestart',
		AddServiceLink: 'serviceaddservicelink',
		RemoveServiceLink: 'serviceremoveservicelink',
		SetServiceLink: 'servicesetservicelink',
		UpdateService: 'serviceupdate',
		ActivateService: 'serviceactivate',
		DeactivateService: 'servicedeactivate',		
		UpgradeService:'serviceupgrade',
		Rollback:'servicerollback'
	};
}(servicemodel));
module.exports = servicemodel;