var caasjslib = caasjslib || {};
caasjslib.environment = caasjslib.environment || {};
caasjslib.environment.eventhandler = caasjslib.environment.eventhandler || {};
(function (eventhandler) {
    eventhandler.UpdateEnvironmentClick = function () {
        $('#txtar-description').attr('readonly', false);
        $('#environmenttitle').attr('disabled', false);
        $('#div-btnupdate').removeClass('hide');
        $('#spn-title').text('Update Environment')
        $(this).hide();
    };
    eventhandler.ConfirmDeleteEnvClick = function () {
        var environmentid = $(this).closest('tr').find('.id').html();
        $('#hdn-deleteid').val(environmentid);
        $('#myDeleteModal').modal('show');
    };
    eventhandler.DeleteEnvironmentClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.environment.view;
        var viewmodel = view.viewmodel;
        ajaxcall.Execute('/environment/delete/' + $('#hdn-deleteid').val(), 'GET', 'json', 'text/html', null, function (res) {
            if (res.error) {
            }
            else {
                if (res.result.status.status) {
                    common.toastr('warning', 'Delete Environment initiated');
                    viewmodel.tblmanageenv.fnReloadAjax(null, null, true);
                }
                else {
                    common.toastr('danger', 'Failed to delete Environment. Try again');
                }
            }
        });
    };
    eventhandler.SearchAllEnvironment = function () {
        var view = caasjslib.environment.view;
        var viewmodel = view.viewmodel;
        var searchval = $(this).val();
        viewmodel.tblmanageenv.fnFilter(searchval);
        viewmodel.tblmanageenv.fnDraw();
    };
    eventhandler.GetCostDetails = function () {
        var ajaxcall = caasjslib.ajaxcall;
        if ($("#ddlflavors").val() !== "" && $("#ddlos").val() !== "") {
            var flavorid = $('#ddlflavors').val();
            var osid = $('#ddlos').val();
            ajaxcall.Execute('/environment/getcostdetails/' + flavorid + '/' + osid, 'GET', 'json', 'text/html', null, function (res) {
                var result = res.result.cost[0];
                $('#spn-os').text(result.os_name + ' ' +result.os_version);
                $('#spn-cpu').text(result.cpu);
                $('#spn-ram').text(result.ram);
                $('#spn-storage').text(result.storage);
                $('#spn-total').text(result.total_cost);
                $('#hdn-billingid').val(result.billing_id);
                $('#cost-details').removeClass('hide');
            });
        }
        else {
            $('#cost-details').addClass('hide');
        }
    };
    eventhandler.RefreshEnvironmentClick = function () {
        var ajaxcall = caasjslib.ajaxcall, common = caasjslib.common;
        var view = caasjslib.environment.view;
        var viewmodel = view.viewmodel;
        viewmodel.tblmanageenv.fnReloadAjax(null, null, true);

    };
}(caasjslib.environment.eventhandler));
