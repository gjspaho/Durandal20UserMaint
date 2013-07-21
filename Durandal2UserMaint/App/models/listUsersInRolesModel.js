define(['durandal/app', 'plugins/dialog', 'knockout', 'jquery', 'services/logger', 'services/dataservice', 'services/navigating', 'Q'],
    function (app, dialog, ko, $, logger, dataservice, navigating, Q) {
        var listUsersInRolesModel = function (roleName) {
            this.roleName = ko.observable(roleName);
            this.title = "Users in '" + roleName + "' Role";
            this.listOfUsers = ko.observableArray([]);
        }

        listUsersInRolesModel.prototype.closeModal = function () {
            dialog.close(this, 'close');
        };

        listUsersInRolesModel.prototype.activate = function () {
            navigating.showBusy(true);
            var promise = dataservice.getUsersInRole(this.listOfUsers, this.roleName());

            return promise.then(function() {
                navigating.showBusy(false);
            }).fail(function() {
                navigating.showBusy(false);
            });
        };

        return listUsersInRolesModel;
    });