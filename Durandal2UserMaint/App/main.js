requirejs.config({
    paths: {
        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions',
        'knockout': '../Scripts/knockout-2.3.0',
        'bootstrap': '../Scripts/bootstrap',
        'jquery': '../Scripts/jquery-2.0.2',
        'toastr': '../Scripts/toastr'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
    }
});

define('jquery', [], function() { return jQuery; });
define('knockout', [], function () { return ko; });

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'toastr'], function(system, app, viewLocator, toastr) {
    //>>excludeStart("build", true);
    system.debug(true);
    //>>excludeEnd("build");

    toastr.options.positionClass = 'toast-bottom-right';
    toastr.options.backgroundpositionClass = 'toast-bottom-right';

    app.title = 'Durandal Starter Kit';

    app.configurePlugins({
        router: true,
        dialog: true,
        widget: true
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application with a transition.
        app.setRoot('viewmodels/shell', 'entrance');
    });
});