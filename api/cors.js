module.exports = function () {
		return function (err,req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Methods", "PUT,GET,POST,OPTIONS");
		res.header("Access-Control-Allow-Headers", "X-Requested-With,Accept,Authorization,Content-type,x-api-token,x-session-token,Origin,Access-Control-Allow-Origin");
		res.header("Access-Control-Expose-Headers", "DAV, content-length, Allow");
		res.header("X-Powered-By", "API");
		next();
	};
}