var openstacklib = openstacklib || {},
	statushelper = require('../api/helper/statushelper.js').Status,
	openstackmodel = require('../api/model/openstackmodel.js'),
	appconfig = require('../appconfig.js').Configurations,
	openstackclient = require('../api/services/openstackservice/openstackclient.js');
(function (lib) {
	lib.GenerateToken = function (callback) {
		openstackclient.GenerateToken(function (err, res, body) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var status = new statushelper().Success;
				status.data = { tokenid: body.access.token.id, tenantid: body.access.token.tenant.id };
				callback(status);
			}

		});
	};
	lib.CreateUser = function (idata, callback) {
		lib.GenerateToken(function (res) {
			if (res.status) {
				var model1 = new openstackmodel.CreateUser();
				model1.user.name = idata.name;
				model1.user.username = idata.username;
				model1.user.password = idata.password;
				model1.user.tenantid = res.data.tenantid;
				openstackclient.CreateUser(res.data.tokenid, model1, function (err, res, body) {
					var y = body;
				});
			}
		});
	};
}(openstacklib));
module.exports = openstacklib;