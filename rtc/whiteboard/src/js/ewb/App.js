enyo.kind({
    name: "App",
    kind: "FittableRows",
    fit: true,

    published: {
        whiteboard: '',
        curves: {
            color: 'black',
            width: '3px',
        },
        eraser: {
            on: false,
            color: 'white',
            width: '9px',
            previousDrawingItem: 'pen',
        },
        laser: {
            on: false,
            previousDrawingItem: 'pen'
        },
        pen: {
            on: true,
            previousDrawingItem: ''
        },
        highlighter: {
            on: false,
            previousDrawingItem: 'pen'
        },
        selecting: {
            on: false,
            previousDrawingItem: 'pen'
        },
        textEditing: {
            on: false,
            previousDrawingItem: 'pen'
        },
        uid: 'test',
        vid: '',
        room: 'one',
        canvasWidth: 800,
        canvasHeight: 600,
        appIpAddress: "",
        appPort: "",
        role: 'host',
        pagePreviewNum: 0,
        perviewPagesNum: 6,
        pagePreviewContainer: [],
        parentContainer: "",
        redis: '',
        ticket: '',
        expiredMinute: 240,
    },

    components: [{
        kind: "onyx.Toolbar",
        fit: false,
        style: "display:none; margin: auto; background: #009eeb;border:1px solid #119eeb;",
        name: "topBar",
        components: [{
            kind: "onyx.Grabber"
        }, {
            content: "",
            style: "text-transform: uppercase;letter-spacing:0.1em;"
        }, {
            content: $L("Page"),
            name: "channelId",
            style: "text-transform: uppercase;letter-spacing:0.1em;font-size: 0.8em;font-weight:normal;"
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right;display:none;",
            components: [{
                kind: "onyx.Button",
                name: "logoutButton",
                ontap: "logout",
                onmouseover: "logoutButtonMouseOver",
                onmouseout: "logoutButtonMouseOut",
                style: "background:url(images/btn_quit_gray.png) top left no-repeat transparent;cursor:pointer;"
            }, {
                kind: 'onyx.Tooltip',
                classes: 'above',
                content: $L("Logout")
            }]
        }],
        rendered: function () {
            this.inherited(arguments);
            this.applyStyle("height", 60 + "px");
        }
    }, {
        kind: "FittableRows",
        name: "middleFittableRows",
        fit: true,
        style: "text-align: center; z-index: 0;",
        components: [{
            kind: "Scroller",
            classes: "enyo-fit",
            components: [{
                style: "display:inline-block;height:40px;width:40px;padding:5px;background:url(images/btn_left.png) center center no-repeat #808080;position:absolute;left:1%;top:50%;cursor:pointer;z-index:10;border-radius:5px;cursor:pointer;position:fixed;",
                ontap: "gotoPreviousPage",
                onmouseover: "gotoPreviousPageMouseOver",
                onmouseout: "gotoPreviousPageMouseOut",
                name: "gotoPreviousPage",
            }, {
                style: "margin:0 auto auto; display:inline-block;",
                ontap: "appclicked",
                ondragstart: "touchstart",
                ondragover: "touchmove",
                ondragfinish: "touchend",
                name: "canvasContainer",
                rendered: function () {
                    this.inherited(arguments);

                    if (window.self != window.top) {
                        this.applyStyle("margin-top", "0");
                    }

                    this.applyStyle("width", this.owner.canvasWidth + "px");
                    this.applyStyle("height", this.owner.canvasHeight + "px");
                    //                    this.applyStyle("box-shadow", "0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1)")
                    this.applyStyle("cursor", "auto");
                    this.applyStyle("cursor", "url(images/mouse.png) 4 4, auto");

                    if (window.location.protocol == 'https:') {
                        var websocketAddress = 'wss://' + this.owner.appIpAddress + ':' + this.owner.appPort + '/realtime/';
                    } else {
                        var websocketAddress = 'ws://' + this.owner.appIpAddress + ':' + this.owner.appPort + '/realtime/';
                    }
                    var websocketAddress = 'wss://' + this.owner.appIpAddress + ':' + this.owner.appPort + '/realtime/';
                    if (this.hasNode()) {
                        var _this = this;
                        this.owner.$.loadingPopup.show();
                        this.owner.whiteboard = new WhiteboardSvg(
                            this.node.getAttribute("id"),
                            this.owner,
                            1,
                            websocketAddress,
                            this.owner.role,
                            function (numPages, currentPage) {
                                // update button status after being initialized.
                                _this.owner.updatePageInfo();
                                _this.owner.$.loadingPopup.hide();
                                var template = $L.rb.getString("Page {n}");
                                var str = template.format({ n: _this.owner.whiteboard.getCurrentPage() });
                                _this.owner.$.channelId.content = str;
                                // render the change on the fly.
                                _this.owner.$.channelId.render();
                            }
                        );
                    }
                },
            }, {
                style: "display:inline-block;height:40px;width:40px;padding:5px;background:url(images/btn_right.png) center center no-repeat #808080;position:absolute;right:1%;top:50%;cursor:pointer;z-index:10;border-radius:5px;cursor:pointer;position:fixed;",
                ontap: "gotoNextPage",
                onmouseover: "gotoNextPageMouseOver",
                onmouseout: "gotoNextPageMouseOut",
                name: "gotoNextPage",
            },],
        }],
    }, {
        kind: "onyx.MoreToolbar",
        name: "bottomToolbar",
        style: "background:#262626;height:61px;border:0 none;",
        components: [{
            kind: "onyx.TooltipDecorator",
            style: "float:left;margin-top: 6px;",
            name: "uploadAndNewPageBtn",
            components: [{
                kind: "onyx.MenuDecorator",
                components: [{
                    name: "optionsMenu",
                    onmouseover: "optionsPickerMouseOver",
                    onmouseout: "optionsPickerMouseOut",
                    style: "margin-top: 8px;background:url(images/wb.svg) 0 0 no-repeat transparent;cursor:pointer;"
                }, {
                    kind: "onyx.Menu",
                    components: [{
                        name: "upload",
                        ontap: "uploadFileNew",
                        style: "background:url(images/btn_computer.png) no-repeat 12px center #FFF;cursor:pointer;color: #000;border-bottom:1px solid #000;",
                        allowHtml: true,
                        content: "<p style='padding-left: 36px;'>" + $L("Upload") + "</p>"
                    }, {
                        name: "newPage",
                        ontap: "selectNewPage",
                        style: "background:url(images/btn_newpage.png) no-repeat 12px center #FFF;cursor:pointer;color:#000;",
                        allowHtml: true,
                        content: "<p style='padding-left: 36px;'>" + $L("New Page") + "</p>"
                    }],
                }],
            }, {
                kind: 'onyx.Tooltip',
                content: $L('Attach a file or create a new page.'),
                classes: 'above',
                style: "margin-top: 20px;"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float:left;margin:6px 0 20px",
            components: [{
                name: "previewPages",
                kind: "onyx.Button",
                ontap: "selectPreviewPages",
                onmouseover: "previewMouseOver",
                onmouseout: "previewMouseOut",
                popup: "previewPagesPopup",
                style: "margin-top: 8px;background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -40px;cursor:pointer;",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Preview Pages"),
                classes: "above",
                style: "margin-top: -10px;"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float:left;margin:8px 0 20px",
            components: [{
                kind: "onyx.Button",
                ontap: "zoomInPane",
                name: "zoomInButton",
                onmouseover: "zoomInMouseOver",
                onmouseout: "zoomInMouseOut",
                style: "margin-top: 6px;background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -120px;cursor:pointer;"
            }, {
                kind: "onyx.Tooltip",
                content: $L("Zoom In"),
                classes: "above",
                style: "margin-top: -10px;"
            }],
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float:left;margin:6px 0 20px",
            components: [{
                kind: "onyx.Button",
                name: "zoomOutButton",
                style: "margin-top: 8px;background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -80px;cursor:pointer;",
                ontap: "zoomOutPane",
                onmouseover: "zoomOutMouseOver",
                onmouseout: "zoomOutMouseOut",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Zoom Out"),
                classes: "above",
                style: "margin-top: -10px;"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right;",
            components: [{
                kind: "onyx.Button",
                name: "deletePage",
                ontap: "deletePage",
                onmouseover: "deleteButtonMouseOver",
                onmouseout: "deleteButtonMouseOut",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -599px;cursor:pointer;margin:5px 0 20px;",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Delete Page"),
                classes: "above",
                style: "margin-top: 15px;"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right",
            components: [{
                kind: "onyx.Button",
                name: "clear",
                onmouseover: "clearButtonMouseOver",
                onmouseout: "clearButtonMouseOut",
                ontap: "selectClear",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -559px;height:25px;cursor:pointer;margin:5px 0 20px;",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Clear Page"),
                classes: "above"
            }],
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right",
            components: [{
                name: "eraser",
                kind: "onyx.Button",
                ontap: "selectEraser",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -519px;height:25px;cursor:pointer;margin:5px 0 20px;",
                onmouseover: "eraserMouseOver",
                onmouseout: "eraserMouseOut",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Eraser"),
                classes: "above"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float:right;",
            components: [{
                kind: "onyx.Button",
                ontap: "undoPath",
                name: "undoButton",
                onmouseover: "undoButtonMouseOver",
                onmouseout: "undoButtonMouseOut",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -479px;height:25px;cursor:pointer;margin:5px 0 20px;",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Undo"),
                classes: "above"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right",
            components: [{
                kind: "onyx.Button",
                ontap: "redoPath",
                name: "redoButton",
                onmouseover: "redoButtonMouseOver",
                onmouseout: "redoButtonMouseOut",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -439px;height:25px;cursor:pointer;margin:5px 0 20px;",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Redo"),
                classes: "above"
            }],
        },
        //{
        //kind: "onyx.Button",
        //classes: "fa fa-crop",
        //ontap: "cropContent",
        //style: "float:right",
        //},
        {
            name: "previewPagesPopup",
            kind: "onyx.Popup",
            centered: false,
            modal: false,
            floating: true,
            style: "height:135px; padding:0 0 10px 0;background-color: rgba(0,0,0,0.5);bottom:61px;left:0;right:0;border-radius:0;",
            components: [{
                name: "selectPrevious",
                style: "display:inline-block;float:left",
                content: "<div style='width:40px;height:145px;background-image:url(images/btn_left.png);background-position:center center;background-repeat:no-repeat;margin:0;background-color:rgba(0,0,0,0.8);cursor:pointer;margin-left:-1px;'></div>",
                allowHtml: true,
                ontap: "selectPrevious",
            }, {
                name: "selectNext",
                style: "display:inline-block;float:right;",
                content: "<div style='width:40px;height:145px;background-image:url(images/btn_right.png);background-repeat:no-repeat;background-position:center center;margin:0;background-color:rgba(0,0,0,0.8);cursor:pointer;'></div>",
                allowHtml: true,
                ontap: "selectNext",
            }],
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right",
            components: [{
                kind: "onyx.Button",
                ontap: "doSelect",
                name: "selectButton",
                onmouseover: "selectButtonMouseOver",
                onmouseout: "selectButtonMouseOut",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -399px;height:25px;cursor:pointer;margin:5px 0 20px;",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Select"),
                classes: "above"
            }],
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right;",
            components: [{
                kind: "onyx.Button",
                name: "laserPen",
                onmouseover: "laserPenMouseOver",
                onmouseout: "laserPenMouseOut",
                ontap: "selectLaserPen",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -359px;cursor:pointer;margin:5px 0 20px;",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Laser"),
                classes: "above",
                style: "margin-top: 15px;"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right;",
            components: [{
                kind: "onyx.PickerDecorator",
                components: [{
                    name: "penPicker",
                    kind: "onyx.Button",
                    onmouseover: "penPickerMouseOver",
                    onmouseout: "penPickerMouseOut",
                    style: "width:36px;background:url(images/wb.svg);background-repeat:no-repeat;background-position:0 -319px; background-color:transparent;height:30px;padding:0;cursor:pointer;margin:5px 0 20px;",
                }, {
                    kind: "onyx.Picker",
                    maxHeight: "400px",
                    components: [{
                        name: "rectangle",
                        ontap: "drawRectangle",
                        style: "padding: 15px;background-image: url(images/icon_rectangle.png);background-repeat:no-repeat;background-position: center center;cursor:pointer;"
                    }, {
                        name: "square",
                        ontap: "drawSquare",
                        style: "padding: 15px;background-image: url(images/icon_square.png);background-repeat:no-repeat;background-position: center center;cursor:pointer;"
                    }, {
                        name: "circle",
                        ontap: "drawCircle",
                        style: "padding: 15px;background-image: url(images/icon_circle.png);background-repeat:no-repeat;background-position: center center;cursor:pointer;"
                    }, {
                        name: "triangle",
                        ontap: "drawTriangle",
                        style: "padding: 15px;background-image: url(images/icon_triangle.png);background-repeat:no-repeat;background-position: center center;cursor:pointer;",
                    }, {
                        name: "line",
                        ontap: "drawLine",
                        style: "padding: 15px;background-image: url(images/icon_line.png);background-repeat:no-repeat;background-position: center center;cursor:pointer;",
                    }, {
                        name: "arrow",
                        ontap: "drawArrow",
                        style: "padding: 15px;background-image: url(images/icon_arrow.png);background-repeat:no-repeat;background-position: center center;cursor:pointer;",
                    }, {
                        name: "ellipse",
                        ontap: "drawEllipse",
                        style: "padding: 15px;background-image: url(images/icon_oval.png);background-repeat:no-repeat;background-position: center center;cursor:pointer;",
                    }],
                }],
            }, {
                kind: "onyx.Tooltip",
                content: $L("Shapes"),
                classes: "above",
                style: "margin-top: 10px;"
            }]
        },
        //{
        //kind: "onyx.TooltipDecorator",
        //style: "float: right",
        //components: [{
        //kind: "onyx.Button",
        //ontap: "addImage",
        //style: "float:right;background-image:url(images/btn_img.png);background-repeat:no-repeat;background-color:transparent;",
        //}, {
        //kind: "onyx.Tooltip",
        //content: "Add Image",
        //classes: "above"
        //}]
        //},
        {
            kind: "onyx.TooltipDecorator",
            style: "float: right;",
            components: [{
                kind: "onyx.Button",
                name: "addTextButton",
                onmouseover: "addTextButtonMouseOver",
                onmouseout: "addTextButtonMouseOut",
                ontap: "addText",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -279px;cursor:pointer;margin:5px 0 20px;",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Add Text"),
                classes: "above",
                style: "margin-top: 15px;"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float:right;",
            components: [{
                kind: "onyx.Button",
                name: "highlighter",
                onmouseover: "highlighterMouseOver",
                onmouseout: "highlighterMouseOut",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -239px;height:25px;cursor:pointer;margin:5px 0 20px;",
                ontap: "selectHighlighter",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Highlighter"),
                classes: "above"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right",
            components: [{
                kind: "onyx.Button",
                name: "pencilButton",
                onmouseover: "pencilMouseOver",
                onmouseout: "pencilMouseOut",
                style: "background:url(images/wb.svg);background-repeat:no-repeat;background-color:transparent;background-position:0 -199px;height:25px;cursor:pointer;margin:5px 0 20px;",
                ontap: "selectPen",
            }, {
                kind: "onyx.Tooltip",
                content: $L("Pen"),
                classes: "above"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right;",
            components: [{
                kind: "onyx.PickerDecorator",
                style: "width:50px;",
                components: [{
                    name: "lineWidthPicker",
                    kind: "onyx.Button",
                    style: "width: 40px;background:url(images/wb.svg);background-repeat:no-repeat;background-position:0 -159px;background-color:transparent;height:25px;cursor:pointer;margin:11px 10px 20px",
                }, {
                    kind: "onyx.Picker",
                    maxHeight: "400px",
                    components: [{
                        name: "icon_line_1",
                        style: "background-image:url(images/icon_line_1.png);background-repeat:no-repeat;background-position:center center;height:15px;cursor:pointer;",
                        ontap: "setLineWidth1"
                    }, {
                        name: "icon_line_2",
                        style: "background-image:url(images/icon_line_2.png);background-repeat:no-repeat;background-position:center center;height:15px;cursor:pointer;",
                        ontap: "setLineWidth2"
                    }, {
                        name: "icon_line_3",
                        style: "background-image:url(images/icon_line_3.png);background-repeat:no-repeat;background-position:center center;height:15px;cursor:pointer;",
                        ontap: "setLineWidth3"
                    }, {
                        name: "icon_line_6",
                        style: "background-image:url(images/icon_line_6.png);background-repeat:no-repeat;background-position:center center;height:15px;cursor:pointer;",
                        ontap: "setLineWidth6"
                    }, {
                        name: "icon_line_8",
                        style: "background-image:url(images/icon_line_8.png);background-repeat:no-repeat;background-position:center center;height:15px;cursor:pointer;",
                        ontap: "setLineWidth8"
                    }, {
                        name: "icon_line_10",
                        style: "background-image:url(images/icon_line_10.png);background-repeat:no-repeat;background-position:center center;height:15px;cursor:pointer;",
                        ontap: "setLineWidth10"
                    }]
                }]
            }, {
                kind: "onyx.Tooltip",
                content: $L("Line Width"),
                classes: "above",
                style: "margin-top: 15px;"
            }]
        }, {
            kind: "onyx.TooltipDecorator",
            style: "float: right",
            components: [{
                kind: "onyx.PickerDecorator",
                style: "border:1px solid #FFF;margin:5px 0 20px;",
                name: "colorPickerWrapper",
                components: [{
                    name: "colorPicker",
                    kind: "onyx.Button",
                    style: "background-color: black;height:30px;cursor:pointer;",
                }, {
                    kind: "onyx.Picker",
                    name: "colorItemSelectedHolder",
                    onChange: "colorItemSelected",
                    maxHeight: "400px",
                    components: [{
                        name: "red",
                        style: "background-color: red;height:6px;width:30px;cursor:pointer;",
                    }, {
                        name: "orange",
                        style: "background-color: orange;height:6px;width:30px;cursor:pointer;",
                    }, {
                        name: "yellow",
                        style: "background-color: yellow;height:6px;width:30px;cursor:pointer;",
                    }, {
                        name: "blue",
                        style: "background-color: blue;height:6px;width:30px;cursor:pointer;",
                    }, {
                        name: "cyan",
                        style: "background-color: cyan;height:6px;width:30px;cursor:pointer;",
                    }, {
                        name: "green",
                        style: "background-color: green;height:6px;width:30px;cursor:pointer;",
                    }, {
                        name: "black",
                        style: "background-color: black;height:6px;width:30px;cursor:pointer;",
                    }, {
                        name: "purple",
                        style: "background-color: purple;height:6px;width:30px;cursor:pointer;",
                    }]
                },],
            }, {
                kind: "onyx.Tooltip",
                content: $L("Color"),
                classes: "above",
                style: "margin-top: 15px;"
            }]
        }, {
            name: "loadingPopup",
            kind: "onyx.Popup",
            centered: true,
            autoDismiss: false,
            modal: true,
            floating: true,
            components: [{
                kind: "onyx.Spinner"
            },],
        }
        ],
    }],
    rendered: function () {
        this.inherited(arguments);
        /*if (this.isMobile() || this.isGuest()) {
            this.$.bottomToolbar.hide();
            this.$.uploadAndNewPageBtn.hide();
            this.$.gotoPreviousPage.hide();
            this.$.gotoNextPage.hide();
            this.$.middleFittableRows.parent.resize();
        }*/
        this.$.gotoPreviousPage.hide();
        this.$.gotoNextPage.hide();
        if (this.isMobile() || this.isGuest()) {
            this.$.uploadAndNewPageBtn.hide();
            //        	this.$.previewPages.hide();
            //        	this.$.zoomInButton.hide();
            //        	this.$.zoomOutButton.hide();
            this.$.colorPickerWrapper.hide();
            this.$.lineWidthPicker.hide();
            this.$.pencilButton.hide();
            this.$.highlighter.hide();
            this.$.addTextButton.hide();
            this.$.penPicker.hide();
            this.$.laserPen.hide();
            this.$.selectButton.hide();
            this.$.redoButton.hide();
            this.$.undoButton.hide();
            this.$.eraser.hide();
            this.$.clear.hide();
            this.$.deletePage.hide();
            this.closePen();
            this.$.middleFittableRows.parent.resize();

            //        	this.$.bottomToolbar.hide();
            //        	this.$.gotoPreviousPage.hide();
            //        	this.$.gotoNextPage.hide();
            //			this.closePen();
            //			this.$.middleFittableRows.parent.resize();
        }
        if (this.isMobile()) { // 绑定手势
            var _this = this;
            var svg = document.getElementsByTagName('svg')[0];
            var hamSvg = new Hammer(svg);
            // pinch
            hamSvg.get('pinch').set({
                enable: true
            });
            hamSvg.on("pinchend", function (e) {
                // 缩放
                if (e.additionalEvent == 'pinchin') {
                    _this.zoomOutPane();
                } else if (e.additionalEvent == 'pinchout') {
                    _this.zoomInPane();
                }
            });
            // swipe
            hamSvg.get('swipe').set({
                direction: Hammer.DIRECTION_ALL
            });
            hamSvg.on('swipeleft', function (e) {
                if (_this.whiteboard.zoomRatio > _this.whiteboard.zoomRatioCustom) {
                    return;
                }
                // 隐藏预览窗口
                _this.$.previewPagesPopup.hide();
                // 向后翻页
                _this.gotoNextPage();
            });
            hamSvg.on('swiperight', function (e) {
                if (_this.whiteboard.zoomRatio > _this.whiteboard.zoomRatioCustom) {
                    return;
                }
                // 隐藏预览窗口
                _this.$.previewPagesPopup.hide();
                // 向前翻页
                _this.gotoPreviousPage();
            });
			/*hamSvg.on('swipedown', function(e) {
				if (_this.whiteboard.zoomRatio > _this.whiteboard.zoomRatioCustom) {
					return;
				}
				// 预览窗口
				// $("#app_previewPages").click();
				_this.triggerClick($("#app_previewPages")[0]);
			});*/
        }
    },

    zoomInPane: function (inSender, inEvent) {
        this.closeEraser();
        this.whiteboard.zoomIn();
    },

    zoomOutPane: function (inSender, inEvent) {
        this.closeEraser();
        this.whiteboard.zoomOut();
    },

    undoPath: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        //this.whiteboard.undo();
        this.whiteboard.undoWithDrawing();
    },

    redoPath: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        //this.whiteboard.redo();
        this.whiteboard.redoWithDrawing();
    },

    cropContent: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.whiteboard.cropContent();
    },

    /*uploadFileNew: function(inSender, inEvent) {
        // cleanup the divs left over
        $(".ajax-file-upload-container").remove();

        var x = $('#file-upload-root');
        if (!x || x.length === 0) {
            $(document.body).append("<span id='file-upload-root' style='z-index:-1000;position:relative;'></span>");
        }
//      var u = 'https://' + this.appIpAddress + ':' + this.appPort + '/upload';
        var u = ewb_file_server_path + "/ewb/upload";
        var self = this;
        console.log(this.vid);
        $("#file-upload-root").uploadFile({
            url: u,
            multiple: false,
            dragDrop: false,
            maxFileCount: 1,
//          fileName: "myfile",
            fileName: "file",
            showFileCounter: false,
            formData: {
  				roomKey: ewb_roomKey
//				room: this.whiteboard.room,
//              vid: this.vid,
//              uid: this.whiteboard.uid
            },
            onSuccess: function(files, data, xhr, pd) {
                setTimeout(function() {
                    $(".ajax-file-upload-container").empty();
                }, 3000);

//                if (data == 'succ') {
//                    noty({
//                        text: $L("File uploaded"),
//                        type: "success",
//                        theme: "relax",
//                        timeout: 6000
//                    });
//                } else {
//                    noty({
//                        text: $L("File upload error, please try again"),
//                        type: "error",
//                        theme: "relax"
//                    });
//                }
                if (data.code == 200) {
					self.whiteboard.connection.blinkEwb.uploadFile(data.data);
				} else {
					noty({
                      text: $L("File upload error, please try again"),
                      type: "error",
                      theme: "relax"
                  });
				}
            },
            afterUploadAll: function(obj) {
                noty({
                    text: $L("File uploaded"),
                    type: "success",
                    theme: "relax",
                    timeout: 6000
                });
            },
            onError: function(files, status, errMsg, pd) {
                noty({
                    text: $L("File upload error, please try again"),
                    type: "error",
                    theme: "relax"
                });
                console.log("Upload error with msg: " + errMsg + ", status: " + status);

                $(".ajax-file-upload-container").empty();
            },
            onCancel: function(files, pd) {
                noty({
                    text: $L("File upload has been cancelled"),
                    type: "success",
                    theme: "relax",
                    timeout: 6000
                });
            }
        });
        setTimeout(function() {
            $("input[id^='ajax-upload-id']").trigger("click");
        }, 1000);
    },*/
    uploadFileNew: function () {
        this.whiteboard.connection.blinkEwb.upload();
    },

    drawRectangle: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closeHighlighter();
        this.cancelEditingText();
        this.closePen();
        this.hideLaser();
        this.whiteboard.drawRectangle();
        this.highlightPenPicker();
    },

    drawSquare: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closeHighlighter();
        this.cancelEditingText();
        this.closePen();
        this.hideLaser();
        this.whiteboard.drawSquare();
        this.highlightPenPicker();
    },

    drawLine: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closeHighlighter();
        this.cancelEditingText();
        this.closePen();
        this.hideLaser();
        this.whiteboard.drawLine();
        this.highlightPenPicker();
    },

    drawTriangle: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closeHighlighter();
        this.cancelEditingText();
        this.closePen();
        this.hideLaser();
        this.whiteboard.drawTriangle();
        this.highlightPenPicker();
    },

    drawArrow: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closeHighlighter();
        this.cancelEditingText();
        this.closePen();
        this.hideLaser();
        this.whiteboard.drawArrow();
        this.highlightPenPicker();
    },

    drawEllipse: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closeHighlighter();
        this.cancelEditingText();
        this.closePen();
        this.hideLaser();
        this.whiteboard.drawEllipse();
        this.highlightPenPicker();
    },

    drawCircle: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closeHighlighter();
        this.cancelEditingText();
        this.closePen();
        this.hideLaser();
        this.whiteboard.drawCircle();
        this.highlightPenPicker();
    },

    appclicked: function (inSender, inEvent) {
        if (this.isGuest()) {
            return;
        }
        var canvasBounds = this.$.canvasContainer.getBounds();
        var x = inEvent.pageX - canvasBounds.left;
        var y = inEvent.pageY - canvasBounds.top;

        this.whiteboard.appclicked({
            x: x,
            y: y,
            laserOn: this.laser.on,
            event: inEvent,
            canvas: canvasBounds
        });

        // Enable eraser if there is at least one elements been selected.
        if (this.whiteboard.hasSelectElement()) {
            this.highlightEraser();
        }

        //this.cancelEditingText();
    },

    touchstart: function (inSender, inEvent) {
        document.ondragstart = function () {
            return false;
        }
        if (this.isGuest()) {
            return;
        }

        var scrollTop = this.$.scroller.scrollTop;
        var scrollLeft = this.$.scroller.scrollLeft;
        var canvasBounds = this.$.canvasContainer.getBounds();
        this.curves.oldx = inEvent.pageX - canvasBounds.left + scrollLeft;
        this.curves.oldy = inEvent.pageY - canvasBounds.top + scrollTop;
        this.whiteboard.startPath(this.curves.oldx, this.curves.oldy, this.curves.color, this.curves.width, true);
    },

    touchmove: function (inSender, inEvent) {
        if (this.isGuest()) {
            return;
        }
        if (this.curves.oldx != -1 && this.curves.oldy != -1) {
            var scrollTop = this.$.scroller.scrollTop;
            var scrollLeft = this.$.scroller.scrollLeft;
            var canvasBounds = this.$.canvasContainer.getBounds();
            x = inEvent.pageX - canvasBounds.left + scrollLeft;
            y = inEvent.pageY - canvasBounds.top + scrollTop;
            this.whiteboard.continuePath(this.curves.oldx, this.curves.oldy, x, y, this.curves.color, this.curves.width, undefined, true);
            this.curves.oldx = x;
            this.curves.oldy = y;
        }
    },

    touchend: function (inSender, inEvent) {

        if (this.isGuest()) {
            return;
        }
        if (this.curves.oldx != -1 && this.curves.oldy != -1) {
            var scrollTop = this.$.scroller.scrollTop;
            var scrollLeft = this.$.scroller.scrollLeft;
            var canvasBounds = this.$.canvasContainer.getBounds();
            x = inEvent.pageX - canvasBounds.left + scrollLeft;
            y = inEvent.pageY - canvasBounds.top + scrollTop;
            this.whiteboard.endPath(this.curves.oldx, this.curves.oldy, x, y, this.curves.color, this.curves.width, undefined, true);
            this.curves.oldx = -1;
            this.curves.oldy = -1;
        }
    },

    _isWhiteColor: function (color) {
        if (!color) {
            return false;
        }
        return color.match(/^(?:white|#fff(?:fff)?|rgba?\(\s*255\s*,\s*255\s*,\s*255\s*(?:,\s*1\s*)?\))$/i);
    },

    closeEraser: function () {
        if (!this.eraser.on) return;

        this.eraser.on = false;
        this.$.eraser.applyStyle("background-position", "-80px -360px");
    },

    selectEraser: function (inSender, inEvent) {
        this.whiteboard.removeSelected(true);
        this.cancelEditingText();
    },

    selectLaserPen: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.cancelEditingText();
        this.laser.on ? this.hideLaser() : this.showLaser();
    },

    showLaser: function () {
        this.laser.on = true;
        this.laser.previousDrawingItem = this.whiteboard.getDrawingItem();
        this.whiteboard.setDrawingItem("");
        this.whiteboard.drawLaser();
        this.$.laserPen.applyStyle("background-position", "-80px -360px");
    },

    hideLaser: function () {
        this.laser.on = false;
        this.whiteboard.setDrawingItem(this.laser.previousDrawingItem);
        this.whiteboard.removeLaser();
        this.$.laserPen.applyStyle("background-position", "0 -360px");
    },

    openHighlighter: function () {
        if (this.highlighter.on) {
            return;
        }
        this.highlighter.on = true;
        this.$.highlighter.applyStyle("background-position", "-80px -239px");
        this.whiteboard.selectHighlighter();
    },

    closeHighlighter: function () {
        if (!this.highlighter.on) {
            return;
        }

        this.highlighter.on = false;
        this.whiteboard.setDrawingItem(this.highlighter.previousDrawingItem);
        this.$.highlighter.applyStyle("background-position", "0px -239px");
    },

    selectHighlighter: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closePen();
        this.cancelEditingText();
        this.dimPenPicker();
        //this.highlighter.on ? this.closeHighlighter() : this.openHighlighter();
        this.hideLaser();
        this.openHighlighter();
    },

    openPen: function () {
        if (this.pen.on) return;

        this.pen.on = true;
        this.$.pencilButton.applyStyle("background-position", "-80px -199px");
        this.pen.previousDrawingItem = this.whiteboard.getDrawingItem();
        this.whiteboard.selectPen();
    },

    closePen: function () {
        if (!this.pen.on) return;

        this.pen.on = false;
        this.$.pencilButton.applyStyle("background-position", "0px -199px");
        this.whiteboard.setDrawingItem(this.pen.previousDrawingItem);
    },

    selectPen: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.closeHighlighter();
        this.cancelEditingText();
        this.dimPenPicker();
        this.hideLaser();
        //this.pen.on ? this.closePen() : this.openPen();
        this.openPen();
    },

    addText: function (inSender, inEvent) {
        this.textEditing.previousDrawingItem = this.whiteboard.getDrawingItem();
        this.closeEraser();
        this.cancelSelect();
        this.closePen();
        this.closeHighlighter();
        this.dimPenPicker();
        this.hideLaser();

        //this.textEditing.on ? this.cancelEditingText() : this.startEditingText();
        this.startEditingText();
    },

    startEditingText: function () {
        if (!this.textEditing) return;

        this.textEditing.on = true;
        this.$.addTextButton.applyStyle("background-position", "-80px -279px");
        //this.textEditing.previousDrawingItem = this.whiteboard.getDrawingItem();
        this.whiteboard.addText();
    },

    cancelEditingText: function () {
        if (!this.textEditing.on) return;

        this.textEditing.on = false;
        this.$.addTextButton.applyStyle("background-position", "0 -279px");
        this.whiteboard.stopAddingText(this.textEditing.previousDrawingItem);
        //this.restoreSelectedButtonState(this.textEditing.previousDrawingItem);
    },

    restoreSelectedButtonState: function (drawingItem) {
        switch (drawingItem) {
            case 'pen':
                this.selectPen();
                break;
            case 'highlighter':
                this.selectHighlighter();
                break;
            case 'circle':
                this.drawCircle();
                break;
            case 'triangle':
                this.drawTriangle();
                break;
            case 'rectangle':
                this.drawRectangle();
                break;
            case 'ellipse':
                this.drawEllipse();
                break;
            case 'arrow':
                this.drawArrow();
                break;
            case 'line':
                this.drawLine();
                break;
            case 'square':
                this.drawSquare();
                break;
        }
    },

    setLineWidth1: function (inSender, inEvent) {
        this.setLineWidthN(1);
    },

    setLineWidth2: function (inSender, inEvent) {
        this.setLineWidthN(2);
    },

    setLineWidth3: function (inSender, inEvent) {
        this.setLineWidthN(3);
    },

    setLineWidth6: function (inSender, inEvent) {
        this.setLineWidthN(6);
    },

    setLineWidth8: function (inSender, inEvent) {
        this.setLineWidthN(8);
    },

    setLineWidth10: function (inSender, inEvent) {
        this.setLineWidthN(10);
    },

    setLineWidthN: function (width) {
        this.closeEraser();
        this.cancelSelect();
        this.curves.width = String(width) + 'px';
        this.$.lineWidthPicker.applyStyle("background", "url(images/icon_line_" + width + "_white.png),url(images/icon_more.png)");
        this.$.lineWidthPicker.applyStyle("background-repeat", "no-repeat no-repeat");
        this.$.lineWidthPicker.applyStyle("background-position", "left center, right center");
        this.$.lineWidthPicker.applyStyle("background-color", "transparent");
        this.$.lineWidthPicker.applyStyle("background-size", "25px,10px");
        this.$.lineWidthPicker.applyStyle("margin", "5px 0 20px");
    },

    optionSelected: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        var name = inEvent.originator.name;
        switch (name) {
            case "clear":
                this.selectClear(inSender, inEvent);
                break;
            case "createJoinRoom":
                this.selectCreateJoinRoom(inSender, inEvent);
                break;
            case "getVideo":
                this.selectGetVideo(inSender, inEvent);
                break;
            case "exportToSvg":
                this.selectExportToSvg(inSender, inEvent);
                break;
        }
    },

    colorItemSelected: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        var color = inEvent.selected.name;
        this.$.colorPicker.applyStyle("background-color", color);
        this.curves.color = color;
    },

    clearButtonMouseOver: function (inSender, inEvent) {
        this.$.clear.applyStyle("background-position", "-80px -559px");
    },

    clearButtonMouseOut: function (inSender, inEvent) {
        this.$.clear.applyStyle("background-position", "0 -559px");
    },

    highlightEraser: function () {
        this.$.eraser.applyStyle("background-position", "-80px -519px");
    },

    eraserMouseOver: function (inSender, inEvent) {
        this.highlightEraser();
    },

    eraserMouseOut: function (inSender, inEvent) {
        if (!this.eraser.on) {
            this.$.eraser.applyStyle("background-position", "0 -519px");
        }
    },
    deletePage: function (inSender, inEvent) {
        var totalPagesNum = this.whiteboard.getNumPages(),
            self = this;
        if (totalPagesNum <= 1) {
            $.alert($L("The last page cannot be deleted."));
            return;
        }
        var yes = $.confirm({
            title: $L("Confirm"),
            content: $L("Do you want to delete this page?"),
            confirm: function () {
                self.whiteboard.deletePage();
            },
            cancel: function () {
                // do nothing.
            }
        });
    },
    deleteButtonMouseOver: function (inSender, inEvent) {
        this.$.deletePage.applyStyle("background-position", "-80px -599px");
    },

    deleteButtonMouseOut: function (inSender, inEvent) {
        this.$.deletePage.applyStyle("background-position", "0 -599px");
    },

    undoButtonMouseOver: function (inSender, inEvent) {
        this.$.undoButton.applyStyle("background-position", "-80px -479px");
    },

    undoButtonMouseOut: function (inSender, inEvent) {
        this.$.undoButton.applyStyle("background-position", "0 -479px");
    },

    redoButtonMouseOver: function (inSender, inEvent) {
        this.$.redoButton.applyStyle("background-position", "-80px -439px")
    },

    redoButtonMouseOut: function (inSender, inEvent) {
        this.$.redoButton.applyStyle("background-position", "0 -439px");
    },

    selectButtonMouseOver: function (inSender, inEvent) {
        this.$.selectButton.applyStyle("background-position", "-80px -399px");
    },

    selectButtonMouseOut: function (inSender, inEvent) {
        if (!this.selecting.on) {
            this.$.selectButton.applyStyle("background-position", "0 -399px");
        }
    },

    laserPenMouseOver: function (inSender, inEvent) {
        this.$.laserPen.applyStyle("background-position", "-80px -360px");
    },

    laserPenMouseOut: function (inSender, inEvent) {
        if (!this.laser.on) {
            this.$.laserPen.applyStyle("background-position", "0 -360px");
        }
    },

    highlightPenPicker: function () {
        this.$.penPicker.applyStyle("background", "url(images/wb.svg)");
        this.$.penPicker.applyStyle("background-repeat", "no-repeat");
        this.$.penPicker.applyStyle("background-position", "-80px -319px");
        this.$.penPicker.applyStyle("background-color", "transparent");
        //        this.$.penPicker.applyStyle("background-size", "25px,10px");
    },

    penPickerMouseOver: function (inSender, inEvent) {
        this.highlightPenPicker()
    },

    dimPenPicker: function () {
        this.$.penPicker.applyStyle("background", "url(images/wb.svg)");
        this.$.penPicker.applyStyle("background-repeat", "no-repeat");
        this.$.penPicker.applyStyle("background-position", "0 -319px");
        this.$.penPicker.applyStyle("background-color", "transparent");
        //        this.$.penPicker.applyStyle("background-size", "25px,10px");
    },

    penPickerMouseOut: function (inSender, inEvent) {
        var allShapes = ['circle', 'triangle', 'rectangle', 'ellipse', 'arrow', 'line', 'square'];
        if (allShapes.indexOf(this.whiteboard.getDrawingItem()) >= 0) {
            // keep it highlighted if current drawing item is one of the shapes.
            return;
        }
        this.dimPenPicker();
    },

    addTextButtonMouseOver: function (inSender, inEvent) {
        this.$.addTextButton.applyStyle("background-position", "-80px -279px");
    },

    addTextButtonMouseOut: function (inSender, inEvent) {
        if (!this.textEditing.on) {
            this.$.addTextButton.applyStyle("background-position", "0 -279px");
        }
    },

    highlighterMouseOver: function (inSender, inEvent) {
        this.$.highlighter.applyStyle("background-position", "-80px -239px");
    },

    highlighterMouseOut: function (inSender, inEvent) {
        if (!this.highlighter.on) {
            this.$.highlighter.applyStyle("background-position", "0 -239px");
        }
    },

    pencilMouseOver: function (inSender, inEvent) {
        this.$.pencilButton.applyStyle("background-position", "-80px -199px");
    },

    pencilMouseOut: function (inSender, inEvent) {
        if (!this.pen.on) {
            this.$.pencilButton.applyStyle("background-position", "0 -199px");
        }
    },

    logoutButtonMouseOver: function (inSender, inEvent) {
        this.$.logoutButton.applyStyle("background-image", "url(images/btn_quit.png)");
    },

    logoutButtonMouseOut: function (inSender, inEvent) {
        this.$.logoutButton.applyStyle("background-image", "url(images/btn_quit_gray.png)");
    },

    optionsPickerMouseOver: function (inSender, inEvent) {
        this.$.optionsMenu.applyStyle("background-position", "-80px 0");
    },

    optionsPickerMouseOut: function (inSender, inEvent) {
        this.$.optionsMenu.applyStyle("background-position", "0 0");
    },

    zoomOutMouseOver: function (inSender, inEvent) {
        this.$.zoomOutButton.applyStyle("background-position", "-80px -80px");
    },

    zoomOutMouseOut: function (inSender, inEvent) {
        this.$.zoomOutButton.applyStyle("background-position", "0 -80px");
    },

    zoomInMouseOver: function (inSender, inEvent) {
        this.$.zoomInButton.applyStyle("background-position", "-80px -120px");
    },

    zoomInMouseOut: function (inSender, inEvent) {
        this.$.zoomInButton.applyStyle("background-position", "0 -120px");
    },

    previewMouseOver: function (inSender, inEvent) {
        this.$.previewPages.applyStyle("background-position", "-80px -40px");
    },

    previewMouseOut: function (inSender, inEvent) {
        this.$.previewPages.applyStyle("background-position", "0 -40px");
    },
    selectPreviewPages: function (inSender, inEvent, flag) {
        var totalPages = this.whiteboard.getNumPages(),
            index;
        // Minus left and right arrows
        for (index = 0; index < this.pagePreviewContainer.length; index += 1) {
            this.pagePreviewContainer[index].destroy();
        }
        this.pagePreviewContainer = [];

        var appWidth = $('#app').width() - 80,
            itemNum = Math.floor(appWidth / 148);
        this.perviewPagesNum = itemNum;

        if (!flag) {
            this.pagePreviewNum = (Math.ceil(this.whiteboard.getCurrentPage() / itemNum) - 1) * itemNum;
        }

        for (index = 0; index < Math.min(itemNum, totalPages - this.pagePreviewNum); index += 1) {
            var page = this.pagePreviewNum + index + 1;
            var port = Number(this.appPort) + 10000;
            //var url = "http://" + this.appIpAddress + ":" + port + "/files/" + this.vid + "_" + this.room + "/" + this.whiteboard.getPageIdByPage(page) + "_thumbnail.png?version=" + $.now();
            var pageFile = this.whiteboard.getPageFileByPage(page);
            var url = "";
            if (pageFile.fileUrl != null && pageFile.fileUrl != "") {
                url = pageFile.fileUrl;
            } else if (pageFile.thumbnail != null
                && pageFile.thumbnail != "") {
                url = pageFile.thumbnail;
            }
            var comp = this.createComponent({
                container: this.$.previewPagesPopup,
                style: "border:4px solid white; display:inline-block;float:left;width:120px;height:116px;;margin:10px;color:#000;background:url(" + url + ") center center no-repeat #FFF;background-size:contain;cursor:pointer;",
                content: "<div style='text-align:center;height: 100%;font-size:3em;'> " + page + " </div>",
                allowHtml: true,
                ontap: "gotoPage",
                // page index starts with 1
                index: index + 1,
                pageNum: page,
            });
            if (this.whiteboard.getCurrentPage() === page) {
                comp.applyStyle("border", "4px solid rgb(17, 158, 235)");
            }
            this.pagePreviewContainer.push(comp);
        }
        if (this.isMobile()) {
            if (this.hamPpp != null) { // render前移除手势，因为render后再生成手势会造成手势堆叠
                this.hamPpp.destroy();
                this.hamPpp = null;
            }
        }
        this.$.previewPagesPopup.render();
        // }
        var p = this.$[inEvent.originator.popup];
        if (p) {
            p.show();
        }
        if (this.isMobile()) {
            // 绑定手势
            var _this = this;
            var ppp = $("#app_previewPagesPopup")[0];
            this.hamPpp = new Hammer(ppp);
            // swipe
            this.hamPpp.on("swipeleft", function (e) {
                // 向后翻页
                // $("#app_selectNext").click();
                _this.triggerClick($("#app_selectNext")[0]);
            });
            this.hamPpp.on("swiperight", function (e) {
                // 向前翻页
                // $("#app_selectPrevious").click();
                _this.triggerClick($("#app_selectPrevious")[0]);
            });
        }
    },

    selectClear: function (inSender, inEvent) {
        var self = this;
        self.cancelSelect();
        var yes = $.confirm({
            title: $L("Confirm"),
            content: $L("Do you want to clear this page?"),
            confirm: function () {
                self.whiteboard.clear(true);
            },
            cancel: function () {
                // do nothing.
            }
        });
    },

    selectCreateJoinRoom: function (inSender, inEvent) {
        var p = this.$[inEvent.originator.popup];
        if (p) {
            p.show();
        }
    },

    selectGetVideo: function (inSender, inEvent) {
        this.whiteboard.makeVideo();
    },

    selectExportToSvg: function (inSender, inEvent) {
        var svg = document.getElementsByTagName('svg')[0];
        var svg_xml = (new XMLSerializer).serializeToString(svg);
        window.open("data:image/svg+xml;base64," + btoa(svg_xml), "Export");
    },

    selectNext: function (inSender, inEvent) {
        if (this.pagePreviewNum + this.perviewPagesNum >= this.whiteboard.getNumPages()) {
            return;
        }
        this.closeEraser();
        this.cancelSelect();
        this.pagePreviewNum = this.pagePreviewNum + this.perviewPagesNum;
        this.selectPreviewPages(inSender, inEvent, 1);
    },

    gotoNextPageMouseOver: function (inSender, inEvent) {
        this.$.gotoNextPage.applyStyle("background", "url(images/btn_right_gray.png) center center no-repeat");
        this.$.gotoNextPage.applyStyle("background-color", "#FFF");
    },

    gotoNextPageMouseOut: function (inSender, inEvent) {
        this.$.gotoNextPage.applyStyle("background", "url(images/btn_right.png) center center no-repeat");
        this.$.gotoNextPage.applyStyle("background-color", "#808080");
    },

    gotoPreviousPageMouseOver: function (inSender, inEvent) {
        this.$.gotoPreviousPage.applyStyle("background", "url(images/btn_left_gray.png) center center no-repeat");
        this.$.gotoPreviousPage.applyStyle("background-color", "#FFF");
    },

    gotoPreviousPageMouseOut: function (inSender, inEvent) {
        this.$.gotoPreviousPage.applyStyle("background", "url(images/btn_left.png) center center no-repeat");
        this.$.gotoPreviousPage.applyStyle("background-color", "#808080");
    },

    gotoNextPage: function (inSender, inEvent) {
        this.$.loadingPopup.show();
        var result = this.whiteboard.nextPage();
        this.updatePageInfo();
        if (!result) this.$.loadingPopup.hide();
    },

    gotoPreviousPage: function (inSender, inEvent) {
        this.$.loadingPopup.show();
        var result = this.whiteboard.prevPage();
        this.updatePageInfo();
        if (!result) this.$.loadingPopup.hide();
    },

    selectPrevious: function (inSender, inEvent) {
        if (this.pagePreviewNum == 0) {
            return;
        }
        this.cancelSelect();
        this.closeEraser();
        this.pagePreviewNum = this.pagePreviewNum - this.perviewPagesNum;
        this.selectPreviewPages(inSender, inEvent, 1);
    },

    selectCreateJoinRoomPopupCancel: function (inSender, inEvent) {
        this.$.createJoinRoomPopup.hide();
    },

    selectCreateJoinRoomPopupOk: function (inSender, inEvent) {
        var value = this.$.roomName.getValue();
        if (value) {
            this.whiteboard.joinRoom(value);
        }
        this.$.createJoinRoomPopup.hide();
    },

    inIframe: function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    },

    logout: function () {
        if (this.inIframe()) {
            // Remove DOM elements inside parent container
            $(window.document).find("body").empty();
        } else {
            // We are not in a iframe
            window.location = "./logout.html";
        }
    },

    selectNewPage: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.whiteboard.newPage();
        this.updatePageInfo();
    },

    updatePreviewPageBorder: function () {
        var subComponents = this.$.previewPagesPopup.children,
            index, length, pageNum;

        // page child including right arrow and left arrow
        subComponents = subComponents.slice(2, subComponents.length);

        for (index = 0, length = subComponents.length; index < length; index += 1) {
            pageNum = subComponents[index].pageNum;
            if (pageNum === this.whiteboard.getCurrentPage()) {
                subComponents[index].applyStyle("border", "4px solid rgb(17, 158, 235)");
            } else {
                subComponents[index].applyStyle("border", "4px solid white");
            }
        }
    },

    updatePageInfo: function () {
        // restore button status
        //      this.closeEraser();
        //      this.cancelSelect();

        // update previous and next button style
        var totalPagesNum = this.whiteboard.getNumPages(),
            currentPage = this.whiteboard.getCurrentPage();

        if (currentPage > totalPagesNum) {
            // current page cannot larger than number of total pages
            currentPage = totalPagesNum;
        }

        if (currentPage === 1) {
            this.$.gotoPreviousPage.applyStyle("cursor", "default");
            this.$.gotoPreviousPage.applyStyle("opacity", "0.3");
        } else {
            this.$.gotoPreviousPage.applyStyle("cursor", "pointer");
            this.$.gotoPreviousPage.applyStyle("opacity", "1");
        }

        if (currentPage === totalPagesNum) {
            this.$.gotoNextPage.applyStyle("cursor", "default");
            this.$.gotoNextPage.applyStyle("opacity", "0.3");
        } else {
            this.$.gotoNextPage.applyStyle("cursor", "pointer");
            this.$.gotoNextPage.applyStyle("opacity", "1");
        }

        if (currentPage > 1 && currentPage < totalPagesNum) {
            this.$.gotoPreviousPage.applyStyle("cursor", "pointer");
            this.$.gotoPreviousPage.applyStyle("opacity", "1");

            this.$.gotoNextPage.applyStyle("cursor", "pointer");
            this.$.gotoNextPage.applyStyle("opacity", "1");
        }

    },

    gotoPage: function (inSender, inEvent) {
        this.closeEraser();
        this.cancelSelect();
        this.$.loadingPopup.show();
        var result = this.whiteboard.gotoPage(this.pagePreviewNum + inSender.index);
        if (!result) this.$.loadingPopup.hide();
        this.updatePageInfo();
        this.updatePreviewPageBorder();
    },

    doSelect: function (inSender, inEvent) {
        this.hideLaser();
        console.log("doSelect");
        this.closeEraser();
        this.closePen();
        this.closeHighlighter();
        this.dimPenPicker();
        this.cancelEditingText();
        //this.selecting.on ? this.cancelSelect() : this.openSelect();
        this.openSelect();
    },

    openSelect: function () {
        if (this.selecting.on) return;
        this.selecting.on = true;
        this.$.selectButton.applyStyle("background-position", "-80px -399px");
        this.whiteboard.doSelect();
    },

    cancelSelect: function () {
        //if (!this.selecting.on) return;

        this.selecting.on = false;
        this.$.selectButton.applyStyle("background-position", "0 -399px");
        this.whiteboard.cancelSelect();
        this.whiteboard.stopDoingSelect();
    },

    isGuest: function () {
        return this.role === 'guest';
    },

    isMobile: function () {
        if (ewb_clientType == 'android' || ewb_clientType == 'ios') {
            return true;
        }
        if (ewb_clientType == 'web' || ewb_clientType == 'pc' || ewb_clientType == 'mac') {
            return false;
        }
        var isMobile = false; //initiate as false
        // device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|G750-T01|g750-t01|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
            isMobile = true;
        return isMobile;
    },

    triggerClick: function (element) { // 解决IOS模拟click事件无效
        //		if (element.click) {
        //			element.click();
        //		} else if (document.createEvent) {
        var eventObj = document.createEvent('MouseEvents');
        eventObj.initEvent('click', true, true);
        element.dispatchEvent(eventObj);
        //		}
    }
});