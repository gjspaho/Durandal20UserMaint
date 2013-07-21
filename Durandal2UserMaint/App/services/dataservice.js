define(['durandal/system', 'services/logger', 'services/global', 'knockout', 'plugins/http', 'services/scripts'],
    function(system, logger, global, ko, http, scripts) {

        var dataservice = {            
            getUserRole: getUserRole,
            changePassword: changePassword,
            getUserList: getUserList,
            updateUser: updateUser,
            addUser: addUser,
            resetPassword: resetPassword,
            getRoleList: getRoleList,
            addRole: addRole,
            updateRole: updateRole,
            deleteRole: deleteRole,
            getUsersInRole: getUsersInRole
        };

        return dataservice;

        function changePassword(data) {

            return http.post('/api/additional/ChangePassword', data);

        }
        
        function getUserRole() {            
            var promise = http.get('/api/additional/GetUserRoles')

            return promise.then(function (data) {
                global.userRoles(data);
            });
        }

        function getUserList(observableList) {
            var promise = http.get('/api/additional/ListUsers');
            
            return promise.then(function(data) {
                observableList(data);
            }).fail(function(error) {
                logger.logError("Error while loading users: " + scripts.jsonMessage(error), null, "getUserList", true);
            })
        }
        
        function getUsersInRole(observableList, role) {
            var promise = http.get('/api/additional/ListUsersInRole', 'role=' + role);

            return promise.then(function (data) {
                observableList(data);
            }).fail(function (error) {
                logger.logError("Error while loading users in role: " + scripts.jsonMessage(error), null, "getUsersInRole", true);
            })
        }

        function updateUser(userProfile) {
            return http.post('/api/additional/UpdateUser', userProfile);                       
        }
        function addUser(userProfile) {
            return http.post('/api/additional/AddUser', userProfile);
        }
        function resetPassword(userProfile) {
            return http.post('/api/additional/resetPassword', userProfile);
        }
        
        function getRoleList(observableList) {
            var promise = http.get('/api/additional/ListRoles');

            return promise.then(function (data) {
                observableList(data);
            }).fail(function (error) {
                logger.logError("Error while loading roles: " + scripts.jsonMessage(error), null, "getRoleList", true);
            })
        }
        
        function addRole(role) {
            return http.post('/api/additional/AddRole', role);
        }
        
        function updateRole(role) {
            return http.post('/api/additional/UpdateRole', role);
        }
        
        function deleteRole(role) {
            return http.post('/api/additional/DeleteRole', role);
        }
    });