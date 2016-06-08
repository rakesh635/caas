var accountlib = accountlib || {},
	util = require('util'),
	linq = require('node-linq').LINQ,
	commonhelper = require('../api/helper/commonhelper.js'),
	statushelper = require('../api/helper/statushelper.js').Status,
	appconfig = require('../appconfig.js').Configurations,
	dbconnection = require('../helper/dbconnection.js');
(function (lib) {
	/**Login**/
	lib.LoginValidation = function (username, password, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				var encrpyt_password = '';
				db.query(util.format("CALL sp_getsaltkeybyusername('%s')", username), function (e, res, fld) {
					if (e) {
						callback(new statushelper().Failed);
					}
					else if (res[0].length !== undefined && res[0].length !== null && res[0].length > 0) {
						
						commonhelper.GenerateEncryptedKeyBySalt(password, res[0][0].pwd_saltkey_32, res[0][0].pwd_saltkey_16, function (tres) {
							var encrypt_password = tres.token;
							
							db.query(util.format("CALL sp_getaccount('%s','%s')", username, encrypt_password), function (er, r, f) {
								db.end(function (e) { });
								if (er) {
									callback(new statushelper().Failed);
								}
								if (r) {
									if (r[0].length !== undefined && r[0].length !== null && r[0].length > 0) {
										var status = new statushelper().Success;
										status.data = r[0][0];
										callback(status);
									}
									else {
										callback(new statushelper().AuthenticationFailed);
									}
								}
								else {
									callback(new statushelper().AuthenticationFailed);
								}
							});
						});
					}
					else {
						callback(new statushelper().InvalidAccount);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
    };
    lib.ImpersonateUser = function (username, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_impersonateuser('%s')", username), function (er, r, f) {
                    db.end(function (e) { });
                    if (er) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        var status = new statushelper().Success;
                        status.data = r[0];
                        callback(status);
                    }
                });
            }
            else {
                callback(new statushelper().DBConnectionFailed);
            }
        });
    };
	lib.SendPasswordURL = function (username, email, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_checkaccount('%s','%s')", username, email), function (er, r, f) {
					if (er) {
						callback(new statushelper().Failed);
					}
					if (r[0].length !== undefined && r[0].length !== null && r[0].length > 0) {
						var acccountid = r[0][0].accountid, status = false;
						db.query(util.format("CALL sp_resetpasswordlog('%s','%s')", acccountid, status), function (er, rr, f) {
							db.end(function (e) { });
							if (er) {
								callback(new statushelper().Failed);
							}
							if (rr[0].length !== undefined && rr[0].length !== null && rr[0].length > 0) {
								if (rr[0][0].reset_id) {
									var data = {
										'from': appconfig.EmailSettings.user,
										'to': email,
										'text': 'Click here to reset your password ' + appconfig.ResetPasswordURL + rr[0][0].reset_id,
										'subject': 'ISCP - Reset Password'
									};
									commonhelper.SendEmail(data, function (vres) {
										if (vres.status) {
											callback(new statushelper().Success);
										}
										else {
											callback(new statushelper().Failed);
										}
									});
								}
								else
									callback(new statushelper().Failed);
							}
							else
								callback(new statushelper().Failed);
						});
					}
					else {
						callback(new statushelper().AuthenticationFailed);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.ValidateResetPassword = function (resetid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_validateresetpassword('%s')", resetid), function (er, r, f) {
					if (er) {
						callback(new statushelper().Failed);
					}
					if (r[0].length !== undefined && r[0].length !== null && r[0].length > 0) {
						callback(new statushelper().Success);
					}
					else {
						callback(new statushelper().Failed);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.UpdatePassword = function (resetid, newpassword, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_updatepassword('%s','%s')", resetid, newpassword), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						callback(new statushelper().Success);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	/**Login**/
	/**Customer**/
	lib.ListCustomers = function (callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getcustomers()"), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						var status = new statushelper().Success;
						status.data = r[0];
						callback(status);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.GetCustomer = function (customerid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getcustomer('%s')", customerid), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						var status = new statushelper().Success;
						status.data = r[0][0];
						callback(status);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.CreateCustomer = function (data, isapitokenrequired, callback) {
		var apitoken = '';
		var key16 = '';
        var key32 = '';
        var req = data;
		commonhelper.GenerateEncryptedKey(function (tres) {
			if (isapitokenrequired) {
				apitoken = tres.token;
				key16 = tres.salt16;
				key32 = tres.salt32;
			}
			dbconnection.CreateConnection(function (dres) {
				if (dres.status) {
					var db = dres.response;
                    db.query(util.format("CALL sp_insertcustomer('%s','%s','%s','%s','%s','%s','%s',%s,'%s','%s','%s','%s','%s','%s','%s','%s')", data.firstname, data.lastname, data.companyname, data.prefix, data.username, data.password, apitoken, isapitokenrequired == false ? 0 : 1, data.customertype, data.licensestartdate, data.licenseenddate, data.email, data.contactno, key16, key32, data.createdby), function (e, r, f) {
                        if (e) {
                            callback(new statushelper().Failed);
                        }
                        else {
                            var status = new statushelper().Success;
                            status.data = r[0];
                            var emailtemplate = '';
                            if (isapitokenrequired) {
                                emailtemplate = 'welcomecustomerapitoken';
                            }
                            else {
                                emailtemplate = 'welcomecustomer';
                            }
                            db.query(util.format("CALL sp_gettemplate('%s')", emailtemplate), function (er, rr, f) {
                                db.end(function (e) { });
                                if (er) {
                                }
                                else {
                                    var body = rr[0][0].template;
                                    body = body.replace("{{firstname}}", req.firstname);
                                    if (isapitokenrequired) {
                                        body = body.replace('{{apitoken}}', apitoken);
                                    }
                                    var data = { body: body, subject: 'CaaS Registration', to: req.email };
                                    commonhelper.SendEmail(data, function (cres) {
                                        callback(status);
                                });
                             }
                         });
                       }
					});
				}
				else {
					callback(new statushelper().DBConnectionFailed);
				}
			});
		});
	};
	lib.UpdateCustomer = function (data, currentapistatus, apitokenstatus, callback) {
		var apitoken = '0';
		var key16 = '0';
		var key32 = '0';
		commonhelper.GenerateEncryptedKey(function (tres) {
			if (currentapistatus === "0" && apitokenstatus === 1) {
				apitoken = tres.token;
				key16 = tres.salt16;
				key32 = tres.salt32;
			}
			dbconnection.CreateConnection(function (dres) {
				if (dres.status) {
					var db = dres.response;
					db.query(util.format("CALL sp_updatecustomer('%s','%s','%s','%s',%s,'%s','%s','%s','%s')", data.customerid, data.firstname, data.lastname, apitoken, apitokenstatus, data.contactno, key16, key32, data.updatedby), function (er, r, f) {
						db.end(function (e) { });
						if (er) {
							callback(new statushelper().Failed);
						}
						else {
							if (currentapistatus === "0" && apitokenstatus === 1) {
                              var edata = { body: util.format("Hi %s %s, Your CaaS API Token is: %s", data.firstname, data.lastname, apitoken), subject: 'Your CaaS Api Access Token', to: data.email };
                              commonhelper.SendEmail(edata, function (eres) {
                                  callback(new statushelper().Success);
                              });
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
		});
	};
	lib.DeleteCustomer = function (customerstatus, customerid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_changecustomerstatus(%s,'%s')", customerstatus, customerid), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						callback(new statushelper().Success);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
    };
    lib.GetRunningApp = function (customerid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                
                db.query(util.format("CALL sp_getrunningapp('%s')", customerid), function (e, r, f) {
                    db.end(function (e) { });
                    if (e) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        var status = new statushelper().Success;
                        status.data = r[0][0];
                        callback(status);
                    }
                });
            }
            else {
                callback(new statushelper().DBConnectionFailed);
            }
        });
    };
    lib.RegenerateAPIToken = function (data, callback) { 
        var apitoken = '0';
        var key16 = '0';
        var key32 = '0';
        commonhelper.GenerateEncryptedKey(function (tres) {
                apitoken = tres.token;
                key16 = tres.salt16;
                key32 = tres.salt32;
            dbconnection.CreateConnection(function (dres) {
                if (dres.status) {
                    var db = dres.response;
                    db.query(util.format("CALL sp_updatecustomerapitoken('%s','%s','%s','%s')", data.customerid, apitoken, key16, key32), function (er, r, f) {
                        db.end(function (e) { });
                        if (er) {
                            callback(new statushelper().Failed);
                        }
                        else {
                                var edata = { body: util.format("Hi %s %s, Your New CaaS API Token is: %s", data.firstname, data.lastname, apitoken), subject: 'Regenerate CaaS Api Access Token', to: data.email };
                                commonhelper.SendEmail(edata, function (eres) {
                                    callback(new statushelper().Success);
                                });
                            }
                    });
                }
                else {
                    callback(new statushelper().DBConnectionFailed);
                }
            });
        });
    };
	/**Customer**/
	
	lib.CreateUser = function (data, callback) {
			dbconnection.CreateConnection(function (dres) {
				if (dres.status) {
                var db = dres.response;
                var req = data;
					db.query(util.format("CALL sp_insertaccount('%s', '%s','%s', '%s', '%s', '%s','%s','%s')", data.firstname, data.lastname, data.username, data.customerid, data.email, data.designation, data.createdbyuser, data.roleid), function (er, r, f) {
						if (er) {
							callback(new statushelper().Failed);
						}
                    else {
                        var status = new statushelper().Success;
                        status.data = r[0][0];
                        db.query(util.format("CALL sp_gettemplate('%s')", 'welcomeuser'), function (e, rr, f) {
                            db.end(function (e) { });
                            if (e) {
                                callback(status);
                            }
                            else {
                                var body = rr[0][0].template;
                                body = body.replace("{{firstname}}", req.firstname);
                                body = body.replace('{{username}}', req.username);
                                body = body.replace('{{action_url}}', appconfig.EmailSettings.url + 'user/setpassword/' + status.data.activationkey);
                                var data = { body: body, subject: 'CaaS Registration', to: req.email };
                                commonhelper.SendEmail(data, function (cres) {
                                    callback(status);
                                });
                            }
                        });
					  }
					});
				}
				else {
					callback(new statushelper().DBConnectionFailed);
				}
			});
    };
  
	lib.GetAccounts = function (customerid, isallusers, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getaccountlist('%s',%s)", customerid, isallusers), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						var status = new statushelper().Success;
						status.data = r[0];
						callback(status);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.GetAccount = function (accountid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getaccountbyaccountid('%s')", accountid), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						var status = new statushelper().Success;
						status.data = r[0][0];
						callback(status);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.UpdateUser = function (data, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_updateuser('%s','%s','%s','%s','%s')", data.accountid, data.firstname, data.lastname, data.designation, data.role), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						callback(new statushelper().Success);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});

	};
	lib.DeleteUser = function (accountstatus, accountid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_changeaccountstatus(%s,'%s')", accountstatus, accountid), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						callback(new statushelper().Success);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
    };
    lib.GetUserCount = function (customerid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                
                db.query(util.format("CALL sp_getusercount('%s')", customerid), function (e, r, f) {
                    db.end(function (e) { });
                    if (e) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        var status = new statushelper().Success;
                        status.data = r[0][0];
                        callback(status);
                    }
                });
            }
            else {
                callback(new statushelper().DBConnectionFailed);
            }
        });
    };
	lib.GetRoles = function (callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getroles()"), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						var status = new statushelper().Success;
						status.data = r[0];
						callback(status);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.GetMenuList = function (callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getmenulist()"), function (er, r, f) {
					db.end(function (e) { });
					if (er) {
						callback(new statushelper().Failed);
					}
					else {
						var menulist = new linq(r[0]);
						var parentmenulist = lib.GetMenuListByParams(menulist, 0, 0, function () { 
						
						});
						var status = new statushelper().Success;
						status.data = menulist;
						callback(status);
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.GetMenuListByParams = function (menulist, parentid, gparentid, callback) {
		var list = new linq(menulist)
		.Where(function (w) {
			return w.parent_menuid === parentid, w.gparent_menuid === gparentid;
		})
		.Orderby(function (o) {
			return o.sequence;
		})
		.Select(function (s) {
			return { menuid: s.menuid, menuname: s.menu_name, url: s.url };
		})
		.ToArray();
		callback(list);
    };
    lib.CheckUserActivationKey = function (activationkey, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_checkuseractivationkey('%s')", activationkey), function (er, r, f) {
                    db.end(function (e) { });
                    if (er) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        var status = new statushelper().Success;
                        status.data = r[0];
                        callback(status);
                    }
                });
            }
            else {
                callback(new statushelper().DBConnectionFailed);
            }
        });
    };
    lib.UpdateUserPassword = function (accountid, password, callback) {
        var encrypted_token = '';
        var key16 = '';
        var key32 = '';
        commonhelper.GenerateEncryptedKeyByPassword(password, function (tres) {
            encrypted_token = tres.token;
            key16 = tres.salt16;
            key32 = tres.salt32;
            dbconnection.CreateConnection(function (dres) {
                if (dres.status) {
                    var db = dres.response;
                    db.query(util.format("CALL sp_updateuserpassword('%s','%s','%s','%s')", accountid, encrypted_token, key16, key32), function (er, r, f) {
                        db.end(function (e) { });
                        if (er) {
                            callback(new statushelper().Failed);
                        }
                        else {
                            callback(new statushelper().Success);
                        }
                    });
                }
                else {
                    callback(new statushelper().DBConnectionFailed);
                }
            });
        });
	};

}(accountlib));
module.exports = accountlib;