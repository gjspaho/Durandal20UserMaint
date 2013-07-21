define(['durandal/app', 'plugins/dialog', 'knockout', 'jquery', 'services/logger'], function (app, dialog, ko, $, logger) {
    var editAddRoleModel = function(roleId, roleName) {
        this.roleId = ko.observable(roleId);
        this.roleName = ko.observable(roleName);
        this.buttonName = ko.observable('Add Role');
        this.deleteAllowed = ko.observable(false);
        this.title = "Role Management";
        if (this.roleName() != "") {
            this.buttonName('Update Role');
            this.deleteAllowed(true);
        }
    };

    editAddRoleModel.prototype.closeModal = function() {
        dialog.close(this, 'close');
    };

    editAddRoleModel.prototype.updateRole = function() {
        var f = $("#formUpdateRole");

        if (f.valid()) {
            dialog.close(this, 'update');
        } else {
            //Nothing to do here. The invalidHandler took care of it.
        }
    };
    
    editAddRoleModel.prototype.deleteRole = function () {
        var f = $("#formUpdateRole");

        if (f.valid()) {
            var me = this;
            app.showMessage("Are you sure you want to delete this role?", "Delete", ['No', 'Yes'])
                .then(function(selectedOption) {
                    if (selectedOption === "Yes") {
                        dialog.close(me, 'delete');
                    }
                });

        } else {
            //Nothing to do here. The invalidHandler took care of it.
        }
    };

    editAddRoleModel.prototype.attached = function (view) {
        var f = $("#formUpdateRole");

        f.validate({
            invalidHandler: function(event, validator) {
                logger.log('in invalidHandler');
                var errors = validator.numberOfInvalids();
                var msg = errors == 1 ? "There is 1 field in error. Please verify the highlighted field" : 'There are ' + errors + ' in error. Please verify the highlighted fields';
                validator.errorList[0].element.focus();
                logger.logError(msg, null, null, true);
            },
            rules: {
                roleName: {
                    required: true
                }
            },
            messages: {                
                roleName: {
                    required: "Please enter an role name"
                }
            }
        });
    };

    return editAddRoleModel;
})