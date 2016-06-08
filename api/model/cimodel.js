var cimodel = cimodel || {};
(function (model) {
	model.CIAccessKeys = {
		CreateJob: "createjob",		
		DeleteJob: "deletejob",
		CopyJob: "copyjob",
		EnableJob: "enablejob",
		DiableJob: "disablejob",
		GetJob: "getjob",
		GetJobList: "getjobs",
		JobExists: "jobexists",
		BuildJob: "buildjob",
		GetBuild: "getbuild",
		GetBuildLog: "getbuildlog",
		StopBuild: "stopbuild",
		CreateNode: "createnode",
		DeleteNode: "deletenode",
		DisableNode: "disablenode",
		EnableNode: "enablenode",
		GetNode: "getnode",
		NodeExists: "nodeexists",
		GetNodeList: "getnodes"
	};
}(cimodel));
module.exports = cimodel;