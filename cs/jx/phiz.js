;(function (global, factory) {
    'use strict';
    if (typeof exports === 'object' && typeof module !== undefined) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.RongIMLib = window.RongIMLib || {};
        window.RongIMLib.RongIMPhiz = factory();
    }
})(window, function() {
    var phizFactory = {
        "):": { "position": "0px 0px" },
        ":D": { "position": "0px -32px" },
        ";)": { "position": "0px -64px" },
        ":-o": { "position": "0px -96px" },
        ":p": { "position": "0px -128px" },
        "(H)": { "position": "0px -160px" },
        ":@": { "position": "0px -192px" },
        ":s": { "position": "0px -224px" },
        ":$": { "position": "0px -256px" },
        ":(": { "position": "0px -288px" },
        ":'(": { "position": "0px -320px" },
        ":|": { "position": "0px -352px" },
        "(a)": { "position": "0px -384px" },
        "8o|": { "position": "0px -416px" },
        "8-|": { "position": "0px -448px" },
        "+o(": { "position": "0px -480px" },
        "<o)": { "position": "0px -512px" },
        "|-)": { "position": "0px -544px" },
        "*-)": { "position": "0px -576px" },
        ":-#": { "position": "0px -608px" },
        ":-*": { "position": "0px -640px" },
        "^o)": { "position": "0px -672px" },
        "8-)": { "position": "0px -704px" },
        "(|)": { "position": "0px -736px" },
        "(u)": { "position": "0px -768px" },
        "(S)": { "position": "0px -800px" },
        "(*)": { "position": "0px -832px" },
        "(#)": { "position": "0px -864px" },
        "(R)": { "position": "0px -896px" },
        "({)": { "position": "0px -928px" },
        "(})": { "position": "0px -960px" },
        "(k)": { "position": "0px -992px" },
        "(F)": { "position": "0px -1024px" },
        "(W)": { "position": "0px -1056px" },
        "(D)": { "position": "0px -1088px" }
    };

    var codeReg;

    var configs = {
        url: "./images/phiz.png",
        size: 24
    };

    var setupCodeReg = function() {
        var codeList = [];
        for (var key in phizFactory) {
            var code = key;
            key = key.replace(/\(|\)|\+|\<|\>|\*/g, function(k) {
                return "\\" + k;
            });
            codeList.push(key);
        }
        codeReg = codeList.join("|");
        codeReg = new RegExp(codeReg, "g");
    };

    var addBaseCss = function() {
        var baseCss = ".rong-phiz-content { display: inline-block; overflow: hidden; font-size: 20px !important; text-align: center; vertical-align: middle; overflow: hidden; }";
        var style = document.createElement("style");
        style.setAttribute("type", "text/css");
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
        if (style.styleSheet) {
            style.styleSheet.cssText = baseCss;
        } else {
            head = document.createTextNode(baseCss);
            style.appendChild(head);
        }
    };

    var createEmojiDom = function(item, sizePx) {
        var position = computeBgPosition(item.position, sizePx);
        if (document.all && !document.addEventListener) {
            position = item.position;
        }
        var emojiObj = {
            size: sizePx || configs.size,
            position: position,
            background: configs.url,
            name: item.code,
            tag: item.code
        };
        return getEmojiShadowDom(emojiObj);
    };

    var getEmojiShadowDom = function(object) {
        var style = "width: {{size}}px; height: {{size}}px; line-height: {{size}}px; background-image: url({{background}}); background-position: {{position}}; background-size: {{size}}px auto;";
        var spanTpl = "<span class='rong-phiz-content' name='[{{name}}]' style='{{style}}''></span>"
        spanTpl = spanTpl.replace(/{{style}}/g, style);
        var ret = spanTpl.replace(/\\?\{\{([^}]+)\}\}/g, function(match, name) {
            return object[name];
        });
        return ret;
    };

    var computeBgPosition = function(pos, sizePx) {
        var size = sizePx || configs.size;
        var scale = size / 32;
        var position = pos.split(" ");
        var x = position[0], y = position[1];
        x = x ? x.split("px")[0] : 0;
        y = y ? y.split("px")[0] : 0;
        return parseInt(x) * scale + "px " + parseInt(y) * scale + "px";
    };

    var phizToHtml = function(string, sizePx) {
        var bracketsRegExp = /\[([^\[\]]+?)\]/g;
        return string.replace(bracketsRegExp, function(code) {
            code = code.substring(1, code.length - 1);
            if (code === ":&#39;(") {
                code = ":'(";
            }
            if (code === "&lt;o)") {
                code = "<o)";
            }
            var data = phizFactory[code];
            if (data && data.position) {
                var position = data["position"]
                var item = {
                    position: position,
                    code: code
                };
                return createEmojiDom(item, sizePx);
            }
            return code;
        });
    };

    (function() {
        addBaseCss();
        setupCodeReg();
    })();

    return {
        phizToHtml: phizToHtml
    };

});