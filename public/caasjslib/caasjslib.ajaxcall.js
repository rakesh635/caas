var caasjslib = caasjslib || {};
caasjslib.ajaxcall = caasjslib.ajaxcall || {};
(function (ajax) {
	ajax.Execute = function (iurl, imethod, itype, icontenttype, idata, callback) {
		$.ajax({
			url: iurl,	
			datatype: itype,
			method: imethod,			
			data:idata,
			success: function (sresult) {				
				callback({ error: null,result:sresult });
			},
			error: function (err) { 				
				callback({ error: err, result: null });
			}
		});
	};
}(caasjslib.ajaxcall));