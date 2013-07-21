define(['durandal/app', 'services/navigating', 'knockout', 'services/dataservice', 'jquery', 'services/logger', 'services/scripts'],
    function(app, navigating, ko, dataservice, $, logger, scripts) {

        var title = "View Role";
        var description = "Here is a list of the users on the site.";
        var listOfRoles = ko.observableArray([]);
        
        var activate = function() {

        }
        var attached = function (view) {
            bindAction(view);
        };

        var bindAction = function (rootSelector) {
            $(rootSelector).on('click', '.viewUsers', function () {
                var line = ko.dataFor(this);
                viewUsers(line);
            });
            $(rootSelector).on('click', '.editRole', function () {
                var line = ko.dataFor(this);
                editRole(line);
            });
        };

        var editRole = function (role) {
            app.showMessage("Not implemented yet", "Sorry");
        };

        var addRole = function (role) {
            app.showMessage("Not implemented yet", "Sorry");
        };

        var viewUsers = function (role) {
            app.showMessage("Not implemented yet", "Sorry");
        };
        var vm = {
            title: title,
            description: description,
            activate: activate,
            listOfRoles: listOfRoles,
            attached: attached,
            addRole: addRole
        };

        return vm;

        function refreshRoles() {

            //navigating.busy(true);
            //var promise = dataservice.getRoleList(listOfRoles);

            //return promise.then(function () {
            //    navigating.busy(false);
            //});
        }

    });