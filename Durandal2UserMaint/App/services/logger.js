define(['durandal/system', 'toastr'],
    function (system, toastr) {
        var logger = {
            log: log,
            logError: logError,
            logWarning: logWarning
        };

        return logger;

        function log(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'info');
        }

        function logError(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'error');
        }

        function logWarning(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'warning');
        }

        function logIt(message, data, source, showToast, toastType) {
            source = source ? '[' + source + '] ' : '';
            if (data) {
                system.log(source, message, data);
            } else {
                system.log(source, message);
            }
            if (showToast) {
                if (toastType === 'error') {
                    toastr.error(message);
                } else if (toastType === 'warning') {
                    toastr.warning(message);
                } else {
                    toastr.info(message);
                }
            }

        }
    });