/*
    支持范围
    IE6+, Chrome, Safari, Firefox, Android, IOS
 */
(function(global, factory) {
    'use strict';
    if (typeof exports === 'object' && typeof module !== undefined) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.RongIMLib = window.RongIMLib || {};
        window.RongIMLib.RongIMEmoji = factory();
    }
})(window, function() {
    var _export = {};
    // emoji 默认大小
    var DefaultSize = 24;
    // 默认语言, 暂时仅支持 zh, en
    var DefaultLang = 'zh';
    // 支持的语言
    var SupportLangs = ['zh', 'en'];
    // 24px 的 emoji 图片地址
    var NornalImagePath = '//cdn.ronghub.com/emojis-normal.png';
    // 48px(高清图) 的 emoji 图片地址
    var HdImagePath = '//cdn.ronghub.com/emojis-hd.png';
    // emoji 的 unicode 正则匹配
    var UnicodeReg = /\uf469\u200d\u2764\ufe0f\u200d\uf48b\u200d\uf468|\uf468\u200d\u2764\ufe0f\u200d\uf48b\u200d\uf468|\uf469\u200d\u2764\ufe0f\u200d\uf48b\u200d\uf469|\uf468\u200d\uf469\u200d\uf467\u200d\uf466|\uf468\u200d\uf469\u200d\uf466\u200d\uf466|\uf468\u200d\uf469\u200d\uf467\u200d\uf467|\uf468\u200d\uf468\u200d\uf467\u200d\uf466|\uf468\u200d\uf468\u200d\uf466\u200d\uf466|\uf468\u200d\uf468\u200d\uf467\u200d\uf467|\uf469\u200d\uf469\u200d\uf467\u200d\uf466|\uf469\u200d\uf469\u200d\uf466\u200d\uf466|\uf469\u200d\uf469\u200d\uf467\u200d\uf467|\uf3f4\ue0067\ue0062\ue0065\ue006e\ue0067\ue007f|\uf3f4\ue0067\ue0062\ue0073\ue0063\ue0074\ue007f|\uf3f4\ue0067\ue0062\ue0077\ue006c\ue0073\ue007f|\uf469\u200d\u2764\ufe0f\u200d\uf468|\uf468\u200d\u2764\ufe0f\u200d\uf468|\uf469\u200d\u2764\ufe0f\u200d\uf469|\uf468\uf3fb\u200d\u2695\ufe0f|\uf468\uf3fc\u200d\u2695\ufe0f|\uf468\uf3fd\u200d\u2695\ufe0f|\uf468\uf3fe\u200d\u2695\ufe0f|\uf468\uf3ff\u200d\u2695\ufe0f|\uf469\uf3fb\u200d\u2695\ufe0f|\uf469\uf3fc\u200d\u2695\ufe0f|\uf469\uf3fd\u200d\u2695\ufe0f|\uf469\uf3fe\u200d\u2695\ufe0f|\uf469\uf3ff\u200d\u2695\ufe0f|\uf468\uf3fb\u200d\u2696\ufe0f|\uf468\uf3fc\u200d\u2696\ufe0f|\uf468\uf3fd\u200d\u2696\ufe0f|\uf468\uf3fe\u200d\u2696\ufe0f|\uf468\uf3ff\u200d\u2696\ufe0f|\uf469\uf3fb\u200d\u2696\ufe0f|\uf469\uf3fc\u200d\u2696\ufe0f|\uf469\uf3fd\u200d\u2696\ufe0f|\uf469\uf3fe\u200d\u2696\ufe0f|\uf469\uf3ff\u200d\u2696\ufe0f|\uf468\uf3fb\u200d\u2708\ufe0f|\uf468\uf3fc\u200d\u2708\ufe0f|\uf468\uf3fd\u200d\u2708\ufe0f|\uf468\uf3fe\u200d\u2708\ufe0f|\uf468\uf3ff\u200d\u2708\ufe0f|\uf469\uf3fb\u200d\u2708\ufe0f|\uf469\uf3fc\u200d\u2708\ufe0f|\uf469\uf3fd\u200d\u2708\ufe0f|\uf469\uf3fe\u200d\u2708\ufe0f|\uf469\uf3ff\u200d\u2708\ufe0f|\uf46e\uf3fb\u200d\u2642\ufe0f|\uf46e\uf3fc\u200d\u2642\ufe0f|\uf46e\uf3fd\u200d\u2642\ufe0f|\uf46e\uf3fe\u200d\u2642\ufe0f|\uf46e\uf3ff\u200d\u2642\ufe0f|\uf46e\uf3fb\u200d\u2640\ufe0f|\uf46e\uf3fc\u200d\u2640\ufe0f|\uf46e\uf3fd\u200d\u2640\ufe0f|\uf46e\uf3fe\u200d\u2640\ufe0f|\uf46e\uf3ff\u200d\u2640\ufe0f|\uf575\ufe0f\u200d\u2642\ufe0f|\uf575\uf3fb\u200d\u2642\ufe0f|\uf575\uf3fc\u200d\u2642\ufe0f|\uf575\uf3fd\u200d\u2642\ufe0f|\uf575\uf3fe\u200d\u2642\ufe0f|\uf575\uf3ff\u200d\u2642\ufe0f|\uf575\ufe0f\u200d\u2640\ufe0f|\uf575\uf3fb\u200d\u2640\ufe0f|\uf575\uf3fc\u200d\u2640\ufe0f|\uf575\uf3fd\u200d\u2640\ufe0f|\uf575\uf3fe\u200d\u2640\ufe0f|\uf575\uf3ff\u200d\u2640\ufe0f|\uf482\uf3fb\u200d\u2642\ufe0f|\uf482\uf3fc\u200d\u2642\ufe0f|\uf482\uf3fd\u200d\u2642\ufe0f|\uf482\uf3fe\u200d\u2642\ufe0f|\uf482\uf3ff\u200d\u2642\ufe0f|\uf482\uf3fb\u200d\u2640\ufe0f|\uf482\uf3fc\u200d\u2640\ufe0f|\uf482\uf3fd\u200d\u2640\ufe0f|\uf482\uf3fe\u200d\u2640\ufe0f|\uf482\uf3ff\u200d\u2640\ufe0f|\uf477\uf3fb\u200d\u2642\ufe0f|\uf477\uf3fc\u200d\u2642\ufe0f|\uf477\uf3fd\u200d\u2642\ufe0f|\uf477\uf3fe\u200d\u2642\ufe0f|\uf477\uf3ff\u200d\u2642\ufe0f|\uf477\uf3fb\u200d\u2640\ufe0f|\uf477\uf3fc\u200d\u2640\ufe0f|\uf477\uf3fd\u200d\u2640\ufe0f|\uf477\uf3fe\u200d\u2640\ufe0f|\uf477\uf3ff\u200d\u2640\ufe0f|\uf473\uf3fb\u200d\u2642\ufe0f|\uf473\uf3fc\u200d\u2642\ufe0f|\uf473\uf3fd\u200d\u2642\ufe0f|\uf473\uf3fe\u200d\u2642\ufe0f|\uf473\uf3ff\u200d\u2642\ufe0f|\uf473\uf3fb\u200d\u2640\ufe0f|\uf473\uf3fc\u200d\u2640\ufe0f|\uf473\uf3fd\u200d\u2640\ufe0f|\uf473\uf3fe\u200d\u2640\ufe0f|\uf473\uf3ff\u200d\u2640\ufe0f|\uf471\uf3fb\u200d\u2642\ufe0f|\uf471\uf3fc\u200d\u2642\ufe0f|\uf471\uf3fd\u200d\u2642\ufe0f|\uf471\uf3fe\u200d\u2642\ufe0f|\uf471\uf3ff\u200d\u2642\ufe0f|\uf471\uf3fb\u200d\u2640\ufe0f|\uf471\uf3fc\u200d\u2640\ufe0f|\uf471\uf3fd\u200d\u2640\ufe0f|\uf471\uf3fe\u200d\u2640\ufe0f|\uf471\uf3ff\u200d\u2640\ufe0f|\uf9d9\uf3fb\u200d\u2640\ufe0f|\uf9d9\uf3fc\u200d\u2640\ufe0f|\uf9d9\uf3fd\u200d\u2640\ufe0f|\uf9d9\uf3fe\u200d\u2640\ufe0f|\uf9d9\uf3ff\u200d\u2640\ufe0f|\uf9d9\uf3fb\u200d\u2642\ufe0f|\uf9d9\uf3fc\u200d\u2642\ufe0f|\uf9d9\uf3fd\u200d\u2642\ufe0f|\uf9d9\uf3fe\u200d\u2642\ufe0f|\uf9d9\uf3ff\u200d\u2642\ufe0f|\uf9da\uf3fb\u200d\u2640\ufe0f|\uf9da\uf3fc\u200d\u2640\ufe0f|\uf9da\uf3fd\u200d\u2640\ufe0f|\uf9da\uf3fe\u200d\u2640\ufe0f|\uf9da\uf3ff\u200d\u2640\ufe0f|\uf9da\uf3fb\u200d\u2642\ufe0f|\uf9da\uf3fc\u200d\u2642\ufe0f|\uf9da\uf3fd\u200d\u2642\ufe0f|\uf9da\uf3fe\u200d\u2642\ufe0f|\uf9da\uf3ff\u200d\u2642\ufe0f|\uf9db\uf3fb\u200d\u2640\ufe0f|\uf9db\uf3fc\u200d\u2640\ufe0f|\uf9db\uf3fd\u200d\u2640\ufe0f|\uf9db\uf3fe\u200d\u2640\ufe0f|\uf9db\uf3ff\u200d\u2640\ufe0f|\uf9db\uf3fb\u200d\u2642\ufe0f|\uf9db\uf3fc\u200d\u2642\ufe0f|\uf9db\uf3fd\u200d\u2642\ufe0f|\uf9db\uf3fe\u200d\u2642\ufe0f|\uf9db\uf3ff\u200d\u2642\ufe0f|\uf9dc\uf3fb\u200d\u2640\ufe0f|\uf9dc\uf3fc\u200d\u2640\ufe0f|\uf9dc\uf3fd\u200d\u2640\ufe0f|\uf9dc\uf3fe\u200d\u2640\ufe0f|\uf9dc\uf3ff\u200d\u2640\ufe0f|\uf9dc\uf3fb\u200d\u2642\ufe0f|\uf9dc\uf3fc\u200d\u2642\ufe0f|\uf9dc\uf3fd\u200d\u2642\ufe0f|\uf9dc\uf3fe\u200d\u2642\ufe0f|\uf9dc\uf3ff\u200d\u2642\ufe0f|\uf9dd\uf3fb\u200d\u2640\ufe0f|\uf9dd\uf3fc\u200d\u2640\ufe0f|\uf9dd\uf3fd\u200d\u2640\ufe0f|\uf9dd\uf3fe\u200d\u2640\ufe0f|\uf9dd\uf3ff\u200d\u2640\ufe0f|\uf9dd\uf3fb\u200d\u2642\ufe0f|\uf9dd\uf3fc\u200d\u2642\ufe0f|\uf9dd\uf3fd\u200d\u2642\ufe0f|\uf9dd\uf3fe\u200d\u2642\ufe0f|\uf9dd\uf3ff\u200d\u2642\ufe0f|\uf64d\uf3fb\u200d\u2642\ufe0f|\uf64d\uf3fc\u200d\u2642\ufe0f|\uf64d\uf3fd\u200d\u2642\ufe0f|\uf64d\uf3fe\u200d\u2642\ufe0f|\uf64d\uf3ff\u200d\u2642\ufe0f|\uf64d\uf3fb\u200d\u2640\ufe0f|\uf64d\uf3fc\u200d\u2640\ufe0f|\uf64d\uf3fd\u200d\u2640\ufe0f|\uf64d\uf3fe\u200d\u2640\ufe0f|\uf64d\uf3ff\u200d\u2640\ufe0f|\uf64e\uf3fb\u200d\u2642\ufe0f|\uf64e\uf3fc\u200d\u2642\ufe0f|\uf64e\uf3fd\u200d\u2642\ufe0f|\uf64e\uf3fe\u200d\u2642\ufe0f|\uf64e\uf3ff\u200d\u2642\ufe0f|\uf64e\uf3fb\u200d\u2640\ufe0f|\uf64e\uf3fc\u200d\u2640\ufe0f|\uf64e\uf3fd\u200d\u2640\ufe0f|\uf64e\uf3fe\u200d\u2640\ufe0f|\uf64e\uf3ff\u200d\u2640\ufe0f|\uf645\uf3fb\u200d\u2642\ufe0f|\uf645\uf3fc\u200d\u2642\ufe0f|\uf645\uf3fd\u200d\u2642\ufe0f|\uf645\uf3fe\u200d\u2642\ufe0f|\uf645\uf3ff\u200d\u2642\ufe0f|\uf645\uf3fb\u200d\u2640\ufe0f|\uf645\uf3fc\u200d\u2640\ufe0f|\uf645\uf3fd\u200d\u2640\ufe0f|\uf645\uf3fe\u200d\u2640\ufe0f|\uf645\uf3ff\u200d\u2640\ufe0f|\uf646\uf3fb\u200d\u2642\ufe0f|\uf646\uf3fc\u200d\u2642\ufe0f|\uf646\uf3fd\u200d\u2642\ufe0f|\uf646\uf3fe\u200d\u2642\ufe0f|\uf646\uf3ff\u200d\u2642\ufe0f|\uf646\uf3fb\u200d\u2640\ufe0f|\uf646\uf3fc\u200d\u2640\ufe0f|\uf646\uf3fd\u200d\u2640\ufe0f|\uf646\uf3fe\u200d\u2640\ufe0f|\uf646\uf3ff\u200d\u2640\ufe0f|\uf481\uf3fb\u200d\u2642\ufe0f|\uf481\uf3fc\u200d\u2642\ufe0f|\uf481\uf3fd\u200d\u2642\ufe0f|\uf481\uf3fe\u200d\u2642\ufe0f|\uf481\uf3ff\u200d\u2642\ufe0f|\uf481\uf3fb\u200d\u2640\ufe0f|\uf481\uf3fc\u200d\u2640\ufe0f|\uf481\uf3fd\u200d\u2640\ufe0f|\uf481\uf3fe\u200d\u2640\ufe0f|\uf481\uf3ff\u200d\u2640\ufe0f|\uf64b\uf3fb\u200d\u2642\ufe0f|\uf64b\uf3fc\u200d\u2642\ufe0f|\uf64b\uf3fd\u200d\u2642\ufe0f|\uf64b\uf3fe\u200d\u2642\ufe0f|\uf64b\uf3ff\u200d\u2642\ufe0f|\uf64b\uf3fb\u200d\u2640\ufe0f|\uf64b\uf3fc\u200d\u2640\ufe0f|\uf64b\uf3fd\u200d\u2640\ufe0f|\uf64b\uf3fe\u200d\u2640\ufe0f|\uf64b\uf3ff\u200d\u2640\ufe0f|\uf647\uf3fb\u200d\u2642\ufe0f|\uf647\uf3fc\u200d\u2642\ufe0f|\uf647\uf3fd\u200d\u2642\ufe0f|\uf647\uf3fe\u200d\u2642\ufe0f|\uf647\uf3ff\u200d\u2642\ufe0f|\uf647\uf3fb\u200d\u2640\ufe0f|\uf647\uf3fc\u200d\u2640\ufe0f|\uf647\uf3fd\u200d\u2640\ufe0f|\uf647\uf3fe\u200d\u2640\ufe0f|\uf647\uf3ff\u200d\u2640\ufe0f|\uf926\uf3fb\u200d\u2642\ufe0f|\uf926\uf3fc\u200d\u2642\ufe0f|\uf926\uf3fd\u200d\u2642\ufe0f|\uf926\uf3fe\u200d\u2642\ufe0f|\uf926\uf3ff\u200d\u2642\ufe0f|\uf926\uf3fb\u200d\u2640\ufe0f|\uf926\uf3fc\u200d\u2640\ufe0f|\uf926\uf3fd\u200d\u2640\ufe0f|\uf926\uf3fe\u200d\u2640\ufe0f|\uf926\uf3ff\u200d\u2640\ufe0f|\uf937\uf3fb\u200d\u2642\ufe0f|\uf937\uf3fc\u200d\u2642\ufe0f|\uf937\uf3fd\u200d\u2642\ufe0f|\uf937\uf3fe\u200d\u2642\ufe0f|\uf937\uf3ff\u200d\u2642\ufe0f|\uf937\uf3fb\u200d\u2640\ufe0f|\uf937\uf3fc\u200d\u2640\ufe0f|\uf937\uf3fd\u200d\u2640\ufe0f|\uf937\uf3fe\u200d\u2640\ufe0f|\uf937\uf3ff\u200d\u2640\ufe0f|\uf486\uf3fb\u200d\u2642\ufe0f|\uf486\uf3fc\u200d\u2642\ufe0f|\uf486\uf3fd\u200d\u2642\ufe0f|\uf486\uf3fe\u200d\u2642\ufe0f|\uf486\uf3ff\u200d\u2642\ufe0f|\uf486\uf3fb\u200d\u2640\ufe0f|\uf486\uf3fc\u200d\u2640\ufe0f|\uf486\uf3fd\u200d\u2640\ufe0f|\uf486\uf3fe\u200d\u2640\ufe0f|\uf486\uf3ff\u200d\u2640\ufe0f|\uf487\uf3fb\u200d\u2642\ufe0f|\uf487\uf3fc\u200d\u2642\ufe0f|\uf487\uf3fd\u200d\u2642\ufe0f|\uf487\uf3fe\u200d\u2642\ufe0f|\uf487\uf3ff\u200d\u2642\ufe0f|\uf487\uf3fb\u200d\u2640\ufe0f|\uf487\uf3fc\u200d\u2640\ufe0f|\uf487\uf3fd\u200d\u2640\ufe0f|\uf487\uf3fe\u200d\u2640\ufe0f|\uf487\uf3ff\u200d\u2640\ufe0f|\uf6b6\uf3fb\u200d\u2642\ufe0f|\uf6b6\uf3fc\u200d\u2642\ufe0f|\uf6b6\uf3fd\u200d\u2642\ufe0f|\uf6b6\uf3fe\u200d\u2642\ufe0f|\uf6b6\uf3ff\u200d\u2642\ufe0f|\uf6b6\uf3fb\u200d\u2640\ufe0f|\uf6b6\uf3fc\u200d\u2640\ufe0f|\uf6b6\uf3fd\u200d\u2640\ufe0f|\uf6b6\uf3fe\u200d\u2640\ufe0f|\uf6b6\uf3ff\u200d\u2640\ufe0f|\uf3c3\uf3fb\u200d\u2642\ufe0f|\uf3c3\uf3fc\u200d\u2642\ufe0f|\uf3c3\uf3fd\u200d\u2642\ufe0f|\uf3c3\uf3fe\u200d\u2642\ufe0f|\uf3c3\uf3ff\u200d\u2642\ufe0f|\uf3c3\uf3fb\u200d\u2640\ufe0f|\uf3c3\uf3fc\u200d\u2640\ufe0f|\uf3c3\uf3fd\u200d\u2640\ufe0f|\uf3c3\uf3fe\u200d\u2640\ufe0f|\uf3c3\uf3ff\u200d\u2640\ufe0f|\uf9d6\uf3fb\u200d\u2640\ufe0f|\uf9d6\uf3fc\u200d\u2640\ufe0f|\uf9d6\uf3fd\u200d\u2640\ufe0f|\uf9d6\uf3fe\u200d\u2640\ufe0f|\uf9d6\uf3ff\u200d\u2640\ufe0f|\uf9d6\uf3fb\u200d\u2642\ufe0f|\uf9d6\uf3fc\u200d\u2642\ufe0f|\uf9d6\uf3fd\u200d\u2642\ufe0f|\uf9d6\uf3fe\u200d\u2642\ufe0f|\uf9d6\uf3ff\u200d\u2642\ufe0f|\uf9d7\uf3fb\u200d\u2640\ufe0f|\uf9d7\uf3fc\u200d\u2640\ufe0f|\uf9d7\uf3fd\u200d\u2640\ufe0f|\uf9d7\uf3fe\u200d\u2640\ufe0f|\uf9d7\uf3ff\u200d\u2640\ufe0f|\uf9d7\uf3fb\u200d\u2642\ufe0f|\uf9d7\uf3fc\u200d\u2642\ufe0f|\uf9d7\uf3fd\u200d\u2642\ufe0f|\uf9d7\uf3fe\u200d\u2642\ufe0f|\uf9d7\uf3ff\u200d\u2642\ufe0f|\uf9d8\uf3fb\u200d\u2640\ufe0f|\uf9d8\uf3fc\u200d\u2640\ufe0f|\uf9d8\uf3fd\u200d\u2640\ufe0f|\uf9d8\uf3fe\u200d\u2640\ufe0f|\uf9d8\uf3ff\u200d\u2640\ufe0f|\uf9d8\uf3fb\u200d\u2642\ufe0f|\uf9d8\uf3fc\u200d\u2642\ufe0f|\uf9d8\uf3fd\u200d\u2642\ufe0f|\uf9d8\uf3fe\u200d\u2642\ufe0f|\uf9d8\uf3ff\u200d\u2642\ufe0f|\uf3cc\ufe0f\u200d\u2642\ufe0f|\uf3cc\uf3fb\u200d\u2642\ufe0f|\uf3cc\uf3fc\u200d\u2642\ufe0f|\uf3cc\uf3fd\u200d\u2642\ufe0f|\uf3cc\uf3fe\u200d\u2642\ufe0f|\uf3cc\uf3ff\u200d\u2642\ufe0f|\uf3cc\ufe0f\u200d\u2640\ufe0f|\uf3cc\uf3fb\u200d\u2640\ufe0f|\uf3cc\uf3fc\u200d\u2640\ufe0f|\uf3cc\uf3fd\u200d\u2640\ufe0f|\uf3cc\uf3fe\u200d\u2640\ufe0f|\uf3cc\uf3ff\u200d\u2640\ufe0f|\uf3c4\uf3fb\u200d\u2642\ufe0f|\uf3c4\uf3fc\u200d\u2642\ufe0f|\uf3c4\uf3fd\u200d\u2642\ufe0f|\uf3c4\uf3fe\u200d\u2642\ufe0f|\uf3c4\uf3ff\u200d\u2642\ufe0f|\uf3c4\uf3fb\u200d\u2640\ufe0f|\uf3c4\uf3fc\u200d\u2640\ufe0f|\uf3c4\uf3fd\u200d\u2640\ufe0f|\uf3c4\uf3fe\u200d\u2640\ufe0f|\uf3c4\uf3ff\u200d\u2640\ufe0f|\uf6a3\uf3fb\u200d\u2642\ufe0f|\uf6a3\uf3fc\u200d\u2642\ufe0f|\uf6a3\uf3fd\u200d\u2642\ufe0f|\uf6a3\uf3fe\u200d\u2642\ufe0f|\uf6a3\uf3ff\u200d\u2642\ufe0f|\uf6a3\uf3fb\u200d\u2640\ufe0f|\uf6a3\uf3fc\u200d\u2640\ufe0f|\uf6a3\uf3fd\u200d\u2640\ufe0f|\uf6a3\uf3fe\u200d\u2640\ufe0f|\uf6a3\uf3ff\u200d\u2640\ufe0f|\uf3ca\uf3fb\u200d\u2642\ufe0f|\uf3ca\uf3fc\u200d\u2642\ufe0f|\uf3ca\uf3fd\u200d\u2642\ufe0f|\uf3ca\uf3fe\u200d\u2642\ufe0f|\uf3ca\uf3ff\u200d\u2642\ufe0f|\uf3ca\uf3fb\u200d\u2640\ufe0f|\uf3ca\uf3fc\u200d\u2640\ufe0f|\uf3ca\uf3fd\u200d\u2640\ufe0f|\uf3ca\uf3fe\u200d\u2640\ufe0f|\uf3ca\uf3ff\u200d\u2640\ufe0f|\u26f9\ufe0f\u200d\u2642\ufe0f|\u26f9\uf3fb\u200d\u2642\ufe0f|\u26f9\uf3fc\u200d\u2642\ufe0f|\u26f9\uf3fd\u200d\u2642\ufe0f|\u26f9\uf3fe\u200d\u2642\ufe0f|\u26f9\uf3ff\u200d\u2642\ufe0f|\u26f9\ufe0f\u200d\u2640\ufe0f|\u26f9\uf3fb\u200d\u2640\ufe0f|\u26f9\uf3fc\u200d\u2640\ufe0f|\u26f9\uf3fd\u200d\u2640\ufe0f|\u26f9\uf3fe\u200d\u2640\ufe0f|\u26f9\uf3ff\u200d\u2640\ufe0f|\uf3cb\ufe0f\u200d\u2642\ufe0f|\uf3cb\uf3fb\u200d\u2642\ufe0f|\uf3cb\uf3fc\u200d\u2642\ufe0f|\uf3cb\uf3fd\u200d\u2642\ufe0f|\uf3cb\uf3fe\u200d\u2642\ufe0f|\uf3cb\uf3ff\u200d\u2642\ufe0f|\uf3cb\ufe0f\u200d\u2640\ufe0f|\uf3cb\uf3fb\u200d\u2640\ufe0f|\uf3cb\uf3fc\u200d\u2640\ufe0f|\uf3cb\uf3fd\u200d\u2640\ufe0f|\uf3cb\uf3fe\u200d\u2640\ufe0f|\uf3cb\uf3ff\u200d\u2640\ufe0f|\uf6b4\uf3fb\u200d\u2642\ufe0f|\uf6b4\uf3fc\u200d\u2642\ufe0f|\uf6b4\uf3fd\u200d\u2642\ufe0f|\uf6b4\uf3fe\u200d\u2642\ufe0f|\uf6b4\uf3ff\u200d\u2642\ufe0f|\uf6b4\uf3fb\u200d\u2640\ufe0f|\uf6b4\uf3fc\u200d\u2640\ufe0f|\uf6b4\uf3fd\u200d\u2640\ufe0f|\uf6b4\uf3fe\u200d\u2640\ufe0f|\uf6b4\uf3ff\u200d\u2640\ufe0f|\uf6b5\uf3fb\u200d\u2642\ufe0f|\uf6b5\uf3fc\u200d\u2642\ufe0f|\uf6b5\uf3fd\u200d\u2642\ufe0f|\uf6b5\uf3fe\u200d\u2642\ufe0f|\uf6b5\uf3ff\u200d\u2642\ufe0f|\uf6b5\uf3fb\u200d\u2640\ufe0f|\uf6b5\uf3fc\u200d\u2640\ufe0f|\uf6b5\uf3fd\u200d\u2640\ufe0f|\uf6b5\uf3fe\u200d\u2640\ufe0f|\uf6b5\uf3ff\u200d\u2640\ufe0f|\uf938\uf3fb\u200d\u2642\ufe0f|\uf938\uf3fc\u200d\u2642\ufe0f|\uf938\uf3fd\u200d\u2642\ufe0f|\uf938\uf3fe\u200d\u2642\ufe0f|\uf938\uf3ff\u200d\u2642\ufe0f|\uf938\uf3fb\u200d\u2640\ufe0f|\uf938\uf3fc\u200d\u2640\ufe0f|\uf938\uf3fd\u200d\u2640\ufe0f|\uf938\uf3fe\u200d\u2640\ufe0f|\uf938\uf3ff\u200d\u2640\ufe0f|\uf93d\uf3fb\u200d\u2642\ufe0f|\uf93d\uf3fc\u200d\u2642\ufe0f|\uf93d\uf3fd\u200d\u2642\ufe0f|\uf93d\uf3fe\u200d\u2642\ufe0f|\uf93d\uf3ff\u200d\u2642\ufe0f|\uf93d\uf3fb\u200d\u2640\ufe0f|\uf93d\uf3fc\u200d\u2640\ufe0f|\uf93d\uf3fd\u200d\u2640\ufe0f|\uf93d\uf3fe\u200d\u2640\ufe0f|\uf93d\uf3ff\u200d\u2640\ufe0f|\uf93e\uf3fb\u200d\u2642\ufe0f|\uf93e\uf3fc\u200d\u2642\ufe0f|\uf93e\uf3fd\u200d\u2642\ufe0f|\uf93e\uf3fe\u200d\u2642\ufe0f|\uf93e\uf3ff\u200d\u2642\ufe0f|\uf93e\uf3fb\u200d\u2640\ufe0f|\uf93e\uf3fc\u200d\u2640\ufe0f|\uf93e\uf3fd\u200d\u2640\ufe0f|\uf93e\uf3fe\u200d\u2640\ufe0f|\uf93e\uf3ff\u200d\u2640\ufe0f|\uf939\uf3fb\u200d\u2642\ufe0f|\uf939\uf3fc\u200d\u2642\ufe0f|\uf939\uf3fd\u200d\u2642\ufe0f|\uf939\uf3fe\u200d\u2642\ufe0f|\uf939\uf3ff\u200d\u2642\ufe0f|\uf939\uf3fb\u200d\u2640\ufe0f|\uf939\uf3fc\u200d\u2640\ufe0f|\uf939\uf3fd\u200d\u2640\ufe0f|\uf939\uf3fe\u200d\u2640\ufe0f|\uf939\uf3ff\u200d\u2640\ufe0f|\uf468\u200d\uf469\u200d\uf466|\uf468\u200d\uf469\u200d\uf467|\uf468\u200d\uf468\u200d\uf466|\uf468\u200d\uf468\u200d\uf467|\uf469\u200d\uf469\u200d\uf466|\uf469\u200d\uf469\u200d\uf467|\uf468\u200d\uf466\u200d\uf466|\uf468\u200d\uf467\u200d\uf466|\uf468\u200d\uf467\u200d\uf467|\uf469\u200d\uf466\u200d\uf466|\uf469\u200d\uf467\u200d\uf466|\uf469\u200d\uf467\u200d\uf467|\uf441\ufe0f\u200d\uf5e8\ufe0f|\uf468\u200d\u2695\ufe0f|\uf469\u200d\u2695\ufe0f|\uf468\uf3fb\u200d\uf393|\uf468\uf3fc\u200d\uf393|\uf468\uf3fd\u200d\uf393|\uf468\uf3fe\u200d\uf393|\uf468\uf3ff\u200d\uf393|\uf469\uf3fb\u200d\uf393|\uf469\uf3fc\u200d\uf393|\uf469\uf3fd\u200d\uf393|\uf469\uf3fe\u200d\uf393|\uf469\uf3ff\u200d\uf393|\uf468\uf3fb\u200d\uf3eb|\uf468\uf3fc\u200d\uf3eb|\uf468\uf3fd\u200d\uf3eb|\uf468\uf3fe\u200d\uf3eb|\uf468\uf3ff\u200d\uf3eb|\uf469\uf3fb\u200d\uf3eb|\uf469\uf3fc\u200d\uf3eb|\uf469\uf3fd\u200d\uf3eb|\uf469\uf3fe\u200d\uf3eb|\uf469\uf3ff\u200d\uf3eb|\uf468\u200d\u2696\ufe0f|\uf469\u200d\u2696\ufe0f|\uf468\uf3fb\u200d\uf33e|\uf468\uf3fc\u200d\uf33e|\uf468\uf3fd\u200d\uf33e|\uf468\uf3fe\u200d\uf33e|\uf468\uf3ff\u200d\uf33e|\uf469\uf3fb\u200d\uf33e|\uf469\uf3fc\u200d\uf33e|\uf469\uf3fd\u200d\uf33e|\uf469\uf3fe\u200d\uf33e|\uf469\uf3ff\u200d\uf33e|\uf468\uf3fb\u200d\uf373|\uf468\uf3fc\u200d\uf373|\uf468\uf3fd\u200d\uf373|\uf468\uf3fe\u200d\uf373|\uf468\uf3ff\u200d\uf373|\uf469\uf3fb\u200d\uf373|\uf469\uf3fc\u200d\uf373|\uf469\uf3fd\u200d\uf373|\uf469\uf3fe\u200d\uf373|\uf469\uf3ff\u200d\uf373|\uf468\uf3fb\u200d\uf527|\uf468\uf3fc\u200d\uf527|\uf468\uf3fd\u200d\uf527|\uf468\uf3fe\u200d\uf527|\uf468\uf3ff\u200d\uf527|\uf469\uf3fb\u200d\uf527|\uf469\uf3fc\u200d\uf527|\uf469\uf3fd\u200d\uf527|\uf469\uf3fe\u200d\uf527|\uf469\uf3ff\u200d\uf527|\uf468\uf3fb\u200d\uf3ed|\uf468\uf3fc\u200d\uf3ed|\uf468\uf3fd\u200d\uf3ed|\uf468\uf3fe\u200d\uf3ed|\uf468\uf3ff\u200d\uf3ed|\uf469\uf3fb\u200d\uf3ed|\uf469\uf3fc\u200d\uf3ed|\uf469\uf3fd\u200d\uf3ed|\uf469\uf3fe\u200d\uf3ed|\uf469\uf3ff\u200d\uf3ed|\uf468\uf3fb\u200d\uf4bc|\uf468\uf3fc\u200d\uf4bc|\uf468\uf3fd\u200d\uf4bc|\uf468\uf3fe\u200d\uf4bc|\uf468\uf3ff\u200d\uf4bc|\uf469\uf3fb\u200d\uf4bc|\uf469\uf3fc\u200d\uf4bc|\uf469\uf3fd\u200d\uf4bc|\uf469\uf3fe\u200d\uf4bc|\uf469\uf3ff\u200d\uf4bc|\uf468\uf3fb\u200d\uf52c|\uf468\uf3fc\u200d\uf52c|\uf468\uf3fd\u200d\uf52c|\uf468\uf3fe\u200d\uf52c|\uf468\uf3ff\u200d\uf52c|\uf469\uf3fb\u200d\uf52c|\uf469\uf3fc\u200d\uf52c|\uf469\uf3fd\u200d\uf52c|\uf469\uf3fe\u200d\uf52c|\uf469\uf3ff\u200d\uf52c|\uf468\uf3fb\u200d\uf4bb|\uf468\uf3fc\u200d\uf4bb|\uf468\uf3fd\u200d\uf4bb|\uf468\uf3fe\u200d\uf4bb|\uf468\uf3ff\u200d\uf4bb|\uf469\uf3fb\u200d\uf4bb|\uf469\uf3fc\u200d\uf4bb|\uf469\uf3fd\u200d\uf4bb|\uf469\uf3fe\u200d\uf4bb|\uf469\uf3ff\u200d\uf4bb|\uf468\uf3fb\u200d\uf3a4|\uf468\uf3fc\u200d\uf3a4|\uf468\uf3fd\u200d\uf3a4|\uf468\uf3fe\u200d\uf3a4|\uf468\uf3ff\u200d\uf3a4|\uf469\uf3fb\u200d\uf3a4|\uf469\uf3fc\u200d\uf3a4|\uf469\uf3fd\u200d\uf3a4|\uf469\uf3fe\u200d\uf3a4|\uf469\uf3ff\u200d\uf3a4|\uf468\uf3fb\u200d\uf3a8|\uf468\uf3fc\u200d\uf3a8|\uf468\uf3fd\u200d\uf3a8|\uf468\uf3fe\u200d\uf3a8|\uf468\uf3ff\u200d\uf3a8|\uf469\uf3fb\u200d\uf3a8|\uf469\uf3fc\u200d\uf3a8|\uf469\uf3fd\u200d\uf3a8|\uf469\uf3fe\u200d\uf3a8|\uf469\uf3ff\u200d\uf3a8|\uf468\u200d\u2708\ufe0f|\uf469\u200d\u2708\ufe0f|\uf468\uf3fb\u200d\uf680|\uf468\uf3fc\u200d\uf680|\uf468\uf3fd\u200d\uf680|\uf468\uf3fe\u200d\uf680|\uf468\uf3ff\u200d\uf680|\uf469\uf3fb\u200d\uf680|\uf469\uf3fc\u200d\uf680|\uf469\uf3fd\u200d\uf680|\uf469\uf3fe\u200d\uf680|\uf469\uf3ff\u200d\uf680|\uf468\uf3fb\u200d\uf692|\uf468\uf3fc\u200d\uf692|\uf468\uf3fd\u200d\uf692|\uf468\uf3fe\u200d\uf692|\uf468\uf3ff\u200d\uf692|\uf469\uf3fb\u200d\uf692|\uf469\uf3fc\u200d\uf692|\uf469\uf3fd\u200d\uf692|\uf469\uf3fe\u200d\uf692|\uf469\uf3ff\u200d\uf692|\uf46e\u200d\u2642\ufe0f|\uf46e\u200d\u2640\ufe0f|\uf482\u200d\u2642\ufe0f|\uf482\u200d\u2640\ufe0f|\uf477\u200d\u2642\ufe0f|\uf477\u200d\u2640\ufe0f|\uf473\u200d\u2642\ufe0f|\uf473\u200d\u2640\ufe0f|\uf471\u200d\u2642\ufe0f|\uf471\u200d\u2640\ufe0f|\uf9d9\u200d\u2640\ufe0f|\uf9d9\u200d\u2642\ufe0f|\uf9da\u200d\u2640\ufe0f|\uf9da\u200d\u2642\ufe0f|\uf9db\u200d\u2640\ufe0f|\uf9db\u200d\u2642\ufe0f|\uf9dc\u200d\u2640\ufe0f|\uf9dc\u200d\u2642\ufe0f|\uf9dd\u200d\u2640\ufe0f|\uf9dd\u200d\u2642\ufe0f|\uf9de\u200d\u2640\ufe0f|\uf9de\u200d\u2642\ufe0f|\uf9df\u200d\u2640\ufe0f|\uf9df\u200d\u2642\ufe0f|\uf64d\u200d\u2642\ufe0f|\uf64d\u200d\u2640\ufe0f|\uf64e\u200d\u2642\ufe0f|\uf64e\u200d\u2640\ufe0f|\uf645\u200d\u2642\ufe0f|\uf645\u200d\u2640\ufe0f|\uf646\u200d\u2642\ufe0f|\uf646\u200d\u2640\ufe0f|\uf481\u200d\u2642\ufe0f|\uf481\u200d\u2640\ufe0f|\uf64b\u200d\u2642\ufe0f|\uf64b\u200d\u2640\ufe0f|\uf647\u200d\u2642\ufe0f|\uf647\u200d\u2640\ufe0f|\uf926\u200d\u2642\ufe0f|\uf926\u200d\u2640\ufe0f|\uf937\u200d\u2642\ufe0f|\uf937\u200d\u2640\ufe0f|\uf486\u200d\u2642\ufe0f|\uf486\u200d\u2640\ufe0f|\uf487\u200d\u2642\ufe0f|\uf487\u200d\u2640\ufe0f|\uf6b6\u200d\u2642\ufe0f|\uf6b6\u200d\u2640\ufe0f|\uf3c3\u200d\u2642\ufe0f|\uf3c3\u200d\u2640\ufe0f|\uf46f\u200d\u2642\ufe0f|\uf46f\u200d\u2640\ufe0f|\uf9d6\u200d\u2640\ufe0f|\uf9d6\u200d\u2642\ufe0f|\uf9d7\u200d\u2640\ufe0f|\uf9d7\u200d\u2642\ufe0f|\uf9d8\u200d\u2640\ufe0f|\uf9d8\u200d\u2642\ufe0f|\uf3c4\u200d\u2642\ufe0f|\uf3c4\u200d\u2640\ufe0f|\uf6a3\u200d\u2642\ufe0f|\uf6a3\u200d\u2640\ufe0f|\uf3ca\u200d\u2642\ufe0f|\uf3ca\u200d\u2640\ufe0f|\uf6b4\u200d\u2642\ufe0f|\uf6b4\u200d\u2640\ufe0f|\uf6b5\u200d\u2642\ufe0f|\uf6b5\u200d\u2640\ufe0f|\uf938\u200d\u2642\ufe0f|\uf938\u200d\u2640\ufe0f|\uf93c\u200d\u2642\ufe0f|\uf93c\u200d\u2640\ufe0f|\uf93d\u200d\u2642\ufe0f|\uf93d\u200d\u2640\ufe0f|\uf93e\u200d\u2642\ufe0f|\uf93e\u200d\u2640\ufe0f|\uf939\u200d\u2642\ufe0f|\uf939\u200d\u2640\ufe0f|\uf3f3\ufe0f\u200d\uf308|\uf468\u200d\uf393|\uf469\u200d\uf393|\uf468\u200d\uf3eb|\uf469\u200d\uf3eb|\uf468\u200d\uf33e|\uf469\u200d\uf33e|\uf468\u200d\uf373|\uf469\u200d\uf373|\uf468\u200d\uf527|\uf469\u200d\uf527|\uf468\u200d\uf3ed|\uf469\u200d\uf3ed|\uf468\u200d\uf4bc|\uf469\u200d\uf4bc|\uf468\u200d\uf52c|\uf469\u200d\uf52c|\uf468\u200d\uf4bb|\uf469\u200d\uf4bb|\uf468\u200d\uf3a4|\uf469\u200d\uf3a4|\uf468\u200d\uf3a8|\uf469\u200d\uf3a8|\uf468\u200d\uf680|\uf469\u200d\uf680|\uf468\u200d\uf692|\uf469\u200d\uf692|\uf468\u200d\uf466|\uf468\u200d\uf467|\uf469\u200d\uf466|\uf469\u200d\uf467|\u0023\ufe0f\u20e3|\u002a\ufe0f\u20e3|\u0030\ufe0f\u20e3|\u0031\ufe0f\u20e3|\u0032\ufe0f\u20e3|\u0033\ufe0f\u20e3|\u0034\ufe0f\u20e3|\u0035\ufe0f\u20e3|\u0036\ufe0f\u20e3|\u0037\ufe0f\u20e3|\u0038\ufe0f\u20e3|\u0039\ufe0f\u20e3|\uf476\uf3fb|\uf476\uf3fc|\uf476\uf3fd|\uf476\uf3fe|\uf476\uf3ff|\uf9d2\uf3fb|\uf9d2\uf3fc|\uf9d2\uf3fd|\uf9d2\uf3fe|\uf9d2\uf3ff|\uf466\uf3fb|\uf466\uf3fc|\uf466\uf3fd|\uf466\uf3fe|\uf466\uf3ff|\uf467\uf3fb|\uf467\uf3fc|\uf467\uf3fd|\uf467\uf3fe|\uf467\uf3ff|\uf9d1\uf3fb|\uf9d1\uf3fc|\uf9d1\uf3fd|\uf9d1\uf3fe|\uf9d1\uf3ff|\uf468\uf3fb|\uf468\uf3fc|\uf468\uf3fd|\uf468\uf3fe|\uf468\uf3ff|\uf469\uf3fb|\uf469\uf3fc|\uf469\uf3fd|\uf469\uf3fe|\uf469\uf3ff|\uf9d3\uf3fb|\uf9d3\uf3fc|\uf9d3\uf3fd|\uf9d3\uf3fe|\uf9d3\uf3ff|\uf474\uf3fb|\uf474\uf3fc|\uf474\uf3fd|\uf474\uf3fe|\uf474\uf3ff|\uf475\uf3fb|\uf475\uf3fc|\uf475\uf3fd|\uf475\uf3fe|\uf475\uf3ff|\uf46e\uf3fb|\uf46e\uf3fc|\uf46e\uf3fd|\uf46e\uf3fe|\uf46e\uf3ff|\uf575\uf3fb|\uf575\uf3fc|\uf575\uf3fd|\uf575\uf3fe|\uf575\uf3ff|\uf482\uf3fb|\uf482\uf3fc|\uf482\uf3fd|\uf482\uf3fe|\uf482\uf3ff|\uf477\uf3fb|\uf477\uf3fc|\uf477\uf3fd|\uf477\uf3fe|\uf477\uf3ff|\uf934\uf3fb|\uf934\uf3fc|\uf934\uf3fd|\uf934\uf3fe|\uf934\uf3ff|\uf478\uf3fb|\uf478\uf3fc|\uf478\uf3fd|\uf478\uf3fe|\uf478\uf3ff|\uf473\uf3fb|\uf473\uf3fc|\uf473\uf3fd|\uf473\uf3fe|\uf473\uf3ff|\uf472\uf3fb|\uf472\uf3fc|\uf472\uf3fd|\uf472\uf3fe|\uf472\uf3ff|\uf9d5\uf3fb|\uf9d5\uf3fc|\uf9d5\uf3fd|\uf9d5\uf3fe|\uf9d5\uf3ff|\uf9d4\uf3fb|\uf9d4\uf3fc|\uf9d4\uf3fd|\uf9d4\uf3fe|\uf9d4\uf3ff|\uf471\uf3fb|\uf471\uf3fc|\uf471\uf3fd|\uf471\uf3fe|\uf471\uf3ff|\uf935\uf3fb|\uf935\uf3fc|\uf935\uf3fd|\uf935\uf3fe|\uf935\uf3ff|\uf470\uf3fb|\uf470\uf3fc|\uf470\uf3fd|\uf470\uf3fe|\uf470\uf3ff|\uf930\uf3fb|\uf930\uf3fc|\uf930\uf3fd|\uf930\uf3fe|\uf930\uf3ff|\uf931\uf3fb|\uf931\uf3fc|\uf931\uf3fd|\uf931\uf3fe|\uf931\uf3ff|\uf47c\uf3fb|\uf47c\uf3fc|\uf47c\uf3fd|\uf47c\uf3fe|\uf47c\uf3ff|\uf385\uf3fb|\uf385\uf3fc|\uf385\uf3fd|\uf385\uf3fe|\uf385\uf3ff|\uf936\uf3fb|\uf936\uf3fc|\uf936\uf3fd|\uf936\uf3fe|\uf936\uf3ff|\uf9d9\uf3fb|\uf9d9\uf3fc|\uf9d9\uf3fd|\uf9d9\uf3fe|\uf9d9\uf3ff|\uf9da\uf3fb|\uf9da\uf3fc|\uf9da\uf3fd|\uf9da\uf3fe|\uf9da\uf3ff|\uf9db\uf3fb|\uf9db\uf3fc|\uf9db\uf3fd|\uf9db\uf3fe|\uf9db\uf3ff|\uf9dc\uf3fb|\uf9dc\uf3fc|\uf9dc\uf3fd|\uf9dc\uf3fe|\uf9dc\uf3ff|\uf9dd\uf3fb|\uf9dd\uf3fc|\uf9dd\uf3fd|\uf9dd\uf3fe|\uf9dd\uf3ff|\uf64d\uf3fb|\uf64d\uf3fc|\uf64d\uf3fd|\uf64d\uf3fe|\uf64d\uf3ff|\uf64e\uf3fb|\uf64e\uf3fc|\uf64e\uf3fd|\uf64e\uf3fe|\uf64e\uf3ff|\uf645\uf3fb|\uf645\uf3fc|\uf645\uf3fd|\uf645\uf3fe|\uf645\uf3ff|\uf646\uf3fb|\uf646\uf3fc|\uf646\uf3fd|\uf646\uf3fe|\uf646\uf3ff|\uf481\uf3fb|\uf481\uf3fc|\uf481\uf3fd|\uf481\uf3fe|\uf481\uf3ff|\uf64b\uf3fb|\uf64b\uf3fc|\uf64b\uf3fd|\uf64b\uf3fe|\uf64b\uf3ff|\uf647\uf3fb|\uf647\uf3fc|\uf647\uf3fd|\uf647\uf3fe|\uf647\uf3ff|\uf926\uf3fb|\uf926\uf3fc|\uf926\uf3fd|\uf926\uf3fe|\uf926\uf3ff|\uf937\uf3fb|\uf937\uf3fc|\uf937\uf3fd|\uf937\uf3fe|\uf937\uf3ff|\uf486\uf3fb|\uf486\uf3fc|\uf486\uf3fd|\uf486\uf3fe|\uf486\uf3ff|\uf487\uf3fb|\uf487\uf3fc|\uf487\uf3fd|\uf487\uf3fe|\uf487\uf3ff|\uf6b6\uf3fb|\uf6b6\uf3fc|\uf6b6\uf3fd|\uf6b6\uf3fe|\uf6b6\uf3ff|\uf3c3\uf3fb|\uf3c3\uf3fc|\uf3c3\uf3fd|\uf3c3\uf3fe|\uf3c3\uf3ff|\uf483\uf3fb|\uf483\uf3fc|\uf483\uf3fd|\uf483\uf3fe|\uf483\uf3ff|\uf57a\uf3fb|\uf57a\uf3fc|\uf57a\uf3fd|\uf57a\uf3fe|\uf57a\uf3ff|\uf9d6\uf3fb|\uf9d6\uf3fc|\uf9d6\uf3fd|\uf9d6\uf3fe|\uf9d6\uf3ff|\uf9d7\uf3fb|\uf9d7\uf3fc|\uf9d7\uf3fd|\uf9d7\uf3fe|\uf9d7\uf3ff|\uf9d8\uf3fb|\uf9d8\uf3fc|\uf9d8\uf3fd|\uf9d8\uf3fe|\uf9d8\uf3ff|\uf6c0\uf3fb|\uf6c0\uf3fc|\uf6c0\uf3fd|\uf6c0\uf3fe|\uf6c0\uf3ff|\uf6cc\uf3fb|\uf6cc\uf3fc|\uf6cc\uf3fd|\uf6cc\uf3fe|\uf6cc\uf3ff|\uf574\uf3fb|\uf574\uf3fc|\uf574\uf3fd|\uf574\uf3fe|\uf574\uf3ff|\uf3c7\uf3fb|\uf3c7\uf3fc|\uf3c7\uf3fd|\uf3c7\uf3fe|\uf3c7\uf3ff|\uf3c2\uf3fb|\uf3c2\uf3fc|\uf3c2\uf3fd|\uf3c2\uf3fe|\uf3c2\uf3ff|\uf3cc\uf3fb|\uf3cc\uf3fc|\uf3cc\uf3fd|\uf3cc\uf3fe|\uf3cc\uf3ff|\uf3c4\uf3fb|\uf3c4\uf3fc|\uf3c4\uf3fd|\uf3c4\uf3fe|\uf3c4\uf3ff|\uf6a3\uf3fb|\uf6a3\uf3fc|\uf6a3\uf3fd|\uf6a3\uf3fe|\uf6a3\uf3ff|\uf3ca\uf3fb|\uf3ca\uf3fc|\uf3ca\uf3fd|\uf3ca\uf3fe|\uf3ca\uf3ff|\u26f9\uf3fb|\u26f9\uf3fc|\u26f9\uf3fd|\u26f9\uf3fe|\u26f9\uf3ff|\uf3cb\uf3fb|\uf3cb\uf3fc|\uf3cb\uf3fd|\uf3cb\uf3fe|\uf3cb\uf3ff|\uf6b4\uf3fb|\uf6b4\uf3fc|\uf6b4\uf3fd|\uf6b4\uf3fe|\uf6b4\uf3ff|\uf6b5\uf3fb|\uf6b5\uf3fc|\uf6b5\uf3fd|\uf6b5\uf3fe|\uf6b5\uf3ff|\uf938\uf3fb|\uf938\uf3fc|\uf938\uf3fd|\uf938\uf3fe|\uf938\uf3ff|\uf93d\uf3fb|\uf93d\uf3fc|\uf93d\uf3fd|\uf93d\uf3fe|\uf93d\uf3ff|\uf93e\uf3fb|\uf93e\uf3fc|\uf93e\uf3fd|\uf93e\uf3fe|\uf93e\uf3ff|\uf939\uf3fb|\uf939\uf3fc|\uf939\uf3fd|\uf939\uf3fe|\uf939\uf3ff|\uf933\uf3fb|\uf933\uf3fc|\uf933\uf3fd|\uf933\uf3fe|\uf933\uf3ff|\uf4aa\uf3fb|\uf4aa\uf3fc|\uf4aa\uf3fd|\uf4aa\uf3fe|\uf4aa\uf3ff|\uf448\uf3fb|\uf448\uf3fc|\uf448\uf3fd|\uf448\uf3fe|\uf448\uf3ff|\uf449\uf3fb|\uf449\uf3fc|\uf449\uf3fd|\uf449\uf3fe|\uf449\uf3ff|\u261d\uf3fb|\u261d\uf3fc|\u261d\uf3fd|\u261d\uf3fe|\u261d\uf3ff|\uf446\uf3fb|\uf446\uf3fc|\uf446\uf3fd|\uf446\uf3fe|\uf446\uf3ff|\uf595\uf3fb|\uf595\uf3fc|\uf595\uf3fd|\uf595\uf3fe|\uf595\uf3ff|\uf447\uf3fb|\uf447\uf3fc|\uf447\uf3fd|\uf447\uf3fe|\uf447\uf3ff|\u270c\uf3fb|\u270c\uf3fc|\u270c\uf3fd|\u270c\uf3fe|\u270c\uf3ff|\uf91e\uf3fb|\uf91e\uf3fc|\uf91e\uf3fd|\uf91e\uf3fe|\uf91e\uf3ff|\uf596\uf3fb|\uf596\uf3fc|\uf596\uf3fd|\uf596\uf3fe|\uf596\uf3ff|\uf918\uf3fb|\uf918\uf3fc|\uf918\uf3fd|\uf918\uf3fe|\uf918\uf3ff|\uf919\uf3fb|\uf919\uf3fc|\uf919\uf3fd|\uf919\uf3fe|\uf919\uf3ff|\uf590\uf3fb|\uf590\uf3fc|\uf590\uf3fd|\uf590\uf3fe|\uf590\uf3ff|\u270b\uf3fb|\u270b\uf3fc|\u270b\uf3fd|\u270b\uf3fe|\u270b\uf3ff|\uf44c\uf3fb|\uf44c\uf3fc|\uf44c\uf3fd|\uf44c\uf3fe|\uf44c\uf3ff|\uf44d\uf3fb|\uf44d\uf3fc|\uf44d\uf3fd|\uf44d\uf3fe|\uf44d\uf3ff|\uf44e\uf3fb|\uf44e\uf3fc|\uf44e\uf3fd|\uf44e\uf3fe|\uf44e\uf3ff|\u270a\uf3fb|\u270a\uf3fc|\u270a\uf3fd|\u270a\uf3fe|\u270a\uf3ff|\uf44a\uf3fb|\uf44a\uf3fc|\uf44a\uf3fd|\uf44a\uf3fe|\uf44a\uf3ff|\uf91b\uf3fb|\uf91b\uf3fc|\uf91b\uf3fd|\uf91b\uf3fe|\uf91b\uf3ff|\uf91c\uf3fb|\uf91c\uf3fc|\uf91c\uf3fd|\uf91c\uf3fe|\uf91c\uf3ff|\uf91a\uf3fb|\uf91a\uf3fc|\uf91a\uf3fd|\uf91a\uf3fe|\uf91a\uf3ff|\uf44b\uf3fb|\uf44b\uf3fc|\uf44b\uf3fd|\uf44b\uf3fe|\uf44b\uf3ff|\uf91f\uf3fb|\uf91f\uf3fc|\uf91f\uf3fd|\uf91f\uf3fe|\uf91f\uf3ff|\u270d\uf3fb|\u270d\uf3fc|\u270d\uf3fd|\u270d\uf3fe|\u270d\uf3ff|\uf44f\uf3fb|\uf44f\uf3fc|\uf44f\uf3fd|\uf44f\uf3fe|\uf44f\uf3ff|\uf450\uf3fb|\uf450\uf3fc|\uf450\uf3fd|\uf450\uf3fe|\uf450\uf3ff|\uf64c\uf3fb|\uf64c\uf3fc|\uf64c\uf3fd|\uf64c\uf3fe|\uf64c\uf3ff|\uf932\uf3fb|\uf932\uf3fc|\uf932\uf3fd|\uf932\uf3fe|\uf932\uf3ff|\uf64f\uf3fb|\uf64f\uf3fc|\uf64f\uf3fd|\uf64f\uf3fe|\uf64f\uf3ff|\uf485\uf3fb|\uf485\uf3fc|\uf485\uf3fd|\uf485\uf3fe|\uf485\uf3ff|\uf442\uf3fb|\uf442\uf3fc|\uf442\uf3fd|\uf442\uf3fe|\uf442\uf3ff|\uf443\uf3fb|\uf443\uf3fc|\uf443\uf3fd|\uf443\uf3fe|\uf443\uf3ff|\uf1e6\uf1e8|\uf1e6\uf1e9|\uf1e6\uf1ea|\uf1e6\uf1eb|\uf1e6\uf1ec|\uf1e6\uf1ee|\uf1e6\uf1f1|\uf1e6\uf1f2|\uf1e6\uf1f4|\uf1e6\uf1f6|\uf1e6\uf1f7|\uf1e6\uf1f8|\uf1e6\uf1f9|\uf1e6\uf1fa|\uf1e6\uf1fc|\uf1e6\uf1fd|\uf1e6\uf1ff|\uf1e7\uf1e6|\uf1e7\uf1e7|\uf1e7\uf1e9|\uf1e7\uf1ea|\uf1e7\uf1eb|\uf1e7\uf1ec|\uf1e7\uf1ed|\uf1e7\uf1ee|\uf1e7\uf1ef|\uf1e7\uf1f1|\uf1e7\uf1f2|\uf1e7\uf1f3|\uf1e7\uf1f4|\uf1e7\uf1f6|\uf1e7\uf1f7|\uf1e7\uf1f8|\uf1e7\uf1f9|\uf1e7\uf1fb|\uf1e7\uf1fc|\uf1e7\uf1fe|\uf1e7\uf1ff|\uf1e8\uf1e6|\uf1e8\uf1e8|\uf1e8\uf1e9|\uf1e8\uf1eb|\uf1e8\uf1ec|\uf1e8\uf1ed|\uf1e8\uf1ee|\uf1e8\uf1f0|\uf1e8\uf1f1|\uf1e8\uf1f2|\uf1e8\uf1f3|\uf1e8\uf1f4|\uf1e8\uf1f5|\uf1e8\uf1f7|\uf1e8\uf1fa|\uf1e8\uf1fb|\uf1e8\uf1fc|\uf1e8\uf1fd|\uf1e8\uf1fe|\uf1e8\uf1ff|\uf1e9\uf1ea|\uf1e9\uf1ec|\uf1e9\uf1ef|\uf1e9\uf1f0|\uf1e9\uf1f2|\uf1e9\uf1f4|\uf1e9\uf1ff|\uf1ea\uf1e6|\uf1ea\uf1e8|\uf1ea\uf1ea|\uf1ea\uf1ec|\uf1ea\uf1ed|\uf1ea\uf1f7|\uf1ea\uf1f8|\uf1ea\uf1f9|\uf1ea\uf1fa|\uf1eb\uf1ee|\uf1eb\uf1ef|\uf1eb\uf1f0|\uf1eb\uf1f2|\uf1eb\uf1f4|\uf1eb\uf1f7|\uf1ec\uf1e6|\uf1ec\uf1e7|\uf1ec\uf1e9|\uf1ec\uf1ea|\uf1ec\uf1eb|\uf1ec\uf1ec|\uf1ec\uf1ed|\uf1ec\uf1ee|\uf1ec\uf1f1|\uf1ec\uf1f2|\uf1ec\uf1f3|\uf1ec\uf1f5|\uf1ec\uf1f6|\uf1ec\uf1f7|\uf1ec\uf1f8|\uf1ec\uf1f9|\uf1ec\uf1fa|\uf1ec\uf1fc|\uf1ec\uf1fe|\uf1ed\uf1f0|\uf1ed\uf1f2|\uf1ed\uf1f3|\uf1ed\uf1f7|\uf1ed\uf1f9|\uf1ed\uf1fa|\uf1ee\uf1e8|\uf1ee\uf1e9|\uf1ee\uf1ea|\uf1ee\uf1f1|\uf1ee\uf1f2|\uf1ee\uf1f3|\uf1ee\uf1f4|\uf1ee\uf1f6|\uf1ee\uf1f7|\uf1ee\uf1f8|\uf1ee\uf1f9|\uf1ef\uf1ea|\uf1ef\uf1f2|\uf1ef\uf1f4|\uf1ef\uf1f5|\uf1f0\uf1ea|\uf1f0\uf1ec|\uf1f0\uf1ed|\uf1f0\uf1ee|\uf1f0\uf1f2|\uf1f0\uf1f3|\uf1f0\uf1f5|\uf1f0\uf1f7|\uf1f0\uf1fc|\uf1f0\uf1fe|\uf1f0\uf1ff|\uf1f1\uf1e6|\uf1f1\uf1e7|\uf1f1\uf1e8|\uf1f1\uf1ee|\uf1f1\uf1f0|\uf1f1\uf1f7|\uf1f1\uf1f8|\uf1f1\uf1f9|\uf1f1\uf1fa|\uf1f1\uf1fb|\uf1f1\uf1fe|\uf1f2\uf1e6|\uf1f2\uf1e8|\uf1f2\uf1e9|\uf1f2\uf1ea|\uf1f2\uf1eb|\uf1f2\uf1ec|\uf1f2\uf1ed|\uf1f2\uf1f0|\uf1f2\uf1f1|\uf1f2\uf1f2|\uf1f2\uf1f3|\uf1f2\uf1f4|\uf1f2\uf1f5|\uf1f2\uf1f6|\uf1f2\uf1f7|\uf1f2\uf1f8|\uf1f2\uf1f9|\uf1f2\uf1fa|\uf1f2\uf1fb|\uf1f2\uf1fc|\uf1f2\uf1fd|\uf1f2\uf1fe|\uf1f2\uf1ff|\uf1f3\uf1e6|\uf1f3\uf1e8|\uf1f3\uf1ea|\uf1f3\uf1eb|\uf1f3\uf1ec|\uf1f3\uf1ee|\uf1f3\uf1f1|\uf1f3\uf1f4|\uf1f3\uf1f5|\uf1f3\uf1f7|\uf1f3\uf1fa|\uf1f3\uf1ff|\uf1f4\uf1f2|\uf1f5\uf1e6|\uf1f5\uf1ea|\uf1f5\uf1eb|\uf1f5\uf1ec|\uf1f5\uf1ed|\uf1f5\uf1f0|\uf1f5\uf1f1|\uf1f5\uf1f2|\uf1f5\uf1f3|\uf1f5\uf1f7|\uf1f5\uf1f8|\uf1f5\uf1f9|\uf1f5\uf1fc|\uf1f5\uf1fe|\uf1f6\uf1e6|\uf1f7\uf1ea|\uf1f7\uf1f4|\uf1f7\uf1f8|\uf1f7\uf1fa|\uf1f7\uf1fc|\uf1f8\uf1e6|\uf1f8\uf1e7|\uf1f8\uf1e8|\uf1f8\uf1e9|\uf1f8\uf1ea|\uf1f8\uf1ec|\uf1f8\uf1ed|\uf1f8\uf1ee|\uf1f8\uf1ef|\uf1f8\uf1f0|\uf1f8\uf1f1|\uf1f8\uf1f2|\uf1f8\uf1f3|\uf1f8\uf1f4|\uf1f8\uf1f7|\uf1f8\uf1f8|\uf1f8\uf1f9|\uf1f8\uf1fb|\uf1f8\uf1fd|\uf1f8\uf1fe|\uf1f8\uf1ff|\uf1f9\uf1e6|\uf1f9\uf1e8|\uf1f9\uf1e9|\uf1f9\uf1eb|\uf1f9\uf1ec|\uf1f9\uf1ed|\uf1f9\uf1ef|\uf1f9\uf1f0|\uf1f9\uf1f1|\uf1f9\uf1f2|\uf1f9\uf1f3|\uf1f9\uf1f4|\uf1f9\uf1f7|\uf1f9\uf1f9|\uf1f9\uf1fb|\uf1f9\uf1fc|\uf1f9\uf1ff|\uf1fa\uf1e6|\uf1fa\uf1ec|\uf1fa\uf1f2|\uf1fa\uf1f3|\uf1fa\uf1f8|\uf1fa\uf1fe|\uf1fa\uf1ff|\uf1fb\uf1e6|\uf1fb\uf1e8|\uf1fb\uf1ea|\uf1fb\uf1ec|\uf1fb\uf1ee|\uf1fb\uf1f3|\uf1fb\uf1fa|\uf1fc\uf1eb|\uf1fc\uf1f8|\uf1fd\uf1f0|\uf1fe\uf1ea|\uf1fe\uf1f9|\uf1ff\uf1e6|\uf1ff\uf1f2|\uf1ff\uf1fc|\uf600|\uf601|\uf602|\uf923|\uf603|\uf604|\uf605|\uf606|\uf609|\uf60a|\uf60b|\uf60e|\uf60d|\uf618|\uf617|\uf619|\uf61a|\u263a|\uf642|\uf917|\uf929|\uf914|\uf928|\uf610|\uf611|\uf636|\uf644|\uf60f|\uf623|\uf625|\uf62e|\uf910|\uf62f|\uf62a|\uf62b|\uf634|\uf60c|\uf61b|\uf61c|\uf61d|\uf924|\uf612|\uf613|\uf614|\uf615|\uf643|\uf911|\uf632|\u2639|\uf641|\uf616|\uf61e|\uf61f|\uf624|\uf622|\uf62d|\uf626|\uf627|\uf628|\uf629|\uf92f|\uf62c|\uf630|\uf631|\uf633|\uf92a|\uf635|\uf621|\uf620|\uf92c|\uf637|\uf912|\uf915|\uf922|\uf92e|\uf927|\uf607|\uf920|\uf921|\uf925|\uf92b|\uf92d|\uf9d0|\uf913|\uf608|\uf47f|\uf479|\uf47a|\uf480|\u2620|\uf47b|\uf47d|\uf47e|\uf916|\uf4a9|\uf63a|\uf638|\uf639|\uf63b|\uf63c|\uf63d|\uf640|\uf63f|\uf63e|\uf648|\uf649|\uf64a|\uf476|\uf9d2|\uf466|\uf467|\uf9d1|\uf468|\uf469|\uf9d3|\uf474|\uf475|\uf46e|\uf575|\uf482|\uf477|\uf934|\uf478|\uf473|\uf472|\uf9d5|\uf9d4|\uf471|\uf935|\uf470|\uf930|\uf931|\uf47c|\uf385|\uf936|\uf9d9|\uf9da|\uf9db|\uf9dc|\uf9dd|\uf9de|\uf9df|\uf64d|\uf64e|\uf645|\uf646|\uf481|\uf64b|\uf647|\uf926|\uf937|\uf486|\uf487|\uf6b6|\uf3c3|\uf483|\uf57a|\uf46f|\uf9d6|\uf9d7|\uf9d8|\uf6c0|\uf6cc|\uf574|\uf5e3|\uf464|\uf465|\uf93a|\uf3c7|\u26f7|\uf3c2|\uf3cc|\uf3c4|\uf6a3|\uf3ca|\u26f9|\uf3cb|\uf6b4|\uf6b5|\uf3ce|\uf3cd|\uf938|\uf93c|\uf93d|\uf93e|\uf939|\uf46b|\uf46c|\uf46d|\uf48f|\uf491|\uf46a|\uf933|\uf4aa|\uf448|\uf449|\u261d|\uf446|\uf595|\uf447|\u270c|\uf91e|\uf596|\uf918|\uf919|\uf590|\u270b|\uf44c|\uf44d|\uf44e|\u270a|\uf44a|\uf91b|\uf91c|\uf91a|\uf44b|\uf91f|\u270d|\uf44f|\uf450|\uf64c|\uf932|\uf64f|\uf91d|\uf485|\uf442|\uf443|\uf463|\uf440|\uf441|\uf9e0|\uf445|\uf444|\uf48b|\uf498|\u2764|\uf493|\uf494|\uf495|\uf496|\uf497|\uf499|\uf49a|\uf49b|\uf9e1|\uf49c|\uf5a4|\uf49d|\uf49e|\uf49f|\u2763|\uf48c|\uf4a4|\uf4a2|\uf4a3|\uf4a5|\uf4a6|\uf4a8|\uf4ab|\uf4ac|\uf5e8|\uf5ef|\uf4ad|\uf573|\uf453|\uf576|\uf454|\uf455|\uf456|\uf9e3|\uf9e4|\uf9e5|\uf9e6|\uf457|\uf458|\uf459|\uf45a|\uf45b|\uf45c|\uf45d|\uf6cd|\uf392|\uf45e|\uf45f|\uf460|\uf461|\uf462|\uf451|\uf452|\uf3a9|\uf393|\uf9e2|\u26d1|\uf4ff|\uf484|\uf48d|\uf48e|\uf435|\uf412|\uf98d|\uf436|\uf415|\uf429|\uf43a|\uf98a|\uf431|\uf408|\uf981|\uf42f|\uf405|\uf406|\uf434|\uf40e|\uf984|\uf993|\uf98c|\uf42e|\uf402|\uf403|\uf404|\uf437|\uf416|\uf417|\uf43d|\uf40f|\uf411|\uf410|\uf42a|\uf42b|\uf992|\uf418|\uf98f|\uf42d|\uf401|\uf400|\uf439|\uf430|\uf407|\uf43f|\uf994|\uf987|\uf43b|\uf428|\uf43c|\uf43e|\uf983|\uf414|\uf413|\uf423|\uf424|\uf425|\uf426|\uf427|\uf54a|\uf985|\uf986|\uf989|\uf438|\uf40a|\uf422|\uf98e|\uf40d|\uf432|\uf409|\uf995|\uf996|\uf433|\uf40b|\uf42c|\uf41f|\uf420|\uf421|\uf988|\uf419|\uf41a|\uf980|\uf990|\uf991|\uf40c|\uf98b|\uf41b|\uf41c|\uf41d|\uf41e|\uf997|\uf577|\uf578|\uf982|\uf490|\uf338|\uf4ae|\uf3f5|\uf339|\uf940|\uf33a|\uf33b|\uf33c|\uf337|\uf331|\uf332|\uf333|\uf334|\uf335|\uf33e|\uf33f|\u2618|\uf340|\uf341|\uf342|\uf343|\uf347|\uf348|\uf349|\uf34a|\uf34b|\uf34c|\uf34d|\uf34e|\uf34f|\uf350|\uf351|\uf352|\uf353|\uf95d|\uf345|\uf965|\uf951|\uf346|\uf954|\uf955|\uf33d|\uf336|\uf952|\uf966|\uf344|\uf95c|\uf330|\uf35e|\uf950|\uf956|\uf968|\uf95e|\uf9c0|\uf356|\uf357|\uf969|\uf953|\uf354|\uf35f|\uf355|\uf32d|\uf96a|\uf32e|\uf32f|\uf959|\uf95a|\uf373|\uf958|\uf372|\uf963|\uf957|\uf37f|\uf96b|\uf371|\uf358|\uf359|\uf35a|\uf35b|\uf35c|\uf35d|\uf360|\uf362|\uf363|\uf364|\uf365|\uf361|\uf95f|\uf960|\uf961|\uf366|\uf367|\uf368|\uf369|\uf36a|\uf382|\uf370|\uf967|\uf36b|\uf36c|\uf36d|\uf36e|\uf36f|\uf37c|\uf95b|\u2615|\uf375|\uf376|\uf37e|\uf377|\uf378|\uf379|\uf37a|\uf37b|\uf942|\uf943|\uf964|\uf962|\uf37d|\uf374|\uf944|\uf52a|\uf3fa|\uf30d|\uf30e|\uf30f|\uf310|\uf5fa|\uf5fe|\uf3d4|\u26f0|\uf30b|\uf5fb|\uf3d5|\uf3d6|\uf3dc|\uf3dd|\uf3de|\uf3df|\uf3db|\uf3d7|\uf3d8|\uf3d9|\uf3da|\uf3e0|\uf3e1|\uf3e2|\uf3e3|\uf3e4|\uf3e5|\uf3e6|\uf3e8|\uf3e9|\uf3ea|\uf3eb|\uf3ec|\uf3ed|\uf3ef|\uf3f0|\uf492|\uf5fc|\uf5fd|\u26ea|\uf54c|\uf54d|\u26e9|\uf54b|\u26f2|\u26fa|\uf301|\uf303|\uf304|\uf305|\uf306|\uf307|\uf309|\u2668|\uf30c|\uf3a0|\uf3a1|\uf3a2|\uf488|\uf3aa|\uf3ad|\uf5bc|\uf3a8|\uf3b0|\uf682|\uf683|\uf684|\uf685|\uf686|\uf687|\uf688|\uf689|\uf68a|\uf69d|\uf69e|\uf68b|\uf68c|\uf68d|\uf68e|\uf690|\uf691|\uf692|\uf693|\uf694|\uf695|\uf696|\uf697|\uf698|\uf699|\uf69a|\uf69b|\uf69c|\uf6b2|\uf6f4|\uf6f5|\uf68f|\uf6e3|\uf6e4|\u26fd|\uf6a8|\uf6a5|\uf6a6|\uf6a7|\uf6d1|\u2693|\u26f5|\uf6f6|\uf6a4|\uf6f3|\u26f4|\uf6e5|\uf6a2|\u2708|\uf6e9|\uf6eb|\uf6ec|\uf4ba|\uf681|\uf69f|\uf6a0|\uf6a1|\uf6f0|\uf680|\uf6f8|\uf6ce|\uf6aa|\uf6cf|\uf6cb|\uf6bd|\uf6bf|\uf6c1|\u231b|\u23f3|\u231a|\u23f0|\u23f1|\u23f2|\uf570|\uf55b|\uf567|\uf550|\uf55c|\uf551|\uf55d|\uf552|\uf55e|\uf553|\uf55f|\uf554|\uf560|\uf555|\uf561|\uf556|\uf562|\uf557|\uf563|\uf558|\uf564|\uf559|\uf565|\uf55a|\uf566|\uf311|\uf312|\uf313|\uf314|\uf315|\uf316|\uf317|\uf318|\uf319|\uf31a|\uf31b|\uf31c|\uf321|\u2600|\uf31d|\uf31e|\u2b50|\uf31f|\uf320|\u2601|\u26c5|\u26c8|\uf324|\uf325|\uf326|\uf327|\uf328|\uf329|\uf32a|\uf32b|\uf32c|\uf300|\uf308|\uf302|\u2602|\u2614|\u26f1|\u26a1|\u2744|\u2603|\u26c4|\u2604|\uf525|\uf4a7|\uf30a|\uf383|\uf384|\uf386|\uf387|\u2728|\uf388|\uf389|\uf38a|\uf38b|\uf38d|\uf38e|\uf38f|\uf390|\uf391|\uf380|\uf381|\uf397|\uf39f|\uf3ab|\uf396|\uf3c6|\uf3c5|\uf947|\uf948|\uf949|\u26bd|\u26be|\uf3c0|\uf3d0|\uf3c8|\uf3c9|\uf3be|\uf3b1|\uf3b3|\uf3cf|\uf3d1|\uf3d2|\uf3d3|\uf3f8|\uf94a|\uf94b|\uf945|\uf3af|\u26f3|\u26f8|\uf3a3|\uf3bd|\uf3bf|\uf6f7|\uf94c|\uf3ae|\uf579|\uf3b2|\u2660|\u2665|\u2666|\u2663|\uf0cf|\uf004|\uf3b4|\uf507|\uf508|\uf509|\uf50a|\uf4e2|\uf4e3|\uf4ef|\uf514|\uf515|\uf3bc|\uf3b5|\uf3b6|\uf399|\uf39a|\uf39b|\uf3a4|\uf3a7|\uf4fb|\uf3b7|\uf3b8|\uf3b9|\uf3ba|\uf3bb|\uf941|\uf4f1|\uf4f2|\u260e|\uf4de|\uf4df|\uf4e0|\uf50b|\uf50c|\uf4bb|\uf5a5|\uf5a8|\u2328|\uf5b1|\uf5b2|\uf4bd|\uf4be|\uf4bf|\uf4c0|\uf3a5|\uf39e|\uf4fd|\uf3ac|\uf4fa|\uf4f7|\uf4f8|\uf4f9|\uf4fc|\uf50d|\uf50e|\uf52c|\uf52d|\uf4e1|\uf56f|\uf4a1|\uf526|\uf3ee|\uf4d4|\uf4d5|\uf4d6|\uf4d7|\uf4d8|\uf4d9|\uf4da|\uf4d3|\uf4d2|\uf4c3|\uf4dc|\uf4c4|\uf4f0|\uf5de|\uf4d1|\uf516|\uf3f7|\uf4b0|\uf4b4|\uf4b5|\uf4b6|\uf4b7|\uf4b8|\uf4b3|\uf4b9|\uf4b1|\uf4b2|\u2709|\uf4e7|\uf4e8|\uf4e9|\uf4e4|\uf4e5|\uf4e6|\uf4eb|\uf4ea|\uf4ec|\uf4ed|\uf4ee|\uf5f3|\u270f|\u2712|\uf58b|\uf58a|\uf58c|\uf58d|\uf4dd|\uf4bc|\uf4c1|\uf4c2|\uf5c2|\uf4c5|\uf4c6|\uf5d2|\uf5d3|\uf4c7|\uf4c8|\uf4c9|\uf4ca|\uf4cb|\uf4cc|\uf4cd|\uf4ce|\uf587|\uf4cf|\uf4d0|\u2702|\uf5c3|\uf5c4|\uf5d1|\uf512|\uf513|\uf50f|\uf510|\uf511|\uf5dd|\uf528|\u26cf|\u2692|\uf6e0|\uf5e1|\u2694|\uf52b|\uf3f9|\uf6e1|\uf527|\uf529|\u2699|\uf5dc|\u2697|\u2696|\uf517|\u26d3|\uf489|\uf48a|\uf6ac|\u26b0|\u26b1|\uf5ff|\uf6e2|\uf52e|\uf6d2|\uf3e7|\uf6ae|\uf6b0|\u267f|\uf6b9|\uf6ba|\uf6bb|\uf6bc|\uf6be|\uf6c2|\uf6c3|\uf6c4|\uf6c5|\u26a0|\uf6b8|\u26d4|\uf6ab|\uf6b3|\uf6ad|\uf6af|\uf6b1|\uf6b7|\uf4f5|\uf51e|\u2622|\u2623|\u2b06|\u2197|\u27a1|\u2198|\u2b07|\u2199|\u2b05|\u2196|\u2195|\u2194|\u21a9|\u21aa|\u2934|\u2935|\uf503|\uf504|\uf519|\uf51a|\uf51b|\uf51c|\uf51d|\uf6d0|\u269b|\uf549|\u2721|\u2638|\u262f|\u271d|\u2626|\u262a|\u262e|\uf54e|\uf52f|\u2648|\u2649|\u264a|\u264b|\u264c|\u264d|\u264e|\u264f|\u2650|\u2651|\u2652|\u2653|\u26ce|\uf500|\uf501|\uf502|\u25b6|\u23e9|\u23ed|\u23ef|\u25c0|\u23ea|\u23ee|\uf53c|\u23eb|\uf53d|\u23ec|\u23f8|\u23f9|\u23fa|\u23cf|\uf3a6|\uf505|\uf506|\uf4f6|\uf4f3|\uf4f4|\u2640|\u2642|\u2695|\u267b|\u269c|\uf531|\uf4db|\uf530|\u2b55|\u2705|\u2611|\u2714|\u2716|\u274c|\u274e|\u2795|\u2796|\u2797|\u27b0|\u27bf|\u303d|\u2733|\u2734|\u2747|\u203c|\u2049|\u2753|\u2754|\u2755|\u2757|\u3030|\u00a9|\u00ae|\u2122|\uf51f|\uf4af|\uf520|\uf521|\uf522|\uf523|\uf524|\uf170|\uf18e|\uf171|\uf191|\uf192|\uf193|\u2139|\uf194|\u24c2|\uf195|\uf196|\uf17e|\uf197|\uf17f|\uf198|\uf199|\uf19a|\uf201|\uf202|\uf237|\uf236|\uf22f|\uf250|\uf239|\uf21a|\uf232|\uf251|\uf238|\uf234|\uf233|\u3297|\u3299|\uf23a|\uf235|\u25aa|\u25ab|\u25fb|\u25fc|\u25fd|\u25fe|\u2b1b|\u2b1c|\uf536|\uf537|\uf538|\uf539|\uf53a|\uf53b|\uf4a0|\uf518|\uf532|\uf533|\u26aa|\u26ab|\uf534|\uf535|\uf3c1|\uf6a9|\uf38c|\uf3f4|\uf3f3/g;

    var EmojiReg;

    var EmojiList = [];

    var isIE8 = document.all && !document.addEventListener;

    // emoji 详情, 扩展时往后叠加
    var EmojiFactory = {
        "u1F603": { "en": "Smiley Face", "zh": "笑脸", "tag": "\uD83D\uDE03", "position": "-75px 0px" },
        "u1F600": { "en": "Grinning Face", "zh": "笑嘻嘻", "tag": "\uD83D\uDE00", "position": "0px 0px" },
        "u1F60A": { "en": "Smiley", "zh": "微笑", "tag": "\uD83D\uDE0A", "position": "-1725px 0px" },
        "u263A": { "en": "Cute", "zh": "萌萌哒", "tag": "\u263A", "position": "-2950px 0px" },
        "u1F609": { "en": "Winking Face", "zh": "眨眼", "tag": "\uD83D\uDE09", "position": "-200px 0px" },
        "u1F60D": { "en": "Heart Eyes", "zh": "色迷迷", "tag": "\uD83D\uDE0D", "position": "-1800px 0px" },
        "u1F618": { "en": "Blowing Kiss", "zh": "飞吻", "tag": "\uD83D\uDE18", "position": "-375px 0px" },
        "u1F61A": { "en": "Kiss Face", "zh": "么么哒", "tag": "\uD83D\uDE1A", "position": "-1875px 0px" },
        "u1F61C": { "en": "Crazy Face", "zh": "调皮", "tag": "\uD83D\uDE1C", "position": "-1900px 0px" },
        "u1F61D": { "en": "Tongue Out", "zh": "吐舌头", "tag": "\uD83D\uDE1D", "position": "-1925px 0px" },
        "u1F633": { "en": "Flushed Face", "zh": "脸红", "tag": "\uD83D\uDE33", "position": "-625px 0px" },
        "u1F601": { "en": "Grinning With Smiling", "zh": "露齿而笑", "tag": "\uD83D\uDE01", "position": "-25px 0px" },
        "u1F614": { "en": "Pensive", "zh": "沉思", "tag": "\uD83D\uDE14", "position": "-300px 0px" },
        "u1F60C": { "en": "Pleased", "zh": "满意", "tag": "\uD83D\uDE0C", "position": "-1775px 0px" },
        "u1F612": { "en": "Dissatisfied", "zh": "不满", "tag": "\uD83D\uDE12", "position": "-250px 0px" },
        "u1F61F": { "en": "Worried Face", "zh": "苦瓜脸", "tag": "\uD83D\uDE1F", "position": "-1975px 0px" },
        "u1F61E": { "en": "Disappointed Face", "zh": "失望", "tag": "\uD83D\uDE1E", "position": "-1950px 0px" },
        "u1F623": { "en": "Helpless Face", "zh": "无助", "tag": "\uD83D\uDE23", "position": "-450px 0px" },
        "u1F62D": { "en": "Crying", "zh": "伤心", "tag": "\uD83D\uDE22", "position": "-425px 0px" },
        "u1F602": { "en": "Laughing Tears", "zh": "喜极而泣", "tag": "\uD83D\uDE02", "position": "-50px 0px" },
        "u1F622": { "en": "Sobbing", "zh": "哭泣", "tag": "\uD83D\uDE2D", "position": "-2075px 0px" },
        "u1F62A": { "en": "Sleepy Face", "zh": "困", "tag": "\uD83D\uDE2A", "position": "-2000px 0px" },
        "u1F630": { "en": "Cold Sweat", "zh": "冷汗", "tag": "\uD83D\uDE30", "position": "-550px 0px" },
        "u1F605": { "en": "Happy Sweat", "zh": "尴尬", "tag": "\uD83D\uDE05", "position": "-100px 0px" },
        "u1F613": { "en": "Sweat", "zh": "汗", "tag": "\uD83D\uDE13", "position": "-275px 0px" },
        "u1F62B": { "en": "Tired Face", "zh": "抓狂", "tag": "\uD83D\uDE2B", "position": "-2025px 0px" },
        "u1F629": { "en": "Weary Face", "zh": "疲惫", "tag": "\uD83D\uDE29", "position": "-525px 0px" },
        "u1F628": { "en": "Fearful Face", "zh": "可怕", "tag": "\uD83D\uDE28", "position": "-500px 0px" },
        "u1F631": { "en": "Scream", "zh": "尖叫", "tag": "\uD83D\uDE31", "position": "-575px 0px" },
        "u1F621": { "en": "Angry Face", "zh": "生气", "tag": "\uD83D\uDE21", "position": "-400px 0px" },
        "u1F624": { "en": "Mad Face", "zh": "怒气冲冲", "tag": "\uD83D\uDE24", "position": "-475px 0px" },
        "u1F616": { "en": "Confounded Face", "zh": "蒙羞", "tag": "\uD83D\uDE16", "position": "-350px 0px" },
        "u1F606": { "en": "Big Grin", "zh": "大笑", "tag": "\uD83D\uDE06", "position": "-125px 0px" },
        "u1F60B": { "en": "Hungry", "zh": "馋", "tag": "\uD83D\uDE0B", "position": "-1750px 0px" },
        "u1F637": { "en": "Mask Face", "zh": "口罩", "tag": "\uD83D\uDE37", "position": "-725px 0px" },
        "u1F60E": { "en": "Sunglasses", "zh": "墨镜", "tag": "\uD83D\uDE0E", "position": "-1825px 0px" },
        "u1F634": { "en": "Sleeping", "zh": "睡眠", "tag": "\uD83D\uDE34", "position": "-650px 0px" },
        "u1F635": { "en": "Dizzy Face", "zh": "头晕眼花", "tag": "\uD83D\uDE35", "position": "-675px 0px" },
        "u1F632": { "en": "Shocked Face", "zh": "震惊", "tag": "\uD83D\uDE32", "position": "-600px 0px" },
        "u1F608": { "en": "Purple Devil", "zh": "小恶魔", "tag": "\uD83D\uDE08", "position": "-175px 0px" },
        "u1F47F": { "en": "Devil", "zh": "恶魔", "tag": "\uD83D\uDC7F", "position": "-1600px 0px" },
        "u1F62F": { "en": "Surprised Face", "zh": "惊呆", "tag": "\uD83D\uDE2F", "position": "-2100px 0px" },
        "u1F62C": { "en": "Grimacing Face", "zh": "扮鬼脸", "tag": "\uD83D\uDE2C", "position": "-2050px 0px" },
        "u1F615": { "en": "Confused", "zh": "困惑", "tag": "\uD83D\uDE15", "position": "-325px 0px" },
        "u1F636": { "en": "Mouthless", "zh": "无口", "tag": "\uD83D\uDE36", "position": "-700px 0px" },
        "u1F607": { "en": "Halo", "zh": "天使光环", "tag": "\uD83D\uDE07", "position": "-150px 0px" },
        "u1F60F": { "en": "Smirking Face", "zh": "傻笑", "tag": "\uD83D\uDE0F", "position": "-1850px 0px" },
        "u1F611": { "en": "Expressionless Face", "zh": "面无表情", "tag": "\uD83D\uDE11", "position": "-225px 0px" },
        "u1F648": { "en": "See No Monkey", "zh": "不看", "tag": "\uD83D\uDE48", "position": "-2675px 0px" },
        "u1F649": { "en": "Hear No Monkey", "zh": "不听", "tag": "\uD83D\uDE49", "position": "-2700px 0px" },
        "u1F64A": { "en": "No Speaking", "zh": "闭嘴", "tag": "\uD83D\uDE4A", "position": "-2125px 0px" },
        "u1F47D": { "en": "Alien", "zh": "外星人", "tag": "\uD83D\uDC7D", "position": "-1575px 0px" },
        "u1F4A9": { "en": "Pile Of Poo", "zh": "便便", "tag": "\uD83D\uDCA9", "position": "-1025px 0px" },
        "u1F494": { "en": "Broken Heart", "zh": "心碎", "tag": "\uD83D\uDC94", "position": "-2600px 0px" },
        "u1F525": { "en": "Fire", "zh": "火", "tag": "\uD83D\uDD25", "position": "-2625px 0px" },
        "u1F4A2": { "en": "Anger", "zh": "愤怒", "tag": "\uD83D\uDCA2", "position": "-950px 0px" },
        "u1F4A4": { "en": "Zzz", "zh": "ZZZ", "tag": "\uD83D\uDCA4", "position": "-1000px 0px" },
        "u1F6AB": { "en": "Prohibited", "zh": "禁止", "tag": "\uD83D\uDEAB", "position": "-1175px 0px" },
        "u2B50": { "en": "Star", "zh": "星星", "tag": "\u2B50", "position": "-2750px 0px" },
        "u26A1": { "en": "Lightning Bolt", "zh": "闪电", "tag": "\u26A1", "position": "-2825px 0px" },
        "u1F319": { "en": "Drescent Moon", "zh": "弯月", "tag": "\uD83C\uDF19", "position": "-2175px 0px" },
        "u2600": { "en": "Sunny", "zh": "晴朗", "tag": "\u2600", "position": "-3075px 0px" },
        "u26C5": { "en": "Cloudy", "zh": "多云", "tag": "\u26C5", "position": "-2900px 0px" },
        "u2601": { "en": "Cloud", "zh": "云彩", "tag": "\u2601", "position": "-3100px 0px" },
        "u2744": { "en": "Snowflake", "zh": "雪花", "tag": "\u2744", "position": "-3175px 0px" },
        "u2614": { "en": "Umbrella", "zh": "雨伞", "tag": "\u2614", "position": "-3125px 0px" },
        "u26C4": { "en": "Snowman", "zh": "雪人", "tag": "\u26C4", "position": "-2875px 0px" },
        "u1F44D": { "en": "Thumbs Up", "zh": "赞", "tag": "\uD83D\uDC4D", "position": "-1400px 0px" },
        "u1F44E": { "en": "Thumbs Down", "zh": "喝倒彩", "tag": "\uD83D\uDC4E", "position": "-1425px 0px" },
        "u1F91D": { "en": "Handshake", "zh": "握手", "tag": "\uD83E\uDD1D", "position": "-3200px 0px" },
        "u1F44C": { "en": "Ok Hand", "zh": "没问题", "tag": "\uD83D\uDC4C", "position": "-1375px 0px" },
        "u1F44A": { "en": "Raised Fist", "zh": "举起拳头", "tag": "\u270A", "position": "-2975px 0px" },
        "u270A": { "en": "Oncoming Fist", "zh": "击拳", "tag": "\uD83D\uDC4A", "position": "-1350px 0px" },
        "u270C": { "en": "Victory Hand", "zh": "耶", "tag": "\u270C", "position": "-3025px 0px" },
        "u270B": { "en": "Raised Hand", "zh": "举手", "tag": "\u270B", "position": "-3000px 0px" },
        "u1F64F": { "en": "Folded Hands", "zh": "祈祷", "tag": "\uD83D\uDE4F", "position": "-2150px 0px" },
        "u261D": { "en": "Pointing Up", "zh": "第一", "tag": "\u261D", "position": "-2925px 0px" },
        "u1F44F": { "en": "Clapping Hands", "zh": "鼓掌", "tag": "\uD83D\uDC4F", "position": "-1450px 0px" },
        "u1F4AA": { "en": "Flexed Biceps", "zh": "肌肉", "tag": "\uD83D\uDCAA", "position": "-1050px 0px" },
        "u1F46A": { "en": "Family", "zh": "家庭", "tag": "\uD83D\uDC6A", "position": "-1475px 0px" },
        "u1F46B": { "en": "Couple", "zh": "情侣", "tag": "\uD83D\uDC6B", "position": "-1500px 0px" },
        "u1F47C": { "en": "Baby Angel", "zh": "宝贝天使", "tag": "\uD83D\uDC7C", "position": "-1550px 0px" },
        "u1F434": { "en": "Horse", "zh": "马", "tag": "\uD83D\uDC34", "position": "-2475px 0px" },
        "u1F436": { "en": "Dog", "zh": "狗", "tag": "\uD83D\uDC36", "position": "-2500px 0px" },
        "u1F437": { "en": "Pig", "zh": "猪", "tag": "\uD83D\uDC37", "position": "-2525px 0px" },
        "u1F47B": { "en": "Ghost", "zh": "鬼", "tag": "\uD83D\uDC7B", "position": "-1525px 0px" },
        "u1F339": { "en": "Rose", "zh": "玫瑰", "tag": "\uD83C\uDF39", "position": "-2225px 0px" },
        "u1F33B": { "en": "Sunflower", "zh": "向日葵", "tag": "\uD83C\uDF3B", "position": "-1250px 0px" },
        "u1F332": { "en": "Pine Tree", "zh": "松树", "tag": "\uD83C\uDF32", "position": "-2200px 0px" },
        "u1F384": { "en": "Christmas Tree", "zh": "圣诞树", "tag": "\uD83C\uDF84", "position": "-2400px 0px" },
        "u1F381": { "en": "Wrapped Gift", "zh": "礼物", "tag": "\uD83C\uDF81", "position": "-2350px 0px" },
        "u1F389": { "en": "Party Popper", "zh": "聚会礼花", "tag": "\uD83C\uDF89", "position": "-2425px 0px" },
        "u1F4B0": { "en": "Money Bag", "zh": "钱袋", "tag": "\uD83D\uDCB0", "position": "-1075px 0px" },
        "u1F382": { "en": "Birthday Cake", "zh": "生日蛋糕", "tag": "\uD83C\uDF82", "position": "-2375px 0px" },
        "u1F356": { "en": "Barbecue", "zh": "BBQ", "tag": "\uD83C\uDF56", "position": "-2275px 0px" },
        "u1F35A": { "en": "Cooked Rice", "zh": "米饭", "tag": "\uD83C\uDF5A", "position": "-1275px 0px" },
        "u1F366": { "en": "Ice Cream", "zh": "冰淇淋", "tag": "\uD83C\uDF66", "position": "-2300px 0px" },
        "u1F36B": { "en": "Chocolate Bar", "zh": "巧克力", "tag": "\uD83C\uDF6B", "position": "-1300px 0px" },
        "u1F349": { "en": "Watermelon", "zh": "西瓜", "tag": "\uD83C\uDF49", "position": "-2250px 0px" },
        "u1F377": { "en": "Wine Glass", "zh": "红酒", "tag": "\uD83C\uDF77", "position": "-2325px 0px" },
        "u1F37B": { "en": "Cheers", "zh": "干杯", "tag": "\uD83C\uDF7B", "position": "-1325px 0px" },
        "u2615": { "en": "Coffee", "zh": "咖啡", "tag": "\u2615", "position": "-3150px 0px" },
        "u1F3C0": { "en": "Basketball", "zh": "篮球", "tag": "\uD83C\uDFC0", "position": "-825px 0px" },
        "u26BD": { "en": "Soccer Ball", "zh": "足球", "tag": "\u26BD", "position": "-2850px 0px" },
        "u1F3C2": { "en": "Snowboarder", "zh": "单板滑雪", "tag": "\uD83C\uDFC2", "position": "-850px 0px" },
        "u1F3A4": { "en": "Microphone", "zh": "麦克风", "tag": "\uD83C\uDFA4", "position": "-750px 0px" },
        "u1F3B5": { "en": "Musical Note", "zh": "音乐", "tag": "\uD83C\uDFB5", "position": "-800px 0px" },
        "u1F3B2": { "en": "Game Die", "zh": "骰子", "tag": "\uD83C\uDFB2", "position": "-775px 0px" },
        "u1F004": { "en": "Mahjong Red Dragon", "zh": "麻将", "tag": "\uD83C\uDC04", "position": "-900px 0px" },
        "u1F451": { "en": "Crown", "zh": "王冠", "tag": "\uD83D\uDC51", "position": "-2550px 0px" },
        "u1F484": { "en": "Lipstick", "zh": "口红", "tag": "\uD83D\uDC84", "position": "-2575px 0px" },
        "u1F48B": { "en": "Kiss", "zh": "吻", "tag": "\uD83D\uDC8B", "position": "-1650px 0px" },
        "u1F48D": { "en": "Ring", "zh": "戒指", "tag": "\uD83D\uDC8D", "position": "-1675px 0px" },
        "u1F4DA": { "en": "Books", "zh": "书籍", "tag": "\uD83D\uDCDA", "position": "-1100px 0px" },
        "u1F393": { "en": "Graduation Cap", "zh": "毕业帽", "tag": "\uD83C\uDF93", "position": "-2450px 0px" },
        "u270F": { "en": "Pencil", "zh": "铅笔", "tag": "\u270F", "position": "-3050px 0px" },
        "u1F3E1": { "en": "House With Garden", "zh": "房子", "tag": "\uD83C\uDFE1", "position": "-875px 0px" },
        "u1F6BF": { "en": "Shower", "zh": "淋浴", "tag": "\uD83D\uDEBF", "position": "-1200px 0px" },
        "u1F4A1": { "en": "Light Bulb", "zh": "灯泡", "tag": "\uD83D\uDCA1", "position": "-925px 0px" },
        "u1F4DE": { "en": "Telephone Receiver", "zh": "电话听筒", "tag": "\uD83D\uDCDE", "position": "-1125px 0px" },
        "u1F4E2": { "en": "Loudspeaker", "zh": "扩音器", "tag": "\uD83D\uDCE2", "position": "-1150px 0px" },
        "u1F556": { "en": "Clock", "zh": "表", "tag": "\uD83D\uDD56", "position": "-2650px 0px" },
        "u23F0": { "en": "Alarm Clock", "zh": "闹钟", "tag": "\u23F0", "position": "-2775px 0px" },
        "u23F3": { "en": "Hourglass", "zh": "沙漏", "tag": "\u23F3", "position": "-2800px 0px" },
        "u1F4A3": { "en": "Bomb", "zh": "炸弹", "tag": "\uD83D\uDCA3", "position": "-975px 0px" },
        "u1F52B": { "en": "Pistol", "zh": "手枪", "tag": "\uD83D\uDD2B", "position": "-1700px 0px" },
        "u1F48A": { "en": "Capsule", "zh": "药", "tag": "\uD83D\uDC8A", "position": "-1625px 0px" },
        "u1F680": { "en": "Rocket", "zh": "火箭", "tag": "\uD83D\uDE80", "position": "-2725px 0px" },
        "u1F30F": { "en": "Globe", "zh": "地球", "tag": "\uD83C\uDF0F", "position": "-1225px 0px" }
    };

    var Config = {
        url: getOnlineImagePath(),
        size: DefaultSize,
        lang: DefaultLang,
        reg: UnicodeReg
    };

    var Utils = {
        extend: function() {
            if (arguments.length === 0) {
                return;
            }
            var obj = arguments[0];
            for (var i = 1, len = arguments.length; i < len; i ++) {
                var other = arguments[i];
                for (var item in other) {
                    obj[item] = other[item];
                }
            }
            return obj;
        },
        filter: function(arr, func) {
            var array = [];
            for (var i = 0; i < arr.length; i++) {
                var value = arr[i];
                if (func(value)) {
                    array.push(value);
                }
            }
            return array;
        },
        cutString: function(string, start, length) {
            var array = [];
            for (var i = start; i < start + length; i++) {
                array.push(string.charAt(i));
            }
            return array.join('');
        },
        map: function(arr, func) {
            var tempArr = arr.concat([]);
            for (var i = 0; i < tempArr.length; i++) {
                var value = tempArr[i];
                if (func && typeof func === "function") {
                    tempArr[i] = func(value);
                }
            }
            return tempArr;
        },
        indexOf: function(array, value) {
            if (typeof array === "string") {
                for (var i = 0; i <= array.length - value.length; i++) {
                    var string = Utils.cutString(array, i, value.length);
                    if (array.charAt(i) == value.charAt(0) && Utils.cutString(array, i, value.length) == value) {
                        return i;
                    }
                }
            } else if (Object.prototype.toString.call(array) === '[object Array]') {
                for (var i = 0; i < array.length; i++) {
                    var item = array[i];
                    if (item == value) {
                        return i;
                    }
                }
            }
            return -1;
        },
        getDom: function(html) {
            var div = document.createElement("div");
            div.innerHTML = html;
            return div.childNodes[0];
        },
        render: function(temp, params) {
            return temp.replace(/\\?\{\{([^}]+)\}\}/g, function(match, name) {
                return params[name] != undefined ? params[name] : match;
            });
        }
    };

    var CheckParam = {
        getType: function(str) {
            /* IE下不准确问题 */
            if (str === undefined) {
                return "undefined";
            }
            if (str === null) {
                return "null";
            }
            var temp = Object.prototype.toString.call(str).toLowerCase();
            return temp.slice(8, temp.length - 1);
        },
        check: function(typeList, funcName, params) {
            params = params || [];
            var maxCount = typeList.length;
            if (params.length > maxCount) {
                params.length = maxCount;
            }
            for (var i = 0; i < typeList.length; i++) {
                var paramType = this.getType(params[i]);
                var sucType = typeList[i];
                if (!new RegExp(paramType).test(sucType)) {
                    var msgTemp = "第{{index}}个参数错误, 传入参数类型为: {{errType}}, 应传参数类型为: {{sucType}}, 错误所在位置为: {{funcName}}";
                    var msg = Utils.render(msgTemp, {
                        index: i + 1,
                        errType: paramType,
                        sucType: sucType,
                        funcName: funcName
                    });
                    console.error(msg);
                }
            }
        }
    };

    var init = function(option) {
        addBaseCss();
        option = option || {};
        Config = Utils.extend(Config, option);
        extendEmojis(option.extension);
        setEmojiReg();
        setEmojiList();
        adaptOldVersion();
    };

    /**
     * 将字符串中的原生emoji字符转化为 对应的文字标识
     * @param  {string} content 必填，需要转化的包含emoji的字符串
     * @param  {regExp} reg     可选，匹配的正则表达式
     * @param  {func} function  可选，emoji的显示方式
     * @return {string}         转化后的字符串
     */
    var emojiToSymbol = function(content, reg, func) {
        CheckParam.check(['string', 'regexp|null|undefined'], 'emojiToSymbol', arguments);
        content = unicodeToEmoji(content, reg);
        return content.replace(EmojiReg, function(tag) {
            var lang = Config.lang;
            var detail = getDetail('tag', tag);
            var symbol = detail ? '[' + detail[lang] + ']' : tag;
            return func ? func(symbol) : symbol;
        });
    };

    /**
     * 将字符串中的 对应文字标识 转化为原生emoji
     * @param  {string} text 必填 包含symbol的字符串
     * @param  {func} function  可选，emoji的显示方式
     * @return {string}
     */
    var symbolToEmoji = function(text, func) {
        CheckParam.check(['string'], 'symbolToEmoji', arguments);
        text = unicodeToEmoji(text);
        var emojiText = text.replace(/\[([^\[\]]+?)\]/g, function(symbol) {
            symbol = symbol.substr(1, symbol.length - 2);
            var lang = Config.lang;
            var detail = getDetail(lang, symbol);
            return detail ? detail.tag : '[' + symbol + ']';
        });
        return emojiText.replace(EmojiReg, function(tag) {
            return func ? func(tag) : tag;
        });
    };

    /**
     * 将字符串中的原生emoji字符转化为html标签
     * @param  {string} content 必填，包含原生emoji字符的字符串
     * @param  {int} sizePx     可选，html标签的大小
     * @param  {string} reg     可选，正则表达式
     * @param  {func} function  可选，emoji的显示方式
     * @return {string}         转化后，包含emoji背景的span标签
     */
    var emojiToHTML = function(content, sizePx, reg, func) {
        CheckParam.check(["string", "number|null|undefined", "regexp|null|undefined"], "emojiToHTML", arguments);
        content = unicodeToEmoji(content, reg);
        var htmlContent = content.replace(EmojiReg, function(tag) {
            var html = getHTMLByEmoji(tag, sizePx);
            return html || tag;
        });
        return htmlContent.replace(EmojiReg, function(tag) {
            return func ? func(tag) : tag;
        });
    };

    /**
     * 将字符串中的 对应文字标识 转化为html标签
     * @param  {string} text 必填，包含symbol的字符串
     * @param  {int} sizePx    可选，html标签的大小
     * @param  {string} reg    可选，正则表达式
     * @param  {func} function  可选，emoji的显示方式
     * @return {span标签}       转化后，包含emoji背景的span标签
     */
    var symbolToHTML = function(text, sizePx, reg, func) {
        CheckParam.check(["string", "number|null|undefined", "regexp|null|undefined"], "symbolToHTML", arguments);
        var emojiText = text.replace(/\[([^\[\]]+?)\]/g, function(symbol) {
            var text = symbolToEmoji(symbol);
            return emojiToHTML(text, sizePx, reg);
        });
        return emojiText.replace(EmojiReg, function(tag) {
            return func ? func(tag) : tag;
        });
    };

    function getDetail(key, value) {
        for (var unicode in EmojiFactory) {
            var detail = EmojiFactory[unicode];
            if (detail[key] === value) {
                return detail;
            }
        }
    }

    function getHTMLByEmoji(emoji, sizePx) {
        for (var key in EmojiFactory) {
            var detail = EmojiFactory[key];
            if (detail.tag === emoji) {
                return getEmojiHTML(detail, sizePx);
            }
        }
        return false;
    }

    function getEmojiHTML(item, sizePx) {
        var size = sizePx || Config.size;
        var position = getBgPosition(item.position, size);
        if (isIE8) {
            position = item.position;
            size = Config.size;
        }
        var emojiObj = {
            size: size,
            position: position,
            background: item.background || Config.url,
            name: item[Config.lang],
            tag: item.tag
        };
        var style = "width: {{size}}px; height: {{size}}px; line-height: {{size}}px; background-image: url({{background}}); background-position: {{position}}; background-size: auto {{size}}px; overflow: hidden; vertical-align: middle; font-size: 0 !important;";
        var spanTpl = "<span class='rong-emoji-content' name='[{{name}}]' style='{{style}}'></span>"
        spanTpl = Utils.render(spanTpl, { style: style });
        return Utils.render(spanTpl, emojiObj);
    }

    function getBgPosition(position, sizePx) {
        var size = sizePx || Config.size;
        var baseSize = isIE8 ? 24 : 25;
        var scale = size / baseSize;
        position = position.split(" ");
        var x = position[0], y = position[1];
        x = x ? x.split("px")[0] : 0;
        y = y ? y.split("px")[0] : 0;
        var positionTpl = '{{x}}px {{y}}px';
        return Utils.render(positionTpl, {
            x: parseInt(x) * scale,
            y: parseInt(y) * scale
        });
    }

    /**
     * 将字符串中的unicode码转化为可以显示的原生emoji字符
     * @param  {string} content 必填，需要转化的包含emoji的字符串
     * @param  {regExp} reg      可选，标识unicode码的匹配范围
     * @return {string}          转化后的字符串
     */
    function unicodeToEmoji(content, reg) {
        reg = reg || Config.reg;
        return content.replace(reg, function(unicode) {
            return calculateUTF(unicode);
        });
    }

    function calculateUTF(char) {
        var unicodes = escape(char).split('%u');
        unicodes = Utils.filter(unicodes, function(code) {
            return code !== '';
        });
        unicodes = Utils.map(unicodes, function(code) {
            var startWithF = Utils.indexOf(code, 'f') === 0 || Utils.indexOf(code, 'F') === 0;
            var isFE0F = code === 'FE0F' || code === 'fe0f';
            if (startWithF && !isFE0F) {
                return '0x1' + code;
            }
            return '0x' + code;
        });
        return String.RongFromCodePoint(unicodes);
    }

    function extendEmojis(extension) {
        CheckParam.check(['object|undefined'], 'init', arguments);
        if (!extension) {
            return;
        }
        var dataSource = extension.dataSource;
        var url = extension.url || Config.url;
        for (var key in dataSource) {
            var detail = dataSource[key];
            EmojiFactory[key] = detail;
            EmojiFactory[key].background = url;
        }
    }

    function setEmojiList() {
        EmojiList.length = 0;
        for (var unicode in EmojiFactory) {
            var detail = EmojiFactory[unicode];
            if (detail.tag) {
                var lang = Config.lang;
                var html = getHTMLByEmoji(detail.tag);
                var node = Utils.getDom(html);
                var symbol = detail[lang];
                EmojiList.push({
                    unicode: unicode,
                    symbol: '[' + symbol + ']',
                    emoji: detail.tag,
                    node: node
                });
            }
        }
    }

    function setEmojiReg() {
        var reg = [];
        for (var key in EmojiFactory) {
            var detail = EmojiFactory[key];
            reg.push(detail.tag);
        }
        reg = reg.join('|');
        EmojiReg = new RegExp(reg, 'g');
    }

    function getOnlineImagePath() {
        var getPath = function(path) {
            var protocol = document.location.protocol;
            var isFileProtocol = protocol === 'file:';
            return isFileProtocol ? 'http:' + path : path;
        };
        var normalImgPath = getPath(NornalImagePath);
        var hdImgPath = getPath(HdImagePath);
        return isIE8 ? normalImgPath : hdImgPath;
    }

    function isSupportEmoji() {
        var getTextFeature = function(text, color) {
            try {
                var canvas = document.createElement("canvas");
                canvas.width = 20;
                canvas.height = 20;
                var ctx = canvas.getContext("2d");
                ctx.textBaseline = "top";
                ctx.font = "20px sans-serif";
                ctx.fillStyle = color;
                ctx.fillText(text, 0, 0);
                var imageData = ctx.getImageData(0, 0, 20, 20).data;
                var imageDataArr = [];
                for (var i = 0; i < imageData.length; i++) {
                    imageDataArr[i] = imageData[i];
                }
                var totalColor = 0;
                for (var i = 0; i < imageDataArr.length; i++) {
                    totalColor += imageDataArr[i];
                }
                var hasColor = totalColor > 0;
                return hasColor ? imageDataArr.toString() : false;
            } catch (e) {
                return false;
            }
        };
        var testEmoji = "😁";
        var mode = getTextFeature(testEmoji, "#000");
        if (mode) {
            var otherEmoji = "😨";
            var colorFeatrue = getTextFeature(testEmoji, "#FFF");
            var otherFeature = getTextFeature(otherEmoji, "#000");
            //为相同emoji添加不同色, 判断两次上色是否相同, 如果相同, 说明emoji以图片渲染, 支持
            var isSameColor = mode && mode === colorFeatrue;
            //为不同emoji添加相同色, 判断两次上色是否不同, 如果不同, 说明emoji以字符渲染, 支持
            var isDiffColor = mode && mode !== otherFeature;
            return isSameColor || isDiffColor;
        } else {
            return false;
        }
    }

    function addBaseCss() {
        var baseCss = ".rong-emoji-content { display: inline-block; overflow: hidden; font-size: 20px !important; text-align: center; vertical-align: middle; overflow: hidden;}";
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
    }

    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias,   fromCodePoint兼容 */
      (function() {
        var defineProperty = (function() {
          // IE 8 only supports `Object.defineProperty` on DOM elements
          try {
            var object = {};
            var $defineProperty = Object.defineProperty;
            var result = $defineProperty(object, object, object) && $defineProperty;
          } catch(error) {}
          return result;
        }());
        var stringFromCharCode = String.fromCharCode;
        var floor = Math.floor;
        var RongFromCodePoint = function(codeList) {
          var MAX_SIZE = 0x4000;
          var codeUnits = [];
          var highSurrogate;
          var lowSurrogate;
          var index = -1;
          var length = codeList.length || [];
          if (!length) {
            return '';
          }
          var result = '';
          while (++index < length) {
            var codePoint = Number(codeList[index]);
            if (
              !isFinite(codePoint) ||       // `NaN`, `+Infinity`, or `-Infinity`
              codePoint < 0 ||              // not a valid Unicode code point
              codePoint > 0x10FFFF ||       // not a valid Unicode code point
              floor(codePoint) != codePoint // not an integer
            ) {
              throw RangeError('Invalid code point: ' + codePoint);
            }
            if (codePoint <= 0xFFFF) { // BMP code point
              codeUnits.push(codePoint);
            } else { // Astral code point; split in surrogate halves
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              codePoint -= 0x10000;
              highSurrogate = (codePoint >> 10) + 0xD800;
              lowSurrogate = (codePoint % 0x400) + 0xDC00;
              codeUnits.push(highSurrogate, lowSurrogate);
            }
            if (index + 1 == length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        };
        if (defineProperty) {
          defineProperty(String, 'RongFromCodePoint', {
            'value': RongFromCodePoint,
            'configurable': true,
            'writable': true
          });
        } else {
          String.RongFromCodePoint = RongFromCodePoint;
        }
      }());

    function adaptOldVersion() {
        _export.emojis = Utils.map(EmojiList, function(item) {
            var unicode = item.unicode;
            var emojiDetail = EmojiFactory[unicode];
            var zh = emojiDetail.zh;
            var en = emojiDetail.en;
            var position = emojiDetail.position;
            en = en.replace(' ', '_').toLowerCase();
            var oldVersionStyle = "height: 24px; width: 24px; display: inline-block; font-size: 20px !important; text-align: center; vertical-align: middle;overflow: hidden; line-height: 24px;";
            var oldVersionBHtml = "<b style='width: 24px; height: 24px; display: inline-block; background-image: url({{url}}); background-position: {{position}}'></b>";
            oldVersionBHtml = Utils.render(oldVersionBHtml, {
                url: NornalImagePath,
                position: position
            });
            var oldVersionHtml = "<span name='[{{zh}}]' class='RongIMExpression_{{en}}' style='{{style}}'>{{b}}</span>"
            oldVersionHtml = Utils.render(oldVersionHtml, {
                zh: zh,
                en: en,
                b: oldVersionBHtml,
                style: oldVersionStyle
            });
            var spanHTML = "<span>" + oldVersionHtml + "</span>";
            return Utils.getDom(spanHTML);
        });
        _export.name = (function() {
            var names = [];
            for (var key in EmojiFactory) {
                var value = EmojiFactory[key];
                var data = {};
                for (var i = 0; i < SupportLangs.length; i++) {
                    var lang = SupportLangs[i];
                    data[lang] = value[lang];
                }
                names.push(data);
            }
            return names;
        })();
        _export.data = Utils.map(EmojiList, function(item) {
            var data;
            for (var key in EmojiFactory) {
                var detail = EmojiFactory[key];
                if (detail.tag === item.emoji) {
                    data = detail;
                    detail.html = item.node;
                }
            }
            return data;
        });
    }

    return Utils.extend(_export, {
        isSupportEmoji: isSupportEmoji,

        init: init,
        list: EmojiList,
        emojiToSymbol: emojiToSymbol,
        symbolToEmoji: symbolToEmoji,
        emojiToHTML: emojiToHTML,
        symbolToHTML: symbolToHTML
    });
});