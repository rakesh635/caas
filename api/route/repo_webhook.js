"use strict";
var express = require('express'),	
	router = express.Router(),
	util = require('util'),
	tokenvalidation = require('../helper/tokenvalidation.js'),
	repohelper = require('../helper/repohelper'),
	commonhelper = require('../helper/commonhelper.js'),
	statushelper = require('../helper/statushelper.js').Status,
	repo_model = require('../model/repomodel.js'),
	repo_accesskey = repo_model.RepoAccessKey,
	githubclient = require('../services/githubservice/githubclient.js'),
	commonhelper = require('../helper/commonhelper.js'),
	plib = require('../../plib/applicationlib.js'),
	appconfig = require('../../appconfig.js').Configurations,
	auth = require('basic-auth'),
	httpauth = require('http-auth'),
	basic = httpauth.basic({
		realm: 'Caas Security'
	}, function (username, password, callback) {
		tokenvalidation.GitHubWebhookAuthValidation(username, password, 'null', function (vres) {
			callback(vres.status);
		});
	}),
	authoption = httpauth.connect(basic);
router.post('/repo/payload/:tokenid/:applicationid', authoption, function (req, res) {
	if (req.params.tokenid) {
		var credential = auth(req);
		tokenvalidation.GitHubWebhookAuthValidation(credential.name, credential.pass, req.params.tokenid , function (vres) {
			if (vres.status) {
				plib.GetApplicationByID(req.params.applicationid, function (ares) {
					if (ares.status) {
						var task = {
							id: commonhelper.NewGUID() ,
							name: 'createbuild',
							taskstatus: 'new', pid: 1,
							application: { id: req.params.applicationid, name: ares.data.application_name },
						};
						commonhelper.InsertDaemonTask(task);
						res.json(new statushelper().Authenticated);
					}
				});
			}
		});
	}
	else {
		res.json(new statushelper().AuthenticationFailed);
	}
	
});
module.exports = router;