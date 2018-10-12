/**
 * 构造函数
 * 
 */
var BlinkEwb = function(connection) {
	this.connection = connection; // 上层对象
	this.serverPath = ewb_server_path;
	this.fileServerPath = ewb_file_server_path;
	this.loadInterval = ewb_load_interval;
	this.roomKey = ewb_roomKey;
	this.token = ewb_token;
	this.userId = ewb_userId;
	this.pages = null;
	this.pageIds = null;
	this.pageFiles = null;
	this.page = null;
	this.printId = 0;
	this.laserPrintId = 0;
	this.init();
	return this;
}
/**
 * 初始化
 * 
 */
BlinkEwb.prototype.init = function() {
	var blinkEwb = this;
	this.gotoEntryPage();
}
/**
 * 发送到后台
 * 
 */
BlinkEwb.prototype.send = function(message) {
	var messageObj = JSON.parse(message);
	var evt = messageObj.event;
	if (evt == "init") { // 初始化
		if (messageObj.data.page != null && messageObj.data.page != '') {
			var pageIndex = messageObj.data.page - 1;
			this.gotoPage(pageIndex);
		}
	} else if (evt == "laser-draw") { // 激光笔
		// var laserPrint = "[" + JSON.stringify(messageObj.data) + "]";
		var laserPrint = JSON.stringify(messageObj.data);
		this.createLaserPrint(laserPrint);
	} else if (evt == "laser-remove") { // 删除激光笔
		this.cleanPageLaserPrints();
	} else if (evt == "draw-click") { // 笔画
		var print = JSON.stringify(messageObj.data.singlePath);
		// this.createPrint(print);
		var thumbnail = messageObj.data.thumbnail;
		this.createPrint(print, thumbnail);
	} else if (evt == "get-image") { // 背景图片
		this.renderImage();
	} else if (evt == "new-page") { // 新页面
		this.createPage();
	} else if (evt == "clear") { // 清除笔画
		this.cleanPagePrints();
	} else if (evt == "delete-page") { // 删除页面
		this.deletePage();
	}
}
/**
 * 跳转到入口页
 * 
 */
BlinkEwb.prototype.gotoEntryPage = function() {
	this.remoteClear(false);
	// 停止刷新
	this.exitLoadPage();
	this.getEntryPage();
}
/**
 * 跳转页
 * 
 */
BlinkEwb.prototype.gotoPage = function(pageIndex) {
	if (pageIndex < 0 || pageIndex > this.pageIds.length - 1) {
		this.pageNotFound();
	} else {
		// 停止刷新
		this.exitLoadPage();
		this.getPage(this.pageIds[pageIndex]);
	}
}
/**
 * page已经被删除
 * 
 */
BlinkEwb.prototype.pageNotFound = function() {
	// 停止刷新
	this.exitLoadPage();
	var blinkEwb = this;
	$
			.alert({
				title : $L("Confirm"),
				content : $L("This page has been deleted, click OK to go to last page"),
				confirm : function() {
					// 跳转到入口页
					blinkEwb.gotoEntryPage();
				}
			});
}
/**
 * 渲染背景图片
 * 
 */
BlinkEwb.prototype.renderImage = function() {
	var bgUrl = this.page.fileUrl;
	if (bgUrl != null && bgUrl != '') {
		// var image = JSON.parse('{"height":100,"width":100,"room":"'
		// + this.roomKey + '","page_id":' + this.page.pageId + ',"url":"'
		// + bgUrl + '","urls":[]}');
		var image = {
			"height" : 100,
			"width" : 100,
			"room" : this.roomKey,
			"page_id" : this.page.pageId,
			"url" : bgUrl,
			"urls" : new Array()
		}
		this.remoteImage(image);
	}
}
/**
 * 获取pageIndex
 * 
 */
BlinkEwb.prototype.getPageIndex = function() {
	for (var i = 0; i < this.pageIds.length; i++) {
		if (this.page.pageId == this.pageIds[i]) {
			return i + 1;
		}
	}
	return null;
}
/**
 * 上传
 * 
 */
