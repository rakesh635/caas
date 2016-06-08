var openstackmodel = openstackmodel || {};
(function (model) {
	model.CreateUser = function () {
	return {
			"user": {
				"user": "",
				"tenantid":""
			}
		}
	};
}(openstackmodel));

module.exports = openstackmodel;