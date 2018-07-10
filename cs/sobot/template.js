;(function(RCS){
	var getTemplates = function(callback){
		var list = {
	        button: 'templates/button.html',
	        chat: 'templates/chat.html',
	        closebefore: 'templates/closebefore.html',
	        conversation: 'templates/conversation.html',
	        endconversation: 'templates/endconversation.html',
	        evaluate: 'templates/evaluate.html',
	        imageView: 'templates/imageView.html',
	        leaveword: 'templates/leaveword.html',
	        main: 'templates/main.html',
	        message: 'templates/message.html',
	        messageTemplate: 'templates/messageTemplate.html',
	        userInfo: 'templates/userInfo.html',
	        evaluateItem: 'templates/evaluateItem.html',
	    };
	    var templates = {};
	    for (var key in list) {
	    	var url = list[key];
	    	var html = RCS.templateCache[url];
	    	if (html) {
	    		templates[key] = html;
	    	} else {
		    	var xhr = new XMLHttpRequest();
		    	xhr.open('get', url, false);
		    	xhr.onreadystatechange = function(){
		    		if (xhr.readyState == 4 && xhr.status == 200) {
		    			templates[key] = xhr.responseText;
		    		}
		    	}
		    	xhr.send(null);
	    	}

	    }
	    return templates;
	}
	RCS.getTemplates = getTemplates;
})(RCS);