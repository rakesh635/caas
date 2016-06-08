var wsrequesthelper = wsrequesthelper || {},
	format = require('string-format');

(function (helper) {
	"use strict";
	helper.ContainerPaths = [
		{ key: 'stats', value: 'projects/{0}/containers/{1}/stats' },
		{ key: 'containerstats', value: 'projects/{0}/containers/{1}/containerstats' }
	];
	helper.GetPath = function (param, callback) {
		switch (param.request) {
			case 'container':
				var result = this.ContainerPaths.filter(function (v, i, a) {
					return v.key == param.action;
				});
				if (result) {
					var f = format(result[0].value, param.environmentid, param.containerid);
					callback(f);
				}
				else {
					callback(null);
				}
				break;
			case null:
			case undefined:
			default:
				callback(null);
				break;
		}
	};
}(wsrequesthelper));

module.exports = wsrequesthelper;