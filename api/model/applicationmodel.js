var applicationmodel = applicationmodel || {};
(function (model) {
    "use strict";
    model.AppDaemonCreate = function () { 
        return {
            "id": '',
            "name": '',
            "taskstatus": '',
            "pid": 0,
            "application": {
                "id": '',
                "name": '',
                "appplatformversion": ''
            },
            "repo": {
                "id": '',
                "name": '',
                "username": '',
                "password": '',
                "url": '',
                "branchname": ''
            },
            "webhook": {
                "url": ''
            }
        }
    };
    model.AppDaemonDelete = function () {
        return {
            "id": '',
            "name": '',
            "taskstatus": '',
            "pid": 0,
            "application": {
                "id": '',
                "name": '',
                "appplatformversion": ''
            },
            "repo": {
                "id": '',
                "name": '',
                "username": '',
                "password": '',
                "url": '',
                "branchname": ''
            },
            "webhook": {
                "url": ''
            }
        }
    };
}(applicationmodel));
module.exports = applicationmodel;