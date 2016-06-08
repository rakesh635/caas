"use strict";
var caasjslib = caasjslib || {};
caasjslib.application = caasjslib.application || {};
caasjslib.application.view = caasjslib.application.view || {};
(function (view) {
	view.CreateApplicationInit = function (atype) {
		var eventhandler = caasjslib.application.eventhandler;
		$('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="tooltip"]').tooltip();
        $('[data-toggle="tooltip"]').mouseenter(function () {
            var that = $(this)
            that.tooltip('show');
            setTimeout(function () {
                that.tooltip('hide');
            }, 2000);
        });
		$('#btnaddenv').on('click', eventhandler.AddEnvironmentVariable);
        $('#btngetbranches').on('click', { type: 'app' }, eventhandler.ValidateRepoAndGetBranches);
        $('#txtappusername').on('focus', eventhandler.EnableGitUrl);
        
        $('#btndbgetbranches').on('click', { type: 'db' }, eventhandler.ValidateRepoAndGetBranches);

        $('#btnenvironmentvariable').on('click', { type: 'app' }, eventhandler.ShowEnvironmentVariableModal);
        $('#btndbenvironmentvariable').on('click', { type: 'db' }, eventhandler.ShowEnvironmentVariableModal);

        $('#messagemodal').on('hidden.bs.modal', eventhandler.CloseMessageModal);
        $('#environmentvariablemodal').on('hidden.bs.modal', eventhandler.CloseMessageModal);

		$(document).on('click', '.edit-environment', eventhandler.EditEnvironmentVariable);
		$(document).on('click', '.delete-environment', eventhandler.DeleteEnvironmentVariable);
		switch (atype) {
			case 'appcreate':
				$('#txtappid').on('keydown', eventhandler.RemoveWhiteSpace);
                $('#txtappid').on('keyup', eventhandler.RemoveWhiteSpaceInChange);
              
                $('#ddlappplatform').on('change', eventhandler.PlatformChange);
                //Removing link database option from create application
               // $('#btncreatedatabase').on('click', { type: 'modal' }, eventhandler.SubmitDatabase);
                $('#btndbcancel').on('click', {type: 'modal' }, eventhandler.CancelDBCreate);
				//$('input[name="appgitoptions"]').on('change', eventhandler.SelecAppGit);
				//$('input[name="appgitoptions"]').on('change', eventhandler.SelectDBGit);
				$('input[name=dboptions]').on('change', eventhandler.ChangeDatabaseMode);
				$('#ddlbuildtype').on('change', eventhandler.ShowHideTargetFolder);
				//$('#btncreateapp').on('click', eventhandler.SubmitCreateApplication);
				$('#a_createdatabase').on('click', eventhandler.ShowCreateDatabase);
				$('#ddlwebserver').on('change', eventhandler.ChangeAppType);
				$('#frmcreateapplication').bootstrapValidator({
					feedbackIcons: {
						invalid: 'glyphicon glyphicon-remove',
						validating: 'glyphicon glyphicon-refresh'
					},
					excluded: [':disabled'],
					fields: {
						txtappid: {
							trigger: 'blur',
							validators: {
								remote: {
									url: '/application/validateapplicationname',
									data: function (validator, $field, value) {
										return {
											applicationname: validator.getFieldElements('txtappid').val()
										};
									},
									message: 'Application Title is already registered',
									type: 'POST'
								},
								notEmpty: {
									message: 'Application Title is required'
								},
								stringLength: {
									min: 3,
									max: 10,
									message: 'Application Title length should be minimum 3 and maximum 10 characters'
								},								
								regexp: {
									regexp: /^[0-9a-zA-Z]+$/,
									message: 'Application ID should only contain alphanumeric character'
								}
							}
						},
						txtappname: {
							validators: {
								notEmpty: {
									message: 'Application Name is required'
								},
								regexp: {
									regexp: /^[0-9a-zA-Z]+$/,
									message: 'Application Name should only contain alphanumeric character'
								}
							}
						},
						ddlappplatform: {
							validators: {
								notEmpty: {
									message: 'Platform is required'
								}
							}
                        },
                        ddlwebserver: {
                            validators: {
                                notEmpty: {
                                    message: 'Web server is required'
                                }
                            }
                        },
                        txtappusername: {
                            validators: {
                                notEmpty: {
                                    message: 'GitHub User Name is required'
                                }
                            }
                        },
                        txtapppassword: {
                            validators: {
                                notEmpty: {
                                    message: 'GitHub Password is required'
                                }
                            }
                        },
						txtappgiturl: {
							validators: {
								notEmpty: {
									message: 'GitHub Url and get branch is required'
								}
							}
						}
					}
				})
				.on('success.form.bv', function (e) {
					// Prevent form submission
					e.preventDefault();
					var $form = $(e.target),
						validator = $form.data('bootstrapValidator'),
						submitButton = validator.getSubmitButton();
					var common = caasjslib.application.common;
					common.BuildEnvironmentVeriables('app', function (l) {
						$('input[name="hndenvironmentvariables"]').val(JSON.stringify(l));
						$('input[name="hdnplugins"]').val($('#mddlplugins').val());
						validator.defaultSubmit();
					});
				});
				break;
			case 'dbcreate':
                $('#btncreatedatabase').on('click', {type: 'page'}, eventhandler.SubmitDatabase);
                $('#btndbcancel').on('click', { type: 'page' }, eventhandler.CancelDBCreate);
				$('#txtdatabaseid').on('keydown', eventhandler.RemoveWhiteSpace);
				//$('input[name="appgitoptions"]').on('change', eventhandler.SelectDBGit);
				break;
        }
        $('#frmcreatedatabase').bootstrapValidator({
            feedbackIcons: {
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            excluded: [':disabled'],
            fields: {
                txtdatabaseid: {
                    trigger: 'blur',
                    validators: {
                        remote: {
                            url: '/application/validateapplicationname',
                            data: function (validator, $field, value) {
                                return {
                                    applicationname: validator.getFieldElements('txtdatabaseid').val()
                                };
                            },
                            message: 'Database Title is already registered',
                            type: 'POST'
                        },
                        notEmpty: {
                            message: 'Database Title is required'
                        },
                        stringLength: {
                            min: 3,
                            max: 10,
                            message: 'Database Title length should be minimum 3 and maximum 10 characters'
                        },								
                        regexp: {
                            regexp: /^[0-9a-zA-Z]+$/,
                            message: 'Database Title should not contain white spaces'
                        }
                    }
                },
                txtdatabasename: {
                    validators: {
                        notEmpty: {
                            message: 'Database Name is required'
                        }
                    }
                },
                txtdatabaseusername: {
                    validators: {
                        notEmpty: {
                            message: 'Database User Name is required'
                        }
                    }
                },
                txtdatabasepassword: {
                    validators: {
                        notEmpty: {
                            message: 'Database Password is required'
                        }
                    }
                },
                ddlplatform: {
                    validators: {
                        notEmpty: {
                            message: 'Platform is required'
                        }
                    }
                },
                txtdbgiturl: {
                    validators: {
                        notEmpty: {
                            message: 'Github Url and get Branch is required'
                        }
                    }
                }
            }
        }).on('success.form.bv', function (e) {
            // Prevent form submission
            e.preventDefault();
            var $form = $(e.target),
                validator = $form.data('bootstrapValidator'),
                submitButton = validator.getSubmitButton();
            var common = caasjslib.application.common;
            common.BuildEnvironmentVeriables('db', function (l) {
                $('input[name="hnddbenvironmentvariables"]').val(JSON.stringify(l));
                //validator.defaultSubmit();
            });
        });
        //Removing link database option from create application
        //eventhandler.LoadLinkDatabase();
	};
    view.ViewApplicationInit = function (atype) {
        var eventhandler = caasjslib.application.eventhandler;
        $('#btnenvironmentvariable').on('click', eventhandler.ShowEnvironmentVariableModal);
        $('#btnaddenv').on('click', eventhandler.AddEnvironmentVariable);
        $(document).on('click', '.action-environment', eventhandler.ViewEnvironmentVariable);
        switch (atype) {
            case 'appview':
                $('#btneditapp').on('click', eventhandler.EnableApplicationControls);
                $('#btnupdateapplication').on('click', eventhandler.UpdateApplication);
                var selplatform = $("#ddlappplatform option:selected").text().toLowerCase();
                if (selplatform.indexOf('java') !== -1) {
                    $('#fg-plugins').addClass('hide');
                    $('#commanddiv').removeClass('hide');
                    $('#fg-buildtool').removeClass('hide');
                }
                else {
                    if (!$('#commanddiv').hasClass('hide')) {
                        $('#commanddiv').addClass('hide');
                    }
                }
                if (selplatform.indexOf('php') !== -1) {
                    $('#fg-plugins').removeClass('hide');
                    $('#fg-buildtool').addClass('hide');
                }
                eventhandler.LoadLinkDatabase();
				break;
			case 'dbview':
				$('#btneditdbapp').on('click', eventhandler.EnableDBApplicationControls);
                $('#btnupdatedatabase').on('click', eventhandler.UpdateDatabase);
				break;
        }
	};
    view.ManageApplicationInit = function () {
        var viewmodel = caasjslib.application.view.viewmodel;
		var eventhandler = caasjslib.application.eventhandler;
		$('#addapplication').on('click', eventhandler.ShowAddApplicationModal);
		$(document).on('click', '.btn-applaunch', eventhandler.LaunchApplicationClick);
		$(document).on('click', '.btn-instances', eventhandler.ViewInstanceClick);
        $(document).on('click', '.env-pnl', eventhandler.EnvironmentSelectClick);
        $(document).on('click', '.btn-launch', eventhandler.LaunchInstance);
        $(document).on('click', '.btn-buildlogs', eventhandler.BuildLogsClick);
        $(document).on('click', '.btn-githublogs', eventhandler.GitHubLogsClick);
        $(document).on('click', '.btn-deleteapp', eventhandler.ConfirmDeleteApp);
        $('#btn-delete').on('click', eventhandler.DeleteApplicationClick);
        $('#adv-search-application').on('keyup', eventhandler.SearchAllApplication);
        $('#btn-refresh').on('click', eventhandler.RefreshApplicationClick);
        var apptype = $('#hdn-apptype').val();
        
        var tblmanageapp = viewmodel.tblmanageapp;
        if (tblmanageapp == null || tblmanageapp == undefined || tblmanageapp == '') {
            tblmanageapp = $('#tbl-manageapp').dataTable({
                paginate: true,
                "bFilter": true,
                "bLengthChange": false,
                "columnDefs": [{ type: 'date-euro', targets: 0 }],
                "ordering": true,
                "order": [[0, 'desc'], [0, 'desc']],

                ajax: {
                    url: '/application/manage/' + apptype,
                    type: 'POST',
                    dataSrc: "application"
                },
                columns: [ 
                    { title: "Createdon", class: 'createdon hide', data : "createdon", "bSearchable": false },
                    { title: "Application Id", class: 'application_id hide', "bSearchable": false, data : "application_id" },
                    {
                        title: "Application Name",class:'application_name', data : "application_name", "width": "25%",
                        "render": function (data, type, row, meta) {
                            var apptype = (row.application_type_name === 'Application' || row.application_type_name === 'WebApplication') ? "app" : "db";
                            return '<a href="/application/viewapplication/' + row.application_id + '/' + apptype + '">' + data + '</a>';
                        }
                    },
                    { title: "Service", data : "application_type_name", "width": "12%" },
                    { title: "Platform", data : "platform_name", "width": "12%" },
                    { title: "Web Server", data : "webserver_name", "width": "13%" },
                    {
                        title: "Status", data : "build_status", "width": "9%",
                        "render": function (data, type, row, meta) {
                            if (row.build_status === 'Pending' || row.build_status === 'Creating') {
                                return '<span class="p-r">' + row.build_status + '</span><img src= "/assets/img/animations/loading.gif"/>';
                            }
                            else if (row.build_status === 'Deleting') {
                                return '<span class="p-r">' + row.build_status + '</span><img src= "/assets/img/animations/deleting.gif"/>';
                            }
                            else
                                return '<span class="p-r">' + row.build_status + '</span>';
                        }
                    },
                    {
                        title: 'Progress', data : "build_level", "width": "15%",
                        "render": function (data, type, row, meta) {
                            if (data === null) {
                                data = 0;
                            }
                            return '<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + data + '%"> ' + data + '% Completed</div></div>'
                        }
                    },
                    {
                        title: "Instances", data : "instance", "width": "9%",class : 'text-center',
                        "render": function (data, type, row, meta) {
                            if (row.instance > 0) {
                               // return '<button type="button" class="btn btn-link btn-instances">' + row.instance + '</button>';
                                return '<a href ="#" class = "btn-instances">' + row.instance + '</a>';
                            }
                            else {
                                return row.instance === null ? 0: row.instance;
                            }
                        }
                    },
                    {
                        title: 'Actions', class: 'w-5', "bSearchable": false,
                        "render": function (data, type, row, meta) {
                            var apptype = (row.application_type_name === 'Application' || row.application_type_name === 'WebApplication') ? "app" : "db";
                            var editaction = '/application/viewapplication/' + row.application_id + '/' + apptype;
                             if (row.build_status === 'Created') {

                            return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"><li><a href=' + editaction + '><i class="fa fa-pencil-square-o" aria-hidden="true"></i>   Edit</a></li><li><a href="#" class="btn-deleteapp"><i class="fa fa-trash-o" aria-hidden="true"></i>   Delete </a></li><hr class="n-m" /><li><a href="#" class="btn-buildlogs"><i class="fa fa-area-chart" aria-hidden="true"></i>  Build History</a></li><li><a href="#" class="btn-githublogs"><i class="fa fa-github" aria-hidden="true"></i>  Git Commits </a></li><hr class="n-m" /><li><a href="#" class="btn-instances"><i class="fa fa-random" aria-hidden="true"></i>   Instances</a></li><li><a href="#" class="btn-applaunch"><i class="fa fa-magic" aria-hidden="true"></i>   Launch</a></li></div>';
                             }
                            else {
                                 return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"><li><a href=' + editaction + '><i class="fa fa-eye" aria-hidden="true"></i>   View </a></li></div>';
                            }
                        }
                    }
                ]
            });
            viewmodel.tblmanageapp = tblmanageapp;
        }
        else {
            tblmanageapp.fnReloadAjax(null, null, true);

        }
	};
	view.ManageInstanceInit = function () {
		var pagetype = $('#hdn-type').val();
		var url = '';
		if (pagetype === 'all') {
			url = '/application/manageinstance';
		}
		else if (pagetype === 'application') {
			var applicationid = $('#hdn-applicationid').val();
			url = '/application/manageinstance/' + applicationid;
        }
        var eventhandler = caasjslib.application.eventhandler;
        var viewmodel = view.viewmodel;
        $(document).on('click', '.btn-start', eventhandler.StartInstanceClick);
        $(document).on('click', '.btn-stop', eventhandler.StopInstanceClick);
        $(document).on('click', '.btn-restart', eventhandler.RestartInstanceClick);
        $(document).on('click', '.btn-deleteinstance', eventhandler.ConfirmDeleteInstanceClick);
        $(document).on('click', '.url-click', eventhandler.OpenNewWindow);
        $('#adv-search-instance').on('keyup', eventhandler.SearchInstance);
        $('#btn-delete').on('click', eventhandler.DeleteInstanceClick);
        $('#btn-refresh').on('click', eventhandler.RefreshInstanceClick);
        var tblmanageinstance = viewmodel.tblmanageinstance;
        if (tblmanageinstance == null || tblmanageinstance == undefined || tblmanageinstance == '') {
            tblmanageinstance =  $('#tbl-manageinstance').dataTable({
			paginate: true,
             "bFilter": true,
                "bLengthChange": false,
                "columnDefs": [{ type: 'date-euro', targets: 0 }],
                "ordering": true,
                "order": [[0, 'desc'], [0, 'desc']],
			ajax: {
				url: url,
				type: 'POST',
				dataSrc: "instance"
			},
                columns: [ 
                    { title: "Createdon", class: 'createdon hide ', data : "createdon", "bSearchable": false },
                { title: "App Instance Id", class: 'appinstance_id hide', "bSearchable": false, data : "appinstance_id" },
                { title: "Application Id", class: 'application_id hide', "bSearchable": false,data : "application_id" },
				{
                    title: "App/ Instance Name", data : "appinstance_name",
                    "render": function (data, type, row, meta) {
                        return '<a href="/application/viewinstance/' + row.appinstance_id + '/'+ pagetype+'">' + data + '</a>';
                    }


				},
				{ title: "Environment", data: "environment_name" },
				{ title: "Build Version", data: "buildversion" },
				/*{ title: "Port", data: "instance_port" },*/
                    {
                        title: "Status", data : "build_status",
                        "render": function (data, type, row, meta) {
                            if (row.build_status === 'Pending') {
                                return '<span class="p-r">' + row.build_status + '</span><img src= "/assets/img/animations/loading.gif"/>';
                            }
                            else if (row.build_status === 'Deleting') {
                                return '<span class="p-r">' + row.build_status + '</span><img src= "/assets/img/animations/deleting.gif"/>';
                            }
                            else
                                return '<span class="p-r">' + row.build_status + '</span>';
                        }
                    
                          
                    
                    },
				{
					title: "URL", data : "application_name",class : 'text-center',
                        "render": function (data, type, row, meta) {
                            if (row.application_type_name === "Database") {
                                return '';
                            }
                            else {

                                return '<a href="#" class="url-click">'+'https://' + row.appinstance_name.toLowerCase()  + '.' + row.domainname.toLowerCase() + '-' + row.environment_name.toLowerCase() + '.caas.is.co.za</a>';
                            }
                        }
				},
				{
					title: 'Actions', class: 'w-5', "bSearchable": false,
                        "render": function (data, type, row, meta) {
                            if (row.build_status === 'Created') {
                                
                                return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"> <li><a href="/application/updateinstance/' + row.appinstance_id + '" class="btn-start"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>   Edit</a></li>                                   <li><a href="#" class="btn-start"><i class="fa fa-play" aria-hidden="true"></i>   Start</a></li><li><a href="#" class="btn-stop"><i class="fa fa-stop" aria-hidden="true"></i>   Stop</a></li><li><a href="#"  class="btn-restart"><i class="fa fa-retweet" aria-hidden="true"></i>   Restart</a></li><li><a href="#" class="btn-deleteinstance"><i class="fa fa-trash-o" aria-hidden="true"></i>   Delete</a></li><li><a href="#" data-toggle="modal" data-target="#instancelogsmodal"><i class="fa fa-area-chart" aria-hidden="true"></i>   Logs</a></li></div>';
                            }
                            if (row.build_status === 'Pending' || row.build_status === 'Deleting') {
                                return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"><li><a href="/application/viewinstance/' + row.appinstance_id + '/'+type+'"><i class="fa fa-eye" aria-hidden="true"></i>   View </a></li></div>';

                            }
					}
				}
			]
            });
            viewmodel.tblmanageinstance = tblmanageinstance;
        }
        else {
            tblmanageinstance.fnReloadAjax(null, null, true);

        }
    };
    view.ViewInstanceInit = function () {
        var eventhandler = caasjslib.application.eventhandler;
        $(document).on('click', '#btn-updateinstance', eventhandler.UpdateInstanceClick);
        if ($('#hdn-action').val() === 'update' || $('#hdn-action').val() === 'viewupdate') {
            eventhandler.UpdateInstanceClick();
        }
    };









}(caasjslib.application.view));