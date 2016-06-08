var caasjslib = caasjslib || {};
caasjslib.customer = caasjslib.customer || {};
caasjslib.customer.view = caasjslib.customer.view || {};
(function (view) {
    "use strict";
    view.CreateCustomerInit = function () {
        var eventhandler = caasjslib.customer.eventhandler;
        $('#dplicensestartdate')
        .datepicker({
            format: 'dd/mm/yyyy',
            startDate: new Date()
        }).on('changeDate', function (e) {
            $('#form-customer').bootstrapValidator('revalidateField', 'licensestartdate');
            $(this).datepicker('hide');
        });
        $('#dplicenseenddate')
        .datepicker({
            format: 'dd/mm/yyyy',
            startDate: new Date()
        }).on('changeDate', function (e) {
            $('#form-customer').bootstrapValidator('revalidateField', 'licenseenddate');
            $(this).datepicker('hide');
        });
        
        $('#form-customer').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            excluded: [':disabled'],
            fields: {
                prefix: {
                    trigger: 'blur',
                    validators: {
                        remote: {
                            url: '/customer/checkname',
                            data: function (validator, $field, value) {
                                return {
                                    name: validator.getFieldElements('domainname').val(),
                                    checktype : 'customerdomain'
                                };
                            },
                            message: 'Prefix is already registered',
                            type: 'POST'
                        },
                        notEmpty: {
                            message: 'Prefix is required'
                        },
                        stringLength: {
                            max: 20,
                            message: 'Prefix should not exceed 20 characters'
                        },
                        regexp: {
                            regexp: /^[A-z-]+$/,
                            message: 'Prefix should only contain alphabets and Hyphen'
                        }
                    }
                },
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
                organisation: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Organisation is required'
                        },
                        stringLength: {
                            max: 25,
                            message: 'Organisation should not exceed 20 characters'
                        }
                    }
                },
                contactnumber: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Contact Number is required'
                        },
                        numeric: {
                            message: 'Enter valid Contact number'
                        },
                        stringLength: {
                            min: 8,
                            max: 20,
                            message: 'Contact Number should be minimum 8 and maximum 20 characters'
                        }
                    }
                },
                email: {
                    trigger: 'blur',
                    validators: {
                        remote: {
                            url: '/customer/checkname',
                            data: function (validator, $field, value) {
                                return {
                                    email: validator.getFieldElements('email').val(),
                                    checktype : 'customeremail'
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
                licensestartdate: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Subscription Start Date is required'
                        }
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'Subscription Start Date is not valid'
                    }
                },
                licenseenddate: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Subscription End Date is required'
                        }
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'Subscription End Date is not valid'
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
    view.ManageCustomerInit = function () {
        var viewmodel = caasjslib.customer.view.viewmodel;
        var eventhandler = caasjslib.customer.eventhandler;
        $(document).on('click', '.btn-deletecustomer', eventhandler.ConfirmDeleteCustomerClick);
        $(document).on('click', '.btn-regenapitoken', eventhandler.ConfirmRegenerateTokenClick);
        $(document).on('click', '.btn-adduser', eventhandler.AddUserClick);
        $(document).on('click', '.btn-viewuser', eventhandler.ViewUserClick);
        $('#btn-refresh').on('click', eventhandler.RefreshCustomerClick);
        $('#adv-search-customer').on('keyup', eventhandler.SearchAllCustomer);
        $('#btn-delete').on('click', eventhandler.DeleteCustomerClick);
        $('#btn-confirm').on('click', eventhandler.RegenerateTokenClick);
        var tblmanagecust = viewmodel.tblmanagecust;
        if (tblmanagecust == null || tblmanagecust == undefined || tblmanagecust == '') {
            tblmanagecust = $('#tbl-managecustomer').dataTable({
            paginate: true,
            "bFilter": true,
            "bLengthChange": false,
            "columnDefs": [{ type: 'date-euro', targets: 0 }],
            "ordering": true,
            "order": [[0, 'desc'], [0, 'desc']],

            ajax: {
                url: '/customer/manage',
                type: 'POST',
                    dataSrc: "customer"

            },
                columns: [ 
                    { title: "Createdon", class: 'createdon hide ',data : "createdon", "bSearchable": false },
                { title: "Customer Id", class: 'cust_id hide', "bSearchable": false, data : "id" },
                {
                    title: "Organisation",class:'companyname', data : "companyname" ,
                    "render": function (data, type, row, meta) {
                        return '<a href="/customer/view/' + row.id + '">' + data + '</a>';
                    }
                },
                { title: "Last Name", class: "lastname hide", data: "lastname" },
                { title: "Email", class: "email hide", data: "emailid" },
                { title: "Customer Name", class: 'firstname', data : "firstname"  },

                { title: "Subscription Start Date", data : "subscription_startdate" },
                { title: "Subscription End Date", data : "subscription_enddate" },
                { title: "Contact Number", data : "contactno" },
                {
                    title: "Action", class: 'w-5', "bSearchable": false,
                    "render": function (data, type, row, meta) {
                        var tokenaccess = '';
                        if (row.api_token_status[0] === 1) {
                            tokenaccess = '<li><a href="#" class="btn-regenapitoken"><i class="fa fa-retweet" aria-hidden="true"></i>   Regenerate API Token</a></li>';
                        }
                        return '<div class="input-group-btn tbl-actions"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="fa fa-ellipsis-v help-text"></span></button><ul class="dropdown-menu"><li><a href="/customer/update/' + row.id + '"><i class="fa fa-pencil-square-o" aria-hidden="true"></i>   Edit</a></li><li><a href="#" class="btn-deletecustomer"><i class="fa fa-trash-o" aria-hidden="true"></i>   Delete</a></li>' + tokenaccess + '<hr class="n-m" /><li><a href="#" class="btn-adduser"><i class="fa fa-plus-square-o" aria-hidden="true"></i>   Add Users</a></li><li><a href="#" class="btn-viewuser"><i class="fa fa-user" aria-hidden="true"></i>   View Users</a></li></div>';
                    }
                },
                { title: "Created Date", class: 'createddate hide', data : "createdon" }
            ]
            });
            viewmodel.tblmanagecust = tblmanagecust;
        }
        else {
            tblmanagecust.fnReloadAjax(null, null, true);

        }
    };
    view.ViewCustomerInit = function () {
        var eventhandler = caasjslib.customer.eventhandler;
        $('#btn-updatecustomer').on('click', eventhandler.UpdateCustomerClick);
        $('#toggle-apistatus').on('change', eventhandler.APIStatusClick);
     
        $('#dplicensestartdate')
        .datepicker({
            format: 'dd/mm/yyyy',
            startDate: new Date()
        }).on('changeDate', function (e) {
            $('#form-customer').bootstrapValidator('revalidateField', 'licensestartdate');
            $(this).datepicker('hide');
        });
        $("#dplicensestartdate").datepicker().datepicker('disable');
        $('#dplicenseenddate')
        .datepicker({
            format: 'dd/mm/yyyy',
            startDate: new Date()
        }).on('changeDate', function (e) {
            $('#form-customer').bootstrapValidator('revalidateField', 'licenseenddate');
            $(this).datepicker('hide');
        });
        var apistatus = $('#hdn-apistatus').val();
        $('#toggle-apistatus').bootstrapToggle(apistatus === '0' ? 'off' : 'on');
        $('#toggle-apistatus').bootstrapToggle('disable');
        if ($('#hdn-action').val() === 'update' || $('#hdn-action').val() === 'viewupdate') {
            eventhandler.UpdateCustomerClick();
        }
        $('#form-updatecustomer').bootstrapValidator({
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
                organisation: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Organisation is required'
                        },
                        stringLength: {
                            max: 25,
                            message: 'Organisation should not exceed 20 characters'
                        }
                    }
                },
                contactnumber: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Contact Number is required'
                        },
                        numeric: {
                            message: 'Enter valid Contact number'
                        },
                        stringLength: {
                            min: 8,
                            max: 20,
                            message: 'Contact Number should be minimum 8 and maximum 20 characters'
                        }
                    }
                },
                licensestartdate: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Subscription Start Date is required'
                        }
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'Subscription Start Date is not valid'
                    }
                },
                licenseenddate: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Subscription End Date is required'
                        }
                    },
                    date: {
                        format: 'DD/MM/YYYY',
                        message: 'Subscription End Date is not valid'
                    }
                }
            }
        });
    };
}(caasjslib.customer.view));

