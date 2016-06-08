var caasjslib = caasjslib || {};
caasjslib.common = caasjslib.common || {};
(function (common) {
    common.toastr = function(type, msg) { 
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-center",
            "preventDuplicates": true,
            "onclick": null,
            "showDuration": "10000",
            "hideDuration": "10000",
            "timeOut": "10000",
            "extendedTimeOut": "10000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
        toastr[type](msg);
    };
}(caasjslib.common));