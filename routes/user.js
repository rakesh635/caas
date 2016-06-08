var express = require('express'),
    util = require('util'),
    router = express.Router(),
    accountlib = require('../plib/accountlib.js'),
    commonhelper = require('../api/helper/commonhelper.js');
    dateformat = require('dateformat');
router.get('/create/:customerid/:type', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.GetRoles(function (pres) {
            if (pres.status) {
                accountlib.ListCustomers(function (vres) {
                    if (vres.status) {
                        res.render('account/user/createuser', { title: 'createuser' , customerid: req.params.customerid, customers: vres.data, roles: pres.data, type: req.params.type });
                    }
                    else {
                        res.render('account/user/createuser', { title: 'createuser' , customerid: req.params.customerid, customers: [], roles: pres.data, type: req.params.type });
                    }
                });
            } 
            else { 
                res.render('account/user/createuser', { title: 'createuser' , customerid: req.params.customerid, customers: [], roles: [], type: req.params.type });
            }
         });
        }
        else {
            res.redirect('/');
        }
});
router.get('/create/:type', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.GetRoles(function (pres) {
            if (pres.status) {
                accountlib.ListCustomers(function (vres) {
                    if (vres.status) {
                        res.render('account/user/createuser', { title: 'createuser' , customers: vres.data, roles: pres.data, type: req.params.type });
                    }
                    else {
                        res.render('account/user/createuser', { title: 'createuser' , customers: [], roles: pres.data, type: req.params.type });
                    }
                });
            } 
            else {
                res.render('account/user/createuser', { title: 'createuser' , customers: [], roles: [], type: req.params.type });
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
                'firstname' : req.body.firstname,
                'lastname': req.body.lastname,
                'username': req.body.username,
                'password': req.body.password,
                'designation': req.body.designation,
                'customerid': req.body.ddlcustomers,
                'email': req.body.email,
                'roleid': req.body.ddlroles,
                'createdbyuser': req.session.accountdetails.accountid ,
                
            };
            accountlib.CreateUser(data, function (vres) {
                if (vres.status) {
                    res.redirect('/user/manage/' + req.body.ddlcustomers);
                }
                else {
                    res.render('account/user/createuser', { error: 'Failed to create customer.' });
                }
                
            });
        }
        else {
            res.redirect('/');
        }
});
router.get('/manage/:customerid', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.ListCustomers(function (vres) {
            if (vres.status) {
                res.render('account/user/manageallusers', { title: 'managealluser', customers: vres.data, customerid: req.params.customerid });
            }
            else {
            res.render('account/user/manageallusers', { title: 'managealluser', customers: [], customerid: req.params.customerid });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/manageall', function (req, res) {
        if (req.session.accountdetails) {
                accountlib.ListCustomers(function (vres) {
                    if (vres.status) {
                        res.render('account/user/manageallusers', { title: 'managealluser',customers: vres.data });
                    }
                    else {
                        res.redirect('/customer/manage');
                    }
                });
        }
        else {
            res.redirect('/');
        }
});
router.post('/manageall/:customerid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.customerid) {
            accountlib.GetAccounts(req.params.customerid, 0, function (vres) {
                if (vres.status) {
                    var data = vres.data;
                    data.forEach(function (record) {
                        record.createdon = dateformat(record.createdon, "dd/mm/yyyy hh:MM:ss");
                    });
                    res.send({ title: 'managealluser',user: data, iTotalRecords: vres.data.length, iTotalDisplayRecords: vres.data.length });
                }
                else {
                    res.send({ title: 'managealluser', user: '', iTotalRecords: 0, iTotalDisplayRecords: 0 });
                }
            });
        }
        else {

        }
    }
    else {
        res.redirect('/');
    }
});
router.post('/getusercount/:customerid', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.GetUserCount(req.params.customerid, function (vres) {
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
router.get('/view/:accountid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.accountid) {
        
            accountlib.GetRoles(function (pres) {
                if (pres.status) {               
                    
                    
                    accountlib.GetAccount(req.params.accountid, function (vres) {
                        if (vres.status) {
                            
                            res.render('account/user/viewuser', { title : 'managealluser',data: vres.data, action: 'view' , roles: pres.data});
                        }
                        else {
                            res.redirect('/user/manage', { title : 'manageuser' });
                        }
                    });
                }
                else {

                    res.redirect('/user/manage');
                }


                });
        }
        else {
            res.redirect('/user/manage');
        }
    }
    else {
        res.redirect('/');
    }
});
router.post('/update', function (req, res) {
    if (req.session.accountdetails) {
        var data = {
            'accountid': req.body.accountid,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'designation': req.body.designation,
            'role': req.body.ddlroles,
        };
        accountlib.UpdateUser(data, function (vres) {
            if (vres.status) {
                res.redirect('/user/manage/'+ req.body.customerid);
            }
            else {
                var data = {
                    'accountid': req.body.accountid,
                    'first_name': req.body.firstname,
                    'last_name': req.body.lastname,
                    'designation': req.body.designation,
                    'role': req.body.ddlroles,
             };
                res.render('account/user/viewuser', { data: data, error: 'Failed to update customer. Try again.', action: (req.body.action === 'view' || req.body.action === 'viewupdate') ? 'viewupdate' : 'update' });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/view/:accountid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.accountid) {
            accountlib.GetAccount(req.params.accountid, function (vres) {
                if (vres.status) {
                    
                    res.render('account/user/viewuser', { title: 'managealluser' ,data: vres.data, action: 'view'});
                }
                else {
                    res.redirect('/user/manage');
                }
            });
        }
        else {
            res.redirect('/user/manage');
        }
    }
    else {
        res.redirect('/');
    }
});
router.get('/update/:accountid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.accountid) {
            accountlib.GetRoles(function (pres) {
                if (pres.status) {
                    
                    accountlib.GetAccount(req.params.accountid, function (vres) {
                        if (vres.status) {
                            
                            res.render('account/user/viewuser', { title: 'managealluser' , data: vres.data, action: 'update' , roles: pres.data });
                        }
                        else {
                            res.redirect('/user/manage', {  headerdata: { fullname: req.session.accountdetails.fullname }});
                        }
                    });
                }
                else {
                    res.redirect('/user/manage');
                }
            });
        }
        else {
            res.redirect('/');
        }
    }
});
router.get('/delete/:accountid/:customerid', function (req, res) {
    if (req.session.accountdetails) {
        if (req.params.accountid) {
            accountlib.DeleteUser(0, req.params.accountid, function (vres) {
                res.send({ status: vres });
            });
        }
        else {
            res.redirect('/user/manage/' + req.params.customerid);
        }
    }
    else {
        res.redirect('/');
    }
});
router.post('/checkname/:type', function (req, res) {
    if (req.session.accountdetails) {
        commonhelper.CheckDuplicateNames(req.body.name, req.body.email, req.body.checktype, '', function (vres) {
            if (vres.status) {
                if (req.params.type === 'duplicate') {
                    if (vres.data.length > 0 && vres.data[0].length > 0) {
                        res.send({ valid: false });
                    }
                    else {
                        res.send({ valid: true });
                    }
                }
                else if (req.params.type === 'validate'){
                    if (vres.data.length > 0 && vres.data[0].length > 0) {
                        res.send({ valid: true });
                    }
                    else {
                        res.send({ valid: false });
                    }
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
router.get('/impersonate', function (req, res) {
    if (req.session.accountdetails) {
        res.render('account/user/impersonateuser', { title: 'impersonateuser' });
    }
    else {
        res.redirect('/');
    }
});
router.post('/impersonate', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.ImpersonateUser(req.body.username, function (vres) {
            if (vres.status) {
                if (vres.data.length > 0) {
                    var result = vres.data[0];  
                    var fullname = util.format('%s %s', result.first_name, (result.last_name === undefined || result.last_name === null || result.last_name === 'null')?'': result.last_name);

                    req.session.accountdetails.accountid = result.accountid;
                    req.session.accountdetails.customerid = result.customer_id;
                    req.session.accountdetails.roleid = result.roleid;
                    req.session.accountdetails.rolename = result.rolename;
                    req.session.accountdetails.username = result.username;
                    req.session.accountdetails.fullname = fullname;
                    req.session.accountdetails.isisadmin = result.isisadmin;
                    res.redirect('/dashboard');
                }
                else {
                    res.render('account/user/impersonateuser', { error: 'Failed to impersonate user' });
                }
            }
            else {
                res.render('account/user/impersonateuser', { error: vres.message });
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/impersonate/:username/:customerid/:type', function (req, res) {
    if (req.session.accountdetails) {
        accountlib.ImpersonateUser(req.params.username, function (vres) {
            if (vres.status) {
                if (vres.data.length > 0) {
                    var result = vres.data[0];
                    var fullname = util.format('%s %s', result.first_name, (result.last_name === undefined || result.last_name === null || result.last_name === 'null')?'': result.last_name);
                    req.session.accountdetails.accountid = result.accountid;
                    req.session.accountdetails.customerid = result.customer_id;
                    req.session.accountdetails.roleid = result.roleid;
                    req.session.accountdetails.rolename = result.rolename;
                    req.session.accountdetails.username = result.username;
                    req.session.accountdetails.fullname = fullname;
                    req.session.accountdetails.isisadmin = result.isisadmin;
                    res.redirect('/dashboard');
                }
                else {
                    if (req.params.type === 'all') {
                        res.redirect('/user/manageall');
                    }
                    else {
                        res.redirect('/user/manage/'+req.params.customerid);
                    }
                }
            }
            else {
                if (req.params.type === 'all') {
                    res.redirect('/user/manageall');
                }
                else {
                    res.redirect('/user/manage/' + req.params.customerid);
                }
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.get('/setpassword/:activationkey', function (req, res) {
    if (req.params.activationkey) {
        accountlib.CheckUserActivationKey(req.params.activationkey, function (cres) {
            if (cres.status) {
                if (cres.data.length > 0) {
                    res.render('account/user/setpassword', { accountid: cres.data[0].accountid, action: 'setpassword' });
                }
                else {
                    res.render('account/user/setpassword', { action: 'invalid' });
                }
            }
            else {
                res.redirect('/');
            }
        });
    }
    else {
        res.redirect('/');
    }
});
router.post('/setpassword', function (req, res) {
    if (req.body.password !== '') {
        accountlib.UpdateUserPassword(req.body.accountid, req.body.password, function (cres) {
            if (cres.status) {
                res.render('account/user/setpassword', { action: 'login' });
            }
            else {
                res.render('account/user/setpassword', { accountid: req.body.accountid, action: 'setpassword', error: 'Failed to update password.Try again later'});
            }
        });
    }
});
module.exports = router;