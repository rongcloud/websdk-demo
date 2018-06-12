;(function(RCS){
	var utils = RCS.utils;
	var emoji = RCS.emoji;
	var render = utils.render;
	var conversation = {};
	conversation.lastSendTime = 0;
	conversation.lastInputTime = 0;
	conversation.evaluateStatus = true;//判断评价的类型，用户关闭时出现的还是客服主动下发的
	conversation.closeStatus = 1;
	conversation.messageContent = [];
	conversation.evaluateFormValue = {};
	conversation.evaluateFormValue.isresolve = 1;
	var voicePlay = null;
	var userInfoValue = {};//保存收集用户信息的相关数据
	var templates = {};
	var $ = utils.$;
	var terminal;
	var supportNot = false;//页面是否支持notification
	var sdkConnect = 0;

	//加载模板
	var getTemplates = function(callback){
		templates = RCS.getTemplates();
		callback && callback();
	}

	//键盘回车发送
	var keySend = function(event){
		if (event.keyCode == '13' && !event.shiftKey) {
			event.preventDefault()
			send();
		} else if(conversation.needTypSts == 1){
			inputChange();
		}
	}
	//发送
	var send = function(){
		var inputMsg = $(".rongcloud-text")[0];
		var message = inputMsg.value;
		if (message) {
			message = emoji.symbolToEmoji(message);
			sendMessage(new RongIMLib.TextMessage({content:message,extra:"附加信息"}));
			inputMsg.value = '';
			inputMsg.focus();
		}
	}
	//每6秒执行一次正在输入消息发送
	var inputChange = function(){
	 	var timespan = new Date().getTime() - conversation.lastSendTime;
        if (timespan > 1000 * 6) {
            conversation.lastSendTime += timespan;
            sendTyping();
        }
	}
	//正在输入中
	var sendTyping = function(){
        if (conversation.targetType == RongIMLib.ConversationType.CUSTOMER_SERVICE) {
        	var msg = new RongIMLib.TypingStatusMessage({
                typingContentType:'RC:TxtMsg',
                data:null
            });
            var callback = function(){};
            sendMessage(msg,callback);
        }
	}
	//显示表情
	var showemoji = function(event){
		event.stopPropagation();
		var emojiContent = $('.rongcloud-expressionWrap')[0];
		if (emojiContent.style.display == 'none') {
			utils.show(emojiContent);
		} else {
			utils.hide(emojiContent);
		}
	}
	//表情点击
	var chooseEmoji = function(event){
		event.stopPropagation();
		var emojiContent = $('.rongcloud-expressionWrap')[0];
		var thisTarget = event.target || event.srcElement;
		var textArea = $('.rongcloud-text')[0];
		if (thisTarget.className == 'RC_Expression') {
			thisTarget = thisTarget.parentNode;
		}
		var emojiName = thisTarget.getAttribute('name');
		if (emojiName) {
			textArea.value += emojiName;
			utils.hide(emojiContent);	
			if (terminal == 'pc') {
				textArea.focus();
				range = document.createRange();
				range.selectNodeContents(textArea);
				range.collapse(true);
				range.setEnd(textArea, textArea.childNodes.length);
				range.setStart(textArea, textArea.childNodes.length);
				sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			}
		}
	}

	function textMessageFormat(content) {
	    if(content.length === 0){
	        return '';
	    }

	    content = utils.encodeHtmlStr(content);

	    content = utils.replaceUri(content, function(uri, protocol) {
	        var link = uri;
	        if (!protocol) {
	            link = 'http://' + uri;
	        }
	        return '<a class="rong-link-site" target="_blank" href="'+ link +'">' + uri + '</a>';
	    });

	    content = utils.replaceEmail(content, function(email) {
	        return '<a class="rong-link-email" href="mailto:' + email + '">' + email + '<a>';
	    });
	    return emoji.emojiToHTML(content, 18);
	}

	//发送消息
	var sendMessage = function(msg,callback){
		var targetId = conversation.id; // 目标 Id
		RongIMClient.getInstance().sendMessage(conversation.targetType, targetId, msg, {
            // 发送消息成功
            onSuccess: function (message) {
            	console.log(message);
                //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
                console.log("Send successfully");
                callback && callback();
                if (!callback) {
                	updateMessage(message);
                }
            },
            onError: function (errorCode,message) {
                var info = '';
                switch (errorCode) {
                    case RongIMLib.ErrorCode.TIMEOUT:
                        info = '超时';
                        break;
                    case RongIMLib.ErrorCode.UNKNOWN_ERROR:
                        info = '未知错误';
                        break;
                    case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
                        info = '在黑名单中，无法向对方发送消息';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
                        info = '不在讨论组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_GROUP:
                        info = '不在群组中';
                        break;
                    case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
                        info = '不在聊天室中';
                        break;
                    default :
                        info = x;
                        break;
                }
                console.log('发送失败:' + info);
            }
       	});
	}

	//显示新消息
	var updateMessage = function(message){
		conversation.messageContent.push(message);
		var newMessage = modifyMessage(utils.cloneObj(message));
		if (message.messageDirection != 1 && supportNot) {
			pushMessage(newMessage);
		}
		var messageList = $(".rcs-message-box")[0];
		if (!messageList) {
			return;
		}
		if (newMessage.sentTime - conversation.lastSendTime >= 60000) {//超过1分钟
			var messageTime = {};
			messageTime.content = {};
			messageTime.messageType = 'TimeMessage';
			messageTime.sentTime = utils.getTime(newMessage.sentTime);
			messageList.innerHTML += render(templates.messageTemplate,messageTime);
			conversation.lastSendTime = newMessage.sentTime;
		}
		messageList.innerHTML += render(templates.messageTemplate,newMessage);
		messageList.scrollTop = messageList.scrollHeight;
	}

	//web push message
	var pushMessage = function(msg){
		if (terminal == 'pc') {
			var title = '客服消息提醒';
			var options = {
		        body: "您有一条新消息，请及时回复",
		        icon: (msg.content.user&&msg.content.user.icon) ? msg.content.user.icon : RCS.config.csIcon,
		    };
		    var notification = new Notification(title,options);

		    notification.onclick = function(event) {
		        window.focus();
		        notification.close();
		    }
		    notification.onshow = function() {  
	            setTimeout(function() {  
	                notification.close();
	            }, 5000);  
	        };
		}
	}

	//图片新消息图片加载完毕滚动到最下面
	var scrollBottom = function(){
		var messageList = $(".rcs-message-box")[0];
		messageList.scrollTop = messageList.scrollHeight;
	}
	//加载历史消息
	var loadHisMessages = function(){
		var callbacks = function(list,hasMsg){
			var messageBox = $(".rcs-message-box")[0];
			var messageList = {};
			messageList.hasMore = hasMsg;
			messageList.list = modificateMessage(conversation.messageContent);
			var oldHeight = messageBox.scrollHeight;
			messageBox.innerHTML = render(templates.message,messageList);
			var newHeight = messageBox.scrollHeight;
			messageBox.scrollTop = newHeight-oldHeight;
		}
		getHisMessage(conversation.id,null,20,callbacks);
	}

	//生成会话列表界面
	var createConversation = function(config){
		var data = {
			"showConversitionList": config.showConversitionList
		}
		if (data.showConversitionList) {
			data.conversationList = render(templates.conversation,config.customers);
		}
		$(".customer-service")[0].innerHTML = render(templates.main,data);

		var conversationList = $(".rong-conversation");
		for(var i=0;i<conversationList.length;i++){
			conversationList[i].onclick = function(){
				if (conversation.id == this.getAttribute("_cid")) {
					return;
				}
				conversation.id = this.getAttribute("_cid");
				//初始化客服
				startCustomerServer(conversation.id);
			};
		}
	}

	//进入指定会话
	var openConversation = function(conversationId){
		conversation.targetType = RongIMLib.ConversationType.CUSTOMER_SERVICE;
		var chat = $(".rcs-chat-wrapper")[0];
		var data = {};
		var messageList = {};
		messageList.firstEnter = true;
		data.messageList = render(templates.message, messageList);
		data.evaEntryPoint = conversation.evaEntryPoint;
		data.terminal = terminal;
		data.announce = conversation.announce;
		$(".rcs-chat-wrapper")[0].innerHTML = render(templates.chat, data);
		//初始化表情
		var emojiList = emoji.getEmoji();
		var strHtml = '';
		for (var i = 0; i < emojiList.length; i++) {
			strHtml += '<div class="emojiItem">'+emojiList[i].outerHTML+'</div>';
		}
		$('.rongcloud-expressionContent')[0].innerHTML += strHtml;
		var callbacks = function(list,hasMsg){
			if (hasMsg || list.length != 0) {
				$('.rongcloud-Messages-history')[0].style.display = 'block';
			}
		}
		getHisMessage(conversationId,0,2,callbacks);
	}

	//拉去消息记录
	var getHisMessage = function(conversationId,timestrap,count,callbacks){
		var conversationType = RongIMLib.ConversationType.CUSTOMER_SERVICE; //私聊,其他会话选择相应的消息类型即可。
		var targetId = conversationId; // 想获取自己和谁的历史消息，targetId 赋值为对方的 Id。
		// timestrap默认传 null，若从头开始获取历史消息，请赋值为 0 ,timestrap = 0;
		// count每次获取的历史消息条数，范围 0-20 条，可以多次获取。
		RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
		  onSuccess: function(list, hasMsg) {
		  	console.log(list);
		  	conversation.messageContent = list.concat(conversation.messageContent);
		  	callbacks(list,hasMsg);
		  },
		  onError: function(error) {
		    console.log("GetHistoryMessages,errorcode:" + error);
		  }
		});
	}

	//单条消息修饰
	var modifyMessage = function(msg){
		if (msg.messageType == 'TextMessage') {
			msg.content.content = textMessageFormat(msg.content.content);
		} else if (msg.messageType == 'FileMessage') {
			msg.content.size = utils.getFileSize(msg.content.size);	
		} else if (msg.messageType == 'InfoNtf') {
			msg.messageType = 'InformationNotificationMessage';
		} else if (msg.messageType == 'VoiceMessage'){
			RongIMLib.RongIMVoice.preLoaded(msg.content.content);
		} else if (msg.messageType == 'PullLeaveMessage'){
        	msg.messageType = 'AlertMessage';
            msg.content.content = msg.content.content.replace('留言', '<a class="leavemessageHref" onclick="RCS.leavemessage()">留言</a>');
		}
		return msg;
	}

	//消息修饰
	var modificateMessage = function(list){
		var listTemp = JSON.parse(JSON.stringify(list));
		var _list = [];
		for (var i = 0; i < listTemp.length; i++) {
			var messageTime = {
				sentTime: utils.getTime(listTemp[i].sentTime),
				messageType: 'TimeMessage'
			};
			var messageMap = [
				"TextMessage",
				"FileMessage",
				"InfoNtf",
				"ImageMessage",
				"InformationNotificationMessage",
				"VoiceMessage",
				"PullLeaveMessage"
			];
			if (messageMap.indexOf(listTemp[i].messageType) >= 0) {
				listTemp[i] = modifyMessage(listTemp[i]);
			} else {
				continue;
			}
			if (i == 0) {
				_list.push(messageTime);
			}else if (listTemp[i].sentTime - listTemp[i-1].sentTime >= 6000) {
				_list.push(messageTime);
			}
			_list.push(listTemp[i]);
		}
		return _list;
	}

	//客服初始化
	var startCustomerServer = function(targetId){
		RongIMLib.RongIMClient.getInstance().startCustomService(targetId, {
            onSuccess: function() {
                console.log('客服初始化成功');
                conversation.connect = true;
            },
            onError: function() {
                
            }
        },RCS.config.extraInfo);
	}

	//断开客服连接
	var stopCustomerServer = function(callback){
		console.log(conversation.id);
		RongIMLib.RongIMClient.getInstance().stopCustomeService(conversation.id, {
		    onSuccess: function() {
		    	conversation.connect = false;
		    	console.log('客服断开成功');
		    	callback && callback();
		    },
		    onError: function(errorcode) {
		    	console.log('errorcode');
		    }
		});
	}

	//改变键盘状态
	var changeServiceState = function(status){
		if (status == 'robot') {
			conversation.serviceState = 'robot';
			utils.hide($('.rongcloud-mode1')[0]);
			utils.show($('.rongcloud-mode2')[0]);
		} else {
			conversation.serviceState = 'people';
			utils.hide($('.rongcloud-mode2')[0]);
			utils.show($('.rongcloud-mode1')[0]);
		}
	}

	//转人工
	var switchPerson = function(){
		console.log(conversation.id);
		RongIMLib.RongIMClient.getInstance().switchToHumanMode(conversation.id, {
			onSuccess: function() {
				console.log('转人工成功');
			},
			onError: function() {
			
			}
		});
	}
	//转人工的监听
	var changeModeResponse = function(message){
		conversation.evaluate = message.content.data.satisfaction;
		var systemMsg = null;
		switch (message.content.data.status){
			case 1:
				changeServiceState('people');
				break;
			case 2:
                changeServiceState('robot');
                break;
            case 3:
                systemMsg = '你被拉黑了';//用户被拉黑,灰条消息你被拉黑了
                break;
            case 4:
                systemMsg = '已经是人工了';//用户已经转人工，灰条消息已经是人工了
                break;
            default:
                break;
		}
		return systemMsg;
	}
	//发送欢迎语
	var addCustomServiceInfo = function(msg){
		var message = {};
		message.sentTime = new Date().getTime();
		message.content = {};
		message.messageType = 'TextMessage';
		message.content.content = msg.robotWelcome;
		message.content.user = {};
		message.content.user.icon = msg.robotIcon;
		message.content.user.name = msg.robotName;
		console.log(message);
		updateMessage(message);
	}
	//发送灰条消息
	var addServiceTip = function(content){
		var message = {};
		message.sentTime = new Date().getTime();
		message.content = {};
		message.messageType = 'InformationNotificationMessage';
		message.content.message = content;
		console.log(message);
		updateMessage(message);
	}

	//播放音频
	var play = function(event, msgContent){
		RongIMLib.RongIMVoice.stop();
		var thisTarget = event.target || event.srcElement;
		if (thisTarget.className.indexOf('rongcloud-animate') != -1) {
			thisTarget.className = thisTarget.className.replace(' rongcloud-animate','');
			clearTimeout(voicePlay);
		} else {
			var audioStatusNode = thisTarget.parentNode.querySelector('.rongcloud-audioState');
			if (audioStatusNode) {
				audioStatusNode.parentNode.removeChild(audioStatusNode);
			}
			if (voicePlay) {
				clearTimeout(voicePlay);
				var voiceList = $('.rongcloud-audioBox');
				for (var i = 0; i < voiceList.length; i++) {
					voiceList[i].className = 'rongcloud-audioBox rongcloud-clearfix';
				}
			}
			RongIMLib.RongIMVoice.play(msgContent.content, msgContent.duration);
			thisTarget.className = thisTarget.className +' rongcloud-animate';
			voicePlay = setTimeout(function(){
				thisTarget.className = thisTarget.className.replace(' rongcloud-animate','');
			},msgContent.duration * 1000);
		}
	}
	//播放视频
	var playVideo = function (event) {
		var video = event.currentTarget.querySelector('video');
        var btn = event.currentTarget.querySelector('.play-btn');
        if (video.paused) {
            video.play();
            btn.style.display = "none";
        } else {
            video.pause();
            btn.style.display = "block";
        }
        video.onended = function () {
            btn.style.display = "block";  
        }
	}

	//播放视频
	var playVideo = function (event) {
		var video = event.currentTarget.querySelector('video');
        var btn = event.currentTarget.querySelector('.play-btn');
        if (video.paused) {
            video.play();
            btn.style.display = "none";
        } else {
            video.pause();
            btn.style.display = "block";
        }
        video.onended = function () {
            btn.style.display = "block";  
        }
	}

	//img上传图片
	var imgUpload = function(event){
		var thisTarget = event.target || event.srcElement;
		var _file = thisTarget.files;
		for (var i = 0; i < _file.length; i++) {
			RCS.imageStartUpload(_file[i],function(data){
				console.log("文件上传完成：", data);
				getFileUrl(data);
			});
		}
		thisTarget.value = '';
	}
	//上传文件
	var fileUpload = function(event){
		var thisTarget = event.target || event.srcElement;
		var _file = thisTarget.files;
		for (var i = 0; i < _file.length; i++) {
			RCS.fileStartUpload(_file[i],function(data){
				console.log("文件上传完成：", data);
				getFileUrl(data);
			});
		}
		thisTarget.value = '';
	}

	var urlItem = {
		file: function(data){
			if (RCS.config.upload && RCS.config.upload.isPrivate) {
				if (data.rc_url.type == 1) {
					data.downloadUrl = data.rc_url.path;
				} else {
					data.downloadUrl = RCS.config.upload.fileServer + data.rc_url.path;
				}
				var msg = messageItem[data.fileType](data);
				sendMessage(msg);
			} else {
				var fileType = RongIMLib.FileType.FILE;
				RongIMClient.getInstance().getFileUrl(fileType, data.filename, data.name, {
					onSuccess: function(result){
						data.downloadUrl = result.downloadUrl;
						var msg = messageItem[data.fileType](data);
						sendMessage(msg);
					},
					onError: function(error){
						showResult('getFileToken error:' + error);
					}
				});
			}
		},
		image: function(data){
			if (RCS.config.upload && RCS.config.upload.isPrivate) {
				if (data.rc_url.type == 1) {
					data.downloadUrl = data.rc_url.path;
				} else {
					data.downloadUrl = RCS.config.upload.fileServer + data.rc_url.path;
				}
				var msg = messageItem[data.fileType](data);
				sendMessage(msg);
			} else {
				var fileType = RongIMLib.FileType.IMAGE;
				RongIMClient.getInstance().getFileUrl(fileType, data.filename, null, {
					onSuccess: function(result){
						data.downloadUrl = result.downloadUrl;
						var msg = messageItem[data.fileType](data);
						sendMessage(msg);
					},
					onError: function(error){
						console.log(error);
					}
				});
			}
		}
	};
	var messageItem = {
        file: function(file){
            var name = file.name || '',
            index = name.lastIndexOf('.') + 1,
            type = name.substring(index);
            // 发送文件消息请参考： http://rongcloud.cn/docs/web_api_demo.html#发送消息
            // 创建文件消息
            return new RongIMLib.FileMessage({ name: file.name, size: file.size, type: type, fileUrl: file.downloadUrl});
        },
        image: function(image){
            return new RongIMLib.ImageMessage({content: image.thumbnail, imageUri: image.downloadUrl});
        }
    };

	var getFileUrl = function(data){
		urlItem[data.fileType](data);
	}

	//客服关闭
	var endConversation = function(isCustomerService){
		if (isCustomerService) {
			//客服主动关闭
			if (conversation.serviceState == 'people') {
				$('.rcs-chat-wrapper')[0].innerHTML += utils.render(templates.evaluate,conversation.evaluate[0]);
			} else {
				evaluate(false);
			}
		} else {
			if (conversation.closeStatus == 1) {
				//用户主动关闭
				$('.rcs-chat-wrapper')[0].innerHTML += templates.endconversation;
			} else if (conversation.closeStatus == 2) {
				//主动留言关闭
				utils.removeNode('.rongcloud-leavemessage');
				conversation.closeStatus = 1;
			} else if (conversation.closeStatus == 3) {
				//拉黑留言关闭
				stopCustomerServer();
				endComplete();
				conversation.closeStatus = 1;
			}
		}
	}

	//完全关闭
	var endComplete = function(){
		$(".rcs-chat-wrapper")[0].innerHTML = '';
		utils.hide($('.customer-service')[0]);
		conversation.lastSendTime = 0;
		conversation.announce = {};
		conversation.messageContent = [];//完全退出清空数据
		conversation.evaluateFormValue = {};
	}
	//只关闭当前窗口
	var closeEvaluate = function(){
		utils.removeNode('.rongcloud-evaluate');
	}

	//confirm
	var confirm = function(){
		//确定关闭
		close();
		if (conversation.serviceState == 'people') {
			$('.rcs-chat-wrapper')[0].innerHTML += utils.render(templates.evaluate,conversation.evaluate[0]);
		} else {
			evaluate(false);
		}
	}

	var close = function(){
		//取消关闭
		utils.removeNode('.rongcloud-layermbox');
	}

	var chatEnd = function(){
		stopCustomerServer();//确定关闭了，先关闭客服链接
		endComplete();
	}

	var star = function(num){
		var starList = $('.satisfaction-star');
		for (var i = 0; i < starList.length; i++) {
			starList[i].className = "satisfaction-star";
			if (i<num) {
				starList[i].className = "satisfaction-star satisfaction-star-selected";
			}
		}
		var evaluateObj = conversation.evaluate[num-1];
		if (num == 5) {
			evaluateObj.labelNameArray = [];
		} else {
			conversation.evaluateFormValue.isTagMust = evaluateObj.isTagMust;
			conversation.evaluateFormValue.isInputMust = evaluateObj.isInputMust;
			evaluateObj.labelNameArray = evaluateObj.labelName.split(',');
		}
		$('.rongcloud-evaluate-tag')[0].innerHTML = utils.render(templates.evaluateItem,evaluateObj);
	}
	var evaluate = function(isForm){
		//评价
		var callback = function(){
			close();
			$('.rcs-chat-wrapper')[0].innerHTML += templates.closebefore;
		}
		if (isForm) {
			if (!validateEvaluate()) {
				return;
			} //表单验证
			if (conversation.evaluate[0].isQuestionFlag != 1) {
				conversation.evaluateFormValue.isresolve = -1;
			}
			var source = 0;
			var starList = $('.satisfaction-star');
			for (var i = 0; i < starList.length; i++) {
				if (starList[i].className.indexOf("satisfaction-star-selected") != -1) {
					source += 1;
				}
			}
			conversation.evaluateFormValue.source = source;
			conversation.evaluateFormValue.type = 1;
			var msg = new RongIMClient.RegisterMessage.EvaluateMessage(conversation.evaluateFormValue);
			console.log(msg);
			console.log(conversation.evaluateFormValue);
			RongIMClient.getInstance().sendMessage(conversation.targetType,conversation.id,msg,{
				onSuccess: function() {
		    		console.log('发送评价消息成功');
		    		callback();
			    },
			    onError: function() {

			    }
			});
		} else {
			callback();
		}
	}
	//点击isresolve
	var isresolve = function(event,num){
		conversation.evaluateFormValue.isresolve = num;
		var thisTarget = event.target || event.srcElement;
		var solveList = $('.rongcloud-solve-tag');
		for (var i = 0; i < solveList.length; i++) {
			solveList[i].className = 'rongcloud-group-tag rongcloud-solve-tag';
		}
		thisTarget.className = 'rongcloud-group-tag rongcloud-solve-tag rongcloud-solve-active';
	}

	//tag点击
	var tagClick = function(event){
		var thisTarget = event.target || event.srcElement;
		if (thisTarget.className.indexOf("rongcloud-group-tag-active") != -1) {
			thisTarget.className = 'rongcloud-group-tag rongcloud-tag-item';
		} else {
			thisTarget.className = 'rongcloud-group-tag rongcloud-tag-item rongcloud-group-tag-active';
		}
	}

	//评价表单验证
	var validateEvaluate = function(){
		var tagList = $('.rongcloud-tag-item');
		var tag = [];
		for (var i = 0; i < tagList.length; i++) {
			if (tagList[i].className.indexOf("rongcloud-group-tag-active") != -1) {
				tag.push(tagList[i].innerText);
			}
		}
		conversation.evaluateFormValue.tag = tag.join();
		conversation.evaluateFormValue.suggest = $('.rongcloud-evaluate-suggest')[0] ? $('.rongcloud-evaluate-suggest')[0].value : '';
		if (conversation.evaluateFormValue.isTagMust) {
			if (!conversation.evaluateFormValue.tag) {
				showError('请选择存在的问题');
				return false;
			}
		}
		if (conversation.evaluateFormValue.isInputMust) {
			if (!conversation.evaluateFormValue.suggest) {
				showError('请输入评价内容');
				return false;
			}
		}
		return true;
	}

	//页面错误提示
	function showError(str){
		if ($('.rongcloud-errorInfo')[0]) {
			return;
		}
		var node=document.createElement("div");
		node.className = 'rongcloud-errorInfo';
		node.innerText = str;
		$('.rcs-chat-wrapper')[0].appendChild(node);
		utils.fadein($('.rongcloud-errorInfo')[0]);
		setTimeout(function(){
			utils.fadeout($('.rongcloud-errorInfo')[0]);
			setTimeout(function(){
				$('.rcs-chat-wrapper')[0].removeChild(node);
			},500);
		},1000);
	}

	//主动发起评价
	var startEvaluate = function(event){
		var thisTarget = event.target || event.srcElement;
		// thisTarget.parentNode.parentNode.removeChild(thisTarget.parentNode);
		pullEva();
	}

	//客服发送评价
	var pullEva = function(){
		conversation.evaluateStatus = false;
        $('.rcs-chat-wrapper')[0].innerHTML += utils.render(templates.evaluate,conversation.evaluate[0]);
	}

	//获取评价数据
	// var getEvaluateValue = function(){
	// 	var satisfactionList = document.getElementsByName('satisfaction');
	// 	var source = '';
	// 	for (var i = 0; i < satisfactionList.length; i++) {
	// 		if (satisfactionList[i].checked) {
	// 			source = satisfactionList[i].value;
	// 		}
	// 	}
	// 	var suggest = document.getElementsByName('suggest')[0].value;
	// 	return {
	// 		source: source,
	// 		suggest: suggest
	// 	}
	// }

	//留言
	var leavemessage = function(isblack){
		if (isblack) {
			conversation.closeStatus = 3;
		} else {
			conversation.closeStatus = 2;
		}
		var messageData = {};
		// messageData.url = conversation.leaveMsgUrl;
		messageData.list = conversation.formList;
		$('.rcs-chat-wrapper')[0].innerHTML += render(templates.leaveword,messageData);
	}
	//留言提交
	var leaveMessageComfirm = function(event){
		event.preventDefault();
		var formItemList = [];
		for (var i = 0; i < conversation.formList.length; i++) {
			formItemList.push(conversation.formList[i].name);
		}
		var isValidate = true;
		for (var i = 0; i < formItemList.length; i++) {
			var thisTarget = document.getElementsByName(formItemList[i])[0];
			if (!validateLeaveMessage(i,thisTarget)) {
				isValidate = false;
			}
		}
		if (!isValidate) {
			return;
		}
		var data = utils.getFormValue(formItemList);
		var msg = new RongIMClient.RegisterMessage.LeaveMessage(data);//发送留言消息
		var callback = function(){
			stopCustomerServer();
			endComplete();
		}
		sendMessage(msg,callback);
	}

	//留言表单验证
	var validateLeaveMessage = function(index,eventOrTarget){
		var verificationMap = {
            email: '^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$',
            phone: '^1\\d{10}$'
        }
		var thisTarget = (eventOrTarget.target || eventOrTarget.srcElement)? (eventOrTarget.target || eventOrTarget.srcElement):eventOrTarget;
		var thisValue = thisTarget.value;
		var validateStr = '';
		var list = conversation.formList;
		if (list[index].required) {
			if (!thisValue) {
				validateStr = list[index].message[0];
			}
		}
		if (thisValue && list[index].verification) {
			var reg = new RegExp(verificationMap[list[index].verification]);
			if (!reg.test(thisValue)) {
				validateStr = list[index].message[1];
			}
		}
		if (thisValue && list[index].max) {
			if (thisValue.length > list[index].max) {
				validateStr = list[index].message[2];
			}
		}
		var nextTarget = thisTarget.nextElementSibling;
		if (validateStr) {
			nextTarget.innerHTML = validateStr;
			utils.show(nextTarget);
			return false;
		} else {
			nextTarget.innerHTML = '';
			utils.hide(nextTarget);
			return true;
		}
	}

	//最小化
	var minimize = function(){
		utils.hide($('.customer-service')[0]);
	}

	//预览图片
	var viewImage = function(event){
		var thisTarget = event.target || event.srcElement;
		var image = {
			imageUrl: thisTarget.getAttribute('data-img')
		}
		$('.imageViewBox')[0].innerHTML = render(templates.imageView,image);
		utils.fadein($('.imageViewBox')[0]);
	}
	var escImageView = function(){
		$('.imageViewBox')[0].innerHTML = '';
		utils.fadeout($('.imageViewBox')[0]);
	}

	//用户表单验证
	var validateUserInfo = function(eventOrTarget){
		var verificationMap = {
            name: '^[\u4E00-\u9FA5A-Za-z0-9]+$',
            phone: '^1[3|4|5|7|8][0-9]{9}$',
            email: '^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$'
        }

		var thisTarget = (eventOrTarget.target || eventOrTarget.srcElement)? (eventOrTarget.target || eventOrTarget.srcElement):eventOrTarget;
		var thisValue = thisTarget.value;
		var thisName = thisTarget.getAttribute('name');
		var thisLabel = thisTarget.getAttribute('data-label');
		var thisRequired = thisTarget.getAttribute('data-required');
		var thisRule = thisTarget.getAttribute('data-pattern');
		var validateStr = '';
		if (thisRequired == 'required') {
			if (!thisValue) {
				validateStr = thisLabel+'不能为空';
			}
		}

		if (thisValue && thisRule) {
			var reg = new RegExp(verificationMap[thisName]);
			if (!reg.test(thisValue)) {
				validateStr = thisRule;
			}
		}


		if (thisValue && thisName == 'name') {
			if (thisValue.length > 20) {
				validateStr = thisRule;
			}
		}
		if (thisValue && thisName == 'email') {
			if (thisValue.length > 30) {
				validateStr = thisRule;
			}
		}
		var nextTarget = thisTarget.nextElementSibling;
		if (validateStr) {
			nextTarget.innerHTML = validateStr;
			utils.show(nextTarget);
			return false;
		} else {
			nextTarget.innerHTML = '';
			utils.hide(nextTarget);
			return true;
		}
	}
	//收集用户信息
	var collectUserInfo = function(message){
		utils.removeNode('.userInfoModel');
		var userInfo = {};
		userInfo.list = message.content.content.fields;
		userInfoValue.formid = message.content.content.formid;
		userInfoValue.submiturl = message.content.content.submiturl;
		userInfoValue.data = [];
		userInfoValue.wid = 1;
		for (var i = 0; i < userInfo.list.length; i++) {
			var infoObj = {};
			infoObj.name = userInfo.list[i].name;
			userInfoValue.data.push(infoObj);
		}
		$('.rcs-chat-wrapper')[0].innerHTML += render(templates.userInfo,userInfo);
	}
	//用户信息关闭
	var userInfoClose = function(){
		utils.removeNode('.userInfoModel');
		userInfoValue = {};
	}
	//用户信息提交
	var userInfoConfirm = function(event){
		event.preventDefault();
		var formItemList = [];
		for (var i = 0; i < userInfoValue.data.length; i++) {
			formItemList.push(userInfoValue.data[i].name);
		}
		var isValidate = true;
		for (var i = 0; i < formItemList.length; i++) {
			var thisTarget = document.getElementsByName(formItemList[i])[0];
			if (!validateUserInfo(thisTarget)) {
				isValidate = false;
			}
		}
		if (!isValidate) {
			return;
		}
		var data = utils.getFormValue(formItemList);
		for (var i = 0; i < userInfoValue.data.length; i++) {
			userInfoValue.data[i].value = data[userInfoValue.data[i].name];
		}
		var sendUserInfoMsg = {};
		sendUserInfoMsg.content = userInfoValue;
		var msg = new RongIMClient.RegisterMessage.UserInfo(sendUserInfoMsg);//发送用户信息提交消息
		userInfoValue = {};
		var callback = function(){
			utils.removeNode('.userInfoModel');
		};
		sendMessage(msg,callback);
	}

	//下载历史消息
	var getHistoryMsgFile = function(){
		var msg = new RongIMClient.RegisterMessage.DownloadHistoryMessage({
			begin: 0
		});
		var callback = function(){};
		sendMessage(msg,callback);
	}

	//自定义消息注册
	var registerMessage = function() {
        var messageName = "ProductMessage"; // 消息名称。
        var objectName = "cs:product"; // 消息内置名称，请按照此格式命名。
        var mesasgeTag = new RongIMLib.MessageTag(true, true);// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
        var propertys = ["title", "url", "content", "imageUrl", "extra"]; // 消息类中的属性名。
        // RongIMLib.RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, propertys);
        //评价下行消息
        RongIMLib.RongIMClient.registerMessageType("PullEvaMessage", "RC:CsPullEva", mesasgeTag, ['content']);
        //评价上行消息
        RongIMLib.RongIMClient.registerMessageType("EvaluateMessage", "RC:CsEva", mesasgeTag, ['sid','pid','uid','source','isresolve','tag','suggest','type']);
        //留言下行消息
        RongIMLib.RongIMClient.registerMessageType("PullLeaveMessage", "RC:CsPLM", mesasgeTag, ['content']);
        //留言上行消息
        RongIMLib.RongIMClient.registerMessageType("LeaveMessage", "RC:CsLm", mesasgeTag, ['msg_content','msg_email','msg_name','msg_tel']);
        // 收集信息下行消息
        RongIMLib.RongIMClient.registerMessageType("CollectUserInfo", "RC:CsCEI", mesasgeTag, ['content','user']);
        RongIMLib.RongIMClient.registerMessageType("UserInfo", "RC:CsEI", mesasgeTag, ['content']);
        // RC:CsDHM //下载历史消息  先发送这个类型的消息 上行消息
        RongIMLib.RongIMClient.registerMessageType("DownloadHistoryMessage", "RC:CsDHM", mesasgeTag, ['begin']);
        // RC:CsHM 接受这个类型的消息 下行消息
        RongIMLib.RongIMClient.registerMessageType("HistoryMessage", "RC:CsHM", mesasgeTag, ['fileUrl','name','size','type']);
    }

	//sdk初始化
	var sdkInit = function(params, callbacks){	
		if(window.navigator.onLine==false) {　
			params.disconnectedCallback && params.disconnectedCallback();
			return;
	　　}//如果第一次没有连接网络，直接回调
		if (sdkConnect == 2) {
			if (!conversation.connect) {
				params.connectingCallback && params.connectingCallback();
				callbacks.getInstance && callbacks.getInstance(RongIMClient.getInstance());
				conversation.id = params.customerServiceId;
			}
			createButton(params);
			return;
		} else if (sdkConnect == 1){
			return;
		}

		var initTimes = 0;
		sdkConnect = 1;//1为连接中
		params.connectingCallback && params.connectingCallback();//连接中回调

		var appKey = params.appKey;
		var token = params.token;
		var navi = params.navi || "";


		if(navi !== ""){
			//私有云
			var config = {
				navi : navi
			};
			console.log("私有云");
			console.log(params);
			RongIMLib.RongIMClient.init(appKey,null,config);
		}else{
			//公有云
			console.log("公有云");
			console.log(params);
			RongIMLib.RongIMClient.init(appKey);
		}
		if (RCS.config.upload && RCS.config.upload.fileServer) {
			RCS.fileConfig.domain = RCS.config.upload.fileServer;
		}

		var instance = RongIMClient.getInstance();

		// 连接状态监听器
		RongIMClient.setConnectionStatusListener({
			onChanged: function (status) {
				console.log(status);
				var connectDom = $('.rcs-connect-status')[0];
				if (connectDom) {
					connectDom.style.display = 'block';
				}
			    switch (status) {
			        case RongIMLib.ConnectionStatus.CONNECTED:
			        	if (connectDom) {
							connectDom.style.display = 'none';
						}
						sdkConnect = 2;
						initTimes++;
			            callbacks.getInstance && callbacks.getInstance(instance);
			            break;
			        case RongIMLib.ConnectionStatus.CONNECTING:
		                console.log('正在链接');
		                break;
		            case RongIMLib.ConnectionStatus.DISCONNECTED:
		                console.log('断开连接');
		                sdkConnect = 0;
		                params.disconnectedCallback && params.disconnectedCallback();
		                break;
		            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
		                console.log('其他设备登录');
		                sdkConnect = 0;
		                params.disconnectedCallback && params.disconnectedCallback();
		                break;
	              	case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
		                console.log('域名不正确');
		                sdkConnect = 0;
		                params.disconnectedCallback && params.disconnectedCallback();
		                break;
		            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
		              	console.log('网络不可用');
		              	// sdkConnect = 0;
		              	// params.disconnectedCallback && params.disconnectedCallback();
		                break;
			        case RongIMLib.ConnectionStatus.DISCONNECTED:
	                	console.log('断开连接');
	                	sdkConnect = 0;
	                	params.disconnectedCallback && params.disconnectedCallback();
		                break;
	                case 4:
	                	console.log('token无效');
	                	sdkConnect = 0;
	                	params.disconnectedCallback && params.disconnectedCallback();
		                break;
	                default:
	                	console.log('未知错误');
	                	sdkConnect = 0;
	                	params.disconnectedCallback && params.disconnectedCallback();
		                break;
			        }
			}
		});

		RongIMClient.setOnReceiveMessageListener({
			// 接收到的消息
			onReceived: function (message) {
			    // 判断消息类型
			    console.log("新消息: " + message.targetId);
			    if (message.offLineMessage) {
			    	return;
			    }
	            console.log(message);
	            var systemMsg = null;
	            switch(message.messageType){
	            	case 'HandShakeResponseMessage'://客服握手响应
	            		params.connectedCallback && params.connectedCallback();
	            		setConversition(message);
	            		openConversation(conversation.id);
	            		if (message.content.data.serviceType == 1 || message.content.data.serviceType == 3) {//仅机器人、机器人优先
	            			if (message.content.data.robotWelcome) {addCustomServiceInfo(message.content.data);}
	            			changeServiceState('robot');
	            		} else {
	            			changeServiceState('people');
	            		}
	            		if (message.content.data.isblack == 1) {
                            //拉进了黑名单，留言页面
                            console.log(message.content.data.isblack);
                            leavemessage(true);
                        }
	            		break;
	            	case 'ChangeModeResponseMessage'://转人工
	            		systemMsg = changeModeResponse(message);
	            		break;
	            	case 'TerminateMessage'://客服主动结束会话
	            		if ($('.imageViewBox')[0]) {
	            			utils.fadeout($('.imageViewBox')[0]);
	            		}
	            		if ($('.rongcloud-layermbox')[0]) {
	            			return;
	            		}
	            		if (!conversation.connect) {
	            			return;
	            		}
	            		if (message.content.code == 0 || conversation.evaEntryPoint == 3) {
	            			//评价
                            endConversation(true);//关闭，评价
                        } else {
                            changeServiceState('robot');
                        }
	            		break;
	            	case 'CustomerStatusUpdateMessage'://状态改变
	            		changeServiceState('people');
	            		break;
	            	case 'InformationNotificationMessage'://提示语
	            		updateMessage(message);
	            		break;
	            	case 'InfoNtf'://提示语灰条消息
	            		updateMessage(message);
	            		break;
	            	case 'SuspendMessage'://用户主动关闭
	            		stopCustomerServer();
    					endComplete();
	            		break;
	            	case 'PullEvaMessage':
                        //客服主动下发评价,只评价不做任何操作
                        pullEva();
                        break;
                    case 'CollectUserInfo':
                        //客服发起收取用户信息消息
                        collectUserInfo(message);
                        break;
                    case "HistoryMessage"://下载历史消息
                        var url = message.content.fileUrl;
                        var name = message.content.name;
                        utils.downloadHistoryMsgFile(url, name);
                        //下载文件
                        break;
                    case "TextMessage"://文本消息
						updateMessage(message);
                        break;
                    case "ImageMessage"://图片消息
                        updateMessage(message);
                        break;
                    case "FileMessage"://文件消息
                        updateMessage(message);
                        break;
                    case "VoiceMessage"://声音消息
                        updateMessage(message);
                        break;
                    case "PullLeaveMessage"://留言消息
                        updateMessage(message);
                        break;
		            default:
		                callbacks.receiveNewMessage && callbacks.receiveNewMessage(message);
		                break;
		        }
	            if (systemMsg) {
	            	console.log(systemMsg);
	            	addServiceTip(systemMsg);
	            }
			}
		});

		//开始链接
		RongIMClient.connect(token, {
			onSuccess: function(userId) {
				callbacks.getCurrentUser && callbacks.getCurrentUser({userId:userId});
				console.log("链接成功，用户id：" + userId);
				if (initTimes == 1) {
					callbacks.enterConversation && callbacks.enterConversation();
				}
				initTimes++;
			},
			onTokenIncorrect: function() {
				console.log('token无效');
				params.disconnectedCallback && params.disconnectedCallback();
			},
			onError:function(errorCode){
				console.log("=============================================");
				console.log(errorCode);
				params.disconnectedCallback && params.disconnectedCallback();
			}
		});
	}
	//客服会话初始化一些数据
	var setConversition = function(msg){
		if (msg.content.data.leaveMsgConf && msg.content.data.leaveMsgConf.defaultConf) {
			conversation.formList = msg.content.data.leaveMsgConf.defaultConf;
		}
		conversation.announce = {
			"announceMsgFlag": msg.content.data.announceMsgFlag,
			"announceMsg": msg.content.data.announceMsg,
			"announceClickFlag": msg.content.data.announceClickFlag,
			"announceClickUrl": msg.content.data.announceClickUrl
		};
		conversation.evaluateFormValue.uid = msg.content.data.uid;
		conversation.evaluateFormValue.pid = msg.content.data.pid;
		conversation.evaluateFormValue.sid = msg.content.data.sid;
		if (msg.content.data.needTypSts == 1) {
			conversation.needTypSts = 1;
		}
		// if (msg.content.data.leaveMsgConf) {
		// 	conversation.leaveMsgUrl = msg.content.data.leaveMsgConf.customConf.url;
		// }
		if (msg.content.data.evaConf) {
			switch(msg.content.data.evaConf.evaEntryPoint){
				case 1:
					//啥都不用干
					conversation.evaEntryPoint = 1;
					break;
				case 2:
					//用户不能主动评价
					conversation.evaEntryPoint = 2;
					break;
				case 3:
					//结束会话弹出评价
					conversation.evaEntryPoint = 3;
					break;
			}
		}
	}

	//创建button
	var createButton = function(config){
		var obj = {
			"showButton": config.showButton
		}
		if (!$('.customer-service')[0]) {
			config.target.innerHTML = render(templates.button, obj);
		}
		if (conversation.connect) {
			showCommon();
			return;
		}
		createConversation(config);
		addListener();
		if (!config.showButton) {
			showCommon();
		}
	}


	//监听留言提交,页面关闭
	var addListener = function(){
		var callback = function(phoneOrPc){
			terminal = phoneOrPc;
		}
		utils.browserRedirect(callback);
		
		if (terminal == 'pc') {
			document.body.onclick = function(){
				var inputMsg = $(".rongcloud-text")[0];
				hideEmoji();
			}
			if (Notification.permission === "granted") {
			    supportNot = true;
			}
			// Otherwise, we need to ask the user for permission
			else if (Notification.permission !== "denied") {
			    Notification.requestPermission(function (permission) {
			        // If the user accepts, let's create a notification
			        if (permission === "granted") {
			            supportNot = true;
			        }
			    });
			}
		} else {
			document.body.ontouchstart = function(event){
				if (event.target.className.indexOf('emojiItem') < 0 && event.target.className.indexOf('rong-emoji-content') < 0 && event.target.className.indexOf('rongcloud-expressionContent') < 0 ) {
					hideEmoji();
				}
				if (event.target.className.indexOf('rongcloud-rong-btn') < 0 && event.target.className.indexOf('rongcloud-text') < 0) {
					var inputMsg = $(".rongcloud-text")[0];
					if (inputMsg) {
						inputMsg.blur();
					}
				}
			}
		}
		window.addEventListener('message',function(e){
			if (e.origin == 'https://web.jiaxincloud.com') {
				if (e.data == 'success') {
					utils.removeNode('.rongcloud-leavemessage');
				}
			}
        },false);
        window.onbeforeunload = function(event) {
		    stopCustomerServer();
		};
	}

	var hideEmoji = function(){
		var emojiContent = $('.rongcloud-expressionWrap')[0];
		if (emojiContent) {
			utils.hide(emojiContent);
		}
	}

	//button点击事件
	var showCommon = function(){
		if (conversation.connect) {
			if ($('.customer-service')[0].style.display != 'none') {
				utils.hide($('.customer-service')[0]);
			} else {
				utils.show($('.customer-service')[0]);
				if (!$('.rcs-chat-wrapper')[0]) {
					createConversation(conversation.id);
					openConversation(conversation.id);
				}
			}
		} else {
			console.log(conversation.id);
			startCustomerServer(conversation.id);
			utils.show($('.customer-service')[0]);
		}
	}


	//cs组件初始化
	var init = function(config){
		RCS.config = config;
		var callbacks = {
			getInstance : function(instance){
				var callback = function(){
					if (RCS.config.templates) {
						for (var index in RCS.config.templates) {
							if (!RCS.config.showButton && index == 'button') {
								break;
							}
							templates[index] = RCS.config.templates[index];
						}
					}
				}
				getTemplates(callback);
				emoji.init();
				RongIMLib.RongIMVoice.init();
				registerMessage();
			},
			getCurrentUser : function(userInfo){
				console.log(userInfo.userId);
			},
			enterConversation : function(){
				conversation.id = config.customerServiceId;
				createButton(config);
			}
		};
		sdkInit(config,callbacks);
	};

	var openNotice = function(url){
		window.open(url);
	}

	//H5唤醒键盘的时候输入框显示在视野内
	var keyboard = function(event){
		var thisTarget = event.target || event.srcElement;
		setTimeout(function(){
			thisTarget.scrollIntoView(true);
		},500)
	}

	//对外暴露
	RCS.init = init;
	RCS.send = send;
	RCS.keySend = keySend;
	RCS.showemoji = showemoji;
	RCS.chooseEmoji = chooseEmoji;
	RCS.loadHisMessages = loadHisMessages;
	RCS.scrollBottom = scrollBottom;
	RCS.imgUpload = imgUpload;
	RCS.fileUpload = fileUpload;
	RCS.switchPerson = switchPerson;
	RCS.endConversation = endConversation;
	RCS.play = play;
	RCS.playVideo = playVideo;
	RCS.minimize = minimize;
	RCS.showCommon = showCommon;
	RCS.confirm = confirm;
	RCS.close = close;
	RCS.evaluate = evaluate;
	RCS.star = star;
	RCS.startEvaluate = startEvaluate;
	RCS.leavemessage = leavemessage;
	RCS.leaveMessageComfirm = leaveMessageComfirm;
	RCS.validateUserInfo = validateUserInfo;
	RCS.validateLeaveMessage = validateLeaveMessage;
	RCS.viewImage = viewImage;
	RCS.escImageView = escImageView;
	RCS.userInfoClose = userInfoClose;
	RCS.userInfoConfirm = userInfoConfirm;
	RCS.getHistoryMsgFile = getHistoryMsgFile;
	RCS.keyboard = keyboard;
	RCS.chatEnd = chatEnd;
	RCS.openNotice = openNotice;
	RCS.isresolve = isresolve;
	RCS.tagClick = tagClick;
})(RCS);