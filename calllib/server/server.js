'use strict';

const express = require('express')
const bodyParser = require('body-parser');
const RongCloudSDK = require('rongcloud-sdk');
const _ = require('underscore');
const config = require('./config');

let RongSDK = RongCloudSDK(config);

let Message = RongSDK.Message;
let Private = Message.Private;


let app = express()
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', '*');
	next();
});

app.get('/get_media_id', (req, res) => {
	let time = Date.now();
	let mediaId = time & 0x7fffffff
	res.end(JSON.stringify({
		code: 200,
		mediaId: mediaId
	}));
});

// API 文档: http://rongcloud.github.io/server-sdk-nodejs/docs/v1/message/private.html#send
let sendMsg = (message) => {
	return Private.send(message);
};

app.post('/send_msg', (req, res) => {
	let message = req.body;
	let toUserIds = message.toUserIds;
	let senderId = message.senderId;
	toUserIds.push(senderId);

	toUserIds = _.filter(toUserIds, (userId) => {
		return userId != senderId;
	});

	message = _.extend(_.omit(message, 'toUserIds'));

	let promiseList = [];
	_.each(toUserIds, (id) => {
		if (senderId) {}
		message.targetId = id;
		let promise = sendMsg(message);
		promiseList.push(promise);
	});

	Promise.all(promiseList).then(() => {
		let sentTime = Date.now();
		res.end(JSON.stringify({
			code: 200,
			sentTime: sentTime
		}));
	});

});

app.listen(8585);
console.log('listener port : 8585');