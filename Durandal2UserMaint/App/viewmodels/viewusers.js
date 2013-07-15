define(['durandal/app', 'services/navigating', 'knockout', 'services/dataservice', 'jquery', 'services/logger', 'models/editUserModel', 'services/scripts'],
    function (app, navigating, ko, dataservice, $, logger, editUserModel, scripts) {
        var title = "View Site Users";
        var description = "Here is a list of the users on the site.";
        var listOfUsers = ko.observableArray([]);
        
        var activate = function () {
            return refreshUsers();
        };

        var attached = function(view) {           
            bindAction(view);
        };

        var bindAction = function (rootSelector) {
            $(rootSelector).on('click', '.viewRoles', function () {
                var line = ko.dataFor(this);
                viewRoles(line);
            });
            $(rootSelector).on('click', '.editUser', function () {
                var line = ko.dataFor(this);
                editUser(line);
            });
        };

        var viewRoles = function(user) {
            app.showMessage("Not implemented yet", "Sorry");
        };

        var editUser = function(user) {
            var diag = new editUserModel(user.UserName, user.Email, user.IsActive);
            diag.viewUrl = 'views/edituser';
            app.showDialog(diag).then(function (diagResult) {
                if (diagResult === 'update') {
                    var promise = dataservice.updateUser(diag);
                    return promise.then(function() {
                        logger.log("User hase been updated", null, null, "viewusers", true);
                        return refreshUsers();
                    }).fail(function(error) {
                        logger.logError("We encountered an error updating user: " + scripts.jsonMessage(error), null, "viewusers", true);
                    });
                } else {
                    logger.logWarning("The user was NOT updated", null, "viewusers", true);                    
                }
            });
        };
        
        var addUser = function() {
            var diag = new editUserModel("", "", true);
            diag.viewUrl = 'views/adduser';
            app.showDialog(diag).then(function (diagResult) {
                if (diagResult === 'update') {
                    var promise = dataservice.addUser(diag);
                    return promise.then(function () {
                        logger.log("User hase been added", null, null, "viewusers", true);
                        return refreshUsers();
                    }).fail(function (error) {
                        logger.logError("We encountered an error updating user: " + scripts.jsonMessage(error), null, "viewusers", true);
                    });
                } else {
                    logger.logWarning("The user was NOT added", null, "viewusers", true);
                }
            });
        }
        

        var vm = {
            title: title,
            description: description,
            activate: activate,
            attached: attached,
            listOfUsers: listOfUsers,
            addUser: addUser
        }

        return vm;
        
        function refreshUsers() {
            navigating.busy(true);
            var promise = dataservice.getUserList(listOfUsers);

            return promise.then(function () {
                navigating.busy(false);
            });
        }
    });