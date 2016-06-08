var githubclient = githubclient || {},
	appconfig = require('../../../appconfig.js').Configurations,
	util = require('util'),
	request = require('request'),
	githubapiconfig = appconfig.GitHubAPI;
(function (client) {
	client.CreateWebHook = function (ibody, callback) {		
		try {
			request({
				url: util.format('%s/repos/%s/%s/hooks', githubapiconfig.Url, ibody.param.owner, ibody.param.reponame), 
				method: 'POST', 
				rejectUnauthorized: false,	
				json: true,	
				headers: (function () {
					if (!ibody.ispublic) {
						return {
							"Authorization": 'Basic ' + new Buffer(ibody.username + ':' + ibody.password).toString('base64'),
							"Accept": "application/json",
							"Content-Type": "application/json",
							"User-Agent": 'IS'
						}
					}
					else {
						return {
							"Accept": "application/json" ,
							"Content-Type": "application/json",
							"User-Agent": 'IS'
						}
					}
				})(),
				body: ibody.data,
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetRepos = function (githubdata, callback) {
		try {
			request({
				url: util.format('%s/users/%s/repos', githubapiconfig.Url, githubdata.username), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: (function () {
					if (!githubdata.ispublic) {
						return {
							"Authorization": 'Basic ' + new Buffer(githubdata.username + ':' + githubdata.password).toString('base64'),
							"Accept": "application/json",
							"Content-Type": "application/json",
							"User-Agent": 'IS'
						}
					}
					else {
						return {
							"Accept": "application/json" ,
							"Content-Type": "application/json",
							"User-Agent": 'IS'
						}
					}
				})(),
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
       catch (er) {
			callback(er, null, null);
		}
	};
	client.GetBranches = function (githubdata, callback) {
		try {
			request({
				url: util.format('%s/repos/%s/%s/branches', githubapiconfig.Url, githubdata.username, githubdata.reponame), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
                headers: (function () {
                    if (!githubdata.ispublic) {
                        return {
                            "Authorization": 'Basic ' + new Buffer(githubdata.username + ':' + githubdata.password).toString('base64'),
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "User-Agent": 'IS'
                        }
                    }
                    else {
                        return {
                            "Accept": "application/json" ,
                            "Content-Type": "application/json",
                            "User-Agent": 'IS'
                        }
                    }
                })(),
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
		catch (er) {
			callback(er, null, null);
		}
	};
	client.GetRepoContent = function (githubdata,callback) {
		try {
			request({
				url: util.format('%s/repos/%s/%s/contents/%s', githubapiconfig.Url, githubdata.username, githubdata.reponame, githubdata.path), 
				method: 'GET', 
				rejectUnauthorized: false,	
				json: true,	
				headers: (function () {
					if (!githubdata.ispublic) {
						return {
							"Authorization": 'Basic ' + new Buffer(githubdata.username + ':' + githubdata.password).toString('base64'),
							"Accept": "application/json",
							"Content-Type": "application/json",
							"User-Agent": 'IS'
						}
					}
					else {
						return {
							"Accept": "application/json" ,
							"Content-Type": "application/json",
							"User-Agent": 'IS'
						}
					}
				})(),
			}, function (err, resx, body) {
				callback(err, resx, body);
			});
		}
       catch (er) {
			callback(er, null, null);
		}
	};
}(githubclient));
module.exports = githubclient;