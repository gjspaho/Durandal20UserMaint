define(['knockout', 'moment'], function(ko, moment) {

    ko.bindingHandlers.dateFormat = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = valueAccessor(),
                allBindings = allBindingsAccessor();
            value = ko.utils.unwrapObservable(value);
            //logger.log('Date value before Moment: ' + value);
            var date = moment(value);
            //logger.log('Date value after Moment: ' + date);

            var offSet = allBindings.offSet || 0;
            var pattern = allBindings.datePattern || 'MMM Do YYYY';

            if (date != null) {
                date.add('m', offSet);
                $(element).text(date.format(pattern));
            }
            else {
                $(element).text('');
            }
        }
    };
    
    ko.bindingHandlers.yesno = {
        update: function (element, valueAccessor) {
            var text = 'No';
            var value = ko.utils.unwrapObservable(valueAccessor());
            if (value) { text = 'Yes'; } $(element).text(text);
        }
    };
});