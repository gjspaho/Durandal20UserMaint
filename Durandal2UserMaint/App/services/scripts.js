define(['services/global'],
    function (global) {        
        var visibleBasedOnUserRole = function (roles) {
            var allowed = false;

            if (roles.length == 1 && roles[0].toLowerCase() == "all") {
                allowed = true;
            } else {
                ko.utils.arrayForEach(roles, function (role) {
                    ko.utils.arrayForEach(global.userRoles(), function (item) {
                        if (role.toLowerCase() === item.toLowerCase()) {
                            allowed = true;
                        }
                    });
                });
            }
            return allowed;
        };

        var scripts = {
            visibleBasedOnUserRole: visibleBasedOnUserRole
        };

        return scripts;
    })