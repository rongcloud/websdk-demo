/*
环境检测代码：建议放在融云 SDK 运行的上下文环境进行测试
*/

;(function(){
	//模块化下载判断
	if(typeof exports === 'object' && typeof module !== 'undefined'){
        alert("当前环境使用了 CMD 协议，必须使用 CMD 协议加载 SDK."); 
    }else if(typeof define === 'function' && define.amd){
        alert("当前环境使用了 AMD 协议，必须 AMD 协议加载 SDK."); 
    }else{
        alert("当前环境没使用 CMD 或 AMD，可以通过 src 的方式引入 SDK"); 
    }

	//protocal
	(function(){
		var url = location.href;
		if(url.indexOf("http://") == -1 && url.indexOf("https://") == -1){
			alert("页面必须运行在 http(s) 协议下");
		}else{
			console.log("location.protocal ok");
		}
	})();

	//WebSocket
	checkFunctionPure("WebSocket");


	//localStorage
	supportStorage();

	function supportStorage(){
		var store = window.localStorage;
		if(!store){
			alert("当前浏览器不支持 localStorage.")
			return false;
		}
		
		var key = "test" + new Date().getTime();

		try {
            store.setItem(key, key);
            store.removeItem(key);
        } catch (err) {
        	alert("隐私模式 localStorage 被禁用.");
        }
	}


	function checkFunctionPure(funcName){
		var d = document, w = window;
		var id = "RongCloudCloud-API-Test";
		var iframe = d.getElementById(id);
		if(!iframe){
			iframe = d.createElement("iframe");
			iframe.id = id;
			iframe.style.display = "none";
			d.body.appendChild(iframe);
		}
		var funcPure = iframe.contentWindow[funcName];
		var funcNow = w[funcName];

		if(funcPure.toString() == funcNow.toString()){
			console.log(funcName + " ok");
		}else{
			alert("原生 " + funcName + " 被重定义，无法使用");
		}
		//function WebSocket() { [native code] }
	}
})();