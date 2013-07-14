define([], function () {

    var activate = function () {
        window.location.replace("/account/logoff");
    };

    var vm = {
        activate: activate
    };

    return vm;

});