BlinkEwb.prototype.upload = function() {
	var blinkEwb = this;
	$("#uploadFileForm").remove();
	$(document.body)
			.append(
					"<form enctype=\"multipart/form-data\" method=\"post\" id=\"uploadFileForm\" name=\"uploadFileForm\">"
							+ "<input type=\"file\" id=\"file\" name=\"file\" runat=\"server\"/>"
							+ "<input type=\"hidden\" name=\"roomKey\" id=\"roomKey\" value=\""
							+ this.roomKey + "\" />" + "</form>");
	$("#file").change(
			function() {
				if (this.value == '') {
					return;
				}
				swal({
					title : "",
					text : $L("File uploading, please wait"),
					type : "",
					imageUrl : "images/loading.gif",
					imageSize : "32x32",
					showConfirmButton : false,
					allowEscapeKey : false
				});
				var options = {
					url : blinkEwb.fileServerPath + "/ewbfile/upload",
					clearForm : true,
					restForm : true,
					async : true,
					cache : false,
					beforeSend : function(xhr, obj) {
						// 请求头加token
						xhr.setRequestHeader("Authorization", "Bearer "
								+ blinkEwb.token);
					},
					success : function(data) {
						$("#uploadFileForm").remove();
						if (data.code == 200) {
							blinkEwb.uploadFile(data.data);
						} else {
							swal.close();
							$.alert($L("File upload error, please try again"));
						}
					},
					error : function(err) {
						$("#uploadFileForm").remove();
						swal.close();
						$.alert($L("File upload error, please try again"));
					}
				};
				$("#uploadFileForm").ajaxSubmit(options);
			}).click();
}
/** ----- loadPageInfo ---- */
/**
 * loadPageInfo
 * 
 */
BlinkEwb.prototype.loadPageInfo = function(isLoadAll) {
	if (this.page != null) {
		// this.getRoomPages();
		// this.getPrints();
		// this.getLaserPrint();
		this.loadData(isLoadAll);
	}
}
/**
 * 开始loadPageInfo
 * 
 */
BlinkEwb.prototype.startLoadPage = function() {
	this.exitLoadPage();

	this.loadPageInfo(true); // 立即执行一次, 第一次全加载
	var blinkEwb = this;
	this.loadPageInterval = setInterval(function() {
		blinkEwb.loadPageInfo();
	}, this.loadInterval);
}
/**
 * 停止loadPageInfo
 * 
 */
BlinkEwb.prototype.exitLoadPage = function() {
	if (this.loadPageInterval != null) {
		clearInterval(this.loadPageInterval);
		this.loadPageInterval = null;
	}
}
/** ----- loadPageInfo ---- */
/** ----- 调用上层的方法 ---- */
/**
 * 调用上层remoteImage
 * 
 */
BlinkEwb.prototype.remoteImage = function(image) {
	this.connection.remoteImage(this.connection, image);
}
/**
 * 调用上层remoteDraw
 * 
 */
BlinkEwb.prototype.remoteDraw = function(input) {
	this.connection.remoteDraw(this.connection, input);
}
/**
 * 调用上层remoteDrawMany
 * 
 */
BlinkEwb.prototype.remoteDrawMany = function(input) {
	this.connection.remoteDrawMany(this.connection, input);
}
/**
 * 调用上层remoteLaserRemove
 * 
 */
BlinkEwb.prototype.remoteLaserRemove = function() {
	this.connection.remoteLaserRemove(this.connection, null);
}
/**
 * 调用上层remoteLaserDraw
 * 
 */
BlinkEwb.prototype.remoteLaserDraw = function(input) {
	this.connection.remoteLaserDraw(this.connection, input);
}
/**
 * 调用上层clear
 * 
 */
BlinkEwb.prototype.remoteClear = function(reloadImage) {
	this.connection.remoteClear(this.connection, reloadImage);
}
/**
 * 调用上层的上层setCurrentPage
 * 
 */
BlinkEwb.prototype.setCurrentPage = function() {
	var pageIndex = this.getPageIndex();
	if (pageIndex != null) {
		this.connection.whiteboard.setCurrentPage(pageIndex);
	}
}
/**
 * 调用上层的上层setTotalPages
 * 
 */
BlinkEwb.prototype.setTotalPages = function() {
	this.connection.whiteboard.setTotalPages(this.pageIds);
}
/**
 * 调用上层的上层setPageFiles
 * 
 */
