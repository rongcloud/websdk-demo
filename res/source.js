(function(){
	/*
	url1 = https://rongcloud.github.io/websdk-demo/integrate/guide.html
	url2 = https://github.com/rongcloud/websdk-demo/blob/master/integrate/guide.html
	url1 ==>>  url2
	*/ 

	var d = document;
	var pre1 = "https://rongcloud.github.io/websdk-demo/";
	// var pre1 = "websdk-demo/";
	var pre2 = "https://github.com/rongcloud/websdk-demo/blob/master/";
	var url1 = location.href;
	var url2 = "";
	if(url1.indexOf(pre1) > 0){
		url2 = pre2 + url1.replace(pre1,"");

		var node = d.createElement("a");
			node.href = url2;
			node.textContent = "获取源码";
			node.style.cssText = "text-decoration:none;background:#000;color:#fff;padding:10px 30px;border-radius:5px;position:fixed;right:5px;top:5px;"
		d.body.appendChild(node);
	}
})();