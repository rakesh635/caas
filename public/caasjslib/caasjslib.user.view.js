var caasjslib = caasjslib || {};
caasjslib.user = caasjslib.user || {};
caasjslib.user.view = caasjslib.user.view || {};
(function (view) {
    "use strict";
    view.CreateUserInit = function () {
        var eventhandler = caasjslib.user.eventhandler;
        $('#btn-anotheruser').on('click', eventhandler.AddAnotherUser);
        var customerid = $('#ddlcustomers').val();
        $('#ddlcustomers').on('change', eventhandler.ChangeCustomer);
        $('#a-cancel').attr("href", '/user/manage/' + customerid);
        $('#spn-customername').text($('#ddlcustomers :selected').text());
        $('#spn-customername').attr("href", '/customer/view/' + customerid);

        $('#hdn-customerid').val(customerid);
        $('#form-user').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            excluded: [':disabled'],
            fields: {
                firstname: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'First Name is required'
                        },
                        stringLength: {
                            max: 20,
                            message: 'First Name should not exceed 20 characters'
                        },
                        regexp: {
                            regexp: /^[A-z]+$/,
                            message: 'First Name should only contain alphabets'
                        }
                    }
                },
                designation: {
                    trigger: 'blur',
                    validators: {
                        stringLength: {
                            max: 40,
                            message: 'Designation should not exceed 40 characters'
                        }
                    }
                },
                lastname: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Last Name is required'
                        },
                        stringLength: {
                            max: 20,
                            message: 'Last Name should not exceed 20 characters'
                        },
                        regexp: {
                            regexp: /^[A-z]+$/,
                            message: 'Last Name should only contain alphabets'
                        }
                    }
                },
                email: {
                    trigger: 'blur',
                    validators: {
                        remote: {
                            url: '/user/checkname/duplicate',
                            data: function (validator, $field, value) {
                                return {
                                    email: validator.getFieldElements('email').val(),
                                    checktype : 'useremail'
                                };
                            },
                            message: 'Email Address is already registered',
                            type: 'POST'
                        },
                        notEmpty: {
                            message: 'Email Address is required'
                        },
                        emailAddress: {
                            message: 'Enter valid Email Address'
                        },
                        stringLength: {
                            max: 50,
                            message: 'Email Address should not exceed 50 characters'
                        }
                    }
                },
                ddlroles: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Role is required'
                        }
                    }
                },
                username: {
                    trigger: 'blur',
                    validators: {
                        remote: {
                            url: '/user/checkname/duplicate',
                            data: function (validator, $field, value) {
                                return {
                                    name: validator.getFieldElements('username').val(),
                                    checktype : 'username'
                                };
                            },
                            message: 'User Name is already registered',
                            type: 'POST'
                        },
                        notEmpty: {
                            message: 'User Name is required'
                        },
                        stringLength: {
                            max: 20,
                            message: 'User Name should not exceed 20 characters'
                        },
                        regexp: {
                            regexp: /^[0-9a-zA-Z ]+$/,
                            message: 'User Name should only contain alphanumeric character'
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
    view.ManageAllUserInit = function () {
        var viewmodel = caasjslib.user.view.viewmodel;
        var eventhandler = caasjslib.user.eventhandler;
        $('#ddlcustomers').on('change', eventhandler.ChangeCustomer);
        $('#adv-search-input').on('keyup', eventhandler.SearchAllUsers);
        var customerid = $('#ddlcustomers').val();
        $('#spn-customername').text($('#ddlcustomers :selected').text());
        $('#spn-customername').attr("href", '/customer/view/' + customerid);
        $('#spn-createuser').attr("href", '/user/create/' + customerid + '/new');
        $('#btn-refresh').on('click', eventhandler.RefreshAllUserClick);
        $(document).on('click', '.btn-deleteuser', eventhandler.ConfirmDeleteUserClick);
        $('#btn-delete').on('click', eventhandler.DeleteAllUserClick);

        var tblmanagealluser = viewmodel.tblmanagealluser;
        if (tblmanagealluser == null || tblmanagealluser == undefined || tblmanagealluser == '') {
            tblmanagealluser = $('#tbl-managealluser').dataTable({
                paginate: true,
                "bFilter": true,
                "bLengthChange": false,
                "columnDefs": [{ type: 'date-euro', targets: 0 }],
                "ordering": true,
                "order": [[0, 'desc'], [0, 'desc']],

     
                ajax: {
                    url: '/user/manageall/'+ customerid,
                    type: 'POST',
                    dataSrc: "user"
                },
                columns: [ 
                    { title: "Createdon", class: 'createdon hide ', data : "createdon", "bSearchable": false },
                    { title: "Account Id", class: 'id hide', "bSearchable": false, data : "id" },
                    {
                        title: "UserName", data : "username",
                        "render": function (data, type, row, meta) {
                            return '<a href="/user/view/' + row.id + '">' + data + '</a>';
                        }
                    },
                    {
                        title: "Name", 
                        "render": function (data, type, row, meta) {
                            return row.first_name + (row.last_name === null ? '' : row.last_name);
                        }
                    },
                    { title: "Email", data : "emailid" },
                    { title: "Role", data : "rolename" },
                    {
                        title: "Action", class: 'w-5', "bSearchable": false,
                        "render": function (data, type, row, meta) {
                            return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"><li><a href="/user/update/' + row.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>   Edit</a></li><li><a href="#" class="btn-deleteuser"><i class="fa fa-trash-o" aria-hidden="true"></i>   Delete</a></li><li><a href="/user/impersonate/' + row.username + '/' + customerid + '/all"><i class="fa fa-random" aria-hidden="true"></i>   Impersonate</a></li></div>';
                        }
                    }
                ]
            });
            viewmodel.tblmanagealluser = tblmanagealluser;
        }
        else {
            tblmanagealluser.fnReloadAjax(null, null, true);

        }
    };
    view.ManageUserInit = function () {
        var viewmodel = caasjslib.user.view.viewmodel;
        var eventhandler = caasjslib.user.eventhandler;
        $(document).on('click', '.btn-deleteuser', eventhandler.ConfirmDeleteUserClick);
        $('#btn-delete').on('click', eventhandler.DeleteUserClick);
        $('#adv-search-user').on('keyup', eventhandler.SearchAllUser);
        $('#btn-refresh').on('click', eventhandler.RefreshUserClick);

        var tblmanageuser = viewmodel.tblmanageuser;
        if (tblmanageuser == null || tblmanageuser == undefined || tblmanageuser == '') {
            tblmanageuser = $('#tbl-manageuser').dataTable({
            paginate: true,
              "bFilter": true,
                "bLengthChange": false,
                "columnDefs": [{ type: 'date-euro', targets: 0 }],
                "ordering": true,
                "order": [[0, 'desc'], [0, 'desc']],
            ajax: {
                url: '/user/manage',
                type: 'POST',
                data: { customerid: $('#hdn-customerid').val() },
                dataSrc: "user"
            },
                columns: [ 
                { title: "Createdon", class: 'createdon  ', data : "createdon", "bSearchable": false },
                { title: "Account Id", class: 'id hide', "bSearchable": false, data : "id" },
                {
                    title: "UserName", data : "username",
                    "render": function (data, type, row, meta) {
                        return '<a href="/user/view/' + row.id + '">' + data + '</a>';
                    }
                },
                {
                    title: "Name", 
                    "render": function (data, type, row, meta) {
                        return row.first_name + ' ' + (row.last_name === null ? '' : row.last_name);
                    }
                },
                { title: "Email", data : "emailid" },
                { title: "Role", data : "rolename" },
                {
                    title: "Action", class: 'w-5', "bSearchable": false,
                    "render": function (data, type, row, meta) {
                        return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"><li><a href="/user/update/' + row.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>   Edit</a></li><li><a href="#" class="btn-deleteuser"><i class="fa fa-trash-o" aria-hidden="true"></i>   Delete</a></li><li><a href="/user/impersonate/'+row.username+'/'+ $('#hdn-customerid').val()+'/manage"><i class="fa fa-random" aria-hidden="true"></i>   Impersonate</a></li></div>';
                    }
                }
            ]
            });
            viewmodel.tblmanageuser = tblmanageuser;
        }
        else {
            tblmanageuser.fnReloadAjax(null, null, true);

        }
    };
    view.ViewUserInit = function () {
        var eventhandler = caasjslib.user.eventhandler;
        var customerid = $('#ddlcustomers').val();
        $('#spn-customername').text($('#ddlcustomers :selected').text());
        $('#spn-customername').attr("href", '/customer/view/' + customerid);
        $(document).on('click', '#btn-updateuser', eventhandler.UpdateUserClick);
        if ($('#hdn-action').val() === 'update' || $('#hdn-action').val() === 'viewupdate') {
            eventhandler.UpdateUserClick();
        }
        $('#form-updateuser').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            excluded: [':disabled'],
            fields: {
                firstname: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'First Name is required'
                        },
                        stringLength: {
                            max: 20,
                            message: 'First Name should not exceed 20 characters'
                        },
                        regexp: {
                            regexp: /^[A-z]+$/,
                            message: 'First Name should only contain alphabets'
                        }
                    }
                },
                lastname: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Last Name is required'
                        },
                        stringLength: {
                            max: 20,
                            message: 'Last Name should not exceed 20 characters'
                        },
                        regexp: {
                            regexp: /^[A-z]+$/,
                            message: 'Last Name should only contain alphabets'
                        }
                    }
                },
                designation: {
                    trigger: 'blur',
                    validators: {
                        stringLength: {
                            max: 40,
                            message: 'Designation should not exceed 40 characters'
                        }
                    }
                },
                ddlroles: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Role is required'
                        }
                    }
                }
            }
        });
 
    };
    view.ImpersonateUserInit = function () {
        $('#form-impuser').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                username: {
                    trigger: 'blur',
                    validators: {
                        remote: {
                            url: '/user/checkname/validate',
                            data: function (validator, $field, value) {
                                return {
                                    name: validator.getFieldElements('username').val(),
                                    checktype : 'username'
                                };
                            },
                            message: 'User Name does not exist',
                            type: 'POST'
                        },
                        notEmpty: {
                            message: 'User Name is required'
                        },
                        stringLength: {
                            max: 20,
                            message: 'User Name should not exceed 20 characters'
                        },
                        regexp: {
                            regexp: /^[0-9a-zA-Z]+$/,
                            message: 'User Name should only contain alphanumeric character'
                        }
                    }
                }
            }
        });
    };
}(caasjslib.user.view));