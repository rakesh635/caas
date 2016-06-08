var express = require('express'),
	plib = require('../plib/applicationlib.js'),
	applicationmodel = require('../model/applicationmodel.js').ApplicationModel,
	statushelper = require('../api/helper/statushelper.js').Status,
    errlogger = require('../logger/logger.js'),
    dateformat = require('dateformat');
	router = express.Router();
router.get('/', function (req, res) {
	if (req.session.accountdetails) {
		res.render('application/manage/all', { title: 'Applications' });
	}
	else {
		res.redirect('/');
	}
});

router.get('/createdatabase', function (req, res) {
	if (req.session.accountdetails) {
		plib.LoadPlatforms('database', function (pres) {
			if (pres.status) {
					res.render('application/createdatabase', { title: 'createdb',dbplatforms: pres.data, pagemode: 'createapp'});
			}
			else {
				    res.render('application/createdatabase', { title: 'createdb',dbplatforms: []});
			}
		});
	}
	else {
		res.redirect('/');
	}
});
router.post('/createdatabase', function (req, res) {
	if (req.session.accountdetails) {
		var body = req.body;
		var appmodel = new applicationmodel().Application;
		appmodel.apptype = 'database';
		appmodel.appname = body.txtdatabaseid;
        appmodel.apptitle = body.txtdatabasename;
        appmodel.appusername = body.txtdatabaseusername;
        appmodel.apppassword = body.txtdatabasepassword;
		appmodel.buildtypeid = '0';
		appmodel.platformid = body.ddlplatform;
		appmodel.command = body.txtlaunchscript;
		appmodel.targetfolder = '';
		appmodel.isapplinkedinwebapp = 0;
		appmodel.createdby = req.session.accountdetails.accountid;
		appmodel.environmentvariables = body.hndenvironmentvariables;
		appmodel.description = body.txtappdescription;
		appmodel.customerid = req.session.accountdetails.customerid;
		appmodel.application_plugins = null;
		appmodel.webservermasterid = '0';
		var repo = new applicationmodel().Repository;
		repo.repousername = body.txtappusername;
		repo.repopassword = body.txtapppassword;
		repo.repourl = body.txtgiturl;
		repo.branchname = body.ddlgitbranch;
		repo.repotype = 'git';
		repo.isrepopublic = 0;
		appmodel.Repositories.push(repo)
		plib.CreateApplication(appmodel, function (cres) {
			res.redirect('/application/manage/database');
		});
	}
	else {
		res.redirect('/');
	}
	
});

