describe("RongEmoji", function() {
    var functions = [
        'init','getAllEmoji','emojiToSymbol',
        'symbolToEmoji','emojiToHTML','symbolToHTML',
        'messageDecode'
    ];

    var objects = ['supportLanguage','emojis','names'];
    
    var booleans = ['isSupportEmoji'];

    var RongIMEmoji = window.RongIMLib.RongIMEmoji;

    var _space = ' \t \t \t \t';

    for(var i=0;i<functions.length;i++){
        let name = functions[i];
        let type = typeof RongIMEmoji[name];
        it( "RongIMEmoji." + name + _space + " should be object", function() {
            expect(type).toEqual("function");
        });
    }

    for(var i=0;i<objects.length;i++){
        let name = objects[i];
        let type = typeof RongIMEmoji[name];
        it( "RongIMEmoji." + name + _space + " should be object", function() {
            expect(type).toEqual("object");
        });
    }

    for(var i=0;i<booleans.length;i++){
        let name = booleans[i];
        let type = typeof RongIMEmoji[name];
        it( "RongIMEmoji." + name + _space + " should be object", function() {
            expect(type).toEqual("boolean");
        });
    }

    var _system = window.env.system;
    var _broswer = window.env.broswer;
    if(_system.isMac && _broswer.isChrome){
        it( "RongIMEmoji.isSupportEmoji" + name + _space + " should be true", function() {
            expect(RongIMEmoji.isSupportEmoji).toEqual(true);
        });
    }
});