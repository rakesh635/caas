var express = require('express'),
    router = express.Router(),
    envlib = require('../plib/environmentlib.js'),
    commonhelper = require('../api/helper/commonhelper.js');
    dateformat = require('dateformat');
router.get('/create', function (req, res) {
    if (req.session.accountdetails) {
        envlib.GetFlavors(function (pres) {
            if (pres.status) {
                envlib.GetOS(function (ores) {
                    if (ores.status) {
                        res.render('environment/createenvironment', { title: 'CreateEnv', flavors: pres.data, os: ores.data  });
                    }
                    else {
                        res.render('environment/createenvironment', { title: 'CreateEnv', flavors: pres.data, os: [] });
                    }
                });
            }
            else {
                res.render('environment/createenvironment', { title: 'CreateEnv', productcatalog: [], os:[] });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.post('/create', function (req, res) {
    if (req.session.accountdetails) {
        var data = {
            'environmenttitle' : req.body.environmenttitle,
            'environmentname': req.body.environmentname,
            'description': req.body.description,
            'billingid': req.body.billingid,
            'customerid': req.session.accountdetails.customerid,
            'createdby': req.session.accountdetails.accountid
        };
        envlib.CreateEnvironment(data, function (vres) {
            if (vres.status) {
                res.redirect('/environment/manage');
            }
            else {
                res.render('environment/createenvironment', { title: 'CreateEnv', error: 'Failed to create Environment.'});
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/manage', function (req, res) {
    if (req.session.accountdetails) {
        res.render('environment/manageenvironment', { title: 'ManageEnv' });
    }
    else {
        res.redirect('/');
    }
});
router.post('/manage', function (req, res) {
    if (req.session.accountdetails) {
        envlib.ListEnvironments(req.session.accountdetails.customerid, function (vres) {
            if (vres.status) {
                
                var data = vres.data;
                data.forEach(function (record) {
                    record.createdon = dateformat(record.createdon, "dd/mm/yyyy hh:MM:ss");
                });
				
                res.send({ environment: data, iTotalRecords: vres.data.length, iTotalDisplayRecords: vres.data.length });
            }
            else {
                res.send({ environment: '', iTotalRecords: 0, iTotalDisplayRecords: 0 });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/view/:environmentid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.environmentid) {
            envlib.GetEnvironment(req.params.environmentid, function (vres) {
                if (vres.status) {
                    res.render('environment/viewenvironment', { title:'ManageEnv', data: vres.data, action: 'view' });
                }
                else {
                    res.redirect('/environment/manage');
                }
            });
        }
        else {
            res.redirect('/environment/manage');
        }
    }
    else {
        res.redirect('/');
    }
});
router.get('/update/:environmentid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.environmentid) {
            envlib.GetEnvironment(req.params.environmentid, function (vres) {
                if (vres.status) {
                    res.render('environment/viewenvironment', { title: 'ManageEnv', data: vres.data, action: 'update' });
                }
                else {
                    res.redirect('/customer/manage');
                }
            });
        }
        else {
            res.redirect('/customer/manage');
        }
    }
    else {
        res.redirect('/');
    }
});
router.post('/update', function (req, res) {
    if (req.session.accountdetails) {
        var data = {
            'environmentid' : req.body.environmentid,
            'environmenttitle': req.body.environmenttitle,
            'description': req.body.description,
            'updatedby': req.session.accountdetails.accountid
        };
        envlib.UpdateEnvironment(data, function (vres) {
            if (vres.status) {
                res.redirect('/environment/manage');
            }
            else {
                var data = {
                    'environment_id': req.body.environmentid,
                    'environmenttitle': req.body.environmentname,
                    'description': req.body.description
                };
                res.render('environment/viewenvironment', { title: 'ManageEnv', data: data, error: 'Failed to update environment. Try again.', action: (req.body.action === 'view' || req.body.action === 'viewupdate') ? 'viewupdate' : 'update'});
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/delete/:environmentid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.environmentid) {
            envlib.DeletEnvironment(0, req.params.environmentid, function (vres) {
                res.send({ status: vres });
            });
        }
        else {
            res.redirect('/environment/manage');
        }
    }
    else {
        res.redirect('/');
    }
});
router.post('/checkname', function (req, res) {
    if (req.session.accountdetails) {
        commonhelper.CheckDuplicateNames(req.body.name, '', req.body.checktype, req.session.accountdetails.customerid, function (vres) {
            if (vres.status) {
                if (vres.data.length > 0 && vres.data[0].length > 0) {
                    res.send({ valid: false });
                }
                else {
                    res.send({ valid: true});
                }
            }
            else {
                res.send({ valid: false });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/getcostdetails/:flavorid/:osid', function (req, res) {
    if (req.session.accountdetails) {
        envlib.GetCostDetails(req.params.flavorid, req.params.osid, function (vres) {
            if (vres.status) {
                res.send({cost: vres.data});
            }
            else {
                res.send({ cost: [] });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
module.exports = router;