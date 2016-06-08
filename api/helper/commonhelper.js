var commonhelper = commonhelper || {},
	dbconnection = require('../../helper/dbconnection.js'),
	statushelper = require('./statushelper.js').Status,
	crypto = require('crypto'),
	guid = require('node-uuid'),
	exec = require('child_process').exec,
	randomstring = require('randomstring'),
	email = require('emailjs'),
	appconfig = require('../../appconfig.js').Configurations,
	util = require('util');
(function (helper) {
	"use strict";
	helper.FilterBodyContent = function (body) {
		if (body.sortLinks) {
			body.sortLinks = null;
		}
		if (body.actions) {
			body.actions = null;
		}
		if (body.links) {
			body.links = null;
		}
		if (body.pagination) {
			body.pagination = null;
		}
		if (body.sort) {
			body.sort = null;
		}
		if (body.filters) {
			body.filters = null;
		}
		if (body.createTypes) {
			body.createTypes = null;
		}
		if (body.data && util.isArray(body.data)) {
			body.data.forEach(function (d, j) {
				if (d.actions) {
					d.actions = null;
				}
				if (d.links) {
					d.links = null;
				}
				if (d.createTypes) {
					d.createTypes = null;
				}
			});
		}
		
		return body;
	};
	helper.GetCustomerbyAccessToken = function (id, callback) {
		dbconnection.CreateConnection(function (res) {
			if (res.status) {
				var db = res.response;
				db.query(util.format("CALL sp_customerbyid('%s')", id), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
						callback(new statushelper().Failed);
					}
					else {
						if (r[0][0].cust_id) {
							var status = new statushelper().Success;
							status.data = r[0][0];
							callback(status);
						}
						else {
							callback(new statushelper().Failed);
						}
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	helper.SendEmail = function (data, callback) {
		/*var server = email.server.connect(appconfig.EmailSettings);
		if (data) {
			server.send({
				'from': data.from,
				'to': data.to,
				'text': data.content,
				'subject': data.subject
			}, function (err, message) {
				callback(new statushelper().Success);
			});
		}
		else {
			callback(new statushelper().Failed);
		}*/
		
		exec(util.format("echo '%s' | mail -a 'From: admin@caas.is.co.za' -a 'MIME-Version: 1.0' -a 'Content-type: text/html' -s '%s' %s", data.body, data.subject, data.to), function (er, so, si) {
			if (er) {
				callback(new statushelper().EmailFailed);
			}
			else {
				callback(new statushelper().Success);
			}
		});
	};
	helper.GenerateEncryptedKey = function (callback) {
		try {
			var salt32 = randomstring.generate(32),
				salt16 = randomstring.generate(16),
				buffer = new Array(32),
				ePwd = '',
				newtoken = '';
			guid.v4(null, buffer, 0).toString();
			ePwd = guid.unparse(buffer);
			var cipher = crypto.createCipheriv('aes-256-cbc', salt32 , salt16);
			var keydata = cipher.update(ePwd);
			keydata += cipher.final();
			newtoken = new Buffer(keydata, 'binary').toString('base64');
			callback({ token: newtoken, salt16: salt16, salt32: salt32 });
		}
        catch (ex) {
			callback(new statushelper().Failed);
		};
	};
	helper.GenerateEncryptedKeyByPlainText = function (text, callback) {
		try {
			var salt32 = randomstring.generate(32),
				salt16 = randomstring.generate(16);
			var cipher = crypto.createCipheriv('aes-256-cbc', salt32, salt16);
			var encrypted = cipher.update(text, 'utf8', 'hex')
			encrypted += cipher.final('hex');
			callback({ token: encrypted, salt16: salt16, salt32: salt32 });
		}
        catch (ex) {
			callback(new statushelper().Failed);
		};
	};
   helper.GenerateEncryptedKeyByPassword = function (text, callback) {
		try {
			var salt32 = randomstring.generate(32),
				salt16 = randomstring.generate(16),
				newtoken = '';			
			var cipher = crypto.createCipheriv('aes-256-cbc', salt32 , salt16);
			var keydata = cipher.update(text);
			keydata += cipher.final();
			newtoken = new Buffer(keydata, 'binary').toString('base64');
			callback({ token: newtoken, salt16: salt16, salt32: salt32 });
		}
        catch (ex) {
			callback(new statushelper().Failed);
		};
	};
	helper.GenerateTextFromSalt = function (encryptedtext, salt32, salt16, callback) {
		try {			
			var decipher = crypto.createDecipheriv('aes-256-cbc', salt32, salt16)
			var dec = decipher.update(encryptedtext, 'hex', 'utf8')
			dec += decipher.final('utf8');
			var status = new statushelper().Success;
			status.data = dec;
			callback(status);
		}
		catch (ex) { 
			callback(new statushelper().Failed);
		}
	};
	helper.GenerateEncryptedKeyBySalt = function (text, salt32, salt16, callback) {
		try {
			var buffer = new Array(32),
				ePwd = text,
				newtoken = '';
			var cipher = crypto.createCipheriv('aes-256-cbc', salt32 , salt16);
			var keydata = cipher.update(ePwd);
			keydata += cipher.final();
			newtoken = new Buffer(keydata, 'binary').toString('base64');
			callback({ token: newtoken, salt16: salt16, salt32: salt32 });
		}
        catch (ex) {
			callback(new statushelper().Failed);
		};
	};
	helper.CheckDuplicateNames = function (name, email, type, customerid, callback) {
		try {
			dbconnection.CreateConnection(function (res) {
				if (res.status) {
					var db = res.response;
					db.query(util.format("CALL sp_checkduplicatenames('%s', '%s','%s','%s')", name, email, type, customerid), function (er, r, f) {
						db.end(function (e) { });
						if (er) {
							callback(new statushelper().Failed);
						}
						else {
							if (r) {
								var status = new statushelper().Success;
								status.data = r;
								callback(status);
							}
							else {
								callback(new statushelper().Success);
							}
						}
					});
				}
				else {
					callback(new statushelper().DBConnectionFailed);
				}
			});
		}
        catch (ex) {
			callback(new statushelper().Failed);
		};
	};
	helper.NewGUID = function () { 
		var buffer = new Array(32);
		guid.v4(null, buffer, 0).toString();
		var id = guid.unparse(buffer);
		return id;
	}
	helper.InsertDaemonTask = function (task, callback) {
		dbconnection.CreateMongoDBConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
                var daemontasklist = db.collection('daemontasklist');
                daemontasklist.insertOne(task, function (terr, tresult) {
                    var r = tresult;
					if (r.ok) {
						if (callback) { 
							callback(new statushelper().Success);
						}
                        
                    }
					else {
						if (callback) {
							callback(new statushelper().Failed);
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
	}
}(commonhelper));
module.exports = commonhelper;