var dbconnection = dbconnection || {},
mysql = require('mysql'),
mongodb = require('mongodb').Db,
mongoclient = require('mongodb').MongoClient,
appconfig = require('../appconfig.js').Configurations;
(function (connection) {
	"use strict";
	connection.CreateConnection = function (callback) {
		try {
			var db = mysql.createConnection(appconfig.Database);
			db.connect(function (err) {
				if (err) {
					callback({ status: false, response: err });
				}
				callback({ status: true, response: db });
			});

		}
		catch (er) {
			callback({ status: false, response: er });
		}
		
	};
	connection.CreateConnectionByDatabase = function (database, callback) {
		try {
			var db = mysql.createConnection(database);
			db.connect(function (err) {
				if (err) {
					callback({ status: false, response: err });
				}
				callback({ status: true, response: db });
			});

		}
		catch (er) {
			callback({ status: false, response: er });
		}
		
	};
	connection.CreateMongoDBConnection = function (callback) {
		mongoclient.connect(appconfig.MongoDB, function (err, db) {
			if (err) {
				callback({ status: false, response: err });
			}
			callback({ status: true, response: db });
		});
	}
}(dbconnection));

module.exports = dbconnection;