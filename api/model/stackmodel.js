var stackmodel = stackmodel || {};
(function (model) {
	"use strict";
	model.Stack = function () {
		return {
			"env_account_id": "" ,
			"data": {
				"name": "",
				"dockerCompose": "",
				"rancherCompose": ""
			}
		};
	};
	model.StackAccessKeys = {
		GetStacks: 'stacklist',
		GetStack: 'stackget',
		CreateStack: 'stackcreate',		
		RemoveStack: 'stackremove',
		DeleteStack: 'stackdelete',
		ActivateServices: 'stackactivateservices',
		DeactivateServices: 'stackdeactivateservices',
		UpdateStack: 'stackupdate',
		AddOutputs: 'stackaddoutputs',
		ExportConfig: 'stackexportconfig',
		UpgradeStack:'stackupgrade',
		RollbackUpgrade:'stackrollback',
		FinishUpgrade:'stackfinishupgrade'
	};
}(stackmodel));
module.exports = stackmodel;