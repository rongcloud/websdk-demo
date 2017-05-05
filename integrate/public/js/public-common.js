/**
 * Created by wangchengkuo on 17/4/12.
 */
(function (window) {
    "use strict";

    function getComponent(options) {
        return function (resolve, reject) {
            $.get(options.template).then(function (html) {
                var component = $.extend({}, options, {template: html});
                resolve(component);
            }).fail(function (xhr, status, error) {
                console.info('getComponent error', options);
                reject(error);
            });
        };
    }

    window.common = {
        getComponent: getComponent
    };
})(window);