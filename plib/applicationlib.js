"use strict";
var applicationlib = applicationlib || {},
	util = require('util'),
	LINQ = require('node-linq').LINQ,
	commonhelper = require('../api/helper/commonhelper.js'), 
    statushelper = require('../api/helper/statushelper.js').Status,
    model = require('../api/model/applicationmodel.js'),
	repolib = require('../lib/repolib.js'),
    dbconnection = require('../helper/dbconnection.js'),
    appconfig = require('../appconfig.js').Configurations;
(function (lib) {
	lib.CreateApplication = function (data, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				commonhelper.GenerateEncryptedKeyByPlainText(data.Repositories[0].repopassword, function (gres) {
                      db.query(util.format("CALL sp_insertapplication('%s','%s','%s','%s','%s','%s',%s,'%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s',%s,'%s','%s','%s','%s','%s','%s','%s')", data.apptype, data.appname, data.appusername, data.apppassword, data.Repositories[0].repousername, gres.token, data.Repositories[0].isrepopublic, data.Repositories[0].repotype, data.Repositories[0].repourl, gres.salt32, gres.salt16, data.platformid, data.linkeddbid, null, data.webservermasterid, data.command, data.targetfolder, data.customerid, data.isapplinkedinwebapp, data.createdby, data.buildtypeid, data.environmentvariables, data.description, data.apptitle, data.Repositories[0].branchname, data.application_plugins), function (e, r, f) {
						db.end(function (e) { });
						if (e) {
							callback(new statushelper().Failed);
						}
						else {
							var status = new statushelper().Success;
                            var data = r[0];
                            if (data.length > 0) {
                                var app = data[0];
                                var appid = app.appid;
                                var apptask = new model.AppDaemonCreate();
                                apptask.id = commonhelper.NewGUID();
                                apptask.name = 'createcredential';
                                apptask.taskstatus = 'new';
                                apptask.pid = 1;
                                apptask.application.id = appid;
                                apptask.application.name = app.appname;
                                if (app.platformname.toLowerCase() === 'database') {
                                    var platformversion = app.platformversion.replace(/\./g, '').replace('0', '');
                                    apptask.application.appplatformversion = app.platformname.toLowerCase() + platformversion;
                                }
                                else {
                                    var platformversion = app.platformversion.replace(/\./g, '').replace('0', '');
                                    var buildtypeversion = app.buildtypeversion.replace(/\./g, '').replace('0', '');
                                    var webserverversion = app.webserverversion.replace(/\./g, '').replace('0', '');
                                    apptask.application.appplatformversion = app.buildtypename.toLowerCase() + buildtypeversion + app.platformname.toLowerCase() + platformversion + app.webservername.toLowerCase() + webserverversion;
                                }
                                apptask.repo.id = app.repoid;
                                apptask.repo.name = app.reponame;
                                apptask.repo.username = app.repousername;
                                apptask.repo.password = app.repopassword;
                                apptask.repo.url = app.repourl;
                                apptask.repo.branchname = app.repobranchname;
                                if (app.webhookid) {
                                    apptask.webhook.url = app.webhookuser + ":" + app.webhookpswd + '@' + appconfig.CaaSURL + '/api/v1/repo/payload/' + app.webhookid + '/' + appid;
                                }
                                commonhelper.InsertDaemonTask(apptask, function (vres) {
                                    var status = 0;
                                    if (vres.status) {
                                        status = 1;
                                    }
                                    db.query(util.format("CALL sp_updatedaemonStatus('%s','%s',%s)", 'application', appid, status), function (e, rr, f) {
                                        db.end(function (e) { });
                                        callback(new statushelper().Success);
                                    });
                                });
                            }
                            else {
                                callback(new statushelper().Success);
                            }
						}
					});
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.UpdateApplication = function (data, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_updateapplication('%s','%s','%s','%s','%s')", data.appname, data.command, data.description, data.id, data.modifiedby), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
	lib.CreateDatabase = function (data, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_insertrepo('%s','%s','%s','%s','%s','%s','%s','%s')", data.Repositories[0].repousername, data.Repositories[0].repousername, data.Repositories[0].repopassword, data.Repositories[0].repourl, data.Repositories[0].repotype, data.Repositories[0].isrepopublic, data.customerid, data.createdby), function (e, r, f) {
					if (e) {
						callback(new statushelper().Failed);
					}
					else {
						data.repoid = r[0][0].repoid;
						db.query(util.format("CALL sp_insertapplication('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')", 'db', data.appname, data.repoid, data.platformid, null, null, data.webservermasterid, data.customerid, data.environmentid, data.isapplinkedinwebapp, data.createdby, data.buildtypeid), function (e, dr, f) {
							db.end(function (e) { });
							if (e) {
								callback(new statushelper().Failed);
							}
							else {
								var status = new statushelper().Success;
								status.data = dr[0];
								callback(status);
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
	lib.CreateWebApplication = function (data, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				//todo:add app,add db, add repo for app & db
				
				db.query(util.format("CALL sp_insertapplication('%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s','%s')", 'webapp', data.appname, data.repoid, data.platformid, data.linkeddbid, data.linkedappid, data.webservermasterid, data.customerid, data.environmentid, data.isapplinkedinwebapp, data.createdby, data.buildtypeid), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
	lib.ListApplications = function (customerid, applicationtype, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getapplications('%s','%s')", customerid, applicationtype), function (e, r, f) {
					if (e) {
						callback(new statushelper().Failed);
					}
					else {
						if (r[0]) {
							var data = r[0];
							//var applicationids = '';
							//for (var i = 0; i < data.length; i++) {
							//	if (i == data.length - 1) {
							//		applicationids += "\'" + data[i].application_id + "\'";
							//	}
							//	else {
							//		applicationids += "\'" + data[i].application_id + "\'" + ',';
							//	}
							//}
							//var applicationids = applicationids.replace(/'/g, "\\'");
							//db.query(util.format("CALL sp_getappinstances('%s','%s',%s)", applicationids, customerid, 0), function (er, rr, fn) {
							//	db.end(function (e) { });
							//	if (er) {
							//		callback(new statushelper().Failed);
							//	}
							//	else {
									//var instance = rr[0];
                            data.forEach(function (app) {
                                var progress_percent = '';
                                if (app.build_status === 'Creating') {
                                    progress_percent = 100 * app.build_level / 6;
                                }
                                else if (app.build_status === 'Created') {
                                    progress_percent = 100;
                                }
                                else if (app.build_status === 'Deleting') {
                                    progress_percent = 100 * app.build_level / 4;
                                }
										//var app_inst = new LINQ(instance).Where(function (inst) { return inst.application_id === app.application_id }).ToArray();
										//var running_inst = new LINQ(app_inst).Where(function (inst) { return inst.build_status === 'Deployed' }).ToArray();
										app.build_level = parseInt(progress_percent);
										//app.instance = /*running_inst.length + ' of ' +*/ app_inst.length;
									});
									var status = new statushelper().Success;
									status.data = data;
									callback(status);
								}
						//	});
						//}
						//else {
						//	var status = new statushelper().Success;
						//	status.data = '';
						//	callback(status);
						//}
					}
				});
			}
			else {
				callback(new statushelper().DBConnectionFailed);
			}
		});
	};
	lib.LoadPlatforms = function (type, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getplatforms('%s')", type), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
	lib.LoadExistingDatabaseApps = function (customerid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getdatabaseapps('%s')", customerid), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
	lib.LoadBuildTypes = function (platformid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getbuildtypesbyplatformid('%s')", platformid), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
	lib.LoadWebservers = function (callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getwebservers()"), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
	lib.GetApplicationByID = function (applicationid, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getapplicationbyid('%s')", applicationid), function (e, r, f) {
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
		});
	};
	lib.RepoValidation = function (data, callback) {
		repolib.GetRepoContent(data, function (cres) {
			callback(cres);
		});
    };
    lib.LoadGitBranch = function (data, callback) {
        repolib.GetBranches(data, function (cres) { 
            callback(cres);
        });
    };
	lib.GetInstances = function (applicationids, customerid, showallinstances, callback) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
                var db = dres.response;
                var appid = "\'" + applicationids + "\'";
                applicationids = appid.replace(/'/g, "\\'");
				db.query(util.format("CALL sp_getappinstances('%s','%s',%s)", applicationids, customerid, showallinstances), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
    lib.GetLinkDBCount = function (applicationids, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;

                db.query(util.format("CALL sp_getlinkeddbcount('%s')", applicationids), function (e, r, f) {
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
    lib.GetInstance = function (applicationids, customerid, showallinstances, appinstanceid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                var appid = "\'" + applicationids + "\'";
                applicationids = appid.replace(/'/g, "\\'");
                db.query(util.format("CALL sp_getappinstancebyid('%s','%s',%s,'%s')", applicationids, customerid, showallinstances, appinstanceid), function (e, r, f) {
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
    lib.DeleteInstance = function (status, instanceid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_changeinstancebyid(%s,'%s')", status, instanceid), function (er, r, f) {
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
    
    lib.UpdateInstance = function (data, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_updateinstance('%s','%s')", data.instancename,data.app_instance_id), function (er, r, f) {
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
    
    
    
    

	lib.IsApplicationIdExist = function (customerid,applicationid,callback) { 
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_isappidalreadyexist('%s','%s')", customerid, applicationid), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
	lib.GetPlugins = function (platformid, callback) { 
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format("CALL sp_getplugins('%s')", platformid), function (e, r, f) {
					db.end(function (e) { });
					if (e) {
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
    lib.GetBuildVersion = function (applicationid, callback) { 
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_getappbuild('%s')", applicationid), function (e, r, f) {
                    db.end(function (e) { });
                    if (e) {
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
    lib.CreateAppInstance = function (data, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                 db.query(util.format("CALL sp_insertappinstance('%s','%s','%s','%s','%s')", data.applicationid, data.environmentid, data.buildversion, data.createdby, data.instancename), function (e, r, f) {
                     db.end(function (e) { });
                     if (e) {
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
    lib.DeleteApplication = function (applicationid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_changeappstatusondelete('%s')", applicationid), function (e, r, f) {
                    db.end(function (e) { });
                    if (e) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        var status = new statushelper().Success;
                        var data = r[0];
                        if (data.length > 0) {
                            var app = data[0];
                            var appid = app.appid;
                            var apptask = new model.AppDaemonDelete();
                            apptask.id = commonhelper.NewGUID();
                            apptask.name = 'deactivateapplication';
                            apptask.taskstatus = 'new';
                            apptask.pid = 3;
                            apptask.application.id = appid;
                            apptask.application.name = app.appname;
                            if (app.platformname.toLowerCase() === 'database') {
                                var platformversion = app.platformversion.replace(/\./g, '').replace('0', '');
                                apptask.application.appplatformversion = app.platformname.toLowerCase() + platformversion;
                            }
                            else {
                                var platformversion = app.platformversion.replace(/\./g, '').replace('0', '');
                                var buildtypeversion = app.buildtypeversion.replace(/\./g, '').replace('0', '');
                                var webserverversion = app.webserverversion.replace(/\./g, '').replace('0', '');
                                apptask.application.appplatformversion = app.buildtypename.toLowerCase() + buildtypeversion + app.platformname.toLowerCase() + platformversion + app.webservername.toLowerCase() + webserverversion;
                            }
                            apptask.repo.id = app.repoid;
                            apptask.repo.name = app.reponame;
                            apptask.repo.username = app.repousername;
                            apptask.repo.password = app.repopassword;
                            apptask.repo.url = app.repourl;
                            apptask.repo.branchname = app.repobranchname;
                            if (app.webhookid) {
                                apptask.webhook.url = app.webhookuser + ":" + app.webhookpswd + '@' + appconfig.CaaSURL + '/api/v1/repo/payload/' + app.webhookid + '/' + appid;
                            }
                            commonhelper.InsertDaemonTask(apptask, function (vres) {
                                var status = 0;
                                if (vres.status) {
                                    status = 1;
                                }
                                db.query(util.format("CALL sp_updatedaemonStatus('%s','%s',%s)", 'application', appid, status), function (e, rr, f) {
                                    db.end(function (e) { });
                                    callback(new statushelper().Success);
                                });
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
    };
    lib.UpdateInstanceStatus = function (instanceid, instancestatus, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_changeinstancestatus('%s','%s')", instanceid, instancestatus), function (e, r, f) {
                    db.end(function (e) { });
                    if (e) {
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
	lib.UpdateProcessedApplicationTask = function (id, bstatus, tasktype) {
		dbconnection.CreateConnection(function (dres) {
			if (dres.status) {
				var db = dres.response;
				db.query(util.format('CALL sp_updateapplicationtaskstatus("%s","%s","%s")', id, bstatus, tasktype), function (e, r, f) {
					db.end(function (er) { });
					if (e) {
						console.log(util.format('Database Update Failed For:App_AppTaskID: %s & Buildstatus: %s & TaskType: %s', id, bstatus, tasktype));
					}
					else {
						console.log(util.format('Database Updated For:App_AppTaskID: %s & Buildstatus: %s', id, bstatus, tasktype));
					}
				});
			}
			else {
				console.log(util.format('Database Update Failed For:App_AppTaskID: %s & Buildstatus: %s & TaskType: %s', id, bstatus, tasktype));
			}
		});
	};
}(applicationlib));
module.exports = applicationlib;