enyo.kind({
    name: 'Connection',
    kind: null,

    socket: 'undefined',
    whiteboard: 'undefined',
    singlePath: [],
    currentPathLength: 0,
    uid: 'uid',
    room: 'undefined',
    page: 1,
    preloadFlag: 0,
    constructor: function(address, whiteboard, room, uid) {
        this.whiteboard = whiteboard;
        //console.log("Connecting to address " + address);
        //this.socket = new WebSocket(address);
//        this.socket = this.createSocket(address);
		this.blinkEwb = new BlinkEwb(this);
        this.room = room;
        this.uid = uid;
        this.page = 1;
        this.touchMove = undefined;
        this.attempts = 1;

        this.messageQueue = new Queue();
        this.setupNotificationStyle();
        _this = this;
    },
    preload: function(list) {
        if (list < 2) {
            return;
        }
        for (var i = 0, len = list.length; i < len; i++) {
            if (!list[i]) {
                continue;
            }
            var img = document.createElement('img');
            // img.src = list[i].replace('http', 'https');
            img.src = list[i];
        }
    },
    setupNotificationStyle: function() {
        $.noty.defaults = {
            layout: 'top',
            theme: 'relax',
            type: 'warning',
            text: '', // can be html or string
            dismissQueue: true, // If you want to use queue feature set this true
            template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
            animation: {
                open: { height: 'toggle' }, // or Animate.css class names like: 'animated bounceInLeft'
                close: { height: 'toggle' }, // or Animate.css class names like: 'animated bounceOutLeft'
                easing: 'swing',
                speed: 500 // opening & closing animation speed
            },
            timeout: false, // delay for closing event. Set false for sticky notifications
            force: false, // adds notification to the beginning of queue when set to true
            modal: false,
            maxVisible: 5, // you can set max visible notification for dismissQueue true option,
            killer: false, // for close all notifications before show
            closeWith: ['click'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
            callback: {
                onShow: function() {},
                afterShow: function() {},
                onClose: function() {},
                afterClose: function() {},
                onCloseClick: function() {},
            },
            buttons: false // an array of buttons
        };
    },

    showWarningMessage: function(params) {
        if (this.warningMessage && !this.warningMessage.closed) {
            this.warningMessage.setText(params.text);
        } else {
            this.warningMessage = noty(params);
        }
    },

    clearWarningMessage: function() {
        if (this.warningMessage) {
            this.warningMessage.close();
        }
    },

    createSocket: function(address) {
        var generateInterval = function(k) {
            var maxInterval = (Math.pow(2, k)) * 1000;

            if (maxInterval > 30 * 1000) {
                maxInterval = 30 * 1000; // If the generated interval is more than 30 seconds, truncate it down to 30 seconds.
            }

            // generate the interval to a random number between 0 and the maxInterval determined from above
            return Math.random() * maxInterval;
        };

        var connection = new WebSocket(address);

        connection.onopen = function() {
            // reset attempts of retry
            this.attempts = 1;
            console.log("WebSocket connection established @" + Date.now());
            _this.clearWarningMessage();

            console.log("Send rest messages in queue...");
            _this.sendMessageInQueue();
        };

        connection.onmessage = function(evt) {
            var message = JSON.parse(JXG.decompress(evt.data)),
                fromUid = message['fromUid'],
                evnt = message['event'],
                data = message['data'];
            ts = message['ts'];

            if (evnt != 'ack') {
                console.info(evnt + ' : ' + 'receive msg from server. uid:' + fromUid + ' event:' + evnt + ' elapse:' + (Date.now() - ts) + 'ms data:' + JSON.stringify(data));
            }

            switch (evnt) {
                case 'ready':
                    //_this.init(_this.uid, _this.room, _this.page);
                    _this.join();
                    break;
                case 'join':
                    _this.init(_this.uid, _this.room, _this.page);
                    break;
                case 'draw':
                    if (_this.uid == fromUid) {
                        console.log("ignore message 'draw' from mine. uid " + fromUid);
                        break;
                    }
                    _this.remoteDraw(_this, data);
                    break;
                case 'draw-many':
                    if (_this.uid == fromUid) {
                        console.log("ignore message 'draw-many' from mine. uid " + fromUid);
                        break;
                    }
                    _this.remoteDrawMany(_this, data);
                    break;
                case 'clear':
                    _this.remoteClear(_this, data);
                    break;
                case 'image':
                    _this.remoteImage(_this, data);
                    break;
                case 'delete-page':
                    _this.remoteDelPage(_this, data);
                    break;
                case 'pages':
                    _this.remotePages(_this, data);
                    break;
                case 'laser-move':
                    if (_this.uid === fromUid) {
                        console.log("ignore message 'laser-move' from mine. uid " + fromUid);
                        break;
                    }
                    _this.remoteLaserMove(_this, data);
                    break;
                case 'laser-draw':
                    if (_this.uid === fromUid) {
                        console.log("ignore message 'laser-draw' from mine. uid " + fromUid);
                        break;
                    }
                    _this.remoteLaserDraw(_this, data);
                    break;
                case 'laser-remove':
                    if (_this.uid === fromUid) {
                        console.log("ignore message 'laser-remove' from mine. uid " + fromUid);
                        break;
                    }
                    _this.remoteLaserRemove(_this, data);
                    break;
                case 'change-page':
                    if (_this.uid === fromUid) {
                        console.log("ignore message 'change-page' from mine. uid " + fromUid);
                        break;
                    }

                    if (data['page_id'] === _this.whiteboard.getCurrentPageId()) {
                        break;
                    }

                    _this.whiteboard.setTotalPages(data['page_list']);
                    _this.changePage(data['page_id']);
                    break;
            }
        };

        var reconnectWebSocket = function() {
            var time = 5000;
            console.log("Re-connecting after: " + time + " miliseconds...");
            _this.showWarningMessage({ text: $L("Network connection is lost, reconnect in about") + " " + Math.round(time / 1000) + ' ' + $L("seconds") });

            if (_this.attempts <= 5) {
                setTimeout(function() {
                    // We've tried to reconnect so increment the attempts by 1
                    _this.attempts += 1;
                    // Connection has closed so try to reconnect.
                    _this.socket = _this.createSocket(address);
                }, time);
            } else {
                _this.showWarningMessage({ text: $L("Connection is lost") });
            }
        };

        connection.onerror = function(err) {
            console.error(err);
            console.log("WebSocket connection error @ " + Date.now());

            //reconnectWebSocket();
        };

        connection.onclose = function(event) {
            console.log(event);
            console.log("Connection was closed @ " + Date.now());
            reconnectWebSocket();
        };
        return connection;
    },

    enqueueMessage: function(evt, data) {
        var message;
        data = data || {};
        data["room"] = this.whiteboard.room;
        data["page_id"] = this.whiteboard.getCurrentPageId();
        data["msg_id"] = JXG.Util.genUUID();
        message = JSON.stringify({
            "uid": this.uid,
            "event": evt,
            "data": data
        });

        this.messageQueue.enqueue(message);
    },

    sendMessageInQueue: function() {
        var messageBeenSent,
            message,
            retryCount = 0;

        while (!this.messageQueue.isEmpty()) {
            messageBeenSent = true;
            try {
                message = this.messageQueue.dequeue();
                if (message) {
                    console.log('sending message:', message);
//                    this.socket.send(message);
                    this.blinkEwb.send(message);
                }
            } catch (err) {
                console.error("Error, message not been sent, error message is: ", err);
                messageBeenSent = false;
            }

            if (!messageBeenSent) {
                this.messageQueue.enqueue(message);
                retryCount += 1;
                if (retryCount > 1000) {
                    // break out of loop without retrying anymore, leave message in the queue, and resend it next time.
                    break;
                }
            }
        }
    },

    checkIfOnline: function() {
        return navigator.onLine;
    },

    sendMessage: function(evt, data) {
        var message;
        this.enqueueMessage(evt, data);
        if (this.checkIfOnline()) {
            this.sendMessageInQueue();
        } else {
            message = JSON.stringify({
                "uid": this.uid,
                "event": "ping",
                "data": {}
            });
            this.socket.send(message);
            this.showWarningMessage({ text: $L("Connection is lost") });
        }
    },

    join: function() {
        console.log("Sending join for room ", this.whiteboard);

        this.sendMessage("join", {
            "room": this.whiteboard.room,
            "vid": this.whiteboard.parent_.vid,
            "redis": this.whiteboard.parent_.redis,
            "role": this.whiteboard.userRole,
            "ticket": this.whiteboard.parent_.ticket,
            "width": this.whiteboard.canvasWidth,
            "height": this.whiteboard.canvasHeight,
            "expiredMinutes": this.whiteboard.parent_.expiredMinute,
        });
    },


    init: function(uid, room, currentPage, broadcast) {
        console.log("Sending init for room " + room + " and page " + currentPage);
        this.whiteboard.clear(false, false);
        if (broadcast === undefined) {
            broadcast = true;
        }
        this.sendMessage("init", {
            "room": room,
            "vid": this.whiteboard.parent_.vid,
            "page": currentPage,
            "broadcast": broadcast
        });
    },

    changePage: function(pageId) {
        var page = this.whiteboard.getPageById(pageId);
        this.whiteboard.gotoPage(page, false);
    },

    /**
     * Get data from server to initialize this whiteboard
     * @param {Object} uid
     * @param {Object} room
     * @param {Object} page
     */
    joinRoom: function(room, page) {
        this.room = room;
        this.singlePath = [];
        this.currentPathLength = 0;
        this.whiteboard.clear(false, false);
        console.log("Sending init for room " + room + ' ' + page);
        this.sendMessage("init", {
            "room": this.room,
            "vid": this.whiteboard.parent_.vid,
        });
    },

    /**
     * Send a single path (segment) to the server
     * @param {x, y, type, lineColor, lineWidth} a point on the path
     */
    sendPath: function(data) {
        if (data.type == 'touchend') {
            this.touchMove.path.push([data.x, data.y]);
            this.touchMove.guid = data.guid;
            this.singlePath.push(this.touchMove);
            this.currentPathLength++;
            this.touchMove = undefined;
        } else if (data.type == 'touchstart') {
            this.touchMove = data;
            this.touchMove.type = 'touchmovement';
            this.touchMove.path = [];
            this.touchMove.path.push([data.oldx, data.oldy]);
        } else if (data.type == 'touchmove') {
            this.touchMove.path.push([data.x, data.y]);
        } else {
            this.singlePath.push(data);
            this.currentPathLength++;
        }

        // Send path every two points or when user removes finger
        if (this.currentPathLength > 2 ||
            data.type === "touchend" ||
            data.type === 'undo' ||
            data.type === 'redo' ||
            data.type === 'addtext' ||
            data.type === 'edittext' ||
            data.type === 'rm'
        ) {
			var currentPageFile = this.whiteboard.getCurrentPageFile();
			var thumbnail = "";
			if (currentPageFile.fileUrl == null
					|| currentPageFile.fileUrl == "") { // 无背景图片时生成缩略图
				thumbnail = this.whiteboard.convertSvgContent();
			}
			this.sendMessage("draw-click", {
				"singlePath" : this.singlePath,
				"thumbnail" : thumbnail
			});
            this.singlePath = [];
            this.currentPathLength = 0;
            console.log("undoStack:", this.whiteboard.undoStack);
            console.log("redoStack:", this.whiteboard.redoStack);
        }
    },

    /**
     * Clear all other canvases (in the same room on the same page)
     */
    sendClear: function() {
        this.singlePath = [];
        this.currentPathLength = 0;
        this.sendMessage("clear", {});
    },

    sendLaserEvent: function(eventName, data) {
        //data = data || {};
        //data["room"] =  this.whiteboard.room;
        //data["page_id"] =  this.whiteboard.getCurrentPageId();
        //message = JSON.stringify({
        //"uid": this.uid,
        //"event": eventName,
        //"data": data
        //});
        //this.socket.send(message);
        this.sendMessage(eventName, data);
    },

    deletePage: function() {
        this.sendMessage("delete-page", {});
    },

    getImage: function() {
        //console.log("Getting image for page " + this.page);
        this.sendMessage("get-image", {
            "room": this.room,
            "page": this.page
        });
    },

    /**
     * Make video remotely
     */
    makeVideo: function() {
        this.sendMessage("video", {});
    },

    /*
     * Create a new page
     */
    newPage: function() {
        this.whiteboard.clear(false, false);
        this.sendMessage("new-page", {});
    },

    /***
     * All remote functions below
     */

    drawEx: function(self, data) {
        var i;
        if (data == null) return;
        if (data.drawingItem) {
            self.whiteboard.drawingRemoteItem = data.drawingItem;
        }
        if (data.type == 'touchstart') self.whiteboard.startPath(data.oldx, data.oldy, data.lineColor, data.lineWidth, false);
        // else if (data.type == 'touchmove') self.whiteboard.continuePath(data.oldx, data.oldy, data.x, data.y, data.lineColor, data.lineWidth, false);
        else if (data.type == 'touchmove') {
            if (data.path) {
                for (i in data.path) {
                    if (data.path.hasOwnProperty(i)) {
                        self.whiteboard.continuePath(data.oldx, data.oldy, data.path[i][0], data.path[i][1], data.lineColor, data.lineWidth, data.guid, false);
                    }
                }
            } else {
                self.whiteboard.continuePath(data.oldx, data.oldy, data.x, data.y, data.lineColor, data.lineWidth, data.guid, false);
            }
        } else if (data.type == 'touchmovement') {
            if (data.path) {
                for (i in data.path) {
                    if (data.path.hasOwnProperty(i)) {
                        if (i == 0) {
                            self.whiteboard.startPath(data.path[i][0], data.path[i][1], data.lineColor, data.lineWidth, false);
                        } else if (i == data.path.length - 1) {
                            self.whiteboard.endPath(data.oldx, data.oldy, data.path[i][0], data.path[i][1], data.lineColor, data.lineWidth, data.guid, false);
                        } else {
                            self.whiteboard.continuePath(data.oldx, data.oldy, data.path[i][0], data.path[i][1], data.lineColor, data.lineWidth, data.guid, false);
                        }
                    }
                }
            } else {
                self.whiteboard.continuePath(data.oldx, data.oldy, data.x, data.y, data.lineColor, data.lineWidth, data.guid, false);
            }
        } else if (data.type == 'touchend') {
            self.whiteboard.endPath(data.oldx, data.oldy, data.x, data.y, data.lineColor, data.lineWidth, data.guid, false);
        } else if (data.type == 'undo') {
            self.whiteboard.executeUndo2(false, data.guid);
        } else if (data.type == 'redo') {
            self.whiteboard.executeRedo2(false, data.guid);
        } else if (data.type == 'addtext') {
            self.whiteboard.drawText(data);
        } else if (data.type == 'edittext') {
            self.whiteboard.drawText(data);
            //self.whiteboard.executeEditText(data.oldx, data.oldy, data.value);
        } else if (data.type == 'rm') {
            //self.whiteboard.executeRemove(data.oldx, data.oldy);
            self.whiteboard.removeSelected(false, data.guid, data.op_guid);
        } else { console.log("not supported operation: " + data.type); }
    },
    /**
     * Draw from realtime data incoming from server
     * Called when server sends @event 'draw'
     * @param {Object} self
     * @param {singlePath: [points...]} input
     */
    remoteDraw: function(self, input) {
        var sPath = input.singlePath;
        var data = {};
        // point on path
        for (var i = 0; i < sPath.length; i++) {
            data = sPath[i];
            data.remote = true;
            self.drawEx(self, data)
        }
    },

    /**
     * Draw from stored data incoming from server
     * Called when server sends @event 'draw-many'
     * @param {Object} self
     * @param {datas:[points...]} data
     */
    remoteDrawMany: function(self, data) {
        console.log(data);
        self.whiteboard.setTotalPages(data.pages);

        var pageId = self.whiteboard.getPageById(data["page_id"]);
        self.whiteboard.setCurrentPage(pageId);
        ds = data.datas;
        for (d in ds) {
            console.log(d, ds[d]['guid'], ds[d]);
            console.log("undoStack before:", this.whiteboard.undoStack.length, this.whiteboard.undoStack);
            console.log("redoStack before:", this.whiteboard.redoStack.length, this.whiteboard.redoStack);
            self.drawEx(self, ds[d]);
            console.log("undoStack after:", this.whiteboard.undoStack.length, this.whiteboard.undoStack);
            console.log("redoStack after:", this.whiteboard.redoStack.length, this.whiteboard.redoStack);
        }
    },

    /**
     * Clear from server
     * Called when server sends @event 'clear'
     * @param {Object} self
     * @param {Object} data
     */
    remoteClear: function(self, reloadImage) {
        self.whiteboard.clear(false, reloadImage);
    },
    remoteImage: function(self, data) {
        this.preload(data.urls);
        if (data.url != "") {
            var img = document.createElement('img');
//            data.url = data.url && data.url.replace('http', 'https');
            img.src = data.url;
            console.log("Image url is " + data.url);
            self.whiteboard.loadImage(data.url, data.width, data.height);
        }
    },
    remoteDelPage: function(self, data) {
        console.log("receive cmd 'del-page' from server. data " + data);
        var page_id = data['page_id'];
        var cur_id = self.whiteboard.getCurrentPageId();
        var cur_page = self.whiteboard.getCurrentPage();
        var npages = data['pages'];
        // TODO update total pages in UI
        self.whiteboard.setTotalPages(npages);
        if (page_id == cur_id) {
            if (cur_page >= self.whiteboard.getNumPages()) {
                self.whiteboard.prevPage()
            } else {
                self.whiteboard.gotoPage(cur_page);
            }
        } else {
            self.whiteboard.gotoPage(self.whiteboard.getPageById(cur_id));
        }
    },

    remotePages: function(self, data) {
        console.log("receive cmd 'pages' from server. data " + data);
        this.preload(data.urls);
        var npages = data['pages'];
        // TODO update total pages in UI
        self.whiteboard.setTotalPages(npages);
    },

    remoteLaserMove: function(self, data) {
        self.whiteboard.removeLaser();
        self.whiteboard.drawLaser(data.x, data.y, true)
    },

    remoteLaserDraw: function(self, data) {
        self.whiteboard.drawLaser(data.x, data.y, true)
    },

    remoteLaserRemove: function(self, data) {
        self.whiteboard.removeLaser(false);
    }

});