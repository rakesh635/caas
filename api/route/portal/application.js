var express = require('express'),
	router = express.Router(),
	tokenvalidation = require('../helper/tokenvalidation.js'),	
	applib = require('../../../plib/applicationlib.js'),	
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

module.exports = router;