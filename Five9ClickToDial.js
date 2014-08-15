var $jsonp = (function () {
    var obj = { };

    obj.send = function (src, options) {
        options = options || {};
        var callback_name = options.callbackName || 'callback',
            on_success = options.onSuccess || function () {
            },
            on_timeout = options.onTimeout || function () {
            },
            timeout = options.timeout || 10; // seconds

        var timeout_trigger = window.setTimeout(function () {
            window[callback_name] = function () {
            };
            on_timeout();
        }, timeout * 1000);

        window[callback_name] = function (data) {
            window.clearTimeout(timeout_trigger);
            on_success(data);
        };

        var sep = (src.indexOf('?') > -1 ? '&' : '?');

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = src + sep + 'callback=' + encodeURIComponent(callback_name);

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    return obj;
})();

function makeCall(number) {
    var MAKECALL_URL = 'http://localhost:9998/makeCall?campaignId=0&checkDnc=false&number=';
    $jsonp.send(MAKECALL_URL + encodeURIComponent(number));
}
