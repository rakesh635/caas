"use strict";
var express = require('express'),	
	appconfig = require('../../appconfig.js'),
	commonhelper = require('../helper/commonhelper.js'),
	statushelper = require('../helper/statushelper.js').Status,	
	stack_model = require('../model/stackmodel.js'),
	service_model = require('../model/servicemodel.js'),
	stack_keywords = stack_model.StackAccessKeys,
	service_keywords = service_model.ServiceAccessKeys,
	stackclient = require('../services/rancherservice/stackclient.js'),
	serviceclient = require('../services/rancherservice/serviceclient.js'),
	tokenvalidation = require('../helper/tokenvalidation.js'),
	router = express.Router(),
	httpauth = require('http-auth'),
	basic = httpauth.basic({
		realm: 'Caas Security'
	}, function (username, password, callback) {
		tokenvalidation.IsValidAuthorization(username, password, function (vres) {
			callback(vres.status);
		});
	}),
	authoption = httpauth.connect(basic);
router.put('/stacks', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.GetStacks, function (tres) {
		if (tres.status) {
			stackclient.GetStacks(body.environmentid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.GetStacks, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.GetStack(body.environmentid, body.stackid , function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/services', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.GetServices, function (tres) {
		if (tres.status) {
			serviceclient.GetServices(body.environmentid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/service', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.GetService, function (tres) {
		if (tres.status) {
			serviceclient.GetService(body.environmentid, body.serviceid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.GetStacks, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.GetStack(body.environmentid, body.stackid , function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/create', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.CreateStack, function (tres) {
		if (tres.status) {
			stackclient.CreateStack(body.environmentid, body.data, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/remove', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.RemoveStack, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.RemoveStack(body.environmentid, body.stackid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/delete', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.RemoveStack, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.DeleteStack(body.environmentid, body.stackid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/activateservices', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.ActivateServices, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.ActivateServices(body.environmentid, body.stackid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/deactivateservices', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.DeactivateServices, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.DeactivateServices(body.environmentid, body.stackid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/update', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.UpdateStack, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.UpdateStack(body.environmentid, body.stackid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/upgrade', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.UpgradeStack, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.UpdateStack(body.environmentid, body.stackid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/finishupgrade', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.FinishUpgrade, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.FinishUpgrade(body.environmentid, body.stackid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/rolebackupgrade', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.RollbackUpgrade, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.RolebackUpgrade(body.environmentid, body.stackid, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/exportconfig', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.ExportConfig, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.ExportConfig(body.environmentid, body.stackid, body.data, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/stack/addoutputs', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, stack_keywords.AddOutputs, function (tres) {
		var body = req.body;
		if (tres.status) {
			stackclient.AddOutputs(body.environmentid, body.stackid, body.data, function (err, sres, sbody) {
				if (err) {
					res.json(new statushelper().Failed);
				}
				else {
					var sstatus = new statushelper().Success;
					sstatus.data = commonhelper.FilterBodyContent(sbody);
					res.json(sstatus);
				}
			});
		}
		else {
			res.json(tres);
		}
	});
});

module.exports = router;
