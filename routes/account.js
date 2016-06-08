var express = require('express'),
	util = require('util'),
	url = require('url'),
	router = express.Router(),
	accountlib = require('../plib/accountlib.js'),
	commonhelper = require('../api/helper/commonhelper.js');
/* GET home page. */
router.get('/', function (req, res) {
	res.render('account/login', { title: 'ISCP | Login', data: '' });
});
router.post('/login', function (req, res) {
	accountlib.LoginValidation(req.body.username, req.body.password, function (vres) {
		if (vres.status) {
			var result = vres.data;
			if (result !== undefined && result !== null && result !== '') {
				var fullname = util.format('%s %s', result.first_name, (result.last_name === undefined || result.last_name === null || result.last_name === 'null')?'': result.last_name);
				//accountlib.GetMenuList(function (cres) { 
				
				//});
				req.session.accountdetails = { accountid: result.accountid, customerid: result.customer_id, roleid: result.role_id, rolename: result.rolename, username: result.username, fullname: fullname, isisadmin: result.isisadmin };
				res.redirect('dashboard');
			}
			else {
				res.render('account/login', { title: 'IS-CP | Login', data: 'Invalid account' });
			}
		}
		else {
			res.render('account/login', { title: 'IS-CP | Login', data: vres.message });
		}
	});
});
router.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect('/');
});
router.get('/forgotpassword', function (req, res) {
	res.render('account/forgotpassword', { title: 'ISCP | Forgot Password' });
});
router.post('/sendpassword', function (req, res) {
	if (req.body.username !== undefined && req.body.username !== null && req.body.username !== '' &&
        req.body.email !== undefined && req.body.email !== null && req.body.email !== '') {
		
		res.render('account/login', { data: 'Reset password link has been sent to your mail.' });
   
	}
});
router.get('/resetpassword', function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	if (query.reset_id) {
		accountlib.ValidateResetPassword(query.reset_id, function (vres) {
			if (vres.status) {
				res.render('account/resetpassword', { resetid: query.reset_id });
			}
			else
				res.render('account/forgotpassword', { data: 'Link Expired' });
		});
	}
	else
		res.redirect('account/login');
});
router.post('/resetpassword', function (req, res) {
	var data = { body: 'Hi ' + req.body.username , subject: 'IS CaaS Identity - Forgot Password', to: req.body.email };
	commonhelper.SendEmail(data, function (cres) {
		res.render('account/login', { title: 'ISCP | Login', forgotpswd: JSON.stringify(cres) });
	});
});
router.post('/checkname', function (req, res) {
	commonhelper.CheckDuplicateNames(req.body.name, req.body.email, req.body.checktype, '', function (vres) {
		if (vres.status) {
			if (vres.data.length > 0 && vres.data[0].length > 0) {
				res.send({ valid: true });
			}
			else {
				res.send({ valid: false });
			}
		}
		else {
			res.send({ valid: false });
		}
	});
});
module.exports = router;