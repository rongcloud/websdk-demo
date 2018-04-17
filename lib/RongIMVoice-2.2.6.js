var RongIMLib; (function(RongIMLib) {
    var RongIMVoice = (function() {
        function RongIMVoice() {}
        RongIMVoice.init = function() {
            if (this.notSupportH5) {
                var div = document.createElement("div");
                div.setAttribute("id", "flashContent");
                document.body.appendChild(div);
                var script = document.createElement("script");
                script.src = (RongIMLib.RongIMClient && RongIMLib.RongIMClient._memoryStore && RongIMLib.RongIMClient._memoryStore.depend && RongIMLib.RongIMClient._memoryStore.depend.voiceSwfobjct) || "//cdn.ronghub.com/swfobject-2.0.0.min.js";
                var header = document.getElementsByTagName("head")[0];
                header.appendChild(script);
                var browser=navigator.appName; 
                var b_version=navigator.appVersion; 
                var version=b_version.split(";"); 
                var trim_Version=version[1].replace(/[ ]/g,""); 
                script.onload  = function() {
                    var swfVersionStr = "11.4.0";
                    var flashvars = {};
                    var params = {};
                    params.quality = "high";
                    params.bgcolor = "#ffffff";
                    params.allowscriptaccess = "always";
                    params.allowScriptAccess = "always";
                    params.allowfullscreen = "true";
                    var attributes = {};
                    attributes.id = "player";
                    attributes.name = "player";
                    attributes.align = "middle";
                    swfobject.embedSWF((RongIMLib.RongIMClient && RongIMLib.RongIMClient._memoryStore && RongIMLib.RongIMClient._memoryStore.depend && RongIMLib.RongIMClient._memoryStore.depend.voicePlaySwf) || "//cdn.ronghub.com/player-2.0.2.swf", "flashContent", "1", "1", swfVersionStr, null, flashvars, params, attributes)
                    var f_version = swfobject.getFlashPlayerVersion();
                    if(f_version['major'] <= 0 ){
                        console.error("You haven't installed the flash Player yet.");
                    }
                }
                if(!(browser=="Microsoft Internet Explorer" && trim_Version=="MSIE9.0" || trim_Version=="MSIE10.0")) {
                    script.onreadystatechange = script.onload;
                }
            }
            this.isInit = true
        };
        RongIMVoice.play = function(data, duration) {
            this.checkInit("play");
            var me = this;
            if (me.notSupportH5) {
                if(me.thisMovie().doAction){
                    me.thisMovie().doAction("init", data);
                } else {
                    setTimeout(function(){me.play(data, duration);},500);
                }
            } else {
                var key = data.substr( - 10);
                if (this.element[key]) {
                    this.element[key].play();
                }
                me.onCompleted(duration)
            }
        };
        RongIMVoice.stop = function(base64Data) {
            this.checkInit("stop");
            var me = this;
            if (me.notSupportH5) {
                me.thisMovie().doAction("stop")
            } else {
                if (base64Data) {
                    var key = base64Data.substr( - 10);
                    if (me.element[key]) {
                        me.element[key].pause();
                        me.element[key].currentTime = 0
                    }
                } else {
                    for (var key_1 in me.element) {
                        me.element[key_1].pause();
                        me.element[key_1].currentTime = 0
                    }
                }
            }
        };
        RongIMVoice.preLoaded = function(base64Data, callback) {
            var str = base64Data.substr( - 10),
            me = this;
            if (me.element[str]) {
                callback && callback();
                return
            }
            // if (/android/i.test(navigator.userAgent) && /MicroMessenger/i.test(navigator.userAgent)) {
            if(false){    
                var audio = new Audio();
                audio.src = "data:audio/amr;base64," + base64Data;
                me.element[str] = audio;
                callback && callback()
            } else {
                if (!me.notSupportH5) {
                    if (str in me.element) {
                        return
                    }
                    var audio = new Audio();
                    audio.src = "";
                    var nopromise = {
                       catch: new Function()
                    };
                    (audio.play() || nopromise).catch(function () { });  //解决浏览器报错 The play() request was interrupted by a new load request

                    var blob = me.base64ToBlob(base64Data, "audio/amr");
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var data = new Uint8Array(e.target.result);
                        var samples = AMR.decode(data);
                        var pcm = PCMData.encode({
                            sampleRate: 8000,
                            channelCount: 1,
                            bytesPerSample: 2,
                            data: samples
                        }); 
                        audio.src = "data:audio/wav;base64," + btoa(pcm);
                        me.element[str] = audio;
                        callback && callback() 
                    };        
                    reader.readAsArrayBuffer(blob)
                }else {
                    callback && callback()
                }
            }
        };
        RongIMVoice.onprogress = function() {};
        RongIMVoice.checkInit = function(position) {
            if (!this.isInit) {
                throw new Error("RongIMVoice is not init,position:" + position)
            }
        };
        RongIMVoice.thisMovie = function() {
            return eval("window['player']")
        };
        RongIMVoice.onCompleted = function(duration) {
            var me = this;
            var count = 0;
            var timer = setInterval(function() {
                count++;
                me.onprogress();
                if (count >= duration) {
                    clearInterval(timer)
                }
            },
            1000);
            if (me.notSupportH5) {
                me.thisMovie().doAction("play")
            }
        };
        RongIMVoice.base64ToBlob = function(base64Data, type) {
            var mimeType;
            if (type) {
                mimeType = {
                    type: type
                }
            }
            base64Data = base64Data.replace(/^(.*)[,]/, "");
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);
            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);
                var bytes = new Array(end - begin);
                for (var offset = begin,
                i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0)
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes)
            }
            return new Blob(byteArrays, mimeType)
        };
        RongIMVoice.notSupportH5 = /Trident/.test(navigator.userAgent);
        RongIMVoice.element = {};
        RongIMVoice.isInit = false;
        return RongIMVoice
    } ());
    RongIMLib.RongIMVoice = RongIMVoice;
    if ("function" === typeof require && "object" === typeof module && module && module.id && "object" === typeof exports && exports) {
        module.exports = RongIMVoice
    } else {
        if ("function" === typeof define && define.amd) {
            define("RongIMVoice", [],
            function() {
                return RongIMVoice
            })
        }
    }
})(RongIMLib || (RongIMLib = {}));