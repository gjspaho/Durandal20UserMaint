define(function () {
    var oldPassword = ko.observable('');
    var newPassword = ko.observable('');
    var confirmPassword = ko.observable('');

    var changePasswordModel = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword
    };

    return changePasswordModel;
});