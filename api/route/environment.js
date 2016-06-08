"use strict";
var express = require('express'),
	request = require('request'),
	appconfig = require('../../appconfig.js'),
	environmenthelper = require('../helper/environmenthelper.js'),
	commonhelper = require('../helper/commonhelper.js'),
	status = require('../helper/statushelper').Status,
	env_model = require('../model/environmentmodel.js'),
	env_apikeywords = env_model.EnvironmentAccessKeys,
	apikey_model = require('../model/accesskeymodel.js'),
	environmentlib = require('../../lib/environmentlib.js'),	
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
router.get('/environments', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetEnvironments, function (sres) {
		if (sres.status) {
			environmentlib.GetEnvironments(function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetEnvironment, function (sres) {
		if (sres.status) {
			environmentlib.GetEnvironment(req, params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/auditlogs/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetAuditLogs, function (sres) {
		if (sres.status) {
			environmentlib.GetAuditLogs(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/networks/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetNetworks, function (sres) {
		if (sres.status) {
			environmentlib.GetNetworks(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/containerevents/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetContainerEvents, function (sres) {
		if (sres.status) {
			environmentlib.GetContainerEvents(environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/labels/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetLabels, function (sres) {
		if (sres.status) {
			environmentlib.GetLabels(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/images/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetImages, function (sres) {
		if (sres.status) {
			environmentlib.GetImages(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/ports/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetPorts, function (sres) {
		if (sres.status) {
			environmentlib.GetPorts(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/physicalhosts/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetPhysicalHosts, function (sres) {
		if (sres.status) {
			environmentlib.GetPhysicalHosts(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.get('/environment/ipaddresses/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetIPAddresses, function (sres) {
		if (sres.status) {
			environmentlib.GetIPAddresses(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/createapikey', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.CreateEnvironmentAPIKey, function (sres) {
		if (sres.status) {
			var apikeyModel = new apikey_model.APIKey();
			apikeyModel.name = req.body.name;
			apikeyModel.description = req.body.description;
			environmentlib.CreateAPIKey(req.body.environmentid, apikeyModel, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(status.TokenExpired);
		}
	});
	
});
router.put('/environment/createcertificate', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.CreateCertificate, function (sres) {
		if (sres.status) {
			environmentlib.CreateCertificate(req.body.environmentid, req.body.data, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
	
});
router.get('/environment/certificate/:environmentid/:certificateid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetCertificate, function (sres) {
		if (sres.status) {
			environmentlib.GetCertificate(req.params.environmentid, req.params.certificateid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
	
});
router.get('/environment/certificates/:environmentid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.GetCertificates, function (sres) {
		if (sres.status) {
			environmentlib.GetCertificates(req.params.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
	
});
router.put('/environment/create', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.CreateEnvironment, function (sres) {
		if (sres.status) {
			var envModel = new env_model.Environment();
			envModel.name = req.body.name;
			envModel.description = req.body.description;
			environmentlib.CreateEnvironment(envModel, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/update', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.UpdateEnvironment, function (sres) {
		var body = req.body;
		if (sres.status) {
			environmentlib.UpdateEnvironment(body.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/restore', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.RestoreEnvironment, function (sres) {
		var body = req.body;
		if (sres.status) {
			environmentlib.RestoreEnvironment(body.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/remove', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.RemoveEnvironment, function (sres) {
		var body = req.body;
		if (sres.status) {
			environmentlib.RemoveEnvironment(body.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/activate', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.ActivateEnvironment, function (sres) {
		var body = req.body;
		if (sres.status) {
			environmentlib.ActivateEnvironment(body.environmentid, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/deactivate', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.DeactivateEnvironment, function (sres) {
		var body = req.body;
		if (sres.status) {
			environmentlib.DeactivateEnvironment(body.environmentid, function (cres) {
				res.json(cres);
			});	
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/purge', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.PurgeEnvironment, function (sres) {
		var body = req.body;
		if (sres.status) {
			environmentlib.PurgeEnvironment(body.environmentid, function (cres) {
				res.json(cres);
			});			
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/setmembers', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.SetMembers, function (sres) {
		var body = req.body;
		if (sres.status) {
			environmentlib.Setmembers(body.environmentid, function (cres) {
				res.json(cres);
			});					
		}
		else {
			res.json(sres);
		}
	});
});
router.put('/environment/delete', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, env_apikeywords.DeleteEnvironment, function (sres) {
		var body = req.body;
		if (sres.status) {
			environmentlib.DeleteEnvironment(body.environmentid, function (cres) {
				res.json(cres);
			});			
		}
		else {
			res.json(sres);
		}
	});
});

module.exports = router;
