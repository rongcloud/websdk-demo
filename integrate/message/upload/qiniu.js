(function(win) {
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
	win.uploadProcess = uploadQiniu;
})(window);