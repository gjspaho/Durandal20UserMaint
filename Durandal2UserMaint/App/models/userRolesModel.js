define(['durandal/app', 'plugins/dialog', 'knockout', 'jquery', 'services/logger', 'services/dataservice', 'services/navigating', 'Q', 'services/scripts'],
    function (app, dialog, ko, $, logger, dataservice, navigating, Q, scripts) {
        var userRolesModel = function (userName) {            
            this.listOfRoles = ko.observableArray([]);
            this.listOfUserRoles = ko.observableArray([]);
            this.title = "Roles for '" + userName + "'";
            this.editRole = {
                userName: ko.observable(userName),
                roleName: ko.observable('')
            };
        }

        userRolesModel.prototype.closeModal = function () {
            dialog.close(this, 'close');
        };

        userRolesModel.prototype.activate = function () {
            navigating.showBusy(true);

            var promise = Q.all([dataservice.getRoleList(this.listOfRoles),
                dataservice.getUserRoles(this.listOfUserRoles, this.editRole.userName())]);

            return promise.then(function () {
                navigating.busy(false);
            }).fail(function () { navigating.busy(false); });
        };

        userRolesModel.prototype.attached = function (view) {
            var me = this;
            $("#userRoles").sortable({
                connectWith: ".connectedSortable",
                receive: function (event, ui) {
                    var ids = $.map(ui.item, function (item) {
                        return $(item).attr("data-id");
                    });                    
                    me.editRole.roleName(ids[0]);
                    navigating.busy(true);
                    var promise = dataservice.addRoleToUser(me.editRole);
                    promise.then(function() {
                        logger.log("Role " + ids[0] + " was added", null, null, true);
                        navigating.busy(false);
                        refreshLists(me);
                    }).fail(function(error) {
                        logger.logError("We encountered an error adding the role: " + scripts.jsonMessage(error), null, null, true);
                        navigating.busy(false);
                        refreshLists(me);
                    });

                }
            }).disableSelection();

            $("#siteRoles").sortable({
                connectWith: ".connectedSortable",
                receive: function (event, ui) {
                    var ids = $.map(ui.item, function (item) {
                        return $(item).attr("data-id");
                    });                    
                    me.editRole.roleName(ids[0]);
                    var promise = dataservice.deleteRoleFromUser(me.editRole);
                    promise.then(function () {
                        logger.log("Role " + ids[0] + " was deleted", null, null, true);
                        navigating.busy(false);
                        refreshLists(me);
                    }).fail(function (error) {
                        logger.logError("We encountered an error deleting the role: " + scripts.jsonMessage(error), null, null, true);
                        navigating.busy(false);
                        refreshLists(me);
                    });
                }
            }).disableSelection();
        };
        return userRolesModel;
        
        function refreshLists(view) {
            navigating.showBusy(true);

            var promise = Q.all([dataservice.getRoleList(view.listOfRoles),
                dataservice.getUserRoles(view.listOfUserRoles, view.editRole.userName())]);

            promise.then(function () {
                navigating.busy(false);
            }).fail(function () { navigating.busy(false); });
        }
    });