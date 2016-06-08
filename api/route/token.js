"use strict";
var express = require('express'),		
	status = require('../helper/statushelper').Status,
	guid = require('node-uuid'),
	crypto = require('crypto'),	
	tokenValidation = require('../helper/tokenvalidation.js'),	
	router = express.Router(),
	httpauth = require('http-auth'),
	basic = httpauth.basic({
		realm: 'Caas Security'
	}, function (username, password, callback) {
		tokenValidation.IsValidAuthorization(username, password, function (vres) {
			callback(vres.status);
		});
	}),
	authoption = httpauth.connect(basic);

router.get('/token', authoption, function (req, res) {
	console.log("request from " + req.headers['origin']);
	tokenValidation.IsValidRequest(req, false, undefined, function (vres) {
		if (vres.status) {
			if (vres.data.customerid) {
				tokenValidation.GenerateAPIToken(req, vres.data.customerid, function (tres) {
					if (tres.status) {
						res.json(tres);
					}
					else {
						res.json(new status().Failed);
					}
				});
			}
			else {
				res.json(vres);
			}
		}
		else {
			res.json(vres);
		}
	});
	
});
module.exports = router;

