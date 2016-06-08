var caasjslib = caasjslib || {};
caasjslib.customer = caasjslib.customer || {};
caasjslib.customer.eventhandler = caasjslib.customer.eventhandler || {};
(function (eventhandler) {
    "use strict";
    eventhandler.UpdateCustomerClick = function () {
        $('#spn-title').text('Update Customer');
        $('#txt-firstname').attr('disabled', false);
        $('#txt-lastname').attr('disabled', false);
        $('#txt-contactnumber').attr('disabled', false);
        $('#txt-apitoken').attr('disabled', false);
        $('#txt-licensestartdate').addClass('bg-white');
        $('#txt-licenseenddate').addClass('bg-white');
        $('#div-btnupdate').removeClass('hide');
        $(this).hide();
        $('#btn-viewuser').hide();
        $('#toggle-apistatus').bootstrapToggle('enable');
    };
    eventhandler.ConfirmDeleteCustomerClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.customer.view;
        var viewmodel = view.viewmodel;
        var customerid = $(this).closest('tr').find('.cust_id').html();
        $('#hdn-deleteid').val(customerid);
       ajaxcall.Execute('/user/getusercount/' + customerid, 'POST', 'json', 'text/html', null, function (res) {
         if (res.error) {
              
            }                        
            else {
                var count = res.result.count;
                if (count.usercount > 0 ) {
                    $('#p-deletetxt').html('You have ' +count.usercount +' Active Users under this Customer. You cannot delete this Customer' );
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
    };
    eventhandler.DeleteCustomerClick = function () {
 
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.customer.view;
        var viewmodel = view.viewmodel;
        var customerid = $('#hdn-deleteid').val();
        ajaxcall.Execute('/customer/delete/' + customerid, 'GET', 'json', 'text/html', null, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('warning', 'Delete customer initiated');
                    viewmodel.tblmanagecust.fnReloadAjax(null, null, true);

                }
                else {
                    common.toastr('danger', 'Failed to delete customer. Try again');
                }
            }
        });
    };
    eventhandler.APIStatusClick = function () {
        if ($(this).prop('checked')) {
            $('#hdn-togglestate').val('1');
        }
        else {
            $('#hdn-togglestate').val('0');
        }
    };
    eventhandler.ConfirmRegenerateTokenClick = function () {
        var customer_id = $(this).closest('tr').find('.cust_id').html(),
            organization = $(this).closest('tr').find('.companyname').find('a').text(),
            firstname = $(this).closest('tr').find('.firstname').find('a').text(),
            lastname = $(this).closest('tr').find('.lastname').html(),
            email = $(this).closest('tr').find('.email').html();
        var data = {
            customerid: customer_id,
            firstname: firstname,
            lastname: lastname,
            email: email
        };
        $('#hdn-confirmid').val(JSON.stringify(data));
        $('#confirm-title').text('Token Confirmation');
        $('#confirmtext').text('Do you want to regenerate API token for '+ organization +'?');
        $('#myConfirmModal').modal('show');  
        //ajaxcall.Execute('/customer/regenerateapitoken', 'POST', 'json', 'text/html', data, function (res) {
        //    if (res.error) {
        //    }
        //    else {
        //        if (res.result.result.status) {
        //            common.toastr('success', 'New token sent to customer email');
        //            viewmodel.tblmanageapp.fnReloadAjax();
        //        }
        //        else {
        //            common.toastr('danger', 'Failed to regenerate api token. Try again');
        //        }
        //    }
        //});
    };
    eventhandler.RegenerateTokenClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.customer.view;
        var viewmodel = view.viewmodel;
        var data = JSON.parse($('#hdn-confirmid').val());
        ajaxcall.Execute('/customer/regenerateapitoken', 'POST', 'json', 'text/html', data, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.result.status) {
                    common.toastr('success', 'New token sent to customer email');
                    viewmodel.tblmanageapp.fnReloadAjax(null, null, true);

                }
                else {
                    common.toastr('danger', 'Failed to regenerate api token. Try again');
                }
            }
        });
    };
    eventhandler.AddUserClick = function () {
        var customerid = $(this).closest('tr').find('.cust_id').html();
        window.location.href = '/user/create/' + customerid +'/addusers';
    };
    eventhandler.ViewUserClick = function () {
        var customerid = $(this).closest('tr').find('.cust_id').html();
        window.location.href = '/user/manage/' + customerid;
    };
    eventhandler.SearchAllCustomer = function () {
        var view = caasjslib.customer.view;
        var viewmodel = view.viewmodel;
        var searchval = $(this).val();
        viewmodel.tblmanagecust.fnFilter(searchval);
        viewmodel.tblmanagecust.fnDraw();
    };
    eventhandler.RefreshCustomerClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.customer.view;
        var viewmodel = view.viewmodel;
        viewmodel.tblmanagecust.fnReloadAjax(null, null, true);


    };
}(caasjslib.customer.eventhandler));