router.get('/createapplication', function (req, res) {
	if (req.session.accountdetails) {
		plib.LoadPlatforms('application', function (pres) {
            if (pres.status) {
                plib.LoadPlatforms('database', function (dres) {
                    if (dres.status) {
                        plib.LoadWebservers(function (lres) {
                            if (lres.status) {
                                //plib.LoadExistingDatabaseApps(req.session.accountdetails.customerid, function (eres) {
                                //    if (eres.status) {
                                //        res.render('application/createapplication', { appplatforms: pres.data, dbplatforms: dres.data, webservers: lres.data, databaseapps: eres.data, pagemode: 'create' });
                                //    }
                                //    else {
                                //        errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'createdatabase', lres.message, 1);
                                //        res.render('application/createapplication', { appplatforms: pres.data, dbplatforms: dres.data, webservers: lres.data, databaseapps: [], pagemode: 'create' });
                                //    }
                                //});
                                errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'createdatabase', lres.message, 1);
                                res.render('application/createapplication', { title : 'createapp',appplatforms: pres.data, dbplatforms: dres.data, webservers: lres.data, pagemode: 'create' });
                            }
                            else {
                                errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'createdatabase', lres.message, 1);
                                res.render('application/createapplication', { appplatforms: pres.data, dbplatforms: dres.data, webservers: [], pagemode: 'create' });
                            }
                        });
                    }
                    else {
                        errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'createdatabase', pres.message, 1);
                        res.render('application/createapplication', { appplatforms: pres.data, dbplatforms: [], webservers: [], pagemode: 'create' });
                    }
               });
			}
			else {
				errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'createdatabase', pres.message, 1);
				res.render('application/createapplication', { appplatforms: [], dbplatforms: [], webservers: [], pagemode: 'create'});
			}
		});
	}
	else {
		res.redirect('/');
	}

});
router.post('/createapplication', function (req, res) {
	if (req.session.accountdetails) {
		var body = req.body;
		var appmodel = new applicationmodel().Application;
		appmodel.apptype = req.body.hdnapptype;
		appmodel.appname = body.txtappid;
        appmodel.apptitle = body.txtappname;
		appmodel.buildtypeid = body.ddlbuildtype;
		appmodel.platformid = body.ddlappplatform;
		appmodel.command = body.txtcommand;
		appmodel.targetfolder = body.txttargetfolder;
		appmodel.isapplinkedinwebapp = 0;
		appmodel.createdby = req.session.accountdetails.accountid;
		appmodel.customerid = req.session.accountdetails.customerid;
		appmodel.linkeddbid = body.ddldatabases;
		appmodel.environmentvariables = body.hndenvironmentvariables;
		appmodel.description = body.txtappdescription;
		appmodel.webservermasterid = body.ddlwebserver;
		appmodel.application_plugins = req.body.hdnplugins;
		var repo = new applicationmodel().Repository;
		repo.branchname = body.ddlgitbranch;
		repo.repousername = body.txtappusername;
		repo.repopassword = body.txtapppassword;
		repo.repourl = body.txtappgiturl;
		var tempreponame = body.txtappgiturl.split('/');
		var reponame= tempreponame[4].split('.')[0];
		repo.reponame = reponame;
		repo.repotype = 'git';
		repo.isrepopublic = 0;
		appmodel.Repositories.push(repo)
		plib.CreateApplication(appmodel, function (cres) {
			res.redirect('/application/manage/application');
		});
	}
	else {
		res.redirect('/');
	}
	
	
});
router.post('/updateapplication/:applicationid/:type', function (req, res) {
	if (req.session.accountdetails) {
		var body = req.body;
		switch (req.params.type) {
			case 'app':
				var appmodel = new applicationmodel().Application;
				appmodel.id = req.params.applicationid;
				appmodel.appname = body.txtappname;
				appmodel.command = body.txtcommand;
				appmodel.modifiedby = req.session.accountdetails.accountid;
				appmodel.description = body.txtdesc;
				plib.UpdateApplication(appmodel, function (cres) {
					res.redirect('/application/manage/application');
				});
				break;
			case 'db':
				var appmodel = new applicationmodel().Application;
				appmodel.id = req.params.applicationid;
				appmodel.appname = body.txtdatabasename;
				appmodel.command = (body.txtcommand === undefined || body.txtcommand === null)?'':body.txtcommand;
				appmodel.modifiedby = req.session.accountdetails.accountid;
				appmodel.description = body.txtdesc;
				plib.UpdateApplication(appmodel, function (cres) {
					res.redirect('/application/manage/database');
				});
				break;
			default:
				res.render('error', { errormessage: 'Invalid Request' });
				break
		
		}
	}
	else {
		res.redirect('/');
	}
	
	
});
router.get('/viewapplication/:applicationid/:type', function (req, res) {
	if (req.session.accountdetails) {
		switch (req.params.type) {
			case 'app':
				plib.LoadPlatforms('application', function (pres) {
					if (pres.status) {
						plib.LoadWebservers(function (lres) {
							if (lres.status) {
								plib.LoadExistingDatabaseApps(req.session.accountdetails.customerid, function (eres) {
									if (eres.status) {
										plib.GetApplicationByID(req.params.applicationid, function (appres) {
                                            if (appres.status) {
                                                var env_variables = [];
                                                if (appres.data.environment_variables !== undefined && appres.data.environment_variables !== null) {
                                                    env_variables = JSON.parse(appres.data.environment_variables);
                                                }
												plib.LoadBuildTypes(appres.data.platform_id, function (bres) {
													if (bres.status) {
                                                        plib.GetPlugins(appres.data.platform_id, function (pgres) {
															var appplugins = [],
																filteredplugins = [];
                                                            if (appres.data.application_plugins !== undefined && appres.data.application_plugins !== null) {
                                                                    appplugins = appres.data.application_plugins.split(',');
                                                            }
															if (pgres.status) {
																pgres.data.forEach(function (p) {
																	appplugins.forEach(function (i) {
																		if (p.id === i) {
																			filteredplugins.push(p);
																		}
																	});
																});
															}
															res.render('application/viewapplication', { title:'manageapp',appplatforms: pres.data , buildtypes: bres.data, webservers: lres.data, databaseapps: eres.data , pagemode: 'view', appdata: appres.data, environmentvariables: env_variables, appplugins: filteredplugins });
														});
													}
													else {
														res.render('application/viewapplication', { title: 'manageapp', appplatforms: pres.data , buildtypes: bres.data, webservers: lres.data, databaseapps: eres.data , pagemode: 'view', appdata: appres.data, environmentvariables: env_variables, appplugins: [] });
													}
												});
											}
											else {
												res.render('application/viewapplication', { title: 'manageapp',appplatforms: pres.data , buildtypes: [], webservers: lres.data, databaseapps: eres.data , viewmode: 'view', appdata: null, environmentvariables: [], appplugins: [] });
											}
										});
									}
									else {
										errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'createdatabase', lres.message, 1);
										res.render('application/viewapplication', { title: 'manageapp',appplatforms: pres.data , buildtypes: [], webservers: lres.data, databaseapps: [], appplugins: []});
									}
								});
							}
							else {
								errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'createdatabase', lres.message, 1);
								res.render('application/createapplication', { title: 'manageapp',appplatforms: pres.data , buildtypes: [], webservers: [], databaseapps: [], appplugins: []});
							}
						});
					}
					else {
						errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'viewapplication', pres.message, 1);
						res.render('application/createapplication', { title: 'manageapp',appplatforms: [] , buildtypes: [], webservers: [], databaseapps: [], appplugins: []});
					}
				});
				break;
			case 'db':
				plib.LoadPlatforms('database', function (pres) {
					if (pres.status) {
						plib.GetApplicationByID(req.params.applicationid, function (appres) {
                            if (appres.status) {
                                var env_variables = [];
                                if (appres.data.environment_variables !== undefined && appres.data.environment_variables !== null) {
                                    env_variables = JSON.parse(appres.data.environment_variables);
                                }
								res.render('application/viewdatabase', { title: 'manageapp', dbplatforms: pres.data, pagemode: 'view' , appdata: appres.data, environmentvariables: env_variables});
							}
						});
						
					}
					else {
						errlogger.Error(req.session.accountdetails.accountid, 'application', 'application', 'viewdatabase', pres.message, 1);
						res.render('application/viewdatabase', { dbplatforms: [] , pagemode: 'view', appdata: []});
					}
				});
				break;
		}
	
	}
	else {
		res.redirect('/');
	}

});

