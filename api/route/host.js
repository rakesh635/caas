"use strict";
var express = require('express'),	
	commonhelper = require('../helper/commonhelper.js'),
	statushelper = require('../helper/statushelper.js').Status,		
	host_model = require('../model/hostmodel.js'),
	host_keywords = host_model.HostAccessKeys,
	hostclient = require('../services/rancherservice/hostclient.js'),
	hostlib = require('../../lib/hostlib.js'),	
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
router.get('/hosts/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, host_keywords.GetHosts, function (tres) {
		if (tres.status) {
			hostlib.GetHosts(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/host/:environmentid/:hostid', authoption, function (req, res) {
	
	tokenvalidation.IsValidRequest(req, true, host_keywords.GetHost, function (tres) {
		if (tres.status) {
			hostlib.GetHost(req.params.environmentid, req.params.hostid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/host/create', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, host_keywords.CreateHost, function (tres) {
		if (tres.status) {
			hostlib.CreateHost(body.environmentid, body.data, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/host/activate', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, host_keywords.ActivateHost, function (tres) {
		if (tres.status) {
			hostlib.ActivateHost(body.environmentid, body.hostid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/host/deactivate', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, host_keywords.DeactivateHost, function (tres) {
		if (tres.status) {
			hostlib.DeactivateHost(body.environmentid, body.hostid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/host/update', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, host_keywords.UpdateHost, function (tres) {
		if (tres.status) {
			hostlib.UpdateHost(body.environmentid, body.hostid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/host/remove', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, host_keywords.RemoveHost, function (tres) {
		if (tres.status) {
			hostlib.RemoveHost(body.environmentid, body.hostid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/host/dockersocket', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, host_keywords.CreateHostDockerSocket, function (tres) {
		if (tres.status) {
			hostlib.CreateHostDockerSocket(body.environmentid, body.hostid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/host/purge', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, host_keywords.PurgeHost, function (tres) {
		if (tres.status) {
			hostlib.PurgeHost(body.environmentid, body.hostid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/host/restore', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, host_keywords.RestoreHost, function (tres) {
		if (tres.status) {
			hostlib.RestoreHost(body.environmentid, body.hostid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
module.exports = router;