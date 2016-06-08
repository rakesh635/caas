"use strict";
var caasjslib = caasjslib || {};
caasjslib.dashboard = caasjslib.dashboard || {};
caasjslib.dashboard.view = caasjslib.dashboard.view || {};
(function (view) {
	view.DashboardInit = function () {
		$('#btnsendemail').on('click', function () { 			
			var ajaxcall = caasjslib.ajaxcall;
			ajaxcall.Execute('dashboard/sendemail/', 'POST', 'json', 'application/json', null, function (res) {
				console.log(res);
			});
		});
	};
}(caasjslib.dashboard.view));