BlinkEwb.prototype.setPageFiles = function() {
	this.connection.whiteboard.setPageFiles(this.pageFiles);
}
/** ----- 调用上层的方法 ---- */
/** ----- 与server交互 ---- */
/**
 * 获取room的入口page信息
 * 
 */
BlinkEwb.prototype.getEntryPage = function() {
	var blinkEwb = this;
	BlinkAjax({
		type : "GET",
		url : this.serverPath + "/ewb/page/entry",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 200) {
				blinkEwb.handlePage(data.data);
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 处理page
 * 
 */
BlinkEwb.prototype.handlePage = function(page) {
	this.page = page;
	this.printId = 0;
	this.laserPrintId = 0;
	// 渲染图片
	this.renderImage();
	// 开始刷新
	this.startLoadPage();
}
/**
 * 获取room的page集合
 * 
 */
BlinkEwb.prototype.getRoomPages = function() {
	var blinkEwb = this;
	BlinkAjax({
		type : "GET",
		url : this.serverPath + "/ewb/page/datas",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 200) {
				blinkEwb.handlePages(data.data);
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 加载数据
 * 
 */
BlinkEwb.prototype.loadData = function(isLoadAll) {
	var blinkEwb = this;
	BlinkAjax({
		type : "GET",
		url : this.serverPath + "/ewb/page/load",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId,
			printId : this.printId,
			laserPrintId : this.laserPrintId,
			userId : this.userId
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 404) {
				blinkEwb.pageNotFound();
			} else if (data.code == 200) {
				if (data.data.page.pageId != blinkEwb.page.pageId) { // 页面已切换
					return;
				}
				/** pages */
				blinkEwb.handlePages(data.data.pages);
				/** prints */
				blinkEwb.handlePrints(data.data.prints, !isLoadAll);
				/** laserPrint */
				blinkEwb.handleLaserPrint(data.data.laserPrint);
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 处理pages
 * 
 */
BlinkEwb.prototype.handlePages = function(pages) {
	this.pages = pages;
	var pageIds = new Array();
	var pageFiles = new Array;
	for (var i = 0; i < pages.length; i++) {
		var page = pages[i];
		pageIds.push(page.pageId);
		pageFiles.push({
			fileUrl : (page.fileUrl == null ? "" : page.fileUrl),
			thumbnail : (page.thumbnail == null ? "" : page.thumbnail)
		});
	}
	this.handlePageIds(pageIds);
	this.handlePageFiles(pageFiles);
}
/**
 * 处理pageIds
 * 
 */
BlinkEwb.prototype.handlePageIds = function(pageIds) {
	this.pageIds = pageIds;
	// 设置pageIndex
	this.setCurrentPage();
	// 设置totalPages
	this.setTotalPages();
}
/**
 * 处理pageFiles
 * 
 */
BlinkEwb.prototype.handlePageFiles = function(pageFiles) {
	this.pageFiles = pageFiles;
	// 设置pageFiles
	this.setPageFiles();
}
/**
 * 处理prints
 * 
 */
BlinkEwb.prototype.handlePrints = function(prints, isFilterOwn) {
	if (prints == null) { // if (data.msg == "CLEAN") { // 清空
		if (this.printId != 0) {
			this.remoteClear(true);
		}
		this.printId = 0;
		// this.laserPrintId = 0;
	} else if (prints.length > 0) {
		var printId = 0;
		// var printPaths = "";
		var printPathArr = new Array();
		for (var i = 0; i < prints.length; i++) {
			var print = prints[i];
			printId = print.printId;
			if (isFilterOwn && this.userId == print.userId) { // 过滤自己画的
				continue;
			}
			// var printData = JSON.stringify(print.data);
			// printPaths += printData.substring(2, printData.length -
			// 2).replace(
			// /\\\"/g, "\"")
			// + ",";
			var printDataArr = JSON.parse(print.data);
			printPathArr = printPathArr.concat(printDataArr);
		}
		if (printId != 0) {
			this.printId = printId;
		}
		// printPaths = printPaths.substring(0, printPaths.length - 1);
		// var input = JSON.parse('{"room":"' + this.roomKey + '","page_id":'
		// + this.page.pageId + ',"singlePath":[' + printPaths + ']}');
		var input = {
			"room" : this.roomKey,
			"page_id" : this.page.pageId,
			"singlePath" : printPathArr
		}
		this.remoteDraw(input);
		// var input = JSON.parse('{"room":"' + this.roomKey + '","pages":['
		// + this.pageIds + '],"page_id":' + this.page.pageId
		// + ',"datas":[' + printPaths + ']}');
		// this.remoteDrawMany(input);
	}
}
/**
 * 处理laserPrint
 * 
 */
BlinkEwb.prototype.handleLaserPrint = function(laserPrint) {
	if (laserPrint != null && laserPrint != '') {
		// var laserPrintDatas = "";
		// var laserPrintData = JSON.stringify(laserPrint.data);
		// laserPrintDatas += laserPrintData.substring(2,
		// laserPrintData.length - 2).replace(/\\\"/g, "\"");
		// var input = JSON.parse(laserPrintDatas);
		// if (input.x == null) {
		// if (this.laserPrintId != 0) {
		// this.remoteLaserRemove();
		// }
		// this.laserPrintId = 0;
		// } else {
		// this.laserPrintId = laserPrint.printId;
		// this.remoteLaserDraw(input);
		// }
		if (laserPrint.printId != this.laserPrintId) {
			var input = JSON.parse(laserPrint.data);
			this.remoteLaserDraw(input);
			this.laserPrintId = laserPrint.printId;
		}
	} else {
		if (this.laserPrintId != 0) {
			this.remoteLaserRemove();
		}
		this.laserPrintId = 0;
	}
}
/**
 * 获取page信息
 * 
 */
BlinkEwb.prototype.getPage = function(pageId) {
	var blinkEwb = this;
	BlinkAjax({
		type : "GET",
		url : this.serverPath + "/ewb/page/data",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : pageId
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 404) {
				blinkEwb.pageNotFound();
			} else if (data.code == 200) {
				blinkEwb.handlePage(data.data);
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 创建page
 * 
 */
BlinkEwb.prototype.createPage = function() {
	var blinkEwb = this;
	BlinkAjax({
		type : "POST",
		url : this.serverPath + "/ewb/page/create",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 200) {
				blinkEwb.page = data.data;
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 上传图片
 * 
 */
BlinkEwb.prototype.uploadFile = function(file) {
	var blinkEwb = this;
	BlinkAjax({
		type : "POST",
		url : this.serverPath + "/ewb/page/file",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			file : file
		},
		dataType : "json",
		success : function(data) {
			swal.close();
			if (data.code == 200) {
				$.alert($L("File uploaded"));
				// 跳转到入口页
				blinkEwb.gotoEntryPage();
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			swal.close();
			$.alert($L("File upload error, please try again"));
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 上传图片
 * 
 */
BlinkEwb.prototype.uploadThumbnail = function(thumbnail) {
	var blinkEwb = this;
	BlinkAjax({
		type : "POST",
		url : this.serverPath + "/ewb/page/thumbnail",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId,
			thumbnail : thumbnail
		},
		dataType : "json",
		success : function(data) {
			console.debug(data.msg);
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 清理page的print
 * 
 */
BlinkEwb.prototype.cleanPagePrints = function() {
	// 停止刷新
	this.exitLoadPage();
	var blinkEwb = this;
	BlinkAjax({
		type : "POST",
		url : this.serverPath + "/ewb/page/clean",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 404) {
				blinkEwb.pageNotFound();
			} else if (data.code == 200) {
				blinkEwb.printId = 0;
				blinkEwb.laserPrintId = 0;
				blinkEwb.remoteClear(true);
				// 继续刷新
				blinkEwb.startLoadPage();
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 删除page
 * 
 */
BlinkEwb.prototype.deletePage = function() {
	// 停止刷新
	this.exitLoadPage();
	var blinkEwb = this;
	BlinkAjax({
		type : "POST",
		url : this.serverPath + "/ewb/page/delete",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 200 || data.code == 404) {
				// 跳转到入口页
				blinkEwb.gotoEntryPage();
			} else {
				// 继续刷新
				blinkEwb.startLoadPage();
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 查询print
 * 
 */
BlinkEwb.prototype.getPrints = function() {
	var blinkEwb = this;
	BlinkAjax({
		type : "GET",
		url : this.serverPath + "/ewb/print/datas",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId,
			printId : this.printId,
			userId : this.userId
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 404) {
				blinkEwb.pageNotFound();
			} else if (data.code == 200) {
				blinkEwb.handlePrints(data.data);
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 创建print
 * 
 */
BlinkEwb.prototype.createPrint = function(print, thumbnail) {
	var blinkEwb = this;
	BlinkAjax({
		type : "POST",
		url : this.serverPath + "/ewb/print/create",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId,
			userId : this.userId,
			data : print,
			thumbnail : thumbnail
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 404) {
				blinkEwb.pageNotFound();
			} else if (data.code == 200) {
				// 不再将创建的printId赋值
				// blinkEwb.printId = data.data.printId;
				// // 上传缩略图
				// if (thumbnail != null && thumbnail != "") {
				// blinkEwb.uploadThumbnail(thumbnail);
				// }
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 查询laserPrint
 * 
 */
BlinkEwb.prototype.getLaserPrint = function() {
	var blinkEwb = this;
	BlinkAjax({
		type : "GET",
		url : this.serverPath + "/ewb/laserPrint/data",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId,
			laserPrintId : this.laserPrintId
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 200) {
				blinkEwb.handleLaserPrint(data.data);
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 创建laserPrint
 * 
 */
BlinkEwb.prototype.createLaserPrint = function(laserPrint) {
	var blinkEwb = this;
	BlinkAjax({
		type : "POST",
		url : this.serverPath + "/ewb/laserPrint/create",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId,
			data : laserPrint
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 404) {
				blinkEwb.pageNotFound();
			} else if (data.code == 200) {

			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/**
 * 清除laserPrint
 * 
 */
BlinkEwb.prototype.cleanPageLaserPrints = function() {
	var blinkEwb = this;
	BlinkAjax({
		type : "POST",
		url : this.serverPath + "/ewb/laserPrint/clean",
		async : true,
		cache : false,
		data : {
			roomKey : this.roomKey,
			pageId : this.page.pageId,
		},
		dataType : "json",
		success : function(data) {
			if (data.code == 404) {
				blinkEwb.pageNotFound();
			} else if (data.code == 200) {
				blinkEwb.laserPrintId = 0;
			} else {
				$.alert(data.msg);
			}
		},
		error : function(err) {
			console.error(new Date());
			console.error(err);
		}
	}, this);
}
/** ----- 与server交互 ---- */
/**
 * token失效
 * 
 */
BlinkEwb.prototype.tokenInvalid = function() {
	// 停止刷新
	this.exitLoadPage();
	$.alert($L("Invalid token, please check"));
}
/** ----- BlinkAjax ----- */
var BlinkAjax = function(opt, blinkEwb) {
	var _ajax = $.ajax;
	// 备份opt中error和success方法
	var fn = {
		error : function(XMLHttpRequest, textStatus, errorThrown) {
		},
		success : function(data, textStatus) {
		},
		complete : function(XMLHttpRequest, textStatus) {
		},
		beforeSend : function(XMLHttpRequest) {
		}
	};
	if (opt.error) {
		fn.error = opt.error;
	}
	if (opt.success) {
		fn.success = opt.success;
	}
	if (opt.beforeSend) {
		fn.beforeSend = opt.beforeSend;
	}
	if (opt.complete) {
		fn.complete = opt.complete;
	}
	// //扩展增强处理
	var _opt = $.extend(opt, {
		error : function(xhr, textStatus, errorThrown) {
			if (xhr.status == 401) {
				// token失效提示
				blinkEwb.tokenInvalid();
				return;
			}
			// closeLoadingTip();
			// 错误方法增强处理
			fn.error(xhr, textStatus, errorThrown);
		},
		success : function(data, textStatus) {
			if (data.code == 401) {
				// token失效提示
				blinkEwb.tokenInvalid();
				return;
			}
			// closeLoadingTip();
			// 成功回调方法增强处理
			fn.success(data, textStatus);
		},
		beforeSend : function(xhr, obj) {
			// 请求头加token
			xhr.setRequestHeader("Authorization", "Bearer " + blinkEwb.token);
			// 提交前回调方法
			fn.beforeSend(xhr, obj);
		},
		complete : function(xhr, ts) {
			// 请求完成后回调函数 (请求成功或失败之后均调用)。
			fn.complete(xhr, ts);
		}
	});
	return _ajax(_opt);
}
