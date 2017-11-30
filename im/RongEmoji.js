;(function(global, factory) {
    "use strict";
    if (typeof exports === "object" && typeof module !== undefined) {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define(factory);
    } else {
        window.RongIMLib = window.RongIMLib || {};
        window.RongIMLib.RongIMEmoji = factory();
    }
})(window, function() {
    var emojiFactory = {
        "u1F600": { "en": "Grinning Face", "zh": "笑嘻嘻", "tag": "\uD83D\uDE00", "position": "0px 0px" },
        "u1F601": { "en": "Grinning With Smiling", "zh": "露齿而笑", "tag": "\uD83D\uDE01", "position": "-25px 0px" },
        "u1F602": { "en": "Laughing Tears", "zh": "喜极而泣", "tag": "\uD83D\uDE02", "position": "-50px 0px" },
        "u1F603": { "en": "Smiley Face", "zh": "笑脸", "tag": "\uD83D\uDE03", "position": "-75px 0px" },
        "u1F605": { "en": "Happy Sweat", "zh": "尴尬", "tag": "\uD83D\uDE05", "position": "-100px 0px" },
        "u1F606": { "en": "Big Grin", "zh": "大笑", "tag": "\uD83D\uDE06", "position": "-125px 0px" },
        "u1F607": { "en": "Halo", "zh": "天使光环", "tag": "\uD83D\uDE07", "position": "-150px 0px" },
        "u1F608": { "en": "Purple Devil", "zh": "小恶魔", "tag": "\uD83D\uDE08", "position": "-175px 0px" },
        "u1F609": { "en": "Winking Face", "zh": "眨眼", "tag": "\uD83D\uDE09", "position": "-200px 0px" },
        "u1F611": { "en": "Expressionless Face", "zh": "面无表情", "tag": "\uD83D\uDE11", "position": "-225px 0px" },
        "u1F612": { "en": "Dissatisfied", "zh": "不满", "tag": "\uD83D\uDE12", "position": "-250px 0px" },
        "u1F613": { "en": "Sweat", "zh": "汗", "tag": "\uD83D\uDE13", "position": "-275px 0px" },
        "u1F614": { "en": "Pensive", "zh": "沉思", "tag": "\uD83D\uDE14", "position": "-300px 0px" },
        "u1F615": { "en": "Confused", "zh": "困惑", "tag": "\uD83D\uDE15", "position": "-325px 0px" },
        "u1F616": { "en": "Confounded Face", "zh": "蒙羞", "tag": "\uD83D\uDE16", "position": "-350px 0px" },
        "u1F618": { "en": "Blowing Kiss", "zh": "飞吻", "tag": "\uD83D\uDE18", "position": "-375px 0px" },
        "u1F621": { "en": "Angry Face", "zh": "生气", "tag": "\uD83D\uDE21", "position": "-400px 0px" },
        "u1F622": { "en": "Sobbing", "zh": "哭泣", "tag": "\uD83D\uDE2D", "position": "-2075px 0px" },
        "u1F623": { "en": "Helpless Face", "zh": "无助", "tag": "\uD83D\uDE23", "position": "-450px 0px" },
        "u1F624": { "en": "Mad Face", "zh": "怒气冲冲", "tag": "\uD83D\uDE24", "position": "-475px 0px" },
        "u1F628": { "en": "Fearful Face", "zh": "可怕", "tag": "\uD83D\uDE28", "position": "-500px 0px" },
        "u1F629": { "en": "Weary Face", "zh": "疲惫", "tag": "\uD83D\uDE29", "position": "-525px 0px" },
        "u1F630": { "en": "Cold Sweat", "zh": "冷汗", "tag": "\uD83D\uDE30", "position": "-550px 0px" },
        "u1F631": { "en": "Scream", "zh": "尖叫", "tag": "\uD83D\uDE31", "position": "-575px 0px" },
        "u1F632": { "en": "Shocked Face", "zh": "震惊", "tag": "\uD83D\uDE32", "position": "-600px 0px" },
        "u1F633": { "en": "Flushed Face", "zh": "脸红", "tag": "\uD83D\uDE33", "position": "-625px 0px" },
        "u1F634": { "en": "Sleeping", "zh": "睡眠", "tag": "\uD83D\uDE34", "position": "-650px 0px" },
        "u1F635": { "en": "Dizzy Face", "zh": "头晕眼花", "tag": "\uD83D\uDE35", "position": "-675px 0px" },
        "u1F636": { "en": "Mouthless", "zh": "无口", "tag": "\uD83D\uDE36", "position": "-700px 0px" },
        "u1F637": { "en": "Mask Face", "zh": "口罩", "tag": "\uD83D\uDE37", "position": "-725px 0px" },
        "u1F3A4": { "en": "Microphone", "zh": "麦克风", "tag": "\uD83C\uDFA4", "position": "-750px 0px" },
        "u1F3B2": { "en": "Game Die", "zh": "骰子", "tag": "\uD83C\uDFB2", "position": "-775px 0px" },
        "u1F3B5": { "en": "Musical Note", "zh": "音乐", "tag": "\uD83C\uDFB5", "position": "-800px 0px" },
        "u1F3C0": { "en": "Basketball", "zh": "篮球", "tag": "\uD83C\uDFC0", "position": "-825px 0px" },
        "u1F3C2": { "en": "Snowboarder", "zh": "单板滑雪", "tag": "\uD83C\uDFC2", "position": "-850px 0px" },
        "u1F3E1": { "en": "House With Garden", "zh": "房子", "tag": "\uD83C\uDFE1", "position": "-875px 0px" },
        "u1F004": { "en": "Mahjong Red Dragon", "zh": "麻将", "tag": "\uD83C\uDC04", "position": "-900px 0px" },
        "u1F4A1": { "en": "Light Bulb", "zh": "灯泡", "tag": "\uD83D\uDCA1", "position": "-925px 0px" },
        "u1F4A2": { "en": "Anger", "zh": "愤怒", "tag": "\uD83D\uDCA2", "position": "-950px 0px" },
        "u1F4A3": { "en": "Bomb", "zh": "炸弹", "tag": "\uD83D\uDCA3", "position": "-975px 0px" },
        "u1F4A4": { "en": "Zzz", "zh": "ZZZ", "tag": "\uD83D\uDCA4", "position": "-1000px 0px" },
        "u1F4A9": { "en": "Pile Of Poo", "zh": "便便", "tag": "\uD83D\uDCA9", "position": "-1025px 0px" },
        "u1F4AA": { "en": "Flexed Biceps", "zh": "肌肉", "tag": "\uD83D\uDCAA", "position": "-1050px 0px" },
        "u1F4B0": { "en": "Money Bag", "zh": "钱袋", "tag": "\uD83D\uDCB0", "position": "-1075px 0px" },
        "u1F4DA": { "en": "Books", "zh": "书籍", "tag": "\uD83D\uDCDA", "position": "-1100px 0px" },
        "u1F4DE": { "en": "Telephone Receiver", "zh": "电话听筒", "tag": "\uD83D\uDCDE", "position": "-1125px 0px" },
        "u1F4E2": { "en": "Loudspeaker", "zh": "扩音器", "tag": "\uD83D\uDCE2", "position": "-1150px 0px" },
        "u1F6AB": { "en": "Prohibited", "zh": "禁止", "tag": "\uD83D\uDEAB", "position": "-1175px 0px" },
        "u1F6BF": { "en": "Shower", "zh": "淋浴", "tag": "\uD83D\uDEBF", "position": "-1200px 0px" },
        "u1F30F": { "en": "Globe", "zh": "地球", "tag": "\uD83C\uDF0F", "position": "-1225px 0px" },
        "u1F33B": { "en": "Sunflower", "zh": "向日葵", "tag": "\uD83C\uDF3B", "position": "-1250px 0px" },
        "u1F35A": { "en": "Cooked Rice", "zh": "米饭", "tag": "\uD83C\uDF5A", "position": "-1275px 0px" },
        "u1F36B": { "en": "Chocolate Bar", "zh": "巧克力", "tag": "\uD83C\uDF6B", "position": "-1300px 0px" },
        "u1F37B": { "en": "Cheers", "zh": "干杯", "tag": "\uD83C\uDF7B", "position": "-1325px 0px" },
        "u270A": { "en": "Oncoming Fist", "zh": "击拳", "tag": "\uD83D\uDC4A", "position": "-1350px 0px" },
        "u1F44C": { "en": "Ok Hand", "zh": "没问题", "tag": "\uD83D\uDC4C", "position": "-1375px 0px" },
        "u1F44D": { "en": "Thumbs Up", "zh": "赞", "tag": "\uD83D\uDC4D", "position": "-1400px 0px" },
        "u1F44E": { "en": "Thumbs Down", "zh": "喝倒彩", "tag": "\uD83D\uDC4E", "position": "-1425px 0px" },
        "u1F44F": { "en": "Clapping Hands", "zh": "鼓掌", "tag": "\uD83D\uDC4F", "position": "-1450px 0px" },
        "u1F46A": { "en": "Family", "zh": "家庭", "tag": "\uD83D\uDC6A", "position": "-1475px 0px" },
        "u1F46B": { "en": "Couple", "zh": "情侣", "tag": "\uD83D\uDC6B", "position": "-1500px 0px" },
        "u1F62C": { "en": "Grimacing Face", "zh": "扮鬼脸", "tag": "\uD83D\uDE2C", "position": "-2050px 0px" },
        "u1F47B": { "en": "Ghost", "zh": "鬼", "tag": "\uD83D\uDC7B", "position": "-1525px 0px" },
        "u1F47C": { "en": "Baby Angel", "zh": "宝贝天使", "tag": "\uD83D\uDC7C", "position": "-1550px 0px" },
        "u1F47D": { "en": "Alien", "zh": "外星人", "tag": "\uD83D\uDC7D", "position": "-1575px 0px" },
        "u1F47F": { "en": "Devil", "zh": "恶魔", "tag": "\uD83D\uDC7F", "position": "-1600px 0px" },
        "u1F48A": { "en": "Capsule", "zh": "药", "tag": "\uD83D\uDC8A", "position": "-1625px 0px" },
        "u1F48B": { "en": "Kiss", "zh": "吻", "tag": "\uD83D\uDC8B", "position": "-1650px 0px" },
        "u1F48D": { "en": "Ring", "zh": "戒指", "tag": "\uD83D\uDC8D", "position": "-1675px 0px" },
        "u1F52B": { "en": "Pistol", "zh": "手枪", "tag": "\uD83D\uDD2B", "position": "-1700px 0px" },
        "u1F60A": { "en": "Smiley", "zh": "微笑", "tag": "\uD83D\uDE0A", "position": "-1725px 0px" },
        "u1F60B": { "en": "Hungry", "zh": "馋", "tag": "\uD83D\uDE0B", "position": "-1750px 0px" },
        "u1F60C": { "en": "Pleased", "zh": "满意", "tag": "\uD83D\uDE0C", "position": "-1775px 0px" },
        "u1F60D": { "en": "Heart Eyes", "zh": "色迷迷", "tag": "\uD83D\uDE0D", "position": "-1800px 0px" },
        "u1F60E": { "en": "Sunglasses", "zh": "墨镜", "tag": "\uD83D\uDE0E", "position": "-1825px 0px" },
        "u1F60F": { "en": "Smirking Face", "zh": "傻笑", "tag": "\uD83D\uDE0F", "position": "-1850px 0px" },
        "u1F61A": { "en": "Kiss Face", "zh": "么么哒", "tag": "\uD83D\uDE1A", "position": "-1875px 0px" },
        "u1F61C": { "en": "Crazy Face", "zh": "调皮", "tag": "\uD83D\uDE1C", "position": "-1900px 0px" },
        "u1F61D": { "en": "Tongue Out", "zh": "吐舌头", "tag": "\uD83D\uDE1D", "position": "-1925px 0px" },
        "u1F61E": { "en": "Disappointed Face", "zh": "失望", "tag": "\uD83D\uDE1E", "position": "-1950px 0px" },
        "u1F61F": { "en": "Worried Face", "zh": "苦瓜脸", "tag": "\uD83D\uDE1F", "position": "-1975px 0px" },
        "u1F62A": { "en": "Sleepy Face", "zh": "困", "tag": "\uD83D\uDE2A", "position": "-2000px 0px" },
        "u1F62B": { "en": "Tired Face", "zh": "抓狂", "tag": "\uD83D\uDE2B", "position": "-2025px 0px" },
        "u1F62D": { "en": "Crying", "zh": "伤心", "tag": "\uD83D\uDE22", "position": "-425px 0px" },
        "u1F62F": { "en": "Surprised Face", "zh": "惊呆", "tag": "\uD83D\uDE2F", "position": "-2100px 0px" },
        "u1F64A": { "en": "No Speaking", "zh": "闭嘴", "tag": "\uD83D\uDE4A", "position": "-2125px 0px" },
        "u1F64F": { "en": "Folded Hands", "zh": "祈祷", "tag": "\uD83D\uDE4F", "position": "-2150px 0px" },
        "u1F319": { "en": "Drescent Moon", "zh": "弯月", "tag": "\uD83C\uDF19", "position": "-2175px 0px" },
        "u1F332": { "en": "Pine Tree", "zh": "松树", "tag": "\uD83C\uDF32", "position": "-2200px 0px" },
        "u1F339": { "en": "Rose", "zh": "玫瑰", "tag": "\uD83C\uDF39", "position": "-2225px 0px" },
        "u1F349": { "en": "Watermelon", "zh": "西瓜", "tag": "\uD83C\uDF49", "position": "-2250px 0px" },
        "u1F356": { "en": "Barbecue", "zh": "BBQ", "tag": "\uD83C\uDF56", "position": "-2275px 0px" },
        "u1F366": { "en": "Ice Cream", "zh": "冰淇淋", "tag": "\uD83C\uDF66", "position": "-2300px 0px" },
        "u1F377": { "en": "Wine Glass", "zh": "红酒", "tag": "\uD83C\uDF77", "position": "-2325px 0px" },
        "u1F381": { "en": "Wrapped Gift", "zh": "礼物", "tag": "\uD83C\uDF81", "position": "-2350px 0px" },
        "u1F382": { "en": "Birthday Cake", "zh": "生日蛋糕", "tag": "\uD83C\uDF82", "position": "-2375px 0px" },
        "u1F384": { "en": "Christmas Tree", "zh": "圣诞树", "tag": "\uD83C\uDF84", "position": "-2400px 0px" },
        "u1F389": { "en": "Party Popper", "zh": "聚会礼花", "tag": "\uD83C\uDF89", "position": "-2425px 0px" },
        "u1F393": { "en": "Graduation Cap", "zh": "毕业帽", "tag": "\uD83C\uDF93", "position": "-2450px 0px" },
        "u1F434": { "en": "Horse", "zh": "马", "tag": "\uD83D\uDC34", "position": "-2475px 0px" },
        "u1F436": { "en": "Dog", "zh": "狗", "tag": "\uD83D\uDC36", "position": "-2500px 0px" },
        "u1F437": { "en": "Pig", "zh": "猪", "tag": "\uD83D\uDC37", "position": "-2525px 0px" },
        "u1F451": { "en": "Crown", "zh": "王冠", "tag": "\uD83D\uDC51", "position": "-2550px 0px" },
        "u1F484": { "en": "Lipstick", "zh": "口红", "tag": "\uD83D\uDC84", "position": "-2575px 0px" },
        "u1F494": { "en": "Broken Heart", "zh": "心碎", "tag": "\uD83D\uDC94", "position": "-2600px 0px" },
        "u1F525": { "en": "Fire", "zh": "火", "tag": "\uD83D\uDD25", "position": "-2625px 0px" },
        "u1F556": { "en": "Clock", "zh": "表", "tag": "\uD83D\uDD56", "position": "-2650px 0px" },
        "u1F648": { "en": "See No Monkey", "zh": "不看", "tag": "\uD83D\uDE48", "position": "-2675px 0px" },
        "u1F649": { "en": "Hear No Monkey", "zh": "不听", "tag": "\uD83D\uDE49", "position": "-2700px 0px" },
        "u1F680": { "en": "Rocket", "zh": "火箭", "tag": "\uD83D\uDE80", "position": "-2725px 0px" },
        "u2B50": { "en": "Star", "zh": "星星", "tag": "\u2B50", "position": "-2750px 0px" },
        "u23F0": { "en": "Alarm Clock", "zh": "闹钟", "tag": "\u23F0", "position": "-2775px 0px" },
        "u23F3": { "en": "Hourglass", "zh": "沙漏", "tag": "\u23F3", "position": "-2800px 0px" },
        "u26A1": { "en": "Lightning Bolt", "zh": "闪电", "tag": "\u26A1", "position": "-2825px 0px" },
        "u26BD": { "en": "Soccer Ball", "zh": "足球", "tag": "\u26BD", "position": "-2850px 0px" },
        "u26C4": { "en": "Snowman", "zh": "雪人", "tag": "\u26C4", "position": "-2875px 0px" },
        "u26C5": { "en": "Cloudy", "zh": "多云", "tag": "\u26C5", "position": "-2900px 0px" },
        "u261D": { "en": "Pointing Up", "zh": "第一", "tag": "\u261D", "position": "-2925px 0px" },
        "u263A": { "en": "Cute", "zh": "萌萌哒", "tag": "\u263A", "position": "-2950px 0px" },
        "u1F44A": { "en": "Raised Fist", "zh": "举起拳头", "tag": "\u270A", "position": "-2975px 0px" },
        "u270B": { "en": "Raised Hand", "zh": "举手", "tag": "\u270B", "position": "-3000px 0px" },
        "u270C": { "en": "Victory Hand", "zh": "耶", "tag": "\u270C", "position": "-3025px 0px" },
        "u270F": { "en": "Pencil", "zh": "铅笔", "tag": "\u270F", "position": "-3050px 0px" },
        "u2600": { "en": "Sunny", "zh": "晴朗", "tag": "\u2600", "position": "-3075px 0px" },
        "u2601": { "en": "Cloud", "zh": "云彩", "tag": "\u2601", "position": "-3100px 0px" },
        "u2614": { "en": "Umbrella", "zh": "雨伞", "tag": "\u2614", "position": "-3125px 0px" },
        "u2615": { "en": "Coffee", "zh": "咖啡", "tag": "\u2615", "position": "-3150px 0px" },
        "u2744": { "en": "Snowflake", "zh": "雪花", "tag": "\u2744", "position": "-3175px 0px" }
    };

    var list = [];

    var emojiRegExp;
    var unicodeRegExp = /\uf476\uf3fb|\uf476\uf3fc|\uf476\uf3fd|\uf476\uf3fe|\uf476\uf3ff|\uf9d2\uf3fb|\uf9d2\uf3fc|\uf9d2\uf3fd|\uf9d2\uf3fe|\uf9d2\uf3ff|\uf466\uf3fb|\uf466\uf3fc|\uf466\uf3fd|\uf466\uf3fe|\uf466\uf3ff|\uf467\uf3fb|\uf467\uf3fc|\uf467\uf3fd|\uf467\uf3fe|\uf467\uf3ff|\uf9d1\uf3fb|\uf9d1\uf3fc|\uf9d1\uf3fd|\uf9d1\uf3fe|\uf9d1\uf3ff|\uf468\uf3fb|\uf468\uf3fc|\uf468\uf3fd|\uf468\uf3fe|\uf468\uf3ff|\uf469\uf3fb|\uf469\uf3fc|\uf469\uf3fd|\uf469\uf3fe|\uf469\uf3ff|\uf9d3\uf3fb|\uf9d3\uf3fc|\uf9d3\uf3fd|\uf9d3\uf3fe|\uf9d3\uf3ff|\uf474\uf3fb|\uf474\uf3fc|\uf474\uf3fd|\uf474\uf3fe|\uf474\uf3ff|\uf475\uf3fb|\uf475\uf3fc|\uf475\uf3fd|\uf475\uf3fe|\uf475\uf3ff|\uf468\uf3fb\u200d\u2695\ufe0f|\uf468\uf3fc\u200d\u2695\ufe0f|\uf468\uf3fd\u200d\u2695\ufe0f|\uf468\uf3fe\u200d\u2695\ufe0f|\uf468\uf3ff\u200d\u2695\ufe0f|\uf469\uf3fb\u200d\u2695\ufe0f|\uf469\uf3fc\u200d\u2695\ufe0f|\uf469\uf3fd\u200d\u2695\ufe0f|\uf469\uf3fe\u200d\u2695\ufe0f|\uf469\uf3ff\u200d\u2695\ufe0f|\uf468\uf3fb\u200d\uf393|\uf468\uf3fc\u200d\uf393|\uf468\uf3fd\u200d\uf393|\uf468\uf3fe\u200d\uf393|\uf468\uf3ff\u200d\uf393|\uf469\uf3fb\u200d\uf393|\uf469\uf3fc\u200d\uf393|\uf469\uf3fd\u200d\uf393|\uf469\uf3fe\u200d\uf393|\uf469\uf3ff\u200d\uf393|\uf468\uf3fb\u200d\uf3eb|\uf468\uf3fc\u200d\uf3eb|\uf468\uf3fd\u200d\uf3eb|\uf468\uf3fe\u200d\uf3eb|\uf468\uf3ff\u200d\uf3eb|\uf469\uf3fb\u200d\uf3eb|\uf469\uf3fc\u200d\uf3eb|\uf469\uf3fd\u200d\uf3eb|\uf469\uf3fe\u200d\uf3eb|\uf469\uf3ff\u200d\uf3eb|\uf468\uf3fb\u200d\u2696\ufe0f|\uf468\uf3fc\u200d\u2696\ufe0f|\uf468\uf3fd\u200d\u2696\ufe0f|\uf468\uf3fe\u200d\u2696\ufe0f|\uf468\uf3ff\u200d\u2696\ufe0f|\uf469\uf3fb\u200d\u2696\ufe0f|\uf469\uf3fc\u200d\u2696\ufe0f|\uf469\uf3fd\u200d\u2696\ufe0f|\uf469\uf3fe\u200d\u2696\ufe0f|\uf469\uf3ff\u200d\u2696\ufe0f|\uf468\uf3fb\u200d\uf33e|\uf468\uf3fc\u200d\uf33e|\uf468\uf3fd\u200d\uf33e|\uf468\uf3fe\u200d\uf33e|\uf468\uf3ff\u200d\uf33e|\uf469\uf3fb\u200d\uf33e|\uf469\uf3fc\u200d\uf33e|\uf469\uf3fd\u200d\uf33e|\uf469\uf3fe\u200d\uf33e|\uf469\uf3ff\u200d\uf33e|\uf468\uf3fb\u200d\uf373|\uf468\uf3fc\u200d\uf373|\uf468\uf3fd\u200d\uf373|\uf468\uf3fe\u200d\uf373|\uf468\uf3ff\u200d\uf373|\uf469\uf3fb\u200d\uf373|\uf469\uf3fc\u200d\uf373|\uf469\uf3fd\u200d\uf373|\uf469\uf3fe\u200d\uf373|\uf469\uf3ff\u200d\uf373|\uf468\uf3fb\u200d\uf527|\uf468\uf3fc\u200d\uf527|\uf468\uf3fd\u200d\uf527|\uf468\uf3fe\u200d\uf527|\uf468\uf3ff\u200d\uf527|\uf469\uf3fb\u200d\uf527|\uf469\uf3fc\u200d\uf527|\uf469\uf3fd\u200d\uf527|\uf469\uf3fe\u200d\uf527|\uf469\uf3ff\u200d\uf527|\uf468\uf3fb\u200d\uf3ed|\uf468\uf3fc\u200d\uf3ed|\uf468\uf3fd\u200d\uf3ed|\uf468\uf3fe\u200d\uf3ed|\uf468\uf3ff\u200d\uf3ed|\uf469\uf3fb\u200d\uf3ed|\uf469\uf3fc\u200d\uf3ed|\uf469\uf3fd\u200d\uf3ed|\uf469\uf3fe\u200d\uf3ed|\uf469\uf3ff\u200d\uf3ed|\uf468\uf3fb\u200d\uf4bc|\uf468\uf3fc\u200d\uf4bc|\uf468\uf3fd\u200d\uf4bc|\uf468\uf3fe\u200d\uf4bc|\uf468\uf3ff\u200d\uf4bc|\uf469\uf3fb\u200d\uf4bc|\uf469\uf3fc\u200d\uf4bc|\uf469\uf3fd\u200d\uf4bc|\uf469\uf3fe\u200d\uf4bc|\uf469\uf3ff\u200d\uf4bc|\uf468\uf3fb\u200d\uf52c|\uf468\uf3fc\u200d\uf52c|\uf468\uf3fd\u200d\uf52c|\uf468\uf3fe\u200d\uf52c|\uf468\uf3ff\u200d\uf52c|\uf469\uf3fb\u200d\uf52c|\uf469\uf3fc\u200d\uf52c|\uf469\uf3fd\u200d\uf52c|\uf469\uf3fe\u200d\uf52c|\uf469\uf3ff\u200d\uf52c|\uf468\uf3fb\u200d\uf4bb|\uf468\uf3fc\u200d\uf4bb|\uf468\uf3fd\u200d\uf4bb|\uf468\uf3fe\u200d\uf4bb|\uf468\uf3ff\u200d\uf4bb|\uf469\uf3fb\u200d\uf4bb|\uf469\uf3fc\u200d\uf4bb|\uf469\uf3fd\u200d\uf4bb|\uf469\uf3fe\u200d\uf4bb|\uf469\uf3ff\u200d\uf4bb|\uf468\uf3fb\u200d\uf3a4|\uf468\uf3fc\u200d\uf3a4|\uf468\uf3fd\u200d\uf3a4|\uf468\uf3fe\u200d\uf3a4|\uf468\uf3ff\u200d\uf3a4|\uf469\uf3fb\u200d\uf3a4|\uf469\uf3fc\u200d\uf3a4|\uf469\uf3fd\u200d\uf3a4|\uf469\uf3fe\u200d\uf3a4|\uf469\uf3ff\u200d\uf3a4|\uf468\uf3fb\u200d\uf3a8|\uf468\uf3fc\u200d\uf3a8|\uf468\uf3fd\u200d\uf3a8|\uf468\uf3fe\u200d\uf3a8|\uf468\uf3ff\u200d\uf3a8|\uf469\uf3fb\u200d\uf3a8|\uf469\uf3fc\u200d\uf3a8|\uf469\uf3fd\u200d\uf3a8|\uf469\uf3fe\u200d\uf3a8|\uf469\uf3ff\u200d\uf3a8|\uf468\uf3fb\u200d\u2708\ufe0f|\uf468\uf3fc\u200d\u2708\ufe0f|\uf468\uf3fd\u200d\u2708\ufe0f|\uf468\uf3fe\u200d\u2708\ufe0f|\uf468\uf3ff\u200d\u2708\ufe0f|\uf469\uf3fb\u200d\u2708\ufe0f|\uf469\uf3fc\u200d\u2708\ufe0f|\uf469\uf3fd\u200d\u2708\ufe0f|\uf469\uf3fe\u200d\u2708\ufe0f|\uf469\uf3ff\u200d\u2708\ufe0f|\uf468\uf3fb\u200d\uf680|\uf468\uf3fc\u200d\uf680|\uf468\uf3fd\u200d\uf680|\uf468\uf3fe\u200d\uf680|\uf468\uf3ff\u200d\uf680|\uf469\uf3fb\u200d\uf680|\uf469\uf3fc\u200d\uf680|\uf469\uf3fd\u200d\uf680|\uf469\uf3fe\u200d\uf680|\uf469\uf3ff\u200d\uf680|\uf468\uf3fb\u200d\uf692|\uf468\uf3fc\u200d\uf692|\uf468\uf3fd\u200d\uf692|\uf468\uf3fe\u200d\uf692|\uf468\uf3ff\u200d\uf692|\uf469\uf3fb\u200d\uf692|\uf469\uf3fc\u200d\uf692|\uf469\uf3fd\u200d\uf692|\uf469\uf3fe\u200d\uf692|\uf469\uf3ff\u200d\uf692|\uf46e\uf3fb|\uf46e\uf3fc|\uf46e\uf3fd|\uf46e\uf3fe|\uf46e\uf3ff|\uf46e\uf3fb\u200d\u2642\ufe0f|\uf46e\uf3fc\u200d\u2642\ufe0f|\uf46e\uf3fd\u200d\u2642\ufe0f|\uf46e\uf3fe\u200d\u2642\ufe0f|\uf46e\uf3ff\u200d\u2642\ufe0f|\uf46e\uf3fb\u200d\u2640\ufe0f|\uf46e\uf3fc\u200d\u2640\ufe0f|\uf46e\uf3fd\u200d\u2640\ufe0f|\uf46e\uf3fe\u200d\u2640\ufe0f|\uf46e\uf3ff\u200d\u2640\ufe0f|\uf575\uf3fb|\uf575\uf3fc|\uf575\uf3fd|\uf575\uf3fe|\uf575\uf3ff|\uf575\uf3fb\u200d\u2642\ufe0f|\uf575\uf3fc\u200d\u2642\ufe0f|\uf575\uf3fd\u200d\u2642\ufe0f|\uf575\uf3fe\u200d\u2642\ufe0f|\uf575\uf3ff\u200d\u2642\ufe0f|\uf575\uf3fb\u200d\u2640\ufe0f|\uf575\uf3fc\u200d\u2640\ufe0f|\uf575\uf3fd\u200d\u2640\ufe0f|\uf575\uf3fe\u200d\u2640\ufe0f|\uf575\uf3ff\u200d\u2640\ufe0f|\uf482\uf3fb|\uf482\uf3fc|\uf482\uf3fd|\uf482\uf3fe|\uf482\uf3ff|\uf482\uf3fb\u200d\u2642\ufe0f|\uf482\uf3fc\u200d\u2642\ufe0f|\uf482\uf3fd\u200d\u2642\ufe0f|\uf482\uf3fe\u200d\u2642\ufe0f|\uf482\uf3ff\u200d\u2642\ufe0f|\uf482\uf3fb\u200d\u2640\ufe0f|\uf482\uf3fc\u200d\u2640\ufe0f|\uf482\uf3fd\u200d\u2640\ufe0f|\uf482\uf3fe\u200d\u2640\ufe0f|\uf482\uf3ff\u200d\u2640\ufe0f|\uf477\uf3fb|\uf477\uf3fc|\uf477\uf3fd|\uf477\uf3fe|\uf477\uf3ff|\uf477\uf3fb\u200d\u2642\ufe0f|\uf477\uf3fc\u200d\u2642\ufe0f|\uf477\uf3fd\u200d\u2642\ufe0f|\uf477\uf3fe\u200d\u2642\ufe0f|\uf477\uf3ff\u200d\u2642\ufe0f|\uf477\uf3fb\u200d\u2640\ufe0f|\uf477\uf3fc\u200d\u2640\ufe0f|\uf477\uf3fd\u200d\u2640\ufe0f|\uf477\uf3fe\u200d\u2640\ufe0f|\uf477\uf3ff\u200d\u2640\ufe0f|\uf934\uf3fb|\uf934\uf3fc|\uf934\uf3fd|\uf934\uf3fe|\uf934\uf3ff|\uf478\uf3fb|\uf478\uf3fc|\uf478\uf3fd|\uf478\uf3fe|\uf478\uf3ff|\uf473\uf3fb|\uf473\uf3fc|\uf473\uf3fd|\uf473\uf3fe|\uf473\uf3ff|\uf473\uf3fb\u200d\u2642\ufe0f|\uf473\uf3fc\u200d\u2642\ufe0f|\uf473\uf3fd\u200d\u2642\ufe0f|\uf473\uf3fe\u200d\u2642\ufe0f|\uf473\uf3ff\u200d\u2642\ufe0f|\uf473\uf3fb\u200d\u2640\ufe0f|\uf473\uf3fc\u200d\u2640\ufe0f|\uf473\uf3fd\u200d\u2640\ufe0f|\uf473\uf3fe\u200d\u2640\ufe0f|\uf473\uf3ff\u200d\u2640\ufe0f|\uf472\uf3fb|\uf472\uf3fc|\uf472\uf3fd|\uf472\uf3fe|\uf472\uf3ff|\uf9d5\uf3fb|\uf9d5\uf3fc|\uf9d5\uf3fd|\uf9d5\uf3fe|\uf9d5\uf3ff|\uf9d4\uf3fb|\uf9d4\uf3fc|\uf9d4\uf3fd|\uf9d4\uf3fe|\uf9d4\uf3ff|\uf471\uf3fb|\uf471\uf3fc|\uf471\uf3fd|\uf471\uf3fe|\uf471\uf3ff|\uf471\uf3fb\u200d\u2642\ufe0f|\uf471\uf3fc\u200d\u2642\ufe0f|\uf471\uf3fd\u200d\u2642\ufe0f|\uf471\uf3fe\u200d\u2642\ufe0f|\uf471\uf3ff\u200d\u2642\ufe0f|\uf471\uf3fb\u200d\u2640\ufe0f|\uf471\uf3fc\u200d\u2640\ufe0f|\uf471\uf3fd\u200d\u2640\ufe0f|\uf471\uf3fe\u200d\u2640\ufe0f|\uf471\uf3ff\u200d\u2640\ufe0f|\uf935\uf3fb|\uf935\uf3fc|\uf935\uf3fd|\uf935\uf3fe|\uf935\uf3ff|\uf470\uf3fb|\uf470\uf3fc|\uf470\uf3fd|\uf470\uf3fe|\uf470\uf3ff|\uf930\uf3fb|\uf930\uf3fc|\uf930\uf3fd|\uf930\uf3fe|\uf930\uf3ff|\uf931\uf3fb|\uf931\uf3fc|\uf931\uf3fd|\uf931\uf3fe|\uf931\uf3ff|\uf47c\uf3fb|\uf47c\uf3fc|\uf47c\uf3fd|\uf47c\uf3fe|\uf47c\uf3ff|\uf385\uf3fb|\uf385\uf3fc|\uf385\uf3fd|\uf385\uf3fe|\uf385\uf3ff|\uf936\uf3fb|\uf936\uf3fc|\uf936\uf3fd|\uf936\uf3fe|\uf936\uf3ff|\uf9d9\uf3fb|\uf9d9\uf3fc|\uf9d9\uf3fd|\uf9d9\uf3fe|\uf9d9\uf3ff|\uf9d9\uf3fb\u200d\u2640\ufe0f|\uf9d9\uf3fc\u200d\u2640\ufe0f|\uf9d9\uf3fd\u200d\u2640\ufe0f|\uf9d9\uf3fe\u200d\u2640\ufe0f|\uf9d9\uf3ff\u200d\u2640\ufe0f|\uf9d9\uf3fb\u200d\u2642\ufe0f|\uf9d9\uf3fc\u200d\u2642\ufe0f|\uf9d9\uf3fd\u200d\u2642\ufe0f|\uf9d9\uf3fe\u200d\u2642\ufe0f|\uf9d9\uf3ff\u200d\u2642\ufe0f|\uf9da\uf3fb|\uf9da\uf3fc|\uf9da\uf3fd|\uf9da\uf3fe|\uf9da\uf3ff|\uf9da\uf3fb\u200d\u2640\ufe0f|\uf9da\uf3fc\u200d\u2640\ufe0f|\uf9da\uf3fd\u200d\u2640\ufe0f|\uf9da\uf3fe\u200d\u2640\ufe0f|\uf9da\uf3ff\u200d\u2640\ufe0f|\uf9da\uf3fb\u200d\u2642\ufe0f|\uf9da\uf3fc\u200d\u2642\ufe0f|\uf9da\uf3fd\u200d\u2642\ufe0f|\uf9da\uf3fe\u200d\u2642\ufe0f|\uf9da\uf3ff\u200d\u2642\ufe0f|\uf9db\uf3fb|\uf9db\uf3fc|\uf9db\uf3fd|\uf9db\uf3fe|\uf9db\uf3ff|\uf9db\uf3fb\u200d\u2640\ufe0f|\uf9db\uf3fc\u200d\u2640\ufe0f|\uf9db\uf3fd\u200d\u2640\ufe0f|\uf9db\uf3fe\u200d\u2640\ufe0f|\uf9db\uf3ff\u200d\u2640\ufe0f|\uf9db\uf3fb\u200d\u2642\ufe0f|\uf9db\uf3fc\u200d\u2642\ufe0f|\uf9db\uf3fd\u200d\u2642\ufe0f|\uf9db\uf3fe\u200d\u2642\ufe0f|\uf9db\uf3ff\u200d\u2642\ufe0f|\uf9dc\uf3fb|\uf9dc\uf3fc|\uf9dc\uf3fd|\uf9dc\uf3fe|\uf9dc\uf3ff|\uf9dc\uf3fb\u200d\u2640\ufe0f|\uf9dc\uf3fc\u200d\u2640\ufe0f|\uf9dc\uf3fd\u200d\u2640\ufe0f|\uf9dc\uf3fe\u200d\u2640\ufe0f|\uf9dc\uf3ff\u200d\u2640\ufe0f|\uf9dc\uf3fb\u200d\u2642\ufe0f|\uf9dc\uf3fc\u200d\u2642\ufe0f|\uf9dc\uf3fd\u200d\u2642\ufe0f|\uf9dc\uf3fe\u200d\u2642\ufe0f|\uf9dc\uf3ff\u200d\u2642\ufe0f|\uf9dd\uf3fb|\uf9dd\uf3fc|\uf9dd\uf3fd|\uf9dd\uf3fe|\uf9dd\uf3ff|\uf9dd\uf3fb\u200d\u2640\ufe0f|\uf9dd\uf3fc\u200d\u2640\ufe0f|\uf9dd\uf3fd\u200d\u2640\ufe0f|\uf9dd\uf3fe\u200d\u2640\ufe0f|\uf9dd\uf3ff\u200d\u2640\ufe0f|\uf9dd\uf3fb\u200d\u2642\ufe0f|\uf9dd\uf3fc\u200d\u2642\ufe0f|\uf9dd\uf3fd\u200d\u2642\ufe0f|\uf9dd\uf3fe\u200d\u2642\ufe0f|\uf9dd\uf3ff\u200d\u2642\ufe0f|\uf64d\uf3fb|\uf64d\uf3fc|\uf64d\uf3fd|\uf64d\uf3fe|\uf64d\uf3ff|\uf64d\uf3fb\u200d\u2642\ufe0f|\uf64d\uf3fc\u200d\u2642\ufe0f|\uf64d\uf3fd\u200d\u2642\ufe0f|\uf64d\uf3fe\u200d\u2642\ufe0f|\uf64d\uf3ff\u200d\u2642\ufe0f|\uf64d\uf3fb\u200d\u2640\ufe0f|\uf64d\uf3fc\u200d\u2640\ufe0f|\uf64d\uf3fd\u200d\u2640\ufe0f|\uf64d\uf3fe\u200d\u2640\ufe0f|\uf64d\uf3ff\u200d\u2640\ufe0f|\uf64e\uf3fb|\uf64e\uf3fc|\uf64e\uf3fd|\uf64e\uf3fe|\uf64e\uf3ff|\uf64e\uf3fb\u200d\u2642\ufe0f|\uf64e\uf3fc\u200d\u2642\ufe0f|\uf64e\uf3fd\u200d\u2642\ufe0f|\uf64e\uf3fe\u200d\u2642\ufe0f|\uf64e\uf3ff\u200d\u2642\ufe0f|\uf64e\uf3fb\u200d\u2640\ufe0f|\uf64e\uf3fc\u200d\u2640\ufe0f|\uf64e\uf3fd\u200d\u2640\ufe0f|\uf64e\uf3fe\u200d\u2640\ufe0f|\uf64e\uf3ff\u200d\u2640\ufe0f|\uf645\uf3fb|\uf645\uf3fc|\uf645\uf3fd|\uf645\uf3fe|\uf645\uf3ff|\uf645\uf3fb\u200d\u2642\ufe0f|\uf645\uf3fc\u200d\u2642\ufe0f|\uf645\uf3fd\u200d\u2642\ufe0f|\uf645\uf3fe\u200d\u2642\ufe0f|\uf645\uf3ff\u200d\u2642\ufe0f|\uf645\uf3fb\u200d\u2640\ufe0f|\uf645\uf3fc\u200d\u2640\ufe0f|\uf645\uf3fd\u200d\u2640\ufe0f|\uf645\uf3fe\u200d\u2640\ufe0f|\uf645\uf3ff\u200d\u2640\ufe0f|\uf646\uf3fb|\uf646\uf3fc|\uf646\uf3fd|\uf646\uf3fe|\uf646\uf3ff|\uf646\uf3fb\u200d\u2642\ufe0f|\uf646\uf3fc\u200d\u2642\ufe0f|\uf646\uf3fd\u200d\u2642\ufe0f|\uf646\uf3fe\u200d\u2642\ufe0f|\uf646\uf3ff\u200d\u2642\ufe0f|\uf646\uf3fb\u200d\u2640\ufe0f|\uf646\uf3fc\u200d\u2640\ufe0f|\uf646\uf3fd\u200d\u2640\ufe0f|\uf646\uf3fe\u200d\u2640\ufe0f|\uf646\uf3ff\u200d\u2640\ufe0f|\uf481\uf3fb|\uf481\uf3fc|\uf481\uf3fd|\uf481\uf3fe|\uf481\uf3ff|\uf481\uf3fb\u200d\u2642\ufe0f|\uf481\uf3fc\u200d\u2642\ufe0f|\uf481\uf3fd\u200d\u2642\ufe0f|\uf481\uf3fe\u200d\u2642\ufe0f|\uf481\uf3ff\u200d\u2642\ufe0f|\uf481\uf3fb\u200d\u2640\ufe0f|\uf481\uf3fc\u200d\u2640\ufe0f|\uf481\uf3fd\u200d\u2640\ufe0f|\uf481\uf3fe\u200d\u2640\ufe0f|\uf481\uf3ff\u200d\u2640\ufe0f|\uf64b\uf3fb|\uf64b\uf3fc|\uf64b\uf3fd|\uf64b\uf3fe|\uf64b\uf3ff|\uf64b\uf3fb\u200d\u2642\ufe0f|\uf64b\uf3fc\u200d\u2642\ufe0f|\uf64b\uf3fd\u200d\u2642\ufe0f|\uf64b\uf3fe\u200d\u2642\ufe0f|\uf64b\uf3ff\u200d\u2642\ufe0f|\uf64b\uf3fb\u200d\u2640\ufe0f|\uf64b\uf3fc\u200d\u2640\ufe0f|\uf64b\uf3fd\u200d\u2640\ufe0f|\uf64b\uf3fe\u200d\u2640\ufe0f|\uf64b\uf3ff\u200d\u2640\ufe0f|\uf647\uf3fb|\uf647\uf3fc|\uf647\uf3fd|\uf647\uf3fe|\uf647\uf3ff|\uf647\uf3fb\u200d\u2642\ufe0f|\uf647\uf3fc\u200d\u2642\ufe0f|\uf647\uf3fd\u200d\u2642\ufe0f|\uf647\uf3fe\u200d\u2642\ufe0f|\uf647\uf3ff\u200d\u2642\ufe0f|\uf647\uf3fb\u200d\u2640\ufe0f|\uf647\uf3fc\u200d\u2640\ufe0f|\uf647\uf3fd\u200d\u2640\ufe0f|\uf647\uf3fe\u200d\u2640\ufe0f|\uf647\uf3ff\u200d\u2640\ufe0f|\uf926\uf3fb|\uf926\uf3fc|\uf926\uf3fd|\uf926\uf3fe|\uf926\uf3ff|\uf926\uf3fb\u200d\u2642\ufe0f|\uf926\uf3fc\u200d\u2642\ufe0f|\uf926\uf3fd\u200d\u2642\ufe0f|\uf926\uf3fe\u200d\u2642\ufe0f|\uf926\uf3ff\u200d\u2642\ufe0f|\uf926\uf3fb\u200d\u2640\ufe0f|\uf926\uf3fc\u200d\u2640\ufe0f|\uf926\uf3fd\u200d\u2640\ufe0f|\uf926\uf3fe\u200d\u2640\ufe0f|\uf926\uf3ff\u200d\u2640\ufe0f|\uf937\uf3fb|\uf937\uf3fc|\uf937\uf3fd|\uf937\uf3fe|\uf937\uf3ff|\uf937\uf3fb\u200d\u2642\ufe0f|\uf937\uf3fc\u200d\u2642\ufe0f|\uf937\uf3fd\u200d\u2642\ufe0f|\uf937\uf3fe\u200d\u2642\ufe0f|\uf937\uf3ff\u200d\u2642\ufe0f|\uf937\uf3fb\u200d\u2640\ufe0f|\uf937\uf3fc\u200d\u2640\ufe0f|\uf937\uf3fd\u200d\u2640\ufe0f|\uf937\uf3fe\u200d\u2640\ufe0f|\uf937\uf3ff\u200d\u2640\ufe0f|\uf486\uf3fb|\uf486\uf3fc|\uf486\uf3fd|\uf486\uf3fe|\uf486\uf3ff|\uf486\uf3fb\u200d\u2642\ufe0f|\uf486\uf3fc\u200d\u2642\ufe0f|\uf486\uf3fd\u200d\u2642\ufe0f|\uf486\uf3fe\u200d\u2642\ufe0f|\uf486\uf3ff\u200d\u2642\ufe0f|\uf486\uf3fb\u200d\u2640\ufe0f|\uf486\uf3fc\u200d\u2640\ufe0f|\uf486\uf3fd\u200d\u2640\ufe0f|\uf486\uf3fe\u200d\u2640\ufe0f|\uf486\uf3ff\u200d\u2640\ufe0f|\uf487\uf3fb|\uf487\uf3fc|\uf487\uf3fd|\uf487\uf3fe|\uf487\uf3ff|\uf487\uf3fb\u200d\u2642\ufe0f|\uf487\uf3fc\u200d\u2642\ufe0f|\uf487\uf3fd\u200d\u2642\ufe0f|\uf487\uf3fe\u200d\u2642\ufe0f|\uf487\uf3ff\u200d\u2642\ufe0f|\uf487\uf3fb\u200d\u2640\ufe0f|\uf487\uf3fc\u200d\u2640\ufe0f|\uf487\uf3fd\u200d\u2640\ufe0f|\uf487\uf3fe\u200d\u2640\ufe0f|\uf487\uf3ff\u200d\u2640\ufe0f|\uf6b6\uf3fb|\uf6b6\uf3fc|\uf6b6\uf3fd|\uf6b6\uf3fe|\uf6b6\uf3ff|\uf6b6\uf3fb\u200d\u2642\ufe0f|\uf6b6\uf3fc\u200d\u2642\ufe0f|\uf6b6\uf3fd\u200d\u2642\ufe0f|\uf6b6\uf3fe\u200d\u2642\ufe0f|\uf6b6\uf3ff\u200d\u2642\ufe0f|\uf6b6\uf3fb\u200d\u2640\ufe0f|\uf6b6\uf3fc\u200d\u2640\ufe0f|\uf6b6\uf3fd\u200d\u2640\ufe0f|\uf6b6\uf3fe\u200d\u2640\ufe0f|\uf6b6\uf3ff\u200d\u2640\ufe0f|\uf3c3\uf3fb|\uf3c3\uf3fc|\uf3c3\uf3fd|\uf3c3\uf3fe|\uf3c3\uf3ff|\uf3c3\uf3fb\u200d\u2642\ufe0f|\uf3c3\uf3fc\u200d\u2642\ufe0f|\uf3c3\uf3fd\u200d\u2642\ufe0f|\uf3c3\uf3fe\u200d\u2642\ufe0f|\uf3c3\uf3ff\u200d\u2642\ufe0f|\uf3c3\uf3fb\u200d\u2640\ufe0f|\uf3c3\uf3fc\u200d\u2640\ufe0f|\uf3c3\uf3fd\u200d\u2640\ufe0f|\uf3c3\uf3fe\u200d\u2640\ufe0f|\uf3c3\uf3ff\u200d\u2640\ufe0f|\uf483\uf3fb|\uf483\uf3fc|\uf483\uf3fd|\uf483\uf3fe|\uf483\uf3ff|\uf57a\uf3fb|\uf57a\uf3fc|\uf57a\uf3fd|\uf57a\uf3fe|\uf57a\uf3ff|\uf9d6\uf3fb|\uf9d6\uf3fc|\uf9d6\uf3fd|\uf9d6\uf3fe|\uf9d6\uf3ff|\uf9d6\uf3fb\u200d\u2640\ufe0f|\uf9d6\uf3fc\u200d\u2640\ufe0f|\uf9d6\uf3fd\u200d\u2640\ufe0f|\uf9d6\uf3fe\u200d\u2640\ufe0f|\uf9d6\uf3ff\u200d\u2640\ufe0f|\uf9d6\uf3fb\u200d\u2642\ufe0f|\uf9d6\uf3fc\u200d\u2642\ufe0f|\uf9d6\uf3fd\u200d\u2642\ufe0f|\uf9d6\uf3fe\u200d\u2642\ufe0f|\uf9d6\uf3ff\u200d\u2642\ufe0f|\uf9d7\uf3fb|\uf9d7\uf3fc|\uf9d7\uf3fd|\uf9d7\uf3fe|\uf9d7\uf3ff|\uf9d7\uf3fb\u200d\u2640\ufe0f|\uf9d7\uf3fc\u200d\u2640\ufe0f|\uf9d7\uf3fd\u200d\u2640\ufe0f|\uf9d7\uf3fe\u200d\u2640\ufe0f|\uf9d7\uf3ff\u200d\u2640\ufe0f|\uf9d7\uf3fb\u200d\u2642\ufe0f|\uf9d7\uf3fc\u200d\u2642\ufe0f|\uf9d7\uf3fd\u200d\u2642\ufe0f|\uf9d7\uf3fe\u200d\u2642\ufe0f|\uf9d7\uf3ff\u200d\u2642\ufe0f|\uf9d8\uf3fb|\uf9d8\uf3fc|\uf9d8\uf3fd|\uf9d8\uf3fe|\uf9d8\uf3ff|\uf9d8\uf3fb\u200d\u2640\ufe0f|\uf9d8\uf3fc\u200d\u2640\ufe0f|\uf9d8\uf3fd\u200d\u2640\ufe0f|\uf9d8\uf3fe\u200d\u2640\ufe0f|\uf9d8\uf3ff\u200d\u2640\ufe0f|\uf9d8\uf3fb\u200d\u2642\ufe0f|\uf9d8\uf3fc\u200d\u2642\ufe0f|\uf9d8\uf3fd\u200d\u2642\ufe0f|\uf9d8\uf3fe\u200d\u2642\ufe0f|\uf9d8\uf3ff\u200d\u2642\ufe0f|\uf6c0\uf3fb|\uf6c0\uf3fc|\uf6c0\uf3fd|\uf6c0\uf3fe|\uf6c0\uf3ff|\uf6cc\uf3fb|\uf6cc\uf3fc|\uf6cc\uf3fd|\uf6cc\uf3fe|\uf6cc\uf3ff|\uf574\uf3fb|\uf574\uf3fc|\uf574\uf3fd|\uf574\uf3fe|\uf574\uf3ff|\uf3c7\uf3fb|\uf3c7\uf3fc|\uf3c7\uf3fd|\uf3c7\uf3fe|\uf3c7\uf3ff|\uf3c2\uf3fb|\uf3c2\uf3fc|\uf3c2\uf3fd|\uf3c2\uf3fe|\uf3c2\uf3ff|\uf3cc\uf3fb|\uf3cc\uf3fc|\uf3cc\uf3fd|\uf3cc\uf3fe|\uf3cc\uf3ff|\uf3cc\uf3fb\u200d\u2642\ufe0f|\uf3cc\uf3fc\u200d\u2642\ufe0f|\uf3cc\uf3fd\u200d\u2642\ufe0f|\uf3cc\uf3fe\u200d\u2642\ufe0f|\uf3cc\uf3ff\u200d\u2642\ufe0f|\uf3cc\uf3fb\u200d\u2640\ufe0f|\uf3cc\uf3fc\u200d\u2640\ufe0f|\uf3cc\uf3fd\u200d\u2640\ufe0f|\uf3cc\uf3fe\u200d\u2640\ufe0f|\uf3cc\uf3ff\u200d\u2640\ufe0f|\uf3c4\uf3fb|\uf3c4\uf3fc|\uf3c4\uf3fd|\uf3c4\uf3fe|\uf3c4\uf3ff|\uf3c4\uf3fb\u200d\u2642\ufe0f|\uf3c4\uf3fc\u200d\u2642\ufe0f|\uf3c4\uf3fd\u200d\u2642\ufe0f|\uf3c4\uf3fe\u200d\u2642\ufe0f|\uf3c4\uf3ff\u200d\u2642\ufe0f|\uf3c4\uf3fb\u200d\u2640\ufe0f|\uf3c4\uf3fc\u200d\u2640\ufe0f|\uf3c4\uf3fd\u200d\u2640\ufe0f|\uf3c4\uf3fe\u200d\u2640\ufe0f|\uf3c4\uf3ff\u200d\u2640\ufe0f|\uf6a3\uf3fb|\uf6a3\uf3fc|\uf6a3\uf3fd|\uf6a3\uf3fe|\uf6a3\uf3ff|\uf6a3\uf3fb\u200d\u2642\ufe0f|\uf6a3\uf3fc\u200d\u2642\ufe0f|\uf6a3\uf3fd\u200d\u2642\ufe0f|\uf6a3\uf3fe\u200d\u2642\ufe0f|\uf6a3\uf3ff\u200d\u2642\ufe0f|\uf6a3\uf3fb\u200d\u2640\ufe0f|\uf6a3\uf3fc\u200d\u2640\ufe0f|\uf6a3\uf3fd\u200d\u2640\ufe0f|\uf6a3\uf3fe\u200d\u2640\ufe0f|\uf6a3\uf3ff\u200d\u2640\ufe0f|\uf3ca\uf3fb|\uf3ca\uf3fc|\uf3ca\uf3fd|\uf3ca\uf3fe|\uf3ca\uf3ff|\uf3ca\uf3fb\u200d\u2642\ufe0f|\uf3ca\uf3fc\u200d\u2642\ufe0f|\uf3ca\uf3fd\u200d\u2642\ufe0f|\uf3ca\uf3fe\u200d\u2642\ufe0f|\uf3ca\uf3ff\u200d\u2642\ufe0f|\uf3ca\uf3fb\u200d\u2640\ufe0f|\uf3ca\uf3fc\u200d\u2640\ufe0f|\uf3ca\uf3fd\u200d\u2640\ufe0f|\uf3ca\uf3fe\u200d\u2640\ufe0f|\uf3ca\uf3ff\u200d\u2640\ufe0f|\uf3cb\uf3fb|\uf3cb\uf3fc|\uf3cb\uf3fd|\uf3cb\uf3fe|\uf3cb\uf3ff|\uf3cb\uf3fb\u200d\u2642\ufe0f|\uf3cb\uf3fc\u200d\u2642\ufe0f|\uf3cb\uf3fd\u200d\u2642\ufe0f|\uf3cb\uf3fe\u200d\u2642\ufe0f|\uf3cb\uf3ff\u200d\u2642\ufe0f|\uf3cb\uf3fb\u200d\u2640\ufe0f|\uf3cb\uf3fc\u200d\u2640\ufe0f|\uf3cb\uf3fd\u200d\u2640\ufe0f|\uf3cb\uf3fe\u200d\u2640\ufe0f|\uf3cb\uf3ff\u200d\u2640\ufe0f|\uf6b4\uf3fb|\uf6b4\uf3fc|\uf6b4\uf3fd|\uf6b4\uf3fe|\uf6b4\uf3ff|\uf6b4\uf3fb\u200d\u2642\ufe0f|\uf6b4\uf3fc\u200d\u2642\ufe0f|\uf6b4\uf3fd\u200d\u2642\ufe0f|\uf6b4\uf3fe\u200d\u2642\ufe0f|\uf6b4\uf3ff\u200d\u2642\ufe0f|\uf6b4\uf3fb\u200d\u2640\ufe0f|\uf6b4\uf3fc\u200d\u2640\ufe0f|\uf6b4\uf3fd\u200d\u2640\ufe0f|\uf6b4\uf3fe\u200d\u2640\ufe0f|\uf6b4\uf3ff\u200d\u2640\ufe0f|\uf6b5\uf3fb|\uf6b5\uf3fc|\uf6b5\uf3fd|\uf6b5\uf3fe|\uf6b5\uf3ff|\uf6b5\uf3fb\u200d\u2642\ufe0f|\uf6b5\uf3fc\u200d\u2642\ufe0f|\uf6b5\uf3fd\u200d\u2642\ufe0f|\uf6b5\uf3fe\u200d\u2642\ufe0f|\uf6b5\uf3ff\u200d\u2642\ufe0f|\uf6b5\uf3fb\u200d\u2640\ufe0f|\uf6b5\uf3fc\u200d\u2640\ufe0f|\uf6b5\uf3fd\u200d\u2640\ufe0f|\uf6b5\uf3fe\u200d\u2640\ufe0f|\uf6b5\uf3ff\u200d\u2640\ufe0f|\uf938\uf3fb|\uf938\uf3fc|\uf938\uf3fd|\uf938\uf3fe|\uf938\uf3ff|\uf938\uf3fb\u200d\u2642\ufe0f|\uf938\uf3fc\u200d\u2642\ufe0f|\uf938\uf3fd\u200d\u2642\ufe0f|\uf938\uf3fe\u200d\u2642\ufe0f|\uf938\uf3ff\u200d\u2642\ufe0f|\uf938\uf3fb\u200d\u2640\ufe0f|\uf938\uf3fc\u200d\u2640\ufe0f|\uf938\uf3fd\u200d\u2640\ufe0f|\uf938\uf3fe\u200d\u2640\ufe0f|\uf938\uf3ff\u200d\u2640\ufe0f|\uf93d\uf3fb|\uf93d\uf3fc|\uf93d\uf3fd|\uf93d\uf3fe|\uf93d\uf3ff|\uf93d\uf3fb\u200d\u2642\ufe0f|\uf93d\uf3fc\u200d\u2642\ufe0f|\uf93d\uf3fd\u200d\u2642\ufe0f|\uf93d\uf3fe\u200d\u2642\ufe0f|\uf93d\uf3ff\u200d\u2642\ufe0f|\uf93d\uf3fb\u200d\u2640\ufe0f|\uf93d\uf3fc\u200d\u2640\ufe0f|\uf93d\uf3fd\u200d\u2640\ufe0f|\uf93d\uf3fe\u200d\u2640\ufe0f|\uf93d\uf3ff\u200d\u2640\ufe0f|\uf93e\uf3fb|\uf93e\uf3fc|\uf93e\uf3fd|\uf93e\uf3fe|\uf93e\uf3ff|\uf93e\uf3fb\u200d\u2642\ufe0f|\uf93e\uf3fc\u200d\u2642\ufe0f|\uf93e\uf3fd\u200d\u2642\ufe0f|\uf93e\uf3fe\u200d\u2642\ufe0f|\uf93e\uf3ff\u200d\u2642\ufe0f|\uf93e\uf3fb\u200d\u2640\ufe0f|\uf93e\uf3fc\u200d\u2640\ufe0f|\uf93e\uf3fd\u200d\u2640\ufe0f|\uf93e\uf3fe\u200d\u2640\ufe0f|\uf93e\uf3ff\u200d\u2640\ufe0f|\uf939\uf3fb|\uf939\uf3fc|\uf939\uf3fd|\uf939\uf3fe|\uf939\uf3ff|\uf939\uf3fb\u200d\u2642\ufe0f|\uf939\uf3fc\u200d\u2642\ufe0f|\uf939\uf3fd\u200d\u2642\ufe0f|\uf939\uf3fe\u200d\u2642\ufe0f|\uf939\uf3ff\u200d\u2642\ufe0f|\uf939\uf3fb\u200d\u2640\ufe0f|\uf939\uf3fc\u200d\u2640\ufe0f|\uf939\uf3fd\u200d\u2640\ufe0f|\uf939\uf3fe\u200d\u2640\ufe0f|\uf939\uf3ff\u200d\u2640\ufe0f|\uf933\uf3fb|\uf933\uf3fc|\uf933\uf3fd|\uf933\uf3fe|\uf933\uf3ff|\uf4aa\uf3fb|\uf4aa\uf3fc|\uf4aa\uf3fd|\uf4aa\uf3fe|\uf4aa\uf3ff|\uf448\uf3fb|\uf448\uf3fc|\uf448\uf3fd|\uf448\uf3fe|\uf448\uf3ff|\uf449\uf3fb|\uf449\uf3fc|\uf449\uf3fd|\uf449\uf3fe|\uf449\uf3ff|\uf446\uf3fb|\uf446\uf3fc|\uf446\uf3fd|\uf446\uf3fe|\uf446\uf3ff|\uf595\uf3fb|\uf595\uf3fc|\uf595\uf3fd|\uf595\uf3fe|\uf595\uf3ff|\uf447\uf3fb|\uf447\uf3fc|\uf447\uf3fd|\uf447\uf3fe|\uf447\uf3ff|\uf91e\uf3fb|\uf91e\uf3fc|\uf91e\uf3fd|\uf91e\uf3fe|\uf91e\uf3ff|\uf596\uf3fb|\uf596\uf3fc|\uf596\uf3fd|\uf596\uf3fe|\uf596\uf3ff|\uf918\uf3fb|\uf918\uf3fc|\uf918\uf3fd|\uf918\uf3fe|\uf918\uf3ff|\uf919\uf3fb|\uf919\uf3fc|\uf919\uf3fd|\uf919\uf3fe|\uf919\uf3ff|\uf590\uf3fb|\uf590\uf3fc|\uf590\uf3fd|\uf590\uf3fe|\uf590\uf3ff|\uf44c\uf3fb|\uf44c\uf3fc|\uf44c\uf3fd|\uf44c\uf3fe|\uf44c\uf3ff|\uf44d\uf3fb|\uf44d\uf3fc|\uf44d\uf3fd|\uf44d\uf3fe|\uf44d\uf3ff|\uf44e\uf3fb|\uf44e\uf3fc|\uf44e\uf3fd|\uf44e\uf3fe|\uf44e\uf3ff|\uf44a\uf3fb|\uf44a\uf3fc|\uf44a\uf3fd|\uf44a\uf3fe|\uf44a\uf3ff|\uf91b\uf3fb|\uf91b\uf3fc|\uf91b\uf3fd|\uf91b\uf3fe|\uf91b\uf3ff|\uf91c\uf3fb|\uf91c\uf3fc|\uf91c\uf3fd|\uf91c\uf3fe|\uf91c\uf3ff|\uf91a\uf3fb|\uf91a\uf3fc|\uf91a\uf3fd|\uf91a\uf3fe|\uf91a\uf3ff|\uf44b\uf3fb|\uf44b\uf3fc|\uf44b\uf3fd|\uf44b\uf3fe|\uf44b\uf3ff|\uf91f\uf3fb|\uf91f\uf3fc|\uf91f\uf3fd|\uf91f\uf3fe|\uf91f\uf3ff|\uf44f\uf3fb|\uf44f\uf3fc|\uf44f\uf3fd|\uf44f\uf3fe|\uf44f\uf3ff|\uf450\uf3fb|\uf450\uf3fc|\uf450\uf3fd|\uf450\uf3fe|\uf450\uf3ff|\uf64c\uf3fb|\uf64c\uf3fc|\uf64c\uf3fd|\uf64c\uf3fe|\uf64c\uf3ff|\uf932\uf3fb|\uf932\uf3fc|\uf932\uf3fd|\uf932\uf3fe|\uf932\uf3ff|\uf64f\uf3fb|\uf64f\uf3fc|\uf64f\uf3fd|\uf64f\uf3fe|\uf64f\uf3ff|\uf485\uf3fb|\uf485\uf3fc|\uf485\uf3fd|\uf485\uf3fe|\uf485\uf3ff|\uf442\uf3fb|\uf442\uf3fc|\uf442\uf3fd|\uf442\uf3fe|\uf442\uf3ff|\uf443\uf3fb|\uf443\uf3fc|\uf443\uf3fd|\uf443\uf3fe|\uf443\uf3ff|\uf1e6\uf1e8|\uf1e6\uf1e9|\uf1e6\uf1ea|\uf1e6\uf1eb|\uf1e6\uf1ec|\uf1e6\uf1ee|\uf1e6\uf1f1|\uf1e6\uf1f2|\uf1e6\uf1f4|\uf1e6\uf1f6|\uf1e6\uf1f7|\uf1e6\uf1f8|\uf1e6\uf1f9|\uf1e6\uf1fa|\uf1e6\uf1fc|\uf1e6\uf1fd|\uf1e6\uf1ff|\uf1e7\uf1e6|\uf1e7\uf1e7|\uf1e7\uf1e9|\uf1e7\uf1ea|\uf1e7\uf1eb|\uf1e7\uf1ec|\uf1e7\uf1ed|\uf1e7\uf1ee|\uf1e7\uf1ef|\uf1e7\uf1f1|\uf1e7\uf1f2|\uf1e7\uf1f3|\uf1e7\uf1f4|\uf1e7\uf1f6|\uf1e7\uf1f7|\uf1e7\uf1f8|\uf1e7\uf1f9|\uf1e7\uf1fb|\uf1e7\uf1fc|\uf1e7\uf1fe|\uf1e7\uf1ff|\uf1e8\uf1e6|\uf1e8\uf1e8|\uf1e8\uf1e9|\uf1e8\uf1eb|\uf1e8\uf1ec|\uf1e8\uf1ed|\uf1e8\uf1ee|\uf1e8\uf1f0|\uf1e8\uf1f1|\uf1e8\uf1f2|\uf1e8\uf1f3|\uf1e8\uf1f4|\uf1e8\uf1f5|\uf1e8\uf1f7|\uf1e8\uf1fa|\uf1e8\uf1fb|\uf1e8\uf1fc|\uf1e8\uf1fd|\uf1e8\uf1fe|\uf1e8\uf1ff|\uf1e9\uf1ea|\uf1e9\uf1ec|\uf1e9\uf1ef|\uf1e9\uf1f0|\uf1e9\uf1f2|\uf1e9\uf1f4|\uf1e9\uf1ff|\uf1ea\uf1e6|\uf1ea\uf1e8|\uf1ea\uf1ea|\uf1ea\uf1ec|\uf1ea\uf1ed|\uf1ea\uf1f7|\uf1ea\uf1f8|\uf1ea\uf1f9|\uf1ea\uf1fa|\uf1eb\uf1ee|\uf1eb\uf1ef|\uf1eb\uf1f0|\uf1eb\uf1f2|\uf1eb\uf1f4|\uf1eb\uf1f7|\uf1ec\uf1e6|\uf1ec\uf1e7|\uf1ec\uf1e9|\uf1ec\uf1ea|\uf1ec\uf1eb|\uf1ec\uf1ec|\uf1ec\uf1ed|\uf1ec\uf1ee|\uf1ec\uf1f1|\uf1ec\uf1f2|\uf1ec\uf1f3|\uf1ec\uf1f5|\uf1ec\uf1f6|\uf1ec\uf1f7|\uf1ec\uf1f8|\uf1ec\uf1f9|\uf1ec\uf1fa|\uf1ec\uf1fc|\uf1ec\uf1fe|\uf1ed\uf1f0|\uf1ed\uf1f2|\uf1ed\uf1f3|\uf1ed\uf1f7|\uf1ed\uf1f9|\uf1ed\uf1fa|\uf1ee\uf1e8|\uf1ee\uf1e9|\uf1ee\uf1ea|\uf1ee\uf1f1|\uf1ee\uf1f2|\uf1ee\uf1f3|\uf1ee\uf1f4|\uf1ee\uf1f6|\uf1ee\uf1f7|\uf1ee\uf1f8|\uf1ee\uf1f9|\uf1ef\uf1ea|\uf1ef\uf1f2|\uf1ef\uf1f4|\uf1ef\uf1f5|\uf1f0\uf1ea|\uf1f0\uf1ec|\uf1f0\uf1ed|\uf1f0\uf1ee|\uf1f0\uf1f2|\uf1f0\uf1f3|\uf1f0\uf1f5|\uf1f0\uf1f7|\uf1f0\uf1fc|\uf1f0\uf1fe|\uf1f0\uf1ff|\uf1f1\uf1e6|\uf1f1\uf1e7|\uf1f1\uf1e8|\uf1f1\uf1ee|\uf1f1\uf1f0|\uf1f1\uf1f7|\uf1f1\uf1f8|\uf1f1\uf1f9|\uf1f1\uf1fa|\uf1f1\uf1fb|\uf1f1\uf1fe|\uf1f2\uf1e6|\uf1f2\uf1e8|\uf1f2\uf1e9|\uf1f2\uf1ea|\uf1f2\uf1eb|\uf1f2\uf1ec|\uf1f2\uf1ed|\uf1f2\uf1f0|\uf1f2\uf1f1|\uf1f2\uf1f2|\uf1f2\uf1f3|\uf1f2\uf1f4|\uf1f2\uf1f5|\uf1f2\uf1f6|\uf1f2\uf1f7|\uf1f2\uf1f8|\uf1f2\uf1f9|\uf1f2\uf1fa|\uf1f2\uf1fb|\uf1f2\uf1fc|\uf1f2\uf1fd|\uf1f2\uf1fe|\uf1f2\uf1ff|\uf1f3\uf1e6|\uf1f3\uf1e8|\uf1f3\uf1ea|\uf1f3\uf1eb|\uf1f3\uf1ec|\uf1f3\uf1ee|\uf1f3\uf1f1|\uf1f3\uf1f4|\uf1f3\uf1f5|\uf1f3\uf1f7|\uf1f3\uf1fa|\uf1f3\uf1ff|\uf1f4\uf1f2|\uf1f5\uf1e6|\uf1f5\uf1ea|\uf1f5\uf1eb|\uf1f5\uf1ec|\uf1f5\uf1ed|\uf1f5\uf1f0|\uf1f5\uf1f1|\uf1f5\uf1f2|\uf1f5\uf1f3|\uf1f5\uf1f7|\uf1f5\uf1f8|\uf1f5\uf1f9|\uf1f5\uf1fc|\uf1f5\uf1fe|\uf1f6\uf1e6|\uf1f7\uf1ea|\uf1f7\uf1f4|\uf1f7\uf1f8|\uf1f7\uf1fa|\uf1f7\uf1fc|\uf1f8\uf1e6|\uf1f8\uf1e7|\uf1f8\uf1e8|\uf1f8\uf1e9|\uf1f8\uf1ea|\uf1f8\uf1ec|\uf1f8\uf1ed|\uf1f8\uf1ee|\uf1f8\uf1ef|\uf1f8\uf1f0|\uf1f8\uf1f1|\uf1f8\uf1f2|\uf1f8\uf1f3|\uf1f8\uf1f4|\uf1f8\uf1f7|\uf1f8\uf1f8|\uf1f8\uf1f9|\uf1f8\uf1fb|\uf1f8\uf1fd|\uf1f8\uf1fe|\uf1f8\uf1ff|\uf1f9\uf1e6|\uf1f9\uf1e8|\uf1f9\uf1e9|\uf1f9\uf1eb|\uf1f9\uf1ec|\uf1f9\uf1ed|\uf1f9\uf1ef|\uf1f9\uf1f0|\uf1f9\uf1f1|\uf1f9\uf1f2|\uf1f9\uf1f3|\uf1f9\uf1f4|\uf1f9\uf1f7|\uf1f9\uf1f9|\uf1f9\uf1fb|\uf1f9\uf1fc|\uf1f9\uf1ff|\uf1fa\uf1e6|\uf1fa\uf1ec|\uf1fa\uf1f2|\uf1fa\uf1f3|\uf1fa\uf1f8|\uf1fa\uf1fe|\uf1fa\uf1ff|\uf1fb\uf1e6|\uf1fb\uf1e8|\uf1fb\uf1ea|\uf1fb\uf1ec|\uf1fb\uf1ee|\uf1fb\uf1f3|\uf1fb\uf1fa|\uf1fc\uf1eb|\uf1fc\uf1f8|\uf1fd\uf1f0|\uf1fe\uf1ea|\uf1fe\uf1f9|\uf1ff\uf1e6|\uf1ff\uf1f2|\uf1ff\uf1fc|\uf004|\uf0cf|[\uf170-\uf171]|[\uf17e-\uf17f]|\uf18e|[\uf191-\uf19a]|[\uf201-\uf202]|\uf21a|\uf22f|[\uf232-\uf23a]|[\uf250-\uf251]|[\uf300-\uf321]|[\uf324-\uf393]|[\uf396-\uf397]|[\uf399-\uf39b]|[\uf39e-\uf3f0]|[\uf3f3-\uf3f5]|[\uf3f7-\uf3fa]|[\uf400-\uf4fd]|[\uf4ff-\uf53d]|[\uf549-\uf54e]|[\uf550-\uf567]|[\uf56f-\uf570]|[\uf573-\uf57a]|\uf587|[\uf58a-\uf58d]|\uf590|[\uf595-\uf596]|[\uf5a4-\uf5a5]|\uf5a8|[\uf5b1-\uf5b2]|\uf5bc|[\uf5c2-\uf5c4]|[\uf5d1-\uf5d3]|[\uf5dc-\uf5de]|\uf5e1|\uf5e3|\uf5e8|\uf5ef|\uf5f3|[\uf5fa-\uf64f]|[\uf680-\uf6c5]|[\uf6cb-\uf6d2]|[\uf6e0-\uf6e5]|\uf6e9|[\uf6eb-\uf6ec]|\uf6f0|[\uf6f3-\uf6f8]|[\uf910-\uf93a]|[\uf93c-\uf93e]|[\uf940-\uf945]|[\uf947-\uf94c]|[\uf950-\uf96b]|[\uf980-\uf997]|\uf9c0|[\uf9d0-\uf9e6]/g;

    var configs = {
        url: "//f2e.cn.ronghub.com/sdk/emoji-48.png",
        size: 24,
        lang: "zh",
        reg: unicodeRegExp
    };

    var supportLanguage = [ "en" ,"zh" ];

    var Utils = {
        symbolRegExp: /\[([^\[\]]+?)\]/g,
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
        hasSame: function(moreList, list) {
            var more = moreList.join(' ');
            for (var i = 0; i < list.length; i++) {
                var value = list[i];
                if (Utils.indexOf(more, value) === -1) {
                    return false;
                }
            }
            return true;
        },
        getDom: function(html) {
            var div = document.createElement("div");
            div.innerHTML = html;
            return div.childNodes[0];
        },
        getSymbol: function(name) {
            return "[" + name + "]";
        },
        cutString: function(string, start, length) {
            var array = [];
            for (var i = start; i < start + length; i++) {
                array.push(string.charAt(i));
            }
            return array.join('');
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
        keys: function(item) {
            var arr = [];
            for (var key in item) {
                arr.push(key);
            }
            return arr;
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
        filter: function(arr, func) {
            var array = [];
            for (var i = 0; i < arr.length; i++) {
                var value = arr[i];
                if (func(value)) {
                    array.push[value];
                }
            }
            return array;
        }
    };

    var Logger = {
        LogFactory: {
            "1": {
                code: 1,
                msg: "Emoji参数错误"
            },
            "2": {
                code: 2,
                msg: "Emoji语言设置错误"
            },
            "3": {
                code: 3,
                msg: "新增Emoji错误"
            },
            "4": {
                code: 4,
                msg: "设置size错误"
            },
            "5": {
                code: 5,
                msg: "设置reg错误"
            },
            "6": {
                code: 6,
                msg: "设置背景url错误"
            }
        },
        isShowError: true,
        showErrorInfo: function(errorInfo) {
            console.error(JSON.stringify(errorInfo));
        },
        logger: function(params) {
            var code = params.code;
            var logInfo = this.LogFactory[code] || params;
            var errorInfo = JSON.stringify(logInfo);
            errorInfo = JSON.parse(errorInfo);
            errorInfo.funcName = "RongIMEmoji." + params.funcName;
            errorInfo.msg += ", " + params.msg;
            this.isShowError && this.showErrorInfo(errorInfo);
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
                    var msgTemp = "第{{index}}个参数错误, 错误类型: {{errType}}[{{sucType}}] -> 位置: {{funcName}}";
                    var msg = msgTemp.replace(/{{index}}/g, i + 1).replace(/{{errType}}/g, paramType).replace(/{{sucType}}/g, sucType).replace(/{{funcName}}/g, funcName);
                    Logger.logger({
                        code: 1,
                        funcName: funcName,
                        msg: msg
                    });
                }
            }
        },
        checkConfigParam: function(opt, funcName) {
            this.checkLanguage(opt.lang || configs.lang, funcName);
            this.checkOptType(opt.size || configs.size, "number", 4, funcName);
            this.checkOptType(opt.reg || configs.reg, "regexp|string", 5, funcName);
            this.checkOptType(opt.url || configs.url, "string", 6, funcName);
        },
        checkLanguage: function(lang, funcName) {
            if (Utils.indexOf(supportLanguage, lang) !== -1) {
                return true;
            } else {
                var msgTemp = "不支持语言: {{lang}}, 支持的语言有: {{support}}";
                var msg = msgTemp.replace(/{{lang}}/g, lang).replace(/{{support}}/g, supportLanguage.join(', '));
                Logger.logger({
                    code: 2,
                    msg: msg,
                    funcName: funcName
                });
            }
        },
        checkOptType: function(value, type, code, funcName) {
            var valueType = this.getType(value);
            if (!new RegExp(valueType).test(type)) {
                var msg = "错误的类型: {{errType}}[sucType]";
                msg = msg.replace(/{{errType}}/g, valueType).replace(/{{sucType}}/g, type);
                Logger.logger({
                    code: code,
                    msg: msg,
                    funcName: funcName
                });
            }
        },
        checkDataSource: function(dataSource, funcName) {
            var dataParams = [ "en", "zh", "tag", "position" ];
            for (var key in dataSource) {
                var detail = dataSource[key];
                if (this.getType(detail) !== "object") {
                    var msg = "dataSource.{{unicode}}必须是object类型"
                    msg = msg.replace(/{{unicode}}/g, key);
                    return Logger.logger({ code: 3, msg: msg, funcName: funcName });
                }
                var allKeys = Utils.keys(detail);
                if (!Utils.hasSame(allKeys, dataParams)) {
                    var msgTemp = "dataSource.{{unicode}}必须包含属性: en, zh, tag, position";
                    var msg = msgTemp.replace(/{{unicode}}/g, key);
                    return Logger.logger({ code: 3, msg: msg, funcName: funcName });
                }
            }
        },
        checkAddEmoji: function(newEmojis, funcName) {
            for (var key in newEmojis) {
                if (key === "dataSource") {
                    var dataSource = newEmojis[key];
                    if (this.getType(dataSource) !== "object") {
                        var msg = "dataSource必须是object类型";
                        Logger.logger({ code: 3, msg: msg, funcName: funcName });
                    } else {
                        this.checkDataSource(dataSource, funcName);
                    }
                }
            }
        }
    };

    /* 判断是否支持emoji的渲染 */
    var isSupportEmoji = (function() {
        var getTextFeature = function(text, color) {
            try {
                var canvas = document.createElement("canvas");
                canvas.width = 2;
                canvas.height = 2;
                var ctx = canvas.getContext("2d");
                ctx.textBaseline = "top";
                ctx.font = "100px sans-serif";
                ctx.fillStyle = color;
                ctx.scale(0.02, 0.02);
                ctx.fillText(text, 0, 0);
                var imageData = ctx.getImageData(0, 0, 2, 2).data;
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
    })();


    var addBaseCss = function() {
        var baseCss = ".rong-emoji-content { display: inline-block; overflow: hidden; font-size: 20px !important; text-align: center; vertical-align: middle; overflow: hidden; }";
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
            position: computeBgPosition(item.position, sizePx),
            background: item.background || configs.url,
            name: item[configs.lang],
            tag: item.tag
        };
        return getEmojiShadowDom(emojiObj);
    };

    var getEmojiShadowDom = function(object) {
        var style = "width: {{size}}px; height: {{size}}px; line-height: {{size}}px; background-image: url({{background}}); background-position: {{position}}; background-size: auto {{size}}px;";
        var spanTpl = "<span class='rong-emoji-content' name='[{{name}}]' style='{{style}}''></span>"
        spanTpl = spanTpl.replace(/{{style}}/g, style);
        var ret = spanTpl.replace(/\\?\{\{([^}]+)\}\}/g, function(match, name) {
            return object[name];
        });
        return ret;
    };

    var computeBgPosition = function(position, sizePx) {
        var size = sizePx || configs.size;
        var scale = size / 25;
        position = position.split(" ");
        var x = position[0], y = position[1];
        x = x ? x.split("px")[0] : 0;
        y = y ? y.split("px")[0] : 0;
        return parseInt(x) * scale + "px " + parseInt(y) * scale + "px";
    };

    var setupEmojiDetails = function() {
        var tags = [];
        list.length = 0;
        for (var key in emojiFactory) {
            var detail = emojiFactory[key];
            var lang = configs.lang;
            var shadowDom = createEmojiDom(detail);
            var symbol = Utils.getSymbol(detail[lang]);
            var item = {
                unicode: key,
                symbol: symbol,
                emoji: detail.tag,
                shadowDom: Utils.getDom(shadowDom)
            };
            list.push(item);
            tags.push(escape(detail.tag));
        }
        tags = tags.join("|");
        tags = tags.replace(/%/g, function() {
            return "\\";
        });
        emojiRegExp = new RegExp("(" + tags + ")", "g");
    };

    var setupEmojiFactory = function(newEmojis) {
        var newEmojiFactory = {};
        if (newEmojis) {
            var _emojiFactory = newEmojis.dataSource;
            var _url = newEmojis.url || configs.url;
            for (var key in _emojiFactory) {
                _emojiFactory[key]["background"] = _url;
                newEmojiFactory[key] = _emojiFactory[key];
            }
        }
        emojiFactory = Utils.extend(emojiFactory, newEmojiFactory);
    };

    var calculateUTF = function (char) {
        var unicodes = escape(char).split("%u");
        unicodes = Utils.filter(unicodes, function(code) {
            return code !== "";
        });
        return Utils.map(unicodes, function(code) {
            if (Utils.indexOf(code, "f") !== -1 || Utils.indexOf(code, "F") !== -1) {
                return String.fromCodePoint("0x1" + code);
            } else {
                return String.fromCodePoint("0x" + code);
            }
        }).join("");
    };

    var getEmojiBySymbol = function(symbol) {
        for (var i = 0; i < list.length; i++) {
            var lang = configs.lang;
            var detail = list[i];
            if(detail.symbol === symbol) {
                return detail.emoji;
            }
        }
        return symbol;
    };

    var getDomByEmoji = function(emoji, sizePx) {
        for (var key in emojiFactory) {
            var detail = emojiFactory[key];
            if (detail.tag === emoji) {
                return createEmojiDom(detail, sizePx);
            }
        }
        return false;
    };

    /**
     * 自定义设置
     * @param  {[object]} opt 可包含 lang, reg, url, size
     */
    var setConfig = function(opt) {
        CheckParam.checkConfigParam(opt || {}, "setConfig");
        configs = Utils.extend(configs, opt);
        setupEmojiDetails();
    };

    /**
     * 新增自定义emoji
     * @param {object} newEmojis 可包含dataSource和url, url表示背景图, dataSource包含自定义的unicode和所对应emoji特性
     */
    var addEmojis = function(newEmojis) {
        CheckParam.checkAddEmoji(newEmojis || {}, "addEmojis");
        setupEmojiFactory(newEmojis);
        setupEmojiDetails();
    };
    
    /**
     * 将字符串中的unicode码转化为可以显示的原生emoji字符
     * @param  {string} content 必填，需要转化的包含emoji的字符串
     * @param  {regExp} reg      可选，标识unicode码的匹配范围。默认为init时设置的regExp，如果不设置，默认为/[\uf000-\uf700]/g
     * @return {string}          转化后的字符串
     */
    var unicodeDecode = function(content, reg) {
        reg = reg || configs.reg;
        return content.replace(reg, function(emoji) {
            return calculateUTF(emoji) || emoji;
        });
    };

    /**
     * 将字符串中的原生emoji字符转化为 对应的文字标识
     * @param  {string} content 必填，需要转化的包含emoji的字符串
     * @param  {regExp} reg     可选，匹配的正则表达式
     * @return {string}         转化后的字符串
     */
    var emojiToSymbol = function(content, reg) {
        CheckParam.check(["string", "regexp|null|undefined"], "emojiToSymbol", arguments);
        content = unicodeDecode(content, reg);
        return content.replace(emojiRegExp, function(emojiTag) {
            var lang = configs.lang;
            for (var emojiKey in emojiFactory) {
                var emojiDetail = emojiFactory[emojiKey];
                if (emojiDetail.tag == emojiTag) {
                    var name = emojiDetail[lang];
                    return Utils.getSymbol(name);
                }
            }
        });
    };

    /**
     * 将字符串中的 对应文字标识 转化为原生emoji
     * @param  {string} text 必填 包含symbol的字符串
     * @return {string}
     */
    var symbolToEmoji = function(text) {
        CheckParam.check(["string"], "symbolToEmoji", arguments);
        text = unicodeDecode(text);
        return text.replace(Utils.symbolRegExp, function(symbol) {
            return getEmojiBySymbol(symbol);
        });
    };

    /**
     * 将字符串中的原生emoji字符转化为html标签
     * @param  {string} content 必填，包含原生emoji字符的字符串
     * @param  {int} sizePx     可选，html标签的大小
     * @param  {string} reg     可选，正则表达式
     * @return {string}         转化后，包含emoji背景的span标签
     */
    var emojiToHTML = function(content, sizePx, reg) {
        CheckParam.check(["string", "number|null|undefined", "regexp|null|undefined"], "emojiToHTML", arguments);
        content = unicodeDecode(content, reg);
        return content.replace(emojiRegExp, function(emojiTag) {
            var dom = getDomByEmoji(emojiTag, sizePx);
            return dom || emojiTag;
        });
    };

    /**
     * 将字符串中的 对应文字标识 转化为html标签
     * @param  {string} text 必填，包含symbol的字符串
     * @param  {int} sizePx    可选，html标签的大小
     * @param  {string} reg    可选，正则表达式
     * @return {span标签}       转化后，包含emoji背景的span标签
     */
    var symbolToHTML = function(text, sizePx, reg) {
        CheckParam.check(["string", "number|null|undefined", "regexp|null|undefined"], "symbolToHTML", arguments);
        return text.replace(Utils.symbolRegExp, function(symbol) {
            var emoji = getEmojiBySymbol(symbol);
            var emojiDom = getDomByEmoji(emoji, sizePx);
            return emojiDom || symbol;
        });
    };

    var adaptOldVersion = function() {
        var context = RongIMLib.RongIMEmoji;
        context.init = function(newEmojis, opt) {
            CheckParam.checkConfigParam(opt, "init");
            CheckParam.checkAddEmoji(newEmojis, "init");
            configs = Utils.extend(configs, opt);
            setupEmojiFactory(newEmojis);
            setupEmojiDetails();
        };

        context.emojis = Utils.map(context.list, function(item) {
            return item.shadowDom;
        });
        context.names = (function() {
            var names = [];
            for (var key in emojiFactory) {
                var value = emojiFactory[key];
                var data = {};
                for (var i = 0; i < supportLanguage.length; i++) {
                    var lang = supportLanguage[i];
                    data[lang] = value[lang];
                }
                names.push(data);
            }
            return names;
        })();
        context.data = Utils.map(context.list, function(item) {
            var data;
            for (var key in emojiFactory) {
                var detail = emojiFactory[key];
                if (detail.tag === item.emoji) {
                    data = detail;
                    detail.html = item.shadowDom;
                }
            }
            return data;
        });
    };

    (function init() {
        addBaseCss();
        setupEmojiDetails();
    })();

    return {
        isSupportEmoji: isSupportEmoji,

        setConfig: setConfig,
        addEmojis: addEmojis,

        list: list,
        emojiToSymbol: emojiToSymbol,
        symbolToEmoji: symbolToEmoji,
        emojiToHTML: emojiToHTML,
        symbolToHTML: symbolToHTML,

        adaptOldVersion: adaptOldVersion
    };

});