var express = require('express'),
	appconfig = require('../../appconfig.js'),
	commonhelper = require('../helper/commonhelper.js'),
	statushelper = require('../helper/statushelper.js').Status,		
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
module.exports = router;

