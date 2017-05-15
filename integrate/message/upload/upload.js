(function(win) {

	var dataType = {
		form: getFormData,
		json: getJsonData,
		data: getData
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

	win.UploadFile = {
		init: init,
		dataType: dataType,
		resize : resize
	};
})(window);