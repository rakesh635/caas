var tokenvalidation = tokenvalidation || {},
	dbconnection = require('../../helper/dbconnection.js'),
	commonhelper = require('./commonhelper.js'),
	status = require('./statushelper.js').Status,
	auth = require('basic-auth'),
	util = require('util'),
	crypto = require('crypto'),
	guid = require('node-uuid'),
	randomstring = require('randomstring'),
	format = require('string-format'),
	urlpath = require('url'),
	appconfig = require('../../appconfig.js');
(function (validate) {
	"use strict";
	validate.IsValidToken = function (req, callback) {
		var token = req.headers["x-api-token"];
		dbconnection.CreateConnection(function (res) {
			if (res.status) {
				var db = res.response,
					credential = auth(req);
				if (token) {
					db.query(util.format("CALL sp_getsaltkeybyusername('%s')", credential.name), function (e, row, fld) {
						if (e) {
							callback(new status().Failed);
						}
						else {
							if (row[0]) {
								commonhelper.GenerateEncryptedKeyBySalt(credential.pass, row[0][0].pwd_saltkey_32, row[0][0].pwd_saltkey_16 , function (tres) {
									if (tres) {
										db.query(format("CALL sp_isvalidapi('{0}','{1}','{2}')", token, credential.name, tres.token), function (err, r, f) {
											db.end(function (ed) { });
											if (err) {
												callback(new status().InvalidToken);
											}
											else {
												if (r[0][0].isauthvalid && r[0][0].isauthvalid === 1) {
													var rstatus = new status().Authenticated;
													rstatus.data = { customerid: r[0][0].cust_id }
													callback(rstatus);
												}
												else {
													callback(new status().InvalidToken);
												}
											}
										});
									}
									else {
										callback(new status().AuthenticationFailed);
									}
									
								});
							}
							else {
								callback(new status().AuthenticationFailed);
							}
						}
					});
				}
				else {
					callback(new status().InvalidToken);
				}
			}
			else {
				callback(new status().InvalidToken);
			}
		});
	};
	validate.IsSessionValid = function (req, callback) {
		var token = req.headers["x-session-token"];
		if (token) {
			dbconnection.CreateConnection(function (res) {
				if (res.status) {
					 var db = res.response;
					db.query(format("CALL sp_apisessionalive('{0}')", token), function (err, r, f) {
						db.end(function (e) { });
						if (r[0].length > 0 && r[0][0].result === 1) {
							callback(new status().Authenticated);
						}
						else {
							callback(new status().AuthenticationFailed);
						}

					});
				}
				else {
					callback(new status().InvalidToken);
				}
			});
		}
		else {
			callback(new status().InvalidRequest);
		}
		
	};
	validate.isAPIAccessValid = function (req, apikeyword, callback) {
		var token = req.headers["x-session-token"];
		if (token) {
			dbconnection.CreateConnection(function (res) {
				if (res.status) {
					var db = res.response;
					db.query(format("CALL sp_checkapiaccess('{0}','{1}')", token, apikeyword), function (err, r, f) {
						db.end(function (e) { });
						if (r[0].length > 0 && r[0][0].isapiaccessvalid === 1) {
							callback(new status().Authenticated);
						}
						else {
							callback(new status().AuthenticationFailed);
						}

					});
				}
				else {
					callback(new status().InvalidToken);
				}
			});
		}
		else {
			callback(new status().InvalidRequest);
		}
		
	};
	validate.IsValidRequest = function (req, isSessionValidationRequired, apikeyword, callback) {
		try {
			validate.IsValidOriginURL(req, function (ures) {
				ures.status = true;
				if (ures.status) {
					validate.IsValidToken(req, function (vres) {
						if (vres.status) {
							if (isSessionValidationRequired) {
								validate.IsSessionValid(req, function (sres) {
									if (sres.status) {
										callback(sres);
										/*if (apikeyword) {
											validate.isAPIAccessValid(req, apikeyword, function (ares) {
												if (ares.status) {
													callback(ares);
												}
												else {
													callback(new status().InvalidRequest);
												}
											});
										}
										else {
											callback(new status().InvalidRequest);
										}*/
									}
									else {
										callback(new status().TokenExpired);
									}
								});
							}
							else {
								callback(vres);
							}
						}
						else {
							callback(new status().AuthenticationFailed);
						}
					});
				}
				else {
					callback(new status().AuthenticationFailed);
				}
			});
		} 
		catch (ex) {
			callback(new status().Exception);
		}
		
	};
	validate.GenerateAPIToken = function (req, cusid, callback) {
		var token = req.headers["x-api-token"];
		if (token) {
			dbconnection.CreateConnection(function (res) {
				if (res.status) {
					var db = res.response,
						buffer = new Array(32);
					guid.v4(null, buffer, 0).toString();
					var tokenText = guid.unparse(buffer);
					commonhelper.GenerateEncryptedKey(function (gtres) {
						db.query(format("CALL sp_insert_api_token('{0}','{1}')", gtres.token, cusid), function (xerr, xr, xf) {
							db.end(function (e) { });
							if (xr != undefined && xr != null && xr.affectedRows === 1) {
								var tstatus = new status().TokenGenerated;
								tstatus.data = { token: gtres.token };
								callback(tstatus);
							}
							else {
								callback(new status().AuthenticationFailed);
							}
						});
					});
				
				}
				else {
					callback(new status().Failed);
				}
			});
		}
		else {
			callback(new status().InvalidRequest);
		}
		
	};
	validate.IsValidOriginURL = function (req, callback) {
		var url = req.headers["origin"];
		if (url === undefined || url === null) {
			url = req.headers["x-origin"];
		}
		if (url) {
			dbconnection.CreateConnection(function (res) {
				if (res.status) {
					var db = res.response;
					var salt32 = randomstring.generate(32),
						salt16 = randomstring.generate(16),
						buffer = new Array(32),
						tokenText = '',
						newtoken = '';
					guid.v4(null, buffer, 0).toString();
					tokenText = guid.unparse(buffer);
					newtoken = GenerateAPITempToken(salt32, salt16, tokenText);
					db.query(format("CALL is_valid_url('{0}')", url), function (xerr, xr, xf) {
						db.end(function (e) { });
						if (xr != undefined && xr != null && xr.length > 0 && xr[0].length > 0 && xr[0][0].status === 1) {
							callback(new status().Success);
						}
						else {
							callback(new status().AuthenticationFailed);
								
						}
					});
				
				}
				else {
					callback(new status().Failed);
				}
			});
		}
		else {
			callback(new status().InvalidRequest);
		}
		
	};
	validate.GitHubWebhookAuthValidation = function (username, password, webhookrepotokenid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(format("CALL sp_isvalidwebhookaccess('{0}','{1}','{2}')", username, password, webhookrepotokenid), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
						callback(new status().AuthenticationFailed);
					}
					else {
						if (r[0][0].accessstatus && r[0][0].accessstatus === 1) {
							callback(new status().Authenticated);
						} else {
							callback(new status().AuthenticationFailed);
						}
					}
				
				});
			}
			else {
				callback(new status().Failed);
			}
		});
	};
	validate.IsValidAuthorization = function (username, password, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getsaltkeybyusername('%s')", username), function (e, row, fld) {
					if (e) {
						callback(new status().Failed);
					}
					else {
						if (row[0][0]) {
							commonhelper.GenerateEncryptedKeyBySalt(password, row[0][0].pwd_saltkey_32, row[0][0].pwd_saltkey_16 , function (tres) {
								if (tres.token) {
									db.query(format("CALL sp_isvalidauthorization('{0}','{1}')", username, tres.token), function (er, r, f) {
										//db.end(function (ed) { });
										if (er) {
											callback(new status().Failed);
										}
										else {
											if (r[0][0].isauthvalid !== undefined && r[0][0].isauthvalid !== null && r[0][0].isauthvalid === 1) {
												callback(new status().Success);
											}
											else {
												callback(new status().Failed);
											}
										}
									});
								}
								else {
									callback(new status().AuthenticationFailed);
								}
									
							});
						}
						else {
							callback(new status().AuthenticationFailed);
						}
					}
				});
				
			}
		});
	};

}(tokenvalidation));
module.exports = tokenvalidation;

function GenerateAPITempToken(salt32, salt16, ePwd) {
	cipher = crypto.createCipheriv('aes-256-cbc', salt32 , salt16);
	var keydata = cipher.update(ePwd);
	keydata += cipher.final();
	return new Buffer(keydata, 'binary').toString('base64');
}
