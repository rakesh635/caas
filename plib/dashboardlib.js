var dashboardlib = dashboardlib || {},
    util = require('util'),
    LINQ = require('node-linq').LINQ,
    dbconnection = require('../helper/dbconnection.js'),
    statushelper = require('../api/helper/statushelper.js').Status;
(function (lib) {
    lib.GetDashboardView = function (custid, callback) {
        dbconnection.CreateConnection(function (dres) {
            if (dres.status) {
                var db = dres.response;
                db.query(util.format("CALL sp_getdashboardview('%s')", custid), function (e, r, f) {
                    if (e) {
                        callback(new statushelper().Failed);
                    }
                    else {
                        if (r && r[0]) {
                            var data = r[0];
                            db.query(util.format("CALL sp_getappinstancescount('%s')", custid), function (er, rr, f) {
                                db.end(function (e) { });
                                if (er) {
                                    callback(new statushelper().Failed);
                                }
                                else {
                                    var instances = rr[0];
                                    data.forEach(function (app) {
                                        var instance = new LINQ(instances).Where(function (inst) { return inst.application_type_name === app.application_type_name }).ToArray();
                                        if (instance[0]) {
                                            app.instancecount = instance[0].count;
                                        }
                                    });
                                    var status = new statushelper().Success;
                                    status.data = data;
                                    callback(status);
                                }
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
}(dashboardlib));

module.exports = dashboardlib;