var commonhelper = commonhelper || {},
	util = require('util'),
	dbconnection = require('./dbconnection.js');

(function (common) {
	common.GetTokenfromDB = function (callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
			}
		});
	};
	
}(commonhelper));
module.exports = commonhelper;