router.get('/getbuildtypes/:platformid', function (req, res) {
	if (req.session.accountdetails) {
		plib.LoadBuildTypes(req.params.platformid, function (dres) {
			res.render('application/_buildtype', { buildtypes: dres.data });
		});
	}
	else {
        res.redirect('/');
	}
});
router.post('/getgitbranch', function (req, res) {
    if (req.session.accountdetails) {
        req.body.ispublic = req.body.ispublic === "false" ? false: true;
        plib.LoadGitBranch(req.body, function (cres) { 
            res.render('application/_gitbranch', { gitbranch: cres.data });
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/loadexistingdb', function (req, res) {
    if (req.session.accountdetails) {
       plib.LoadExistingDatabaseApps(req.session.accountdetails.customerid, function (dres) {
           res.render('application/_linkdatabase', { databases: dres.data });
       });
    }
    else {
        res.redirect('/');
    }
});
router.get('/manage/:applicationtype', function (req, res) {
	if (req.session.accountdetails) {
		res.render('application/manageapplication', { title : 'manageapp',applicationtype : req.params.applicationtype});
	}
	else {
		res.redirect('/');
	}
});
router.post('/manage/:applicationtype', function (req, res) {
    if (req.session.accountdetails) {
        var apptype = (req.params.applicationtype === 'Application' || req.params.applicationtype === 'WebApplication') ? "application" : req.params.applicationtype;
		plib.ListApplications(req.session.accountdetails.customerid, apptype, function (vres) {
            if (vres.status) {
                var data = vres.data;
                data.forEach(function (record) {
                    record.createdon = dateformat(record.createdon, "dd/mm/yyyy hh:MM:ss");
                });
				res.send({ application: data, iTotalRecords: vres.data.length, iTotalDisplayRecords: vres.data.length });
			}
			else {
				res.send({ application: '', iTotalRecords: 0, iTotalDisplayRecords: 0 });
			}
		});
	}
	else {
		res.redirect('/');
	}
});
router.post('/validaterepo', function (req, res) {
    if (req.session.accountdetails) {
        req.body.ispublic = req.body.ispublic === "false" ? false: true;
		plib.RepoValidation(req.body, function (cres) {
			res.json(cres);
		});
	}
	else {
		res.json(new statushelper().SessionExpired);
	}
});
router.get('/manageinstance', function (req, res) {
	if (req.session.accountdetails) {
		res.render('application/manageinstance', { title : 'manageinstance',type: 'all'});
	}
	else {
		res.redirect('/');
	}
});
router.post('/manageinstance', function (req, res) {
	if (req.session.accountdetails) {
		plib.GetInstances('', req.session.accountdetails.customerid, 1, function (vres) {
            if (vres.status) {
                var data = vres.data;
                data.forEach(function (record) {
                    record.createdon = dateformat(record.createdon, "dd/mm/yyyy hh:MM:ss");
                });
				
				res.send({ instance: data, iTotalRecords: vres.data.length, iTotalDisplayRecords: vres.data.length });
			}
			else {
				res.send({ instance: '', iTotalRecords: 0, iTotalDisplayRecords: 0 });
			}
		});
	}
	else {
		res.redirect('/');
	}
});
router.get('/manageinstance/:applicationid', function (req, res) {
	if (req.session.accountdetails) {
		res.render('application/manageinstance', { title : 'manageinstance', applicationid: req.params.applicationid, type: 'application'});
	}
	else {
		res.redirect('/');
	}
});
router.post('/manageinstance/:applicationid', function (req, res) {
	if (req.session.accountdetails) {
		plib.GetInstances(req.params.applicationid, req.session.accountdetails.customerid, 0, function (vres) {
            if (vres.status) {
                var data = vres.data;
                data.forEach(function (record) {
                    record.createdon = dateformat(record.createdon, "dd/mm/yyyy hh:MM:ss");
                });
				res.send({ instance: data, iTotalRecords: vres.data.length, iTotalDisplayRecords: vres.data.length });
			}
			else {
				res.send({ instance: '', iTotalRecords: 0, iTotalDisplayRecords: 0 });
			}
		});
	}
	else {
		res.redirect('/');
	}
});
router.post('/getlinkdbcount/:applicationid', function (req, res) {
    if (req.session.accountdetails) {
        plib.GetLinkDBCount(req.params.applicationid, function (vres) {
            if (vres.status) {
                res.send({ count: vres.data, iTotalRecords: vres.data.length, iTotalDisplayRecords: vres.data.length });
            }
            else {
                res.send({ count: '', iTotalRecords: 0, iTotalDisplayRecords: 0 });
            }
        });
    }
    else {
        res.redirect('/');
    }
});



router.get('/getenvironments/:applicationid', function (req, res) {
	if (req.session.accountdetails) {

	}
	else {
		res.redirect('/');
	}
});
router.post('/validateapplicationname', function (req, res) {
	if (req.session.accountdetails) {
		plib.IsApplicationIdExist(req.session.accountdetails.customerid, req.body.applicationname, function (cres) {
			if (cres.status) {
				if (cres.data[0].appnamecount === 0) {
					res.json({ valid: true });
				}
				else {
					res.json({ valid: false });
				}
			}
			else {
				res.json({ valid: false });
			}
		});
	}
	else {
		res.redirect('/');
	}
});
router.get('/viewinstance/:app_instance_id/:type', function (req, res) {
    if (req.session.accountdetails) {
        plib.GetInstance('', req.session.accountdetails.customerid, 1, req.params.app_instance_id, function (vres) {
            if (vres.status) {
                res.render('application/viewinstance', { title : 'manageinstance',data: vres.data, action: 'view',type:req.params.type });
            }
            else {
                res.render('application/viewinstance', { title : 'manageinstance', data: [], action: 'view', type: req.params.type });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/updateinstance/:app_instance_id', function (req, res) {
    if (req.session.accountdetails) {
        plib.GetInstance('', req.session.accountdetails.customerid, 1, req.params.app_instance_id, function (vres) {
            if (vres.status) {
                res.render('application/viewinstance', { title : 'manageinstance',data: vres.data, action: 'update' });
            }
            else {
                res.send({ instance: '', iTotalRecords: 0, iTotalDisplayRecords: 0 });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/deleteinstance/:instanceid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.instanceid) {
            plib.DeleteInstance(0, req.params.instanceid, function (vres) {
                res.send({ status: vres });
            });
        }
        else {
            res.redirect('/manageinstance/manageinstance/');
        }
    }
    else {
        res.redirect('/');
    }
});
router.post('/updateinstance', function (req, res) {
    if (req.session.accountdetails) {
        var data = {
            'instancename': req.body.instancename,
            'app_instance_id' : req.body.app_instance_id,
        };
        plib.UpdateInstance(data, function (vres) {
            if (vres.status) {
                res.redirect('/application/manageinstance/');
            }
            else {
                var data = {
                    'instancename': req.body.instancename,
                    'app_instance_id' : req.body.app_instance_id,
                };
                res.render('application/viewinstance', { data: data, error: 'Failed to update Instance. Try again.', action: (req.body.action === 'view' || req.body.action === 'viewupdate') ? 'viewupdate' : 'update' });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/loadplugins/:platformid', function (req, res) {
	if (req.session.accountdetails) {
		var platformid = 0;
		if (req.params.platformid) { 
			platformid = req.params.platformid;
		}
		plib.GetPlugins(platformid, function (cres) {
			if (cres.status) {
				res.render('application/_plugins', { plugins: cres.data });
			}
			else {
				res.render('application/_plugins', { plugins: [] });
			}
			
		});
	}
	else {
		res.redirect('/');
	}
});
router.get('/getbuildversion/:applicationid', function (req, res) {
    if (req.session.accountdetails) {
        plib.GetBuildVersion(req.params.applicationid, function (dres) {
            res.render('application/_buildversion', { buildversions: dres.data });
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/createinstance', function (req, res) {
    if (req.session.accountdetails) {
        var data = {
            applicationid: req.body.applicationid,
            environmentid: req.body.environmentid,
            environmentname: req.body.environmentname,
            buildversion: req.body.buildversion,
            createdby: req.session.accountdetails.accountid,
            instancename : req.body.instancename
        };
        plib.CreateAppInstance(data, function (vres) {
            res.send({ status: vres.status });
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/getapplicationbyid/:applicationid', function (req, res) {
    if (req.session.accountdetails) {
        plib.GetApplicationByID(req.params.applicationid, function (vres) {
            if (vres.status) { 
                res.send({ application: vres.data });
            }
            else {
                res.send({ application: '' });
            }
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/deleteapplication/:applicationid', function (req, res) {
    if (req.session.accountdetails) {
        plib.DeleteApplication(req.params.applicationid, function (vres) {
            res.send({ status: vres });
        });
    }
    else {
        res.redirect('/');
    }
});
router.post('/updateinstancestatus', function (req, res) {
    if (req.session.accountdetails) {
        plib.UpdateInstanceStatus(req.body.instanceid, req.body.instancestatus, function (vres) {
            res.send({ status: vres });
        });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;