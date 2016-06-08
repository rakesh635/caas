var wsrequestmodel = wsrequestmodel || {};
(function (model){
	"use strict";
	model.Request =function(){
		return { "headers": { "authorization": "", "x-api-token": "", "x-session-token": "", "x-origin": "" }, "body": "" };
	};
	model.WebSocketAccessKeys = {
	WebSocket:"websocket"
	};
}(wsrequestmodel));
module.exports = wsrequestmodel;