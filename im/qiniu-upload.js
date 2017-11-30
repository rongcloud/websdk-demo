(function(RCS) {
	//qiniu
	function forEach(m, callback) {
		for (var key in m) {
			callback(key, m[key]);
		}
	}

	function buildUrl(url, items) {
		var query = '';
		forEach(items, function(name, value) {
			if (name != 'token') {
				query += (query ? '&' : '') + encodeURIComponent(name) + '=' + encodeURIComponent(value);
			}
		});

		if (query) {
			url += (url.indexOf('?') > 0 ? '&' : '?') + query;
		}

		return url;
	}

	function encode2UTF8(argString) {
		if (argString === null || typeof argString === 'undefined') {
			return '';
		}
		var string = (argString + ''); // .replace(/\r\n/g, '\n').replace(/\r/g, '\n');
		var utftext = '',
			start, end, stringl = 0;
		start = end = 0;
		stringl = string.length;
		for (var n = 0; n < stringl; n++) {
			var c1 = string.charCodeAt(n);
			var enc = null;

			if (c1 < 128) {
				end++;
			} else if (c1 > 127 && c1 < 2048) {
				enc = String.fromCharCode(
					(c1 >> 6) | 192, (c1 & 63) | 128
				);
			} else if (c1 & 0xF800 ^ 0xD800 > 0) {
				enc = String.fromCharCode(
					(c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
				);
			} else { // surrogate pairs
				if (c1 & 0xFC00 ^ 0xD800 > 0) {
					throw new RangeError('Unmatched trail surrogate at ' + n);
				}
				var c2 = string.charCodeAt(++n);
				if (c2 & 0xFC00 ^ 0xDC00 > 0) {
					throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
				}
				c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
				enc = String.fromCharCode(
					(c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
				);
			}
			if (enc !== null) {
				if (end > start) {
					utftext += string.slice(start, end);
				}
				utftext += enc;
				start = end = n + 1;
			}
		}

		if (end > start) {
			utftext += string.slice(start, stringl);
		}

		return utftext;
	}
	// Copy 七牛 SDK 方法
	function encode2Base64(data) {
		var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = '',
			tmp_arr = [];

		if (!data) {
			return data;
		}

		data = encode2UTF8(data + '');

		do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);

			bits = o1 << 16 | o2 << 8 | o3;

			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;

			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);

		enc = tmp_arr.join('');

		switch (data.length % 3) {
			case 1:
				enc = enc.slice(0, -2) + '==';
				break;
			case 2:
				enc = enc.slice(0, -1) + '=';
				break;
		}
		return enc;
	}
	// Copy 七牛 SDK 方法
	function URLSafeBase64Encode(v) {
		v = encode2Base64(v);
		return v.replace(/\//g, '_').replace(/\+/g, '-');
	}

	function chunkLastStep(data, opts, callback) {
		// 七牛 URL 规定
		var key = '/key/' + URLSafeBase64Encode(data.filename);
		var fname = '/fname/' + URLSafeBase64Encode(data.filename);
		var url = opts.domain + '/mkfile/' + data.size + key + fname;
		var options = {
			domain: url,
			method: 'POST',
			headers: {
				'Content-Type': 'application/octet-stream'
			},
			multi_parmas: opts.multi_parmas,
			support_options: true,
			stream: true
		};
		uploadData(data.ctx, options, {
			onCompleted: function(res) {
				res.filename = data.filename;
				res.name = data.name;
				callback.onCompleted(res);
			},
			onError: function() {
				throw new Error('qiniu uploadChunk error');
			},
			onProgress: function(chunkLoaded, total) {},
			onOpen: function(xhr) {
				callback.onOpen(xhr);
			}
		});
	}

	var offset = 0,
		ctxStore = {};

	function uploadNextChunk(blob, opts, callback) {
		var chunk = Math.ceil(offset / opts.chunk_size),
			chunks = Math.ceil(blob.size / opts.chunk_size),
			curChunkSize = Math.min(opts.chunk_size, blob.size - offset),
			chunkBlob = blob.slice(offset, offset + curChunkSize),
			chunkInfo = {
				chunk: chunk,
				chunks: chunks,
				name: blob.uniqueName
			};
		forEach(chunkInfo, function(key, value) {
			opts.multi_parmas[key] = value;
		});
		opts.filesize = blob.size;
		opts.headers = {
			'Content-Type': 'application/octet-stream'
		};
		opts.isChunk = true;
		uploadData(chunkBlob, opts, {
			onCompleted: function(chunkRes) {
				offset += curChunkSize;
				// callback.onProgress(Math.floor((chunk + 1) / chunks * blob.size), blob.size);
				ctxStore[blob.uniqueName] = ctxStore[blob.uniqueName] || [];
				ctxStore[blob.uniqueName].push(chunkRes.ctx);
				if (offset < blob.size) {
					if (chunkRes.ctx) {
						uploadNextChunk(blob, opts, callback);
					}else{
						offset = 0;
						delete ctxStore[blob.uniqueName]
					}
				} else {
					offset = 0;
					delete opts.isChunk;
					delete opts.headers['Content-Type'];
					forEach(chunkInfo, function(key, value) {
						delete opts.multi_parmas[key];
					});
					var ctx = ctxStore[blob.uniqueName].join(',');
					var data = {
						ctx: ctx,
						name: blob.name,
						size: blob.size,
						filename: blob.uniqueName
					};
					chunkLastStep(data, opts, callback);
				}
			},
			onError: function() {
				throw new Error('qiniu uploadChunk error');
			},
			onProgress: function(chunkLoaded, total) {
				var loaded = chunkLoaded + offset;
				callback.onProgress(loaded, opts.filesize);
			},
			onOpen: function(xhr) {
				callback.onOpen(xhr);
			}
		});
	}

	function uploadData(data, options, callback) {
		var xhr = new XMLHttpRequest();
		if (xhr.upload && options.support_options) {
			xhr.upload.onprogress = function(event) {
				callback.onProgress(event.loaded, event.total);
			};
		}

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				var result = xhr.responseText || "{}";
				result = JSON.parse(result);
				result.filename = options.unique_value;
				callback.onCompleted(result);
			}
		};

		var url = options.domain;
		if (options.isChunk) {
			url += '/mkblk/' + data.size;
			url = buildUrl(url, options.multi_parmas);
		}
		xhr.open(options.method, url, true);

		callback.onOpen(xhr);

		if (options.stream) {
			xhr.setRequestHeader('authorization', 'UpToken ' + options.multi_parmas.token);
		}

		forEach(options.headers, function(key, value) {
			xhr.setRequestHeader(key, value);
		});
		xhr.send(data);
	}

	function uploadQiniu(file, opts, callback) {
		if (file.size && opts.chunk_size < file.size) {
			var uniqueName = opts['genUId'](file);
			var suffix = file.name.substr(file.name.lastIndexOf('.'));
			uniqueName = uniqueName + suffix;
			file.uniqueName = uniqueName;
			opts.stream = true;
			uploadNextChunk(file, opts, callback);
		} else {
			var data = opts['data'](file, opts);
			uploadData(data, opts, callback);
		}
	}
	var uploadProcess = uploadQiniu;



	//upload
	var dataType = {
		form: getFormData,
		json: getJsonData,
		data: getData
	};
	var fileConfig = { 
		domain: 'http://upload.qiniu.com',
		fileType: RongIMLib.FileType.IMAGE,
		getToken: function(callback){
			/****************************
			 * 使用融云文件存储注意事项：
			 * 1、有效期为 1 个月。
			 * 2、文件不可迁移。
			 ****************************
			 */
			RongIMClient.getInstance().getFileToken(this.fileType, {
				onSuccess: function(data){
					callback(data.token);
				},
				onError: function(error){
					console.log('获取上传token失败');
					console.log(error);
				}
			});
		}
	};

	function genUId() {
		var date = new Date().getTime();
		var uuid = 'xxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (date + Math.random() * 16) % 16 | 0;
			date = Math.floor(date / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	};

	function mergeOption(opts) {
		var options = {
			domain: '',
			method: 'POST',
			file_data_name: 'file',
			unique_key: 'key',
			base64_size: 4 * 1024 * 1024,
			chunk_size: 4 * 1024 * 1024,
			headers: {},
			multi_parmas: {},
			query: {},
			support_options: true,
			data: dataType.form,
			genUId: genUId
		};
		if (!opts || !opts.domain) {
			throw new Error('domain is null');
		}
		for (var key in opts) {
			options[key] = opts[key];
		}
		return options;
	}

	function mEach(m, callback) {
		for (var key in m) {
			callback(key, m[key]);
		}
	}

	function getFormData(file, opts) {
		var form = new FormData();
		if (opts.unique_key) {
			var suffix = file.name.substr(file.name.lastIndexOf('.'));
			var unique_value = genUId() + suffix;
			form.append(opts.unique_key, unique_value);
			opts.unique_value = unique_value;
		}
		form.append(opts.file_data_name, file);
		mEach(opts.multi_parmas, function(key, value) {
			form.append(key, value);
		});
		return form;
	}

	function getJsonData(file, opts) {
		var data = {};
		if (opts.unique_key) {
			var suffix = file.name.substr(file.name.lastIndexOf('.'));
			var unique_value = genUId() + suffix;
			data[opts.unique_key] = unique_value;
			opts.unique_value = unique_value;
		}
		data[opts.file_data_name] = file;
		mEach(opts.multi_parmas, function(key, value) {
			data[key] = value;
		});
		return JSON.stringify(data);
	}

	function getData(file, opts) {
		return file;
	}

	function Upload(options) {
		this.options = mergeOption(options);

		this.setOptions = function(opts) {
			var me = this;
			mEach(opts, function(key, value) {
				me.options[key] = value;
			});
		};

		this.upload = function(file, callback) {
			if (!file) {
				callback.onError('upload file is null.');
				return;
			}
			var me = this;
			uploadProcess(file, this.options, {
				onProgress: function(loaded, total) {
					callback.onProgress(loaded, total);
				},
				onCompleted: function(data) {
					callback.onCompleted(data);
				},
				onError: function(errorCode) {
					callback.onError(errorCode);
				},
				onOpen: function(xhr) {
					me.xhr = xhr;
				}
			});
		};

		this.cancel = function() {
			this.xhr && this.xhr.abort();
		};
	}

	function init(options) {
		return new Upload(options);
	}

	function getResizeRatio(imageInfo,config){
		//hasOwnProperty?

		var ratio = 1;

		var oWidth = imageInfo.width;
		var maxWidth = config.maxWidth || 0;
		if(maxWidth > 0 &&  oWidth > maxWidth){
			ratio = maxWidth/oWidth;
		}

		var oHeight = imageInfo.height;
		var maxHeight = config.maxHeight || 0;
		if(maxHeight > 0 && oHeight > maxHeight){
			var ratioHeight = maxHeight/oHeight;
			ratio = Math.min(ratio,ratioHeight);
		}


		var maxSize = config.maxSize || 0;
		var oSize = Math.ceil(imageInfo.size/1000); //K，Math.ceil(0.3) = 1;
		if(oSize > maxSize){
			ratioSize = maxSize/oSize;
			ratio = Math.min(ratio,ratioSize);
		}

		return ratio;
	}

	function resize(file,config,callback){
		//file对象没有高宽
		var type = file.type; //image format
		var canvas = document.createElement("canvas");

		var reader = new FileReader();

    	reader.readAsDataURL(file);
		reader.onload = function(evt){
			var imageData = evt.target.result;
			var img = new Image();
			img.src  = imageData;
			var width = img.width;
			var height = img.height;
			var imageInfo = {
				width : width,
				height : height,
				size : evt.total
			}
			var ratio = getResizeRatio(imageInfo,config);
			var newImageData = imageData;
			if(ratio < 1){
				newImageData = compress(img, width*ratio, height*ratio);;
			}
			callback(newImageData);
		}

		function compress(img, width, height){
				canvas.width = width;
				canvas.height = height;

			var context = canvas.getContext('2d');
				context.drawImage(img, 0, 0, width, height);

			/*
			If the height or width of the canvas is 0, the string "data:," is returned.
			If the requested type is not image/png, but the returned value starts with data:image/png, then the requested type is not supported.
			Chrome also supports the image/webp type.
			*/ 

			var supportTypes = {
				"image/jpg" : true,
				"image/png" : true,
				"image/webp" : supportWebP()
			};
			// var exportType = "image/png";
			// if(supportTypes[type]){
			// 	exportType = type;
			// } 
			// 多端一致，缩略图必须是 jpg 
			var exportType = "image/jpg";
			var newImageData = canvas.toDataURL(exportType);
			return newImageData;
		}

		function supportWebP(){
			try{
        		return (canvas.toDataURL('image/webp').indexOf('data:image/webp') == 0);
    		}catch(err) {
		        return  false;
		    }
		}
	}

	var calcPosition = function(width, height, opts) {
        var isheight = width < height;
        var scale = isheight ? height / width : width / height;
        var zoom, x = 0,
            y = 0,
            w, h;

        var gtScale = function() {
            if (isheight) {
                zoom = width / 100;
                w = 100;
                h = height / zoom;
                y = (h - opts.maxHeight) / 2;
            } else {
                zoom = height / 100;
                h = 100;
                w = width / zoom;
                x = (w - opts.maxWidth) / 2;
            }
            return {
                w: w,
                h: h,
                x: -x,
                y: -y
            };
        };
        
        var ltScale = function() {
            if (isheight) {
                zoom = height / opts.maxHeight;
                h = opts.maxHeight;
                w = width / zoom;
            } else {
                zoom = width / opts.maxWidth;
                w = opts.maxWidth;
                h = height / zoom;
            }
            return {
                w: w,
                h: h,
                x: -x,
                y: -y
            };
        };
        return scale > opts.scale ? gtScale() : ltScale();
    };

    var getBlobUrl = function(file) {
        var URL = window.URL || window.webkitURL;
        return URL ? URL.createObjectURL(file) : "";
    };

    var getThumbnail = function(file, opts, callback) {
        var canvas = document.createElement("canvas"),
            context = canvas.getContext('2d');
        var img = new Image();
        img.onload = function() {
            var pos = calcPosition(img.width, img.height, opts);
            canvas.width = pos.w > opts.maxWidth ? opts.maxWidth : pos.w;
            canvas.height = pos.h > opts.maxHeight ? opts.maxHeight : pos.h;
            context.drawImage(img, pos.x, pos.y, pos.w, pos.h);
            try {
                var base64 = canvas.toDataURL(file.type, opts.quality);
                var reg = new RegExp('^data:image/[^;]+;base64,');
                base64 = base64.replace(reg, '');
                callback(base64);
            } catch (e) {
                throw new Error(e);
            }
        };
        img.src = typeof file == 'string' ? 'data:image/jpg;base64,' + file : getBlobUrl(file);
    };

    var _compress = function(data, callback) {
        var file = data.file;
        var opts = data.compress;
        getThumbnail(file, opts, callback);
    };

    _init = function(config, callback) {
        if (config.getToken) {
            config.getToken(function(token) {
                config.multi_parmas || (config.multi_parmas = {});
                config.multi_parmas.token = token;
                config.headers || (config.headers = {});
                if (config.base64) {
                    config.headers['Content-type'] = 'application/octet-stream';
                    config.headers['Authorization'] = 'UpToken ' + token;
                }
                var instance = init(config);
                callback(instance);
            });
        } else {
            config.headers || (config.headers = {});
            if (config.base64) {
                config.headers['Content-type'] = 'application/octet-stream';
            }
            var instance = init(config);
            callback(instance);
        }
    };

    var _upload = function(data, instance, callback) {
        instance.upload(data.file, {
            onError: function(errorCode) {
                callback.onError(errorCode);
            },
            onProgress: function(loaded, total) {
                callback.onProgress(loaded, total);
            },
            onCompleted: function(result) {
                result.filename || (result.filename = result.hash);
                var compress = data.compressThumbnail || _compress;
                if (data.compress) {
                    compress(data, function(thumbnail) {
                        result.thumbnail = thumbnail;
                        callback.onCompleted(result);
                    });
                } else {
                    callback.onCompleted(result);
                }
            }
        });
    };

    var File = function(instance) {
        var me = this;
        this.instance = instance
        this.upload = function(file, callback) {
            var data = {
                file: file
            };
            _upload(data, me.instance, callback);
        };
        this.cancel = function() {
            me.instance.cancel();
        };
    };

    var initFile = function(config, callback) {
        _init(config, function(instance) {
            var UploadFile = new File(instance);
            callback(UploadFile);
        });
    };

    var Img = function(instance, cfg) {
        var me = this;
        this.cfg = cfg;
        this.instance = instance;
        this.upload = function(file, callback) {
            var data = {
                file: file,
                compress: me.cfg
            };
            _upload(data, me.instance, callback);
        };

        this.cancel = function() {
            me.instance.cancel();
        };
    };

    var initImage = function(config, callback) {
        _init(config, function(instance) {
            var compress = {
                maxHeight: config.height || 240,
                maxWidth: config.width || 240,
                quality: config.quality || 0.5,
                scale: config.scale || 2.4
            };
            var uploadImage = new Img(instance, compress);
            callback(uploadImage);
        });
    };

    var ImgBase64 = function(config) {
        config.base64 = true;
        Img.call(this, config);
    };

    var initImgBase64 = function(config, callback) {
        config.base64 = true;
        initImage.call(this, config, callback);
    };
    var initType = {
        file: function(file,config,callback){
            initFile(config, function(uploadFile){
                uploadFile.upload(file, callback);
            });
        },
        image: function(file,config,callback){
            initImage(config, function(uploadFile){
                uploadFile.upload(file, callback);
            });
        }
    };

    var imageStartUpload = function(_file,onSuccess){
    	var callback = {
			onError	: function (errorCode) { 
				console.log(errorCode);
			},
			onProgress : function (loaded, total) {
				// var percent = Math.floor(loaded/total*100);
				// var progressBar 	= document.getElementById('progressBar'),
				// 	progressContent = document.getElementById('progressContent');
				// 	progressBar.style.width = percent + '%';
	   //      		progressContent.innerHTML = percent + "%";
			},
			onCompleted : function (data) {
				data.fileType = 'image';
				onSuccess(data);
			} 
		};
    	initType['image'](_file,fileConfig,callback);
    }
    var fileStartUpload = function(_file,onSuccess){
    	fileConfig.fileType = RongIMLib.FileType.FILE;
    	var callback = {
			onError	: function (errorCode) { 
				console.log(errorCode);
			},
			onProgress : function (loaded, total) {
				// var percent = Math.floor(loaded/total*100);
				// var progressBar 	= document.getElementById('progressBar'),
				// 	progressContent = document.getElementById('progressContent');
				// 	progressBar.style.width = percent + '%';
	   //      		progressContent.innerHTML = percent + "%";
			},
			onCompleted : function (data) {
				data.fileType = 'file';
				onSuccess(data);
			} 
		};
    	initType['file'](_file,fileConfig,callback);
    }

    
    RCS.imageStartUpload = imageStartUpload;
    RCS.fileStartUpload = fileStartUpload;
    RCS.fileConfig = fileConfig;
})(RCS);