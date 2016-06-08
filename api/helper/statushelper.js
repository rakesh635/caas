var statushelper = statushelper || {};
(function (helper) {
	"use strict";
	helper.Status = function () {
		this.Authenticated = { statuscode: 999, status: true, message: "Authenticated", data: null };
		this.InvalidRequest = { statuscode: 1000, status: false, message: "Invalid Request" };
		this.AuthenticationFailed = { statuscode: 1001, status: false, message: 'Invalid Password' };
		this.InvalidToken = { statuscode: 1002, status: false, message: "Invalid Token" };
		this.TokenExpired = { statuscode: 1003, status: false, message: "Token Expired" };
		this.SessionExpired = { statuscode: 1004, status: false, message: "Session Expired" };
		this.TokenGenerated = { statuscode: 1999, status: true, message: "Token Generated", data: null };		
		this.Success = { statuscode: 2000, status: true, message: "Success", data: null };
		this.Failed = { statuscode: 2001, status: false, message: "Failed" };
		this.ParameterMissing = { statuscode: 2002, status: false, message: "Parameter Missing" };
		this.ContentMissing = { statuscode: 2003, status: false, message: "Content Missing" };
		this.Exception = { statuscode: 2004, status: false, message: "Exception" };
        this.DBConnectionFailed = { statuscode: 2005, status: false, message: "Database connection failed" };
		this.InvalidAccount = { statuscode: 2006, status: false, message: "Invalid Username" };
		this.EmailFailed = { statuscode: 2007, status: false, message: "Email Failed" };
	};
}(statushelper));
module.exports = statushelper;