"use strict";
var express = require('express'),	
	appconfig = require('../../appconfig.js'),
	commonhelper = require('../helper/commonhelper.js'),
	statushelper = require('../helper/statushelper.js').Status,	
	volume_model = require('../model/volumemodel.js'),
	volume_keywords = volume_model.VolumeAccessKeys,
	volumeclient = require('../services/rancherservice/volumeclient.js'),
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
router.put('/volumes', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.GetVolumes, function (tres) {
		if (tres.status) {
			volumeclient.GetVolumes(body.environmentid, function (err, sres, sbody) {
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
router.put('/volume', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.GetVolume, function (tres) {
		if (tres.status) {
			volumeclient.GetVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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
router.put('/volume/create', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.CreateVolume, function (tres) {
		if (tres.status) {
			volumeclient.CreateVolume(body.environmentid, body.data, function (err, sres, sbody) {
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
router.put('/volume/activate', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.ActivateVolume, function (tres) {
		if (tres.status) {
			volumeclient.ActivateVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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
router.put('/volume/allocate', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.AllocateVolume, function (tres) {
		if (tres.status) {
			volumeclient.AllocateVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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
router.put('/volume/deallocate', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.DeallocateVolume, function (tres) {
		if (tres.status) {
			volumeclient.DeallocateVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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
router.put('/volume/remove', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.RemoveVolume, function (tres) {
		if (tres.status) {
			volumeclient.RemoveVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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
router.put('/volume/update', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.UpdateVolume, function (tres) {
		if (tres.status) {
			volumeclient.UpdateVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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
router.put('/volume/restore', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.RestoreVolume, function (tres) {
		if (tres.status) {
			volumeclient.RestoreVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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
router.put('/volume/purge', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.PurgeVolume, function (tres) {
		if (tres.status) {
			volumeclient.PurgeVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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
router.put('/volume/delete', authoption, function (req, res) {
	var body = req.body;
	tokenvalidation.IsValidRequest(req, true, volume_keywords.DeleteVolume, function (tres) {
		if (tres.status) {
			volumeclient.DeleteVolume(body.environmentid, body.volumeid, function (err, sres, sbody) {
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