/*
CMD规范: https://github.com/seajs/seajs/issues/242
AMD规范: https://github.com/amdjs/amdjs-api/wiki/AMD

requirejs: http://requirejs.org/docs/whyamd.html
*/

/*
集成用户和群组数据的代码参考
主要为了演示思路，具体有些实现还需要自行处理

功能：
1：根据 userId 获取用户信息 （用户的 id、name、portrait）
2：根据 groupId 获取群组信息（群组的 id、name、portrait、memberIds）
*/

//namespace 请使用时具体定义
;(function (global, factory, namespace) {
    if(typeof exports === 'object' && typeof module !== 'undefined'){
    	module.exports = factory();
    }else if(typeof define === 'function' && define.amd){
    	define(factory);
    }else{
    	global[namespace] = factory();
    }
})(window, function(){
	"use strict";

	var APIs = {};
	var domain = "http(s)://yourdomain";

	APIs.userInfo = "/user/{ids}";
	/*
	获取用户信息接口，建议支持批量获取，如不支持，只能通过循环请求处理，后面会有示例
	上行：ids = ["userId1","userId2",………………,"userIdN"].join(",");
	返回：userInfos = [
			{
			"id" : "userId1",
			"name" : "张三",
			"portrait" : "http://rongcloud.cn/images/newVersion/log_wx.png"
			},
			{
			"id" : "userId2",
			"name" : "李四",
			"portrait" : "http://rongcloud.cn/images/newVersion/log_wx.png"
			},
			………………
			{
			"id" : "userIdN",
			"name" : "路人甲乙丙丁",
			"portrait" : "http://rongcloud.cn/images/newVersion/log_wx.png"
			}
		];
	*/

	APIs.groupInfo = "group/{ids}";
	/*
	获取群组信息接口，建议支持批量获取，如不支持，只能通过循环请求处理，后面会有示例
	上行：ids = ["groupId1",………………,"groupIdN"].join(",");
	返回 groupInfos = [
			{
			"id" : "groupId1",
			"name" : "产品研发群",
			"portrait" : "http://rongcloud.cn/images/newVersion/log_wx.png",
			"memberIds" : ["userId1","userId2"]
			},
			………………
			{
			"id" : "groupIdN",
			"name" : "项目管理群",
			"portrait" : "http://rongcloud.cn/images/newVersion/log_wx.png",
			"memberIds" : ["userId1","userIdN"]
			}

		];
	*/


	//请求方法，只给出成功返回的情况，异常请自行处理
	var request = function(url, pramas, callback){
		/*
		请自行实现请求，或者传入 jQuery 等 lib 的 request 方法
		请注意处理可能存在的跨域问题
		*/
	}

	//创建本地缓存对象，缓存用户数据，目前放在内存，具体使用时可以根据需要处理为 localStorage 或 cookie 等
	var userInfoCache = {};

	//获取用户信息方法的实现
	var getUserInfos = function(ids, callback){
		//考虑到具体的应用场景，设计为 object，也可以根据业务特点设计成 array 等其他的数据格式
		var userInfos = {};

		var remoteUserIds = [];
		for(var i = 0, len = ids.length; i<len; i++){
			var userId = ids[i];
			if(userInfoCache[userId]){
				//如果本地命中，直接放入结果等待一起返回
				userInfos[userId] = userInfoCache[userId];

				//如果需要立即返回，这种方法会不断执行回调，逐个返回，如果下面，此处以及request里的返回均可如此处理
				callback({userid:userInfoCache[userId]});
			}else{
				//如果本地没有命中，过滤出 id，下一步从服务器请求
				remoteUserIds.push(userId);
			}
		}

		var url = domain + APIs[userInfo];

		//支持批量请求，返回用户数据
		request(url, remoteUserIds, function(remoteUserInfos){
			for(var i = 0, len = remoteUserInfos.length; i<len; i++){
				var userInfo = remoteUserInfos[i];
				var userId = userInfo[id];

				//放入本地缓存
				userInfoCache[userId] = userInfo;

				//放入查询结果
				userInfos[userId] = userInfo;

				callback(userInfos);
			}
		});

		//不支持批量请求，逐个返回用户数据
		var backNumbers = 0;
		for(var i = 0, len = remoteUserIds.length; i<len; i++){
			var remoteUserId = remoteUserIds[i];
			request(url, remoteUserId, function(remoteUserInfo){
				var userId = remoteUserInfo[id];

				//放入本地缓存
				userInfoCache[userId] = remoteUserInfo;

				//放入查询结果
				userInfos[userId] = remoteUserInfo;

				//计数 +1
				backNumbers += 1;

				//根据 backNumbers 与 remoteUserIds 的长度判断是否全部请求完毕
				if(backNumbers == len){
					callback(userInfos);
				}
			});
		}
	};


	//创建本地缓存对象，缓存用户数据，目前放在内存，具体使用时可以根据需要处理为 localStorage 或 cookie 等
	var groupInfoCache = {};

	//获取群组信息实现，本方法不返回群组成员信息
	var getGroupInfos = function(ids, callback){
		var groupInfos = {};
		var remoteGroupIds = [];
		for(var i = 0, len = ids.length; i<len; i++){
			var groupId = ids[i];
			if(groupInfoCache[groupId]){
				//如果本地命中，直接返回
				groupInfos[groupId] = groupInfoCache[groupId];
			}else{
				//如果本地没有命中，过滤出 id，下一步从服务器请求
				remoteGroupIds.push(groupId);
			}
		}

		var url = domain + APIs[groupInfo];

		//支持批量请求，返回群组数据
		request(url, remoteGroupIds, function(remoteGroupInfos){
			for(var i = 0, len = remoteGroupInfos.length; i<len; i++){
				var groupInfo = remoteGroupInfos[i];
				var groupId = groupInfo[id];

				//放入本地缓存
				groupInfoCache[groupId] = groupInfo;

				//放入查询结果
				groupInfos[groupId] = groupInfo;

				callback(groupInfos);
			}
		});

		//不支持批量的处理方式与 userInfo 一致，请参考
	}

	//获取群组信息及成员信息，因为应用场景，此方法设计为逐个群组获取
	var getGroupInfosWithMemberInfo = function(id, callback){
		getGroupInfo(id, function(groupInfo){
			var ids = groupInfo.memberIds;
			getUserInfo(ids, function(userInfos){
				groupInfo.members = userInfos;
				callback(groupInfo);
			})
		});
	}

	//返回需要对外暴露的方法
    return {
    	getUserInfos : getUserInfos,
    	getGroupInfos : getGroupInfos,
    	getGroupInfosWithMemberInfo : getGroupInfosWithMemberInfo
    }
}, namespace);

