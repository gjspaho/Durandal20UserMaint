define(['plugins/dialog', 'knockout', 'jquery', 'services/logger'], function (dialog, ko, $, logger) {
    var edirUserModel = function(userName, userEmail, isActive) {
        this.userName = ko.observable(userName);
        this.userEmail = ko.observable(userEmail);
        this.isActive = ko.observable(isActive);
        this.title = "Edit User";
        
    }

    edirUserModel.prototype.closeModal = function() {
        dialog.close(this, 'close');
    }
    
    edirUserModel.prototype.updateUser = function() {
        var f = $("#formUpdateUser");

        if (f.valid()) {
            dialog.close(this, 'update');
        } else {
            //Nothing to do here. The invalidHandler took care of it.
        }
    }
    
    edirUserModel.prototype.attached = function (view) {
        var f = $("#formUpdateUser");

        f.validate({
            invalidHandler: function (event, validator) {
                logger.log('in invalidHandler');
                var errors = validator.numberOfInvalids();
                var msg = errors == 1 ? "There is 1 field in error. Please verify the highlighted field" : 'There are ' + errors + ' in error. Please verify the highlighted fields';
                validator.errorList[0].element.focus();
                logger.logError(msg, null, null, true);
            },
            rules: {
                userEmail: {                    
                    email: true
                },
                userName: {
                    required: true
                }
            },
            messages: {
                userEmail: {                    
                    email: "Please enter a valid email"
                },
                userName: {
                    required: "Please enter an user name"
                }
            }
        });
    }

    return edirUserModel;
})