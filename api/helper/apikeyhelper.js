var environmenthelper = environmenthelper || {},
	dbconnection = require('../../helper/dbconnection.js'),
	status = require('./statushelper.js').Status,
	format = require('string-format');
(function (helper) {
	"use strict";
	helper.GetEnviromentAPIKey = function (envid, callback) {
		dbconnection.CreateConnection(function (res) {
			if (res.status) {
				var db = res.response;
				db.query(format("CALL sp_getenvironmentapikey('{0}')", envid), function (err, r, f) {
					db.end(function (e) { });
					if (err) {
						callback(new status().Failed);
					}
					else {
						if (r[0].length > 0) {
							var sstatus = new status().Success;
							sstatus.data = { apikey: r[0][0].apikey, apitoken: r[0][0].apitoken };
							callback(sstatus);
						}
						else {
							callback(new status().Failed);
						}
					}
				});
			}
			else {
				callback(new status().InvalidRequest);
			}
		});
	};
	helper.InsertEnvironmentAPIKey = function (data, envid, callback) {
		dbconnection.CreateConnection(function (res) {
			if (res.status) {
				var db = res.response;
				db.query(format("CALL sp_insertenvironmentapikey('{0}','{1}','{2}','{3}')", data.name, data.publicValue, data.secretValue, envid), function (err, r, f) {
					db.end(function (e) { });
					if (err) {
						callback(new status().Failed);
					}
					else {
						callback(new status().Success);
					}
				});
			}
			else {
				callback(new status().InvalidRequest);
			}
		});
	};
}(environmenthelper));
module.exports = environmenthelper;