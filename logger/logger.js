var logger = logger || {},	
	util = require('util'),
	statushelper = require('../api/helper/statushelper').Status,
	dbconnection = require('../helper/dbconnection.js');
(function (log) {
	log.LogType = function () {
		return { portal: 'portal', api: 'api' };
	};
	log.Error = function (accountid, node, classname, functionname, exception, logtypeid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_inserterror('%s','%s','%s','%s','%s','%s')", accountid, node, classname, functionname, exception, logtypeid), function (er, r, f) {
					db.end(function (e) {					
						var x = e;
					});
					if (callback) {
						if (er) {
							callback(new statushelper().Exception);
						}
						else {
							callback(new statushelper().Success);
						}
					}
				});
			}
			else {
				if (callback) {
					callback(new statushelper().Failed);
				}
			}
		});
	};
	log.AuditLog = function (action, logtype, description, customerid, accountid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_insertauditlog('%s','%s','%s','%s','%s')", action, logtype, description, customerid, accountid), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
						log.Error('NA', 'Logger', 'logger', e, data.logtype);
						callback(new statushelper().Exception);
					}
					else {
						callback(new statushelper().Success);
					}
				});
			}
			else {
				callback(new statushelper().Failed);
			}
		});
	};
}(logger));
module.exports = logger; 