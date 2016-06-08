"use strict";
var express = require('express'),
	appconfig = require('../../appconfig.js'),
	commonhelper = require('../helper/commonhelper.js'),
	statushelper = require('../helper/statushelper.js').Status,		
	service_model = require('../model/servicemodel.js'),
	service_keywords = service_model.ServiceAccessKeys,
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
router.put('/services', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.GetHosts, function (tres) {
		if (tres.status) {
			serviceclient.GetHosts(body.environmentid, function (err, sres, sbody) {
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
router.put('/service', function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.GetHost, function (tres) {
		if (tres.status) {
			serviceclient.GetHost(body.environmentid, body.serviceid, function (err, sres, sbody) {
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
router.put('/service/create', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.CreateService, function (tres) {
		if (tres.status) {
			serviceclient.CreateService(body.environmentid, body.data, function (err, sres, sbody) {
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
router.put('/service/activate', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.ActivateService, function (tres) {
		if (tres.status) {
			serviceclient.ActivateService(body.environmentid, body.serviceid, function (err, sres, sbody) {
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
router.put('/service/deactivate', function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.DeactivateService, function (tres) {
		if (tres.status) {
			serviceclient.DeactivateService(body.environmentid, body.serviceid, function (err, sres, sbody) {
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
router.put('/service/update', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.UpdateService, function (tres) {
		if (tres.status) {
			serviceclient.UpdateService(body.environmentid, body.serviceid, function (err, sres, sbody) {
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
router.put('/service/rollback', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.Rollback, function (tres) {
		if (tres.status) {
			serviceclient.RollbackService(body.environmentid, body.serviceid, function (err, sres, sbody) {
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
router.put('/service/upgrade', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.UpgradeService, function (tres) {
		if (tres.status) {
			serviceclient.UpgradeService(body.environmentid, body.serviceid, body.data, function (err, sres, sbody) {
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
router.put('/service/remove', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.RemoveService, function (tres) {
		if (tres.status) {
			serviceclient.RemoveService(body.environmentid, body.serviceid, function (err, sres, sbody) {
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
router.put('/service/addservicelink', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.AddServicelink, function (tres) {
		if (tres.status) {
			serviceclient.AddServiceLink(body.environmentid, body.serviceid, body.data, function (err, sres, sbody) {
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
router.put('/service/removeservicelink', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.RemoveServiceLink, function (tres) {
		if (tres.status) {
			serviceclient.RemoveServiceLink(body.environmentid, body.serviceid, body.data, function (err, sres, sbody) {
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
router.put('/service/setservicelink', function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.SetServiceLink, function (tres) {
		if (tres.status) {
			serviceclient.SetServiceLink(body.environmentid, body.serviceid, body.data, function (err, sres, sbody) {
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
router.put('/service/restart', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, service_keywords.RestartService, function (tres) {
		if (tres.status) {
			serviceclient.RestartService(body.environmentid, body.serviceid, body.data, function (err, sres, sbody) {
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