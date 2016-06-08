var caasjslib = caasjslib || {};
caasjslib.application = caasjslib.application || {};
caasjslib.application.common = caasjslib.application.common || {};
(function (common) {
    common.BuildEnvironmentVeriables = function (apptype, callback) {
        var arr_envs = [];
        if (apptype === 'app') {
            var env_elements = $('#environment-variables').find('.btn-group');
            env_elements.each(function (i, v) {
                var env = { ekey: $(v).find('button').attr('data-key'), evalue: $(v).find('button').attr('data-value') };
                arr_envs.push(env);
            });
        }
        else if (apptype === 'db') {
            var env_elements = $('#db-environment-variables').find('.btn-group');
            env_elements.each(function (i, v) {
                var env = { ekey: $(v).find('button').attr('data-key'), evalue: $(v).find('button').attr('data-value') };
                arr_envs.push(env);
            });
        }
        callback(arr_envs);	
	};
	common.IsEnvironmentVariableExist = function (apptype, envkey, callback) {
		var isexist = false;
		common.BuildEnvironmentVeriables(apptype, function (l) {
			if (l.length>0) {
				$(l).each(function (i, v) {
					if (envkey === v.ekey) {
						isexist = true;
					}
				});
			}			
		});
		callback(isexist);
	};
}(caasjslib.application.common));