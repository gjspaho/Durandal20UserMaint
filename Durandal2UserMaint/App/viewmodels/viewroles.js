define(['durandal/app', 'services/navigating', 'knockout', 'services/dataservice', 'jquery', 'services/logger', 'services/scripts', 'models/editAddRoleModel', 'models/listUsersInRolesModel'],
    function (app, navigating, ko, dataservice, $, logger, scripts, editAddRoleModel, listUsersInRolesModel) {
        var title = "View Site Roles";
        var description = "Here is a list of the roles on the site.";
        var listOfRoles = ko.observableArray([]);
        

        var activate = function () {
            return refreshRoles();
        };

        var attached = function (view) {
            bindAction(view);
        };

        var bindAction = function(rootSelector) {
            $(rootSelector).on('click', '.viewUsers', function () {
                var line = ko.dataFor(this);
                viewUsers(line);
            });
            $(rootSelector).on('click', '.editRole', function () {
                var line = ko.dataFor(this);
                editRole(line);
            });
        };

        var editRole = function(role) {
            var diag = new editAddRoleModel(parseInt(role.RoleId), role.RoleName);
            diag.viewUrl = 'views/addeditrole';
            app.showDialog(diag).then(function (diagResult) {
                if (diagResult === 'update') {
                    var promise = dataservice.updateRole(diag);
                    promise.then(function () {
                        logger.log("Role has been updated", null, null, "viewroles", true);
                        refreshRoles();
                    }).fail(function (error) {
                        logger.logError("We encountered an error updating role: " + scripts.jsonMessage(error), null, "viewroles", true);
                    });
                } else if (diagResult === 'delete') {
                    var promise = dataservice.deleteRole(diag);
                    promise.then(function () {
                        logger.log("Role has been deleted", null, null, "viewroles", true);
                        refreshRoles();
                    }).fail(function (error) {
                        logger.logError("We encountered an error deleting role: " + scripts.jsonMessage(error), null, "viewroles", true);
                    });
                }
                else {
                    logger.logWarning("The role was NOT deleted", null, "viewroles", true);
                }
            });
        };
        
        var addRole = function () {
            var diag = new editAddRoleModel(0, "");
            diag.viewUrl = 'views/addeditrole';
            app.showDialog(diag).then(function (diagResult) {
                if (diagResult === 'update') {
                    var promise = dataservice.addRole(diag);
                    promise.then(function () {
                        logger.log("Role has been added", null, null, "viewroles", true);
                        refreshRoles();
                    }).fail(function (error) {
                        logger.logError("We encountered an error adding role: " + scripts.jsonMessage(error), null, "viewroles", true);
                    });
                } else {
                    logger.logWarning("The role was NOT added", null, "viewroles", true);
                }
            });
        };
        

        var viewUsers = function (role) {
            var diag = new listUsersInRolesModel(role.RoleName);
            diag.viewUrl = 'views/usersinrole';
            app.showDialog(diag).then(function (diagResult) {
                //Nothing to do
            });
        };

        var vm = {
            title: title,
            description: description,
            activate: activate,
            attached: attached,
            listOfRoles: listOfRoles,
            addRole: addRole
        };

        return vm;
        
        function refreshRoles() {
            
            navigating.busy(true);
            var promise = dataservice.getRoleList(listOfRoles);

            promise.then(function () {
                navigating.busy(false);
            }).fail(function () { navigating.busy(false); });
        }
    });  