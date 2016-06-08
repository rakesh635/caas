var repomodel = repomodel || {};
(function (model) {
	model.CreateWebhookConfig = function () {
		return {
			name: "web",
			active: true,
			events: [],
			config: {
				url: "",
				content_type: "json"
			}
		}
	};
	model.RepoMembers = function () {
		this.Repo = { reponame: '', repourl: '', owner: '',defaultbranch:'', cloneurl:''};
		this.Branch = {branchname:''};
	};
	
	model.InsertWebhook = function () {
		return {
			accountid: "",
			custid: "",
			repoid: "",
			reponame: "",
			repousername:"",
			repopassword:"",
			repoaccesstoken:""
		}
	};
	model.RepoAccessKey = {
		AddRepo: "addrepo",
		GetRepoList: "getrepos",
		GetRepo: "getrepo",
		GetRepo: "getbranches",
	};
}(repomodel));
module.exports = repomodel;
