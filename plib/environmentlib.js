var environmentlib = environmentlib || {},
    util = require('util'),
    commonhelper = require('../api/helper/commonhelper.js'),
    statushelper = require('../api/helper/statushelper.js').Status,
    model = require('../api/model/environmentmodel.js'),
    appconfig = require('../appconfig.js').Configurations,
    dbconnection = require('../helper/dbconnection.js');
(function (lib) {
    lib.CreateEnvironment = function (data, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_insertenvironment('%s','%s','%s','%s','%s','%s')", data.environmenttitle, data.environmentname, data.description, data.billingid, data.customerid, data.createdby), function (er, r, f) {
                    if (er) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        var status = new statushelper().Success;
                        var data = r[0];
                        if (data.length > 0) {
                            var envid = data[0].envid;
                            var envtask = new model.EnvDaemonCreate();
                            envtask.id = commonhelper.NewGUID();
                            envtask.name = 'createenvironment';
                            envtask.taskstatus = 'new';
                            envtask.pid = 1;
                            envtask.environment.envid = envid;
                            envtask.environment.domain = data[0].domainname;
                            envtask.environment.envname = data[0].envname;
                            envtask.environment.envdesc = data[0].envdesc;
                            envtask.environment.imagename = data[0].image;
                            envtask.environment.flavorname = data[0].flavor;
                            commonhelper.InsertDaemonTask(envtask, function (vres) {
                                var status = 0;
                                if (vres.status) {
                                    status = 1;
                                }
                                db.query(util.format("CALL sp_updatedaemonStatus('%s','%s',%s)",'environment', envid, status), function (e, rr, f) {
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
    lib.ListEnvironments = function (customerid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_getenvironments('%s')", customerid), function (er, r, f) {
                    db.end(function (e) { });
                    if (er) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        var status = new statushelper().Success;
                        var data = r[0];
                        data.forEach(function (env) {
                            var progress_percent = 100 * env.build_level / 2;
                            env.build_level = parseInt(progress_percent);
                        });
                        status.data = data;
                        callback(status);
                    }
                });
            }
            else {
                callback(new statushelper().DBConnectionFailed);
            }
        });
    };
    lib.GetEnvironment = function (environmentid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_getenvironment('%s')", environmentid), function (er, r, f) {
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
    lib.UpdateEnvironment = function (data, callback) { 
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_updateenvironment('%s','%s','%s','%s')", data.environmentid, data.environmenttitle, data.description, data.updatedby), function (er, r, f) {
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
    lib.DeletEnvironment = function (envstatus, environmentid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_changeenvironmentstatus('%s', %s)", environmentid, envstatus), function (er, r, f) {
                    db.end(function (e) { });
                    if (er) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        var status = new statushelper().Success;
                        var data = r[0];
                        if (data.length > 0) {
                            var envid = data[0].envid;
                            var envtask = new model.EnvDaemonDelete();
                            envtask.id = commonhelper.NewGUID();
                            envtask.name = 'deactivateenvironment';
                            envtask.taskstatus = 'new';
                            envtask.pid = 2;
                            envtask.environment.envid = envid;
                            envtask.environment.externalenvid = data[0].externalenvid;
                            envtask.environment.envname = data[0].envname;
                            envtask.environment.envdesc = data[0].envdesc;
                            envtask.environment.imagename = data[0].imagename;
                            envtask.environment.flavorname = data[0].flavorname;
                            envtask.environment.domain = data[0].domain;
                            envtask.environment.vmid = data[0].vmid;
                            envtask.environment.vmname = data[0].vmname;
                            commonhelper.InsertDaemonTask(envtask, function (vres) {
                                var status = 0;
                                if (vres.status) {
                                    status = 1;
                                }
                                db.query(util.format("CALL sp_updatedaemonStatus('%s','%s',%s)", 'environment', envid, status), function (e, rr, f) {
                                    db.end(function (e) { });
                                    callback(new statushelper().Success);
                                });
                            });
                        }
                        callback(new statushelper().Success);
                    }
                });
            }
            else {
                callback(new statushelper().DBConnectionFailed);
            }
        });
    };
    lib.GetFlavors = function (callback) { 
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_getproductcatalog()"), function (er, r, f) {
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
    lib.GetOS = function (callback) { 
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_getos()"), function (er, r, f) {
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
    lib.GetCostDetails = function (flavorid, osid, callback) { 
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_getbillingdetails('%s','%s')", flavorid, osid), function (er, r, f) {
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
}(environmentlib));
module.exports = environmentlib;