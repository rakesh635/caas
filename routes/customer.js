var express = require('express'),
    router = express.Router(),
    accountlib = require('../plib/accountlib.js'),
    commonhelper = require('../api/helper/commonhelper.js'),
    dateformat = require('dateformat');
router.get('/create', function (req, res) {
        if (req.session.accountdetails) {
            res.render('account/customer/createcustomer', { title: 'createcustomer'});
        }
        else {
            res.redirect('/');
        }
});
router.post('/create', function (req, res) {
        if (req.session.accountdetails) {
            var startdate = req.body.licensestartdate.split('/');
            var licensestartdate = startdate[2] + '-' + startdate[1] + '-' + startdate[0];
            var enddate = req.body.licenseenddate.split('/');
            var licenseenddate = enddate[2] + '-' + enddate[1] + '-' + enddate[0];
            var data = {
                'firstname' : req.body.firstname,
                'lastname': req.body.lastname,
                'companyname': req.body.organisation,
                'prefix': req.body.prefix,
                'username': null,
                'password': null,
                'email': req.body.email,
                'contactno': req.body.contactnumber,
                'customertype': 'gold',
                'licensestartdate': licensestartdate,
                'licenseenddate': licenseenddate,
                'createdby': req.session.accountdetails.accountid
            };
            accountlib.CreateCustomer(data, req.body.apitoken === "on" ? true : false, function (vres) {
                if (vres.status) {
                    res.redirect('/user/create/'+vres.data[0].custid+'/customer');
                }
                else {
                    res.render('account/customer/createcustomer', { error: 'Failed to create customer.' });
                }
            });
        }
        else {  
            res.redirect('/');
        }
});
router.get('/manage', function (req, res) {
        if (req.session.accountdetails) {
            res.render('account/customer/managecustomer', { title: 'managecustomer' });
        }
        else {
            res.redirect('/');
        }
});
router.post('/manage', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.ListCustomers(function (vres) {
            if (vres.status) {
                var data = vres.data;
                data.forEach(function (record) {
                    record.subscription_startdate = dateformat(record.subscription_startdate, "dd/mm/yyyy");
                    record.subscription_enddate = dateformat(record.subscription_enddate, "dd/mm/yyyy");
                    record.createdon = dateformat(record.createdon, "dd/mm/yyyy hh:MM:ss");
                });
                res.send({ title: 'managecustomer' , customer: data, iTotalRecords: vres.data.length, iTotalDisplayRecords: vres.data.length });
            }
            else {
                res.send({ title: 'managecustomer' , customer: '', iTotalRecords: 0, iTotalDisplayRecords: 0 });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/view/:customerid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.customerid) {
            accountlib.GetCustomer(req.params.customerid, function (vres) {
                if (vres.status) {
                    vres.data.subscription_startdate = dateformat(vres.data.subscription_startdate, "dd/mm/yyyy");
                    vres.data.subscription_enddate = dateformat(vres.data.subscription_enddate, "dd/mm/yyyy");
                    res.render('account/customer/viewcustomer', { title: 'managecustomer' , data: vres.data, action: 'view' });
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
router.get('/update/:customerid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.customerid) {
            accountlib.GetCustomer(req.params.customerid, function (vres) {
                if (vres.status) {
                    vres.data.subscription_startdate = dateformat(vres.data.subscription_startdate, "dd/mm/yyyy");
                    vres.data.subscription_enddate = dateformat(vres.data.subscription_enddate, "dd/mm/yyyy");
                    res.render('account/customer/viewcustomer', { title: 'managecustomer',data: vres.data, action: 'update'});
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
            'customerid': req.body.customerid,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'contactno': req.body.contactnumber,
            'updatedby': req.session.accountdetails.accountid
        };
        accountlib.UpdateCustomer(data, req.body.apitokenstatus, req.body.apistatus === "on" ? 1 : 0, function (vres) {
            if (vres.status) {
                res.redirect('/customer/manage');
            }
            else {
                var data = {
                    'id': req.body.customerid,
                    'firstname': req.body.firstname,
                    'lastname': req.body.lastname,
                    'contactno': req.body.contactnumber,
                    'api_token_status': [req.body.apitokenstatus],
                };
                res.render('account/customer/viewcustomer', { data: data, error: 'Failed to update customer. Try again.', action: (req.body.action === 'view' || req.body.action === 'viewupdate') ? 'viewupdate' : 'update'});
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/delete/:customerid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.customerid) {
            accountlib.DeleteCustomer(0, req.params.customerid, function (vres) {
                res.send({ status: vres });
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
router.post('/checkname', function (req, res) {
    if (req.session.accountdetails) {
        commonhelper.CheckDuplicateNames(req.body.name, req.body.email, req.body.checktype, req.session.accountdetails.customerid, function (vres) {
            if (vres.status) {
                if (vres.data.length > 0 && vres.data[0].length > 0) {
                    res.send({ valid: false });
                }
                else {
                    res.send({ valid: true });
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
router.post('/regenerateapitoken', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.RegenerateAPIToken(req.body, function (vres) {
            res.send({result: vres});
        });
    }
    else {
        res.redirect('/');
    }
});
router.post('/getrunningapp/:customerid', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.GetRunningApp(req.params.customerid, function (vres) {
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
module.exports = router;