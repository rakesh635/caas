"use strict";
var appconfig = appconfig || {},
	fs = require('fs');
(function (config) {
	config.Configurations = {
		Url: 'http://192.168.54.207/v1/', //'http://192.168.56.102:8080/v1',
		WSUrl: 'ws://192.168.54.207/',
		Authorization: 'Basic ' + new Buffer('F1BA60FDFDB80504FF15' + ':' + 'wpLWzyahut2pWyJ9dCj3YikWfU987ch7A4K34tAg').toString('base64'),
		Database: {
			host: '192.168.54.206', user: 'root', password: 'password', database: 'CaaS_DEVDB_latest', multipleStatements: true
		},
		API: {
			HOST: 'localhost',
			PORT_HTTP: 8087,
			PORT_HTTPS: 12345,
			Domain:null,
			IsSSLEnabled: false,
			SSL_Certificate: {
				/*pfx: fs.readFileSync('dockerservice.pfx'),
				passphrase: '1234',*/
				rejectUnauthorized: false,
				key:fs.readFileSync('caas.key'),
				cert:fs.readFileSync('ServerCertificate.crt'),
				passphrase:'_J0HnNy_Gon3-M@D_'
			}
		},
		APIPath: '/api/v1',
		version: 'v1',
		GitHubAPI: {
			Url: 'https://api.github.com'
		},
		CIServerAPI: {
			URL: 'http://192.168.54.205:8080',		
			fullurl: 'http://admin:ab932bcf78150d0ee6211586b03ee380@192.168.54.205:8080',		
			Authorization: 'Basic ' + new Buffer('admin' + ':' + 'ab932bcf78150d0ee6211586b03ee380').toString('base64'),
		},
		OpenStackAPI: {
			TokenParamters: {
				"auth": {
					"tenantName": "admin",
					"passwordCredentials": {
						"username": "admin",
						"password": "password"
					}
				}
			},			
			IdentityURL: 'http://192.168.54.102:35357/v2.0'
		},
		GitHubUrl: 'https://github.com/login/oauth/access_token?client_id=66237e95c6686b587886&client_secret=cb4fb3e37be51386390320062d637cfd68d8d83c&code=%s',		
		EmailSettings: {
			user: 'mahendran.m@prodapt.com',
			password: 'Ammu@123',
			host: 'exchange.prodapt.com',
			domain: 'prodapt',
			ssl: false,
			port: 25,	
            timeout: 15000,
            url: 'http://192.168.54.215/'
		},
		ResetPasswordURL: 'http://localhost:8087/resetpassword?reset_id=',
		MongoDB: 'mongodb://admin:password@192.168.54.171:27017/caasdaemondb' 
	};
}(appconfig));
module.exports = appconfig;