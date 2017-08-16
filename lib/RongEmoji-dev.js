"use strict";

/*
CMD规范: https://github.com/seajs/seajs/issues/242
AMD规范: https://github.com/amdjs/amdjs-api/wiki/AMD
requirejs: http://requirejs.org/docs/whyamd.html
*/

;(function (global, factory) {
    if(typeof exports === 'object' && typeof module !== 'undefined'){
        module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
        define(factory);
    }else{
        window.RongIMLib = window.RongIMLib || {};
        window.RongIMLib.RongIMEmoji = factory();
    }
})(window, function(){
    var emojis = [];
    var names = [];
    var emojiFactory = {
        "u1F600": { "en": "grinning", "zh": "\u5927\u7B11", "tag": "\uD83D\uDE00", "bp": "0px 0px" },
        "u1F601": { "en": "grin", "zh": "\u9732\u9F7F\u800C\u7B11", "tag": "\uD83D\uDE01", "bp": "-25px 0px" },
        "u1F602": { "en": "joy", "zh": "\u6B22\u4E50", "tag": "\uD83D\uDE02", "bp": "-50px 0px" },
        "u1F603": { "en": "smile", "zh": "\u5FAE\u7B11", "tag": "\uD83D\uDE03", "bp": "-75px 0px" },
        "u1F605": { "en": "sweat_smile", "zh": "\u8D54\u7B11", "tag": "\uD83D\uDE05", "bp": "-100px 0px" },
        "u1F606": { "en": "satisfied", "zh": "\u6EE1\u610F", "tag": "\uD83D\uDE06", "bp": "-125px 0px" },
        "u1F607": { "en": "innocent", "zh": "\u65E0\u8F9C", "tag": "\uD83D\uDE07", "bp": "-150px 0px" },
        "u1F608": { "en": "smiling_imp", "zh": "\u574F\u7B11", "tag": "\uD83D\uDE08", "bp": "-175px 0px" },
        "u1F609": { "en": "wink", "zh": "\u7728\u773C", "tag": "\uD83D\uDE09", "bp": "-200px 0px" },
        "u1F611": { "en": "expressionless", "zh": "\u9762\u65E0\u8868\u60C5", "tag": "\uD83D\uDE11", "bp": "-225px 0px" },
        "u1F612": { "en": "unamused", "zh": "\u4E00\u8138\u4E0D\u5FEB", "tag": "\uD83D\uDE12", "bp": "-250px 0px" },
        "u1F613": { "en": "sweat", "zh": "\u6C57", "tag": "\uD83D\uDE13", "bp": "-275px 0px" },
        "u1F614": { "en": "pensive", "zh": "\u54C0\u601D", "tag": "\uD83D\uDE14", "bp": "-300px 0px" },
        "u1F615": { "en": "confused", "zh": "\u8FF7\u832B", "tag": "\uD83D\uDE15", "bp": "-325px 0px" },
        "u1F616": { "en": "confounded", "zh": "\u56F0\u60D1\u7684", "tag": "\uD83D\uDE16", "bp": "-350px 0px" },
        "u1F618": { "en": "kissing_heart", "zh": "\u4EB2\u4E00\u4E2A", "tag": "\uD83D\uDE18", "bp": "-375px 0px" },
        "u1F621": { "en": "rage", "zh": "\u6124\u6012", "tag": "\uD83D\uDE21", "bp": "-400px 0px" },
        "u1F622": { "en": "cry", "zh": "\u54ED", "tag": "\uD83D\uDE22", "bp": "-2075px 0px" },
        "u1F623": { "en": "persevere", "zh": "\u4F7F\u52B2", "tag": "\uD83D\uDE23", "bp": "-450px 0px" },
        "u1F624": { "en": "triumph", "zh": "\u751F\u6C14", "tag": "\uD83D\uDE24", "bp": "-475px 0px" },
        "u1F628": { "en": "fearful", "zh": "\u53EF\u6015", "tag": "\uD83D\uDE28", "bp": "-500px 0px" },
        "u1F629": { "en": "weary", "zh": "\u538C\u5026", "tag": "\uD83D\uDE29", "bp": "-525px 0px" },
        "u1F630": { "en": "cold_sweat", "zh": "\u51B7\u6C57", "tag": "\uD83D\uDE30", "bp": "-550px 0px" },
        "u1F631": { "en": "scream", "zh": "\u60CA\u53EB", "tag": "\uD83D\uDE31", "bp": "-575px 0px" },
        "u1F632": { "en": "astonished", "zh": "\u60CA\u8BB6", "tag": "\uD83D\uDE32", "bp": "-600px 0px" },
        "u1F633": { "en": "flushed", "zh": "\u5446\u4F4F", "tag": "\uD83D\uDE33", "bp": "-625px 0px" },
        "u1F634": { "en": "sleeping", "zh": "\u7761\u7720", "tag": "\uD83D\uDE34", "bp": "-650px 0px" },
        "u1F635": { "en": "dizzy_face", "zh": "\u65AD\u7535\u4E86", "tag": "\uD83D\uDE35", "bp": "-675px 0px" },
        "u1F636": { "en": "no_mouth", "zh": "\u65E0\u53E3", "tag": "\uD83D\uDE36", "bp": "-700px 0px" },
        "u1F637": { "en": "mask", "zh": "\u75C5\u4E86", "tag": "\uD83D\uDE37", "bp": "-725px 0px" },
        "u1F3A4": { "en": "microphone", "zh": "KTV", "tag": "\uD83C\uDFA4", "bp": "-750px 0px" },
        "u1F3B2": { "en": "game_die", "zh": "\u8272\u5B50", "tag": "\uD83C\uDFB2", "bp": "-775px 0px" },
        "u1F3B5": { "en": "musical_note", "zh": "\u97F3\u4E50", "tag": "\uD83C\uDFB5", "bp": "-800px 0px" },
        "u1F3C0": { "en": "basketball", "zh": "\u7BEE\u7403", "tag": "\uD83C\uDFC0", "bp": "-825px 0px" },
        "u1F3C2": { "en": "snowboarder", "zh": "\u5355\u677F\u6ED1\u96EA", "tag": "\uD83C\uDFC2", "bp": "-850px 0px" },
        "u1F3E1": { "en": "house_with_garden", "zh": "\u623F\u5B50", "tag": "\uD83C\uDFE1", "bp": "-875px 0px" },
        "u1F004": { "en": "mahjong", "zh": "\u9EBB\u5C06", "tag": "\uD83C\uDC04", "bp": "-900px 0px" },
        "u1F4A1": { "en": "bulb", "zh": "\u706F\u6CE1", "tag": "\uD83D\uDCA1", "bp": "-925px 0px" },
        "u1F4A2": { "en": "anger", "zh": "\u7206\u7B4B", "tag": "\uD83D\uDCA2", "bp": "-950px 0px" },
        "u1F4A3": { "en": "bomb", "zh": "\u70B8\u5F39", "tag": "\uD83D\uDCA3", "bp": "-975px 0px" },
        "u1F4A4": { "en": "zzz", "zh": "ZZZ", "tag": "\uD83D\uDCA4", "bp": "-1000px 0px" },
        "u1F4A9": { "en": "shit", "zh": "\u72D7\u5C41", "tag": "\uD83D\uDCA9", "bp": "-1025px 0px" },
        "u1F4AA": { "en": "muscle", "zh": "\u808C\u8089", "tag": "\uD83D\uDCAA", "bp": "-1050px 0px" },
        "u1F4B0": { "en": "moneybag", "zh": "\u94B1\u888B", "tag": "\uD83D\uDCB0", "bp": "-1075px 0px" },
        "u1F4DA": { "en": "books", "zh": "\u4E66\u7C4D", "tag": "\uD83D\uDCDA", "bp": "-1100px 0px" },
        "u1F4DE": { "en": "telephone_receiver", "zh": "\u7535\u8BDD", "tag": "\uD83D\uDCDE", "bp": "-1125px 0px" },
        "u1F4E2": { "en": "loudspeaker", "zh": "\u6269\u97F3\u5668", "tag": "\uD83D\uDCE2", "bp": "-1150px 0px" },
        "u1F6AB": { "en": "stop", "zh": "\u505C\u6B62", "tag": "\uD83D\uDEAB", "bp": "-1175px 0px" },
        "u1F6BF": { "en": "shower", "zh": "\u6DCB\u6D74", "tag": "\uD83D\uDEBF", "bp": "-1200px 0px" },
        "u1F30F": { "en": "earth_asia", "zh": "\u571F", "tag": "\uD83C\uDF0F", "bp": "-1225px 0px" },
        "u1F33B": { "en": "sunflower", "zh": "\u5411\u65E5\u8475", "tag": "\uD83C\uDF3B", "bp": "-1250px 0px" },
        "u1F35A": { "en": "rice", "zh": "\u996D", "tag": "\uD83C\uDF5A", "bp": "-1275px 0px" },
        "u1F36B": { "en": "chocolate_bar", "zh": "\u5DE7\u514B\u529B", "tag": "\uD83C\uDF6B", "bp": "-1300px 0px" },
        "u1F37B": { "en": "beers", "zh": "\u5564\u9152", "tag": "\uD83C\uDF7B", "bp": "-1325px 0px" },
        "u270A": { "en": "fist", "zh": "\u62F3\u5934", "tag": "\u270A", "bp": "-1350px 0px" },
        "u1F44C": { "en": "ok_hand", "zh": "\u6CA1\u95EE\u9898", "tag": "\uD83D\uDC4C", "bp": "-1375px 0px" },
        "u1F44D": { "en": "1", "zh": "1", "tag": "\uD83D\uDC4D", "bp": "-1400px 0px" },
        "u1F44E": { "en": "-1", "zh": "-1", "tag": "\uD83D\uDC4E", "bp": "-1425px 0px" },
        "u1F44F": { "en": "clap", "zh": "\u62CD", "tag": "\uD83D\uDC4F", "bp": "-1450px 0px" },
        "u1F46A": { "en": "family", "zh": "\u5BB6\u5EAD", "tag": "\uD83D\uDC6A", "bp": "-1475px 0px" },
        "u1F46B": { "en": "couple", "zh": "\u60C5\u4FA3", "tag": "\uD83D\uDC6B", "bp": "-1500px 0px" },
        "u1F47B": { "en": "ghost", "zh": "\u9B3C", "tag": "\uD83D\uDC7B", "bp": "-2050px 0px" },
        "u1F62C": { "en": "grimacing", "zh": "\u9B3C\u8138", "tag": "\uD83D\uDE2C", "bp": "-1525px 0px" },
        "u1F47C": { "en": "angel", "zh": "\u5929\u4F7F", "tag": "\uD83D\uDC7C", "bp": "-1550px 0px" },
        "u1F47D": { "en": "alien", "zh": "\u5916\u661F\u4EBA", "tag": "\uD83D\uDC7D", "bp": "-1575px 0px" },
        "u1F47F": { "en": "imp", "zh": "\u6076\u9B54", "tag": "\uD83D\uDC7F", "bp": "-1600px 0px" },
        "u1F48A": { "en": "pill", "zh": "\u836F", "tag": "\uD83D\uDC8A", "bp": "-1625px 0px" },
        "u1F48B": { "en": "kiss", "zh": "\u543B", "tag": "\uD83D\uDC8B", "bp": "-1650px 0px" },
        "u1F48D": { "en": "ring", "zh": "\u6212\u6307", "tag": "\uD83D\uDC8D", "bp": "-1675px 0px" },
        "u1F52B": { "en": "gun", "zh": "\u67AA", "tag": "\uD83D\uDD2B", "bp": "-1700px 0px" },
        "u1F60A": { "en": "blush", "zh": "\u8138\u7EA2", "tag": "\uD83D\uDE0A", "bp": "-1725px 0px" },
        "u1F60B": { "en": "yum", "zh": "\u998B", "tag": "\uD83D\uDE0B", "bp": "-1750px 0px" },
        "u1F60C": { "en": "relieved", "zh": "\u5B89\u5FC3", "tag": "\uD83D\uDE0C", "bp": "-1775px 0px" },
        "u1F60D": { "en": "heart_eyes", "zh": "\u8272\u8272", "tag": "\uD83D\uDE0D", "bp": "-1800px 0px" },
        "u1F60E": { "en": "sunglasses", "zh": "\u58A8\u955C", "tag": "\uD83D\uDE0E", "bp": "-1825px 0px" },
        "u1F60F": { "en": "smirk", "zh": "\u50BB\u7B11", "tag": "\uD83D\uDE0F", "bp": "-1850px 0px" },
        "u1F61A": { "en": "kissing_closed_eyes", "zh": "\u63A5\u543B", "tag": "\uD83D\uDE1A", "bp": "-1875px 0px" },
        "u1F61C": { "en": "stuck_out_tongue_winking_eye", "zh": "\u641E\u602A", "tag": "\uD83D\uDE1C", "bp": "-1900px 0px" },
        "u1F61D": { "en": "stuck_out_tongue_closed_eyes", "zh": "\u6076\u4F5C\u5267", "tag": "\uD83D\uDE1D", "bp": "-1925px 0px" },
        "u1F61E": { "en": "disappointed", "zh": "\u5931\u671B\u7684", "tag": "\uD83D\uDE1E", "bp": "-1950px 0px" },
        "u1F61F": { "en": "anguished", "zh": "\u82E6\u6DA9", "tag": "\uD83D\uDE1F", "bp": "-1975px 0px" },
        "u1F62A": { "en": "sleepy", "zh": "\u56F0", "tag": "\uD83D\uDE2A", "bp": "-2000px 0px" },
        "u1F62B": { "en": "tired_face", "zh": "\u6293\u72C2", "tag": "\uD83D\uDE2B", "bp": "-2025px 0px" },
        "u1F62D": { "en": "sob", "zh": "\u54ED\u6CE3", "tag": "\uD83D\uDE2D", "bp": "-425px 0px" },
        "u1F62F": { "en": "hushed", "zh": "\u5BC2\u9759", "tag": "\uD83D\uDE2F", "bp": "-2100px 0px" },
        "u1F64A": { "en": "speak_no_evil", "zh": "\u4E0D\u8BF4\u8BDD", "tag": "\uD83D\uDE4A", "bp": "-2125px 0px" },
        "u1F64F": { "en": "pray", "zh": "\u7948\u7977", "tag": "\uD83D\uDE4F", "bp": "-2150px 0px" },
        "u1F319": { "en": "moon", "zh": "\u6708\u4EAE", "tag": "\uD83C\uDF19", "bp": "-2175px 0px" },
        "u1F332": { "en": "evergreen_tree", "zh": "\u6811", "tag": "\uD83C\uDF32", "bp": "-2200px 0px" },
        "u1F339": { "en": "rose", "zh": "\u73AB\u7470", "tag": "\uD83C\uDF39", "bp": "-2225px 0px" },
        "u1F349": { "en": "watermelon", "zh": "\u897F\u74DC", "tag": "\uD83C\uDF49", "bp": "-2250px 0px" },
        "u1F356": { "en": "meat_on_bone", "zh": "\u8089", "tag": "\uD83C\uDF56", "bp": "-2275px 0px" },
        "u1F366": { "en": "icecream", "zh": "\u51B0\u6DC7\u6DCB", "tag": "\uD83C\uDF66", "bp": "-2300px 0px" },
        "u1F377": { "en": "wine_glass", "zh": "\u9152", "tag": "\uD83C\uDF77", "bp": "-2325px 0px" },
        "u1F381": { "en": "gift", "zh": "\u793C\u7269", "tag": "\uD83C\uDF81", "bp": "-2350px 0px" },
        "u1F382": { "en": "birthday", "zh": "\u751F\u65E5", "tag": "\uD83C\uDF82", "bp": "-2375px 0px" },
        "u1F384": { "en": "christmas_tree", "zh": "\u5723\u8BDE", "tag": "\uD83C\uDF84", "bp": "-2400px 0px" },
        "u1F389": { "en": "tada", "zh": "\u793C\u82B1", "tag": "\uD83C\uDF89", "bp": "-2425px 0px" },
        "u1F393": { "en": "mortar_board", "zh": "\u6BD5\u4E1A", "tag": "\uD83C\uDF93", "bp": "-2450px 0px" },
        "u1F434": { "en": "horse", "zh": "\u9A6C", "tag": "\uD83D\uDC34", "bp": "-2475px 0px" },
        "u1F436": { "en": "dog", "zh": "\u72D7", "tag": "\uD83D\uDC36", "bp": "-2500px 0px" },
        "u1F437": { "en": "pig", "zh": "\u732A", "tag": "\uD83D\uDC37", "bp": "-2525px 0px" },
        "u1F451": { "en": "crown", "zh": "\u738B\u51A0", "tag": "\uD83D\uDC51", "bp": "-2550px 0px" },
        "u1F484": { "en": "lipstick", "zh": "\u53E3\u7EA2", "tag": "\uD83D\uDC84", "bp": "-2575px 0px" },
        "u1F494": { "en": "broken_heart", "zh": "\u4F24\u5FC3", "tag": "\uD83D\uDC94", "bp": "-2600px 0px" },
        "u1F525": { "en": "fire", "zh": "\u706B\u4E86", "tag": "\uD83D\uDD25", "bp": "-2625px 0px" },
        "u1F556": { "en": "time", "zh": "\u65F6\u95F4", "tag": "\uD83D\uDD56", "bp": "-2650px 0px" },
        "u1F648": { "en": "see_no_evil", "zh": "\u4E0D\u770B", "tag": "\uD83D\uDE48", "bp": "-2675px 0px" },
        "u1F649": { "en": "hear_no_evil", "zh": "\u4E0D\u542C", "tag": "\uD83D\uDE49", "bp": "-2700px 0px" },
        "u1F680": { "en": "rocket", "zh": "\u706B\u7BAD", "tag": "\uD83D\uDE80", "bp": "-2725px 0px" },
        "u2B50": { "en": "star", "zh": "\u661F\u661F", "tag": "\u2B50", "bp": "-2750px 0px" },
        "u23F0": { "en": "alarm_clock", "zh": "\u949F\u8868", "tag": "\u23F0", "bp": "-2775px 0px" },
        "u23F3": { "en": "hourglass_flowing_sand", "zh": "\u6C99\u6F0F", "tag": "\u23F3", "bp": "-2800px 0px" },
        "u26A1": { "en": "zap", "zh": "\u95EA\u7535", "tag": "\u26A1", "bp": "-2825px 0px" },
        "u26BD": { "en": "soccer", "zh": "\u8DB3\u7403", "tag": "\u26BD", "bp": "-2850px 0px" },
        "u26C4": { "en": "snowman", "zh": "\u96EA\u4EBA", "tag": "\u26C4", "bp": "-2875px 0px" },
        "u26C5": { "en": "partly_sunny", "zh": "\u591A\u4E91", "tag": "\u26C5", "bp": "-2900px 0px" },
        "u261D": { "en": "point_up", "zh": "\u7B2C\u4E00", "tag": "\u261D", "bp": "-2925px 0px" },
        "u263A": { "en": "relaxed", "zh": "\u8F7B\u677E", "tag": "\u263A", "bp": "-2950px 0px" },
        "u1F44A": { "en": "punch", "zh": "\u62F3", "tag": "\uD83D\uDC4A", "bp": "-2975px 0px" },
        "u270B": { "en": "hand", "zh": "\u624B", "tag": "\u270B", "bp": "-3000px 0px" },
        "u270C": { "en": "v", "zh": "v", "tag": "\u270C", "bp": "-3025px 0px" },
        "u270F": { "en": "pencil2", "zh": "\u7B14", "tag": "\u270F", "bp": "-3050px 0px" },
        "u2600": { "en": "sunny", "zh": "\u6674\u6717", "tag": "\u2600", "bp": "-3075px 0px" },
        "u2601": { "en": "cloud", "zh": "\u4E91", "tag": "\u2601", "bp": "-3100px 0px" },
        "u2614": { "en": "umbrella", "zh": "\u4F1E", "tag": "\u2614", "bp": "-3125px 0px" },
        "u2615": { "en": "coffee", "zh": "\u5496\u5561", "tag": "\u2615", "bp": "-3150px 0px" },
        "u2744": { "en": "snowflake", "zh": "\u96EA\u82B1", "tag": "\u2744", "bp": "-3175px 0px" }
    };
    var size = 24;
    var url = "//cdn.ronghub.com/css-sprite_bg-2.1.10.png";
    
    var regExpTag,regExpName;

    //初始化CSS
    var initCSS = function () {
        if (!document.createStyleSheet) {
            var head = document.getElementsByTagName("head")[0] || document.createElement("head");
            var style = document.createElement("style");
            style.type = "text/css";
            style.innerHTML = ".RC_Expression {width:" + size + "px;height:" + size + "px;background-image:url(" + url + ");display:inline-block}";
            head.appendChild(style);
        }
    };

    var createBTag = function (data) {
        var e = document.createElement("b");
        if (document.createStyleSheet) {
            e.style.width = size + "px";
            e.style.height = size + "px";
            e.style.backgroundImage = "url(" + data.bg || url + ")";
            e.style.display = "inline-block";
            e.style.zoom = "1";
            e.style.backgroundPosition = data.bp;
        }
        else {
            e.className = "RC_Expression";
            e.style.backgroundPosition = data.bp;
            if(data.bg){
                e.style.backgroundImage = data.bg;
            }
        }
        return e;
    };
    
    var createSpan = function (emojiObj) {
        var span = document.createElement("span");
        var p = document.createElement("span");
        span.setAttribute("style", "height: " + size + "px; width: " + size + "px; display: inline-block; font-size: 20px !important; text-align: center; vertical-align: middle;overflow: hidden; line-height: " + size + "px;");
   
        var img = createBTag(emojiObj);
        span.appendChild(img);

        span.setAttribute("class", "RongIMExpression_" + emojiObj.en.substring(1, emojiObj.en.length));
        span.setAttribute("name", "[" + emojiObj.zh + "]");
        p.appendChild(span);
        return p;
    };

    var calculateUTF = function (d) {
        if (61440 < d.charCodeAt(0)) {
            var b = emojiFactory[escape(d).replace("%u", "u1")];
            if (b){
                return b.tag;
            }
        }
        return d;
    };

    /*
    emoji = {
        dataSource:{
              "u1F600":{"en":"grinning","zh":"\u72DE\u7B11","tag":"\uD83D\uDE00","bp":"0px 0px"},
              "u1F602":{"en":"joy","zh":"\u6B22\u4E50","tag":"\uD83D\uDE02","bp":"-44px 0px"}},
        url:"/cdn.ronghub.com/emoji.png"
    };
    */ 
    var init = function (emoji,config) {
        config = config || {};
        size = config.size || size;
        url = config.url || url;

        if (emoji) {
            var _emojiFactory = emoji.dataSource;
            var _url = emoji.url || url;
            for(var key in _emojiFactory){
                _emojiFactory[key]["bg"] = _url;
                emojiFactory[key] = _emojiFactory[key];
            }
        }
        
        initCSS();
        
        var regExp = new RegExp("%", "g");
        var tagStr = "";
        var nameStr = "";
        for (var key in emojiFactory) {
            tagStr += escape(emojiFactory[key].tag) + "|";
            nameStr += escape(emojiFactory[key].zh) + "|";
            emojis.push(createSpan(emojiFactory[key]));
            names.push(emojiFactory[key].zh);
        }
        tagStr = tagStr.substring(0, tagStr.length - 1);
        tagStr = tagStr.replace(regExp, function (x) { return "\\"; });
        
        regExpTag = new RegExp("(" + tagStr + ")", "g");
        nameStr = nameStr.substring(0, nameStr.length - 1);
        nameStr = nameStr.replace(regExp, function (x) { return "\\"; });
        regExpName = new RegExp("(" + nameStr + ")", "g");
    };
    
    var emojiToSymbol = function (str) {
        str = str.replace(/[\uf000-\uf700]/g, function (em) {
            return calculateUTF(em) || em;
        });
        return str.replace(regExpTag, function (em) {
            for (var key in emojiFactory) {
                if (emojiFactory[key].tag == em) {
                    return "[" + emojiFactory[key].zh + "]";
                }
            }
        });
    };

    /**
     * 获取Emoji对象 发送消息使用
     * @param  {string}     name  emoji名称
     */
    var symbolToEmoji = function (str) {
        return str.replace(/\[.+?\]/g, function (s) {
            var temp = s.slice(1, s.length - 1), tStr = temp;
            if (regExpName.test(temp) && tStr.replace(regExpName) == 'undefined') {
                return temp.replace(regExpName, function (zh) {
                    for (var key in emojiFactory) {
                        if (emojiFactory[key].zh == zh) {
                            return emojiFactory[key].tag;
                        }
                    }
                });
            }
            else {
                return "[" + temp + "]";
            }
        });
    };

    /**
     * @param  {string} str 字符串
     */
    var symbolToHTML = function (str) {
        var em = symbolToEmoji(str);
        return emojiToHTML(em);
    };

    /**
     * 转换字符串中的emoji 接收消息使用
     * @param  {string} str      包含emoji的字符串
     */
    var emojiToHTML = function (str) {
        str = str.replace(/[\uf000-\uf700]/g, function (em) {
            return calculateUTF(em) || em;
        });
        return str.replace(regExpTag, function (em) {
            var span;
            for (var key in emojiFactory) {
                if (emojiFactory[key].tag == em) {
                    span = createSpan(emojiFactory[key]);
                    break;
                }
            }
            return span.innerHTML;
        });
    };
    
    return {
        init : init,
        emojis : emojis,
        names : names,
        emojiToSymbol : emojiToSymbol,
        symbolToEmoji : symbolToEmoji,
        emojiToHTML : emojiToHTML,
        symbolToHTML : symbolToHTML
    };
});