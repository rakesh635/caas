var caasjslib = caasjslib || {};
caasjslib.application = caasjslib.application || {};
caasjslib.application.eventhandler = caasjslib.application.eventhandler || {};
(function (eventhandler) {
	eventhandler.SubmitCreateApplication = function (validator) {
		var common = caasjslib.application.common;
		common.BuildEnvironmentVeriables(function (l) {
			$('input[name="hndenvironmentvariables"]').val(JSON.stringify(l));
			$('input[name="hdnplugins"]').val($('#mddlplugins').val());
			validator.defaultSubmit();
		});
    };
    eventhandler.UpdateInstanceClick = function () {
        $('#spn-title').text('Update Instance');
        $('#txt-instancename').attr('disabled', false);

        
        $('#div-btnupdate').removeClass('hide');
        $(this).hide();
    };
    eventhandler.ConfirmDeleteInstanceClick = function () {
        var instanceid = $(this).closest('tr').find('.appinstance_id').html();
        var applicationid = $(this).closest('tr').find('.application_id').html();
        $('#hdn-deleteid').val(instanceid);
        $('#hdn-parentid').val(applicationid);
        $('#myDeleteModal').modal('show');
    };
    eventhandler.DeleteInstanceClick = function () {
        
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.application.view;
        var viewmodel = view.viewmodel;
        ajaxcall.Execute('/application/deleteinstance/' + $('#hdn-deleteid').val(),'GET', 'json', 'text/html', null, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('warning', 'Delete Instance initiated');
                    viewmodel.tblmanageinstance.fnReloadAjax(null, null, true);

                }
                else {
                    common.toastr('danger', 'Failed to delete Instance. Try again');
                }
            }
        });
    };
    
    eventhandler.SubmitDatabase = function (pagemode) {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.application.common;
       
            $('#frmcreatedatabase').bootstrapValidator('validate');
            if ($('#frmcreatedatabase').data('bootstrapValidator').isValid()) {
                var data = {
                    txtdatabaseid: $('#txtdatabaseid').val(),
                    txtdatabasename: $('#txtdatabasename').val(),
                    ddlplatform: $('#ddlplatform').val(),
                    txtlaunchscript: $('#txtlaunchscript').val(),
                    hndenvironmentvariables: $('#hnddbenvironmentvariables').val(),
                    txtappdescription: $('#txtappdescription').val(),
                    txtappusername: $('#txtdbusername').val(),
                    txtapppassword: $('#txtdbpassword').val(),
                    txtdatabaseusername: $('#txtdatabaseusername').val(),
                    txtdatabasepassword: $('#txtdatabasepassword').val(),
                    txtgiturl: $('#txtdbgiturl').val(),
                    ddlgitbranch: $('#gitdbbranch').find('#ddlgitbranch').val()
                };
                ajaxcall.Execute('/application/createdatabase', 'POST', 'html', 'text/html', data, function (res) {
                    if (res.error) {

                    }
                else {
                    if (pagemode.data.type === 'modal') {
                        eventhandler.LoadLinkDatabase();
                        $('#databasemodal').modal('hide');
                    }
                    else if (pagemode.data.type === 'page') {
                        window.location.href = '/application/manage/database';
                    }
               }
           });
        }
	};
    eventhandler.LoadLinkDatabase = function () { 
        var ajaxcall = caasjslib.ajaxcall;
        ajaxcall.Execute('/application/loadexistingdb', 'GET', 'html', 'text/html', null, function (res) {
            if (res.error) {

            }
            else {
                $('#linkdatabase').html(res.result);
            }
        });
    };
	eventhandler.PlatformChange = function (e) {
		var selectedPlatformId = $(this).val();
		var selectedtext = $(this).find('option:selected').text().toLowerCase();
		if (selectedtext.indexOf('java') !== -1) {
			$('#fg-plugins').addClass('hide');
            $('#commanddiv').removeClass('hide');
            $('#fg-buildtool').removeClass('hide');
		}
		else {
			if (!$('#commanddiv').hasClass('hide')) {
				$('#commanddiv').addClass('hide');
			}
		}
		var ajaxcall = caasjslib.ajaxcall;
		ajaxcall.Execute('/application/getbuildtypes/' + selectedPlatformId, 'GET', 'html', 'text/html', null, function (res) {
			if (res.error) {

			}
			else {
				$('#buildtypes').html(res.result);
				$('#ddlbuildtype').on('change', eventhandler.ShowHideTargetFolder);
			}
		});
		if (selectedtext.indexOf('php') !== -1) {
            $('#fg-plugins').removeClass('hide');
            $('#fg-buildtool').addClass('hide');
			ajaxcall.Execute('/application/loadplugins/' + selectedPlatformId, 'GET', 'html', 'text/html', null, function (res) {
				if (res.error) {

				}
				else {
					$('#ddlplugins').html(res.result);
				}
			});
		}
	};
	//eventhandler.SelecAppGit = function () {
	//	if ($(this).val() === '0') {
	//		$('#appgit-credentials').removeClass('hide');
	//	}
	//	else {
	//		$('#appgit-credentials').addClass('hide');
	//	}
	//};
	eventhandler.ShowHideTargetFolder = function () {
		var selectedtext = $(this).find('option:selected').text().toLowerCase();
		if (selectedtext === 'ant') {
			$('#txtcommand').val('ANT');
			$('#divtargetfolder').removeClass('hide');
		}
		else {
			if (selectedtext === 'maven') {
				$('#txtcommand').val('MVN CLEAN INSTALL');
			}
			else {
				$('#txtcommand').val('');
			}
			if (!$('#divtargetfolder').hasClass('hide')) {
				$('#divtargetfolder').addClass('hide');
			}
			
		}
	};
	eventhandler.ChangeAppType = function () {
		if ($(this).val() === '0') {
			$('input[name="hdnapptype"]').val('application');
		}
		else {
			$('input[name="hdnapptype"]').val('webapplication');
		}

	};
	//eventhandler.SelectDBGit = function () {
	//	if ($(this).val() === '0') {
	//		$('#dbgit-credentials').removeClass('hide');
	//	}
	//	else {
	//		$('#dbgit-credentials').addClass('hide');
	//	}
	//};
	eventhandler.ChangeDatabaseMode = function () {
		if ($(this).val() === '0') {
			$('#new-database').removeClass('hide');
			$('#fg_linkeddb').addClass('hide');
		}
		else {
			$('#new-database').addClass('hide');
			$('#fg_linkeddb').removeClass('hide');
		}
	};
	eventhandler.ShowAddApplicationModal = function () {
		$('#applicationmodal').modal('show');
	};
    eventhandler.ShowCreateDatabase = function () {
        $('form#frmcreatedatabase').bootstrapValidator('resetForm', true);  
		$('#databasemodal').modal('show');
	};
    eventhandler.EnableApplicationControls = function () {
        $('#spn-title').text('Update Application');
		$('#applicationaction').removeClass('hide');
		$('#txtappname').attr('disabled', false);
        $('#txtcommand').attr('disabled', false);
        $('#txtdesc').attr('disabled', false);
        $(this).hide();
	};
	eventhandler.UpdateApplication = function (e) {
		e.preventDefault();
		var common = caasjslib.application.common;
		common.BuildEnvironmentVeriables('app', function () {
			$('#frmcreateapplication').submit();
		});
	};
    eventhandler.EnableDBApplicationControls = function () {
        $('#spn-title').text('Update Database');
		$('#databaseaction').removeClass('hide');
		$('#txtdatabasename').attr('disabled', false);
        $('#txtdesc').attr('disabled', false);
        $(this).hide();
	};
	eventhandler.UpdateDatabase = function (e) {
        e.preventDefault();
        $(this).hide();
		var common = caasjslib.application.common;
		common.BuildEnvironmentVeriables('db',function () {
			$('#frmupdatedatabase').submit();

		});
	};
	eventhandler.ShowEnvironmentVariableModal = function (apptype) {
		$('#txtenvkey').val('');
        $('#txtenvvalue').val('');
        $('#form-envvariable').find('.col-md-6').removeClass('has-error');
        $('#hdn-envapptype').val(apptype.data.type);
        $('#databasemodal').css('opacity', .5);
		$('#environmentvariablemodal').modal('show');
		$('#btnaddenv').text('add');
	};
	eventhandler.AddEnvironmentVariable = function () {
        var estatus = false;
        var apptype = $('#hdn-envapptype').val();
		var common = caasjslib.application.common;
		common.IsEnvironmentVariableExist(apptype, $.trim($('#txtenvkey').val()), function (s) {
			if (s) {
				$('#skeyexist').removeClass('hide');
			}
			else {
				$('#skeyexist').addClass('hide');
			}
			estatus= s;
		});
		if ($.trim($('#txtenvkey').val()).length === 0) {
			$('#txtenvkey').parents('.col-md-6').addClass('has-error')
			estatus = true;
		}
		else {
			$('#txtenvkey').parents('.col-md-6').removeClass('has-error')
		}
		if ($.trim($('#txtenvvalue').val()).length === 0) {
			$('#txtenvvalue').parents('.col-md-6').addClass('has-error')
			estatus = true;
		}
		else {
			$('#txtenvvalue').parents('.col-md-6').removeClass('has-error')
		}
		if (estatus) {
			return false;
		}
		if ($('#btnaddenv').text() === 'update') {
			var el_id = $('#' + $(this).attr('data-updatebtnid'));
			$('#environmentvariablemodal').modal('show');
			el_id.attr('data-value', $('#txtenvvalue').val());
			el_id.attr('data-key', $('#txtenvkey').val());
			el_id.find('#i-env-name').text($('#txtenvkey').val());
		}
		else {
            if (apptype === 'app') {
                var btngroup_id = 'envvar' + $('#environment-variables').find('.btn-group').length + 1;
                var envtemplate = $('.environment-template'),
                    envclone = $(envtemplate).clone();
                envclone.removeClass('hide').removeClass('environment-template').find('button').attr({ 'data-value': $('#txtenvvalue').val(), 'data-key': $('#txtenvkey').val(), id: btngroup_id });
                envclone.find('.edit-environment').attr('data-btnid', btngroup_id);
                envclone.find('.delete-environment').attr('data-btnid', btngroup_id);
                envclone.find('#i-env-name').text($('#txtenvkey').val());
                $('#environment-variables').append(envclone);
                $('#environment-variables-fg').removeClass('hide');
                $('#txtenvkey').val('');
                $('#txtenvvalue').val('');
            }
            else {
                var btngroup_id = 'envvar' + $('#db-environment-variables').find('.btn-group').length + 1;
                var envtemplate = $('.environment-template'),
                    envclone = $(envtemplate).clone();
                envclone.removeClass('hide').removeClass('environment-template').find('button').attr({ 'data-value': $('#txtenvvalue').val(), 'data-key': $('#txtenvkey').val(), id: btngroup_id });
                envclone.find('.edit-environment').attr('data-btnid', btngroup_id);
                envclone.find('.delete-environment').attr('data-btnid', btngroup_id);
                envclone.find('#i-env-name').text($('#txtenvkey').val());
                $('#db-environment-variables').append(envclone);
                $('#db-environment-variables-fg').removeClass('hide');
                $('#txtenvkey').val('');
                $('#txtenvvalue').val('');
            }
		}
	};
	eventhandler.EditEnvironmentVariable = function () {
		var el = $(this).parents('ul').prev('button');
		$('#environmentvariablemodal').modal('show');
		$('#txtenvvalue').val(el.attr('data-value'));
		$('#txtenvkey').val(el.attr('data-key'));
		$('#btnaddenv').text('update');
		var envid = $(this).attr('data-btnid');
		$('#btnaddenv').attr('data-updatebtnid', envid);
	};
	eventhandler.DeleteEnvironmentVariable = function () {
		var el = $(this).parents('.btn-group')
		el.remove();
		var env_elements = $('#environment-variables').find('.btn-group');
		if (env_elements.length === 0) {
			$('#environment-variables-fg').addClass('hide');
		}
	};
	eventhandler.ViewEnvironmentVariable = function () {
		var el = $(this).parents('.btn-group').find('button');
		$('#txtenvvalue').val(el.attr('data-value'));
		$('#txtenvkey').val(el.attr('data-key'));
		$('#environmentvariablemodal').modal('show');
	};
	eventhandler.ValidateRepoAndGetBranches = function (apptype) {
        var ajaxcall = caasjslib.ajaxcall,
            data = '',
            username = '',
            reponame = '';
        if (apptype.data.type === 'app') {
            if ($.trim($('#txtgiturl').val())) {
                var urlsplit = $.trim($('#txtgiturl').val()).split('/');
                if ($.isArray(urlsplit)) {
                    username = urlsplit[3];
                    var gitrepo = urlsplit[4].split('.');
                    reponame = gitrepo[0];
                }
            }
            else {
                $('#messagemodalLabel').text('GitHub Verification');
                $('#messagemodalbodyicon').addClass('fa fa-exclamation-triangle fa-2x text-danger');
                $('#messagemodalbody').text('GitHub URL required.');
                $('#messagemodal').modal('show');
                return false;
            }
            if ($.trim($('#txtappusername').val()) && $.trim($('#txtapppassword').val())) {
                data = { "username": $.trim($('#txtappusername').val()) , "password": $.trim($('#txtapppassword').val()) , "ispublic": false, "reponame": reponame, "repourl": $.trim($('#txtgiturl').val()), "path": '' };
            }
            else {
                $('#messagemodalLabel').text('GitHub Verification');
                $('#messagemodalbodyicon').addClass('fa fa-exclamation-triangle fa-2x text-danger');
                $('#messagemodalbody').text('GitHub Credential is required.');
                $('#messagemodal').modal('show');
                return false;
            }
            ajaxcall.Execute('/application/validaterepo', 'POST', 'json', 'application/json', data, function (res) {
                if (res.result.status) {
                    ajaxcall.Execute('/application/getgitbranch', 'POST', 'json', 'application/json', data, function (res) {
                        if (res.error) {
                        }
                        else {
                            $('#gitbranch').html(res.result);
                        }
                    });
                    $('#messagemodalbodyicon').addClass('fa fa-check-circle-o fa-2x text-success');
                    $('input[name="hdngetbranch"]').val('1');
                    $('#messagemodalLabel').text('GitHub Verification');
                    $('#messagemodalbody').text('Valid GitHub Account & URL');
                    $('#messagemodal').modal('show');
                    $('#txtgiturl').prop('disabled', true);
                }
                else {
                    $('#messagemodalLabel').text('GitHub Verification');
                    $('#messagemodalbodyicon').addClass('fa fa-times-circle-o fa-2x text-danger');
                    $('#messagemodalbody').text('GitHub Credential or GitHub URL is invalid.');
                    $('input[name="hdngetbranch"]').val('0');
                    $('#messagemodal').modal('show');

                }
            });
        }
        else if (apptype.data.type === 'db') {
            if ($.trim($('#txtdbgiturl').val())) {
                var urlsplit = $.trim($('#txtdbgiturl').val()).split('/');
                if ($.isArray(urlsplit)) {
                    username = urlsplit[3];
                    var gitrepo = urlsplit[4].split('.');
                    reponame = gitrepo[0];
                }
            }
            else {
                $('#databasemodal').css('opacity', .5);
                $('#messagemodalLabel').text('GitHub Verification');
                $('#messagemodalbodyicon').addClass('fa fa-exclamation-triangle fa-2x text-danger');
                $('#messagemodalbody').text('GitHub URL required.');
                $('#messagemodal').modal('show');
                return false;
            }
            if ($.trim($('#txtdbusername').val()) && $.trim($('#txtdbpassword').val())) {
                data = { "username": $.trim($('#txtdbusername').val()) , "password": $.trim($('#txtdbpassword').val()) , "ispublic": false, "reponame": reponame, "repourl": $.trim($('#txtdbgiturl').val()), "path": '' };
            }
            else {
                $('#databasemodal').css('opacity', .5);
                $('#messagemodalLabel').text('GitHub Verification');
                $('#messagemodalbodyicon').addClass('fa fa-times-circle-o fa-2x text-danger');
                $('#messagemodalbody').text('GitHub Credential is required.');
                $('#messagemodal').modal('show');
                return false;
            }
            ajaxcall.Execute('/application/validaterepo', 'POST', 'json', 'application/json', data, function (res) {
                if (res.result.status) {
                    ajaxcall.Execute('/application/getgitbranch', 'POST', 'json', 'application/json', data, function (res) {
                        if (res.error) {
                        }
                        else {
                            if (apptype.data.type === 'db') {
                                $('#gitdbbranch').html(res.result);
                            }
                            else {
                                $('#gitbranch').html(res.result);
                            }
                        }
                    });
                    $('#databasemodal').css('opacity', .5);
                    $('#messagemodalbodyicon').addClass('fa fa-check-circle-o fa-2x text-success');
                    $('input[name="hdngetbranch"]').val('1');
                    $('#messagemodalLabel').text('GitHub Verification');
                    $('#messagemodalbody').text('Valid GitHub Account & URL');
                    $('#messagemodal').modal('show');
                }
                else {
                    $('#databasemodal').css('opacity', .5);
                    $('#messagemodalLabel').text('GitHub Verification');
                    $('#messagemodalbodyicon').addClass('fa fa-times-circle-o fa-2x text-danger');
                    $('#messagemodalbody').text('GitHub Credential or GitHub URL is invalid.');
                    $('input[name="hdngetbranch"]').val('0');
                    $('#messagemodal').modal('show');
                }
            });
        }
    };
    eventhandler.CloseMessageModal = function () {
        $('#databasemodal').css('opacity', 1);
        if ($('.modal:visible').length) {
            $('body').addClass('modal-open');
        }
    };
    eventhandler.CancelDBCreate = function (pagemode) {
        if (pagemode.data.type === 'modal') {
            $('#databasemodal').modal('hide');
        }
        else if (pagemode.data.type === 'page') {
            window.location.href = '/application/manage/database';
        }
    };

	eventhandler.RemoveWhiteSpaceInKeyDown = function (e) {
		if (e.which === 32)
			return false;
		$('#applicationdomainlabel').text($.trim($('#txtappid').val()).toLowerCase() + '.[Environment].caas.is.co.za')
	};
	eventhandler.RemoveWhiteSpaceInChange = function (e) {
		this.value = this.value.replace(/\s/g, "");
        $('#applicationdomainlabel').text('' + $.trim($(this).val()).toLowerCase() + '.[Environment].caas.is.co.za')
	};
	eventhandler.LaunchApplicationClick = function () {
        var application_id = $(this).closest('tr').find('.application_id').html();
        var common = caasjslib.common;
        $('#instancename').val('');
        $('#env-mapping').html('');
        $('.env-details').addClass('hide');
        $('#hdn-applicationid').val(application_id);
        var ajaxcall = caasjslib.ajaxcall;
        ajaxcall.Execute('/application/getapplicationbyid/' + application_id, 'GET', 'json', 'text/html', null, function (res) {
            if (res.error) {

            }
            else {
                if (res.result.application.build_status !== 'Created') {
                    common.toastr('error', 'Cannot launch uncreated application');
                }
                else {
                    ajaxcall.Execute('/environment/manage', 'POST', 'json', 'text/html', null, function (res) {
                        if (res.error) {
                        }
                        else {
                            if (res.result.environment) {
                                var environments = res.result.environment;
                                $.each(environments, function (key, value) {
                                    var name = value.name;
                                    var id = value.id;
                                    var envtemplate = ('<div class="col-md-3 "><div class="panel panel-success env-pnl "><div class="panel-body "><input type="hidden", class="id ", name="id", value=' + id + ' /><span class="name",, name="name">' + name + '</span></div></div></div>');
                                    $('#env-mapping').append(envtemplate);
                                });
                                $('#environmentmodal').modal('show');
                            }
                        }
                        ajaxcall.Execute('/application/getbuildversion/' + application_id, 'GET', 'html', 'text/html', null, function (bres) {
                            if (bres.error) {
                            }
                            else {
                                $('#buildversions').html(bres.result);
                            }
                        });
                    });
                }
            }
        });
	};
	eventhandler.ViewInstanceClick = function () {
		var applicationid = $(this).closest('tr').find('.application_id').html();
		window.location.href = '/application/manageinstance/' + applicationid;
    };
    eventhandler.EnvironmentSelectClick = function () {
        $('.env-pnl').removeClass('env-pnl-sel');
        $(this).addClass('env-pnl-sel');
        $('.env-details').removeClass('hide');
    };
    eventhandler.LaunchInstance = function () {
        var ajaxcall = caasjslib.ajaxcall;
        var common = caasjslib.common;
        var view = caasjslib.application.view;
        var viewmodel = view.viewmodel;
        var applicationid = $('#hdn-applicationid').val();
        var environmentid = $('.env-pnl-sel').find('.id').val();
        var environmentname = $('.env-pnl-sel').find('.name').text();
        var buildversion = $(this).parent().parent().find('#ddlbuildversion').val();
        var instancename = $('#instancename').val();
        var data = {
            applicationid: applicationid,
            environmentid: environmentid,
            environmentname: environmentname,
            buildversion: buildversion,
            instancename : instancename
        };
        ajaxcall.Execute('/application/manageinstance/' + $('#hdn-applicationid').val(), 'POST', 'json', 'text/html', null, function (res) {
            if (res.error) {
            }
            else {
                var instance = res.result.instance;
                var envexist = false;
                if (instance.length > 0) {
                    $.each(instance, function (key, value) {
                        if (value.environment_id === environmentid) {
                            if (value.build_version_id === buildversion) {
                                envexist = true;
                            } 
                        }
                    });
                    if (!envexist) {
                        ajaxcall.Execute('/application/createinstance', 'POST', 'json', 'text/html', data, function (res) {
                            if (res.error) {
                            }
                            else {
                                $('#environmentmodal').modal('hide');
                                viewmodel.tblmanageapp.fnReloadAjax(null, null, true);

                                common.toastr('success', 'Instance created successfully');
                            }
                        });
                    }
                    else {
                        common.toastr('error', 'Instance already created for this version');
                    }
                }
                else {
                    ajaxcall.Execute('/application/createinstance', 'POST', 'json', 'text/html', data, function (res) {
                        if (res.error) {
                        }
                        else {
                            $('#environmentmodal').modal('hide');
                            viewmodel.tblmanageapp.fnReloadAjax(null, null, true);

                            common.toastr('success', 'Instance created successfully');
                        }
                    });
                }
            }
        });
    };
    
    eventhandler.SearchInstance = function () {
        var view = caasjslib.application.view;
        var viewmodel = view.viewmodel;
        var searchval = $(this).val();
        viewmodel.tblmanageinstance.fnFilter(searchval);
        viewmodel.tblmanageinstance.fnDraw();
    };

    eventhandler.BuildLogsClick = function () {
        var application_id = $(this).closest('tr').find('.application_id').html();
        var applicationname = $(this).closest('tr').find('.application_name').find('a').text();
        $('.spn-applicationname').text(applicationname);
        $('#buildlogsmodal').modal('show');
    };
    eventhandler.GitHubLogsClick = function () {
        var application_id = $(this).closest('tr').find('.application_id').html();
        var applicationname = $(this).closest('tr').find('.application_name').find('a').text();
        $('.spn-applicationname').text(applicationname);
        $('#githublogsmodal').modal('show');
    };
    eventhandler.ConfirmDeleteApp = function () {
        var ajaxcall = caasjslib.ajaxcall;
        var application_id = $(this).closest('tr').find('.application_id').html();
        $('#hdn-deleteid').val(application_id);
        ajaxcall.Execute('/application/manageinstance/' + application_id, 'POST', 'json', 'text/html', null, function (res) {
            if (res.error) {

            }
            else {
                var instance = res.result.instance;
                if (instance.length > 0) {
                    $('#p-deletetxt').html(instance.length + ' instance running in this application, you cannot Delete this application');
                    $('#deletebtndiv').addClass('hide');
                    $('#deletetext').addClass('hide');

                }
                else {
                    ajaxcall.Execute('/application/getlinkdbcount/' + application_id, 'POST', 'json', 'text/html', null, function (res) {
                        if (res.error) {

                        }                        
                        else {
                            var count = res.result.count;
                            if (count.linkcount > 0) {
                                $('#p-deletetxt').html(count.linkcount + ' Application is linked to this Database, you cannot Delete this Application');
                                $('#deletebtndiv').addClass('hide');
                                $('#deletetext').addClass('hide');
                                $('#myDeleteModal').modal('show');
                            }
                            else {
                                $('#p-deletetxt').html('');
                                $('#deletebtndiv').removeClass('hide');
                                $('#deletetext').removeClass('hide');
                                $('#myDeleteModal').modal('show');

                            }
                        }
                    });
                
                }

            }
        });
    };
    eventhandler.DeleteApplicationClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.application.view;
        var viewmodel = view.viewmodel;
        var application_id = $('#hdn-deleteid').val();
        ajaxcall.Execute('/application/deleteapplication/' + application_id, 'POST', 'json', 'text/html', null, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('warning', 'Delete application initiated');
                    viewmodel.tblmanageapp.fnReloadAjax(null, null, true);

                }
                else {
                    common.toastr('danger', 'Failed to delete application. Try again');
                }
            }
        });
    };
    eventhandler.StartInstanceClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var appinstanceid = $(this).closest('tr').find('.appinstance_id').html();
        var data = {
        instanceid: appinstanceid,
        instancestatus: 'Start'
        };
        ajaxcall.Execute('/application/updateinstancestatus', 'POST', 'json', 'text/html', data, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('success', 'Instance started');
                }
            }
        });
    };
    eventhandler.StopInstanceClick = function () { 
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var appinstanceid = $(this).closest('tr').find('.appinstance_id').html();
        var data = {
            instanceid: appinstanceid,
            instancestatus: 'Stop'
        };
        ajaxcall.Execute('/application/updateinstancestatus', 'POST', 'json', 'text/html', data, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('success', 'Instance stopped');
                }
            }
        });
    };
    eventhandler.RestartInstanceClick = function () { 
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var appinstanceid = $(this).closest('tr').find('.appinstance_id').html();
        var data = {
            instanceid: appinstanceid,
            instancestatus: 'Restart'
        };
        ajaxcall.Execute('/application/updateinstancestatus', 'POST', 'json', 'text/html', data, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('success', 'Instance restarted');
                }
            }
        });
    };
    eventhandler.SearchAllApplication = function () {
        var view = caasjslib.application.view;
        var viewmodel = view.viewmodel;
        var searchval = $(this).val();
        viewmodel.tblmanageapp.fnFilter(searchval);
        viewmodel.tblmanageapp.fnDraw();
    };
    eventhandler.RefreshApplicationClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.application.view;
        var viewmodel = view.viewmodel;
        viewmodel.tblmanageapp.fnReloadAjax(null, null, true);

    };
    eventhandler.RefreshInstanceClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.application.view;
        var viewmodel = view.viewmodel;
        viewmodel.tblmanageinstance.fnReloadAjax(null, null, true);


    };
    eventhandler.OpenNewWindow = function () 
    {
        window.open("https://www.google.com", null,"height=700,width=1400,status=yes,toolbar=no,menubar=no,location=no");
    };
    eventhandler.EnableGitUrl = function () {
        $('#txtgiturl').prop('disabled', false);
    };


}(caasjslib.application.eventhandler));