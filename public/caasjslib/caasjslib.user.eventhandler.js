var caasjslib = caasjslib || {};
caasjslib.user = caasjslib.user || {};
caasjslib.user.eventhandler = caasjslib.user.eventhandler || {};
(function (eventhandler) {
    "use strict";
    eventhandler.UpdateUserClick = function () {
        $('#spn-title').text('Update User');
        $('#txt-firstname').attr('disabled', false);
        $('#txt-lastname').attr('disabled', false);
        $('#txt-designation').attr('disabled', false);
        $('#txt-role').attr('disabled', false);
        $('#ddlroles').attr('disabled', false);

        $('#div-btnupdate').removeClass('hide');
        $(this).hide();
    };
    
    eventhandler.ChangeCustomer = function (e) {
        var view = caasjslib.user.view;
        var viewmodel = view.viewmodel;
        var customerid = $(this).val();
        $('#spn-customername').text($(this).find("option:selected").text());
        $('#spn-customername').attr("href", '/customer/view/' + customerid);
        $('#spn-createuser').attr("href", '/user/create/'+customerid+'/new');
        if (viewmodel.tblmanagealluser != null && viewmodel.tblmanagealluser != undefined && viewmodel.tblmanagealluser != '') {
            viewmodel.tblmanagealluser.fnReloadAjax('/user/manageall/' + customerid);
        }
    };

    eventhandler.ConfirmDeleteUserClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.user.view;
        var viewmodel = view.viewmodel;
        var accountid = $(this).closest('tr').find('.id').html();
        var customerid = $('#hdn-customerid').val();
        $('#hdn-deleteid').val(accountid);
        $('#hdn-parentid').val(customerid);
        
        ajaxcall.Execute('/user/getusercount/' + $('#ddlcustomers').val(), 'POST', 'json', 'text/html', null, function (res) {
            
            
            if (res.error) {
            }                        
            else {
                var count = res.result.count;
                if (count.usercount < 2) {
                    ajaxcall.Execute('/customer/getrunningapp/' + $('#ddlcustomers').val(), 'POST', 'json', 'text/html', null, function (res) {
                        if (res.error) {
                        }                        
                        else {
                            var count = res.result.count;
                            if (count.appcount > 0) {
                                $('#p-deletetxt').html('You have ' + count.appcount + ' Active Application running under this User. You cannot Delete this User.');
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

                else {
                    $('#p-deletetxt').html('');
                    $('#deletebtndiv').removeClass('hide');
                    $('#deletetext').removeClass('hide');
                    $('#myDeleteModal').modal('show');


                }                

            }
        });
    };
    eventhandler.DeleteUserClick = function () {

        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.user.view;
        var viewmodel = view.viewmodel;
        ajaxcall.Execute('/user/delete/' + $('#hdn-deleteid').val() + '/' + $('#hdn-parentid').val(), 'GET', 'json', 'text/html', null, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('warning', 'Delete user initiated');
                    viewmodel.tblmanageuser.fnReloadAjax(null, null, true);


                }
                else {
                    common.toastr('danger', 'Failed to delete user. Try again');
                }
            }
        });
    };
    eventhandler.DeleteAllUserClick = function () {
        
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.user.view;
        var viewmodel = view.viewmodel;
        ajaxcall.Execute('/user/delete/' + $('#hdn-deleteid').val() + '/' + $('#hdn-parentid').val(), 'GET', 'json', 'text/html', null, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('warning', 'Delete user initiated');
                    viewmodel.tblmanagealluser.fnReloadAjax(null, null, true);

                }
                else {
                    common.toastr('danger', 'Failed to delete user. Try again');
                }
            }
        });
    };
    eventhandler.SearchAllUsers = function () { 
        var view = caasjslib.user.view;
        var viewmodel = view.viewmodel;
        var searchval = $(this).val();
        viewmodel.tblmanagealluser.fnFilter(searchval);
        viewmodel.tblmanagealluser.fnDraw();
    };

    eventhandler.SearchAllUser = function () {
        var view = caasjslib.user.view;
        var viewmodel = view.viewmodel;
        var searchval = $(this).val();
        viewmodel.tblmanageuser.fnFilter(searchval);
        viewmodel.tblmanageuser.fnDraw();
    };
    eventhandler.AddAnotherUser = function () {
        $('#form-user').bootstrapValidator('validate');
        if ($('#form-user').data('bootstrapValidator').isValid()) {
            var data = {
            'firstname': $('#txt-firstname').val(),
            'lastname': $('#txt-lastname').val(),
            'designation': $('#txt-designation').val(),
            'email': $('#txt-emailaddress').val(),
            'ddlroles': $('#ddlroles').val(),
            'username': $('#txt-username').val(),
            'ddlcustomers': $('#ddlcustomers').val(),
            };
            var ajaxcall = caasjslib.ajaxcall;
            ajaxcall.Execute('/user/create', 'POST', 'html', 'text/html', data, function (res) {
                if (res.error) {
                }
                else {
                     window.location.href = '/user/create/'+$('#hdn-customerid').val()+'/customer';
                }
            });
        }
    };
    eventhandler.RefreshUserClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.user.view;
        var viewmodel = view.viewmodel;
        viewmodel.tblmanageuser.fnReloadAjax(null, null, true);


    };
    eventhandler.RefreshAllUserClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.user.view;
        var viewmodel = view.viewmodel;
        viewmodel.tblmanagealluser.fnReloadAjax(null, null, true);


    };
}(caasjslib.user.eventhandler));        