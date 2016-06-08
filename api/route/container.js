"use strict";
var express = require('express'),
	appconfig = require('../../appconfig.js'),
	statushelper = require('../helper/statushelper.js').Status,		
	container_model = require('../model/containermodel.js'),
	containerstats_model = require('../model/containerstatsmodel.js'),
	commonhelper = require('../helper/commonhelper.js'),
	container_keywords = container_model.ContainerAccessKeys,	
	tokenvalidation = require('../helper/tokenvalidation.js'),	
	containerlib = require('../../lib/containerlib.js'),
	b_url = require('url'),
	bqs = require('querystring'),
	c_path = require('path'),	
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

router.get('/containers/:environmentid', authoption, function (req, res) {
	var body = { environmentid: req.params.environmentid };;
	tokenvalidation.IsValidRequest(req, true, container_keywords.GetContainers, function (tres) {
		if (tres.status) {
			containerlib.GetContainers(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/container/:environmentid/:containerid', authoption, function (req, res) {
	var body = { environmentid: req.params.environmentid, containerid: req.params.containerid };
	tokenvalidation.IsValidRequest(req, true, container_keywords.GetContainers, function (tres) {
		if (tres.status) {
			containerlib.GetContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/create', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.CreateContainer, function (tres) {
		if (tres.status) {
			containerlib.CreateContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/start', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.StartContainer, function (tres) {
		if (tres.status) {
			containerlib.StartContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/stop', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.StopContainer, function (tres) {
		if (tres.status) {
			containerlib.StopContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/update', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.UpdateContainer, function (tres) {
		if (tres.status) {
			containerlib.UpdateContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/restore', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.RestoreContainer, function (tres) {
		if (tres.status) {
			containerlib.RestoreContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/purge', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.PurgeContainer, function (tres) {
		if (tres.status) {
			containerlib.PurgeContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/remove', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.RemoveContainer, function (tres) {
		if (tres.status) {
			containerlib.RemoveContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/delete', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.DeleteContainer, function (tres) {
		if (tres.status) {
			containerlib.DeleteContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/restart', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.RestartContainer, function (tres) {
		if (tres.status) {
			containerlib.RestartContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/migrate', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.MigrateContainer, function (tres) {
		if (tres.status) {
			containerlib.MigrateContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/execute', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.ExecuteContainer, function (tres) {
		if (tres.status) {
			containerlib.ExecuteContainer(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/setlabels', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.SetContainerLabels, function (tres) {
		if (tres.status) {
			containerlib.SetContainerLabels(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/container/logs/:environmentid/:containerid', authoption, function (req, res) {
	var body = { environmentid: req.params.environmentid , containerid: req.params.containerid };
	
	tokenvalidation.IsValidRequest(req, true, container_keywords.GetContainerLogs, function (tres) {
		if (tres.status) {
			containerlib.GetContainerLogs(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/container/containerstats', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, container_keywords.ContainerStats, function (tres) {
		
		if (tres.status) {
			containerlib.ContainerStats(body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});

module.exports = router;
