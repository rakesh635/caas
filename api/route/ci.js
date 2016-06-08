var express = require('express'),
	router = express.Router(),
	tokenvalidation = require('../helper/tokenvalidation.js'),	
	cilib = require('../../lib/cilib.js'),
	cimodel = require('../model/cimodel.js'),
	ciaccesskeys = require('../model/cimodel.js').CIAccessKeys,
	statushelper = require('../helper/statushelper.js').Status,
	plib=require('../../plib/applicationlib.js'),
	commonhelper = require('../helper/commonhelper.js'),
	util = require('util'),
	httpauth = require('http-auth'),
	basic = httpauth.basic({
		realm: 'Caas Security'
	}, function (username, password, callback) {
		tokenvalidation.IsValidAuthorization(username, password, function (vres) {
			callback(vres.status);
		});
	}),
	authoption = httpauth.connect(basic);
/*JOB*/
router.put('/ci/job/create/:name', authoption, function (req, res) {
	var ibody = {
		name: req.params.name,
		data: req.body.data
	};
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.CreateJob, function (tres) {
		if (tres.status) {
			if (req.params.name) {
				cilib.CreateJob(ibody, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ParameterMissing);
			}
			
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/job/copy', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.CopyJob, function (tres) {
		if (tres.status) {
			cilib.CopyJob(req.body, function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/job/delete/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.DeleteJob, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.DeleteJob(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ParameterMissing);
			}
		
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/job/build/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.BuildJob, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.BuildJob(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ParameterMissing);
			}
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/job/enable/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.EnableJob, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.EnableJob(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ParameterMissing);
			}
			
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/job/disable/:name', function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.DiableJob, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.DisableJob(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ParameterMissing);
			}
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/ci/job/exists/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.GetJob, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.JobExists(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ParameterMissing);
			}
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/ci/job/get/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.GetJob, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.GetJob(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ParameterMissing);
			}
			
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/ci/job/list', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.GetJobList, function (tres) {
		
		if (tres.status) {
			cilib.GetJobList(function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
/*Build*/
router.get('/ci/build/get/:jobname/:buildno', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.GetBuild, function (tres) {
		
		if (tres.status) {
			if (req.params.jobname) {
				var body = {
					jobname : req.params.jobname,
					buildno: req.params.buildno
				};
				cilib.GetBuild(body, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
			
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/ci/build/log/:jobname/:buildno', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.GetBuildLog, function (tres) {
		
		if (tres.status) {
			if (req.params.jobname) {
				var body = {
					jobname : req.params.jobname,
					buildno: req.params.buildno
				};
				cilib.BuildLog(body, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
			
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/build/stop', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.StopBuild, function (tres) {
		
		if (tres.status) {
			if (req.body.jobname) {
				cilib.StopBuild(req.body, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
			
		}
		else {
			res.json(tres);
		}
	});
});
router.post('/ci/build/status', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, false, ciaccesskeys.CreateJob, function (tres) {
		if (tres.status) {
			if (req.body.status) {
				plib.UpdateProcessedApplicationTask(req.body.applicationid, 'created', 'buildsucceed');
				res.json(new statushelper().Success);
			}
			else {
				plib.UpdateProcessedApplicationTask(req.body.applicationid, 'failed', 'buildsucceed');
				res.json(new statushelper().Success);
			}
		}
		else {
			res.json(tres);
		}

	});
});
/*Node*/
router.put('/ci/node/create/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.CreateNode, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.CreateNode(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
			
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/node/delete/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.DeleteNode, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.DeleteNode(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
			
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/node/enable/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.EnableNode, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.EnableNode(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/node/disable/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.DeleteNode, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.DisableNode(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/ci/node/exists/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.NodeExists, function (tres) {
		
		if (tres.status) {
			if (req.params.name) {
				cilib.NodeExists(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/ci/node/get/:name', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.GetNode, function (tres) {
		if (tres.status) {
			if (req.params.name) {
				cilib.GetNode(req.params.name, function (cres) {
					res.json(cres);
				});
			}
			else {
				res.json(new statushelper().ContentMissing);
			}
		}
		else {
			res.json(tres);
		}
	});
});
router.get('/ci/node/list', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.GetNodeList, function (tres) {
		
		if (tres.status) {
			cilib.GetNodeList(function (cres) {
				res.json(cres);
			});
		}
		else {
			res.json(tres);
		}
	});
});
router.put('/ci/credential/create', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, ciaccesskeys.GetNodeList, function (tres) {
		if (tres.status) {
			cilib.CreateCredential(req.body, function (cres) {
				req.json(cres);
			});
		}
		else {
			res.json(tres);
		}

	});
});

module.exports = router;
