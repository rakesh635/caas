var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var db = require('./helper/dbconnection.js'),
	account = require('./routes/account.js'),	
	dashboard = require('./routes/dashboard.js'),
	env_route = require('./api/route/environment.js'),	
	stack_route = require('./api/route/stack.js'),
	service_route = require('./api/route/service.js'),
	container_route = require('./api/route/container.js'),
	repo_route = require('./api/route/repo.js'),
	repo_webhook_route = require('./api/route/repo_webhook.js'),
	volume_route = require('./api/route/volume.js'),	
	host_route = require('./api/route/host.js'),
	token_route = require('./api/route/token.js'),
	ci_route = require('./api/route/ci.js'),
	user_route=require('./api/route/portal/user.js'),
	appconfig = require('./appconfig.js'),
	errlogger = require('./logger/logger.js'),
    customer = require('./routes/customer.js'),
    application = require('./routes/application.js'),
    user = require('./routes/user.js'),
    environment = require('./routes/environment.js'),
	app = express(),
	apitest = require('./apitest/apitest.js'),
	api = require('./api/caas_express_socket_api.js');
apitest.Start(false);
// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({ secret: 'Caas-IS-CP' }));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
app.use('/', account);

app.use(function (req, res, next) {
    if (req.session.accountdetails) {
        res.locals.session = req.session;
        next();
    }
    else {
        //For API
        next();
    }
});

app.use('/dashboard', dashboard);
app.use('/customer', customer);
app.use('/application', application);
app.use('/user', user);
app.use('/environment', environment);
var apipath = appconfig.Configurations.APIPath;

app.use(apipath, env_route);
app.use(apipath, service_route);
app.use(apipath, stack_route);
app.use(apipath, token_route);
app.use(apipath, volume_route);
app.use(apipath, host_route);
app.use(apipath, repo_route);
app.use(apipath, repo_webhook_route);
app.use(apipath, ci_route);
app.use(apipath, container_route);
app.use(apipath, user_route);

app.use(function (err, req, res, next) {
	errlogger.Error('NA', 'NA', 'NA', 'NA', err.message, 1);
	res.render('error', {errormessage:err.message});	
});
api.Init(app, appconfig.Configurations.API.IsSSLEnabled);
module.exports = app;
