(function(){
    var u = navigator.userAgent, app = navigator.appVersion;
    var system = {
        // android终端或者uc浏览器
        isAndroid: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
        // 是否为iPhone或者QQHD浏览器
        isIphone: u.indexOf('iPhone') > -1 ,
        // 是否iPad
        isIpad: u.indexOf('iPad') > -1 ,
        // 是否为windows
        isWindows: u.indexOf('Windows NT') > -1 ,
        // 是否为mac
        isMac: u.indexOf('Mac')
    };

    var broswer = {
        isIE : /ie/i.test(navigator.userAgent.toLowerCase()),
        isFirefox : /firefox/i.test(navigator.userAgent.toLowerCase()),
        isChrome : /chrome/i.test(navigator.userAgent.toLowerCase()),
        isOpera : /opera/i.test(navigator.userAgent.toLowerCase()),
        isSafari : /safari/i.test(navigator.userAgent.toLowerCase()),
        isWeixin : /micromessenger/i.test(navigator.userAgent.toLowerCase())
    };

    window.env = {
        system : system,
        broswer : broswer
    }
})();