var repolib = repolib || {},
	statushelper = require('../api/helper/statushelper.js').Status,
	commonhelper = require('../api/helper/commonhelper.js'),
	util = require('util'),
	repo_model = require('../api/model/repomodel.js'),
	repo_members = repo_model.RepoMembers,
	repo_accesskey = repo_model.RepoAccessKey,
	repohelper = require('../api/helper/repohelper'),	
	appconfig = require('../appconfig.js').Configurations,
	githubclient = require('../api/services/githubservice/githubclient.js');
(function (lib) {
	
	lib.GetRepos = function (githubdata, callback) {
		githubclient.GetRepos(githubdata, function (err, gres, body) {
			if (err) {
				callback(new statushelper().Failed);
			}
			else {
				var status = new statushelper().Success;
				status.data = [];
				if (body) {
					var repos = [];
					body.forEach(function (v, i) {
						var repo = new repo_members().Repo;
						repo.reponame = v.name;
                        repo.owner = v.owner.login;
                        repo.cloneurl = v.clone_url;
						repo.repourl = v.git_url;
						repo.defaultbranch = v.default_branch;
						repos.push(repo);
					});
					status.data = repos;
				}
				callback(status);
			}
		});
	};
	lib.GetRepoContent = function (githubdata, callback) {
		githubclient.GetRepoContent(githubdata, function (err, gres, body) { 
            if (err) {
                callback(new statushelper().Failed);
            }
            else {
                if (body.length > 0) {
                    callback(new statushelper().Success);
                }
                else {
                    callback(new statushelper().Failed);
                }
            }
		});
    };
    lib.GetBranches = function (githubdata, callback) { 
        githubclient.GetBranches(githubdata, function (err, gres, body) {
            if (err) {
                callback(new statushelper().Failed);
            }
            else {
                var status = new statushelper().Success;
                status.data = [];
                if (body) {
                    var branches = [];
                    body.forEach(function (v, i) {
                        branches.push(v.name);
                    });
                    status.data = branches;
                }
                callback(status);
            }
        });
    };
	lib.AddWebHook = function (data, callback) {
		if (data) {
			commonhelper.GetCustomerbyAccessToken(data.accountid, function (cres) {
				if (cres.status) {
					var ibody = repo_model.InsertWebhook();
					ibody.accountid = data.accountid;
					ibody.custid = cres.data.cust_id;
					ibody.repoid = data.repoid;
					repohelper.InsertWebhook(ibody, function (ires) {
						if (ires.status) {
							if (ires.data) {
								commonhelper.GenerateTextFromSalt(ires.data.repo_password, ires.data.pwd_saltkey_32, ires.data.pwd_saltkey_16, function (skres) {
									if (skres.status) {
										var url = util.format("%s://%s:%s@%s%s%s/repo/payload/%s", 
											appconfig.API.IsSSLEnabled?'https':'http',
											ires.data.auth_user,
											ires.data.auth_pwd, 
											appconfig.API.Domain?appconfig.API.Domain:appconfig.API.HOST,
											appconfig.API.Domain?'':':' + (appconfig.API.IsSSLEnabled?appconfig.API.PORT_HTTPS:appconfig.API.PORT_HTTP),
											appconfig.APIPath,
											ires.data.webhook_repo_token_id
										);
										var repoconfig = repo_model.CreateWebhookConfig();
										repoconfig.events.push("push", "pull_request");
										repoconfig.config.url = url;
										var wbody = {
											username: ires.data.repo_username,
											password: skres.data,
											ispublic: false, // ires.data.isrepo_public[0] == 0?true:false,
											param: {
												owner: ires.data.repo_username,
												reponame: ires.data.reponame
											},
											data: repoconfig
										};
										githubclient.CreateWebHook(wbody, function (err, gres, obody) {
											if (err) {
												callback(new statushelper().Failed);
											}
											else {
												var status = new statushelper().Success;
												status.data = obody;
												callback(status);
											}
										});
										
									}
									else {
										callback(new statushelper().Failed);
									}
								});
								
							}
							else {
								callback(new statushelper().Failed);
							}
						}
						else {
							callback(new statushelper().Failed);
						}
					});
				}
				else {
					callback(cres);
				}
			});
		}
		else {
			callback(new statushelper().Failed);
		}
		
	};
}(repolib));
module.exports = repolib;