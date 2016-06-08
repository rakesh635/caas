"use strict";
var express = require('express'),	
	router = express.Router(),
	tokenvalidation = require('../helper/tokenvalidation.js'),
	statushelper = require('../helper/statushelper.js').Status,
	gitlib = require('../../lib/repolib.js'),
	githubclient = require('../services/githubservice/githubclient.js'),
	appconfig = require('../../appconfig.js').Configurations,
	repo_model = require('../model/repomodel.js'),
	repo_members = repo_model.RepoMembers,
	repo_accesskey = repo_model.RepoAccessKey,
	auth = require('basic-auth'),
	httpauth = require('http-auth'),
	basic = httpauth.basic({
		realm: 'Caas Security'
	}, function (username, password, callback) {
		tokenvalidation.IsValidAuthorization(username, password, function (vres) {
			callback(vres.status);
		});
	}),
	authoption = httpauth.connect(basic);

router.post('/repo/addwebhook', function (req, res) {
	tokenvalidation.IsValidRequest(req, true, repo_accesskey.AddRepo, function (tres) {
		if (tres.status) {			
			var inputdata = {repoid: req.body.repoid,accountid: req.body.accountid};
			gitlib.AddWebHook(inputdata, function (cres) {
				res.json(cres);
			});		
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/repo/list', function (req, res) {
	tokenvalidation.IsValidRequest(req, true, repo_accesskey.GetRepoList, function (vres) {
		if (vres.status) {
			gitlib.GetRepos(req.body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(vres);
		}
	});
});

router.get('/repo/branches/:owner/:reponame/:token', function (req, res) {
	tokenvalidation.IsValidRequest(req, true, repo_accesskey.GetRepoList, function (vres) {
		if (vres.status) {
			if (req.params.token && req.params.reponame && req.params.owner) {
				githubclient.GetBranches(req.params.token, req.params.owner, req.params.reponame, function (err, gres, body) {
					if (err) {
						res.json(new statushelper().Failed);
					}
					else {
						var status = new statushelper().Success;
						if (body) {
							var branches = [];
							body.forEach(function (v, i) {
								var branch = new repo_members().Branch;
								branch.branchname = v.name;
								branches.push(branch);
							});
							status.data = branches;
						}
						res.json(status);
					}
				});
			}
			else {
				res.json(new statushelper().ParameterMissing);
			}
		
		}
	});
});

module.exports = router;

function GetBranches(body) {
	var branches = [];
	if (body) {
		body.forEach(function (v, i) {
			var branch = new repo_members().Branch;
			branch.branchname = v.name;
			branches.push(branch);
		});
	}
	return branches;
}