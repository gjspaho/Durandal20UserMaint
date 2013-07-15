define(['durandal/system', 'services/logger', 'services/global', 'knockout', 'plugins/http'],
    function(system, logger, global, ko, http) {

        var dataservice = {            
            getUserRole: getUserRole,
            changePassword: changePassword,
            getUserList: getUserList,
            updateUser: updateUser,
            addUser: addUser
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
                logger.logError("Error while loading users: " + error.responseJSON.ExceptionMessage, null, "sendChangePassword", true);
            })
        }

        function updateUser(userProfile) {
            return http.post('/api/additional/UpdateUser', userProfile);                       
        }
        function addUser(userProfile) {
            return http.post('/api/additional/AddUser', userProfile);
        }
    });