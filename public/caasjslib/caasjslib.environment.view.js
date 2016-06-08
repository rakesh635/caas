var caasjslib = caasjslib || {};
caasjslib.environment = caasjslib.environment || {};
caasjslib.environment.view = caasjslib.environment.view || {};
(function (view) {
    "use strict";
    view.CreateEnvironmentInit = function () {
        var eventhandler = caasjslib.environment.eventhandler;
        $('#ddlflavors').on('change', eventhandler.GetCostDetails);
        $('#ddlos').on('change', eventhandler.GetCostDetails);
        $('#env-name').keyup(function () {
            this.value = this.value.toUpperCase();
        });

        $('#form-env').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            excluded: [':disabled'],
            fields: {
                environmenttitle: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Environment Title is required'
                        },
                        stringLength: {
                            max: 10,
                            message: 'Environment Title should not exceed 10 characters'
                        },
                        regexp: {
                            regexp: /^[a-z\d\-_\s]+$/i,
                            message: 'Environment Title should not contain special characters'
                        },
                        onfocusout: function (element) {
                            this.element(element);
                        }
                    }
                },
                environmentname: {
                    trigger: 'blur',
                    validators: {
                        remote: {
                            url: '/environment/checkname',
                            data: function (validator, $field, value) {
                                return {
                                    name: validator.getFieldElements('environmentname').val(),
                                    checktype: 'environmentid'
                                };
                            },
                            message: 'Environment Name is already Registered',
                            type: 'POST'
                        },
                        notEmpty: {
                            message: 'Environment Name is required'
                        },
                        stringLength: {
                            min: 2,
                            max: 5,
                            message: 'Environment Name can be minimum 2 and maximum 5 characters'
                        },
                        regexp: {
                            regexp: /^[A-z]+$/,
                            message: 'Environment Name should only contain alphabets'
                        }
                    }
                },
                ddlos: {
                    validators: {
                        notEmpty: {
                            message: 'OS is required'
                        }
                    }
                },
                ddlflavors: {
                    validators: {
                        notEmpty: {
                            message: 'Flavor is required'
                        }
                    }
                },
                chkagree: {
                    validators: {
                        notEmpty: {
                            message: '*Please Accept the Terms and Conditions'
                        }
                    }
                }
            }
        });
        $('[data-toggle="tooltip"]').tooltip();

        $('[data-toggle="tooltip"]').mouseenter(function () {
            var that = $(this)
            that.tooltip('show');
            setTimeout(function () {
                that.tooltip('hide');
            }, 2000);
        });
    };
    view.ManageEnvironmentInit = function () {
        var viewmodel = caasjslib.environment.view.viewmodel;
        var eventhandler = caasjslib.environment.eventhandler;
        $(document).on('click', '.btn-deleteenvironment', eventhandler.ConfirmDeleteEnvClick);
        $('#adv-search-environment').on('keyup', eventhandler.SearchAllEnvironment);
        $('#btn-delete').on('click', eventhandler.DeleteEnvironmentClick);
        $('#btn-refresh').on('click', eventhandler.RefreshEnvironmentClick);
        var tblmanageenv = viewmodel.tblmanageenv;
        if (tblmanageenv == null || tblmanageenv == undefined || tblmanageenv == '') {
            tblmanageenv = $('#tbl-manageenv').dataTable({
            paginate: true,
            "bFilter": true,
                "bLengthChange": false,
                "columnDefs": [{ type: 'date-euro', targets: 0 }],
                "ordering": true,
                "order": [[0, 'desc'], [0, 'desc']],
            ajax: {
                url: '/environment/manage',
                type: 'POST',
                dataSrc: "environment"
            },
                columns: [ 
                    { title: "Createdon", class: 'createdon hide ', data : "createdon", "bSearchable": false },
                { title: "Environment Id", class: 'id hide', "bSearchable": false, data : "id" },
                {
                    title: "Environment Title", data : "shortname",
                    "render": function (data, type, row, meta) {
                        return '<a href="/environment/view/' + row.id + '">' + data + '</a>';
                    }
                },
                {
                    title: "Environment Name", data : "name"
                },
                { title: "Description", data : "description" },
                { title: "Created By", data : "createduser" },
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
                    title: 'Progress', data : "build_level", "width": "15%",
                        "render":  function (data, type, row, meta) {
                            if (data === null || data === '') {
                                data = 0;
                            }
                        return '<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width:' + data + '%"> ' + data + '% Completed</div></div>'
                    }
                },
                {
                    title: "Action", class: 'w-5', "bSearchable": false,
                    "render": function (data, type, row, meta) {
                        if (row.build_status === 'Created') {
                            
                            
                            return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"><li><a href="/environment/update/' + row.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>   Edit</a></li><li><a href="#" class="btn-deleteenvironment"><i class="fa fa-trash-o" aria-hidden="true"></i>   Delete</a></li></div>';
                    
                        }

                            if (row.build_status === 'Creating' || row.build_status === 'Deleting' || row.build_status === 'Pending') {
                            
                            
                                return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"><li><a href="/environment/view/' + row.id + '"><i class="fa fa-eye" aria-hidden="true"></i>   View </a></li></div>';
                    
                        }
                        }
                }
            ]
            });
            viewmodel.tblmanageenv = tblmanageenv;
        }
        else {
            tblmanageenv.fnReloadAjax();
        }
    };
    view.ViewEnvironmentInit = function () {
        var eventhandler = caasjslib.environment.eventhandler;
        $('#btn-updateenv').on('click', eventhandler.UpdateEnvironmentClick);
        if ($('#hdn-action').val() === 'update' || $('#hdn-action').val() === 'viewupdate') {
            eventhandler.UpdateEnvironmentClick();
        }
        $('#form-updateenv').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            excluded: [':disabled'],
            fields: {
                environmenttitle: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Environment Title is required'
                        },
                        stringLength: {
                            max: 10,
                            message: 'Environment Title should not exceed 10 characters'
                        },
                        regexp: {
                            regexp: /^[a-z\d\-_\s]+$/i,
                            message: 'Environment Title should not contain special characters'
                        },
                        onfocusout: function (element) {
                            this.element(element);
                        }
                    }
                },
                environmentname: {
                    trigger: 'blur',
                    validators: {
                        remote: {
                            url: '/environment/checkname',
                            data: function (validator, $field, value) {
                                return {
                                    name: validator.getFieldElements('environmentname').val(),
                                    checktype: 'environmentid'
                                };
                            },
                            message: 'Environment Name is not available',
                            type: 'POST'
                        },
                        notEmpty: {
                            message: 'Environment Name is required'
                        },
                        stringLength: {
                            min: 2,
                            max: 5,
                            message: 'Environment Name can be minimum 2 and maximum 5 characters'
                        },
                        regexp: {
                            regexp: /^[A-z]+$/,
                            message: 'Environment Name should only contain alphabets'
                        }
                    }
                }
            }
        });
    };
}(caasjslib.environment.view));