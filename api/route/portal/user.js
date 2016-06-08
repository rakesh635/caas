var express = require('express'),
	plib = require('../../../plib/accountlib.js'),
	router = express.Router(),
	tokenvalidation = require('../../helper/tokenvalidation.js'),		
	statushelper = require('../../helper/statushelper.js').Status,
	commonhelper = require('../../helper/commonhelper.js'),
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
router.get('/user/list/:customerid', authoption, function (req, res) {
	tokenvalidation.IsValidRequest(req, true, null, function (tres) {
		if (tres.status) {
			plib.GetAccounts(req.params.customerid, 0, function (gres) {
				res.json(gres);
			});
		}
		else {
			res.json(tres);
		}
	});
	
});
module.exports = router;