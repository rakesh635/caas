var apitest = apitest || {},	
	openstack = require('../lib/openstacklib.js');
(function (test) {
	test.Start = function (istestrequired) {
		if (istestrequired) {
			openstack.CreateUser({
				name: 'xyz',
				username: 'xyz123',
				password: 'xyz123'
			} , function (res) {		
			
			});
		}		
	};
}(apitest));
module.exports = apitest;