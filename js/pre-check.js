(function(){
	/*
	检测代码建议放在SDK加载之后，init运行之前。
	*/

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


	//todo more
	function browser(){
		//above IE8
	}

	function supportStorage(){
		var store = window.localStorage;
		if(!store){
			alert("localStorage 不支持.")
			return false;
		}
		
		var key = "test" + new Date().getTime();

		try {
            store.setItem(key, key);
            store.removeItem(key);
        } catch (err) {
        	alert("localStorage 被禁用.");
        }
	}


	function checkFunctionPure(funcName){
		var d = document, w = window;
		var id = "RongCloudCloud-API-Test" + new Date().getTime;
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
			alert(funcName + " is broken");
		}
		//function WebSocket() { [native code] }
	}
})();