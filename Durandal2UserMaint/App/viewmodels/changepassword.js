define(['durandal/app', 'services/logger', 'services/dataservice', 'plugins/router', 'models/changePasswordModel', 'jquery'],
    function (app, logger, dataservice, router, changePasswordModel, $) {
        var title = "Change Password";
        var description = "Enter your Old Password as well as your New One.";


        var passwordModel = ko.observable();

        var activate = function () {
            passwordModel(changePasswordModel);
            return;
        };

        var viewAttached = function () {
            var f = $("#myPasswordForm");

            f.validate({
                invalidHandler: function (event, validator) {
                    logger.log('in invalidHandler');
                    var errors = validator.numberOfInvalids();
                    var msg = errors == 1 ? "There is 1 field in error. Please verify the highlighted field" : 'There are ' + errors + ' in error. Please verify the highlighted fields';
                    validator.errorList[0].element.focus();
                    logger.logError(msg, null, null, true);
                },
                rules: {
                    oldPassword: {
                        required: true
                    },
                    newPassword: {
                        required: true,
                        minlength: 6
                    },
                    confirmPassword: {
                        required: true,
                        equalTo: "#newPassword"
                    }
                },
                messages: {
                    oldPassword: {
                        required: "The Old Password is Required"
                    },
                    newPassword: {
                        required: "The New Password is required",
                        minlength: "New password must be at last 6 characters long"
                    },
                    confirmPassword: {
                        required: "The Confirmation Password is required",
                        equalTo: "The Confirmation Password doesn't match"
                    }
                }
            });
        };

        var sendChangePassword = function () {
            var f = $("#myPasswordForm");

            if (f.valid()) {
                nav.busy(true);                
                var promise = dataservice.changePassword(passwordModel);

                return promise
                    .then(function () {
                        logger.log("Your password was changed", null, "sendChangePassword", true);
                        passwordModel().oldPassword('');
                        passwordModel().newPassword('');
                        passwordModel().confirmPassword('');
                        nav.busy(false);
                    })
                    .fail(function (error) {
                        logger.logError("Error while changing your password: " + error.responseJSON.ExceptionMessage, null, "sendChangePassword", true);
                        nav.busy(false);
                    });
            } else {
                //Handled by the invalidHandler
            }
        };

        var vm = {            
            title: title,
            description: description,
            activate: activate,
            passwordModel: passwordModel,
            sendChangePassword: sendChangePassword,
            viewAttached: viewAttached
        };

        return vm;
    });