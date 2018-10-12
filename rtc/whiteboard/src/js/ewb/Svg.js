/**
 * This contains all the local functions to interact with the whiteboard. It also contains
 * interfaces to the Connection class.
 */

enyo.kind({
    name: 'WhiteboardSvg',
    kind: null,

    cvs: 'undefined',
    currentPage: 1,
    totalPages: -1,
    uid: "",
    room: "",
    //redis:"",
    //ticket:"",
    connection: 'undefined',
    callback: 'undefined',

    getNumPages: function() {
        return this.totalPages;
    },

    getCurrentPage: function() {
        return this.currentPage;
    },

    setCurrentPage: function(pageId) {
        this.currentPage = pageId;
        // update page info
        this.callback(this.totalPages, this.currentPage);
    },

    getPageById: function(pageid) {
        var index, length;
        for (index = 0, length = this.page_list.length; index < length; index += 1) {
            if (this.page_list[index] === pageid) {
                return index + 1;
            }
        }
        // default return page no. 1.
        return 1;
    },
    getCurrentPageId: function() {
        return this.page_list[this.currentPage - 1];
    },
    getPageIdByPage: function(page) {
        return this.page_list[page - 1];
    },
    setPageFiles: function(pageFiles) {
    	this.page_file_list = pageFiles;
    },
    getPageFileByPage: function(page) {
        return this.page_file_list[page - 1];
    },
    getCurrentPageFile: function() {
        return this.page_file_list[this.currentPage - 1];
    },

    /**
     * @class WhiteboardSvg
     * @param parent: Class canvasContainer
     * @param callback: called once the page is rendered
     */
    constructor: function(name, parent, page, websocketAddress, userRole, callback) {
        this.parent_ = parent;
        this.uid = parent.uid;
        //this.vid             = parent.vid;
        this.room = parent.room;
        this.cvs = new ScaleRaphael(name, parent.canvasWidth, parent.canvasHeight);
        this.d3SVG = d3.select(this.cvs.canvas);
        this.connection = new Connection(websocketAddress, this, this.room, this.uid);
        this.callback = callback;
        this.zoomRatio = 1;
        this.page_list = [];
        this.drawingItem = 'pen';
        this.drawingRemoteItem = '';
        this.element = null;
        this.drawStartX = 0;
        this.drawStartY = 0;
        this.undoStack = [];
        this.redoStack = [];
        this.textEdits = {};
        this.textEditing = false;
        this.penPoints = [];
        this.penCbkCount = 0;
        this.penFunction = d3.svg.line().interpolate('cardinal');
        this.penPathID = 10000;
        this.currentSelected = null;
        this.laserPen = null;
        this.userRole = userRole;
        this.canvasHeight = parent.canvasHeight;
        this.canvasWidth = parent.canvasWidth;
        this.topMargin = 0;
        this.page_file_list = [];
        
        // 设置缩放率
        this.setZoomRatioCustom();
        // 调整面板
        this.zoomReduction();
    },

    /**
     * 获取画板上边距
     * 
     */
    getCanvasMarginTop: function() {
    	var canvasMarginTop = (this.canvasContainerHeight - this.canvasHeight * this.zoomRatio) / 2;
    	return canvasMarginTop < 0 ? 0 : canvasMarginTop;
	},
    
    /**
	 * 设置缩放率
	 * 
	 */
    setZoomRatioCustom: function() {
    	// 设置画板容器宽度
    	this.canvasContainerWidth = $('html,body').width();
    	// 设置画板容器高度
    	this.canvasContainerHeight = $('html,body').height() - ($("#app_bottomToolbar").outerHeight() + 5);
    	
    	var widthRatio = this.canvasContainerWidth / this.canvasWidth;
    	var heightRatio = this.canvasContainerHeight / this.canvasHeight;
    	this.zoomRatioCustom = widthRatio < heightRatio ? widthRatio : heightRatio;
    	this.zoomRatioPre = this.zoomRatio;
    	this.zoomRatio = 1;
    	this.zoomRatio = this.zoomRatio * this.zoomRatioCustom;
    	this.zoomRatioMax = this.zoomRatio * 2;
        this.zoomRatioMin = this.zoomRatio * 1;
        this.zoomRatioChange = 0.5 * this.zoomRatioCustom;
    },

    /**
     * Join specified room
     * @param {Object} room
     */
    joinRoom: function(room) {
        this.room = room;
        this.connection.joinRoom(room);
    },

    /**
     * Getter for cvs
     */
    getCanvas: function() {
        return this.cvs;
    },

    getDrawingItem: function() {
        return this.drawingItem;
    },

    setDrawingItem: function(drawingItem) {
        this.drawingItem = drawingItem;
    },

    // start, move, and up are the drag functions
    //start: function() {
    //// storing original coordinates
    //this.ox = this.attr("x");
    //this.oy = this.attr("y");
    //this.attr({
    //opacity: 1
    //});
    //if (this.attr("y") < 60 && this.attr("x") < 60) this.attr({
    //fill: "#000"
    //});
    //},

    //move: function(dx, dy) {
    //// move will be called with dx and dy
    //if (this.attr("y") > 200 || this.attr("x") > 300) this.attr({
    //x: this.ox + dx,
    //y: this.oy + dy
    //});
    //else {
    //nowX = Math.min(300, this.ox + dx);
    //nowY = Math.min(200, this.oy + dy);
    //nowX = Math.max(0, nowX);
    //nowY = Math.max(0, nowY);
    //this.attr({
    //x: nowX,
    //y: nowY
    //});
    //if (this.attr("fill") != "#000") this.attr({
    //fill: "#000"
    //});
    //}
    //},

    //up: function() {
    //// restoring state
    //this.attr({
    //opacity: .5
    //});
    //if (this.attr("y") < 60 && this.attr("x") < 60) this.attr({
    //fill: "#AEAEAE"
    //});
    //},
    zoomUnConvert: function(x) {
        x = x * this.zoomRatio;
        return x
    },

    zoomConvert: function(x) {
        x = x / this.zoomRatio;
        // x += x*(1-this.zoomRatio)/2;
        // y += y*(1-this.zoomRatio);
        return x
    },
    /**
     * Called when user starts a path
     * @param {Object} x
     * @param {Object} y
     * @param {Object} send
     */
    startPath: function(x, y, lc, lw, send) {
        // calculate x and y after being zoomed.
        // x += x * (1 - this.zoomRatio);
        // y += y * (1 - this.zoomRatio);
        // fix bug draw on jpeg file in Firefox
        console.log("start path", x, y);
        document.ondragstart = function() {
            return false;
        }

        if (send) {
            x = this.zoomConvert(x);
            y = this.zoomConvert(y);
            var drawingItem = this.drawingItem;
        } else {
            var drawingItem = this.drawingRemoteItem;
        }

        this.drawStartX = x;
        this.drawStartY = y;

        switch (drawingItem) {
            case 'pen':
                if (send) {
                    this.penPathID = this.guid();
                }
                this.drawPath2(x, y, lc, lw, 1);
                break;
            case 'highlighter':
                if (send) {
                    this.penPathID = this.guid();
                }
                this.drawPath2(x, y, lc, lw, 0.5);
                break;
            case 'arrow':
            case 'line':
            case 'triangle':
                if (!this.element) {
                    this.element = this.cvs.path("M" + x + " " + y);
                }
                break;
            case 'circle':
                if (!this.element) {
                    this.element = this.cvs.circle(x, y, 0);

                    //this.element.drag(this.move, this.start, this.up);
                    this.element.attr({
                        "stroke": lc,
                        "stroke-width": lw
                    });
                }
                break;
            case 'square':
            case 'rectangle':
                if (!this.element) {
                    this.element = this.cvs.rect(x, y, 0, 0);
                    //this.element.drag(this.move, this.start, this.up);
                    this.element.attr({
                        "stroke": lc,
                        "stroke-width": lw
                    });
                }
                break;
            case 'ellipse':
                if (!this.element) {
                    this.element = this.cvs.ellipse(x, y, 0, 0);
                    //this.element.drag(this.move, this.start, this.up);
                    this.element.attr({
                        "stroke": lc,
                        "stroke-width": lw
                    });
                }
                break;
            default:
                console.log("startPath: unknown item. ignore");
                return;
        }
        if (send) {
            this.connection.sendPath({
                oldx: x,
                oldy: y,
                type: 'touchstart',
                lineColor: lc,
                lineWidth: lw,
                drawingItem: drawingItem
            });
        }
    },

    /**
     * Called when user continues path (without lifting finger)
     */
    continuePath: function(oldx, oldy, x, y, lc, lw, guidRemote, send) {
        // x += x * (1 - this.zoomRatio);
        // y += y * (1 - this.zoomRatio);
        if (send) {
            x = this.zoomConvert(x);
            y = this.zoomConvert(y);
            var drawingItem = this.drawingItem;
        } else {
            var drawingItem = this.drawingRemoteItem;
        }
        console.log("continuePath", x, y);
        var reallyNeedToSend = false;
        switch (drawingItem) {
            case 'pen':
                if (!send) { // it's from server
                    this.drawPath2(x, y, lc, lw, 1, guidRemote);
                    break;
                }
                // it's local drawing
                this.penCbkCount++;
                if (this.penCbkCount % 8 == 0) {
                    this.drawPath2(x, y, lc, lw, 1);
                    reallyNeedToSend = true;
                    break;
                }
                break;

            case "highlighter":
                if (!send) { // it's from server
                    this.drawPath2(x, y, lc, lw, 0.5, guidRemote);
                    break;
                }
                // it's local drawing
                this.penCbkCount++;
                if (this.penCbkCount % 8 == 0) {
                    this.drawPath2(x, y, lc, lw, 0.5);
                    reallyNeedToSend = true;
                    break;
                }
                break;

            case 'arrow':
                if (this.element) {
                    var path = "M" + this.drawStartX + " " + this.drawStartY + "L" + x + " " + y;
                    this.element.attr({
                        "path": path,
                        "stroke": lc,
                        "stroke-width": lw,
                        "arrow-end": "open-medium-medium"
                    });
                }
                break;

            case "line":
                if (this.element) {
                    var path = "M" + this.drawStartX + " " + this.drawStartY + "L" + x + " " + y;
                    this.element.attr({
                        "path": path,
                        "stroke": lc,
                        "stroke-width": lw,
                    });
                }
                break;

            case 'triangle':
                if (this.element) {
                    var otherX = x - this.drawStartX;
                    var path = "M" + this.drawStartX + " " + this.drawStartY + "L" + x + " " + y + "L" + String(this.drawStartX - otherX) + " " + y + "Z";
                    this.element.attr({
                        "path": path,
                        "stroke": lc,
                        "stroke-width": lw,
                    });
                }
                break;
            case 'circle':
                if (this.element) {
                    var width = x - this.drawStartX,
                        height = y - this.drawStartY,
                        radius = Math.max(Math.abs(width), Math.abs(height));

                    this.element.attr({
                        "r": radius
                    });
                }
                break;
            case 'square':
                if (this.element) {
                    var width = x - this.drawStartX,
                        height = y - this.drawStartY,
                        old_x = this.element.attr("x"),
                        old_y = this.element.attr("y");
                    length = Math.max(Math.abs(width), Math.abs(height));

                    this.element.attr({
                        "x": width > 0 ? old_x : x,
                        "y": height > 0 ? old_y : y,
                        "width": length,
                        "height": length
                    });
                }
                break;
            case 'rectangle':
                if (this.element) {
                    var width = x - this.drawStartX,
                        height = y - this.drawStartY,
                        old_x = this.element.attr("x"),
                        old_y = this.element.attr("y");
                    this.element.attr({
                        "x": width > 0 ? old_x : x,
                        "y": height > 0 ? old_y : y,
                        "width": Math.abs(width),
                        "height": Math.abs(height)
                    });
                }
                break;
            case 'ellipse':
                if (this.element) {
                    var width = x - this.drawStartX,
                        height = y - this.drawStartY;
                    old_x = this.element.attr("x"),
                        old_y = this.element.attr("y");

                    this.element.attr({
                        "x": width > 0 ? old_x : x,
                        "y": height > 0 ? old_y : y,
                        "rx": Math.abs(width),
                        "ry": Math.abs(height)
                    });
                }
                break;
            default:
                //console.log("continuePath: unknown item. ignore");
                return;
        }

        if (reallyNeedToSend) {
            this.connection.sendPath({
                x: x,
                y: y,
                type: 'touchmove',
                lineColor: lc,
                lineWidth: lw,
                drawingItem: drawingItem
            });
        }
    },

    /**
     * Called when user lifts finger
     */
    endPath: function(oldx, oldy, x, y, lc, lw, guidRemote, send) {
        var guid,
            pathID = this.currentPathID();
        // x += x * (1 - this.zoomRatio);
        // y += y * (1 - this.zoomRatio);
        console.log("endPath", x, y, oldx, oldy);
        if (send) {
            x = this.zoomConvert(x);
            y = this.zoomConvert(y);
            var drawingItem = this.drawingItem;
        } else {
            var drawingItem = this.drawingRemoteItem;
        }
        console.log("endPath", x, y);
        switch (drawingItem) {
            case 'pen':
                guid = guidRemote || pathID;

                if (send) {
                    this.drawPath2(x, y, lc, lw, 1);
                } else {
                    this.drawPath2(x, y, lc, lw, 1, guidRemote);
                }
                this.undoStack.push({
                    type: 'path-line',
                    pathID: pathID,
                    datum: this.penPoints,
                    lineColor: lc,
                    lineWidth: lw,
                    guid: guid
                });
                this.penPoints = [];
                this.penCbkCount = 0;
                break;
            case 'highlighter':
                guid = guidRemote || pathID;

                if (send) {
                    this.drawPath2(x, y, lc, lw, 0.5);
                } else {
                    this.drawPath2(x, y, lc, lw, 0.5, guidRemote);
                }
                this.undoStack.push({
                    type: 'path-line',
                    pathID: pathID,
                    datum: this.penPoints,
                    lineColor: lc,
                    lineWidth: lw,
                    guid: guid
                });
                this.penPoints = [];
                this.penCbkCount = 0;
                break;
            case 'arrow':
            case 'triangle':
            case 'line':
            case 'circle':
            case 'square':
            case 'ellipse':
            case 'rectangle':
                guid = guidRemote || this.guid();
                if (send) { // continuePath中如果是send的话，还会zoomConvert
                	this.continuePath(oldx, oldy, this.zoomUnConvert(x), this.zoomUnConvert(y), lc, lw, guidRemote, send);
                } else {
                	this.continuePath(oldx, oldy, x, y, lc, lw, guidRemote, send);
                }
                if (this.element) {
                    this.element.node.id = guid;
                    var BBox = this.element.getBBox();
                    if (BBox.width == 0 && BBox.height == 0) {
                        this.element.remove();
                    }
                }
                break;
            default:
                console.log("endPath: unknown item. ignore", this.drawingItem);
                return;
        }

        if (this.element) {
            var clone = $.extend({}, this.element);
            clone.guid = guid;
            this.undoStack.push(clone);
        }

        if (send) {
            this.connection.sendPath({
                x: x,
                y: y,
                type: 'touchend',
                lineColor: lc,
                lineWidth: lw,
                drawingItem: drawingItem,
                guid: guid
            });
        }
        this.element = null;
    },

    guid: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return 'path-' + s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    currentPathID: function() {
        return this.penPathID;
    },

    drawPath2: function(x, y, lc, lw, opacity, guidRemote) {
        var pathOpacity = opacity || 1;

        this.penPoints.push([x, y]);
        if (this.penPoints.length == 1) {
            return;
        } else if (this.penPoints.length == 2) {
            this.d3SVG.append("path")
                .datum(this.penPoints)
                .attr("id", (guidRemote || this.currentPathID()))
                .attr("stroke", lc)
                .attr("stroke-width", lw)
                .attr("fill", "none")
                .attr("opacity", pathOpacity)
                .attr("d", this.penFunction);
        } else {
            this.d3SVG.select('#' + (guidRemote || this.currentPathID())).
            attr("d", this.penFunction);
        }
    },

    /**
     * Clear canvas
     * @param {Object} send
     */
    clear: function(send, reloadImage) {
        $('.js_textContainer').remove();
        this.laserPen = null;
        reloadImage = typeof reloadImage == 'undefined' ? true : reloadImage;
        this.cvs.clear();
        if (reloadImage) this.connection.getImage();
        if (send) this.connection.sendClear();
        this.undoStack = [];
        this.redoStack = [];
    },

    getMeta: function(url, cbk) {
        var img = new Image();
        var _this = this;
        img.onload = function() {
            cbk(_this, img.width, img.height);
        };
        img.src = url;
        img.style.backgroundImage = 'url(' + url + ')';
        //img.src = url(bgdesert.jpg) repeat-y;
    },

    /**
     * Load an image onto the canvas
     * @param {Object} url
     */
    loadImage: function(url, width, height) {
        this.getMeta(url, function(_this, w, h) {
            var W = _this.parent_.canvasWidth;
            var H = _this.parent_.canvasHeight;

            var x = 0;
            var y = 0;
            var ratioW = W / w;
            var ratioH = H / h;
            var ratio = Math.min(ratioW, ratioH);
            w = w * ratio;
            h = h * ratio;

            if (w <= W && h <= H) {
                // @TODO, resize the canvas;
                x = (W - w) / 2;
                y = (H - h) / 2;
            } else {
                if (ratioW < ratioH) {
                    y = (H - h) / 2;
                } else {
                    x = (W - w) / 2;
                }
            }
            if (y >= 30) { y = y - 30; }
            var img = _this.cvs.image(url, x, y, w, h);
            _this.changeCanvasSize(x, y, W, H, 30);
            img.toBack();
            //_this.cvs.image(url, 0, 0, _this.parent_.canvasWidth, _this.parent_.canvasHeight);
        });
    },

    changeCanvasSize: function(x, y, width, height, extraY) {
        var marginTop;
        extraY = 0;
        this.parent_.$.canvasContainer.applyStyle("width", String(width * this.zoomRatio) + "px");
        this.parent_.$.canvasContainer.applyStyle("height", String(height * this.zoomRatio) + "px");
        this.parent_.$.canvasContainer.applyStyle("margin-top", String(this.getCanvasMarginTop()) + "px");
        // Since thiere is 60px header bar.
//        if (extraY) {
//            marginTop = y / 2 + extraY;
//            this.parent_.$.canvasContainer.applyStyle("margin-top", String(marginTop) + "px");
//        } else {
//            marginTop = y / 2;
//            this.parent_.$.canvasContainer.applyStyle("margin-top", String(marginTop) + "px");
//        }
        this.canvasHeight = height;
        this.canvasWidth = width;
        this.topMargin = marginTop;
    },

    getImage: function() {
        images = document.getElementsByTagName("image");
        // TODO More specific targetting of image
        if (images.length != 0) {
            for (var i = 0; i < images.length; i++) {
                images[i].parentNode.removeChild(images[i]);
            }
        }
        this.connection.getImage(this.currentPage);
    },

    /**
     * Go to the next page
     */
    nextPage: function() {
        if (this.currentPage + 1 > this.totalPages) {
            // Blank canvas
            return false;
        } else {
            $('.js_textContainer').remove();
            this.laserPen = null;
            this.zoomReduction();
            this.changeCanvasSize(0, 0, this.parent_.canvasWidth, this.parent_.canvasHeight);
            this.currentPage += 1;
            this.connection.init(this.uid, this.room, this.currentPage);
            return true;
        }
    },

    /**
     * Go to the previous page
     */
    prevPage: function() {
        if (this.currentPage - 1 <= 0) {
            // do nothing
            return false;
        } else {
            $('.js_textContainer').remove();
            this.laserPen = null;
            this.zoomReduction();
            this.changeCanvasSize(0, 0, this.parent_.canvasWidth, this.parent_.canvasHeight);
            this.currentPage -= 1;
            this.connection.init(this.uid, this.room, this.currentPage);
            return true;
        }
    },

    gotoPage: function(pageNum, broadcast) {
        $('.js_textContainer').remove();
        this.laserPen = null;
        this.changeCanvasSize(0, 0, this.parent_.canvasWidth, this.parent_.canvasHeight);
        this.currentPage = pageNum;
        this.connection.init(this.uid, this.room, pageNum, broadcast);
        this.callback(this.totalPages, this.currentPage);
    },

    newPage: function() {
        $('.js_textContainer').remove();
        this.laserPen = null;
        this.currentPage = this.totalPages + 1;
        this.totalPages += 1;
        this.connection.newPage(this.uid, this.room, this.currentPage);
    },

    getColor: function() {
        return this.color;
    },

    setTotalPages: function(pages) {
        this.totalPages = pages.length;
        this.page_list = pages;
        this.callback(this.totalPages, this.currentPage);
    },

    /**
     * Ask server to make video of current whiteboard
     */
    makeVideo: function() {
        this.connection.makeVideo();
    },

    selectPen: function() {
        this.drawingItem = 'pen';
    },

    selectHighlighter: function() {
        this.drawingItem = 'highlighter';
    },

    //selectEraser: function() {
    //this.drawingItem = 'eraser';
    //},

    removeLaser: function(send) {
        if (this.laserPen) {
            $(this.laserPen.node).hide()
            this.laserPen = null;
            if (send) {
            	this.connection.sendLaserEvent('laser-remove');
            }
        }
    },

    drawLaser: function(x, y, isRemote) {
        var self = this;
        var canvasBounds = this.parent_.$.canvasContainer.getBounds();
        if (!x && !y) {
            x = canvasBounds.width / 2 + canvasBounds.left;
            y = canvasBounds.height / 2;
        }

        if (!isRemote) {
            y = y + $('#app_scroller').scrollTop();
        }

        if (!this.laserPen) {
            this.laserPen = this.cvs.circle(x, y, 8);
            this.laserPen.attr({
                stroke: "red",
                fill: "red",
                opacity: "0.8"
            });
        }
        this.laserPen.attr({
            cx: x,
            cy: y
        });

        if (!isRemote && !this.isGuest()) {
            // create remote laser
            self.connection.sendLaserEvent('laser-draw', {
                x: x,
                y: y
            });
        }
    },

    drawRectangle: function() {
        this.drawingItem = 'rectangle';
    },

    drawSquare: function() {
        this.drawingItem = 'square';
    },

    drawArrow: function() {
        this.drawingItem = 'arrow';
    },

    drawTriangle: function() {
        this.drawingItem = 'triangle';
    },

    drawLine: function() {
        this.drawingItem = 'line';
    },

    drawEllipse: function() {
        this.drawingItem = 'ellipse';
    },

    drawCircle: function() {
        this.drawingItem = 'circle';
    },

    disableTextEditing: function() {
        var self = this;
        this.cvs.forEach(function(node) {
            if (node.type === 'text') {
                // disable text editing after being zoomed
                // since zooming would lead to several issues
                // that hard to resolve.
                node.unclick();
            }
        });
    },
    justifyText: function() {
        var b = this.zoomRatio;

        for (var i = 0, len = $('.js_textContainer').length; i < len; i++) {
            var $text = $($('.js_textContainer')[i]);

            $text.css({
                left: $text.data('position-x') * b,
                top: $text.data('position-y') * b,
                width: $text.width() * b / this.zoomRatioPre,
                height: $text.height() * b / this.zoomRatioPre
            });
        }

        var textareaFrame = $('#textareaFrame');
        textareaFrame.css({
            left: textareaFrame.data('position-x') * b,
            top: textareaFrame.data('position-y') * b
        });

        var outerLine = $('#selectedOuterLine');
        if (outerLine[0]) {
            outerLine.css({
                left: outerLine.data('position-x') * b,
                top: outerLine.data('position-y') * b
            });
        }

    },
    zoomIn: function() {
        if (this.zoomRatio >= this.zoomRatioMax) {
            return;
        }
        this.zoomRatioPre = this.zoomRatio;
        this.zoomRatio += this.zoomRatioChange;
        if (this.zoomRatio > this.zoomRatioMax) {
        	this.zoomRatio = this.zoomRatioMax;
        }
        this.cvs.scaleAll(this.zoomRatio);
        // Adjust convas size accordingly
        this.parent_.$.canvasContainer.applyStyle("width", String(this.canvasWidth * this.zoomRatio) + "px");
        this.parent_.$.canvasContainer.applyStyle("height", String(this.canvasHeight * this.zoomRatio) + "px");
        this.parent_.$.canvasContainer.applyStyle("margin-top", String(this.getCanvasMarginTop()) + "px");

        // if (this.laserPen) {
        //     this.removeLaser(true);
        //     this.drawLaser();
        // }
        this.justifyText();
        this.disableTextEditing();
    },
    zoomOut: function() {
        if (this.zoomRatio <= this.zoomRatioMin) {
            return;
        }
        this.zoomRatioPre = this.zoomRatio;
        this.zoomRatio -= this.zoomRatioChange;
        if (this.zoomRatio < this.zoomRatioMin) {
        	this.zoomRatio = this.zoomRatioMin;
        }
        this.cvs.scaleAll(this.zoomRatio);
        // Adjust convas size accordingly
        this.parent_.$.canvasContainer.applyStyle("width", String(this.canvasWidth * this.zoomRatio) + "px");
        this.parent_.$.canvasContainer.applyStyle("height", String(this.canvasHeight * this.zoomRatio) + "px");
        this.parent_.$.canvasContainer.applyStyle("margin-top", String(this.getCanvasMarginTop()) + "px");
        // redrew the laser pen, or there will be offset while been dragging around,
        // since it will be calculated by old canvas bounds.
        // if (this.laserPen) {
        //     this.removeLaser(true);
        //     this.drawLaser();
        // }
        this.justifyText();
        this.disableTextEditing();
    },
    zoomReduction: function() {
        this.zoomRatio = 1;
        this.zoomRatio = this.zoomRatio * this.zoomRatioCustom;
        this.cvs.scaleAll(this.zoomRatio);
        // Adjust convas size accordingly
        this.parent_.$.canvasContainer.applyStyle("width", String(this.canvasWidth * this.zoomRatio) + "px");
        this.parent_.$.canvasContainer.applyStyle("height", String(this.canvasHeight * this.zoomRatio) + "px");
        this.parent_.$.canvasContainer.applyStyle("margin-top", String(this.getCanvasMarginTop()) + "px");

        this.justifyText();
        this.disableTextEditing();
    },

    undoWithDrawing: function() {
        this.executeUndo2(true);
    },

    redoWithDrawing: function() {
        this.executeRedo2(true);
    },

    executeUndo2: function(send, guid) {
        //var element = this.undoStack.pop(),
        var element, guid, clone;

        if (!guid && this.undoStack.length > 0) {
            //remote
            guid = this.undoStack[this.undoStack.length - 1].guid;
        }
        console.log(this.undoStack);
        for (var i = this.undoStack.length - 1; i >= 0; i -= 1) {
            if (this.undoStack[i].guid == guid) {
                element = this.undoStack[i];
                this.undoStack.splice(i, 1);
                break;
            };
        }
        console.log(this.undoStack);
        console.log("executeUndo2", guid, element);
        if (element) {
            if (element.type === 'rm') {
                console.log("draw", element.path);
                if (element.path.type == 'text') {
                    //text
                    this.drawTextEx(element.path);
                } else if (element.path.type == 'path-line') {
                    //line
                    this.d3SVG.append("path")
                        .datum(element.path.datum)
                        .attr("id", element.path.guid)
                        .attr("stroke", element.path.lineColor)
                        .attr("stroke-width", element.path.lineWidth)
                        .attr("fill", "none")
                        .attr("d", this.penFunction);
                } else {
                    //shape
                    var clone = element.path.clone();
                    clone.guid = element.path.guid;
                    clone.node.id = element.path.guid;
                    console.log("undo2 clone", clone);
                }
                this.redoStack.push(element);
            } else {
                console.log("rm ", element);
                $("#" + guid).remove();
                this.redoStack.push(element);
            }
            //if (element.type === 'path-line') {
            //guid = element.pathID;
            //$("#" + guid).remove();
            //this.redoStack.push(element);
            //} else if (element.type === 'rm-shape') {
            //guid = guid || element.shape.node.id;
            //clone = element.shape.clone();
            //clone.node.id = guid;
            //this.redoStack.push({
            //type: 'rm-shape',
            //shape: clone
            //});
            //} else if (element.type === 'rm-path') {
            //guid = guid || element.path.pathID;
            //this.d3SVG.append("path")
            //.datum(element.path.datum)
            //.attr("id", element.path.pathID)
            //.attr("stroke", element.path.lineColor)
            //.attr("stroke-width", element.path.lineWidth)
            //.attr("fill", "none")
            //.attr("d", this.penFunction);
            //this.redoStack.push(element);
            //} else {
            //guid = guid || element.node.id;
            //$("#" + guid).remove();
            //this.redoStack.push(element);
            //}
            if (send && guid && element) {
                this.connection.sendPath({
                    type: 'undo',
                    guid: guid
                })
            }
        }
    },

    executeRedo2: function(send, guid) {
        //var element = this.redoStack.pop(),
        var element, guid, clone;
        if (!guid && this.redoStack.length > 0) {
            //remote
            guid = this.redoStack[this.redoStack.length - 1].guid;
        }
        for (var i = this.redoStack.length - 1; i >= 0; i -= 1) {
            if (this.redoStack[i].guid == guid) {
                element = this.redoStack[i];
                this.redoStack.splice(i, 1);
                break;
            };
        }
        console.log("executeRedo2", element);
        if (element) {
            if (element.type === 'rm') {
                console.log("rm", element)
                $("#" + element.op_guid).remove();
                this.undoStack.push(element);
            } else {
                console.log("draw", element)
                if (element.type == 'text') {
                    //text
                    this.drawTextEx(element);
                } else if (element.type == 'path-line') {
                    //line
                    this.d3SVG.append("path")
                        .datum(element.datum)
                        .attr("id", guid)
                        .attr("stroke", element.lineColor)
                        .attr("stroke-width", element.lineWidth)
                        .attr("fill", "none")
                        .attr("d", this.penFunction);
                } else {
                    //shape
                    var clone = element.clone();
                    clone.guid = element.guid;
                    clone.node.id = element.guid;
                    console.log("redo2 clone", clone);
                }
                this.undoStack.push(element);
            }
            //if (element.type === 'path-line') {
            //guid = guid || element.pathID;
            //this.d3SVG.append("path")
            //.datum(element.datum)
            //.attr("id", element.pathID)
            //.attr("stroke", element.lineColor)
            //.attr("stroke-width", element.lineWidth)
            //.attr("fill", "none")
            //.attr("d", this.penFunction);
            //this.undoStack.push(element);
            //} else if (element.type === 'rm-shape') {
            //guid = guid || element.shape.node.id;
            //$("#" + guid).remove();
            //this.undoStack.push({
            //shape: element.shape,
            //type: 'rm-shape'
            //});
            //} else if (element.type === 'rm-path') {
            //guid = guid || element.path.pathID;
            //$("#" + guid).remove();
            //this.undoStack.push({
            //path: element.path,
            //type: 'rm-path'
            //});
            //} else if (element.type === 'text') {
            ////guid = guid || element.node.id;
            //// var x = element.attr("x");
            //// var y = element.attr("y");
            //// var text = element.attr("text");
            //// this.executeAddText(x, y, text);
            //this.drawText(element);
            //} else {
            //guid = guid || element.node.id;
            //clone = $.extend({},element);
            //clone.node.id = guid;
            //this.undoStack.push(clone);
            //}

            if (send && guid && element) {
                this.connection.sendPath({
                    type: 'redo',
                    guid: guid
                });
            }
        }
    },

    undo: function() {
        this.executeUndo();
        this.connection.sendPath({ type: 'undo' })
    },

    executeUndo: function() {
        console.log('executeUndo @' + Date());
        var toUndo = this.undoStack.pop();
        if (toUndo) {
            if (toUndo.type === 'path-line') {
                var p = document.getElementById(toUndo.pathID);
                if (p) {
                    p.parentElement.removeChild(p);
                    this.redoStack.push(toUndo);
                } else {
                    console.log("fail to find the path by id + " + toUndo.pathID + " to execute undo");
                }
            } else if (toUndo.type === 'rm-shape') {
                var cloneShape = toUndo.shape.clone(); // clone to re-draw the shape
                this.redoStack.push({ // push the {type: 'rm-shape', shape: clone} to redoStack
                    type: 'rm-shape',
                    shape: cloneShape
                });
            } else if (toUndo.type === 'rm-path') { // draw the path back
                var pathObj = $(toUndo.path.outerHTML);
                this.d3SVG.append("path")
                    .attr("id", pathObj.attr('id'))
                    .attr("stroke", pathObj.attr('stroke'))
                    .attr("stroke-width", pathObj.attr('stroke-width'))
                    .attr("fill", "none")
                    .attr("d", pathObj.attr('d'));
                this.redoStack.push(toUndo);
            } else {
                var clone = $.extend(true, {}, toUndo);
                this.redoStack.push(clone);
                toUndo.remove();
            }
        }
    },

    redo: function() {
        this.executeRedo();
        this.connection.sendPath({ type: 'redo' });
    },

    executeRedo: function() {
        console.log('executeRedo @' + Date());
        var toRedo = this.redoStack.pop();
        if (toRedo) {
            if (toRedo.type === 'path-line') {
                this.d3SVG.append("path")
                    .datum(toRedo.datum)
                    .attr("id", toRedo.penPathID)
                    .attr("stroke", toRedo.lineColor)
                    .attr("stroke-width", toRedo.lineWidth)
                    .attr("fill", "none")
                    .attr("d", this.penFunction);
                this.undoStack.push(toRedo);
            } else if (toRedo.type === 'rm-shape') {
                var clone = $.extend({}, toRedo.shape);
                this.undoStack.push({
                    type: 'rm-shape',
                    shape: clone
                });
                toRedo.shape.remove();
            } else if (toRedo.type === 'rm-path') { // redo to remove the path
                var p = document.getElementById(toRedo.path.id);
                if (p) {
                    var clone = $.extend({}, toRedo.path);
                    this.undoStack.push({ type: 'rm-path', path: clone });
                    p.parentElement.removeChild(p);
                }
            } else {
                var clone = toRedo.clone();
                this.undoStack.push(clone);
            }
        }
    },

    onTextClicked: function(t) {
        // Guest user should not allowed to edit text on whiteboard.
        if (this.isGuest()) return;

        var textBBox = t.getBBox();
        this.selectElementAndDrawOutline(textBBox.x, textBBox.y);
        var input = t.inlineTextEditing.startEditing(); // Retrieve created <input type=text> field
        var _this = this;
        var prevDrawingItem = this.drawingItem;
        // stop drawing while we're editing text
        this.drawingItem = '';
        input.addEventListener("blur", function(e) {
            // Stop inline editing after blur on the text field
            t.inlineTextEditing.stopEditing();
            _this.connection.sendPath({
                type: 'edittext',
                oldx: t.attrs.x,
                oldy: t.attrs.y,
                value: t.inlineTextEditing.input.value,
                guid: t.node.id
            });
            // restore previous drawing item.
            _this.drawingItem = prevDrawingItem;
            //_this.cancelSelect();
        });
    },

    findAndRemoveFromStack: function(stack, guid) {
        var clone;

        for (index = 0, length = stack.length; index < length; index += 1) {
            var obj = stack[index];
            if (!obj || !obj.type) {
                // remove invalid obj in undo/redo stack
                stack.splice(index, 1);
                continue;
            }
            if (obj.guid === guid) {
                clone = $.extend({}, obj);
                // Remove the element from stack
                //stack.splice(index, 1);
                stack.push({
                    path: clone,
                    type: 'rm'
                });
            }

            //if (obj.type === 'path-line') {
            //if (obj.pathID === guid) {
            //clone = $.extend({}, obj);
            //// Remove the element from stack
            //stack.splice(index, 1);
            //stack.push({
            //path: clone,
            //type: 'rm-path'
            //});
            //}
            //} else if (obj.type === 'rm-shape') {
            //if (obj.shape.node.id === guid) {
            //clone = $.extend({}, obj.shape);
            //stack.splice(index, 1);
            //stack.push({
            //shape: clone,
            //type: 'rm-shape'
            //});
            //}
            //} else if (obj.type === 'rm-path') {
            //if (obj.path.pathID === guid) {
            //clone = $.extend({}, obj.path);
            //stack.splice(index, 1);
            //stack.push({
            //path: clone,
            //type: 'rm-path'
            //})
            //}
            //}else if(obj.type === 'text') {
            //stack.splice(index, 1);
            //stack.push($.extend({}, obj));
            //}else{
            //if (obj.node.id === guid) {
            //clone = $.extend({}, obj);
            //stack.splice(index, 1);
            //stack.push({
            //shape: clone,
            //type: 'rm-shape'
            //});
            //}
            //}
        }
        return clone;
    },

    removeSelectedEx: function(rm_guid, op_guid) {
        for (var index = this.undoStack.length - 1; index >= 0; index -= 1) {
            //console.log(index , guid, this.undoStack[index]);
            if (this.undoStack[index].guid === op_guid) {
                this.undoStack.push({
                    type: 'rm',
                    guid: rm_guid,
                    op_guid: op_guid,
                    path: this.undoStack[index]
                });
                break;
            }
        }

        var outerLine = $('#selectedOuterLine');

        if (outerLine.is(":visible")) {
            outerLine.hide();
        }

        $('#textareaFrame').hide();

        $("#" + op_guid).remove();
        this.cancelSelect();
    },
    /*
     * @guid if guid is not null, then the operation is from remote user
     * */
    removeSelected: function(send, guid, op_guid) {
        var element,
            elementId,
            //id,
            guid, op_guid;

        if (guid) {
            //elementId = guid;
        } else {
            // currentSelected is a local variable, it only initialzed by user selection
            // if the remove operation is initialized by remove user, then it always be null.
            if (!this.currentSelected) {
                return;
            }
            element = this.currentSelected.element;
            if (this.currentSelected.path) {
                // user select a path object
                elementId = element.id;
            } else {
                // user select a shape object
                elementId = element.node.id;
            }
            //guid = elementId;
            guid = this.guid();
            op_guid = elementId;
        }

        this.removeSelectedEx(guid, op_guid);
        //this.findAndRemoveFromStack(this.undoStack, guid);
        //this.findAndRemoveFromStack(this.redoStack, guid);
        if (send) {
            this.connection.sendPath({
                type: 'rm',
                guid: guid,
                op_guid: op_guid
            });
        }
    },

    executeRemove: function(x, y) {
        var pageX = x + this.parent_.$.canvasContainer.getBounds().left;
        var pageY = y + this.parent_.$.canvasContainer.getBounds().top;

        var svgElem = this.cvs.getElementByPoint(pageX, pageY);
        if (svgElem) {
            var clone = $.extend({}, svgElem);
            this.undoStack.push({
                type: 'rm-shape',
                shape: clone
            });
            svgElem.remove();
            this.cancelSelect();
            return true;
        }

        var domElem = document.elementFromPoint(pageX, pageY);
        if (domElem && (domElem.id.indexOf('path-') > -1)) {
            var clone = $.extend({}, domElem);
            this.undoStack.push({
                type: 'rm-path',
                path: clone
            });
            domElem.remove();
            this.cancelSelect();
            return true;
        }

        return false;
    },

    doSelect: function() {
        this.drawingItem = '';
        this.doingSelect = true;
    },

    hasSelectElement: function() {
        return !!this.currentSelected;
    },

    cancelSelect: function() {
        if (this.currentSelected) {
            var outerRect = this.currentSelected.outerRect,
                index, length;
            var element = $('#selectedOuterLine');
            if (element[0]) {
                element.hide();
            }
            if (!outerRect) return;

            for (index = 0, length = outerRect.length; index < length; index += 1) {
                outerRect[index].remove();
            }
        }
        this.currentSelected = null;
    },

    stopDoingSelect: function() {
        this.doingSelect = false;
    },

    selectSvgElementByPoint: function(x, y) {
        var indexX, indexY, element;

        for (indexX = x - 10; indexX < x + 10; indexX += 1) {
            for (indexY = y - 10; indexY < y + 10; indexY += 1) {
                element = this.cvs.getElementByPoint(indexX, indexY);
                if (element) {
                    if (element.type === 'image') {
                        // background image should not be selected.
                        // ignore it
                        continue;
                    }
                    return element;
                }
            }
        }
        return undefined;
    },

    selectDomElementByPoint: function(x, y) {
        var indexX, indexY, element;

        for (indexX = x - 10; indexX < x + 10; indexX += 1) {
            for (indexY = y - 10; indexY < y + 10; indexY += 1) {

                element = document.elementFromPoint(indexX, indexY);
                if (element && (element.id.indexOf('path-') > -1)) {
                    return element;
                }
            }
        }
        return undefined;
    },

    appclicked: function(data) {

        x = this.zoomConvert(data.x);
        y = this.zoomConvert(data.y);

        // if (this.laserPen) {
        //     this.removeLaser(true);
        //     this.drawLaser(x, y);
        // }

        if (data.laserOn) {
            //this.removeLaser(true);
            this.drawLaser(x, y);
        } else if (this.addingText) {

            // modify the Add text bug temporary add
            /*--------------------------------------------------------*/
            this.drawTextareaFrame(data);

            return;

            /*--------------------------------------------------------*/

            // if(this.hasSelectElement()){
            //     var element = this.currentSelected.element;
            //     if (element.type === 'text') {
            //         var bbox = element.getBBox();
            //         // Adding 72px since the y axis of outline around text has 72px offset
            //         if (x > bbox.x &&
            //             x < bbox.x + bbox.width &&
            //             y > bbox.y &&
            //             y < bbox.y + bbox.height + 72) {
            //             return;
            //         }
            //     }
            // }

            // this.executeAddText(x, y);
            // this.connection.sendPath({
            //     oldx: x,
            //     oldy: y,
            //     type: 'addtext',
            //     guid: String(x) + '-' + String(y)
            // });
        } else if (this.doingSelect) {
            this.selectElementAndDrawOutline(data);
        }
    },
    selectElementAndDrawOutline: function(data) {

        var target = data.event.target,
            parentEle = $(target).parent(),
            x = Number(parentEle.attr('x')),
            y = Number(parentEle.attr('y')),
            guid = parentEle.attr('id');

        $('#selectedOuterLine').remove();

        if (target.className === 'text-entity') {
            this.cancelSelect();
            var frame = this.drawOuterLine('selectedOuterLine');

            frame.css({
                    left: parentEle.offset().left + $('#app_scroller').scrollLeft() - data.canvas.left,
                    top: parentEle.offset().top + $('#app_scroller').scrollTop() - data.canvas.top,
                    zIndex: 1
                })
                .data({
                    'position-x': parentEle.data('position-x'),
                    'position-y': parentEle.data('position-y')
                })
                .show();

            this.currentSelected = {
                path: false,
                element: {
                    guid: guid,
                    x: x,
                    y: y,
                    node: {
                        id: guid
                    }
                }
            };
        }

        var pageX = data.x + this.parent_.$.canvasContainer.getBounds().left;
        var pageY = data.y + this.parent_.$.canvasContainer.getBounds().top;

        var svgElem = this.selectSvgElementByPoint(pageX, pageY);
        if (svgElem) {
            // Do not glow laser pen
            if (svgElem !== this.laserPen && !this.isOutline(svgElem)) {
                if (svgElem.type === 'text') {
                    if (this.hasSelectElement()) {
                        var element = this.currentSelected.element;
                        // if current selected element is the same with the one we're click on
                        var bbox = element.getBBox();
                        // Adding 72px since the y axis of outline around text has 72px offset
                        if (bbox && x > bbox.x &&
                            x < bbox.x + bbox.width &&
                            y > bbox.y &&
                            y < bbox.y + bbox.height + 72) {
                            return;
                        }
                    }
                }
                // cancel previous selection
                this.cancelSelect();

                var result;
                if (svgElem.type === 'text') {
                    result = this.drawOuterLineOnSelected(svgElem, 6, 6, 72, 72);
                } else {
                    result = this.drawOuterLineOnSelected(svgElem);
                }
                this.currentSelected = {
                    path: false,
                    element: svgElem,
                    outerRect: result
                };
            }
        }

        var domElem = this.selectDomElementByPoint(pageX, pageY);
        if (domElem) {
            // cancel previous selection
            this.cancelSelect();

            var result = this.drawOuterLineOnSelected(domElem);
            this.currentSelected = {
                path: true,
                element: domElem,
                outerRect: result
            };
        }
    },

    isOutline: function(svgElement) {
        if (!svgElement) return false;
        if (svgElement.data("isOutline")) {
            return true;
        }
        return false;
    },

    drawOuterLineOnSelected: function(svgElem, xOffset, yOffset, widthOffset, heightOffset) {
        var xOffset = xOffset || 2;
        var yOffset = yOffset || 2;
        var widthOffset = widthOffset || 4;
        var heightOffset = heightOffset || 4;

        var result = [];
        var bbBox = svgElem.getBBox();
        if (!bbBox) {
            return;
        }
        var outerRect = this.cvs.rect(
            bbBox.x - xOffset,
            bbBox.y - yOffset,
            bbBox.width + widthOffset,
            bbBox.height + heightOffset);

        outerRect.attr({
            "stroke-dasharray": ["--"],
            "stroke": "rgb(0, 158, 235)",
            "stroke-width": 1
        });
        outerRect.data("isOutline", true);
        result.push(outerRect);

        var cornerRectAttr = {
            "stroke": "rgb(0, 158, 235)",
            "stroke-width": 1,
            "fill": "rgb(0, 158, 235)"
        };

        var cornerRect1 = this.cvs.rect(bbBox.x - 8, bbBox.y - 8, 8, 8)
        cornerRect1.attr(cornerRectAttr);
        cornerRect1.data("isOutline", true);
        result.push(cornerRect1);

        var cornerRect2;
        if (svgElem.type === 'text') {
            cornerRect2 = this.cvs.rect(bbBox.x - 4 + bbBox.width + 64, bbBox.y - 8, 8, 8);
        } else {
            cornerRect2 = this.cvs.rect(bbBox.x - 2 + bbBox.width, bbBox.y - 8, 8, 8);
        }
        cornerRect2.attr(cornerRectAttr);
        cornerRect2.data("isOutline", true);
        result.push(cornerRect2);

        var cornerRect3;
        if (svgElem.type === 'text') {
            cornerRect3 = this.cvs.rect(bbBox.x - 8, bbBox.y + bbBox.height + 60, 8, 8);
        } else {
            cornerRect3 = this.cvs.rect(bbBox.x - 8, bbBox.y + bbBox.height, 8, 8);
        }

        cornerRect3.attr(cornerRectAttr);
        cornerRect3.data("isOutline", true);
        result.push(cornerRect3);

        var cornerRect4;
        if (svgElem.type === 'text') {
            cornerRect4 = this.cvs.rect(bbBox.x - 5 + bbBox.width + 64, bbBox.y - 5 + bbBox.height + 66, 8, 8);
        } else {
            cornerRect4 = this.cvs.rect(bbBox.x - 5 + bbBox.width, bbBox.y - 5 + bbBox.height, 8, 8);
        }
        cornerRect4.attr(cornerRectAttr);
        cornerRect4.data("isOutline", true);
        result.push(cornerRect4);

        var cornerRect5;
        if (svgElem.type === 'text') {
            cornerRect5 = this.cvs.rect(bbBox.x - 5 + bbBox.width / 2 + 32, bbBox.y - 5 + bbBox.height + 66, 8, 8);
        } else {
            cornerRect5 = this.cvs.rect(bbBox.x - 5 + bbBox.width / 2, bbBox.y - 3 + bbBox.height, 8, 8);
        }
        cornerRect5.attr(cornerRectAttr);
        cornerRect5.data("isOutline", true);
        result.push(cornerRect5);

        var cornerRect6;
        if (svgElem.type === 'text') {
            cornerRect6 = this.cvs.rect(bbBox.x - 5 + bbBox.width / 2 + 32, bbBox.y - 10, 8, 8);
        } else {
            cornerRect6 = this.cvs.rect(bbBox.x - 5 + bbBox.width / 2, bbBox.y - 5, 8, 8);
        }
        cornerRect6.attr(cornerRectAttr);
        cornerRect6.data("isOutline", true);
        result.push(cornerRect6);

        var cornerRect7;
        if (svgElem.type === 'text') {
            cornerRect7 = this.cvs.rect(bbBox.x - 10, bbBox.y + bbBox.height / 2 + 27, 8, 8);
        } else {
            cornerRect7 = this.cvs.rect(bbBox.x - 7, bbBox.y - 5 + bbBox.height / 2, 8, 8);
        }
        cornerRect7.attr(cornerRectAttr);
        cornerRect7.data("isOutline", true);
        result.push(cornerRect7);

        var cornerRect8;
        if (svgElem.type === 'text') {
            cornerRect8 = this.cvs.rect(bbBox.x + bbBox.width + 60, bbBox.y + bbBox.height / 2 + 27, 8, 8);
        } else {
            cornerRect8 = this.cvs.rect(bbBox.x - 3 + bbBox.width, bbBox.y - 5 + bbBox.height / 2, 8, 8);
        }
        cornerRect8.attr(cornerRectAttr);
        cornerRect8.data("isOutline", true);
        result.push(cornerRect8);

        return result;
    },
    createElementNS: function(a) {
        var b = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
        b.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg">' + a + "</svg>";
        for (var c = document.createDocumentFragment(); b.firstChild.firstChild;) {
            c.appendChild(b.firstChild.firstChild);
        }
        return c;
    },
    drawTextEx: function(data) {

        var updateEle = $("#" + data.guid),
            _this = this

        var x = data.oldx,
            y = data.oldy;

        if (data.frame) {
            var left = data.frame.position().left || x,
                top = data.frame.position().top || y;
        } else {
            var left = x,
                top = y;
            left = this.zoomUnConvert(left);
            top = this.zoomUnConvert(top);
        }

        if (updateEle.get(0)) {
            updateEle.attr({
                x: x,
                y: y
            }).show();
            updateEle.find('textarea').val(data.value);
        } else {
        	// 原始宽高
        	var width = 200;
        	var height = 100;
        	width = width * this.zoomRatio;
        	height = height * this.zoomRatio;
            $('#svggroup').append('<div id="' + data.guid + '" data-position-x="' + x + '" data-position-y="' + y + '" class="js_textContainer" style="z-index:2; width:' + width + 'px; height:' + height + 'px;position:absolute; left:' + left + 'px; top:' + top + 'px;"><textarea style="background:transparent; color:red; font-size:24px; font-weight:bold; width:100%; height:100%;overflow:auto;" onselect="return false;" unselectable="on" class="text-entity" readonly="true" resizeable=false>' + data.value + '</textarea></div>');
        }
    },
    updateUndoStack: function(data) {
        var undoStack = this.undoStack;
        for (var i = undoStack.length - 1; i >= 0; i--) {
            if (data.guid == undoStack[i].guid) {
                $.extend(undoStack[i], data);
                undoStack[i].type = 'text';
            }
        }
        this.drawTextEx(data);
    },
    drawText: function(data) {

        // if the operation type is to edit the text, update the undo stack
        if (data.type === 'edittext' && !data.remote) {
            this.updateUndoStack(data);
            return;
        }

        this.undoStack.push({
            node: {
                id: data.guid
            },
            guid: data.guid,
            type: 'text',
            oldx: data.oldx,
            oldy: data.oldy,
            value: data.value
        });
        this.drawTextEx(data);

    },
    drawOuterLine: function(id) {
        var id = id || 'textareaFrame';

        // 原始宽高
        var width = 200;
        var height = 100;
        width = width * this.zoomRatio;
        height = height * this.zoomRatio;

        var outLineHtml = '<div id="' + id + '" class="js_textContainer" style="position:absolute; border:1px dashed #0096fd; width:' + width + 'px; height:' + height + 'px; z-index:10;">',
            styleStringBase = 'width:6px; height:6px; float:left; background-color:#0096fd;',
            styleString = styleStringBase + '';


        var dotHtml = '<div class="line" style="width:100%; margin-top:-3px">\
            <i style="' + styleString + ' margin-left:-3px;"></i>\
            <i style="' + styleString + ' margin-left:' + (width / 2 - 2) + 'px;"></i>\
            <i style="' + styleString + ' float:right; margin-right:-4px;"></i>\
        </div><div class="line" style="width:100%; margin-top:' + (height / 2 - 2) + 'px">\
            <i style="' + styleString + ' margin-left:-3px;"></i>\
            <i style="' + styleString + ' float:right; margin-right:-4px;"></i>\
        </div><div class="line" style="width:100%; margin-top:' + height + 'px">\
            <i style="' + styleString + ' margin-left:-4px;"></i>\
            <i style="' + styleString + ' margin-left:' + (width / 2 - 2) + 'px;"></i>\
            <i style="' + styleString + ' float:right; margin-right:-4px;"></i>\
        </div>';

        outLineHtml += dotHtml;

        if (id === 'textareaFrame') {
            textareaHtml = '<textarea id="_textarea" style="background:transparent; color:red; z-index:2; width:' + (width - 10) + 'px; height:' + (height - 10) + 'px; margin:' + (-1 * height) + 'px 0 0 3px; float:left; overflow:auto; border:0 none; z-index:11; font-size:24px; font-weight:bold; resize:none;"></textarea>';

            outLineHtml += textareaHtml + '</div>';
        }

        $('#svggroup').append(outLineHtml);

        return $('#' + id);
    },
    drawTextareaFrame: function(data) {

        var frame = $('#textareaFrame'),
            target = $(data.event.target);

        if (!frame[0]) {
            frame = this.drawOuterLine();
            // var $draggable = frame.draggabilly({
            //     // contain to parent element
            //     containment: true
            // });
        }

        data.frame = frame;

        this.executeAddText2(data);

    },
    showText: function(data) {
        var x = this.zoomUnConvert(data.x),
        	y = this.zoomUnConvert(data.y);

        var left = data.x,
            top = data.y;

        data.frame.css({
                top: top + data.scrollTop,
                left: left + data.scrollLeft
            })
            .data({
                'position-x': x,
                'position-y': y
            })
            .show();

        data.textarea.focus();
    },
    executeAddText2: function(data) {
        var textarea = $('#_textarea'),
            target = data.event.target,
            frame = data.frame,
            position = frame.position(),
            val = textarea.val(),
            box = $('#app_scroller'),
            scrollTop = box.scrollTop()
        scrollLeft = box.scrollLeft();

        data.scrollTop = scrollTop;
        data.scrollLeft = scrollLeft;

        // edit the original text
        if (!this.textEditing && target.className === 'text-entity') {
            data.textarea = textarea;
            this.textEdit(data);
        } else {
            // save the add text info
            var notTextareaEditing = this.textEditing && target.id !== '_textarea';

            if (notTextareaEditing && $.trim(val) != '') {

                var guid = textarea.data('guid'),
                    operationType = guid ? 'edittext' : 'addtext';

                guid = guid || this.guid();

                var x = frame.data('position-x'),
                    y = frame.data('position-y');
                x = this.zoomConvert(x);
                y = this.zoomConvert(y);
                x = this.zoomConvert(x);
                y = this.zoomConvert(y);

                var sendData = {
                    oldx: x,
                    oldy: y,
                    guid: guid,
                    type: operationType,
                    value: val
                };

                this.connection.sendPath(sendData);

                this.drawText($.extend(data, sendData));

                frame.hide();

                textarea.val('').data('guid', '');
            } else {
                if (notTextareaEditing && $.trim(val) == '' && frame.is(':visible')) {
                    frame.hide();
                } else if (this.textEditing && target.id === '_textarea') {
                    return;
                } else if (!data.cancelSelect) {
                    // add textarea
                    data.textarea = textarea;
                    this.showText(data);
                }
            }
        }
        this.textEditing = !this.textEditing;

    },
    textEdit: function(data) {
        var target = data.event.target,
            parentEle = $(target).parent(),
            textarea = parentEle.find('textarea'),
            guid = parentEle.attr('id');

        data.frame.css({
                top: parentEle.position().top,
                left: parentEle.position().left
            })
            .show()
            .data({
                'position-x': parentEle.data('position-x'),
                'position-y': parentEle.data('position-y')
            });

        parentEle.remove();

        data.textarea.val(target.value).focus().data('guid', guid);
    },
    executeAddText: function(x, y, text) {
        // Top banner is 60px height

        var yPosition = y;
        text = text || $L("Adding text here");
        var text = this.cvs.text(x, yPosition, text)
            .attr({
                'text-anchor': 'start',
                'font-size': '16px',
            });

        var id = x.toString() + '-' + yPosition.toString();
        text.node.id = id;

        this.selectElementAndDrawOutline(x, y);
        // Initialize text editing for the text element
        this.cvs.inlineTextEditing(text);
        text.click(this.onTextClicked.bind(this, text));
        //$(text).trigger("click");
        //text.click();

        this.textEdits[id] = text;

        var clone = $.extend({}, text);
        this.undoStack.push(clone);
    },

    executeEditText: function(x, y, value) {
        x = this.zoomConvert(x);
        y = this.zoomConvert(y);
        var id = x.toString() + '-' + y.toString();
        if (id in this.textEdits) {
            var t = this.textEdits[id];
            t.inlineTextEditing.autoEditing(value);
        }
    },

    addText: function() {
        this.drawingItem = '';
        this.addingText = true;
    },

    stopAddingText: function(drawingItem) {
        this.appclicked({
            addingText: true,
            event: {
                target: $('svg')[0]
            },
            cancelSelect: true
        });
        this.addingText = false;
    },
    deletePage: function() {
        $('#js_textContainer').remove();
        this.connection.deletePage();
    },
    cropContent: function() {
        var content = this.cvs.toSVG();
        var a = $("<a id='download-img'>")
            .attr("download", "img.png")
            .appendTo("body");
        var canvas_tag = $("<canvas id='my-canvas' style='display:none;'></canvas>")
            .appendTo("body");

        canvg(document.getElementById("my-canvas"), content);
        setTimeout(function() {
            var dataURL = document.getElementById('my-canvas').toDataURL("image/png");
            $('#download-img').attr('href', dataURL);
            a[0].click();
            a.remove();
            canvas_tag.remove();
        }, 500);
    },
    /**
     * 转换svg内容
     * 
     */
    convertSvgContent: function() {
    	try {
    		var content = $("#svggroup svg").prop("outerHTML");
            if (content == null || content == "") { // 没有outerHTML属性
            	//// 用XMLSerializer做转化
            	// content = new XMLSerializer().serializeToString($("#svggroup svg")[0]);
            	
            	// 新建div，将SVG元素复制后append进div，然后再取div的innerHTML
            	var tmp = document.createElement("div");
            	tmp.style.display = "none";
            	tmp.appendChild($("#svggroup svg")[0].cloneNode(true));
            	content = tmp.innerHTML;
            	tmp = null;
            	
            	// 删除转化后生成的无用字段
            	content = content.replace('xmlns="http://www.w3.org/2000/svg" xmlns:NS1="" NS1:', '');
    		}
            var canvas_tag = $("<canvas id='my-canvas' style='display:none;'></canvas>")
            canvg(canvas_tag[0], content);
            var dataURL = canvas_tag[0].toDataURL("image/png");
            canvas_tag.remove();
            return dataURL;
    	} catch (e) {
    		console.error("convertSvgContent error:", e);
    		return "";
    	}
    },
    isGuest: function() {
        return this.parent_.isGuest();
    }
});