var express = require('express'),
	ex = require('child_process').exec,
	 commonhelper=require('../api/helper/commonhelper.js'),
    router = express.Router(),
    dashboardlib = require('../plib/dashboardlib.js');
router.get('/', function (req, res) {

        if (req.session.accountdetails) {
            if (req.session.accountdetails.isisadmin === 0) {
                
            dashboardlib.GetDashboardView(req.session.accountdetails.customerid, function (vres) {
                var app = 0, db = 0, instance = 0;
                if (vres.status) {
                    if (vres.data.length > 0) {                  
                            for (var i = 0; i < vres.data.length; i++) {
                                if (vres.data[i].application_type_name === 'Application') {
                                    app = app + vres.data[i].count;
                                    if (vres.data[i].instancecount) {
                                        instance = instance + vres.data[i].instancecount;
                                    }
                                }
                                else if (vres.data[i].application_type_name === 'Database') {
                                    db = vres.data[i].count;
                                    if (vres.data[i].instancecount) {
                                        instance = instance + vres.data[i].instancecount;
                                    }
                                }
                                else if (vres.data[i].application_type_name === 'WebApplication') {
                                    app = app + vres.data[i].count;
                                    if (vres.data[i].instancecount) {
                                        instance = instance + vres.data[i].instancecount;
                                    }
                                }
                            }
                            res.render('dashboard/home', { title: 'home',application: app, database: db, instance: instance });
                        }
                        else {
                            res.render('dashboard/home', { title: 'home', application: app, database: db, instance: instance });
                        }
                    }
                    else {
                        res.render('dashboard/home', {  title: 'home', application: app, database: db, instance: instance, status: vres.status});
                    }
                });
            }
            else {
                res.render('dashboard/adminhome', {  title: 'home' });
            }
        }
        else {
            res.redirect('/', { title: 'home' });
        }
});
router.get('/sendemail', function (req, res) {
    if (req.session.accountdetails) {
           var data = {body:'Hi Hello<br\> <i>Hello</i>',subject:'Test',to:'mahendran.m@prodapt.com'};
	commonhelper.SendEmail(data, function (cres) { 
		res.json(cres);
        });
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;