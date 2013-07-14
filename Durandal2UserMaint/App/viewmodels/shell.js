define(['durandal/system', 'plugins/router', 'durandal/app', 'services/logger', 'services/dataservice', 'knockout', 'services/navigating'],
    function (systen, router, app, logger, dataservice, ko, navigating) {

        var activate = function () {

            navigating.busy(true);
            var promise = dataservice.getUserRole();
            return promise.then(function () {
                logger.log("Portal activated", null, null, true);
                router.map(buildRouteArray()).buildNavigationModel();
                navigating.busy(false);
                return router.activate();                
            }).fail(function (error) {
                logger.logError("Cannot load portal.<br/>" + error.responseJSON.ExceptionMessage, "Cannot load portal", null, true);
                navigating.busy(false);
                return error;
            });
            
        };

        

        var mainMenu = ko.computed(function () {
            return ko.utils.arrayFilter(router.navigationModel(), function (route) {
                return route.type == 'main';
            });
        });

        var adminMenu = ko.computed(function () {
            return ko.utils.arrayFilter(router.navigationModel(), function (route) {
                return route.type == 'admin';
            });
        });


        var search = function () {
            logger.log("Search not yet implemented", null, null, true);
        }


        var shell = {
            activate: activate,
            router: router,
            search: search,
            mainMenu: mainMenu,
            adminMenu: adminMenu,
            showBusy: navigating.showBusy
        };


        return shell;
        

        function buildRouteArray() {
            var routes = [];

            routes.push({
                route: '',
                title: 'Welcome',
                moduleId: 'viewmodels/welcome',
                type: 'main',
                nav: true
            });
            
            routes.push({
                route: 'flickr',
                title: 'flickr',
                moduleId: 'viewmodels/flickr',
                type: 'main',
                nav: true
            });
            
            routes.push({
                route: 'changepassword',
                title: 'Change Password',
                moduleId: 'viewmodels/changepassword',
                type: 'admin',
                nav: true
            });

            routes.push({
                route: 'logoff',
                title: 'Log Off',
                moduleId: 'viewmodels/logoff',
                type: 'admin',
                nav: true
            });


            return routes;
        }
    });