;(function (global, factory) {
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
    /* 所有emoji转化为span组成的数组 */
    var emojiHtmls = []; 
    /* 所有emoji的名称，语言为init中设置的语言 */
    var emojiSymbols = [];
    /* 所有emoji的具体信息，包括tag, en, zh, name, html */
    var emojiDetails = [];

    var emojiFactory = {
        "u1F600": { "en": "grinning_face", "zh": "笑嘻嘻", "tag": "\uD83D\uDE00", "position": "0px 0px" },
        "u1F601": { "en": "grinning_with_smiling", "zh": "露齿而笑", "tag": "\uD83D\uDE01", "position": "-25px 0px" },
        "u1F602": { "en": "laughing_tears", "zh": "喜极而泣", "tag": "\uD83D\uDE02", "position": "-50px 0px" },
        "u1F603": { "en": "smiley_face", "zh": "笑脸", "tag": "\uD83D\uDE03", "position": "-75px 0px" },
        "u1F605": { "en": "happy_sweat", "zh": "尴尬", "tag": "\uD83D\uDE05", "position": "-100px 0px" },
        "u1F606": { "en": "big_grin", "zh": "大笑", "tag": "\uD83D\uDE06", "position": "-125px 0px" },
        "u1F607": { "en": "halo", "zh": "天使光环", "tag": "\uD83D\uDE07", "position": "-150px 0px" },
        "u1F608": { "en": "purple_devil", "zh": "小恶魔", "tag": "\uD83D\uDE08", "position": "-175px 0px" },
        "u1F609": { "en": "winking_face", "zh": "眨眼", "tag": "\uD83D\uDE09", "position": "-200px 0px" },
        "u1F611": { "en": "expressionless_face", "zh": "面无表情", "tag": "\uD83D\uDE11", "position": "-225px 0px" },
        "u1F612": { "en": "dissatisfied", "zh": "不满", "tag": "\uD83D\uDE12", "position": "-250px 0px" },
        "u1F613": { "en": "sweat", "zh": "汗", "tag": "\uD83D\uDE13", "position": "-275px 0px" },
        "u1F614": { "en": "pensive", "zh": "沉思", "tag": "\uD83D\uDE14", "position": "-300px 0px" },
        "u1F615": { "en": "confused", "zh": "困惑", "tag": "\uD83D\uDE15", "position": "-325px 0px" },
        "u1F616": { "en": "confounded_face", "zh": "蒙羞", "tag": "\uD83D\uDE16", "position": "-350px 0px" },
        "u1F618": { "en": "blowing_kiss", "zh": "飞吻", "tag": "\uD83D\uDE18", "position": "-375px 0px" },
        "u1F621": { "en": "angry_face", "zh": "愤怒", "tag": "\uD83D\uDE21", "position": "-400px 0px" },
        "u1F622": { "en": "crying", "zh": "伤心", "tag": "\uD83D\uDE22", "position": "-2075px 0px" },
        "u1F623": { "en": "helpless_face", "zh": "无助", "tag": "\uD83D\uDE23", "position": "-450px 0px" },
        "u1F624": { "en": "mad_face", "zh": "生气", "tag": "\uD83D\uDE24", "position": "-475px 0px" },
        "u1F628": { "en": "fearful_face", "zh": "可怕", "tag": "\uD83D\uDE28", "position": "-500px 0px" },
        "u1F629": { "en": "weary_face", "zh": "疲惫", "tag": "\uD83D\uDE29", "position": "-525px 0px" },
        "u1F630": { "en": "cold_sweat", "zh": "冷汗", "tag": "\uD83D\uDE30", "position": "-550px 0px" },
        "u1F631": { "en": "scream", "zh": "尖叫", "tag": "\uD83D\uDE31", "position": "-575px 0px" },
        "u1F632": { "en": "shocked_face", "zh": "震惊", "tag": "\uD83D\uDE32", "position": "-600px 0px" },
        "u1F633": { "en": "flushed_face", "zh": "脸红", "tag": "\uD83D\uDE33", "position": "-625px 0px" },
        "u1F634": { "en": "sleeping", "zh": "睡眠", "tag": "\uD83D\uDE34", "position": "-650px 0px" },
        "u1F635": { "en": "dizzy_face", "zh": "头晕眼花", "tag": "\uD83D\uDE35", "position": "-675px 0px" },
        "u1F636": { "en": "mouthless", "zh": "无口", "tag": "\uD83D\uDE36", "position": "-700px 0px" },
        "u1F637": { "en": "mask_face", "zh": "口罩", "tag": "\uD83D\uDE37", "position": "-725px 0px" },
        "u1F3A4": { "en": "microphone", "zh": "麦克风", "tag": "\uD83C\uDFA4", "position": "-750px 0px" },
        "u1F3B2": { "en": "game_die", "zh": "骰子", "tag": "\uD83C\uDFB2", "position": "-775px 0px" },
        "u1F3B5": { "en": "musical_note", "zh": "音乐", "tag": "\uD83C\uDFB5", "position": "-800px 0px" },
        "u1F3C0": { "en": "basketball", "zh": "篮球", "tag": "\uD83C\uDFC0", "position": "-825px 0px" },
        "u1F3C2": { "en": "snowboarder", "zh": "单板滑雪", "tag": "\uD83C\uDFC2", "position": "-850px 0px" },
        "u1F3E1": { "en": "house_with_garden", "zh": "房子", "tag": "\uD83C\uDFE1", "position": "-875px 0px" },
        "u1F004": { "en": "mahjong_red_dragon", "zh": "麻将", "tag": "\uD83C\uDC04", "position": "-900px 0px" },
        "u1F4A1": { "en": "light_bulb", "zh": "灯泡", "tag": "\uD83D\uDCA1", "position": "-925px 0px" },
        "u1F4A2": { "en": "anger", "zh": "愤怒", "tag": "\uD83D\uDCA2", "position": "-950px 0px" },
        "u1F4A3": { "en": "bomb", "zh": "炸弹", "tag": "\uD83D\uDCA3", "position": "-975px 0px" },
        "u1F4A4": { "en": "zzz", "zh": "ZZZ", "tag": "\uD83D\uDCA4", "position": "-1000px 0px" },
        "u1F4A9": { "en": "pile_of_poo", "zh": "便便", "tag": "\uD83D\uDCA9", "position": "-1025px 0px" },
        "u1F4AA": { "en": "flexed_biceps", "zh": "肌肉", "tag": "\uD83D\uDCAA", "position": "-1050px 0px" },
        "u1F4B0": { "en": "money_bag", "zh": "钱袋", "tag": "\uD83D\uDCB0", "position": "-1075px 0px" },
        "u1F4DA": { "en": "books", "zh": "书籍", "tag": "\uD83D\uDCDA", "position": "-1100px 0px" },
        "u1F4DE": { "en": "telephone_receiver", "zh": "电话听筒", "tag": "\uD83D\uDCDE", "position": "-1125px 0px" },
        "u1F4E2": { "en": "loudspeaker", "zh": "扩音器", "tag": "\uD83D\uDCE2", "position": "-1150px 0px" },
        "u1F6AB": { "en": "prohibited", "zh": "禁止", "tag": "\uD83D\uDEAB", "position": "-1175px 0px" },
        "u1F6BF": { "en": "shower", "zh": "淋浴", "tag": "\uD83D\uDEBF", "position": "-1200px 0px" },
        "u1F30F": { "en": "globe", "zh": "地球", "tag": "\uD83C\uDF0F", "position": "-1225px 0px" },
        "u1F33B": { "en": "sunflower", "zh": "向日葵", "tag": "\uD83C\uDF3B", "position": "-1250px 0px" },
        "u1F35A": { "en": "cooked_rice", "zh": "米饭", "tag": "\uD83C\uDF5A", "position": "-1275px 0px" },
        "u1F36B": { "en": "chocolate_bar", "zh": "巧克力", "tag": "\uD83C\uDF6B", "position": "-1300px 0px" },
        "u1F37B": { "en": "cheers", "zh": "干杯", "tag": "\uD83C\uDF7B", "position": "-1325px 0px" },
        "u270A": { "en": "oncoming_fist", "zh": "拳头", "tag": "\u270A", "position": "-1350px 0px" },
        "u1F44C": { "en": "ok_hand", "zh": "没问题", "tag": "\uD83D\uDC4C", "position": "-1375px 0px" },
        "u1F44D": { "en": "thumbs_up", "zh": "赞", "tag": "\uD83D\uDC4D", "position": "-1400px 0px" },
        "u1F44E": { "en": "thumbs_down", "zh": "喝倒彩", "tag": "\uD83D\uDC4E", "position": "-1425px 0px" },
        "u1F44F": { "en": "clapping_hands", "zh": "鼓掌", "tag": "\uD83D\uDC4F", "position": "-1450px 0px" },
        "u1F46A": { "en": "family", "zh": "家庭", "tag": "\uD83D\uDC6A", "position": "-1475px 0px" },
        "u1F46B": { "en": "couple", "zh": "情侣", "tag": "\uD83D\uDC6B", "position": "-1500px 0px" },
        "u1F62C": { "en": "grimacing_face", "zh": "扮鬼脸", "tag": "\uD83D\uDE2C", "position": "-2050px 0px" },
        "u1F47B": { "en": "ghost", "zh": "鬼", "tag": "\uD83D\uDC7B", "position": "-1525px 0px" },
        "u1F47C": { "en": "baby_angel", "zh": "宝贝天使", "tag": "\uD83D\uDC7C", "position": "-1550px 0px" },
        "u1F47D": { "en": "alien", "zh": "外星人", "tag": "\uD83D\uDC7D", "position": "-1575px 0px" },
        "u1F47F": { "en": "devil", "zh": "恶魔", "tag": "\uD83D\uDC7F", "position": "-1600px 0px" },
        "u1F48A": { "en": "capsule", "zh": "药", "tag": "\uD83D\uDC8A", "position": "-1625px 0px" },
        "u1F48B": { "en": "kiss", "zh": "吻", "tag": "\uD83D\uDC8B", "position": "-1650px 0px" },
        "u1F48D": { "en": "ring", "zh": "戒指", "tag": "\uD83D\uDC8D", "position": "-1675px 0px" },
        "u1F52B": { "en": "pistol", "zh": "手枪", "tag": "\uD83D\uDD2B", "position": "-1700px 0px" },
        "u1F60A": { "en": "lovely", "zh": "可爱", "tag": "\uD83D\uDE0A", "position": "-1725px 0px" },
        "u1F60B": { "en": "hungry", "zh": "馋", "tag": "\uD83D\uDE0B", "position": "-1750px 0px" },
        "u1F60C": { "en": "pleased", "zh": "满意", "tag": "\uD83D\uDE0C", "position": "-1775px 0px" },
        "u1F60D": { "en": "heart_eyes", "zh": "色迷迷", "tag": "\uD83D\uDE0D", "position": "-1800px 0px" },
        "u1F60E": { "en": "sunglasses", "zh": "墨镜", "tag": "\uD83D\uDE0E", "position": "-1825px 0px" },
        "u1F60F": { "en": "smirking_face", "zh": "傻笑", "tag": "\uD83D\uDE0F", "position": "-1850px 0px" },
        "u1F61A": { "en": "kiss_face", "zh": "么么哒", "tag": "\uD83D\uDE1A", "position": "-1875px 0px" },
        "u1F61C": { "en": "crazy_face", "zh": "调皮", "tag": "\uD83D\uDE1C", "position": "-1900px 0px" },
        "u1F61D": { "en": "tongue_out", "zh": "吐舌头", "tag": "\uD83D\uDE1D", "position": "-1925px 0px" },
        "u1F61E": { "en": "disappointed_face", "zh": "失望", "tag": "\uD83D\uDE1E", "position": "-1950px 0px" },
        "u1F61F": { "en": "worried_face", "zh": "苦瓜脸", "tag": "\uD83D\uDE1F", "position": "-1975px 0px" },
        "u1F62A": { "en": "sleepy_face", "zh": "困", "tag": "\uD83D\uDE2A", "position": "-2000px 0px" },
        "u1F62B": { "en": "tired_face", "zh": "抓狂", "tag": "\uD83D\uDE2B", "position": "-2025px 0px" },
        "u1F62D": { "en": "sobbing", "zh": "哭泣", "tag": "\uD83D\uDE2D", "position": "-425px 0px" },
        "u1F62F": { "en": "surprised_face", "zh": "惊呆", "tag": "\uD83D\uDE2F", "position": "-2100px 0px" },
        "u1F64A": { "en": "no_speaking", "zh": "闭嘴", "tag": "\uD83D\uDE4A", "position": "-2125px 0px" },
        "u1F64F": { "en": "folded_hands", "zh": "祈祷", "tag": "\uD83D\uDE4F", "position": "-2150px 0px" },
        "u1F319": { "en": "crescent_moon", "zh": "弯月", "tag": "\uD83C\uDF19", "position": "-2175px 0px" },
        "u1F332": { "en": "pine_tree", "zh": "松树", "tag": "\uD83C\uDF32", "position": "-2200px 0px" },
        "u1F339": { "en": "rose", "zh": "玫瑰", "tag": "\uD83C\uDF39", "position": "-2225px 0px" },
        "u1F349": { "en": "watermelon", "zh": "西瓜", "tag": "\uD83C\uDF49", "position": "-2250px 0px" },
        "u1F356": { "en": "barbecue", "zh": "BBQ", "tag": "\uD83C\uDF56", "position": "-2275px 0px" },
        "u1F366": { "en": "ice_cream", "zh": "冰淇淋", "tag": "\uD83C\uDF66", "position": "-2300px 0px" },
        "u1F377": { "en": "wine_glass", "zh": "红酒", "tag": "\uD83C\uDF77", "position": "-2325px 0px" },
        "u1F381": { "en": "wrapped_gift", "zh": "礼物", "tag": "\uD83C\uDF81", "position": "-2350px 0px" },
        "u1F382": { "en": "birthday_cake", "zh": "生日蛋糕", "tag": "\uD83C\uDF82", "position": "-2375px 0px" },
        "u1F384": { "en": "christmas_tree", "zh": "圣诞树", "tag": "\uD83C\uDF84", "position": "-2400px 0px" },
        "u1F389": { "en": "party_popper", "zh": "聚会礼花", "tag": "\uD83C\uDF89", "position": "-2425px 0px" },
        "u1F393": { "en": "graduation_cap", "zh": "毕业帽", "tag": "\uD83C\uDF93", "position": "-2450px 0px" },
        "u1F434": { "en": "horse", "zh": "马", "tag": "\uD83D\uDC34", "position": "-2475px 0px" },
        "u1F436": { "en": "dog", "zh": "狗", "tag": "\uD83D\uDC36", "position": "-2500px 0px" },
        "u1F437": { "en": "pig", "zh": "猪", "tag": "\uD83D\uDC37", "position": "-2525px 0px" },
        "u1F451": { "en": "crown", "zh": "王冠", "tag": "\uD83D\uDC51", "position": "-2550px 0px" },
        "u1F484": { "en": "lipstick", "zh": "口红", "tag": "\uD83D\uDC84", "position": "-2575px 0px" },
        "u1F494": { "en": "broken_heart", "zh": "心碎", "tag": "\uD83D\uDC94", "position": "-2600px 0px" },
        "u1F525": { "en": "fire", "zh": "火", "tag": "\uD83D\uDD25", "position": "-2625px 0px" },
        "u1F556": { "en": "clock", "zh": "表", "tag": "\uD83D\uDD56", "position": "-2650px 0px" },
        "u1F648": { "en": "see_no_monkey", "zh": "不看", "tag": "\uD83D\uDE48", "position": "-2675px 0px" },
        "u1F649": { "en": "hear_no_monkey", "zh": "不听", "tag": "\uD83D\uDE49", "position": "-2700px 0px" },
        "u1F680": { "en": "rocket", "zh": "火箭", "tag": "\uD83D\uDE80", "position": "-2725px 0px" },
        "u2B50": { "en": "star", "zh": "星星", "tag": "\u2B50", "position": "-2750px 0px" },
        "u23F0": { "en": "alarm_clock", "zh": "闹钟", "tag": "\u23F0", "position": "-2775px 0px" },
        "u23F3": { "en": "hourglass", "zh": "沙漏", "tag": "\u23F3", "position": "-2800px 0px" },
        "u26A1": { "en": "lightning_bolt", "zh": "闪电", "tag": "\u26A1", "position": "-2825px 0px" },
        "u26BD": { "en": "soccer_ball", "zh": "足球", "tag": "\u26BD", "position": "-2850px 0px" },
        "u26C4": { "en": "snowman", "zh": "雪人", "tag": "\u26C4", "position": "-2875px 0px" },
        "u26C5": { "en": "cloudy", "zh": "多云", "tag": "\u26C5", "position": "-2900px 0px" },
        "u261D": { "en": "pointing_up", "zh": "第一", "tag": "\u261D", "position": "-2925px 0px" },
        "u263A": { "en": "smiling", "zh": "微笑", "tag": "\u263A", "position": "-2950px 0px" },
        "u1F44A": { "en": "raised_fist", "zh": "举拳", "tag": "\uD83D\uDC4A", "position": "-2975px 0px" },
        "u270B": { "en": "raised_hand", "zh": "举手", "tag": "\u270B", "position": "-3000px 0px" },
        "u270C": { "en": "victory_hand", "zh": "耶", "tag": "\u270C", "position": "-3025px 0px" },
        "u270F": { "en": "pencil", "zh": "铅笔", "tag": "\u270F", "position": "-3050px 0px" },
        "u2600": { "en": "sunny", "zh": "晴朗", "tag": "\u2600", "position": "-3075px 0px" },
        "u2601": { "en": "cloud", "zh": "云彩", "tag": "\u2601", "position": "-3100px 0px" },
        "u2614": { "en": "umbrella", "zh": "雨伞", "tag": "\u2614", "position": "-3125px 0px" },
        "u2615": { "en": "coffee", "zh": "咖啡", "tag": "\u2615", "position": "-3150px 0px" },
        "u2744": { "en": "snowflake", "zh": "雪花", "tag": "\u2744", "position": "-3175px 0px" }
    };

    // config
    var configs = {
        url: "//cdn.ronghub.com/css-sprite_bg-2.1.10.png",
        size: 24,
        lang: "zh",
        reg: /[\uf000-\uf700]/g
    };

    var supportLanguage = [ "en" ,"zh" ];

    /* 用于 emoji 正则匹配 */
    var regExpTag;

    /* 判断是否支持emoji的渲染 */
    var isSupportEmoji = (function() {
        var node = document.createElement("canvas");
        if (!node.getContext || !node.getContext("2d") || typeof node.getContext("2d").fillText !== "function") {
            return false;
        }
        var ctx = node.getContext("2d");
        ctx.textBaseline = "top";
        ctx.font = "32px Arial";
        ctx.fillText('\ud83d\ude03', 0, 0);
        return ctx.getImageData(16, 16, 1, 1).data[0] !== 0;
    })();

    /**
     * 初始化
     * @param  {object} emoji  可选，包含dataSource和url。 dataSource包含扩展的表情信息, key为标识表情的unicode码
     * @param  {object} config 可选，包括size, lang, url, regExp 四个可选属性。分别表示html大小，输出语言，图片背景图，匹配unicode码的正则表达式
     */
    var init = function(newEmojis, opt) {
        addBaseCss();

        configs = extend(configs, opt);

        var newEmojiFactory = getNewEmojiFactory(newEmojis, configs);
        emojiFactory = extend(emojiFactory, newEmojiFactory);

        setupEmojiRegExp(emojiFactory);
    };

    var extend = function() {
        if (arguments.length === 0) {
            return;
        }
        var obj = arguments[0];
        for (var i = 1, len = arguments.length; i < len; i++) {
            var other = arguments[i];
            for (var item in other) {
                obj[item] = other[item];
            }
        }
        return obj;
    }

    var addBaseCss = function() {
        var baseCss = ".rong-emoji-content { display: inline-block; overflow: hidden; font-size: 20px !important; text-align: center; vertical-align: middle; overflow: hidden; }"
        var head = document.getElementsByTagName("head")[0];
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML = baseCss;
        head.appendChild(style);
    }

    var getNewEmojiFactory = function(newEmojis, opt) {
        var newEmojiFactory = {};
        if (newEmojis) {
            var _emojiFactory = newEmojis.dataSource;
            var _url = newEmojis.url || opt.url;
            for (var key in _emojiFactory) {
                _emojiFactory[key]["background"] = _url;
                newEmojiFactory[key] = _emojiFactory[key];
            }
        }
        return newEmojiFactory;
    }

    var setupEmojiRegExp = function(emojiFac ,tagReg) {
        emojiSymbols.length = 0;
        emojiHtmls.length = 0;

        var tags = [];
        var lang = configs.lang;
        for (var key in emojiFac) {
            var emoji = emojiFac[key];
            tags.push(escape(emoji.tag));
            setupEmojiDetail(emoji);
        }
        tags = tags.join("|");
        var regExp = new RegExp("%", "g");
        tags = tags.replace(regExp, function (x) { return "\\"; });
        regExpTag = new RegExp("(" + tags + ")", "g");
    };

    function setupEmojiDetail(emoji) {
        var lang = configs.lang;
        var span = createSpan(emoji);
        emojiSymbols.push(emoji[lang]);
        emojiHtmls.push(getDom(span));
        emojiDetails.push({
            name: "[" + emoji[lang] + "]",
            tag: emoji.tag,
            zh: emoji.zh,
            en: emoji.en,
            html: span
        });
    }

    function getDom(html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.childNodes[0];
    }

    var computeBgPosition = function(position, sizePx) {
        var sizePx = sizePx || configs.size;
        var scale = sizePx / 24;
        var position = position.split(' ');
        var x = position[0], y = position[1];
        x = x.split("px")[0];
        y = y.split("px")[0];
        return parseInt(x) * scale + "px " + parseInt(y) * scale + "px";
    }

    var getEmojiHtml = function(object) {
        var style = "width: {{size}}px; height: {{size}}px; line-height: {{size}}px; background-image: url({{background}}); background-position: {{position}}; background-size: auto {{size}}px;";
        var spanTpl = "<span class='rong-emoji-content' name='[{{name}}]' style='" + style + "''></span>"
        var ret = spanTpl.replace(/\\?\{\{([^}]+)\}\}/g, function(match, name) {
            return object[name];
        })
        return ret;
    };

    var createSpan = function(emojiDetail, sizePx) {
        var emojiObj = {
            size: sizePx || configs.size,
            position: computeBgPosition(emojiDetail.position, sizePx),
            background: emojiDetail.background || configs.url,
            name: emojiDetail[configs.lang],
            tag: emojiDetail.tag
        };
        return getEmojiHtml(emojiObj);
    };

    var calculateUTF = function (nativeEmoji) {
        if (61440 < nativeEmoji.charCodeAt(0)) {
            var emojiUnicodeKey = escape(nativeEmoji).replace("%u", "u1");
            var emoji = emojiFactory[emojiUnicodeKey];
            if (emoji){
                return emoji.tag;
            }
        }
        return nativeEmoji;
    };

    var getEmojiBySymbol = function(symbol) {
        var temp = symbol.slice(1, symbol.length - 1);
        for (var i = 0; i < emojiDetails.length; i++) {
            var lang = configs.lang;
            var emoji = emojiDetails[i];
            if(emoji[lang] === temp) {
                return emoji.tag;
            }
        }
        return "[" + symbol + "]";
    };


    /**
     * 将字符串中的unicode码转化为可以显示的原生emoji字符
     * @param  {string} emoji 必填，需要转化的字符串
     * @param  {regExp} reg      可选，标识unicode码的匹配范围。默认为init时设置的regExp，如果不设置，默认为/[\uf000-\uf700]/g
     * @return {string}          转化后的字符串
     */
    var emojiDecode = function(emojis, reg) {
        reg = reg || configs.reg;
        return emojis.replace(reg, function(emoji) {
            return calculateUTF(emoji) || emoji;
        });
    };

    /**
     * 将字符串中的原生emoji字符转化为 对应的文字标识
     * @param  {string} emojis 必填，需要转化的字符串
     * @param  {regExp} reg      可选，匹配的正则表达式
     * @return {string}          转化后的字符串
     */
    var emojiToSymbol = function(emojis, reg) {
        emojis = emojiDecode(emojis, reg);
        var emojiSymbol = {};
        emojiSymbol = emojis.replace(regExpTag, function(emojiTag) {
            var lang = configs.lang;
            for (var emojiKey in emojiFactory) {
                if (emojiFactory[emojiKey].tag == emojiTag) {
                    return "[" + emojiFactory[emojiKey][lang] + "]";
                }
            }
        });
        return emojiSymbol;
    };

    /**
     * 将字符串中的 对应文字标识 转化为原生emoji
     * @param  {string} symbols 必填
     * @return {string}           
     */
    var symbolToEmoji = function(symbols) {
        return symbols.replace(/\[([^\[\]]+?)\]/g, function(symbol) {
            return getEmojiBySymbol(symbol);
        });
    };

    /**
     * 将字符串中的原生emoji字符转化为html标签
     * @param  {string} emojiStr 必填，包含原生emoji字符的字符串
     * @param  {int} sizePx      可选，html标签的大小
     * @param  {string} reg      可选，正则表达式
     * @return {span标签}         转化后，包含emoji背景的span标签
     */
    var emojiToHTML = function(emojis, sizePx, reg) {
        emojis = emojiDecode(emojis, reg);
        return emojis.replace(regExpTag, function(emojiTag) {
            var span;
            for (var key in emojiFactory) {
                if (emojiFactory[key].tag == emojiTag) {
                    span = createSpan(emojiFactory[key], sizePx);
                    break;
                }
            }
            return span;
        });
    };

    /**
     * 将字符串中的 对应文字标识 转化为html标签
     * @param  {string} symbol 必填，包含symbol的字符串
     * @param  {int} sizePx    可选，html标签的大小
     * @param  {string} reg    可选，正则表达式
     * @return {span标签}       转化后，包含emoji背景的span标签
     */
    var symbolToHTML = function(symbol, sizePx, reg) {
        var emoji = symbolToEmoji(symbol);
        return emojiToHTML(emoji, sizePx, reg);
    };

    /**
     * 获取所有emoji的详情
     * @return {array} 包含多个object，每个object包括tag, en, zh, name, html
     */
    var getAllEmoji = function() {
        return emojiDetails;
    };



    return {
        init: init,
        supportLanguage: supportLanguage,
        emojis: emojiHtmls,
        names: emojiSymbols,
        getAllEmoji: getAllEmoji,
        emojiToSymbol: emojiToSymbol,
        symbolToEmoji: symbolToEmoji,
        emojiToHTML: emojiToHTML,
        symbolToHTML: symbolToHTML,
        messageDecode: emojiDecode,
        isSupportEmoji: isSupportEmoji
    }
});