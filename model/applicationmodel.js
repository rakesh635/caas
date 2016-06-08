var applicationmodel = applicationmodel || {};
(function (model) {
	model.ApplicationModel = function () {
		this.Application = {
			id:null,
            appname:null,
            apptitle: null,
            apptype: null,
            appusername: null,
            apppassword: null,
			Repositories: [],			
			platformid: null,
			linkedappid: null,
			linkeddbid: null,
			webservermasterid: null,
			customerid: null,
			environmentid: null,
			isapplinkedinwebapp: null,
			command: null,
			targetfolder:null,
			createdby: null,
			modifiedby:null,
			buildtypeid: null,
			environmentvariables: null,			
			description: null,
			application_plugins:null
		};
		this.Repository = {
			repotype: null,
			repofor:null,
			repourl: null,
			repousername: null,
			repopassword: null,
			isrepopublic: null,
			branchname: null,
			salk32: null,
			salt16: null,
			reponame:null

		};
	};
}(applicationmodel));
module.exports = applicationmodel;