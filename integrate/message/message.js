function renderHistoryMessages(list, hasMsg, instance) {
    return new Vue({
        el: '#messagePage',
        data: {
            stat: {
                currentView: 'message',
                currentUserInfo: {
                    "id": "user1",
                    "nickname": "产品",
                    "region": "86",
                    "phone": "13269772701",
                    "portraitUri": "http://img.duoziwang.com/2016/12/08/18594927932.jpg"
                },
                targetUserInfo: {
                    "id": "user2",
                    "nickname": "开发",
                    "region": "86",
                    "phone": "13269772702",
                    "portraitUri": "http://www.tshseo.com/uploads/allimg/141012/21130U347-12.jpg"
                },
                messageList: list,
                sendMsgVal: ''
            }
        },
        components: {
            message: {
                props: ['stat'],
                template: '#message',
                methods: {
                    sendMsg: function () {
                        var text = this.stat.sendMsgVal;
                        if (!text) {
                            return false;
                        }
                        var msg = new RongIMLib.TextMessage({content: text, extra: "附加信息"});
                        var conversationType = RongIMLib.ConversationType.PRIVATE; // 私聊
                        var targetId = "user2"; // 目标 Id
                        var that = this;
                        instance.sendMessage(conversationType, targetId, msg, {
                                // 发送消息成功
                                onSuccess: function (message) {
                                    that.stat.sendMsgVal = '';
                                    that.stat.messageList.push(message);
                                    that.$nextTick(that.scrollEnd);
                                }
                            }
                        );
                    },
                    scrollEnd: function () {
                        //添加完消息 跳转到最后一条
                        var list = document.querySelectorAll('.message-item');
                        if (list.length > 1) {
                            var last = list[list.length - 1];
                            last.scrollIntoView();
                        }
                    },
                    sendImg:function (msg) {

                        var that=this;

                        var conversationtype = RongIMLib.ConversationType.PRIVATE; // 私聊,其他会话选择相应的消息类型即可。
                        var targetId = this.stat.targetUserInfo.id; // 目标 Id
                        RongIMClient.getInstance().sendMessage(conversationtype, targetId, msg, {
                                onSuccess: function (message) {
                                    console.log("Send " + message.messageType + " successfully");
                                    console.log(message);
                                    that.stat.messageList.push(message);
                                    that.$nextTick(that.scrollEnd);
                                }
                            }
                        );
                    },
                    sendPersonal:function () {
                        var text = this.stat.sendMsgVal || 'personalMsg';
                        var msg = new RongIMClient.RegisterMessage.PersonMessage({content:text,type:"personal"});
                        var conversationType = RongIMLib.ConversationType.PRIVATE; // 私聊
                        var targetId = "user2"; // 目标 Id
                        var that = this;
                        instance.sendMessage(conversationType, targetId, msg, {
                                // 发送消息成功
                                onSuccess: function (message) {
                                    that.stat.sendMsgVal = '';
                                    that.stat.messageList.push(message);
                                    that.$nextTick(that.scrollEnd);
                                }
                            }
                        );
                    }
                },
                mounted: function () {
                    this.scrollEnd();
                    var that=this;
                    watchUpload(instance,that);
                }
            }
        }
    });
}


function watchUpload(im,that){

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
    var createMessage = function(file){

        var msg = messageItem[file.fileType](file);

        console.log("创建文件消息: ", msg);

        that.sendImg(msg);

    };

    var urlItem = {
        file: function(data){
            var fileType = RongIMLib.FileType.FILE;
            im.getFileUrl(fileType, data.filename, data.name, {
                onSuccess: function(result){
                    console.log("获取文件 URL：", result);
                    data.downloadUrl = result.downloadUrl;
                    createMessage(data);
                },
                onError: function(error){
                    console.log('getFileToken error:' + error);
                }
            });
        },
        image: function(data){
            var fileType = RongIMLib.FileType.IMAGE;
            im.getFileUrl(fileType, data.filename, null, {
                onSuccess: function(result){
                    console.log("获取文件 URL：", result);
                    data.downloadUrl = result.downloadUrl;
                    createMessage(data);
                },
                onError: function(error){
                    console.log('getFileToken error:' + error);
                }
            });
        }
    };
    var getFileUrl = function(data){
        urlItem[data.fileType](data);
    };

    var getFileType = function(filename){
        // 默认支持两种图片格式，可自行扩展
        var imageType = {
            'jpg': 1,
            'png': 2
        };
        var index = filename.lastIndexOf('.') + 1,
            type = filename.substring(index);
        return type.toLocaleLowerCase() in imageType ? 'image': 'file';
    };

    var callback = {
        onError	: function (errorCode) {
            console.log(errorCode);
        },
        onProgress : function (loaded, total) {
            var percent = Math.floor(loaded/total*100);
            console.log(percent);
        },
        onCompleted : function (data) {
            console.log("文件上传完成：", data);

            data.fileType = getFileType(data.name);
            getFileUrl(data);
        }
    };

    // 上传文件
    var img = document.getElementById("upload-img");
    var file = document.getElementById("upload-file");

    var config = {
        domain: 'http://upload.qiniu.com',
        fileType: RongIMLib.FileType.IMAGE,
        getToken: function(callback){
            /****************************
             * 使用融云文件存储注意事项：
             * 1、有效期为 1 个月。
             * 2、文件不可迁移。
             ****************************
             */
            im.getFileToken(this.fileType, {
                onSuccess: function(data){
                    callback(data.token);
                },
                onError: function(error){
                    console.log('getFileToken error:' + error);
                }
            });
        }
    };

    var initType = {
        file: function(_file){
            config.fileType = RongIMLib.FileType.FILE;
            UploadClient.initFile(config, function(uploadFile){
                uploadFile.upload(_file, callback);
            });
        },
        image: function(_file){
            UploadClient.initImage(config, function(uploadFile){
                uploadFile.upload(_file, callback);
            });
        }
    };

    img.onchange = file.onchange = function(){
        var _file = this.files[0];
        initType[getFileType(_file.name)](_file);
    };
}


function registerMessage(opt) {
    var defaultOpt = {
        messageName: "PersonMessage",// 消息名称。
        objectName: "s:person",// 消息内置名称，请按照此格式命名。
        messageTag: [true, true],// 消息是否保存是否计数，true true 保存且计数，false false 不保存不计数。
        propertys: ["content", "type"]// 消息类中的属性名。
    };
    opt = $.extend(defaultOpt, opt || {});
    var messageName = opt.messageName;
    var objectName = opt.objectName;
    var messageTag = new RongIMLib.MessageTag(opt.messageTag[0],opt.messageTag[1]);
    var propertys = opt.propertys;
    RongIMClient.registerMessageType(messageName, objectName, messageTag, propertys);
}
