var repohelper = repohelper || {},
	dbconnection = require('../../helper/dbconnection.js'),
	statushelper = require('./statushelper.js').Status,
	util = require('util');
(function (helper) {
	helper.InsertWebhook = function (body, callback) {
		try {
			dbconnection.CreateConnection(function (res) {
				if (res.status) {
					var db = res.response;
					db.query(util.format("CALL sp_insertwebhookrepotoken('%s','%s','%s')", body.accountid, body.custid, body.repoid), function (er, r, f) {
						db.end(function (e) { });
						var ostatus = new statushelper().Success;
						if (er) {
							callback(new statushelper().Failed);
						}
						else {
							ostatus.data = r[0][0];
							callback(ostatus);
						}
						
					});
				}
				else {
					callback(new statushelper().Failed);
				}
			});
		}
		catch (ex) {
			callback(new statushelper().Failed);
		}
	};
	helper.GetWebhook = function (webhookrepotokenid, callback) {
		dbconnection.CreateConnection(function (res) {
			if (res.status) {
				var db = res.response;
				db.query(util.format("CALL sp_getwebhooktoken('%s')", webhookrepotokenid), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
						callback(new statushelper().Failed);
					}
					else {
						if (r[0][0]) {
							var status = new statushelper().Success;
							status.data = r[0][0];
							callback(status);
						}
					}
				});
			}
			else {
				callback(new statushelper().Failed);
			}
		});
	};
}(repohelper));
module.exports = repohelper;