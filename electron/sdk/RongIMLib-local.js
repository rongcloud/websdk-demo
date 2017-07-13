//SDK资源本地化 2017.6.23

var Polling = {
        DeleteMsgInput:function(){
         var a = {};
         this.setType = function(b){
           a.type = b;
         };
         this.setConversationId = function(b){
           a.conversationId = b;
         };
         this.setMsgs = function(b){
           a.msgs = b;
         };
         this.toArrayBuffer = function () {
             return a;
         }
        },
        DeleteMsg:function(){
          var a = {};
          this.setMsgId = function(b){
            a.msgId = b;
          };
          this.setMsgDataTime = function(b){
            a.msgDataTime = b;
          };
          this.setDirect = function(b){
            a.direct = b;
          };
          this.toArrayBuffer = function () {
              return a;
          }
        },
        DeleteMsgOutput:function(){
         var a = {};
         this.setNothing = function(b){
           a.nothing = b;
         };
         this.toArrayBuffer = function () {
             return a;
         }
        },
        SearchMpInput:function(){
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setId = function (b) {
                a.id = b;
            };
            this.toArrayBuffer = function () {
                return a;
            }
        },
        SearchMpOutput:function(){
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.setInfo = function (b) {
                a.info = b;
            };
            this.toArrayBuffer = function () {
                return a;
            }
        },
        MpInfo:function(){
            var a = {};
            this.setMpid = function(b){
                a.mpid = b;
            };
            this.setName = function(b){
                a.name = b;
            };
            this.setType = function(b){
                a.type = b;
            };
            this.setTime = function(b){
                a.time = b;
            };
            this.setPortraitUri = function(b){
                a.portraitUrl = b;
            };
            this.setExtra = function(b){
                a.extra = b;
            };
            this.toArrayBuffer = function () {
                return a;
            }
        },
        PullMpInput:function(){
            var a = {};
            this.setMpid = function(b){
                a.mpid = b;
            };
            this.setTime = function(b){
                a.time = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        PullMpOutput:function(){
            var a = {};
            this.setStatus = function(b){
                a.status = b;
            }
            this.setInfo = function(b){
                a.info = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        MPFollowInput:function(){
            var a = {};
            this.setId = function(b){
                a.id = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        MPFollowOutput:function(){
            var a = {};
            this.setNothing = function(b){
                a.nothing = b;
            };
            this.setInfo = function(b){
                a.info = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        NotifyMsg: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setTime = function (b) {
                a.time = b;
            };
            this.setChrmId = function(b){
                a.chrmId = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        SyncRequestMsg: function () {
            var a = {};
            this.setSyncTime = function (b) {
                a.syncTime = b || 0;
            };
            this.setIspolling = function (b) {
                a.ispolling = !!b;
            };
            this.setIsweb = function (b) {
                a.isweb = !!b;
            };
            this.setIsPullSend = function (b) {
                a.isPullSend = !!b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        UpStreamMessage: function () {
            var a = {};
            this.setSessionId = function (b) {
                a.sessionId = b
            };
            this.setClassname = function (b) {
                a.classname = b
            };
            this.setContent = function (b) {
                if (b) a.content = b;
            };
            this.setPushText = function (b) {
                a.pushText = b
            };
            this.setUserId = function(b){
                a.userId = b;
            };
            this.setAppData = function(b){
                a.appData = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        DownStreamMessages: function () {
            var a = {};
            this.setList = function (b) {
                a.list = b
            };
            this.setSyncTime = function (b) {
                a.syncTime = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        DownStreamMessage: function () {
            var a = {};
            this.setFromUserId = function (b) {
                a.fromUserId = b
            };
            this.setType = function (b) {
                a.type = b
            };
            this.setGroupId = function (b) {
                a.groupId = b
            };
            this.setClassname = function (b) {
                a.classname = b
            };
            this.setContent = function (b) {
                if (b)
                    a.content = b
            };
            this.setDataTime = function (b) {
                a.dataTime = b;
            };
            this.setStatus = function (b) {
                a.status = b;
            };
            this.setMsgId = function (b) {
                a.msgId = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        CreateDiscussionInput: function () {
            var a = {};
            this.setName = function (b) {
                a.name = b
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        CreateDiscussionOutput: function () {
            var a = {};
            this.setId = function (b) {
                a.id = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChannelInvitationInput: function () {
            var a = {};
            this.setUsers = function (b) {
                a.users = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        LeaveChannelInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        QueryChatroomInfoInput:function(){
            var a = {};
            this.setCount = function (b) {
                a.count = b;
            };
            this.setOrder = function (b) {
                a.order = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        QueryChatroomInfoOutput:function(){
            var a = {};
            this.setUserTotalNums = function (b) {
                a.userTotalNums = b;
            };
            this.setUserInfos = function (b) {
                a.userInfos = b;
            };
            this.toArrayBuffer = function () {
                return a;
            };
        },
        ChannelEvictionInput: function () {
            var a = {};
            this.setUser = function (b) {
                a.user = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        RenameChannelInput: function () {
            var a = {};
            this.setName = function (b) {
                a.name = b
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        ChannelInfoInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        ChannelInfoOutput: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b
            };
            this.setChannelId = function (b) {
                a.channelId = b
            };
            this.setChannelName = function (b) {
                a.channelName = b
            };
            this.setAdminUserId = function (b) {
                a.adminUserId = b
            };
            this.setFirstTenUserIds = function (b) {
                a.firstTenUserIds = b
            };
            this.setOpenStatus = function (b) {
                a.openStatus = b
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        ChannelInfosInput: function () {
            var a = {};
            this.setPage = function (b) {
                a.page = b
            };
            this.setNumber = function (b) {
                a.number = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChannelInfosOutput: function () {
            var a = {};
            this.setChannels = function (b) {
                a.channels = b
            };
            this.setTotal = function (b) {
                a.total = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        MemberInfo: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b
            };
            this.setUserName = function (b) {
                a.userName = b
            };
            this.setUserPortrait = function (b) {
                a.userPortrait = b
            };
            this.setExtension = function (b) {
                a.extension = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupMembersInput: function () {
            var a = {};
            this.setPage = function (b) {
                a.page = b
            };
            this.setNumber = function (b) {
                a.number = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupMembersOutput: function () {
            var a = {};
            this.setMembers = function (b) {
                a.members = b
            };
            this.setTotal = function (b) {
                a.total = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetUserInfoInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetUserInfoOutput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b
            };
            this.setUserName = function (b) {
                a.userName = b
            };
            this.setUserPortrait = function (b) {
                a.userPortrait = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetSessionIdInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetSessionIdOutput: function () {
            var a = {};
            this.setSessionId = function (b) {
                a.sessionId = b
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GetQNupTokenInput: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            }
            this.toArrayBuffer = function () {
                return a
            }
        },
        GetQNupTokenOutput: function () {
            var a = {};
            this.setDeadline = function (b) {
                a.deadline = b
            };
            this.setToken = function (b) {
                a.token = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        GetQNdownloadUrlInput: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setKey = function (b) {
                a.key = b;
            };
            this.setFileName = function(b){
                a.fileName = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        GetQNdownloadUrlOutput: function () {
            var a = {};
            this.setDownloadUrl = function (b) {
                a.downloadUrl = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        Add2BlackListInput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        RemoveFromBlackListInput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        QueryBlackListInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        QueryBlackListOutput: function () {
            var a = {};
            this.setUserIds = function (b) {
                a.userIds = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        BlackListStatusInput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        BlockPushInput: function () {
            var a = {};
            this.setBlockeeId = function (b) {
                a.blockeeId = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        ModifyPermissionInput: function () {
            var a = {};
            this.setOpenStatus = function (b) {
                a.openStatus = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupInput: function () {
            var a = {};
            this.setGroupInfo = function (b) {
                for (var i = 0, arr = []; i < b.length; i++) {
                    arr.push({id: b[i].getContent().id, name: b[i].getContent().name})
                }
                a.groupInfo = arr;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupOutput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupInfo: function () {
            var a = {};
            this.setId = function (b) {
                a.id = b;
            };
            this.setName = function (b) {
                a.name = b;
            };
            this.getContent = function () {
                return a;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupHashInput: function () {
            var a = {};
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.setGroupHashCode = function (b) {
                a.groupHashCode = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        GroupHashOutput: function () {
            var a = {};
            this.setResult = function (b) {
                a.result = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChrmInput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChrmOutput: function () {
            var a = {};
            this.setNothing = function (b) {
                a.nothing = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        ChrmPullMsg: function () {
            var a = {};
            this.setSyncTime = function (b) {
                a.syncTime = b
            };
            this.setCount = function (b) {
                a.count = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        RelationsInput: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setMsg = function(b){
                a.msg = b;
            };
            this.setCount = function(b){
              a.count = b;
            };
            this.toArrayBuffer = function () {
                return a
            };
        },
        RelationsOutput: function () {
            var a = {};
            this.setInfo = function (b) {
                a.info = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        RelationInfo: function () {
            var a = {};
            this.setType = function (b) {
                a.type = b;
            };
            this.setUserId = function (b) {
                a.userId = b;
            };
            this.setMsg = function(b){
                a.msg = b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        HistoryMessageInput: function () {
            var a={};
            this.setTargetId=function(b){
                a.targetId=b;
            };
            this.setDataTime=function(b){
                a.dataTime=b;
            };
            this.setSize=function(b){
                a.size=b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        HistoryMessagesOuput: function () {
            var a={};
            this.setList=function(b){
                a.list=b;
            };
            this.setSyncTime=function(b){
                a.syncTime=b;
            };
            this.setHasMsg=function(b){
                a.hasMsg=b;
            };
            this.toArrayBuffer = function () {
                return a
            }
        },
        HistoryMsgInput: function(){
            var a = {};
            this.setTargetId = function(b){
                a.targetId = b;
            };
            this.setTime = function(b){
                a.time = b;
            };
            this.setCount = function(b){
                a.count = b;
            };
            this.setOrder = function(b){
                a.order = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        },
        HistoryMsgOuput: function(){
            var a = {};
            this.setList = function(b){
                a.list = b;
            };
            this.setSyncTime = function(b){
                a.syncTime = b;
            };
            this.setHasMsg = function(b){
                a.hasMsg = b;
            };
            this.toArrayBuffer = function(){
                return a;
            };
        }
    };
    for (var f in Polling) {
        Polling[f].decode = function (b) {
            var back = {}, val = JSON.parse(b) || eval("(" + b + ")");
            for (var i in val) {
                back[i]=val[i];
                back["get"+ i.charAt(0).toUpperCase()+i.slice(1)]=function(){
                    return val[i];
                }
            }
            return back;
        }
    }

/*
 * JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*jslint bitwise: true */
/*global unescape, define, module */

(function ($) {
    'use strict';

    /*
    * Add integers, wrapping at 2^32. This uses 16-bit operations internally
    * to work around bugs in some JS interpreters.
    */
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF),
            msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    /*
    * Bitwise rotate a 32-bit number to the left.
    */
    function bit_rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    /*
    * These functions implement the four basic operations the algorithm uses.
    */
    function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    /*
    * Calculate the MD5 of an array of little-endian words, and a bit length.
    */
    function binl_md5(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;

        var i, olda, oldb, oldc, oldd,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        for (i = 0; i < x.length; i += 16) {
            olda = a;
            oldb = b;
            oldc = c;
            oldd = d;

            a = md5_ff(a, b, c, d, x[i],       7, -680876936);
            d = md5_ff(d, a, b, c, x[i +  1], 12, -389564586);
            c = md5_ff(c, d, a, b, x[i +  2], 17,  606105819);
            b = md5_ff(b, c, d, a, x[i +  3], 22, -1044525330);
            a = md5_ff(a, b, c, d, x[i +  4],  7, -176418897);
            d = md5_ff(d, a, b, c, x[i +  5], 12,  1200080426);
            c = md5_ff(c, d, a, b, x[i +  6], 17, -1473231341);
            b = md5_ff(b, c, d, a, x[i +  7], 22, -45705983);
            a = md5_ff(a, b, c, d, x[i +  8],  7,  1770035416);
            d = md5_ff(d, a, b, c, x[i +  9], 12, -1958414417);
            c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
            b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
            a = md5_ff(a, b, c, d, x[i + 12],  7,  1804603682);
            d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
            c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
            b = md5_ff(b, c, d, a, x[i + 15], 22,  1236535329);

            a = md5_gg(a, b, c, d, x[i +  1],  5, -165796510);
            d = md5_gg(d, a, b, c, x[i +  6],  9, -1069501632);
            c = md5_gg(c, d, a, b, x[i + 11], 14,  643717713);
            b = md5_gg(b, c, d, a, x[i],      20, -373897302);
            a = md5_gg(a, b, c, d, x[i +  5],  5, -701558691);
            d = md5_gg(d, a, b, c, x[i + 10],  9,  38016083);
            c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
            b = md5_gg(b, c, d, a, x[i +  4], 20, -405537848);
            a = md5_gg(a, b, c, d, x[i +  9],  5,  568446438);
            d = md5_gg(d, a, b, c, x[i + 14],  9, -1019803690);
            c = md5_gg(c, d, a, b, x[i +  3], 14, -187363961);
            b = md5_gg(b, c, d, a, x[i +  8], 20,  1163531501);
            a = md5_gg(a, b, c, d, x[i + 13],  5, -1444681467);
            d = md5_gg(d, a, b, c, x[i +  2],  9, -51403784);
            c = md5_gg(c, d, a, b, x[i +  7], 14,  1735328473);
            b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

            a = md5_hh(a, b, c, d, x[i +  5],  4, -378558);
            d = md5_hh(d, a, b, c, x[i +  8], 11, -2022574463);
            c = md5_hh(c, d, a, b, x[i + 11], 16,  1839030562);
            b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
            a = md5_hh(a, b, c, d, x[i +  1],  4, -1530992060);
            d = md5_hh(d, a, b, c, x[i +  4], 11,  1272893353);
            c = md5_hh(c, d, a, b, x[i +  7], 16, -155497632);
            b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
            a = md5_hh(a, b, c, d, x[i + 13],  4,  681279174);
            d = md5_hh(d, a, b, c, x[i],      11, -358537222);
            c = md5_hh(c, d, a, b, x[i +  3], 16, -722521979);
            b = md5_hh(b, c, d, a, x[i +  6], 23,  76029189);
            a = md5_hh(a, b, c, d, x[i +  9],  4, -640364487);
            d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
            c = md5_hh(c, d, a, b, x[i + 15], 16,  530742520);
            b = md5_hh(b, c, d, a, x[i +  2], 23, -995338651);

            a = md5_ii(a, b, c, d, x[i],       6, -198630844);
            d = md5_ii(d, a, b, c, x[i +  7], 10,  1126891415);
            c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
            b = md5_ii(b, c, d, a, x[i +  5], 21, -57434055);
            a = md5_ii(a, b, c, d, x[i + 12],  6,  1700485571);
            d = md5_ii(d, a, b, c, x[i +  3], 10, -1894986606);
            c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
            b = md5_ii(b, c, d, a, x[i +  1], 21, -2054922799);
            a = md5_ii(a, b, c, d, x[i +  8],  6,  1873313359);
            d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
            c = md5_ii(c, d, a, b, x[i +  6], 15, -1560198380);
            b = md5_ii(b, c, d, a, x[i + 13], 21,  1309151649);
            a = md5_ii(a, b, c, d, x[i +  4],  6, -145523070);
            d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
            c = md5_ii(c, d, a, b, x[i +  2], 15,  718787259);
            b = md5_ii(b, c, d, a, x[i +  9], 21, -343485551);

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
        }
        return [a, b, c, d];
    }

    /*
    * Convert an array of little-endian words to a string
    */
    function binl2rstr(input) {
        var i,
            output = '';
        for (i = 0; i < input.length * 32; i += 8) {
            output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
    }

    /*
    * Convert a raw string to an array of little-endian words
    * Characters >255 have their high-byte silently ignored.
    */
    function rstr2binl(input) {
        var i,
            output = [];
        output[(input.length >> 2) - 1] = undefined;
        for (i = 0; i < output.length; i += 1) {
            output[i] = 0;
        }
        for (i = 0; i < input.length * 8; i += 8) {
            output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
        }
        return output;
    }

    /*
    * Calculate the MD5 of a raw string
    */
    function rstr_md5(s) {
        return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
    }

    /*
    * Calculate the HMAC-MD5, of a key and some data (raw strings)
    */
    function rstr_hmac_md5(key, data) {
        var i,
            bkey = rstr2binl(key),
            ipad = [],
            opad = [],
            hash;
        ipad[15] = opad[15] = undefined;
        if (bkey.length > 16) {
            bkey = binl_md5(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
    }

    /*
    * Convert a raw string to a hex string
    */
    function rstr2hex(input) {
        var hex_tab = '0123456789abcdef',
            output = '',
            x,
            i;
        for (i = 0; i < input.length; i += 1) {
            x = input.charCodeAt(i);
            output += hex_tab.charAt((x >>> 4) & 0x0F) +
                hex_tab.charAt(x & 0x0F);
        }
        return output;
    }

    /*
    * Encode a string as utf-8
    */
    function str2rstr_utf8(input) {
        return unescape(encodeURIComponent(input));
    }

    /*
    * Take string arguments and return either raw or hex encoded strings
    */
    function raw_md5(s) {
        return rstr_md5(str2rstr_utf8(s));
    }
    function hex_md5(s) {
        return rstr2hex(raw_md5(s));
    }
    function raw_hmac_md5(k, d) {
        return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d));
    }
    function hex_hmac_md5(k, d) {
        return rstr2hex(raw_hmac_md5(k, d));
    }

    function md5(string, key, raw) {
        if (!key) {
            if (!raw) {
                return hex_md5(string);
            }
            return raw_md5(string);
        }
        if (!raw) {
            return hex_hmac_md5(key, string);
        }
        return raw_hmac_md5(key, string);
    }
    $.md5 = md5;
    if (typeof define === 'function' && define.amd) {
        define('md5',function () {
            return md5;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = md5;
    } else {
        $.md5 = md5;
    }
}(this));

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RongIMLib;
(function (RongIMLib) {
    (function (MentionedType) {
        MentionedType[MentionedType["ALL"] = 1] = "ALL";
        MentionedType[MentionedType["PART"] = 2] = "PART";
    })(RongIMLib.MentionedType || (RongIMLib.MentionedType = {}));
    var MentionedType = RongIMLib.MentionedType;
    (function (MethodType) {
        MethodType[MethodType["CUSTOMER_SERVICE"] = 1] = "CUSTOMER_SERVICE";
        MethodType[MethodType["RECALL"] = 2] = "RECALL";
    })(RongIMLib.MethodType || (RongIMLib.MethodType = {}));
    var MethodType = RongIMLib.MethodType;
    (function (BlacklistStatus) {
        /**
         * åœ¨é»‘åå•ä¸­ã€‚
         */
        BlacklistStatus[BlacklistStatus["IN_BLACK_LIST"] = 0] = "IN_BLACK_LIST";
        /**
         * ä¸åœ¨é»‘åå•ä¸­ã€‚
         */
        BlacklistStatus[BlacklistStatus["NOT_IN_BLACK_LIST"] = 1] = "NOT_IN_BLACK_LIST";
    })(RongIMLib.BlacklistStatus || (RongIMLib.BlacklistStatus = {}));
    var BlacklistStatus = RongIMLib.BlacklistStatus;
    (function (ConnectionChannel) {
        ConnectionChannel[ConnectionChannel["XHR_POLLING"] = 0] = "XHR_POLLING";
        ConnectionChannel[ConnectionChannel["WEBSOCKET"] = 1] = "WEBSOCKET";
        //å¤–éƒ¨è°ƒç”¨
        ConnectionChannel[ConnectionChannel["HTTP"] = 0] = "HTTP";
        //å¤–éƒ¨è°ƒç”¨
        ConnectionChannel[ConnectionChannel["HTTPS"] = 1] = "HTTPS";
    })(RongIMLib.ConnectionChannel || (RongIMLib.ConnectionChannel = {}));
    var ConnectionChannel = RongIMLib.ConnectionChannel;
    (function (CustomerType) {
        CustomerType[CustomerType["ONLY_ROBOT"] = 1] = "ONLY_ROBOT";
        CustomerType[CustomerType["ONLY_HUMAN"] = 2] = "ONLY_HUMAN";
        CustomerType[CustomerType["ROBOT_FIRST"] = 3] = "ROBOT_FIRST";
        CustomerType[CustomerType["HUMAN_FIRST"] = 4] = "HUMAN_FIRST";
    })(RongIMLib.CustomerType || (RongIMLib.CustomerType = {}));
    var CustomerType = RongIMLib.CustomerType;
    (function (GetChatRoomType) {
        GetChatRoomType[GetChatRoomType["NONE"] = 0] = "NONE";
        GetChatRoomType[GetChatRoomType["SQQUENCE"] = 1] = "SQQUENCE";
        GetChatRoomType[GetChatRoomType["REVERSE"] = 2] = "REVERSE";
    })(RongIMLib.GetChatRoomType || (RongIMLib.GetChatRoomType = {}));
    var GetChatRoomType = RongIMLib.GetChatRoomType;
    (function (ConnectionStatus) {
        /**
         * è¿žæŽ¥æˆåŠŸã€‚
         */
        ConnectionStatus[ConnectionStatus["CONNECTED"] = 0] = "CONNECTED";
        /**
         * è¿žæŽ¥ä¸­ã€‚
         */
        ConnectionStatus[ConnectionStatus["CONNECTING"] = 1] = "CONNECTING";
        /**
         * æ–­å¼€è¿žæŽ¥ã€‚
         */
        ConnectionStatus[ConnectionStatus["DISCONNECTED"] = 2] = "DISCONNECTED";
        /**
         * ç”¨æˆ·è´¦æˆ·åœ¨å…¶ä»–è®¾å¤‡ç™»å½•ï¼Œæœ¬æœºä¼šè¢«è¸¢æŽ‰çº¿ã€‚
         */
        ConnectionStatus[ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"] = 6] = "KICKED_OFFLINE_BY_OTHER_CLIENT";
        /**
         * ç½‘ç»œä¸å¯ç”¨ã€‚
         */
        ConnectionStatus[ConnectionStatus["NETWORK_UNAVAILABLE"] = 3] = "NETWORK_UNAVAILABLE";
        /**
         * åŸŸåé”™è¯¯
         */
        ConnectionStatus[ConnectionStatus["DOMAIN_INCORRECT"] = 12] = "DOMAIN_INCORRECT";
        /**
        *  è¿žæŽ¥å…³é—­ã€‚
        */
        ConnectionStatus[ConnectionStatus["CONNECTION_CLOSED"] = 4] = "CONNECTION_CLOSED";
    })(RongIMLib.ConnectionStatus || (RongIMLib.ConnectionStatus = {}));
    var ConnectionStatus = RongIMLib.ConnectionStatus;
    (function (ConversationNotificationStatus) {
        /**
         * å…æ‰“æ‰°çŠ¶æ€ï¼Œå…³é—­å¯¹åº”ä¼šè¯çš„é€šçŸ¥æé†’ã€‚
         */
        ConversationNotificationStatus[ConversationNotificationStatus["DO_NOT_DISTURB"] = 0] = "DO_NOT_DISTURB";
        /**
         * æé†’ã€‚
         */
        ConversationNotificationStatus[ConversationNotificationStatus["NOTIFY"] = 1] = "NOTIFY";
    })(RongIMLib.ConversationNotificationStatus || (RongIMLib.ConversationNotificationStatus = {}));
    var ConversationNotificationStatus = RongIMLib.ConversationNotificationStatus;
    (function (ConversationType) {
        ConversationType[ConversationType["NONE"] = 0] = "NONE";
        ConversationType[ConversationType["PRIVATE"] = 1] = "PRIVATE";
        ConversationType[ConversationType["DISCUSSION"] = 2] = "DISCUSSION";
        ConversationType[ConversationType["GROUP"] = 3] = "GROUP";
        ConversationType[ConversationType["CHATROOM"] = 4] = "CHATROOM";
        ConversationType[ConversationType["CUSTOMER_SERVICE"] = 5] = "CUSTOMER_SERVICE";
        ConversationType[ConversationType["SYSTEM"] = 6] = "SYSTEM";
        //é»˜è®¤å…³æ³¨ MC
        ConversationType[ConversationType["APP_PUBLIC_SERVICE"] = 7] = "APP_PUBLIC_SERVICE";
        //æ‰‹å·¥å…³æ³¨ MP
        ConversationType[ConversationType["PUBLIC_SERVICE"] = 8] = "PUBLIC_SERVICE";
    })(RongIMLib.ConversationType || (RongIMLib.ConversationType = {}));
    var ConversationType = RongIMLib.ConversationType;
    (function (DiscussionInviteStatus) {
        /**
         * å¼€æ”¾é‚€è¯·ã€‚
         */
        DiscussionInviteStatus[DiscussionInviteStatus["OPENED"] = 0] = "OPENED";
        /**
         * å…³é—­é‚€è¯·ã€‚
         */
        DiscussionInviteStatus[DiscussionInviteStatus["CLOSED"] = 1] = "CLOSED";
    })(RongIMLib.DiscussionInviteStatus || (RongIMLib.DiscussionInviteStatus = {}));
    var DiscussionInviteStatus = RongIMLib.DiscussionInviteStatus;
    (function (ErrorCode) {
        /**
         * å‘é€é¢‘çŽ‡è¿‡å¿«
         */
        ErrorCode[ErrorCode["SEND_FREQUENCY_TOO_FAST"] = 20604] = "SEND_FREQUENCY_TOO_FAST";
        ErrorCode[ErrorCode["RC_MSG_UNAUTHORIZED"] = 20406] = "RC_MSG_UNAUTHORIZED";
        /**
         * ç¾¤ç»„ Id æ— æ•ˆ
         */
        ErrorCode[ErrorCode["RC_DISCUSSION_GROUP_ID_INVALID"] = 20407] = "RC_DISCUSSION_GROUP_ID_INVALID";
        /**
         * ç¾¤ç»„è¢«ç¦è¨€
         */
        ErrorCode[ErrorCode["FORBIDDEN_IN_GROUP"] = 22408] = "FORBIDDEN_IN_GROUP";
        /**
         * ä¸åœ¨è®¨è®ºç»„ã€‚
         */
        ErrorCode[ErrorCode["NOT_IN_DISCUSSION"] = 21406] = "NOT_IN_DISCUSSION";
        /**
         * ä¸åœ¨ç¾¤ç»„ã€‚
         */
        ErrorCode[ErrorCode["NOT_IN_GROUP"] = 22406] = "NOT_IN_GROUP";
        /**
         * ä¸åœ¨èŠå¤©å®¤ã€‚
         */
        ErrorCode[ErrorCode["NOT_IN_CHATROOM"] = 23406] = "NOT_IN_CHATROOM";
        /**
         *èŠå¤©å®¤è¢«ç¦è¨€
         */
        ErrorCode[ErrorCode["FORBIDDEN_IN_CHATROOM"] = 23408] = "FORBIDDEN_IN_CHATROOM";
        /**
         * èŠå¤©å®¤ä¸­æˆå‘˜è¢«è¸¢å‡º
         */
        ErrorCode[ErrorCode["RC_CHATROOM_USER_KICKED"] = 23409] = "RC_CHATROOM_USER_KICKED";
        /**
         * èŠå¤©å®¤ä¸å­˜åœ¨
         */
        ErrorCode[ErrorCode["RC_CHATROOM_NOT_EXIST"] = 23410] = "RC_CHATROOM_NOT_EXIST";
        /**
         * èŠå¤©å®¤æˆå‘˜å·²æ»¡
         */
        ErrorCode[ErrorCode["RC_CHATROOM_IS_FULL"] = 23411] = "RC_CHATROOM_IS_FULL";
        /**
         * èŽ·å–èŠå¤©å®¤ä¿¡æ¯å‚æ•°æ— æ•ˆ
         */
        ErrorCode[ErrorCode["RC_CHATROOM_PATAMETER_INVALID"] = 23412] = "RC_CHATROOM_PATAMETER_INVALID";
        /**
         * èŠå¤©å®¤å¼‚å¸¸
         */
        ErrorCode[ErrorCode["CHATROOM_GET_HISTORYMSG_ERROR"] = 23413] = "CHATROOM_GET_HISTORYMSG_ERROR";
        /**
         * æ²¡æœ‰æ‰“å¼€èŠå¤©å®¤æ¶ˆæ¯å­˜å‚¨
         */
        ErrorCode[ErrorCode["CHATROOM_NOT_OPEN_HISTORYMSG_STORE"] = 23414] = "CHATROOM_NOT_OPEN_HISTORYMSG_STORE";
        ErrorCode[ErrorCode["TIMEOUT"] = -1] = "TIMEOUT";
        /**
         * æœªçŸ¥åŽŸå› å¤±è´¥ã€‚
         */
        ErrorCode[ErrorCode["UNKNOWN"] = -2] = "UNKNOWN";
        /**
         * åŠ å…¥è®¨è®ºå¤±è´¥
         */
        ErrorCode[ErrorCode["JOIN_IN_DISCUSSION"] = 21407] = "JOIN_IN_DISCUSSION";
        /**
         * åˆ›å»ºè®¨è®ºç»„å¤±è´¥
         */
        ErrorCode[ErrorCode["CREATE_DISCUSSION"] = 21408] = "CREATE_DISCUSSION";
        /**
         * è®¾ç½®è®¨è®ºç»„é‚€è¯·çŠ¶æ€å¤±è´¥
         */
        ErrorCode[ErrorCode["INVITE_DICUSSION"] = 21409] = "INVITE_DICUSSION";
        /**
         *èŽ·å–ç”¨æˆ·å¤±è´¥
         */
        ErrorCode[ErrorCode["GET_USERINFO_ERROR"] = 23407] = "GET_USERINFO_ERROR";
        /**
         * åœ¨é»‘åå•ä¸­ã€‚
         */
        ErrorCode[ErrorCode["REJECTED_BY_BLACKLIST"] = 405] = "REJECTED_BY_BLACKLIST";
        /**
         * é€šä¿¡è¿‡ç¨‹ä¸­ï¼Œå½“å‰ Socket ä¸å­˜åœ¨ã€‚
         */
        ErrorCode[ErrorCode["RC_NET_CHANNEL_INVALID"] = 30001] = "RC_NET_CHANNEL_INVALID";
        /**
         * Socket è¿žæŽ¥ä¸å¯ç”¨ã€‚
         */
        ErrorCode[ErrorCode["RC_NET_UNAVAILABLE"] = 30002] = "RC_NET_UNAVAILABLE";
        /**
         * é€šä¿¡è¶…æ—¶ã€‚
         */
        ErrorCode[ErrorCode["RC_MSG_RESP_TIMEOUT"] = 30003] = "RC_MSG_RESP_TIMEOUT";
        /**
         * å¯¼èˆªæ“ä½œæ—¶ï¼ŒHttp è¯·æ±‚å¤±è´¥ã€‚
         */
        ErrorCode[ErrorCode["RC_HTTP_SEND_FAIL"] = 30004] = "RC_HTTP_SEND_FAIL";
        /**
         * HTTP è¯·æ±‚å¤±è´¥ã€‚
         */
        ErrorCode[ErrorCode["RC_HTTP_REQ_TIMEOUT"] = 30005] = "RC_HTTP_REQ_TIMEOUT";
        /**
         * HTTP æŽ¥æ”¶å¤±è´¥ã€‚
         */
        ErrorCode[ErrorCode["RC_HTTP_RECV_FAIL"] = 30006] = "RC_HTTP_RECV_FAIL";
        /**
         * å¯¼èˆªæ“ä½œçš„ HTTP è¯·æ±‚ï¼Œè¿”å›žä¸æ˜¯200ã€‚
         */
        ErrorCode[ErrorCode["RC_NAVI_RESOURCE_ERROR"] = 30007] = "RC_NAVI_RESOURCE_ERROR";
        /**
         * å¯¼èˆªæ•°æ®è§£æžåŽï¼Œå…¶ä¸­ä¸å­˜åœ¨æœ‰æ•ˆæ•°æ®ã€‚
         */
        ErrorCode[ErrorCode["RC_NODE_NOT_FOUND"] = 30008] = "RC_NODE_NOT_FOUND";
        /**
         * å¯¼èˆªæ•°æ®è§£æžåŽï¼Œå…¶ä¸­ä¸å­˜åœ¨æœ‰æ•ˆ IP åœ°å€ã€‚
         */
        ErrorCode[ErrorCode["RC_DOMAIN_NOT_RESOLVE"] = 30009] = "RC_DOMAIN_NOT_RESOLVE";
        /**
         * åˆ›å»º Socket å¤±è´¥ã€‚
         */
        ErrorCode[ErrorCode["RC_SOCKET_NOT_CREATED"] = 30010] = "RC_SOCKET_NOT_CREATED";
        /**
         * Socket è¢«æ–­å¼€ã€‚
         */
        ErrorCode[ErrorCode["RC_SOCKET_DISCONNECTED"] = 30011] = "RC_SOCKET_DISCONNECTED";
        /**
         * PING æ“ä½œå¤±è´¥ã€‚
         */
        ErrorCode[ErrorCode["RC_PING_SEND_FAIL"] = 30012] = "RC_PING_SEND_FAIL";
        /**
         * PING è¶…æ—¶ã€‚
         */
        ErrorCode[ErrorCode["RC_PONG_RECV_FAIL"] = 30013] = "RC_PONG_RECV_FAIL";
        /**
         * æ¶ˆæ¯å‘é€å¤±è´¥ã€‚
         */
        ErrorCode[ErrorCode["RC_MSG_SEND_FAIL"] = 30014] = "RC_MSG_SEND_FAIL";
        /**
         * åš connect è¿žæŽ¥æ—¶ï¼Œæ”¶åˆ°çš„ ACK è¶…æ—¶ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_ACK_TIMEOUT"] = 31000] = "RC_CONN_ACK_TIMEOUT";
        /**
         * å‚æ•°é”™è¯¯ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_PROTO_VERSION_ERROR"] = 31001] = "RC_CONN_PROTO_VERSION_ERROR";
        /**
         * å‚æ•°é”™è¯¯ï¼ŒApp Id é”™è¯¯ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_ID_REJECT"] = 31002] = "RC_CONN_ID_REJECT";
        /**
         * æœåŠ¡å™¨ä¸å¯ç”¨ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_SERVER_UNAVAILABLE"] = 31003] = "RC_CONN_SERVER_UNAVAILABLE";
        /**
         * Token é”™è¯¯ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_USER_OR_PASSWD_ERROR"] = 31004] = "RC_CONN_USER_OR_PASSWD_ERROR";
        /**
         * App Id ä¸Ž Token ä¸åŒ¹é…ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_NOT_AUTHRORIZED"] = 31005] = "RC_CONN_NOT_AUTHRORIZED";
        /**
         * é‡å®šå‘ï¼Œåœ°å€é”™è¯¯ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_REDIRECTED"] = 31006] = "RC_CONN_REDIRECTED";
        /**
         * NAME ä¸ŽåŽå°æ³¨å†Œä¿¡æ¯ä¸ä¸€è‡´ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_PACKAGE_NAME_INVALID"] = 31007] = "RC_CONN_PACKAGE_NAME_INVALID";
        /**
         * APP è¢«å±è”½ã€åˆ é™¤æˆ–ä¸å­˜åœ¨ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_APP_BLOCKED_OR_DELETED"] = 31008] = "RC_CONN_APP_BLOCKED_OR_DELETED";
        /**
         * ç”¨æˆ·è¢«å±è”½ã€‚
         */
        ErrorCode[ErrorCode["RC_CONN_USER_BLOCKED"] = 31009] = "RC_CONN_USER_BLOCKED";
        /**
         * Disconnectï¼Œç”±æœåŠ¡å™¨è¿”å›žï¼Œæ¯”å¦‚ç”¨æˆ·äº’è¸¢ã€‚
         */
        ErrorCode[ErrorCode["RC_DISCONN_KICK"] = 31010] = "RC_DISCONN_KICK";
        /**
         * Disconnectï¼Œç”±æœåŠ¡å™¨è¿”å›žï¼Œæ¯”å¦‚ç”¨æˆ·äº’è¸¢ã€‚
         */
        ErrorCode[ErrorCode["RC_DISCONN_EXCEPTION"] = 31011] = "RC_DISCONN_EXCEPTION";
        /**
         * åè®®å±‚å†…éƒ¨é”™è¯¯ã€‚queryï¼Œä¸Šä¼ ä¸‹è½½è¿‡ç¨‹ä¸­æ•°æ®é”™è¯¯ã€‚
         */
        ErrorCode[ErrorCode["RC_QUERY_ACK_NO_DATA"] = 32001] = "RC_QUERY_ACK_NO_DATA";
        /**
         * åè®®å±‚å†…éƒ¨é”™è¯¯ã€‚
         */
        ErrorCode[ErrorCode["RC_MSG_DATA_INCOMPLETE"] = 32002] = "RC_MSG_DATA_INCOMPLETE";
        /**
         * æœªè°ƒç”¨ init åˆå§‹åŒ–å‡½æ•°ã€‚
         */
        ErrorCode[ErrorCode["BIZ_ERROR_CLIENT_NOT_INIT"] = 33001] = "BIZ_ERROR_CLIENT_NOT_INIT";
        /**
         * æ•°æ®åº“åˆå§‹åŒ–å¤±è´¥ã€‚
         */
        ErrorCode[ErrorCode["BIZ_ERROR_DATABASE_ERROR"] = 33002] = "BIZ_ERROR_DATABASE_ERROR";
        /**
         * ä¼ å…¥å‚æ•°æ— æ•ˆã€‚
         */
        ErrorCode[ErrorCode["BIZ_ERROR_INVALID_PARAMETER"] = 33003] = "BIZ_ERROR_INVALID_PARAMETER";
        /**
         * é€šé“æ— æ•ˆã€‚
         */
        ErrorCode[ErrorCode["BIZ_ERROR_NO_CHANNEL"] = 33004] = "BIZ_ERROR_NO_CHANNEL";
        /**
         * é‡æ–°è¿žæŽ¥æˆåŠŸã€‚
         */
        ErrorCode[ErrorCode["BIZ_ERROR_RECONNECT_SUCCESS"] = 33005] = "BIZ_ERROR_RECONNECT_SUCCESS";
        /**
         * è¿žæŽ¥ä¸­ï¼Œå†è°ƒç”¨ connect è¢«æ‹’ç»ã€‚
         */
        ErrorCode[ErrorCode["BIZ_ERROR_CONNECTING"] = 33006] = "BIZ_ERROR_CONNECTING";
        /**
         * æ¶ˆæ¯æ¼«æ¸¸æœåŠ¡æœªå¼€é€š
         */
        ErrorCode[ErrorCode["MSG_ROAMING_SERVICE_UNAVAILABLE"] = 33007] = "MSG_ROAMING_SERVICE_UNAVAILABLE";
        ErrorCode[ErrorCode["MSG_INSERT_ERROR"] = 33008] = "MSG_INSERT_ERROR";
        ErrorCode[ErrorCode["MSG_DEL_ERROR"] = 33009] = "MSG_DEL_ERROR";
        /**
         * åˆ é™¤ä¼šè¯å¤±è´¥
         */
        ErrorCode[ErrorCode["CONVER_REMOVE_ERROR"] = 34001] = "CONVER_REMOVE_ERROR";
        /**
         *æ‹‰å–åŽ†å²æ¶ˆæ¯
         */
        ErrorCode[ErrorCode["CONVER_GETLIST_ERROR"] = 34002] = "CONVER_GETLIST_ERROR";
        /**
         * ä¼šè¯æŒ‡å®šå¼‚å¸¸
         */
        ErrorCode[ErrorCode["CONVER_SETOP_ERROR"] = 34003] = "CONVER_SETOP_ERROR";
        /**
         * èŽ·å–ä¼šè¯æœªè¯»æ¶ˆæ¯æ€»æ•°å¤±è´¥
         */
        ErrorCode[ErrorCode["CONVER_TOTAL_UNREAD_ERROR"] = 34004] = "CONVER_TOTAL_UNREAD_ERROR";
        /**
         * èŽ·å–æŒ‡å®šä¼šè¯ç±»åž‹æœªè¯»æ¶ˆæ¯æ•°å¼‚å¸¸
         */
        ErrorCode[ErrorCode["CONVER_TYPE_UNREAD_ERROR"] = 34005] = "CONVER_TYPE_UNREAD_ERROR";
        /**
         * èŽ·å–æŒ‡å®šç”¨æˆ·ID&ä¼šè¯ç±»åž‹æœªè¯»æ¶ˆæ¯æ•°å¼‚å¸¸
         */
        ErrorCode[ErrorCode["CONVER_ID_TYPE_UNREAD_ERROR"] = 34006] = "CONVER_ID_TYPE_UNREAD_ERROR";
        ErrorCode[ErrorCode["CONVER_CLEAR_ERROR"] = 34007] = "CONVER_CLEAR_ERROR";
        ErrorCode[ErrorCode["CONVER_GET_ERROR"] = 34008] = "CONVER_GET_ERROR";
        //ç¾¤ç»„å¼‚å¸¸ä¿¡æ¯
        /**
         *
         */
        ErrorCode[ErrorCode["GROUP_SYNC_ERROR"] = 35001] = "GROUP_SYNC_ERROR";
        /**
         * åŒ¹é…ç¾¤ä¿¡æ¯ç³»å¼‚å¸¸
         */
        ErrorCode[ErrorCode["GROUP_MATCH_ERROR"] = 35002] = "GROUP_MATCH_ERROR";
        //èŠå¤©å®¤å¼‚å¸¸
        /**
         * åŠ å…¥èŠå¤©å®¤Idä¸ºç©º
         */
        ErrorCode[ErrorCode["CHATROOM_ID_ISNULL"] = 36001] = "CHATROOM_ID_ISNULL";
        /**
         * åŠ å…¥èŠå¤©å®¤å¤±è´¥
         */
        ErrorCode[ErrorCode["CHARTOOM_JOIN_ERROR"] = 36002] = "CHARTOOM_JOIN_ERROR";
        /**
         * æ‹‰å–èŠå¤©å®¤åŽ†å²æ¶ˆæ¯å¤±è´¥
         */
        ErrorCode[ErrorCode["CHATROOM_HISMESSAGE_ERROR"] = 36003] = "CHATROOM_HISMESSAGE_ERROR";
        //é»‘åå•å¼‚å¸¸
        /**
         * åŠ å…¥é»‘åå•å¼‚å¸¸
         */
        ErrorCode[ErrorCode["BLACK_ADD_ERROR"] = 37001] = "BLACK_ADD_ERROR";
        /**
         * èŽ·å¾—æŒ‡å®šäººå‘˜å†é»‘åå•ä¸­çš„çŠ¶æ€å¼‚å¸¸
         */
        ErrorCode[ErrorCode["BLACK_GETSTATUS_ERROR"] = 37002] = "BLACK_GETSTATUS_ERROR";
        /**
         * ç§»é™¤é»‘åå•å¼‚å¸¸
         */
        ErrorCode[ErrorCode["BLACK_REMOVE_ERROR"] = 37003] = "BLACK_REMOVE_ERROR";
        /**
         * èŽ·å–è‰ç¨¿å¤±è´¥
         */
        ErrorCode[ErrorCode["DRAF_GET_ERROR"] = 38001] = "DRAF_GET_ERROR";
        /**
         * ä¿å­˜è‰ç¨¿å¤±è´¥
         */
        ErrorCode[ErrorCode["DRAF_SAVE_ERROR"] = 38002] = "DRAF_SAVE_ERROR";
        /**
         * åˆ é™¤è‰ç¨¿å¤±è´¥
         */
        ErrorCode[ErrorCode["DRAF_REMOVE_ERROR"] = 38003] = "DRAF_REMOVE_ERROR";
        /**
         * å…³æ³¨å…¬ä¼—å·å¤±è´¥
         */
        ErrorCode[ErrorCode["SUBSCRIBE_ERROR"] = 39001] = "SUBSCRIBE_ERROR";
        /**
         * å…³æ³¨å…¬ä¼—å·å¤±è´¥
         */
        ErrorCode[ErrorCode["QNTKN_FILETYPE_ERROR"] = 41001] = "QNTKN_FILETYPE_ERROR";
        /**
         * èŽ·å–ä¸ƒç‰›tokenå¤±è´¥
         */
        ErrorCode[ErrorCode["QNTKN_GET_ERROR"] = 41002] = "QNTKN_GET_ERROR";
        /**
         * cookieè¢«ç¦ç”¨
         */
        ErrorCode[ErrorCode["COOKIE_ENABLE"] = 51001] = "COOKIE_ENABLE";
        ErrorCode[ErrorCode["GET_MESSAGE_BY_ID_ERROR"] = 61001] = "GET_MESSAGE_BY_ID_ERROR";
        // æ²¡æœ‰æ³¨å†ŒDeviveId ä¹Ÿå°±æ˜¯ç”¨æˆ·æ²¡æœ‰ç™»é™†
        ErrorCode[ErrorCode["HAVNODEVICEID"] = 24001] = "HAVNODEVICEID";
        // å·²ç»å­˜åœ¨
        ErrorCode[ErrorCode["DEVICEIDISHAVE"] = 24002] = "DEVICEIDISHAVE";
        // æˆåŠŸ
        ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
        // æ²¡æœ‰å¯¹åº”çš„ç”¨æˆ·æˆ–token
        ErrorCode[ErrorCode["FEILD"] = 24009] = "FEILD";
        // voipä¸ºç©º
        ErrorCode[ErrorCode["VOIPISNULL"] = 24013] = "VOIPISNULL";
        // ä¸æ”¯æŒçš„Voipå¼•æ“Ž
        ErrorCode[ErrorCode["NOENGINETYPE"] = 24010] = "NOENGINETYPE";
        // channleName æ˜¯ç©º
        ErrorCode[ErrorCode["NULLCHANNELNAME"] = 24011] = "NULLCHANNELNAME";
        // ç”ŸæˆVoipkeyå¤±è´¥
        ErrorCode[ErrorCode["VOIPDYANMICERROR"] = 24012] = "VOIPDYANMICERROR";
        // æ²¡æœ‰é…ç½®voip
        ErrorCode[ErrorCode["NOVOIP"] = 24014] = "NOVOIP";
        // æœåŠ¡å™¨å†…éƒ¨é”™è¯¯
        ErrorCode[ErrorCode["INTERNALERRROR"] = 24015] = "INTERNALERRROR";
        //VOIP close
        ErrorCode[ErrorCode["VOIPCLOSE"] = 24016] = "VOIPCLOSE";
        ErrorCode[ErrorCode["CLOSE_BEFORE_OPEN"] = 51001] = "CLOSE_BEFORE_OPEN";
        ErrorCode[ErrorCode["ALREADY_IN_USE"] = 51002] = "ALREADY_IN_USE";
        ErrorCode[ErrorCode["INVALID_CHANNEL_NAME"] = 51003] = "INVALID_CHANNEL_NAME";
        ErrorCode[ErrorCode["VIDEO_CONTAINER_IS_NULL"] = 51004] = "VIDEO_CONTAINER_IS_NULL";
        /**
        * åˆ é™¤æ¶ˆæ¯æ•°ç»„é•¿åº¦ä¸º 0 .
        */
        ErrorCode[ErrorCode["DELETE_MESSAGE_ID_IS_NULL"] = 61001] = "DELETE_MESSAGE_ID_IS_NULL";
        /*!
        å·±æ–¹å–æ¶ˆå·²å‘å‡ºçš„é€šè¯è¯·æ±‚
        */
        ErrorCode[ErrorCode["CANCEL"] = 1] = "CANCEL";
        /*!
         å·±æ–¹æ‹’ç»æ”¶åˆ°çš„é€šè¯è¯·æ±‚
         */
        ErrorCode[ErrorCode["REJECT"] = 2] = "REJECT";
        /*!
         å·±æ–¹æŒ‚æ–­
         */
        ErrorCode[ErrorCode["HANGUP"] = 3] = "HANGUP";
        /*!
         å·±æ–¹å¿™ç¢Œ
         */
        ErrorCode[ErrorCode["BUSYLINE"] = 4] = "BUSYLINE";
        /*!
         å·±æ–¹æœªæŽ¥å¬
         */
        ErrorCode[ErrorCode["NO_RESPONSE"] = 5] = "NO_RESPONSE";
        /*!
         å·±æ–¹ä¸æ”¯æŒå½“å‰å¼•æ“Ž
         */
        ErrorCode[ErrorCode["ENGINE_UN_SUPPORTED"] = 6] = "ENGINE_UN_SUPPORTED";
        /*!
         å·±æ–¹ç½‘ç»œå‡ºé”™
         */
        ErrorCode[ErrorCode["NETWORK_ERROR"] = 7] = "NETWORK_ERROR";
        /*!
         å¯¹æ–¹å–æ¶ˆå·²å‘å‡ºçš„é€šè¯è¯·æ±‚
         */
        ErrorCode[ErrorCode["REMOTE_CANCEL"] = 11] = "REMOTE_CANCEL";
        /*!
         å¯¹æ–¹æ‹’ç»æ”¶åˆ°çš„é€šè¯è¯·æ±‚
         */
        ErrorCode[ErrorCode["REMOTE_REJECT"] = 12] = "REMOTE_REJECT";
        /*!
         é€šè¯è¿‡ç¨‹å¯¹æ–¹æŒ‚æ–­
         */
        ErrorCode[ErrorCode["REMOTE_HANGUP"] = 13] = "REMOTE_HANGUP";
        /*!
         å¯¹æ–¹å¿™ç¢Œ
         */
        ErrorCode[ErrorCode["REMOTE_BUSYLINE"] = 14] = "REMOTE_BUSYLINE";
        /*!
         å¯¹æ–¹æœªæŽ¥å¬
         */
        ErrorCode[ErrorCode["REMOTE_NO_RESPONSE"] = 15] = "REMOTE_NO_RESPONSE";
        /*!
         å¯¹æ–¹ç½‘ç»œé”™è¯¯
         */
        ErrorCode[ErrorCode["REMOTE_ENGINE_UN_SUPPORTED"] = 16] = "REMOTE_ENGINE_UN_SUPPORTED";
        /*!
         å¯¹æ–¹ç½‘ç»œé”™è¯¯
         */
        ErrorCode[ErrorCode["REMOTE_NETWORK_ERROR"] = 17] = "REMOTE_NETWORK_ERROR";
        /*!
         VoIP ä¸å¯ç”¨
         */
        ErrorCode[ErrorCode["VOIP_NOT_AVALIABLE"] = 18] = "VOIP_NOT_AVALIABLE";
    })(RongIMLib.ErrorCode || (RongIMLib.ErrorCode = {}));
    var ErrorCode = RongIMLib.ErrorCode;
    (function (VoIPMediaType) {
        VoIPMediaType[VoIPMediaType["MEDIA_AUDIO"] = 1] = "MEDIA_AUDIO";
        VoIPMediaType[VoIPMediaType["MEDIA_VEDIO"] = 2] = "MEDIA_VEDIO";
    })(RongIMLib.VoIPMediaType || (RongIMLib.VoIPMediaType = {}));
    var VoIPMediaType = RongIMLib.VoIPMediaType;
    (function (MediaType) {
        /**
         * å›¾ç‰‡ã€‚
         */
        MediaType[MediaType["IMAGE"] = 1] = "IMAGE";
        /**
         * å£°éŸ³ã€‚
         */
        MediaType[MediaType["AUDIO"] = 2] = "AUDIO";
        /**
         * è§†é¢‘ã€‚
         */
        MediaType[MediaType["VIDEO"] = 3] = "VIDEO";
        /**
         * é€šç”¨æ–‡ä»¶ã€‚
         */
        MediaType[MediaType["FILE"] = 100] = "FILE";
    })(RongIMLib.MediaType || (RongIMLib.MediaType = {}));
    var MediaType = RongIMLib.MediaType;
    (function (MessageDirection) {
        /**
         * å‘é€æ¶ˆæ¯ã€‚
         */
        MessageDirection[MessageDirection["SEND"] = 1] = "SEND";
        /**
         * æŽ¥æ”¶æ¶ˆæ¯ã€‚
         */
        MessageDirection[MessageDirection["RECEIVE"] = 2] = "RECEIVE";
    })(RongIMLib.MessageDirection || (RongIMLib.MessageDirection = {}));
    var MessageDirection = RongIMLib.MessageDirection;
    (function (FileType) {
        FileType[FileType["IMAGE"] = 1] = "IMAGE";
        FileType[FileType["AUDIO"] = 2] = "AUDIO";
        FileType[FileType["VIDEO"] = 3] = "VIDEO";
        FileType[FileType["FILE"] = 4] = "FILE";
    })(RongIMLib.FileType || (RongIMLib.FileType = {}));
    var FileType = RongIMLib.FileType;
    (function (RealTimeLocationErrorCode) {
        /**
         * æœªåˆå§‹åŒ– RealTimeLocation å®žä¾‹
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_NOT_INIT"] = -1] = "RC_REAL_TIME_LOCATION_NOT_INIT";
        /**
         * æ‰§è¡ŒæˆåŠŸã€‚
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_SUCCESS"] = 0] = "RC_REAL_TIME_LOCATION_SUCCESS";
        /**
         * èŽ·å– RealTimeLocation å®žä¾‹æ—¶è¿”å›ž
         * GPS æœªæ‰“å¼€ã€‚
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_GPS_DISABLED"] = 1] = "RC_REAL_TIME_LOCATION_GPS_DISABLED";
        /**
         * èŽ·å– RealTimeLocation å®žä¾‹æ—¶è¿”å›ž
         * å½“å‰ä¼šè¯ä¸æ”¯æŒä½ç½®å…±äº«ã€‚
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT"] = 2] = "RC_REAL_TIME_LOCATION_CONVERSATION_NOT_SUPPORT";
        /**
         * èŽ·å– RealTimeLocation å®žä¾‹æ—¶è¿”å›ž
         * å¯¹æ–¹å·²å‘èµ·ä½ç½®å…±äº«ã€‚
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_IS_ON_GOING"] = 3] = "RC_REAL_TIME_LOCATION_IS_ON_GOING";
        /**
         * Join æ—¶è¿”å›ž
         * å½“å‰ä½ç½®å…±äº«å·²è¶…è¿‡æœ€å¤§æ”¯æŒäººæ•°ã€‚
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT"] = 4] = "RC_REAL_TIME_LOCATION_EXCEED_MAX_PARTICIPANT";
        /**
         * Join æ—¶è¿”å›ž
         * åŠ å…¥ä½ç½®å…±äº«å¤±è´¥ã€‚
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_JOIN_FAILURE"] = 5] = "RC_REAL_TIME_LOCATION_JOIN_FAILURE";
        /**
         * Start æ—¶è¿”å›ž
         * å‘èµ·ä½ç½®å…±äº«å¤±è´¥ã€‚
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_START_FAILURE"] = 6] = "RC_REAL_TIME_LOCATION_START_FAILURE";
        /**
         * ç½‘ç»œä¸å¯ç”¨ã€‚
         */
        RealTimeLocationErrorCode[RealTimeLocationErrorCode["RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE"] = 7] = "RC_REAL_TIME_LOCATION_NETWORK_UNAVAILABLE";
    })(RongIMLib.RealTimeLocationErrorCode || (RongIMLib.RealTimeLocationErrorCode = {}));
    var RealTimeLocationErrorCode = RongIMLib.RealTimeLocationErrorCode;
    (function (RealTimeLocationStatus) {
        /**
         * ç©ºé—²çŠ¶æ€ ï¼ˆé»˜è®¤çŠ¶æ€ï¼‰
         * å¯¹æ–¹æˆ–è€…è‡ªå·±éƒ½æœªå‘èµ·ä½ç½®å…±äº«ä¸šåŠ¡ï¼Œæˆ–è€…ä½ç½®å…±äº«ä¸šåŠ¡å·²ç»“æŸã€‚
         */
        RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_IDLE"] = 0] = "RC_REAL_TIME_LOCATION_STATUS_IDLE";
        /**
         * å‘¼å…¥çŠ¶æ€ ï¼ˆå¾…åŠ å…¥ï¼‰
         * 1. å¯¹æ–¹å‘èµ·äº†ä½ç½®å…±äº«ä¸šåŠ¡ï¼Œæ­¤çŠ¶æ€ä¸‹ï¼Œè‡ªå·±åªèƒ½é€‰æ‹©åŠ å…¥ã€‚
         * 2. è‡ªå·±ä»Žå·²è¿žæŽ¥çš„ä½ç½®å…±äº«ä¸­é€€å‡ºã€‚
         */
        RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_INCOMING"] = 1] = "RC_REAL_TIME_LOCATION_STATUS_INCOMING";
        /**
         * å‘¼å‡ºçŠ¶æ€ =ï¼ˆè‡ªå·±åˆ›å»ºï¼‰
         * 1. è‡ªå·±å‘èµ·ä½ç½®å…±äº«ä¸šåŠ¡ï¼Œå¯¹æ–¹åªèƒ½é€‰æ‹©åŠ å…¥ã€‚
         * 2. å¯¹æ–¹ä»Žå·²è¿žæŽ¥çš„ä½ç½®å…±äº«ä¸šåŠ¡ä¸­é€€å‡ºã€‚
         */
        RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_OUTGOING"] = 2] = "RC_REAL_TIME_LOCATION_STATUS_OUTGOING";
        /**
         * è¿žæŽ¥çŠ¶æ€ ï¼ˆè‡ªå·±åŠ å…¥ï¼‰
         * å¯¹æ–¹åŠ å…¥äº†è‡ªå·±å‘èµ·çš„ä½ç½®å…±äº«ï¼Œæˆ–è€…è‡ªå·±åŠ å…¥äº†å¯¹æ–¹å‘èµ·çš„ä½ç½®å…±äº«ã€‚
         */
        RealTimeLocationStatus[RealTimeLocationStatus["RC_REAL_TIME_LOCATION_STATUS_CONNECTED"] = 3] = "RC_REAL_TIME_LOCATION_STATUS_CONNECTED";
    })(RongIMLib.RealTimeLocationStatus || (RongIMLib.RealTimeLocationStatus = {}));
    var RealTimeLocationStatus = RongIMLib.RealTimeLocationStatus;
    (function (ReceivedStatus) {
        ReceivedStatus[ReceivedStatus["READ"] = 1] = "READ";
        ReceivedStatus[ReceivedStatus["LISTENED"] = 2] = "LISTENED";
        ReceivedStatus[ReceivedStatus["DOWNLOADED"] = 4] = "DOWNLOADED";
        ReceivedStatus[ReceivedStatus["RETRIEVED"] = 8] = "RETRIEVED";
        ReceivedStatus[ReceivedStatus["UNREAD"] = 0] = "UNREAD";
    })(RongIMLib.ReceivedStatus || (RongIMLib.ReceivedStatus = {}));
    var ReceivedStatus = RongIMLib.ReceivedStatus;
    (function (SearchType) {
        /**
         * ç²¾ç¡®ã€‚
         */
        SearchType[SearchType["EXACT"] = 0] = "EXACT";
        /**
         * æ¨¡ç³Šã€‚
         */
        SearchType[SearchType["FUZZY"] = 1] = "FUZZY";
    })(RongIMLib.SearchType || (RongIMLib.SearchType = {}));
    var SearchType = RongIMLib.SearchType;
    (function (SentStatus) {
        /**
         * å‘é€ä¸­ã€‚
         */
        SentStatus[SentStatus["SENDING"] = 10] = "SENDING";
        /**
         * å‘é€å¤±è´¥ã€‚
         */
        SentStatus[SentStatus["FAILED"] = 20] = "FAILED";
        /**
         * å·²å‘é€ã€‚
         */
        SentStatus[SentStatus["SENT"] = 30] = "SENT";
        /**
         * å¯¹æ–¹å·²æŽ¥æ”¶ã€‚
         */
        SentStatus[SentStatus["RECEIVED"] = 40] = "RECEIVED";
        /**
         * å¯¹æ–¹å·²è¯»ã€‚
         */
        SentStatus[SentStatus["READ"] = 50] = "READ";
        /**
         * å¯¹æ–¹å·²é”€æ¯ã€‚
         */
        SentStatus[SentStatus["DESTROYED"] = 60] = "DESTROYED";
    })(RongIMLib.SentStatus || (RongIMLib.SentStatus = {}));
    var SentStatus = RongIMLib.SentStatus;
    (function (ConnectionState) {
        ConnectionState[ConnectionState["ACCEPTED"] = 0] = "ACCEPTED";
        ConnectionState[ConnectionState["UNACCEPTABLE_PROTOCOL_VERSION"] = 1] = "UNACCEPTABLE_PROTOCOL_VERSION";
        ConnectionState[ConnectionState["IDENTIFIER_REJECTED"] = 2] = "IDENTIFIER_REJECTED";
        ConnectionState[ConnectionState["SERVER_UNAVAILABLE"] = 3] = "SERVER_UNAVAILABLE";
        /**
         * tokenæ— æ•ˆ
         */
        ConnectionState[ConnectionState["TOKEN_INCORRECT"] = 4] = "TOKEN_INCORRECT";
        ConnectionState[ConnectionState["NOT_AUTHORIZED"] = 5] = "NOT_AUTHORIZED";
        ConnectionState[ConnectionState["REDIRECT"] = 6] = "REDIRECT";
        ConnectionState[ConnectionState["PACKAGE_ERROR"] = 7] = "PACKAGE_ERROR";
        ConnectionState[ConnectionState["APP_BLOCK_OR_DELETE"] = 8] = "APP_BLOCK_OR_DELETE";
        ConnectionState[ConnectionState["BLOCK"] = 9] = "BLOCK";
        ConnectionState[ConnectionState["TOKEN_EXPIRE"] = 10] = "TOKEN_EXPIRE";
        ConnectionState[ConnectionState["DEVICE_ERROR"] = 11] = "DEVICE_ERROR";
    })(RongIMLib.ConnectionState || (RongIMLib.ConnectionState = {}));
    var ConnectionState = RongIMLib.ConnectionState;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var RongIMClient = (function () {
        function RongIMClient() {
        }
        RongIMClient.getInstance = function () {
            if (!RongIMClient._instance) {
                throw new Error("RongIMClient is not initialized. Call .init() method first.");
            }
            return RongIMClient._instance;
        };
        /**
         * åˆå§‹åŒ– SDKï¼Œåœ¨æ•´ä¸ªåº”ç”¨å…¨å±€åªéœ€è¦è°ƒç”¨ä¸€æ¬¡ã€‚
         * @param appKey    å¼€å‘è€…åŽå°ç”³è¯·çš„ AppKeyï¼Œç”¨æ¥æ ‡è¯†åº”ç”¨ã€‚
         * @param dataAccessProvider å¿…é¡»æ˜¯DataAccessProviderçš„å®žä¾‹
         */
        RongIMClient.init = function (appKey, dataAccessProvider, options) {
            // for(var p in options){
            //     alert(p + ":" + options[p])
            // }
            if (!RongIMClient._instance) {
                RongIMClient._instance = new RongIMClient();
            }
            var protocol = "//", wsScheme = 'ws://';
            if (document.location.protocol == "file:") {
                protocol = 'http://';
            }
            if (document.location.protocol == 'https:') {
                wsScheme = 'wss://';
            }
            var isPolling = false;
            if (typeof WebSocket != 'function') {
                isPolling = true;
            }
            var version = navigator.appVersion.split(";"), trim_version = 0;
            if (version.length > 1) {
                trim_version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
            }
            if (typeof localStorage == 'object') {
                RongIMClient._storageProvider = new RongIMLib.LocalStorageProvider();
            }
            else if (trim_version > 4 && trim_version < 8) {
                RongIMClient._storageProvider = new RongIMLib.UserDataProvider();
            }
            else {
                RongIMClient._storageProvider = new RongIMLib.MemeoryProvider();
            }
            var opts = RongIMLib.ObjectTools.buildOptions(options, {
                protobuf: protocol + 'cdn.ronghub.com/protobuf-2.1.5.min.js',
                long: protocol + 'cdn.ronghub.com/Long.js',
                byteBuffer: protocol + 'cdn.ronghub.com/byteBuffer.js',
                // navi: protocol + '119.254.111.49:9100',
                navi: protocol + 'nav.cn.ronghub.com',
                api: protocol + 'api.cn.ronghub.com',
                emojiImage: protocol + 'cdn.ronghub.com/css-sprite_bg-2.1.10.png',
                voiceLibamr: protocol + 'cdn.ronghub.com/libamr-2.0.12.min.js',
                voicePCMdata: protocol + 'cdn.ronghub.com/pcmdata-2.0.0.min.js',
                voiceSwfobjct: protocol + 'cdn.ronghub.com/swfobject-2.0.0.min.js',
                voicePlaySwf: protocol + 'cdn.ronghub.com/player-2.0.2.swf',
                callFile: protocol + 'cdn.ronghub.com/AgoraRtcAgentSDK-1.4.2.js',
                isPolling: isPolling,
                wsScheme: wsScheme,
                cookieValidity: 1,
                protocol: protocol,
                openMp: true,
                isPrivate: false,
                postImageUrl: protocol + 'upload.qiniu.com/putb64/-1',
                fileServer: protocol + 'upload.qiniu.com',
                fileUploadURL: protocol + 'cdn.ronghub.com/plupload.min.js',
                fileQNURL: protocol + 'cdn.ronghub.com/qiniu2.2.4.js'
            }, protocol);
            if (document.location.protocol == 'https:') {
                opts.fileServer = 'https://' + (options && options.fileServer || 'upload.qiniu.com');
                opts.postImageUrl = 'https://' + (options && options.postImageUrl || 'upload.qiniu.com/putb64/-1');
            }
            else {
                opts.fileServer = 'http://' + (options && options.fileServer || 'upload.qiniu.com');
                opts.postImageUrl = 'https://' + (options && options.postImageUrl || 'upload.qiniu.com/putb64/-1');
            }
            var pather = new RongIMLib.FeaturePatcher();
            pather.patchAll();
            var tempStore = {
                token: "",
                callback: null,
                hasModules: true,
                global: window,
                lastReadTime: new RongIMLib.LimitableMap(),
                conversationList: [],
                appKey: appKey,
                publicServiceMap: new RongIMLib.PublicServiceMap(),
                providerType: 1,
                deltaTime: 0,
                filterMessages: [],
                isSyncRemoteConverList: false,
                isUseWebSQLProvider: false,
                otherDevice: false,
                custStore: {},
                converStore: { latestMessage: {} },
                connectAckTime: 0,
                voipStategy: 0,
                isFirstPingMsg: true,
                depend: opts,
                listenerList: RongIMClient._memoryStore.listenerList
            };
            RongIMClient._memoryStore = tempStore;
            if (dataAccessProvider && Object.prototype.toString.call(dataAccessProvider) == "[object Object]") {
                // RongIMClient._memoryStore.isUseWebSQLProvider = true;  å¤„ç†ä¸åŒå­˜å‚¨æ–¹æ¡ˆ
                RongIMClient._dataAccessProvider = dataAccessProvider;
            }
            else {
                RongIMClient._dataAccessProvider = new RongIMLib.ServerDataProvider();
            }
            RongIMClient._dataAccessProvider.init(appKey);
            RongIMClient._dataAccessProvider.setServerInfo({ navi: location.protocol + opts.navi + '/navi.xml' });
            RongIMClient.MessageParams = {
                TextMessage: { objectName: "RC:TxtMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                ImageMessage: { objectName: "RC:ImgMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                DiscussionNotificationMessage: { objectName: "RC:DizNtf", msgTag: new RongIMLib.MessageTag(true, true) },
                VoiceMessage: { objectName: "RC:VcMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                RichContentMessage: { objectName: "RC:ImgTextMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                FileMessage: { objectName: "RC:FileMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                HandshakeMessage: { objectName: "", msgTag: new RongIMLib.MessageTag(true, true) },
                UnknownMessage: { objectName: "", msgTag: new RongIMLib.MessageTag(true, true) },
                LocationMessage: { objectName: "RC:LBSMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                InformationNotificationMessage: { objectName: "RC:InfoNtf", msgTag: new RongIMLib.MessageTag(true, true) },
                ContactNotificationMessage: { objectName: "RC:ContactNtf", msgTag: new RongIMLib.MessageTag(true, true) },
                ProfileNotificationMessage: { objectName: "RC:ProfileNtf", msgTag: new RongIMLib.MessageTag(true, true) },
                CommandNotificationMessage: { objectName: "RC:CmdNtf", msgTag: new RongIMLib.MessageTag(true, true) },
                PublicServiceRichContentMessage: { objectName: "RC:PSImgTxtMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                PublicServiceMultiRichContentMessage: { objectName: "RC:PSMultiImgTxtMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                JrmfReadPacketMessage: { objectName: "RCJrmf:RpMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                JrmfReadPacketOpenedMessage: { objectName: "RCJrmf:RpOpendMsg", msgTag: new RongIMLib.MessageTag(true, true) },
                GroupNotificationMessage: { objectName: "RC:GrpNtf", msgTag: new RongIMLib.MessageTag(true, true) },
                CommandMessage: { objectName: "RC:CmdMsg", msgTag: new RongIMLib.MessageTag(false, false) },
                TypingStatusMessage: { objectName: "RC:TypSts", msgTag: new RongIMLib.MessageTag(false, false) },
                PublicServiceCommandMessage: { objectName: "RC:PSCmd", msgTag: new RongIMLib.MessageTag(false, false) },
                RecallCommandMessage: { objectName: "RC:RcCmd", msgTag: new RongIMLib.MessageTag(false, true) },
                SyncReadStatusMessage: { objectName: "RC:SRSMsg", msgTag: new RongIMLib.MessageTag(false, false) },
                ReadReceiptRequestMessage: { objectName: "RC:RRReqMsg", msgTag: new RongIMLib.MessageTag(false, false) },
                ReadReceiptResponseMessage: { objectName: "RC:RRRspMsg", msgTag: new RongIMLib.MessageTag(false, false) },
                ChangeModeResponseMessage: { objectName: "RC:CsChaR", msgTag: new RongIMLib.MessageTag(false, false) },
                ChangeModeMessage: { objectName: "RC:CSCha", msgTag: new RongIMLib.MessageTag(false, false) },
                EvaluateMessage: { objectName: "RC:CsEva", msgTag: new RongIMLib.MessageTag(false, false) },
                CustomerContact: { objectName: "RC:CsContact", msgTag: new RongIMLib.MessageTag(false, false) },
                HandShakeMessage: { objectName: "RC:CsHs", msgTag: new RongIMLib.MessageTag(false, false) },
                HandShakeResponseMessage: { objectName: "RC:CsHsR", msgTag: new RongIMLib.MessageTag(false, false) },
                SuspendMessage: { objectName: "RC:CsSp", msgTag: new RongIMLib.MessageTag(false, false) },
                TerminateMessage: { objectName: "RC:CsEnd", msgTag: new RongIMLib.MessageTag(false, false) },
                CustomerStatusUpdateMessage: { objectName: "RC:CsUpdate", msgTag: new RongIMLib.MessageTag(false, false) },
                ReadReceiptMessage: { objectName: "RC:ReadNtf", msgTag: new RongIMLib.MessageTag(false, false) }
            };
            // if ('RongCallLib' in RongIMLib) {
            RongIMClient.MessageParams["AcceptMessage"] = { objectName: "RC:VCAccept", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["RingingMessage"] = { objectName: "RC:VCRinging", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["SummaryMessage"] = { objectName: "RC:VCSummary", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["HungupMessage"] = { objectName: "RC:VCHangup", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["InviteMessage"] = { objectName: "RC:VCInvite", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["MediaModifyMessage"] = { objectName: "RC:VCModifyMedia", msgTag: new RongIMLib.MessageTag(false, false) };
            RongIMClient.MessageParams["MemberModifyMessage"] = { objectName: "RC:VCModifyMem", msgTag: new RongIMLib.MessageTag(false, false) };
            // }
            RongIMClient.MessageType = {
                TextMessage: "TextMessage",
                ImageMessage: "ImageMessage",
                DiscussionNotificationMessage: "DiscussionNotificationMessage",
                VoiceMessage: "VoiceMessage",
                RichContentMessage: "RichContentMessage",
                HandshakeMessage: "HandshakeMessage",
                UnknownMessage: "UnknownMessage",
                LocationMessage: "LocationMessage",
                InformationNotificationMessage: "InformationNotificationMessage",
                ContactNotificationMessage: "ContactNotificationMessage",
                ProfileNotificationMessage: "ProfileNotificationMessage",
                CommandNotificationMessage: "CommandNotificationMessage",
                CommandMessage: "CommandMessage",
                TypingStatusMessage: "TypingStatusMessage",
                ChangeModeResponseMessage: "ChangeModeResponseMessage",
                ChangeModeMessage: "ChangeModeMessage",
                EvaluateMessage: "EvaluateMessage",
                HandShakeMessage: "HandShakeMessage",
                HandShakeResponseMessage: "HandShakeResponseMessage",
                SuspendMessage: "SuspendMessage",
                TerminateMessage: "TerminateMessage",
                CustomerContact: "CustomerContact",
                CustomerStatusUpdateMessage: "CustomerStatusUpdateMessage",
                SyncReadStatusMessage: "SyncReadStatusMessage",
                ReadReceiptRequestMessage: "ReadReceiptRequestMessage",
                ReadReceiptResponseMessage: "ReadReceiptResponseMessage",
                FileMessage: 'FileMessage',
                AcceptMessage: "AcceptMessage",
                RingingMessage: "RingingMessage",
                SummaryMessage: "SummaryMessage",
                HungupMessage: "HungupMessage",
                InviteMessage: "InviteMessage",
                MediaModifyMessage: "MediaModifyMessage",
                MemberModifyMessage: "MemberModifyMessage",
                JrmfReadPacketMessage: "JrmfReadPacketMessage",
                JrmfReadPacketOpenedMessage: "JrmfReadPacketOpenedMessage"
            };
        };
        /**
         * è¿žæŽ¥æœåŠ¡å™¨ï¼Œåœ¨æ•´ä¸ªåº”ç”¨å…¨å±€åªéœ€è¦è°ƒç”¨ä¸€æ¬¡ï¼Œæ–­çº¿åŽ SDK ä¼šè‡ªåŠ¨é‡è¿žã€‚
         *
         * @param token     ä»ŽæœåŠ¡ç«¯èŽ·å–çš„ç”¨æˆ·èº«ä»½ä»¤ç‰Œï¼ˆTokenï¼‰ã€‚
         * @param callback  è¿žæŽ¥å›žè°ƒï¼Œè¿”å›žè¿žæŽ¥çš„æˆåŠŸæˆ–è€…å¤±è´¥çŠ¶æ€ã€‚
         */
        RongIMClient.connect = function (token, callback, userId) {
            RongIMLib.CheckParam.getInstance().check(["string", "object", "string|null|object|global|undefined"], "connect", true);
            RongIMClient._dataAccessProvider.connect(token, callback, userId);
        };
        /**
            var config = {
                appkey: appkey,
                token: token,
                dataAccessProvider:dataAccessProvider,
                opts: opts
            };
            callback(_instance, userId);
         */
        RongIMClient.initApp = function (config, callback) {
            RongIMClient.init(config.appkey, config.dataAccessProvider, config.opts);
            RongIMClient.connect(config.token, {
                onSuccess: function (userId) {
                    callback(RongIMClient._instance, userId);
                },
                onTokenIncorrect: function () {
                    throw new Error('token expired');
                },
                onError: function (errorCode) { }
            });
        };
        RongIMClient.reconnect = function (callback) {
            RongIMClient._dataAccessProvider.reconnect(callback);
        };
        /**
         * æ³¨å†Œæ¶ˆæ¯ç±»åž‹ï¼Œç”¨äºŽæ³¨å†Œç”¨æˆ·è‡ªå®šä¹‰çš„æ¶ˆæ¯ã€‚
         * å†…å»ºçš„æ¶ˆæ¯ç±»åž‹å·²ç»æ³¨å†Œè¿‡ï¼Œä¸éœ€è¦å†æ¬¡æ³¨å†Œã€‚
         * è‡ªå®šä¹‰æ¶ˆæ¯å£°æ˜Žéœ€æ”¾åœ¨æ‰§è¡Œé¡ºåºæœ€é«˜çš„ä½ç½®ï¼ˆåœ¨RongIMClient.init(appkey)ä¹‹åŽå³å¯ï¼‰
         * @param objectName  æ¶ˆæ¯å†…ç½®åç§°
         */
        RongIMClient.registerMessageType = function (messageType, objectName, messageTag, messageContent) {
            RongIMClient._dataAccessProvider.registerMessageType(messageType, objectName, messageTag, messageContent);
        };
        /**
         * è®¾ç½®è¿žæŽ¥çŠ¶æ€å˜åŒ–çš„ç›‘å¬å™¨ã€‚
         *
         * @param listener  è¿žæŽ¥çŠ¶æ€å˜åŒ–çš„ç›‘å¬å™¨ã€‚
         */
        RongIMClient.setConnectionStatusListener = function (listener) {
            if (RongIMClient._dataAccessProvider) {
                RongIMClient._dataAccessProvider.setConnectionStatusListener(listener);
            }
            else {
                RongIMClient._memoryStore.listenerList.push(listener);
            }
        };
        /**
         * è®¾ç½®æŽ¥æ”¶æ¶ˆæ¯çš„ç›‘å¬å™¨ã€‚
         *
         * @param listener  æŽ¥æ”¶æ¶ˆæ¯çš„ç›‘å¬å™¨ã€‚
         */
        RongIMClient.setOnReceiveMessageListener = function (listener) {
            if (RongIMClient._dataAccessProvider) {
                RongIMClient._dataAccessProvider.setOnReceiveMessageListener(listener);
            }
            else {
                RongIMClient._memoryStore.listenerList.push(listener);
            }
        };
        /**
         * æ¸…ç†æ‰€æœ‰è¿žæŽ¥ç›¸å…³çš„å˜é‡
         */
        RongIMClient.prototype.logout = function () {
            RongIMClient._dataAccessProvider.logout();
        };
        /**
         * æ–­å¼€è¿žæŽ¥ã€‚
         */
        RongIMClient.prototype.disconnect = function () {
            RongIMClient._dataAccessProvider.disconnect();
        };
        RongIMClient.prototype.startCustomService = function (custId, callback, groupId) {
            if (!custId || !callback)
                return;
            var msg;
            if (typeof groupId == 'undefined') {
                msg = new RongIMLib.HandShakeMessage();
            }
            else {
                msg = new RongIMLib.HandShakeMessage({ groupid: groupId });
            }
            var me = this;
            RongIMLib.RongIMClient._memoryStore.custStore["isInit"] = true;
            RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.CUSTOMER_SERVICE, custId, msg, {
                onSuccess: function (data) {
                    if (data.isBlack) {
                        callback.onError();
                        me.stopCustomeService(custId, {
                            onSuccess: function () { },
                            onError: function () { }
                        });
                    }
                    else {
                        callback.onSuccess();
                    }
                },
                onError: function () {
                    callback.onError();
                }
            });
        };
        RongIMClient.prototype.stopCustomeService = function (custId, callback) {
            if (!custId || !callback)
                return;
            var session = RongIMClient._memoryStore.custStore[custId];
            if (!session)
                return;
            var msg = new RongIMLib.SuspendMessage({ sid: session.sid, uid: session.uid, pid: session.pid });
            this.sendCustMessage(custId, msg, {
                onSuccess: function () {
                    // delete RongIMClient._memoryStore.custStore[custId];
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError();
                    });
                }
            });
        };
        RongIMClient.prototype.switchToHumanMode = function (custId, callback) {
            if (!custId || !callback)
                return;
            var session = RongIMClient._memoryStore.custStore[custId];
            if (!session)
                return;
            var msg = new RongIMLib.ChangeModeMessage({ sid: session.sid, uid: session.uid, pid: session.pid });
            this.sendCustMessage(custId, msg, callback);
        };
        RongIMClient.prototype.evaluateRebotCustomService = function (custId, isRobotResolved, sugest, callback) {
            if (!custId || !callback)
                return;
            var session = RongIMClient._memoryStore.custStore[custId];
            if (!session)
                return;
            var msg = new RongIMLib.EvaluateMessage({ sid: session.sid, uid: session.uid, pid: session.pid, isRobotResolved: isRobotResolved, sugest: sugest, type: 0 });
            this.sendCustMessage(custId, msg, callback);
        };
        RongIMClient.prototype.evaluateHumanCustomService = function (custId, humanValue, sugest, callback) {
            if (!custId || !callback)
                return;
            var session = RongIMClient._memoryStore.custStore[custId];
            if (!session)
                return;
            var msg = new RongIMLib.EvaluateMessage({ sid: session.sid, uid: session.uid, pid: session.pid, humanValue: humanValue, sugest: sugest, type: 1 });
            this.sendCustMessage(custId, msg, callback);
        };
        RongIMClient.prototype.sendCustMessage = function (custId, msg, callback) {
            RongIMClient.getInstance().sendMessage(RongIMLib.ConversationType.CUSTOMER_SERVICE, custId, msg, {
                onSuccess: function (data) {
                    callback.onSuccess();
                },
                onError: function () {
                    callback.onError();
                }
            });
        };
        RongIMClient.prototype.setMessageStatus = function(conversationType, targetId, timestamp, status, callback){
             RongIMClient._dataAccessProvider.setMessageStatus(conversationType, targetId, timestamp, status, callback);
        };
        /**
         * èŽ·å–å½“å‰è¿žæŽ¥çš„çŠ¶æ€ã€‚
         */
        RongIMClient.prototype.getCurrentConnectionStatus = function () {
            return RongIMLib.Bridge._client.channel.connectionStatus;
        };
        /**
         * èŽ·å–å½“å‰ä½¿ç”¨çš„è¿žæŽ¥é€šé“ã€‚
         */
        RongIMClient.prototype.getConnectionChannel = function () {
            if (RongIMLib.Transportations._TransportType == RongIMLib.Socket.XHR_POLLING) {
                return RongIMLib.ConnectionChannel.XHR_POLLING;
            }
            else if (RongIMLib.Transportations._TransportType == RongIMLib.Socket.WEBSOCKET) {
                return RongIMLib.ConnectionChannel.WEBSOCKET;
            }
        };
        /**
         * èŽ·å–å½“å‰ä½¿ç”¨çš„æœ¬åœ°å‚¨å­˜æä¾›è€…ã€‚ TODO
         */
        RongIMClient.prototype.getStorageProvider = function () {
            if (RongIMClient._memoryStore.providerType == 1) {
                return "ServerDataProvider";
            }
            else {
                return "OtherDataProvider";
            }
        };
        /**
         * è¿‡æ»¤èŠå¤©å®¤æ¶ˆæ¯ï¼ˆæ‹‰å–æœ€è¿‘èŠå¤©æ¶ˆæ¯ï¼‰
         * @param {string[]} msgFilterNames
         */
        RongIMClient.prototype.setFilterMessages = function (msgFilterNames) {
            if (Object.prototype.toString.call(msgFilterNames) == "[object Array]") {
                RongIMClient._memoryStore.filterMessages = msgFilterNames;
            }
        };
        RongIMClient.prototype.getAgoraDynamicKey = function (engineType, channelName, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "getAgoraDynamicKey");
            var modules = new Modules.VoipDynamicInput();
            modules.setEngineType(engineType);
            modules.setChannelName(channelName);
            RongIMClient.bridge.queryMsg(32, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, callback, "VoipDynamicOutput");
        };
        /**
         * èŽ·å–å½“å‰è¿žæŽ¥ç”¨æˆ·çš„ UserIdã€‚
         */
        RongIMClient.prototype.getCurrentUserId = function () {
            return RongIMLib.Bridge._client.userId;
        };
        /**
         * [getCurrentUserInfo èŽ·å–å½“å‰ç”¨æˆ·ä¿¡æ¯]
         * @param  {ResultCallback<UserInfo>} callback [å›žè°ƒå‡½æ•°]
         */
        // getCurrentUserInfo(callback: ResultCallback<UserInfo>) {
        //     CheckParam.getInstance().check(["object"], "getCurrentUserInfo");
        //     this.getUserInfo(Bridge._client.userId, callback);
        // }
        /**
         * èŽ·å¾—ç”¨æˆ·ä¿¡æ¯
         * @param  {string}                   userId [ç”¨æˆ·Id]
         * @param  {ResultCallback<UserInfo>} callback [å›žè°ƒå‡½æ•°]
         */
        // getUserInfo(userId: string, callback: ResultCallback<UserInfo>) {
        //     CheckParam.getInstance().check(["string", "object"], "getUserInfo");
        //     var user = new Modules.GetUserInfoInput();
        //     user.setNothing(1);
        //     RongIMClient.bridge.queryMsg(5, MessageUtil.ArrayForm(user.toArrayBuffer()), userId, {
        //         onSuccess: function(info: any) {
        //             var userInfo = new UserInfo(info.userId, info.name, info.portraitUri);
        //             callback.onSuccess(userInfo);
        //         },
        //         onError: function(err: any) {
        //             callback.onError(err);
        //         }
        //     }, "GetUserInfoOutput");
        // }
        /**
         * èŽ·å–æœåŠ¡å™¨æ—¶é—´ä¸Žæœ¬åœ°æ—¶é—´çš„å·®å€¼ï¼Œå•ä½ä¸ºæ¯«ç§’ã€‚
         * è®¡ç®—å…¬å¼ï¼šå·®å€¼ = æœ¬åœ°æ—¶é—´æ¯«ç§’æ•° - æœåŠ¡å™¨æ—¶é—´æ¯«ç§’æ•°
         * @param callback  èŽ·å–çš„å›žè°ƒï¼Œè¿”å›žå·®å€¼ã€‚
         */
        RongIMClient.prototype.getDeltaTime = function () {
            return RongIMClient._dataAccessProvider.getDelaTime();
        };
        // #region Message
        RongIMClient.prototype.getMessage = function (messageId, callback) {
            RongIMClient._dataAccessProvider.getMessage(messageId, callback);
        };
        RongIMClient.prototype.deleteLocalMessages = function (conversationType, targetId, messageIds, callback) {
            RongIMClient._dataAccessProvider.removeLocalMessage(conversationType, targetId, messageIds, callback);
        };
        RongIMClient.prototype.updateMessage = function (message, callback) {
            RongIMClient._dataAccessProvider.updateMessage(message, callback);
        };
        RongIMClient.prototype.clearMessages = function (conversationType, targetId, callback) {
            RongIMClient._dataAccessProvider.clearMessages(conversationType, targetId, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        /**TODO æ¸…æ¥šæœ¬åœ°å­˜å‚¨çš„æœªè¯»æ¶ˆæ¯ï¼Œç›®å‰æ¸…ç©ºå†…å­˜ä¸­çš„æœªè¯»æ¶ˆæ¯
         * [clearMessagesUnreadStatus æ¸…ç©ºæŒ‡å®šä¼šè¯æœªè¯»æ¶ˆæ¯]
         * @param  {ConversationType}        conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}                  targetId         [ç”¨æˆ·id]
         * @param  {ResultCallback<boolean>} callback         [è¿”å›žå€¼ï¼Œå‚æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.clearMessagesUnreadStatus = function (conversationType, targetId, callback) {
            RongIMClient._dataAccessProvider.updateMessages(conversationType, targetId, "readStatus", null, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.deleteRemoteMessages = function (conversationType, targetId, delMsgs, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "array", "object"], "deleteRemoteMessages");
            if (delMsgs.length == 0) {
                callback.onError(RongIMLib.ErrorCode.DELETE_MESSAGE_ID_IS_NULL);
                return;
            }
            else if (delMsgs.length > 100) {
                delMsgs.length = 100;
            }
            // åŽç»­å¢žåŠ ï¼ŒåŽ»æŽ‰æ³¨é‡Šå³å¯
            callback.onSuccess(true);
            // var modules = new Modules.DeleteMsgInput();
            // modules.setType(conversationType);
            // modules.setConversationId(targetId);
            // modules.setMsgs(delMsgs);
            // RongIMClient.bridge.queryMsg(33, MessageUtil.ArrayForm(modules.toArrayBuffer()), Bridge._client.userId, {
            //     onSuccess: function(info: any) {
            //         callback.onSuccess(true);
            //     },
            //     onError: function(err: any) {
            //         callback.onError(err);
            //     }
            // }, "DeleteMsgOutput");
        };
        /**
         * [deleteMessages åˆ é™¤æ¶ˆæ¯è®°å½•ã€‚]
         * @param  {ConversationType}        conversationType [description]
         * @param  {string}                  targetId         [description]
         * @param  {number[]}                messageIds       [description]
         * @param  {ResultCallback<boolean>} callback         [description]
         */
        RongIMClient.prototype.deleteMessages = function (conversationType, targetId, delMsgs, callback) {
            RongIMClient._dataAccessProvider.removeMessage(conversationType, targetId, delMsgs, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.sendLocalMessage = function (message, callback) {
            RongIMLib.CheckParam.getInstance().check(["object", "object"], "sendLocalMessage");
            RongIMClient._dataAccessProvider.updateMessage(message);
            this.sendMessage(message.conversationType, message.targetId, message.content, callback);
        };
        /**
         * [sendMessage å‘é€æ¶ˆæ¯ã€‚]
         * @param  {ConversationType}        conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}                  targetId         [ç›®æ ‡Id]
         * @param  {MessageContent}          messageContent   [æ¶ˆæ¯ç±»åž‹]
         * @param  {SendMessageCallback}     sendCallback     []
         * @param  {ResultCallback<Message>} resultCallback   [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         * @param  {string}                  pushContent      []
         * @param  {string}                  pushData         []
         */
        RongIMClient.prototype.sendMessage = function (conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData, methodType) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "object", "object", "undefined|object|null|global|boolean", "undefined|object|null|global|string", "undefined|object|null|global|string", "undefined|object|null|global|number"], "sendMessage");
            RongIMClient._dataAccessProvider.sendMessage(conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData, methodType);
        };
        RongIMClient.prototype.sendReceiptResponse = function (conversationType, targetId, content, sendCallback) {
            RongIMClient._dataAccessProvider.sendReceiptResponse(conversationType, targetId, content, sendCallback);
        };
        RongIMClient.prototype.sendTypingStatusMessage = function (conversationType, targetId, messageName, sendCallback) {
            RongIMClient._dataAccessProvider.sendTypingStatusMessage(conversationType, targetId, messageName, sendCallback);
        };
        /**
         * [sendStatusMessage description]
         * @param  {MessageContent}          messageContent [description]
         * @param  {SendMessageCallback}     sendCallback   [description]
         * @param  {ResultCallback<Message>} resultCallback [description]
         */
        RongIMClient.prototype.sendStatusMessage = function (messageContent, sendCallback, resultCallback) {
            throw new Error("Not implemented yet");
        };
        /**
         * [sendTextMessage å‘é€TextMessageå¿«æ·æ–¹å¼]
         * @param  {string}                  content        [æ¶ˆæ¯å†…å®¹]
         * @param  {ResultCallback<Message>} resultCallback [è¿”å›žå€¼ï¼Œå‚æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.sendTextMessage = function (conversationType, targetId, content, sendMessageCallback) {
            RongIMClient._dataAccessProvider.sendTextMessage(conversationType, targetId, content, sendMessageCallback);
        };
        RongIMClient.prototype.sendRecallMessage = function (content, sendMessageCallback) {
            RongIMClient._dataAccessProvider.sendRecallMessage(content, sendMessageCallback);
        };
        /**
         * [insertMessage å‘æœ¬åœ°æ’å…¥ä¸€æ¡æ¶ˆæ¯ï¼Œä¸å‘é€åˆ°æœåŠ¡å™¨ã€‚]
         * @param  {ConversationType}        conversationType [description]
         * @param  {string}                  targetId         [description]
         * @param  {string}                  senderUserId     [description]
         * @param  {MessageContent}          content          [description]
         * @param  {ResultCallback<Message>} callback         [description]
         */
        RongIMClient.prototype.insertMessage = function (conversationType, targetId, message, callback) {
            RongIMClient._dataAccessProvider.addMessage(conversationType, targetId, message, callback);
        };
        /**
         * [getHistoryMessages æ‹‰å–åŽ†å²æ¶ˆæ¯è®°å½•ã€‚]
         * @param  {ConversationType}          conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}                    targetId         [ç”¨æˆ·Id]
         * @param  {number|null}               pullMessageTime  [æ‹‰å–åŽ†å²æ¶ˆæ¯èµ·å§‹ä½ç½®(æ ¼å¼ä¸ºæ¯«ç§’æ•°)ï¼Œå¯ä»¥ä¸ºnull]
         * @param  {number}                    count            [åŽ†å²æ¶ˆæ¯æ•°é‡]
         * @param  {ResultCallback<Message[]>} callback         [å›žè°ƒå‡½æ•°]
         * @param  {string}                    objectName       [objectName]
         */
        RongIMClient.prototype.getHistoryMessages = function (conversationType, targetId, timestamp, count, callback, objectName, direction) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "number|null|global|object", "number", "object", "string", "boolean|null|global|object"], "getHistoryMessages");
            if (count > 20) {
                throw new Error("HistroyMessage count must be less than or equal to 20!");
            }
            if (conversationType.valueOf() < 0) {
                throw new Error("ConversationType must be greater than -1");
            }
            RongIMClient._dataAccessProvider.getHistoryMessages(conversationType, targetId, timestamp, count, callback, objectName, direction);
        };

        RongIMClient.prototype.setMessageContent = function(messageId, content, objectName){
            RongIMClient._dataAccessProvider.setMessageContent(messageId, content, objectName);
        };
        /**
         * [getRemoteHistoryMessages æ‹‰å–æŸä¸ªæ—¶é—´æˆ³ä¹‹å‰çš„æ¶ˆæ¯]
         * @param  {ConversationType}          conversationType [description]
         * @param  {string}                    targetId         [description]
         * @param  {Date}                      dateTime         [description]
         * @param  {number}                    count            [description]
         * @param  {ResultCallback<Message[]>} callback         [description]
         */
        RongIMClient.prototype.getRemoteHistoryMessages = function (conversationType, targetId, timestamp, count, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "number|null|global|object", "number", "object"], "getRemoteHistoryMessages");
            if (count > 20) {
                callback.onError(RongIMLib.ErrorCode.RC_CONN_PROTO_VERSION_ERROR);
                return;
            }
            if (conversationType.valueOf() < 0) {
                callback.onError(RongIMLib.ErrorCode.RC_CONN_PROTO_VERSION_ERROR);
                return;
            }
            RongIMClient._dataAccessProvider.getRemoteHistoryMessages(conversationType, targetId, timestamp, count, callback);
        };
        /**
         * [hasRemoteUnreadMessages æ˜¯å¦æœ‰æœªæŽ¥æ”¶çš„æ¶ˆæ¯ï¼Œjsonpæ–¹æ³•]
         * @param  {string}          appkey   [appkey]
         * @param  {string}          token    [token]
         * @param  {ConnectCallback} callback [è¿”å›žå€¼ï¼Œå‚æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.hasRemoteUnreadMessages = function (token, callback) {
            RongIMClient._dataAccessProvider.hasRemoteUnreadMessages(token, callback);
        };
        RongIMClient.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
            RongIMClient._dataAccessProvider.getTotalUnreadCount({
                onSuccess: function (count) {
                    setTimeout(function () {
                        callback.onSuccess(count);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            }, conversationTypes);
        };
        /**
         * [getConversationUnreadCount æŒ‡å®šå¤šç§ä¼šè¯ç±»åž‹èŽ·å–æœªè¯»æ¶ˆæ¯æ•°]
         * @param  {ResultCallback<number>} callback             [è¿”å›žå€¼ï¼Œå‚æ•°å›žè°ƒã€‚]
         * @param  {ConversationType[]}     ...conversationTypes [ä¼šè¯ç±»åž‹ã€‚]
         */
        RongIMClient.prototype.getConversationUnreadCount = function (conversationTypes, callback) {
            RongIMClient._dataAccessProvider.getConversationUnreadCount(conversationTypes, {
                onSuccess: function (count) {
                    setTimeout(function () {
                        callback.onSuccess(count);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        /**
         * [getUnreadCount æŒ‡å®šç”¨æˆ·ã€ä¼šè¯ç±»åž‹çš„æœªè¯»æ¶ˆæ¯æ€»æ•°ã€‚]
         * @param  {ConversationType} conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}           targetId         [ç”¨æˆ·Id]
         */
        RongIMClient.prototype.getUnreadCount = function (conversationType, targetId, callback) {
            RongIMClient._dataAccessProvider.getUnreadCount(conversationType, targetId, {
                onSuccess: function (count) {
                    setTimeout(function () {
                        callback.onSuccess(count);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.clearUnreadCountByTimestamp = function (conversationType, targetId, timestamp, callback) {
            RongIMClient._dataAccessProvider.clearUnreadCountByTimestamp(conversationType, targetId, timestamp, callback);
        };
        /**
         * æ¸…æ¥šä¼šè¯æœªè¯»æ¶ˆæ¯æ•°
         * @param  {ConversationType}        conversationType ä¼šè¯ç±»åž‹
         * @param  {string}                  targetId         ç›®æ ‡Id
         * @param  {ResultCallback<boolean>} callback         è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ
         */
        RongIMClient.prototype.clearUnreadCount = function (conversationType, targetId, callback) {
            RongIMClient._dataAccessProvider.clearUnreadCount(conversationType, targetId, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.clearLocalStorage = function (callback) {
            RongIMClient._storageProvider.clearItem();
            callback();
        };
        RongIMClient.prototype.setMessageExtra = function (messageId, value, callback) {
            RongIMClient._dataAccessProvider.setMessageExtra(messageId, value, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.setMessageReceivedStatus = function (messageUId, receivedStatus, callback) {
            RongIMClient._dataAccessProvider.setMessageReceivedStatus(messageUId, receivedStatus, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        RongIMClient.prototype.setMessageSentStatus = function (messageId, sentStatus, callback) {
            RongIMClient._dataAccessProvider.setMessageSentStatus(messageId, sentStatus, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        // #endregion Message
        // #region TextMessage Draft
        /**
         * clearTextMessageDraft æ¸…é™¤æŒ‡å®šä¼šè¯å’Œæ¶ˆæ¯ç±»åž‹çš„è‰ç¨¿ã€‚
         * @param  {ConversationType}        conversationType ä¼šè¯ç±»åž‹
         * @param  {string}                  targetId         ç›®æ ‡Id
         */
        RongIMClient.prototype.clearTextMessageDraft = function (conversationType, targetId) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "clearTextMessageDraft");
            var key = "darf_" + conversationType + "_" + targetId;
            delete RongIMClient._memoryStore[key];
            return true;
        };
        /**
         * [getTextMessageDraft èŽ·å–æŒ‡å®šæ¶ˆæ¯å’Œä¼šè¯çš„è‰ç¨¿ã€‚]
         * @param  {ConversationType}       conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}                 targetId         [ç›®æ ‡Id]
         */
        RongIMClient.prototype.getTextMessageDraft = function (conversationType, targetId) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "getTextMessageDraft");
            if (targetId == "" || conversationType < 0) {
                throw new Error("params error : " + RongIMLib.ErrorCode.DRAF_GET_ERROR);
            }
            var key = "darf_" + conversationType + "_" + targetId;
            return RongIMClient._memoryStore[key];
        };
        /**
         * [saveTextMessageDraft description]
         * @param  {ConversationType}        conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}                  targetId         [ç›®æ ‡Id]
         * @param  {string}                  value            [è‰ç¨¿å€¼]
         */
        RongIMClient.prototype.saveTextMessageDraft = function (conversationType, targetId, value) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "string", "object"], "saveTextMessageDraft");
            var key = "darf_" + conversationType + "_" + targetId;
            RongIMClient._memoryStore[key] = value;
            return true;
        };
        // #endregion TextMessage Draft
        // #region Conversation
        RongIMClient.prototype.searchConversationByContent = function (keyword, callback, conversationTypes) {
            RongIMClient._dataAccessProvider.searchConversationByContent(keyword, callback, conversationTypes);
        };
        RongIMClient.prototype.searchMessageByContent = function (conversationType, targetId, keyword, timestamp, count, total, callback) {
            RongIMClient._dataAccessProvider.searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total, callback);
        };
        RongIMClient.prototype.clearConversations = function (callback) {
            var conversationTypes = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                conversationTypes[_i - 1] = arguments[_i];
            }
            if (conversationTypes.length == 0) {
                conversationTypes = [RongIMLib.ConversationType.CHATROOM,
                    RongIMLib.ConversationType.CUSTOMER_SERVICE,
                    RongIMLib.ConversationType.DISCUSSION,
                    RongIMLib.ConversationType.GROUP,
                    RongIMLib.ConversationType.PRIVATE,
                    RongIMLib.ConversationType.SYSTEM,
                    RongIMLib.ConversationType.PUBLIC_SERVICE,
                    RongIMLib.ConversationType.APP_PUBLIC_SERVICE];
            }
            RongIMClient._dataAccessProvider.clearConversations(conversationTypes, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        /**
         * [getConversation èŽ·å–æŒ‡å®šä¼šè¯ï¼Œæ­¤æ–¹æ³•éœ€åœ¨getConversationListä¹‹åŽæ‰§è¡Œ]
         * @param  {ConversationType}             conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}                       targetId         [ç›®æ ‡Id]
         * @param  {ResultCallback<Conversation>} callback         [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.getConversation = function (conversationType, targetId, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "getConversation");
            RongIMClient._dataAccessProvider.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    setTimeout(function () {
                        callback.onSuccess(conver);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        callback.onError(error);
                    });
                }
            });
        };
        /**
         * [pottingConversation ç»„è£…ä¼šè¯åˆ—è¡¨]
         * @param {any} tempConver [ä¸´æ—¶ä¼šè¯]
         * conver_conversationType_targetId_no.
         * msg_conversationType_targetId_no.
         */
        RongIMClient.prototype.pottingConversation = function (tempConver) {
            var self = this, isUseReplace = false;
            RongIMClient._dataAccessProvider.getConversation(tempConver.type, tempConver.userId, {
                onSuccess: function (conver) {
                    if (!conver) {
                        conver = new RongIMLib.Conversation();
                    }
                    else {
                        isUseReplace = true;
                    }
                    conver.conversationType = tempConver.type;
                    conver.targetId = tempConver.userId;
                    conver.latestMessage = RongIMLib.MessageUtil.messageParser(tempConver.msg);
                    conver.latestMessageId = conver.latestMessage.messageId;
                    conver.objectName = conver.latestMessage.objectName;
                    conver.receivedStatus = conver.latestMessage.receivedStatus;
                    conver.receivedTime = conver.latestMessage.receiveTime;
                    conver.sentStatus = conver.latestMessage.sentStatus;
                    conver.sentTime = conver.latestMessage.sentTime;
                    conver.isTop = false;
                    var mentioneds = RongIMClient._storageProvider.getItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conver.conversationType + '_' + conver.targetId);
                    if (mentioneds) {
                        var info = JSON.parse(mentioneds);
                        conver.mentionedMsg = info[tempConver.type + "_" + tempConver.userId];
                    }
                    if (!isUseReplace) {
                        if (RongIMLib.MessageUtil.supportLargeStorage()) {
                            var count = RongIMClient._storageProvider.getItem("cu" + RongIMLib.Bridge._client.userId + tempConver.type + tempConver.userId);
                            conver.unreadMessageCount = Number(count);
                        }
                        else {
                            conver.unreadMessageCount = 0;
                        }
                    }
                    // if (conver.conversationType == ConversationType.PRIVATE) {
                    //     self.getUserInfo(tempConver.userId, <ResultCallback<UserInfo>>{
                    //         onSuccess: function(info: UserInfo) {
                    //             conver.conversationTitle = info.name;
                    //             conver.senderUserName = info.name;
                    //             conver.senderUserId = info.userId;
                    //             conver.senderPortraitUri = info.portraitUri;
                    //         },
                    //         onError: function(error: ErrorCode) { }
                    //     });
                    // } else
                    if (conver.conversationType == RongIMLib.ConversationType.DISCUSSION) {
                        self.getDiscussion(tempConver.userId, {
                            onSuccess: function (info) {
                                conver.conversationTitle = info.name;
                            },
                            onError: function (error) { }
                        });
                    }
                    RongIMClient._dataAccessProvider.addConversation(conver, { onSuccess: function (data) { } });
                },
                onError: function (error) { }
            });
        };
        RongIMClient.prototype.sortConversationList = function (conversationList) {
            var convers = [];
            for (var i = 0, len = conversationList.length; i < len; i++) {
                if (!conversationList[i]) {
                    continue;
                }
                if (conversationList[i].isTop) {
                    convers.push(conversationList[i]);
                    conversationList.splice(i, 1);
                    continue;
                }
                for (var j = 0; j < len - i - 1; j++) {
                    if (conversationList[j].sentTime < conversationList[j + 1].sentTime) {
                        var swap = conversationList[j];
                        conversationList[j] = conversationList[j + 1];
                        conversationList[j + 1] = swap;
                    }
                }
            }
            return RongIMClient._memoryStore.conversationList = convers.concat(conversationList);
        };
        RongIMClient.prototype.getConversationList = function (callback, conversationTypes, count, isGetHiddenConvers) {
            RongIMLib.CheckParam.getInstance().check(["object", "null|array|object|global", "number|undefined|null|object|global", "boolean|undefined|null|object|global"], "getConversationList");
            var me = this;
            RongIMClient._dataAccessProvider.getConversationList({
                onSuccess: function (data) {
                    if (conversationTypes || RongIMClient._dataAccessProvider) {
                        setTimeout(function () {
                            callback.onSuccess(data);
                        });
                    }
                    else {
                        setTimeout(function () {
                            callback.onSuccess(RongIMClient._memoryStore.conversationList);
                        });
                    }
                },
                onError: function (error) {
                    if (error === RongIMLib.ErrorCode.TIMEOUT) {
                        callback.onError(error);
                    }
                    else {
                        callback.onSuccess([]);
                    }
                }
            }, conversationTypes, count, isGetHiddenConvers);
        };
        RongIMClient.prototype.getRemoteConversationList = function (callback, conversationTypes, count, isGetHiddenConvers) {
            RongIMLib.CheckParam.getInstance().check(["object", "null|array|object|global", "number|undefined|null|object|global", "boolean|undefined|null|object|global"], "getRemoteConversationList");
            RongIMClient._dataAccessProvider.getRemoteConversationList(callback, conversationTypes, count, isGetHiddenConvers);
        };
        RongIMClient.prototype.updateConversation = function (conversation) {
            return RongIMClient._dataAccessProvider.updateConversation(conversation);
        };
        /**
         * [createConversation åˆ›å»ºä¼šè¯ã€‚]
         * @param  {number}  conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}  targetId         [ç›®æ ‡Id]
         * @param  {string}  converTitle      [ä¼šè¯æ ‡é¢˜]
         * @param  {boolean} islocal          [æ˜¯å¦åŒæ­¥åˆ°æœåŠ¡å™¨ï¼Œtureï¼šåŒæ­¥ï¼Œfalse:ä¸åŒæ­¥]
         */
        RongIMClient.prototype.createConversation = function (conversationType, targetId, converTitle) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "string"], "createConversation");
            var conver = new RongIMLib.Conversation();
            conver.targetId = targetId;
            conver.conversationType = conversationType;
            conver.conversationTitle = converTitle;
            conver.latestMessage = {};
            conver.unreadMessageCount = 0;
            return conver;
        };
        //TODO åˆ é™¤æœ¬åœ°å’ŒæœåŠ¡å™¨ã€åˆ é™¤æœ¬åœ°å’ŒæœåŠ¡å™¨åˆ†å¼€
        RongIMClient.prototype.removeConversation = function (conversationType, targetId, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "removeConversation");
            RongIMClient._dataAccessProvider.removeConversation(conversationType, targetId, callback);
        };
        RongIMClient.prototype.setConversationHidden = function (conversationType, targetId, isHidden) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "boolean"], "setConversationHidden");
            RongIMClient._dataAccessProvider.setConversationHidden(conversationType, targetId, isHidden);
        };
        RongIMClient.prototype.setConversationToTop = function (conversationType, targetId, isTop, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "boolean", "object"], "setConversationToTop");
            RongIMClient._dataAccessProvider.setConversationToTop(conversationType, targetId, isTop, {
                onSuccess: function (bool) {
                    setTimeout(function () {
                        callback.onSuccess(bool);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            });
        };
        // #endregion Conversation
        // #region Notifications
        /**
         * [getConversationNotificationStatus èŽ·å–æŒ‡å®šç”¨æˆ·å’Œä¼šè¯ç±»åž‹å…æé†’ã€‚]
         * @param  {ConversationType}                               conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}                                         targetId         [ç›®æ ‡Id]
         * @param  {ResultCallback<ConversationNotificationStatus>} callback         [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.getConversationNotificationStatus = function (conversationType, targetId, callback) {
            throw new Error("Not implemented yet");
        };
        /**
         * [setConversationNotificationStatus è®¾ç½®æŒ‡å®šç”¨æˆ·å’Œä¼šè¯ç±»åž‹å…æé†’ã€‚]
         * @param  {ConversationType}                               conversationType [ä¼šè¯ç±»åž‹]
         * @param  {string}                                         targetId         [ç›®æ ‡Id]
         * @param  {ResultCallback<ConversationNotificationStatus>} callback         [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.setConversationNotificationStatus = function (conversationType, targetId, notificationStatus, callback) {
            throw new Error("Not implemented yet");
        };
        /**
         * [getNotificationQuietHours èŽ·å–å…æé†’æ¶ˆæ¯æ—¶é—´ã€‚]
         * @param  {GetNotificationQuietHoursCallback} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.getNotificationQuietHours = function (callback) {
            throw new Error("Not implemented yet");
        };
        /**
         * [removeNotificationQuietHours ç§»é™¤å…æé†’æ¶ˆæ¯æ—¶é—´ã€‚]
         * @param  {GetNotificationQuietHoursCallback} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.removeNotificationQuietHours = function (callback) {
            throw new Error("Not implemented yet");
        };
        /**
         * [setNotificationQuietHours è®¾ç½®å…æé†’æ¶ˆæ¯æ—¶é—´ã€‚]
         * @param  {GetNotificationQuietHoursCallback} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.setNotificationQuietHours = function (startTime, spanMinutes, callback) {
            throw new Error("Not implemented yet");
        };
        // #endregion Notifications
        // #region Discussion
        /**
         * [addMemberToDiscussion   åŠ å…¥è®¨è®ºç»„]
         * @param  {string}            discussionId [è®¨è®ºç»„Id]
         * @param  {string[]}          userIdList   [è®¨è®ºä¸­æˆå‘˜]
         * @param  {OperationCallback} callback     [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.addMemberToDiscussion = function (discussionId, userIdList, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "array", "object"], "addMemberToDiscussion");
            RongIMClient._dataAccessProvider.addMemberToDiscussion(discussionId, userIdList, callback);
        };
        /**
         * [createDiscussion åˆ›å»ºè®¨è®ºç»„]
         * @param  {string}                   name       [è®¨è®ºç»„åç§°]
         * @param  {string[]}                 userIdList [è®¨è®ºç»„æˆå‘˜]
         * @param  {CreateDiscussionCallback} callback   [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.createDiscussion = function (name, userIdList, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "array", "object"], "createDiscussion");
            RongIMClient._dataAccessProvider.createDiscussion(name, userIdList, callback);
        };
        /**
         * [getDiscussion èŽ·å–è®¨è®ºç»„ä¿¡æ¯]
         * @param  {string}                     discussionId [è®¨è®ºç»„Id]
         * @param  {ResultCallback<Discussion>} callback     [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.getDiscussion = function (discussionId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "getDiscussion");
            RongIMClient._dataAccessProvider.getDiscussion(discussionId, callback);
        };
        /**
         * [quitDiscussion é€€å‡ºè®¨è®ºç»„]
         * @param  {string}            discussionId [è®¨è®ºç»„Id]
         * @param  {OperationCallback} callback     [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.quitDiscussion = function (discussionId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "quitDiscussion");
            RongIMClient._dataAccessProvider.quitDiscussion(discussionId, callback);
        };
        /**
         * [removeMemberFromDiscussion å°†æŒ‡å®šæˆå‘˜ç§»é™¤è®¨è®ºç§Ÿ]
         * @param  {string}            discussionId [è®¨è®ºç»„Id]
         * @param  {string}            userId       [è¢«ç§»é™¤çš„ç”¨æˆ·Id]
         * @param  {OperationCallback} callback     [è¿”å›žå€¼ï¼Œå‚æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.removeMemberFromDiscussion = function (discussionId, userId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "string", "object"], "removeMemberFromDiscussion");
            RongIMClient._dataAccessProvider.removeMemberFromDiscussion(discussionId, userId, callback);
        };
        /**
         * [setDiscussionInviteStatus è®¾ç½®è®¨è®ºç»„é‚€è¯·çŠ¶æ€]
         * @param  {string}                 discussionId [è®¨è®ºç»„Id]
         * @param  {DiscussionInviteStatus} status       [é‚€è¯·çŠ¶æ€]
         * @param  {OperationCallback}      callback     [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.setDiscussionInviteStatus = function (discussionId, status, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "number", "object"], "setDiscussionInviteStatus");
            RongIMClient._dataAccessProvider.setDiscussionInviteStatus(discussionId, status, callback);
        };
        /**
         * [setDiscussionName è®¾ç½®è®¨è®ºç»„åç§°]
         * @param  {string}            discussionId [è®¨è®ºç»„Id]
         * @param  {string}            name         [è®¨è®ºç»„åç§°]
         * @param  {OperationCallback} callback     [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.setDiscussionName = function (discussionId, name, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "string", "object"], "setDiscussionName");
            RongIMClient._dataAccessProvider.setDiscussionName(discussionId, name, callback);
        };
        // #endregion Discussion
        // #region Group
        /**
         * [åŠ å…¥ç¾¤ç»„]
         * @param  {string}            groupId   [ç¾¤ç»„Id]
         * @param  {string}            groupName [ç¾¤ç»„åç§°]
         * @param  {OperationCallback} callback  [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.joinGroup = function (groupId, groupName, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "string", "object"], "joinGroup");
            RongIMClient._dataAccessProvider.joinGroup(groupId, groupName, callback);
        };
        /**
         * [é€€å‡ºç¾¤ç»„]
         * @param  {string}            groupId  [ç¾¤ç»„Id]
         * @param  {OperationCallback} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.quitGroup = function (groupId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "quitGroup");
            RongIMClient._dataAccessProvider.quitGroup(groupId, callback);
        };
        /**
         * [åŒæ­¥ç¾¤ç»„ä¿¡æ¯]
         * @param  {Array<Group>}      groups   [ç¾¤ç»„åˆ—è¡¨]
         * @param  {OperationCallback} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.syncGroup = function (groups, callback) {
            RongIMLib.CheckParam.getInstance().check(["array", "object"], "syncGroup");
            RongIMClient._dataAccessProvider.syncGroup(groups, callback);
        };
        // #endregion Group
        // #region ChatRoom
        /**
         * [åŠ å…¥èŠå¤©å®¤ã€‚]
         * @param  {string}            chatroomId   [èŠå¤©å®¤Id]
         * @param  {number}            messageCount [æ‹‰å–æ¶ˆæ¯æ•°é‡ï¼Œ-1ä¸ºä¸æ‹‰åŽ»æ¶ˆæ¯]
         * @param  {OperationCallback} callback     [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.joinChatRoom = function (chatroomId, messageCount, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "number", "object"], "joinChatRoom");
            if (chatroomId == "") {
                setTimeout(function () {
                    callback.onError(RongIMLib.ErrorCode.CHATROOM_ID_ISNULL);
                });
                return;
            }
            RongIMClient._dataAccessProvider.joinChatRoom(chatroomId, messageCount, callback);
        };
        RongIMClient.prototype.setChatroomHisMessageTimestamp = function (chatRoomId, timestamp) {
            RongIMLib.CheckParam.getInstance().check(["string", "number"], "setChatroomHisMessageTimestamp");
            RongIMClient._dataAccessProvider.setChatroomHisMessageTimestamp(chatRoomId, timestamp);
        };
        RongIMClient.prototype.getChatRoomHistoryMessages = function (chatRoomId, count, order, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "number", "number", "object"], "getChatRoomHistoryMessages");
            RongIMClient._dataAccessProvider.getChatRoomHistoryMessages(chatRoomId, count, order, callback);
        };
        RongIMClient.prototype.getChatRoomInfo = function (chatRoomId, count, order, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "number", "number", "object"], "getChatRoomInfo");
            RongIMClient._dataAccessProvider.getChatRoomInfo(chatRoomId, count, order, callback);
        };
        /**
         * [é€€å‡ºèŠå¤©å®¤]
         * @param  {string}            chatroomId [èŠå¤©å®¤Id]
         * @param  {OperationCallback} callback   [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.quitChatRoom = function (chatroomId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "quitChatRoom");
            RongIMClient._dataAccessProvider.quitChatRoom(chatroomId, callback);
        };
        // #endregion ChatRoom
        // #region Public Service
        RongIMClient.prototype.getRemotePublicServiceList = function (mpId, conversationType, pullMessageTime, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                var modules = new Modules.PullMpInput(), self = this;
                if (!pullMessageTime) {
                    modules.setTime(0);
                }
                else {
                    modules.setTime(RongIMClient._memoryStore.lastReadTime.get(conversationType + RongIMLib.Bridge._client.userId));
                }
                modules.setMpid("");
                RongIMClient.bridge.queryMsg(28, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                    onSuccess: function (data) {
                        //TODO æ‰¾å‡ºæœ€å¤§æ—¶é—´
                        // self.lastReadTime.set(conversationType + targetId, MessageUtil.int64ToTimestamp(data.syncTime));
                        RongIMClient._memoryStore.publicServiceMap.publicServiceList.length = 0;
                        RongIMClient._memoryStore.publicServiceMap.publicServiceList = data;
                    },
                    onError: function () { }
                }, "PullMpOutput");
            }
        };
        /**
         * [getPublicServiceList ]èŽ·å–æœ¬åœ°çš„å…¬å…±è´¦å·åˆ—è¡¨
         * @param  {ResultCallback<PublicServiceProfile[]>} callback [è¿”å›žå€¼ï¼Œå‚æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.getPublicServiceList = function (callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["object"], "getPublicServiceList");
                callback.onSuccess(RongIMClient._memoryStore.publicServiceMap.publicServiceList);
            }
        };
        /**
         * [getPublicServiceProfile ]   èŽ·å–æŸå…¬å…±æœåŠ¡ä¿¡æ¯ã€‚
         * @param  {PublicServiceType}                    publicServiceType [å…¬ä¼—æœåŠ¡ç±»åž‹ã€‚]
         * @param  {string}                               publicServiceId   [å…¬å…±æœåŠ¡ Idã€‚]
         * @param  {ResultCallback<PublicServiceProfile>} callback          [å…¬å…±è´¦å·ä¿¡æ¯å›žè°ƒã€‚]
         */
        RongIMClient.prototype.getPublicServiceProfile = function (publicServiceType, publicServiceId, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "getPublicServiceProfile");
                var profile = RongIMClient._memoryStore.publicServiceMap.get(publicServiceType, publicServiceId);
                callback.onSuccess(profile);
            }
        };
        /**
         * [pottingPublicSearchType ] å…¬ä¼—å¥½æŸ¥è¯¢ç±»åž‹
         * @param  {number} bussinessType [ 0-all 1-mp 2-mc]
         * @param  {number} searchType    [0-exact 1-fuzzy]
         */
        RongIMClient.prototype.pottingPublicSearchType = function (bussinessType, searchType) {
            if (RongIMClient._memoryStore.depend.openMp) {
                var bits = 0;
                if (bussinessType == 0) {
                    bits |= 3;
                    if (searchType == 0) {
                        bits |= 12;
                    }
                    else {
                        bits |= 48;
                    }
                }
                else if (bussinessType == 1) {
                    bits |= 1;
                    if (searchType == 0) {
                        bits |= 8;
                    }
                    else {
                        bits |= 32;
                    }
                }
                else {
                    bits |= 2;
                    if (bussinessType == 0) {
                        bits |= 4;
                    }
                    else {
                        bits |= 16;
                    }
                }
                return bits;
            }
        };
        /**
         * [searchPublicService ]æŒ‰å…¬ä¼—æœåŠ¡ç±»åž‹æœç´¢å…¬ä¼—æœåŠ¡ã€‚
         * @param  {SearchType}                             searchType [æœç´¢ç±»åž‹æžšä¸¾ã€‚]
         * @param  {string}                                 keywords   [æœç´¢å…³é”®å­—ã€‚]
         * @param  {ResultCallback<PublicServiceProfile[]>} callback   [æœç´¢ç»“æžœå›žè°ƒã€‚]
         */
        RongIMClient.prototype.searchPublicService = function (searchType, keywords, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "searchPublicService");
                var modules = new Modules.SearchMpInput();
                modules.setType(this.pottingPublicSearchType(0, searchType));
                modules.setId(keywords);
                RongIMClient.bridge.queryMsg(29, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, callback, "SearchMpOutput");
            }
        };
        /**
         * [searchPublicServiceByType ]æŒ‰å…¬ä¼—æœåŠ¡ç±»åž‹æœç´¢å…¬ä¼—æœåŠ¡ã€‚
         * @param  {PublicServiceType}                      publicServiceType [å…¬ä¼—æœåŠ¡ç±»åž‹ã€‚]
         * @param  {SearchType}                             searchType        [æœç´¢ç±»åž‹æžšä¸¾ã€‚]
         * @param  {string}                                 keywords          [æœç´¢å…³é”®å­—ã€‚]
         * @param  {ResultCallback<PublicServiceProfile[]>} callback          [æœç´¢ç»“æžœå›žè°ƒã€‚]
         */
        RongIMClient.prototype.searchPublicServiceByType = function (publicServiceType, searchType, keywords, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "number", "string", "object"], "searchPublicServiceByType");
                var type = publicServiceType == RongIMLib.ConversationType.APP_PUBLIC_SERVICE ? 2 : 1;
                var modules = new Modules.SearchMpInput();
                modules.setType(this.pottingPublicSearchType(type, searchType));
                modules.setId(keywords);
                RongIMClient.bridge.queryMsg(29, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, callback, "SearchMpOutput");
            }
        };
        /**
         * [subscribePublicService ] è®¢é˜…å…¬ä¼—å·ã€‚
         * @param  {PublicServiceType} publicServiceType [å…¬ä¼—æœåŠ¡ç±»åž‹ã€‚]
         * @param  {string}            publicServiceId   [å…¬å…±æœåŠ¡ Idã€‚]
         * @param  {OperationCallback} callback          [è®¢é˜…å…¬ä¼—å·å›žè°ƒã€‚]
         */
        RongIMClient.prototype.subscribePublicService = function (publicServiceType, publicServiceId, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "subscribePublicService");
                var modules = new Modules.MPFollowInput(), me = this, follow = publicServiceType == RongIMLib.ConversationType.APP_PUBLIC_SERVICE ? "mcFollow" : "mpFollow";
                modules.setId(publicServiceId);
                RongIMClient.bridge.queryMsg(follow, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                    onSuccess: function () {
                        me.getRemotePublicServiceList(null, null, null, {
                            onSuccess: function () { },
                            onError: function () { }
                        });
                        callback.onSuccess();
                    },
                    onError: function () {
                        callback.onError(RongIMLib.ErrorCode.SUBSCRIBE_ERROR);
                    }
                }, "MPFollowOutput");
            }
        };
        /**
         * [unsubscribePublicService ] å–æ¶ˆè®¢é˜…å…¬ä¼—å·ã€‚
         * @param  {PublicServiceType} publicServiceType [å…¬ä¼—æœåŠ¡ç±»åž‹ã€‚]
         * @param  {string}            publicServiceId   [å…¬å…±æœåŠ¡ Idã€‚]
         * @param  {OperationCallback} callback          [å–æ¶ˆè®¢é˜…å…¬ä¼—å·å›žè°ƒã€‚]
         */
        RongIMClient.prototype.unsubscribePublicService = function (publicServiceType, publicServiceId, callback) {
            if (RongIMClient._memoryStore.depend.openMp) {
                RongIMLib.CheckParam.getInstance().check(["number", "string", "object"], "unsubscribePublicService");
                var modules = new Modules.MPFollowInput(), me = this, follow = publicServiceType == RongIMLib.ConversationType.APP_PUBLIC_SERVICE ? "mcUnFollow" : "mpUnFollow";
                modules.setId(publicServiceId);
                RongIMClient.bridge.queryMsg(follow, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                    onSuccess: function () {
                        RongIMClient._memoryStore.publicServiceMap.remove(publicServiceType, publicServiceId);
                        callback.onSuccess();
                    },
                    onError: function () {
                        callback.onError(RongIMLib.ErrorCode.SUBSCRIBE_ERROR);
                    }
                }, "MPFollowOutput");
            }
        };
        // #endregion Public Service
        // #region Blacklist
        /**
         * [åŠ å…¥é»‘åå•]
         * @param  {string}            userId   [å°†è¢«åŠ å…¥é»‘åå•çš„ç”¨æˆ·Id]
         * @param  {OperationCallback} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.addToBlacklist = function (userId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "addToBlacklist");
            RongIMClient._dataAccessProvider.addToBlacklist(userId, callback);
        };
        /**
         * [èŽ·å–é»‘åå•åˆ—è¡¨]
         * @param  {GetBlacklistCallback} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.getBlacklist = function (callback) {
            RongIMLib.CheckParam.getInstance().check(["object"], "getBlacklist");
            RongIMClient._dataAccessProvider.getBlacklist(callback);
        };
        /**
         * [å¾—åˆ°æŒ‡å®šäººå‘˜å†é»‘åå•ä¸­çš„çŠ¶æ€]
         * @param  {string}                          userId   [description]
         * @param  {ResultCallback<BlacklistStatus>} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        //TODO å¦‚æžœäººå‘˜ä¸åœ¨é»‘åå•ä¸­ï¼ŒèŽ·å–çŠ¶æ€ä¼šå‡ºçŽ°å¼‚å¸¸
        RongIMClient.prototype.getBlacklistStatus = function (userId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "getBlacklistStatus");
            RongIMClient._dataAccessProvider.getBlacklistStatus(userId, callback);
        };
        /**
         * [å°†æŒ‡å®šç”¨æˆ·ç§»é™¤é»‘åå•]
         * @param  {string}            userId   [å°†è¢«ç§»é™¤çš„ç”¨æˆ·Id]
         * @param  {OperationCallback} callback [è¿”å›žå€¼ï¼Œå‡½æ•°å›žè°ƒ]
         */
        RongIMClient.prototype.removeFromBlacklist = function (userId, callback) {
            RongIMLib.CheckParam.getInstance().check(["string", "object"], "removeFromBlacklist");
            RongIMClient._dataAccessProvider.removeFromBlacklist(userId, callback);
        };
        RongIMClient.prototype.getFileToken = function (fileType, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "object"], "getQnTkn");
            RongIMClient._dataAccessProvider.getFileToken(fileType, callback);
        };
        RongIMClient.prototype.getFileUrl = function (fileType, fileName, oriName, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "string|global|object|null", "object"], "getQnTkn");
            RongIMClient._dataAccessProvider.getFileUrl(fileType, fileName, oriName, callback);
        };
        ;
        // #endregion Blacklist
        // #region Real-time Location Service
        RongIMClient.prototype.addRealTimeLocationListener = function (conversationType, targetId, listener) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.getRealTimeLocation = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.getRealTimeLocationCurrentState = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.getRealTimeLocationParticipants = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.joinRealTimeLocation = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.quitRealTimeLocation = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.startRealTimeLocation = function (conversationType, targetId) {
            throw new Error("Not implemented yet");
        };
        RongIMClient.prototype.updateRealTimeLocationStatus = function (conversationType, targetId, latitude, longitude) {
            throw new Error("Not implemented yet");
        };
        // #endregion Real-time Location Service
        // # startVoIP
        RongIMClient.prototype.startCall = function (converType, targetId, userIds, mediaType, extra, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "array", "number", "string", "object"], "startCall");
            if (RongIMClient._memoryStore.voipStategy) {
                RongIMClient._voipProvider.startCall(converType, targetId, userIds, mediaType, extra, callback);
            }
            else {
                callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);
            }
        };
        RongIMClient.prototype.joinCall = function (mediaType, callback) {
            RongIMLib.CheckParam.getInstance().check(['number', 'object'], "joinCall");
            if (RongIMClient._memoryStore.voipStategy) {
                RongIMClient._voipProvider.joinCall(mediaType, callback);
            }
            else {
                callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);
            }
        };
        RongIMClient.prototype.hungupCall = function (converType, targetId, reason) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "number"], "hungupCall");
            if (RongIMClient._memoryStore.voipStategy) {
                RongIMClient._voipProvider.hungupCall(converType, targetId, reason);
            }
        };
        RongIMClient.prototype.changeMediaType = function (converType, targetId, mediaType, callback) {
            RongIMLib.CheckParam.getInstance().check(["number", "string", "number", "object"], "changeMediaType");
            if (RongIMClient._memoryStore.voipStategy) {
                RongIMClient._voipProvider.changeMediaType(converType, targetId, mediaType, callback);
            }
            else {
                callback.onError(RongIMLib.ErrorCode.VOIP_NOT_AVALIABLE);
            }
        };
        // # endVoIP
        RongIMClient.prototype.getUnreadMentionedMessages = function (conversationType, targetId) {
            return RongIMClient._dataAccessProvider.getUnreadMentionedMessages(conversationType, targetId);
        };
        RongIMClient.prototype.clearListeners = function () {
            RongIMClient._dataAccessProvider.clearListeners();
        };
        // UserStatus start
        RongIMClient.prototype.getUserStatus = function (userId, callback) {
            RongIMClient._dataAccessProvider.getUserStatus(userId, callback);
        };
        RongIMClient.prototype.setUserStatus = function (status, callback) {
            RongIMClient._dataAccessProvider.setUserStatus(status, callback);
        };
        RongIMClient.prototype.subscribeUserStatus = function (userIds, callback) {
            RongIMClient._dataAccessProvider.subscribeUserStatus(userIds, callback);
        };
        RongIMClient.prototype.setOnReceiveStatusListener = function (callback) {
            RongIMClient._dataAccessProvider.setOnReceiveStatusListener(callback);
        };
        RongIMClient.MessageType = {};
        RongIMClient.RegisterMessage = {};
        RongIMClient._memoryStore = { listenerList: [] };
        RongIMClient.isNotPullMsg = false;
        return RongIMClient;
    }());
    RongIMLib.RongIMClient = RongIMClient;
    //å…¼å®¹AMD CMD
    if ("function" === typeof require && "object" === typeof module && module && module.id && "object" === typeof exports && exports) {
        module.exports = RongIMLib;
    }
    else if ("function" === typeof define && define.amd) {
        var browser = navigator.appName, b_version = navigator.appVersion, version = b_version.split(";"), isPolling = false;
        if (version.length > 1) {
            var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
            if (trim_Version < 10) {
                isPolling = true;
            }
        }
        if (isPolling) {
            define("RongIMLib", ['md5'], function () {
                return RongIMLib;
            });
        }
        else {
            // var lurl: string = RongIMClient._memoryStore.depend.long;
            // var burl: string = RongIMClient._memoryStore.depend.byteBuffer;
            // var purl: string = RongIMClient._memoryStore.depend.protobuf;
            define("RongIMLib", ['md5'], function () {
                return RongIMLib;
            });
        }
    }
    else {
        window.RongIMClient = RongIMClient;
    }
})(RongIMLib || (RongIMLib = {}));
//ç”¨äºŽè¿žæŽ¥é€šé“
var RongIMLib;
(function (RongIMLib) {
    (function (Qos) {
        Qos[Qos["AT_MOST_ONCE"] = 0] = "AT_MOST_ONCE";
        Qos[Qos["AT_LEAST_ONCE"] = 1] = "AT_LEAST_ONCE";
        Qos[Qos["EXACTLY_ONCE"] = 2] = "EXACTLY_ONCE";
        Qos[Qos["DEFAULT"] = 3] = "DEFAULT";
    })(RongIMLib.Qos || (RongIMLib.Qos = {}));
    var Qos = RongIMLib.Qos;
    (function (Type) {
        Type[Type["CONNECT"] = 1] = "CONNECT";
        Type[Type["CONNACK"] = 2] = "CONNACK";
        Type[Type["PUBLISH"] = 3] = "PUBLISH";
        Type[Type["PUBACK"] = 4] = "PUBACK";
        Type[Type["QUERY"] = 5] = "QUERY";
        Type[Type["QUERYACK"] = 6] = "QUERYACK";
        Type[Type["QUERYCON"] = 7] = "QUERYCON";
        Type[Type["SUBSCRIBE"] = 8] = "SUBSCRIBE";
        Type[Type["SUBACK"] = 9] = "SUBACK";
        Type[Type["UNSUBSCRIBE"] = 10] = "UNSUBSCRIBE";
        Type[Type["UNSUBACK"] = 11] = "UNSUBACK";
        Type[Type["PINGREQ"] = 12] = "PINGREQ";
        Type[Type["PINGRESP"] = 13] = "PINGRESP";
        Type[Type["DISCONNECT"] = 14] = "DISCONNECT";
    })(RongIMLib.Type || (RongIMLib.Type = {}));
    var Type = RongIMLib.Type;
    var _topic = ["invtDiz", "crDiz", "qnUrl", "userInf", "dizInf", "userInf", "joinGrp", "quitDiz", "exitGrp", "evctDiz",
        ["", "ppMsgP", "pdMsgP", "pgMsgP", "chatMsg", "pcMsgP", "", "pmcMsgN", "pmpMsgN"], "pdOpen", "rename", "uGcmpr", "qnTkn", "destroyChrm",
        "createChrm", "exitChrm", "queryChrm", "joinChrm", "pGrps", "addBlack", "rmBlack", "getBlack", "blackStat", "addRelation", "qryRelation", "delRelation", "pullMp", "schMp", "qnTkn", "qnUrl", "qryVoipK", "delMsg", "qryCHMsg"];
    var Channel = (function () {
        function Channel(address, cb, self) {
            this.connectionStatus = -1;
            this.delOnChangedCount = 0;
            this.url = address.host + "/websocket?appId=" + self.appId + "&token=" + encodeURIComponent(self.token) + "&sdkVer=" + self.sdkVer + "&apiVer=" + self.apiVer;
            this.self = self;
            this.socket = Socket.getInstance().createServer();
            this.socket.connect(this.url, cb);
            //æ³¨å†ŒçŠ¶æ€æ”¹å˜è§‚å¯Ÿè€…
            if (typeof Channel._ConnectionStatusListener == "object" && "onChanged" in Channel._ConnectionStatusListener) {
                var me = this;
                me.socket.on("StatusChanged", function (code) {
                    me.connectionStatus = code;
                    if (code === RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE) {
                        var temp = RongIMLib.RongIMClient._storageProvider.getItemKey("navi");
                        var naviServer = RongIMLib.RongIMClient._storageProvider.getItem(temp);
                        var naviPort = naviServer.split(",")[0].split(":")[1];
                        naviPort && naviPort.length < 4 || RongIMLib.RongIMClient._storageProvider.setItem("rongSDK", "");
                        // TODO  åˆ¤æ–­æ‹†åˆ† naviServer åŽçš„æ•°ç»„é•¿åº¦ã€‚
                        if (!RongIMLib.RongIMClient._memoryStore.depend.isPolling && naviPort && naviPort.length < 4) {
                            Bridge._client.handler.connectCallback.pauseTimer();
                            var temp = RongIMLib.RongIMClient._storageProvider.getItemKey("navi");
                            var server = RongIMLib.RongIMClient._storageProvider.getItem("RongBackupServer");
                            if (server) {
                                var arrs = server.split(",");
                                if (arrs.length < 2) {
                                    throw new Error("navi server is empty,postion:StatusChanged");
                                }
                                RongIMLib.RongIMClient._storageProvider.setItem(temp, RongIMLib.RongIMClient._storageProvider.getItem("RongBackupServer"));
                                var url = RongIMLib.Bridge._client.channel.socket.currentURL;
                                Bridge._client.channel.socket.currentURL = arrs[0] + url.substring(url.indexOf("/"), url.length);
                                if (Bridge._client.channel && Bridge._client.channel.connectionStatus != RongIMLib.ConnectionStatus.CONNECTED && Bridge._client.channel.connectionStatus != RongIMLib.ConnectionStatus.CONNECTING) {
                                    RongIMLib.RongIMClient.connect(RongIMLib.RongIMClient._memoryStore.token, RongIMLib.RongIMClient._memoryStore.callback);
                                }
                            }
                        }
                    }
                    if (code === RongIMLib.ConnectionStatus.DISCONNECTED && !RongIMLib.RongIMClient._memoryStore.otherDevice) {
                        Channel._ConnectionStatusListener.onChanged(RongIMLib.ConnectionStatus.DISCONNECTED);
                        self.clearHeartbeat();
                        return;
                    }
                    else if (code === RongIMLib.ConnectionStatus.DISCONNECTED && RongIMLib.RongIMClient._memoryStore.otherDevice) {
                        return;
                    }
                    Channel._ConnectionStatusListener.onChanged(code);
                    if (RongIMLib.RongIMClient._memoryStore.otherDevice) {
                        if (me.delOnChangedCount > 5) {
                            delete Channel._ConnectionStatusListener["onChanged"];
                        }
                        me.delOnChangedCount++;
                    }
                });
            }
            else {
                throw new Error("setConnectStatusListener:Parameter format is incorrect");
            }
            //æ³¨å†Œmessageè§‚å¯Ÿè€…
            this.socket.on("message", self.handler.handleMessage);
            //æ³¨å†Œæ–­å¼€è¿žæŽ¥è§‚å¯Ÿè€…
            this.socket.on("disconnect", function (status) {
                self.channel.socket.fire("StatusChanged", status ? status : 2);
            });
        }
        Channel.prototype.writeAndFlush = function (val) {
            this.socket.send(val);
        };
        Channel.prototype.reconnect = function (callback) {
            RongIMLib.MessageIdHandler.clearMessageId();
            this.socket = this.socket.reconnect();
            if (callback) {
                this.self.reconnectObj = callback;
            }
        };
        Channel.prototype.disconnect = function (status) {
            this.socket.disconnect(status);
        };
        return Channel;
    }());
    RongIMLib.Channel = Channel;
    var Socket = (function () {
        function Socket() {
            this.socket = null;
            this._events = {};
        }
        Socket.getInstance = function () {
            return new Socket();
        };
        Socket.prototype.connect = function (url, cb) {
            if (this.socket) {
                if (url) {
                    RongIMLib.RongIMClient._storageProvider.setItem("rongSDK", this.checkTransport());
                    this.on("connect", cb || new Function);
                }
                if (url) {
                    this.currentURL = url;
                }
                this.socket.createTransport(url);
            }
            return this;
        };
        Socket.prototype.createServer = function () {
            var transport = this.getTransport(this.checkTransport());
            if (transport === null) {
                throw new Error("the channel was not supported");
            }
            return transport;
        };
        Socket.prototype.getTransport = function (transportType) {
            if (transportType == Socket.XHR_POLLING) {
                this.socket = new RongIMLib.PollingTransportation(this);
            }
            else if (transportType == Socket.WEBSOCKET) {
                this.socket = new RongIMLib.SocketTransportation(this);
            }
            return this;
        };
        Socket.prototype.send = function (data) {
            if (this.socket) {
                if (this.checkTransport() == Socket.WEBSOCKET) {
                    this.socket.send(data);
                }
                else {
                    this.socket.send(this._encode(data));
                }
            }
        };
        Socket.prototype.onMessage = function (data) {
            this.fire("message", data);
        };
        Socket.prototype.disconnect = function (status) {
            if (RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT === status) {
                RongIMLib.RongIMClient._memoryStore.otherDevice = true;
            }
            this.socket.disconnect(status);
            this.fire("disconnect", status);
            return this;
        };
        Socket.prototype.reconnect = function () {
            if (this.currentURL) {
                return this.connect(this.currentURL, null);
            }
            else {
                throw new Error("reconnect:no have URL");
            }
        };
        /**
         * [checkTransport è¿”å›žé€šé“ç±»åž‹]
         */
        Socket.prototype.checkTransport = function () {
            if (RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                RongIMLib.Transportations._TransportType = Socket.XHR_POLLING;
            }
            return RongIMLib.Transportations._TransportType;
        };
        Socket.prototype.fire = function (x, args) {
            if (x in this._events) {
                for (var i = 0, ii = this._events[x].length; i < ii; i++) {
                    this._events[x][i](args);
                }
            }
            return this;
        };
        Socket.prototype.on = function (x, func) {
            if (!(typeof func == "function" && x)) {
                return this;
            }
            if (x in this._events) {
                RongIMLib.MessageUtil.indexOf(this._events, func) == -1 && this._events[x].push(func);
            }
            else {
                this._events[x] = [func];
            }
            return this;
        };
        Socket.prototype.removeEvent = function (x, fn) {
            if (x in this._events) {
                for (var a = 0, l = this._events[x].length; a < l; a++) {
                    if (this._events[x][a] == fn) {
                        this._events[x].splice(a, 1);
                    }
                }
            }
            return this;
        };
        Socket.prototype._encode = function (x) {
            var str = "?messageid=" + x.getMessageId() + "&header=" + x.getHeaderFlag() + "&sessionid=" + RongIMLib.RongIMClient._storageProvider.getItem("sId" + RongIMLib.Navigation.Endpoint.userId);
            if (!/(PubAckMessage|QueryConMessage)/.test(x._name)) {
                str += "&topic=" + x.getTopic() + "&targetid=" + (x.getTargetId() || "");
            }
            return {
                url: str,
                data: "getData" in x ? x.getData() : ""
            };
        };
        //æ¶ˆæ¯é€šé“å¸¸é‡ï¼Œæ‰€æœ‰å’Œé€šé“ç›¸å…³åˆ¤æ–­å‡ç”¨ XHR_POLLING WEBSOCKETä¸¤å±žæ€§
        Socket.XHR_POLLING = "xhr-polling";
        Socket.WEBSOCKET = "websocket";
        return Socket;
    }());
    RongIMLib.Socket = Socket;
    //è¿žæŽ¥ç«¯æ¶ˆæ¯ç´¯
    var Client = (function () {
        function Client(token, appId) {
            this.timeoutMillis = 100000;
            this.timeout_ = 0;
            this.sdkVer = "2.2.4";
            this.apiVer = Math.floor(Math.random() * 1e6);
            this.channel = null;
            this.handler = null;
            this.userId = "";
            this.reconnectObj = {};
            this.heartbeat = 0;
            this.pullMsgHearbeat = 0;
            this.chatroomId = "";
            this.SyncTimeQueue = [];
            this.cacheMessageIds = [];
            this.token = token;
            this.appId = appId;
            this.SyncTimeQueue.state = "complete";
        }
        Client.prototype.resumeTimer = function () {
            if (!this.timeout_) {
                this.timeout_ = setTimeout(function () {
                    if (!this.timeout_) {
                        return;
                    }
                    try {
                        this.channel.disconnect();
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                    clearTimeout(this.timeout_);
                    this.timeout_ = 0;
                    this.channel.reconnect();
                    this.channel.socket.fire("StatusChanged", 5);
                }, this.timeoutMillis);
            }
        };
        Client.prototype.pauseTimer = function () {
            if (this.timeout_) {
                clearTimeout(this.timeout_);
                this.timeout_ = 0;
            }
        };
        Client.prototype.connect = function (_callback) {
            if (RongIMLib.Navigation.Endpoint.host) {
                if (RongIMLib.Transportations._TransportType == Socket.WEBSOCKET) {
                    if (!window.WebSocket) {
                        _callback.onError(RongIMLib.ConnectionState.UNACCEPTABLE_PROTOCOL_VERSION);
                        return;
                    }
                }
                //å®žä¾‹æ¶ˆæ¯å¤„ç†ç±»
                this.handler = new MessageHandler(this);
                //è®¾ç½®è¿žæŽ¥å›žè°ƒ
                this.handler.setConnectCallback(_callback);
                //å®žä¾‹é€šé“ç±»åž‹
                var me = this;
                this.channel = new Channel(RongIMLib.Navigation.Endpoint, function () {
                    RongIMLib.Transportations._TransportType == Socket.WEBSOCKET && me.keepLive();
                }, this);
                //è§¦å‘çŠ¶æ€æ”¹å˜è§‚å¯Ÿè€…
                this.channel.socket.fire("StatusChanged", 1);
            }
            else {
                //æ²¡æœ‰è¿”å›žåœ°å€å°±æ‰‹åŠ¨æŠ›å‡ºé”™è¯¯
                _callback.onError(RongIMLib.ConnectionState.NOT_AUTHORIZED);
            }
        };
        Client.prototype.checkSocket = function (callback) {
            var me = this;
            me.channel.writeAndFlush(new RongIMLib.PingReqMessage());
            var checkTimeout = setInterval(function () {
                if (!RongIMLib.RongIMClient._memoryStore.isFirstPingMsg) {
                    callback.onSuccess();
                    clearInterval(checkTimeout);
                }
                else {
                    if (count > 15) {
                        clearInterval(checkTimeout);
                        callback.onError();
                    }
                }
                count++;
            }, 200), count = 0;
        };
        Client.prototype.keepLive = function () {
            if (this.heartbeat > 0) {
                clearInterval(this.heartbeat);
            }
            var me = this;
            me.heartbeat = setInterval(function () {
                me.resumeTimer();
                me.channel.writeAndFlush(new RongIMLib.PingReqMessage());
            }, 30000);
            if (me.pullMsgHearbeat > 0) {
                clearInterval(me.pullMsgHearbeat);
            }
            me.pullMsgHearbeat = setInterval(function () {
                me.syncTime(true, undefined, undefined, false);
            }, 180000);
        };
        Client.prototype.clearHeartbeat = function () {
            clearInterval(this.heartbeat);
            this.heartbeat = 0;
            this.pauseTimer();
            clearInterval(this.pullMsgHearbeat);
            this.pullMsgHearbeat = 0;
        };
        Client.prototype.publishMessage = function (_topic, _data, _targetId, _callback, _msg) {
            var msgId = RongIMLib.MessageIdHandler.messageIdPlus(this.channel.reconnect);
            if (!msgId) {
                return;
            }
            var msg = new RongIMLib.PublishMessage(_topic, _data, _targetId);
            msg.setMessageId(msgId);
            if (_callback) {
                msg.setQos(Qos.AT_LEAST_ONCE);
                this.handler.putCallback(new RongIMLib.PublishCallback(_callback.onSuccess, _callback.onError), msg.getMessageId(), _msg);
            }
            else {
                msg.setQos(Qos.AT_MOST_ONCE);
            }
            this.channel.writeAndFlush(msg);
        };
        Client.prototype.queryMessage = function (_topic, _data, _targetId, _qos, _callback, pbtype) {
            if (_topic == "userInf") {
                if (Client.userInfoMapping[_targetId]) {
                    _callback.onSuccess(Client.userInfoMapping[_targetId]);
                    return;
                }
            }
            var msgId = RongIMLib.MessageIdHandler.messageIdPlus(this.channel.reconnect);
            if (!msgId) {
                return;
            }
            var msg = new RongIMLib.QueryMessage(_topic, _data, _targetId);
            msg.setMessageId(msgId);
            msg.setQos(_qos);
            this.handler.putCallback(new RongIMLib.QueryCallback(_callback.onSuccess, _callback.onError), msg.getMessageId(), pbtype);
            this.channel.writeAndFlush(msg);
        };
        Client.prototype.invoke = function (isPullMsg, chrmId, offlineMsg) {
            var time, modules, str, me = this, target, temp = this.SyncTimeQueue.shift();
            if (temp == undefined) {
                return;
            }
            this.SyncTimeQueue.state = "pending";
            if (temp.type != 2) {
                //æ™®é€šæ¶ˆæ¯
                time = RongIMLib.RongIMClient._storageProvider.getItem(this.userId) || '0';
                modules = new Modules.SyncRequestMsg();
                modules.setIspolling(false);
                str = "pullMsg";
                target = this.userId;
            }
            else {
                //èŠå¤©å®¤æ¶ˆæ¯
                target = chrmId || me.chatroomId;
                time = RongIMLib.RongIMClient._memoryStore.lastReadTime.get(target + Bridge._client.userId + "CST") || 0;
                modules = new Modules.ChrmPullMsg();
                modules.setCount(0);
                str = "chrmPull";
                if (!target) {
                    throw new Error("syncTime:Received messages of chatroom but was not init");
                }
            }
            //åˆ¤æ–­æœåŠ¡å™¨ç»™çš„æ—¶é—´æ˜¯å¦æ¶ˆæ¯æœ¬åœ°å­˜å‚¨çš„æ—¶é—´ï¼Œå°äºŽçš„è¯ä¸æ‰§è¡Œæ‹‰å–æ“ä½œï¼Œè¿›è¡Œä¸€ä¸‹æ­¥é˜Ÿåˆ—æ“ä½œ
            if (temp.pulltime <= time) {
                this.SyncTimeQueue.state = "complete";
                this.invoke(isPullMsg, target);
                return;
            }
            if (isPullMsg && 'setIsPullSend' in modules) {
                modules.setIsPullSend(true);
            }
            modules.setSyncTime(time);
            //å‘é€queryMessageè¯·æ±‚
            this.queryMessage(str, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), target, Qos.AT_LEAST_ONCE, {
                onSuccess: function (collection) {
                    var sync = RongIMLib.MessageUtil.int64ToTimestamp(collection.syncTime), symbol = target;
                    //æŠŠè¿”å›žæ—¶é—´æˆ³å­˜å…¥æœ¬åœ°ï¼Œæ™®é€šæ¶ˆæ¯keyä¸ºuseridï¼ŒèŠå¤©å®¤æ¶ˆæ¯keyä¸ºuseridï¼‹'CST'ï¼›valueéƒ½ä¸ºæœåŠ¡å™¨è¿”å›žçš„æ—¶é—´æˆ³
                    if (str == "chrmPull") {
                        symbol += Bridge._client.userId + "CST";
                        RongIMLib.RongIMClient._memoryStore.lastReadTime.set(symbol, sync);
                    }
                    else {
                        var storage = RongIMLib.RongIMClient._storageProvider;
                        if (sync > storage.getItem(symbol)) {
                            storage.setItem(symbol, sync);
                        }
                    }
                    //é˜²æ­¢å› ç¦»çº¿æ¶ˆæ¯é€ æˆä¼šè¯åˆ—è¡¨ä¸ä¸ºç©ºè€Œæ— æ³•ä»ŽæœåŠ¡å™¨æ‹‰å–ä¼šè¯åˆ—è¡¨ã€‚
                    offlineMsg && (RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList = true);
                    me.SyncTimeQueue.state = "complete";
                    me.invoke(isPullMsg, target);
                    //æŠŠæ‹‰å–åˆ°çš„æ¶ˆæ¯é€æ¡ä¼ ç»™æ¶ˆæ¯ç›‘å¬å™¨
                    var list = collection.list;
                    for (var i = 0, len = list.length, count = len; i < len; i++) {
                        if (!(list[i].msgId in me.cacheMessageIds)) {
                            Bridge._client.handler.onReceived(list[i], undefined, offlineMsg, --count);
                            var arrLen = me.cacheMessageIds.unshift(list[i].msgId);
                            if (arrLen > 20)
                                me.cacheMessageIds.length = 20;
                        }
                    }
                },
                onError: function (error) {
                    me.SyncTimeQueue.state = "complete";
                    me.invoke(isPullMsg, target);
                }
            }, "DownStreamMessages");
        };
        Client.prototype.syncTime = function (_type, pullTime, chrmId, offlineMsg) {
            this.SyncTimeQueue.push({ type: _type, pulltime: pullTime });
            //å¦‚æžœé˜Ÿåˆ—ä¸­åªæœ‰ä¸€ä¸ªæˆå‘˜å¹¶ä¸”çŠ¶æ€å·²ç»å®Œæˆå°±æ‰§è¡Œinvokeæ–¹æ³•
            if (this.SyncTimeQueue.length == 1 && this.SyncTimeQueue.state == "complete") {
                this.invoke(!_type, chrmId, offlineMsg);
            }
        };
        Client.prototype.__init = function (f) {
            this.channel = new Channel(RongIMLib.Navigation.Endpoint, f, this);
        };
        Client.userInfoMapping = {};
        return Client;
    }());
    RongIMLib.Client = Client;
    //è¿žæŽ¥ç±»ï¼Œå®žçŽ°imclientä¸Žconnect_clientçš„è¿žæŽ¥
    var Bridge = (function () {
        function Bridge() {
        }
        Bridge.getInstance = function () {
            return new Bridge();
        };
        //è¿žæŽ¥æœåŠ¡å™¨
        Bridge.prototype.connect = function (appKey, token, callback) {
            if (!window["Modules"]) {
                RongIMLib.RongIMClient._memoryStore.hasModules = false;
                return;
            }
            Bridge._client = new RongIMLib.Navigation().connect(appKey, token, callback);
            return Bridge._client;
        };
        Bridge.prototype.setListener = function (_changer) {
            if (typeof _changer == "object") {
                if (typeof _changer.onChanged == "function") {
                    Channel._ConnectionStatusListener = _changer;
                }
                else if (typeof _changer.onReceived == "function") {
                    Channel._ReceiveMessageListener = _changer;
                }
            }
        };
        Bridge.prototype.reconnect = function (callabck) {
            Bridge._client.channel.reconnect(callabck);
        };
        Bridge.prototype.disconnect = function () {
            Bridge._client.clearHeartbeat();
            Bridge._client.channel.disconnect(2);
        };
        //æ‰§è¡ŒqueryMessageè¯·æ±‚
        Bridge.prototype.queryMsg = function (topic, content, targetId, callback, pbname) {
            if (typeof topic != "string") {
                topic = _topic[topic];
            }
            Bridge._client.queryMessage(topic, content, targetId, Qos.AT_MOST_ONCE, callback, pbname);
        };
        //å‘é€æ¶ˆæ¯ æ‰§è¡ŒpublishMessage è¯·æ±‚
        Bridge.prototype.pubMsg = function (topic, content, targetId, callback, msg, methodType) {
            if (typeof methodType == 'number') {
                if (methodType == RongIMLib.MethodType.CUSTOMER_SERVICE) {
                    Bridge._client.publishMessage("pcuMsgP", content, targetId, callback, msg);
                }
                else if (methodType == RongIMLib.MethodType.RECALL) {
                    Bridge._client.publishMessage("recallMsg", content, targetId, callback, msg);
                }
            }
            else {
                Bridge._client.publishMessage(_topic[10][topic], content, targetId, callback, msg);
            }
        };
        return Bridge;
    }());
    RongIMLib.Bridge = Bridge;
    var MessageHandler = (function () {
        function MessageHandler(client) {
            this.map = {};
            this.connectCallback = null;
            if (!Channel._ReceiveMessageListener) {
                throw new Error("please set onReceiveMessageListener");
            }
            this._onReceived = Channel._ReceiveMessageListener.onReceived;
            this._client = client;
            this.syncMsgMap = new Object;
        }
        //æŠŠå¯¹è±¡æŽ¨å…¥å›žè°ƒå¯¹è±¡é˜Ÿåˆ—ä¸­ï¼Œå¹¶å¯åŠ¨å®šæ—¶å™¨
        MessageHandler.prototype.putCallback = function (callbackObj, _publishMessageId, _msg) {
            var item = {
                Callback: callbackObj,
                Message: _msg
            };
            item.Callback.resumeTimer();
            this.map[_publishMessageId] = item;
        };
        //è®¾ç½®è¿žæŽ¥å›žè°ƒå¯¹è±¡ï¼Œå¯åŠ¨å®šæ—¶å™¨
        MessageHandler.prototype.setConnectCallback = function (_connectCallback) {
            if (_connectCallback) {
                this.connectCallback = new RongIMLib.ConnectAck(_connectCallback.onSuccess, _connectCallback.onError, this._client);
                this.connectCallback.resumeTimer();
            }
        };
        MessageHandler.prototype.onReceived = function (msg, pubAckItem, offlineMsg, leftCount) {
            //å®žä½“å¯¹è±¡
            var entity, 
            //è§£æžå®Œæˆçš„æ¶ˆæ¯å¯¹è±¡
            message, 
            //ä¼šè¯å¯¹è±¡
            con;
            if (msg._name != "PublishMessage") {
                entity = msg;
                RongIMLib.RongIMClient._storageProvider.setItem(this._client.userId, RongIMLib.MessageUtil.int64ToTimestamp(entity.dataTime));
            }
            else {
                if (msg.getTopic() == "s_ntf") {
                    entity = Modules.NotifyMsg.decode(msg.getData());
                    this._client.syncTime(entity.type, RongIMLib.MessageUtil.int64ToTimestamp(entity.time), entity.chrmId);
                    return;
                }
                else if (msg.getTopic() == "s_msg") {
                    entity = Modules.DownStreamMessage.decode(msg.getData());
                    var timestamp = RongIMLib.MessageUtil.int64ToTimestamp(entity.dataTime);
                    RongIMLib.RongIMClient._storageProvider.setItem(this._client.userId, timestamp);
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.get(this._client.userId, timestamp);
                }
                else {
                    if (Bridge._client.sdkVer && Bridge._client.sdkVer == "1.0.0") {
                        return;
                    }
                    entity = Modules.UpStreamMessage.decode(msg.getData());
                    var tmpTopic = msg.getTopic();
                    var tmpType = tmpTopic.substr(0, 2);
                    if (tmpType == "pp") {
                        entity.type = 1;
                    }
                    else if (tmpType == "pd") {
                        entity.type = 2;
                    }
                    else if (tmpType == "pg") {
                        entity.type = 3;
                    }
                    else if (tmpType == "ch") {
                        entity.type = 4;
                    }
                    else if (tmpType == "pc") {
                        entity.type = 5;
                    }
                    //å¤ç”¨å­—æ®µï¼ŒtargetId ä»¥æ­¤ä¸ºå‡†
                    entity.groupId = msg.getTargetId();
                    entity.fromUserId = this._client.userId;
                    entity.dataTime = Date.parse(new Date().toString());
                }
                if (!entity) {
                    return;
                }
            }
            //è§£æžå®žä½“å¯¹è±¡ä¸ºæ¶ˆæ¯å¯¹è±¡ã€‚
            message = RongIMLib.MessageUtil.messageParser(entity, this._onReceived, offlineMsg);
            if (pubAckItem) {
                message.messageUId = pubAckItem.getMessageUId();
                message.sentTime = pubAckItem.getTimestamp();
            }
            if (message === null) {
                return;
            }
            // è®¾ç½®ä¼šè¯æ—¶é—´æˆ³å¹¶ä¸”åˆ¤æ–­æ˜¯å¦ä¼ é€’ message  å‘é€æ¶ˆæ¯æœªå¤„ç†ä¼šè¯æ—¶é—´æˆ³
            // keyï¼š'converST_' + å½“å‰ç”¨æˆ· + conversationType + targetId
            // RongIMClient._storageProvider.setItem('converST_' + Bridge._client.userId + message.conversationType + message.targetId, message.sentTime);
            var stKey = 'converST_' + Bridge._client.userId + message.conversationType + message.targetId;
            var stValue = RongIMLib.RongIMClient._memoryStore.lastReadTime.get(stKey);
            if (stValue) {
                if (message.sentTime > stValue) {
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.set(stKey, message.sentTime);
                }
                else {
                    return;
                }
            }
            else {
                RongIMLib.RongIMClient._memoryStore.lastReadTime.set(stKey, message.sentTime);
            }
            if (RongIMLib.RongIMClient.MessageParams[message.messageType].msgTag.getMessageTag() == 3) {
                RongIMLib.RongIMClient._dataAccessProvider.getConversation(message.conversationType, message.targetId, {
                    onSuccess: function (con) {
                        if (!con) {
                            con = RongIMLib.RongIMClient.getInstance().createConversation(message.conversationType, message.targetId, "");
                        }
                        if (message.messageDirection == RongIMLib.MessageDirection.RECEIVE && (entity.status & 64) == 64) {
                            var mentioneds = RongIMLib.RongIMClient._storageProvider.getItem("mentioneds_" + Bridge._client.userId + '_' + message.conversationType + '_' + message.targetId);
                            var key = message.conversationType + '_' + message.targetId, info = {};
                            if (message.content && message.content.mentionedInfo) {
                                info[key] = { uid: message.messageUId, time: message.sentTime, mentionedInfo: message.content.mentionedInfo };
                                RongIMLib.RongIMClient._storageProvider.setItem("mentioneds_" + Bridge._client.userId + '_' + message.conversationType + '_' + message.targetId, JSON.stringify(info));
                                mentioneds = JSON.stringify(info);
                            }
                            if (mentioneds) {
                                var info = JSON.parse(mentioneds);
                                con.mentionedMsg = info[key];
                            }
                        }
                        if (con.conversationType != 0 && message.senderUserId != Bridge._client.userId && message.receivedStatus != RongIMLib.ReceivedStatus.RETRIEVED && message.messageType != RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"] && message.messageType != RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]) {
                            con.unreadMessageCount = con.unreadMessageCount + 1;
                            if (RongIMLib.MessageUtil.supportLargeStorage()) {
                                var count = RongIMLib.RongIMClient._storageProvider.getItem("cu" + Bridge._client.userId + con.conversationType + con.targetId); // ä¸Žæœ¬åœ°å­˜å‚¨ä¼šè¯åˆå¹¶
                                RongIMLib.RongIMClient._storageProvider.setItem("cu" + Bridge._client.userId + con.conversationType + message.targetId, Number(count) + 1);
                            }
                        }
                        con.receivedTime = new Date().getTime();
                        con.receivedStatus = RongIMLib.ReceivedStatus.UNREAD;
                        message.receivedStatus = RongIMLib.ReceivedStatus.UNREAD;
                        con.senderUserId = message.sendUserId;
                        con.notificationStatus = RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;
                        con.latestMessageId = message.messageId;
                        con.latestMessage = message;
                        con.sentTime = message.sentTime;
                        RongIMLib.RongIMClient._dataAccessProvider.addConversation(con, { onSuccess: function (data) { }, onError: function () { } });
                    },
                    onError: function (error) { }
                });
            }
            if (message.conversationType == RongIMLib.ConversationType.CUSTOMER_SERVICE && (message.messageType == "ChangeModeResponseMessage" || message.messageType == "SuspendMessage" || message.messageType == "HandShakeResponseMessage" ||
                message.messageType == "TerminateMessage" || message.messageType == "CustomerStatusUpdateMessage" || message.messageType == "TextMessage" || message.messageType == "InformationNotificationMessage")) {
                if (!RongIMLib.RongIMClient._memoryStore.custStore["isInit"]) {
                    return;
                }
            }
            if (message.conversationType == RongIMLib.ConversationType.CUSTOMER_SERVICE && message.messageType != "HandShakeResponseMessage") {
                if (!RongIMLib.RongIMClient._memoryStore.custStore[message.targetId]) {
                    return;
                }
                if (message.messageType == "TerminateMessage") {
                    if (RongIMLib.RongIMClient._memoryStore.custStore[message.targetId].sid != message.content.sid) {
                        return;
                    }
                }
            }
            if (message.messageType === RongIMLib.RongIMClient.MessageType["HandShakeResponseMessage"]) {
                var session = message.content.data;
                RongIMLib.RongIMClient._memoryStore.custStore[message.targetId] = session;
                if (session.serviceType == RongIMLib.CustomerType.ONLY_HUMAN || session.serviceType == RongIMLib.CustomerType.HUMAN_FIRST) {
                    if (session.notAutoCha == "1") {
                        RongIMLib.RongIMClient.getInstance().switchToHumanMode(message.targetId, {
                            onSuccess: function () { },
                            onError: function () { }
                        });
                    }
                }
            }
            var d = new Date(), m = d.getMonth() + 1, date = d.getFullYear() + '/' + (m.toString().length == 1 ? '0' + m : m) + '/' + d.getDate();
            //new Date(date).getTime() - message.sentTime < 1 é€»è¾‘åˆ¤æ–­ è¶…è¿‡ 1 å¤©æœªæ”¶çš„ ReadReceiptRequestMessage ç¦»çº¿æ¶ˆæ¯è‡ªåŠ¨å¿½ç•¥ã€‚
            var dealtime = new Date(date).getTime() - message.sentTime < 0;
            if (RongIMLib.MessageUtil.supportLargeStorage() && message.messageType === RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"] && dealtime && message.messageDirection == RongIMLib.MessageDirection.SEND) {
                var sentkey = Bridge._client.userId + message.content.messageUId + "SENT";
                RongIMLib.RongIMClient._storageProvider.setItem(sentkey, JSON.stringify({ count: 0, dealtime: message.sentTime, userIds: {} }));
            }
            else if (RongIMLib.MessageUtil.supportLargeStorage() && message.messageType === RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"] && dealtime) {
                var reckey = Bridge._client.userId + message.conversationType + message.targetId + 'RECEIVED', recData = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(reckey));
                if (recData) {
                    if (message.senderUserId in recData) {
                        if (recData[message.senderUserId].uIds && recData[message.senderUserId].uIds && recData[message.senderUserId].uIds.indexOf(message.content.messageUId) == -1) {
                            // å¦‚æžœæ˜¯å‰ä¸€å¤©çš„ MessaageUId æŠŠæ•°ç»„æ¸…ç©ºã€‚
                            new Date(date).getTime() - recData[message.senderUserId].dealtime < 0 || (recData[message.senderUserId].uIds.length = 0);
                            recData[message.senderUserId].uIds.push(message.content.messageUId);
                            recData[message.senderUserId].dealtime = message.sentTime;
                            recData[message.senderUserId].isResponse = false;
                            RongIMLib.RongIMClient._storageProvider.setItem(reckey, JSON.stringify(recData));
                        }
                        else {
                            return;
                        }
                    }
                    else {
                        var objSon = { uIds: [message.content.messageUId], dealtime: message.sentTime, isResponse: false };
                        recData[message.senderUserId] = objSon;
                        RongIMLib.RongIMClient._storageProvider.setItem(reckey, JSON.stringify(recData));
                    }
                }
                else {
                    var obj = {};
                    obj[message.senderUserId] = { uIds: [message.content.messageUId], dealtime: message.sentTime, isResponse: false };
                    RongIMLib.RongIMClient._storageProvider.setItem(reckey, JSON.stringify(obj));
                }
            }
            if (RongIMLib.MessageUtil.supportLargeStorage() && message.messageType === RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"] && dealtime) {
                var receiptResponseMsg = message.content, uIds = receiptResponseMsg.receiptMessageDic[Bridge._client.userId], sentkey = "", sentObj;
                message.receiptResponse || (message.receiptResponse = {});
                if (uIds) {
                    var cbuIds = [];
                    for (var i = 0, len = uIds.length; i < len; i++) {
                        sentkey = Bridge._client.userId + uIds[i] + "SENT";
                        sentObj = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(sentkey));
                        if (sentObj && !(message.senderUserId in sentObj.userIds)) {
                            if (new Date(date).getTime() - sentObj.dealtime > 0) {
                                RongIMLib.RongIMClient._storageProvider.removeItem(sentkey);
                            }
                            else {
                                cbuIds.push(uIds[i]);
                                sentObj.count += 1;
                                sentObj.userIds[message.senderUserId] = message.sentTime;
                                message.receiptResponse[uIds[i]] = sentObj.count;
                                RongIMLib.RongIMClient._storageProvider.setItem(sentkey, JSON.stringify(sentObj));
                            }
                        }
                    }
                    receiptResponseMsg.receiptMessageDic[Bridge._client.userId] = cbuIds;
                    message.content = receiptResponseMsg;
                }
            }
            var that = this;
            if (RongIMLib.RongIMClient._voipProvider && ['AcceptMessage', 'RingingMessage', 'HungupMessage', 'InviteMessage', 'MediaModifyMessage', 'MemberModifyMessage'].indexOf(message.messageType) > -1) {
                RongIMLib.RongIMClient._voipProvider.onReceived(message);
            }
            else {
                var lcount = leftCount || 0;
                RongIMLib.RongIMClient._dataAccessProvider.addMessage(message.conversationType, message.targetId, message, {
                    onSuccess: function (ret) {
                        that._onReceived(ret, lcount);
                    },
                    onError: function (error) {
                        that._onReceived(message, lcount);
                    }
                });
            }
        };
        MessageHandler.prototype.handleMessage = function (msg) {
            if (!msg) {
                return;
            }
            switch (msg._name) {
                case "ConnAckMessage":
                    Bridge._client.handler.connectCallback.process(msg.getStatus(), msg.getUserId(), msg.getTimestamp());
                    break;
                case "PublishMessage":
                    if (!msg.getSyncMsg() && msg.getQos() != 0) {
                        Bridge._client.channel.writeAndFlush(new RongIMLib.PubAckMessage(msg.getMessageId()));
                    }
                    // TODO && ->
                    if (msg.getSyncMsg() && !RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                        Bridge._client.handler.syncMsgMap[msg.getMessageId()] = msg;
                    }
                    else {
                        //å¦‚æžœæ˜¯PublishMessageå°±æŠŠè¯¥å¯¹è±¡ç»™onReceivedæ–¹æ³•æ‰§è¡Œå¤„ç†
                        Bridge._client.handler.onReceived(msg);
                    }
                    break;
                case "QueryAckMessage":
                    if (msg.getQos() != 0) {
                        Bridge._client.channel.writeAndFlush(new RongIMLib.QueryConMessage(msg.getMessageId()));
                    }
                    var temp = Bridge._client.handler.map[msg.getMessageId()];
                    if (temp) {
                        //æ‰§è¡Œå›žè°ƒæ“ä½œ
                        temp.Callback.process(msg.getStatus(), msg.getData(), msg.getDate(), temp.Message);
                        delete Bridge._client.handler.map[msg.getMessageId()];
                    }
                    break;
                case "PubAckMessage":
                    var item = Bridge._client.handler.map[msg.getMessageId()];
                    if (item) {
                        item.Callback.process(msg.getStatus() || 0, msg.getMessageUId(), msg.getTimestamp(), item.Message, msg.getMessageId());
                        delete Bridge._client.handler.map[msg.getMessageId()];
                    }
                    else {
                        Bridge._client.handler.onReceived(Bridge._client.handler.syncMsgMap[msg.messageId], msg);
                        delete Bridge._client.handler.syncMsgMap[msg.getMessageId()];
                    }
                    break;
                case "PingRespMessage":
                    if (RongIMLib.RongIMClient._memoryStore.isFirstPingMsg) {
                        RongIMLib.RongIMClient._memoryStore.isFirstPingMsg = false;
                    }
                    else {
                        Bridge._client.pauseTimer();
                    }
                    break;
                case "DisconnectMessage":
                    Bridge._client.channel.disconnect(msg.getStatus());
                    break;
                default:
            }
        };
        return MessageHandler;
    }());
    RongIMLib.MessageHandler = MessageHandler;
})(RongIMLib || (RongIMLib = {}));
/// <reference path="../dts/helper.d.ts"/>
var RongIMLib;
(function (RongIMLib) {
    var MessageCallback = (function () {
        function MessageCallback(error) {
            this.timeout = null;
            this.onError = null;
            if (error && typeof error == "number") {
                this.timeoutMillis = error;
            }
            else {
                this.timeoutMillis = 30000;
                this.onError = error;
            }
        }
        MessageCallback.prototype.resumeTimer = function () {
            var me = this;
            if (this.timeoutMillis > 0 && !this.timeout) {
                this.timeout = setTimeout(function () {
                    me.readTimeOut(true);
                }, this.timeoutMillis);
            }
        };
        MessageCallback.prototype.pauseTimer = function () {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
        };
        MessageCallback.prototype.readTimeOut = function (isTimeout) {
            if (isTimeout && this.onError) {
                this.onError(RongIMLib.ErrorCode.TIMEOUT);
            }
            else {
                this.pauseTimer();
            }
        };
        return MessageCallback;
    }());
    RongIMLib.MessageCallback = MessageCallback;
    var CallbackMapping = (function () {
        function CallbackMapping() {
            this.publicServiceList = [];
        }
        CallbackMapping.getInstance = function () {
            return new CallbackMapping();
        };
        CallbackMapping.prototype.pottingProfile = function (item) {
            var temp;
            this.profile = new RongIMLib.PublicServiceProfile();
            temp = JSON.parse(item.extra);
            this.profile.isGlobal = temp.isGlobal;
            this.profile.introduction = temp.introduction;
            this.profile.menu = temp.menu;
            this.profile.hasFollowed = temp.follow;
            this.profile.publicServiceId = item.mpid;
            this.profile.name = item.name;
            this.profile.portraitUri = item.portraitUrl;
            this.profile.conversationType = item.type == "mc" ? RongIMLib.ConversationType.APP_PUBLIC_SERVICE : RongIMLib.ConversationType.PUBLIC_SERVICE;
            this.publicServiceList.push(this.profile);
        };
        CallbackMapping.prototype.mapping = function (entity, tag) {
            switch (tag) {
                case "GetUserInfoOutput":
                    var userInfo = new RongIMLib.UserInfo(entity.userId, entity.userName, entity.userPortrait);
                    return userInfo;
                case "GetQNupTokenOutput":
                    return {
                        deadline: RongIMLib.MessageUtil.int64ToTimestamp(entity.deadline),
                        token: entity.token
                    };
                case "GetQNdownloadUrlOutput":
                    return {
                        downloadUrl: entity.downloadUrl
                    };
                case "CreateDiscussionOutput":
                    return entity.id;
                case "ChannelInfoOutput":
                    var disInfo = new RongIMLib.Discussion();
                    disInfo.creatorId = entity.adminUserId;
                    disInfo.id = entity.channelId;
                    disInfo.memberIdList = entity.firstTenUserIds;
                    disInfo.name = entity.channelName;
                    disInfo.isOpen = entity.openStatus;
                    return disInfo;
                case "GroupHashOutput":
                    return entity.result;
                case "QueryBlackListOutput":
                    return entity.userIds;
                case "SearchMpOutput":
                case "PullMpOutput":
                    if (entity.info) {
                        var self = this;
                        Array.forEach(entity.info, function (item) {
                            setTimeout(self.pottingProfile(item), 100);
                        });
                    }
                    return this.publicServiceList;
                default:
                    return entity;
            }
        };
        return CallbackMapping;
    }());
    RongIMLib.CallbackMapping = CallbackMapping;
    var PublishCallback = (function (_super) {
        __extends(PublishCallback, _super);
        function PublishCallback(_cb, _timeout) {
            _super.call(this, _timeout);
            this._cb = _cb;
            this._timeout = _timeout;
        }
        PublishCallback.prototype.process = function (_status, messageUId, timestamp, _msg, messageId) {
            this.readTimeOut();
            if (_status == 0) {
                if (_msg) {
                    _msg.setSentStatus = _status;
                }
                RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Bridge._client.userId, timestamp);
                RongIMLib.RongIMClient._memoryStore.lastReadTime.get(RongIMLib.Bridge._client.userId, timestamp);
                this._cb({ messageUId: messageUId, timestamp: timestamp, messageId: messageId });
            }
            else {
                this._timeout(_status);
            }
        };
        PublishCallback.prototype.readTimeOut = function (x) {
            MessageCallback.prototype.readTimeOut.call(this, x);
        };
        return PublishCallback;
    }(MessageCallback));
    RongIMLib.PublishCallback = PublishCallback;
    var QueryCallback = (function (_super) {
        __extends(QueryCallback, _super);
        function QueryCallback(_cb, _timeout) {
            _super.call(this, _timeout);
            this._cb = _cb;
            this._timeout = _timeout;
        }
        QueryCallback.prototype.process = function (status, data, serverTime, pbtype) {
            this.readTimeOut();
            if (pbtype && data && status == 0) {
                try {
                    data = CallbackMapping.getInstance().mapping(Modules[pbtype].decode(data), pbtype);
                }
                catch (e) {
                    this._timeout(RongIMLib.ErrorCode.UNKNOWN);
                    return;
                }
                if ("GetUserInfoOutput" == pbtype) {
                    //pbç±»åž‹ä¸ºGetUserInfoOutputçš„è¯å°±æŠŠdataæ”¾å…¥userinfoç¼“å­˜é˜Ÿåˆ—
                    RongIMLib.Client.userInfoMapping[data.userId] = data;
                }
                this._cb(data);
            }
            else {
                status > 0 ? this._timeout(status) : this._cb(status);
            }
        };
        QueryCallback.prototype.readTimeOut = function (x) {
            MessageCallback.prototype.readTimeOut.call(this, x);
        };
        return QueryCallback;
    }(MessageCallback));
    RongIMLib.QueryCallback = QueryCallback;
    var ConnectAck = (function (_super) {
        __extends(ConnectAck, _super);
        function ConnectAck(_cb, _timeout, client) {
            _super.call(this, _timeout);
            this._client = client;
            this._cb = _cb;
            this._timeout = _timeout;
        }
        ConnectAck.prototype.process = function (status, userId, timestamp) {
            this.readTimeOut();
            if (status == 0) {
                if (RongIMLib.RongIMClient._memoryStore.depend.isPrivate) {
                    var date = new Date();
                    var qryOpt, dateStr = date.getFullYear() + "" + (date.getMonth() + 1) + "" + date.getDate();
                    if (RongIMLib.MessageUtil.supportLargeStorage()) {
                        qryOpt = RongIMLib.RongIMClient._storageProvider.getItem("RongQryOpt" + dateStr);
                    }
                    else {
                        qryOpt = RongIMLib.RongIMClient._storageProvider.getItem("RongQryOpt" + dateStr);
                    }
                }
                var naviStr = RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.RongIMClient._storageProvider.getItemKey("navi"));
                var naviKey = RongIMLib.RongIMClient._storageProvider.getItemKey("navi");
                var arr = decodeURIComponent(naviStr).split(",");
                if (!arr[1]) {
                    naviStr = encodeURIComponent(naviStr) + userId;
                    RongIMLib.RongIMClient._storageProvider.setItem(naviKey, naviStr);
                }
                if (RongIMLib.RongIMClient._memoryStore.isUseWebSQLProvider) {
                    RongIMLib.RongIMClient._dataAccessProvider.database.init(userId);
                }
                this._client.userId = userId;
                var self = this, temp = RongIMLib.RongIMClient._storageProvider.getItemKey("navi");
                var naviServer = RongIMLib.RongIMClient._storageProvider.getItem(temp);
                // TODO  åˆ¤æ–­æ‹†åˆ† naviServer åŽçš„æ•°ç»„é•¿åº¦ã€‚
                var naviPort = naviServer.split(",")[0].split(":")[1];
                if (!RongIMLib.RongIMClient._memoryStore.depend.isPolling && RongIMLib.RongIMClient._memoryStore.isFirstPingMsg && naviPort.length < 4) {
                    RongIMLib.Bridge._client.checkSocket({
                        onSuccess: function () {
                            if (!RongIMLib.RongIMClient.isNotPullMsg) {
                                self._client.syncTime(undefined, undefined, undefined, true);
                            }
                        },
                        onError: function () {
                            RongIMLib.RongIMClient._memoryStore.isFirstPingMsg = false;
                            RongIMLib.RongIMClient.getInstance().disconnect();
                            var temp = RongIMLib.RongIMClient._storageProvider.getItemKey("navi");
                            var server = RongIMLib.RongIMClient._storageProvider.getItem("RongBackupServer");
                            var arrs = server.split(",");
                            if (arrs.length < 2) {
                                throw new Error("navi server is empty");
                            }
                            RongIMLib.RongIMClient._storageProvider.setItem(temp, RongIMLib.RongIMClient._storageProvider.getItem("RongBackupServer"));
                            var url = RongIMLib.Bridge._client.channel.socket.currentURL;
                            RongIMLib.Bridge._client.channel.socket.currentURL = arrs[0] + url.substring(url.indexOf("/"), url.length);
                            RongIMLib.RongIMClient.connect(RongIMLib.RongIMClient._memoryStore.token, RongIMLib.RongIMClient._memoryStore.callback);
                        }
                    });
                }
                else {
                    if (!RongIMLib.RongIMClient.isNotPullMsg) {
                        self._client.syncTime(undefined, undefined, undefined, true);
                    }
                }
                if (this._client.reconnectObj.onSuccess) {
                    this._client.reconnectObj.onSuccess(userId);
                    delete this._client.reconnectObj.onSuccess;
                }
                else {
                    var me = this;
                    setTimeout(function () { me._cb(userId); }, 500);
                }
                RongIMLib.Bridge._client.channel.socket.fire("StatusChanged", 0);
                RongIMLib.RongIMClient._memoryStore.connectAckTime = timestamp;
                if (!(new Date().getTime() - timestamp)) {
                    RongIMLib.RongIMClient._memoryStore.deltaTime = 0;
                }
                else {
                    RongIMLib.RongIMClient._memoryStore.deltaTime = new Date().getTime() - timestamp;
                }
            }
            else if (status == 6) {
                //é‡å®šå‘ è¿žé”™ CMP
                var x = {};
                var me = this;
                new RongIMLib.Navigation().getServerEndpoint(this._client.token, this._client.appId, function () {
                    me._client.clearHeartbeat();
                    new RongIMLib.Client(me._client.token, me._client.appId).__init.call(x, function () {
                        RongIMLib.Transportations._TransportType == "websocket" && me._client.keepLive();
                    });
                    me._client.channel.socket.fire("StatusChanged", 2);
                }, me._timeout, false);
            }
            else {
                RongIMLib.Bridge._client.channel.socket.socket._status = status;
                if (this._client.reconnectObj.onError) {
                    this._client.reconnectObj.onError(status);
                    delete this._client.reconnectObj.onError;
                }
                else {
                    this._timeout(status);
                }
            }
        };
        ConnectAck.prototype.readTimeOut = function (x) {
            MessageCallback.prototype.readTimeOut.call(this, x);
        };
        return ConnectAck;
    }(MessageCallback));
    RongIMLib.ConnectAck = ConnectAck;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var Navigation = (function () {
        function Navigation() {
            window.getServerEndpoint = function (x) {
                //æŠŠå¯¼èˆªè¿”å›žçš„serverå­—æ®µèµ‹å€¼ç»™CookieHelper._hostï¼Œå› ä¸ºflash widgetéœ€è¦ä½¿ç”¨ decodeURIComponent
                RongIMLib.RongIMClient._storageProvider._host = Navigation.Endpoint.host = x["server"];
                RongIMLib.RongIMClient._storageProvider.setItem("RongBackupServer", x["backupServer"] + "," + (x.userId || ""));
                //è®¾ç½®å½“å‰ç”¨æˆ· Id åªæœ‰ comet ä½¿ç”¨ã€‚
                Navigation.Endpoint.userId = x["userId"];
                if (x["voipCallInfo"]) {
                    var callInfo = JSON.parse(x["voipCallInfo"]);
                    RongIMLib.RongIMClient._memoryStore.voipStategy = callInfo.strategy;
                    RongIMLib.RongIMClient._storageProvider.setItem("voipStrategy", callInfo.strategy);
                }
                //æ›¿æ¢æœ¬åœ°å­˜å‚¨çš„å¯¼èˆªä¿¡æ¯ 
                // var temp = RongIMClient._storageProvider.getItemKey("navi");
                // temp !== null && RongIMClient._storageProvider.removeItem(temp);
                // æ³¨ï¼šä»¥ä¸Šä¸¤è¡Œä»£ç åºŸå¼ƒï¼Œè¯•ç”¨åŽåˆ é™¤ã€‚
                var md5Token = md5(RongIMLib.Bridge._client.token).slice(8, 16), openMp = x['openMp'] == 0 ? 0 : 1;
                RongIMLib.RongIMClient._storageProvider.setItem("navi" + md5Token, x["server"] + "," + (x.userId || ""));
                RongIMLib.RongIMClient._storageProvider.setItem('openMp' + md5Token, openMp);
                if (!openMp) {
                    RongIMLib.RongIMClient._memoryStore.depend.openMp = false;
                }
            };
        }
        Navigation.prototype.connect = function (appId, token, callback) {
            var oldAppId = RongIMLib.RongIMClient._storageProvider.getItem("appId");
            //å¦‚æžœappidå’Œæœ¬åœ°å­˜å‚¨çš„ä¸ä¸€æ ·ï¼Œæ¸…ç©ºæ‰€æœ‰æœ¬åœ°å­˜å‚¨æ•°æ®
            if (oldAppId && oldAppId != appId) {
                RongIMLib.RongIMClient._storageProvider.clearItem();
                RongIMLib.RongIMClient._storageProvider.setItem("appId", appId);
            }
            if (!oldAppId) {
                RongIMLib.RongIMClient._storageProvider.setItem("appId", appId);
            }
            var client = new RongIMLib.Client(token, appId);
            var me = this;
            this.getServerEndpoint(token, appId, function () {
                client.connect(callback);
            }, callback.onError, true);
            return client;
        };
        Navigation.prototype.getServerEndpoint = function (_token, _appId, _onsuccess, _onerror, unignore) {
            if (unignore) {
                //æ ¹æ®tokenç”ŸæˆMD5æˆªå–8-16ä¸‹æ ‡çš„æ•°æ®ä¸Žæœ¬åœ°å­˜å‚¨çš„å¯¼èˆªä¿¡æ¯è¿›è¡Œæ¯”å¯¹
                //å¦‚æžœä¿¡æ¯å’Œä¸Šæ¬¡çš„é€šé“ç±»åž‹éƒ½ä¸€æ ·ï¼Œä¸æ‰§è¡Œnaviè¯·æ±‚ï¼Œç”¨æœ¬åœ°å­˜å‚¨çš„å¯¼èˆªä¿¡æ¯è¿žæŽ¥æœåŠ¡å™¨
                var naviStr = md5(_token).slice(8, 16), _old = RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.RongIMClient._storageProvider.getItemKey("navi")), _new = RongIMLib.RongIMClient._storageProvider.getItem("navi" + naviStr);
                if (_old == _new && _new !== null && RongIMLib.RongIMClient._storageProvider.getItem("rongSDK") == RongIMLib.Transportations._TransportType) {
                    var obj = decodeURIComponent(_old).split(",");
                    setTimeout(function () {
                        RongIMLib.RongIMClient._storageProvider._host = Navigation.Endpoint.host = obj[0];
                        RongIMLib.RongIMClient._memoryStore.voipStategy = RongIMLib.RongIMClient._storageProvider.getItem("voipStrategy");
                        if (!RongIMLib.RongIMClient._storageProvider.getItem('openMp' + naviStr)) {
                            RongIMLib.RongIMClient._memoryStore.depend.openMp = false;
                        }
                        Navigation.Endpoint.userId = obj[1];
                        _onsuccess();
                    }, 500);
                    return;
                }
            }
            //å¯¼èˆªä¿¡æ¯ï¼Œåˆ‡æ¢Urlå¯¹è±¡çš„keyè¿›è¡Œçº¿ä¸Šçº¿ä¸‹æµ‹è¯•æ“ä½œ
            var xss = document.createElement("script");
            //è¿›è¡Œjsonpè¯·æ±‚
            xss.src = RongIMLib.RongIMClient._memoryStore.depend.navi + (RongIMLib.RongIMClient._memoryStore.depend.isPolling ? "/cometnavi.js" : "/navi.js") + "?appId=" + _appId + "&token=" + encodeURIComponent(_token) + "&" + "callBack=getServerEndpoint&t=" + (new Date).getTime();
            document.body.appendChild(xss);
            xss.onerror = function () {
                _onerror(RongIMLib.ConnectionState.TOKEN_INCORRECT);
            };
            if ("onload" in xss) {
                xss.onload = _onsuccess;
            }
            else {
                xss.onreadystatechange = function () {
                    xss.readyState == "loaded" && _onsuccess();
                };
            }
        };
        Navigation.Endpoint = new Object;
        return Navigation;
    }());
    RongIMLib.Navigation = Navigation;
})(RongIMLib || (RongIMLib = {}));
// TODO: ç»Ÿä¸€å˜é‡ã€æ–¹æ³•ç­‰å‘½åè§„èŒƒ
var RongIMLib;
(function (RongIMLib) {
    /**
     * æ¶ˆæ¯åŸºç±»
     */
    var BaseMessage = (function () {
        function BaseMessage(arg) {
            this._name = "BaseMessage";
            this.lengthSize = 0;
            if (arg instanceof RongIMLib.Header) {
                this._header = arg;
            }
            else {
                this._header = new RongIMLib.Header(arg, false, RongIMLib.Qos.AT_MOST_ONCE, false);
            }
        }
        BaseMessage.prototype.read = function (In, length) {
            this.readMessage(In, length);
        };
        BaseMessage.prototype.write = function (Out) {
            var binaryHelper = new RongIMLib.BinaryHelper();
            var out = binaryHelper.convertStream(Out);
            this._headerCode = this.getHeaderFlag();
            out.write(this._headerCode);
            this.writeMessage(out);
            return out;
        };
        BaseMessage.prototype.getHeaderFlag = function () {
            return this._header.encode();
        };
        BaseMessage.prototype.getLengthSize = function () {
            return this.lengthSize;
        };
        BaseMessage.prototype.toBytes = function () {
            return this.write([]).getBytesArray();
        };
        BaseMessage.prototype.isRetained = function () {
            return this._header.retain;
        };
        BaseMessage.prototype.setRetained = function (retain) {
            this._header.retain = retain;
        };
        BaseMessage.prototype.setQos = function (qos) {
            this._header.qos = Object.prototype.toString.call(qos) == "[object Object]" ? qos : RongIMLib.Qos[qos];
        };
        BaseMessage.prototype.setDup = function (dup) {
            this._header.dup = dup;
        };
        BaseMessage.prototype.isDup = function () {
            return this._header.dup;
        };
        BaseMessage.prototype.getType = function () {
            return this._header.type;
        };
        BaseMessage.prototype.getQos = function () {
            return this._header.qos;
        };
        BaseMessage.prototype.messageLength = function () {
            return 0;
        };
        BaseMessage.prototype.writeMessage = function (out) { };
        BaseMessage.prototype.readMessage = function (In, length) { };
        BaseMessage.prototype.init = function (args) {
            var valName, nana, me = this;
            for (nana in args) {
                if (!args.hasOwnProperty(nana)) {
                    continue;
                }
                valName = nana.replace(/^\w/, function (x) {
                    var tt = x.charCodeAt(0);
                    return "set" + (tt >= 0x61 ? String.fromCharCode(tt & ~32) : x);
                });
                if (valName in me) {
                    if (nana == "status") {
                        me[valName](disconnectStatus[args[nana]] ? disconnectStatus[args[nana]] : args[nana]);
                    }
                    else {
                        me[valName](args[nana]);
                    }
                }
            }
        };
        return BaseMessage;
    }());
    RongIMLib.BaseMessage = BaseMessage;
    /**
     *è¿žæŽ¥æ¶ˆæ¯ç±»åž‹
     */
    var ConnectMessage = (function (_super) {
        __extends(ConnectMessage, _super);
        function ConnectMessage(header) {
            _super.call(this, arguments.length == 0 || arguments.length == 3 ? RongIMLib.Type.CONNECT : arguments[0]);
            this._name = "ConnectMessage";
            this.CONNECT_HEADER_SIZE = 12;
            this.protocolId = "RCloud";
            this.binaryHelper = new RongIMLib.BinaryHelper();
            this.protocolVersion = 3;
            switch (arguments.length) {
                case 0:
                case 1:
                case 3:
                    if (!arguments[0] || arguments[0].length > 64) {
                        throw new Error("ConnectMessage:Client Id cannot be null and must be at most 64 characters long: " + arguments[0]);
                    }
                    this.clientId = arguments[0];
                    this.cleanSession = arguments[1];
                    this.keepAlive = arguments[2];
                    break;
            }
        }
        ConnectMessage.prototype.messageLength = function () {
            var payloadSize = this.binaryHelper.toMQttString(this.clientId).length;
            payloadSize += this.binaryHelper.toMQttString(this.willTopic).length;
            payloadSize += this.binaryHelper.toMQttString(this.will).length;
            payloadSize += this.binaryHelper.toMQttString(this.appId).length;
            payloadSize += this.binaryHelper.toMQttString(this.token).length;
            return payloadSize + this.CONNECT_HEADER_SIZE;
        };
        ConnectMessage.prototype.readMessage = function (stream) {
            this.protocolId = stream.readUTF();
            this.protocolVersion = stream.readByte();
            var cFlags = stream.readByte();
            this.hasAppId = (cFlags & 128) > 0;
            this.hasToken = (cFlags & 64) > 0;
            this.retainWill = (cFlags & 32) > 0;
            this.willQos = cFlags >> 3 & 3;
            this.hasWill = (cFlags & 4) > 0;
            this.cleanSession = (cFlags & 32) > 0;
            this.keepAlive = stream.read() * 256 + stream.read();
            this.clientId = stream.readUTF();
            if (this.hasWill) {
                this.willTopic = stream.readUTF();
                this.will = stream.readUTF();
            }
            if (this.hasAppId) {
                try {
                    this.appId = stream.readUTF();
                }
                catch (ex) {
                    throw new Error(ex);
                }
            }
            if (this.hasToken) {
                try {
                    this.token = stream.readUTF();
                }
                catch (ex) {
                    throw new Error(ex);
                }
            }
            return stream;
        };
        ConnectMessage.prototype.writeMessage = function (out) {
            var stream = this.binaryHelper.convertStream(out);
            stream.writeUTF(this.protocolId);
            stream.write(this.protocolVersion);
            var flags = this.cleanSession ? 2 : 0;
            flags |= this.hasWill ? 4 : 0;
            flags |= this.willQos ? this.willQos >> 3 : 0;
            flags |= this.retainWill ? 32 : 0;
            flags |= this.hasToken ? 64 : 0;
            flags |= this.hasAppId ? 128 : 0;
            stream.write(flags);
            stream.writeChar(this.keepAlive);
            stream.writeUTF(this.clientId);
            if (this.hasWill) {
                stream.writeUTF(this.willTopic);
                stream.writeUTF(this.will);
            }
            if (this.hasAppId) {
                stream.writeUTF(this.appId);
            }
            if (this.hasToken) {
                stream.writeUTF(this.token);
            }
            return stream;
        };
        return ConnectMessage;
    }(BaseMessage));
    RongIMLib.ConnectMessage = ConnectMessage;
    /**
     *è¿žæŽ¥åº”ç­”ç±»åž‹
     */
    var ConnAckMessage = (function (_super) {
        __extends(ConnAckMessage, _super);
        function ConnAckMessage(header) {
            _super.call(this, arguments.length == 0 ? RongIMLib.Type.CONNACK : arguments.length == 1 ? arguments[0] instanceof RongIMLib.Header ? arguments[0] : RongIMLib.Type.CONNACK : null);
            this._name = "ConnAckMessage";
            this.MESSAGE_LENGTH = 2;
            this.binaryHelper = new RongIMLib.BinaryHelper();
            var me = this;
            switch (arguments.length) {
                case 0:
                case 1:
                    if (!(arguments[0] instanceof RongIMLib.Header)) {
                        if (arguments[0] in RongIMLib.ConnectionState) {
                            if (arguments[0] == null) {
                                throw new Error("ConnAckMessage:The status of ConnAskMessage can't be null");
                            }
                            me.setStatus(arguments[0]);
                        }
                    }
                    break;
            }
        }
        ;
        ConnAckMessage.prototype.messageLength = function () {
            var length = this.MESSAGE_LENGTH;
            if (this.userId) {
                length += this.binaryHelper.toMQttString(this.userId).length;
            }
            return length;
        };
        ;
        ConnAckMessage.prototype.readMessage = function (_in, msglength) {
            _in.read();
            var result = +_in.read();
            if (result >= 0 && result <= 12) {
                this.setStatus(result);
            }
            else {
                throw new Error("Unsupported CONNACK code:" + result);
            }
            if (msglength > this.MESSAGE_LENGTH) {
                this.setUserId(_in.readUTF());
                var sessionId = _in.readUTF();
                var timestamp = _in.readLong();
                this.setTimestamp(timestamp);
            }
        };
        ;
        ConnAckMessage.prototype.writeMessage = function (out) {
            var stream = this.binaryHelper.convertStream(out);
            stream.write(128);
            switch (+status) {
                case 0:
                case 1:
                case 2:
                case 5:
                case 6:
                    stream.write(+status);
                    break;
                case 3:
                case 4:
                    stream.write(3);
                    break;
                default:
                    throw new Error("Unsupported CONNACK code:" + status);
            }
            if (this.userId) {
                stream.writeUTF(this.userId);
            }
            return stream;
        };
        ;
        ConnAckMessage.prototype.setStatus = function (x) {
            this.status = x;
        };
        ;
        ConnAckMessage.prototype.setUserId = function (_userId) {
            this.userId = _userId;
        };
        ;
        ConnAckMessage.prototype.getStatus = function () {
            return this.status;
        };
        ;
        ConnAckMessage.prototype.getUserId = function () {
            return this.userId;
        };
        ;
        ConnAckMessage.prototype.setTimestamp = function (x) {
            this.timestrap = x;
        };
        ;
        ConnAckMessage.prototype.getTimestamp = function () {
            return this.timestrap;
        };
        return ConnAckMessage;
    }(BaseMessage));
    RongIMLib.ConnAckMessage = ConnAckMessage;
    /**
     *æ–­å¼€æ¶ˆæ¯ç±»åž‹
     */
    var DisconnectMessage = (function (_super) {
        __extends(DisconnectMessage, _super);
        function DisconnectMessage(header) {
            _super.call(this, header instanceof RongIMLib.Header ? header : RongIMLib.Type.DISCONNECT);
            this._name = "DisconnectMessage";
            this.MESSAGE_LENGTH = 2;
            this.binaryHelper = new RongIMLib.BinaryHelper();
            if (!(header instanceof RongIMLib.Header)) {
                if (header in RongIMLib.ConnectionStatus) {
                    this.status = header;
                }
            }
        }
        DisconnectMessage.prototype.messageLength = function () {
            return this.MESSAGE_LENGTH;
        };
        DisconnectMessage.prototype.readMessage = function (_in) {
            _in.read();
            var result = +_in.read();
            if (result >= 0 && result <= 5) {
                this.setStatus(disconnectStatus[result] ? disconnectStatus[result] : result);
            }
            else {
                throw new Error("Unsupported CONNACK code:" + result);
            }
        };
        DisconnectMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out);
            out.write(0);
            if (+status >= 1 && +status <= 3) {
                out.write((+status) - 1);
            }
            else {
                throw new Error("Unsupported CONNACK code:" + status);
            }
        };
        DisconnectMessage.prototype.setStatus = function (x) {
            this.status = x;
        };
        ;
        DisconnectMessage.prototype.getStatus = function () {
            return this.status;
        };
        ;
        return DisconnectMessage;
    }(BaseMessage));
    RongIMLib.DisconnectMessage = DisconnectMessage;
    /**
     *è¯·æ±‚æ¶ˆæ¯ä¿¡ä»¤
     */
    var PingReqMessage = (function (_super) {
        __extends(PingReqMessage, _super);
        function PingReqMessage(header) {
            _super.call(this, (header && header instanceof RongIMLib.Header) ? header : RongIMLib.Type.PINGREQ);
            this._name = "PingReqMessage";
        }
        return PingReqMessage;
    }(BaseMessage));
    RongIMLib.PingReqMessage = PingReqMessage;
    /**
     *å“åº”æ¶ˆæ¯ä¿¡ä»¤
     */
    var PingRespMessage = (function (_super) {
        __extends(PingRespMessage, _super);
        function PingRespMessage(header) {
            _super.call(this, (header && header instanceof RongIMLib.Header) ? header : RongIMLib.Type.PINGRESP);
            this._name = "PingRespMessage";
        }
        return PingRespMessage;
    }(BaseMessage));
    RongIMLib.PingRespMessage = PingRespMessage;
    /**
     *å°è£…MesssageId
     */
    var RetryableMessage = (function (_super) {
        __extends(RetryableMessage, _super);
        function RetryableMessage(argu) {
            _super.call(this, argu);
            this._name = "RetryableMessage";
            this.binaryHelper = new RongIMLib.BinaryHelper();
        }
        RetryableMessage.prototype.messageLength = function () {
            return 2;
        };
        RetryableMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out), Id = this.getMessageId(), lsb = Id & 255, msb = (Id & 65280) >> 8;
            out.write(msb);
            out.write(lsb);
            return out;
        };
        RetryableMessage.prototype.readMessage = function (_in, msgLength) {
            var msgId = _in.read() * 256 + _in.read();
            this.setMessageId(parseInt(msgId, 10));
        };
        RetryableMessage.prototype.setMessageId = function (_messageId) {
            this.messageId = _messageId;
        };
        RetryableMessage.prototype.getMessageId = function () {
            return this.messageId;
        };
        return RetryableMessage;
    }(BaseMessage));
    RongIMLib.RetryableMessage = RetryableMessage;
    /**
     *å‘é€æ¶ˆæ¯åº”ç­”ï¼ˆåŒå‘ï¼‰
     *qosä¸º1å¿…é¡»ç»™å‡ºåº”ç­”ï¼ˆæ‰€æœ‰æ¶ˆæ¯ç±»åž‹ä¸€æ ·ï¼‰
     */
    var PubAckMessage = (function (_super) {
        __extends(PubAckMessage, _super);
        function PubAckMessage(header) {
            _super.call(this, (header instanceof RongIMLib.Header) ? header : RongIMLib.Type.PUBACK);
            this.msgLen = 2;
            this.date = 0;
            this.millisecond = 0;
            this.timestamp = 0;
            this.binaryHelper = new RongIMLib.BinaryHelper();
            this._name = "PubAckMessage";
            if (!(header instanceof RongIMLib.Header)) {
                _super.prototype.setMessageId.call(this, header);
            }
        }
        PubAckMessage.prototype.messageLength = function () {
            return this.msgLen;
        };
        PubAckMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out);
            RetryableMessage.prototype.writeMessage.call(this, out);
        };
        PubAckMessage.prototype.readMessage = function (_in, msgLength) {
            RetryableMessage.prototype.readMessage.call(this, _in);
            this.date = _in.readInt();
            this.status = _in.read() * 256 + _in.read();
            this.millisecond = _in.read() * 256 + _in.read();
            this.timestamp = this.date * 1000 + this.millisecond;
            this.messageUId = _in.readUTF();
        };
        PubAckMessage.prototype.setStatus = function (x) {
            this.status = x;
        };
        PubAckMessage.prototype.setTimestamp = function (timestamp) {
            this.timestamp = timestamp;
        };
        PubAckMessage.prototype.setMessageUId = function (messageUId) {
            this.messageUId = messageUId;
        };
        PubAckMessage.prototype.getStatus = function () {
            return this.status;
        };
        PubAckMessage.prototype.getDate = function () {
            return this.date;
        };
        PubAckMessage.prototype.getTimestamp = function () {
            return this.timestamp;
        };
        PubAckMessage.prototype.getMessageUId = function () {
            return this.messageUId;
        };
        return PubAckMessage;
    }(RetryableMessage));
    RongIMLib.PubAckMessage = PubAckMessage;
    /**
     *å‘å¸ƒæ¶ˆæ¯
     */
    var PublishMessage = (function (_super) {
        __extends(PublishMessage, _super);
        function PublishMessage(header, two, three) {
            _super.call(this, (arguments.length == 1 && header instanceof RongIMLib.Header) ? header : arguments.length == 3 ? RongIMLib.Type.PUBLISH : 0);
            this._name = "PublishMessage";
            this.binaryHelper = new RongIMLib.BinaryHelper();
            this.syncMsg = false;
            if (arguments.length == 3) {
                this.topic = header;
                this.targetId = three;
                this.data = typeof two == "string" ? this.binaryHelper.toMQttString(two) : two;
            }
        }
        PublishMessage.prototype.messageLength = function () {
            var length = 10;
            length += this.binaryHelper.toMQttString(this.topic).length;
            length += this.binaryHelper.toMQttString(this.targetId).length;
            length += this.data.length;
            return length;
        };
        PublishMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out);
            out.writeUTF(this.topic);
            out.writeUTF(this.targetId);
            RetryableMessage.prototype.writeMessage.apply(this, arguments);
            out.write(this.data);
        };
        ;
        PublishMessage.prototype.readMessage = function (_in, msgLength) {
            var pos = 6;
            this.date = _in.readInt();
            this.topic = _in.readUTF();
            pos += this.binaryHelper.toMQttString(this.topic).length;
            this.targetId = _in.readUTF();
            pos += this.binaryHelper.toMQttString(this.targetId).length;
            RetryableMessage.prototype.readMessage.apply(this, arguments);
            this.data = new Array(msgLength - pos);
            this.data = _in.read(this.data);
        };
        ;
        PublishMessage.prototype.setTopic = function (x) {
            this.topic = x;
        };
        PublishMessage.prototype.setData = function (x) {
            this.data = x;
        };
        PublishMessage.prototype.setTargetId = function (x) {
            this.targetId = x;
        };
        PublishMessage.prototype.setDate = function (x) {
            this.date = x;
        };
        PublishMessage.prototype.setSyncMsg = function (x) {
            this.syncMsg = x;
        };
        //æ˜¯å¦æ˜¯å…¶ä»–ç«¯åŒæ­¥è¿‡æ¥çš„æ¶ˆæ¯
        PublishMessage.prototype.getSyncMsg = function () {
            return this.syncMsg;
        };
        PublishMessage.prototype.getTopic = function () {
            return this.topic;
        };
        PublishMessage.prototype.getData = function () {
            return this.data;
        };
        PublishMessage.prototype.getTargetId = function () {
            return this.targetId;
        };
        PublishMessage.prototype.getDate = function () {
            return this.date;
        };
        return PublishMessage;
    }(RetryableMessage));
    RongIMLib.PublishMessage = PublishMessage;
    /**
     *è¯·æ±‚æŸ¥è¯¢
     */
    var QueryMessage = (function (_super) {
        __extends(QueryMessage, _super);
        function QueryMessage(header, two, three) {
            _super.call(this, header instanceof RongIMLib.Header ? header : arguments.length == 3 ? RongIMLib.Type.QUERY : null);
            this.binaryHelper = new RongIMLib.BinaryHelper();
            this._name = "QueryMessage";
            if (arguments.length == 3) {
                this.data = typeof two == "string" ? this.binaryHelper.toMQttString(two) : two;
                this.topic = header;
                this.targetId = three;
            }
        }
        QueryMessage.prototype.messageLength = function () {
            var length = 0;
            length += this.binaryHelper.toMQttString(this.topic).length;
            length += this.binaryHelper.toMQttString(this.targetId).length;
            length += 2;
            length += this.data.length;
            return length;
        };
        QueryMessage.prototype.writeMessage = function (Out) {
            var out = this.binaryHelper.convertStream(Out);
            out.writeUTF(this.topic);
            out.writeUTF(this.targetId);
            RetryableMessage.prototype.writeMessage.call(this, out);
            out.write(this.data);
        };
        QueryMessage.prototype.readMessage = function (_in, msgLength) {
            var pos = 0;
            this.topic = _in.readUTF();
            this.targetId = _in.readUTF();
            pos += this.binaryHelper.toMQttString(this.topic).length;
            pos += this.binaryHelper.toMQttString(this.targetId).length;
            this.readMessage.apply(this, arguments);
            pos += 2;
            this.data = new Array(msgLength - pos);
            _in.read(this.data);
        };
        QueryMessage.prototype.setTopic = function (x) {
            this.topic = x;
        };
        QueryMessage.prototype.setData = function (x) {
            this.data = x;
        };
        QueryMessage.prototype.setTargetId = function (x) {
            this.targetId = x;
        };
        QueryMessage.prototype.getTopic = function () {
            return this.topic;
        };
        QueryMessage.prototype.getData = function () {
            return this.data;
        };
        QueryMessage.prototype.getTargetId = function () {
            return this.targetId;
        };
        return QueryMessage;
    }(RetryableMessage));
    RongIMLib.QueryMessage = QueryMessage;
    /**
     *è¯·æ±‚æŸ¥è¯¢ç¡®è®¤
     */
    var QueryConMessage = (function (_super) {
        __extends(QueryConMessage, _super);
        function QueryConMessage(messageId) {
            _super.call(this, (messageId instanceof RongIMLib.Header) ? messageId : RongIMLib.Type.QUERYCON);
            this._name = "QueryConMessage";
            if (!(messageId instanceof RongIMLib.Header)) {
                _super.prototype.setMessageId.call(this, messageId);
            }
        }
        return QueryConMessage;
    }(RetryableMessage));
    RongIMLib.QueryConMessage = QueryConMessage;
    /**
     *è¯·æ±‚æŸ¥è¯¢åº”ç­”
     */
    var QueryAckMessage = (function (_super) {
        __extends(QueryAckMessage, _super);
        function QueryAckMessage(header) {
            _super.call(this, header);
            this._name = "QueryAckMessage";
            this.binaryHelper = new RongIMLib.BinaryHelper();
        }
        QueryAckMessage.prototype.readMessage = function (In, msgLength) {
            RetryableMessage.prototype.readMessage.call(this, In);
            this.date = In.readInt();
            this.setStatus(In.read() * 256 + In.read());
            if (msgLength > 0) {
                this.data = new Array(msgLength - 8);
                this.data = In.read(this.data);
            }
        };
        QueryAckMessage.prototype.getData = function () {
            return this.data;
        };
        QueryAckMessage.prototype.getStatus = function () {
            return this.status;
        };
        QueryAckMessage.prototype.getDate = function () {
            return this.date;
        };
        QueryAckMessage.prototype.setDate = function (x) {
            this.date = x;
        };
        QueryAckMessage.prototype.setStatus = function (x) {
            this.status = x;
        };
        QueryAckMessage.prototype.setData = function (x) {
            this.data = x;
        };
        return QueryAckMessage;
    }(RetryableMessage));
    RongIMLib.QueryAckMessage = QueryAckMessage;
})(RongIMLib || (RongIMLib = {}));
/// <reference path="../../dts/helper.d.ts"/>
var RongIMLib;
(function (RongIMLib) {
    /**
     * æŠŠæ¶ˆæ¯å¯¹è±¡å†™å…¥æµä¸­
     * å‘é€æ¶ˆæ¯æ—¶ç”¨åˆ°
     */
    var MessageOutputStream = (function () {
        function MessageOutputStream(_out) {
            var binaryHelper = new RongIMLib.BinaryHelper();
            this.out = binaryHelper.convertStream(_out);
        }
        MessageOutputStream.prototype.writeMessage = function (msg) {
            if (msg instanceof RongIMLib.BaseMessage) {
                msg.write(this.out);
            }
        };
        return MessageOutputStream;
    }());
    RongIMLib.MessageOutputStream = MessageOutputStream;
    /**
     * æµè½¬æ¢ä¸ºæ¶ˆæ¯å¯¹è±¡
     * æœåŠ¡å™¨è¿”å›žæ¶ˆæ¯æ—¶ç”¨åˆ°
     */
    var MessageInputStream = (function () {
        function MessageInputStream(In, isPolling) {
            if (!isPolling) {
                var _in = new RongIMLib.BinaryHelper().convertStream(In);
                this.flags = _in.readByte();
                this._in = _in;
            }
            else {
                this.flags = In["headerCode"];
            }
            this.header = new RongIMLib.Header(this.flags);
            this.isPolling = isPolling;
            this.In = In;
        }
        MessageInputStream.prototype.readMessage = function () {
            switch (this.header.getType()) {
                case 1:
                    this.msg = new RongIMLib.ConnectMessage(this.header);
                    break;
                case 2:
                    this.msg = new RongIMLib.ConnAckMessage(this.header);
                    break;
                case 3:
                    this.msg = new RongIMLib.PublishMessage(this.header);
                    this.msg.setSyncMsg(this.header.getSyncMsg());
                    break;
                case 4:
                    this.msg = new RongIMLib.PubAckMessage(this.header);
                    break;
                case 5:
                    this.msg = new RongIMLib.QueryMessage(this.header);
                    break;
                case 6:
                    this.msg = new RongIMLib.QueryAckMessage(this.header);
                    break;
                case 7:
                    this.msg = new RongIMLib.QueryConMessage(this.header);
                    break;
                case 9:
                case 11:
                case 13:
                    this.msg = new RongIMLib.PingRespMessage(this.header);
                    break;
                case 8:
                case 10:
                case 12:
                    this.msg = new RongIMLib.PingReqMessage(this.header);
                    break;
                case 14:
                    this.msg = new RongIMLib.DisconnectMessage(this.header);
                    break;
                default:
                    throw new Error("No support for deserializing " + this.header.getType() + " messages");
            }
            if (this.isPolling) {
                this.msg.init(this.In);
            }
            else {
                this.msg.read(this._in, this.In.length - 1);
            }
            return this.msg;
        };
        return MessageInputStream;
    }());
    RongIMLib.MessageInputStream = MessageInputStream;
    var Header = (function () {
        function Header(_type, _retain, _qos, _dup) {
            this.retain = false;
            this.qos = RongIMLib.Qos.AT_LEAST_ONCE;
            this.dup = false;
            this.syncMsg = false;
            if (_type && +_type == _type && arguments.length == 1) {
                this.retain = (_type & 1) > 0;
                this.qos = (_type & 6) >> 1;
                this.dup = (_type & 8) > 0;
                this.type = (_type >> 4) & 15;
                this.syncMsg = (_type & 8) == 8;
            }
            else {
                this.type = _type;
                this.retain = _retain;
                this.qos = _qos;
                this.dup = _dup;
            }
        }
        Header.prototype.getSyncMsg = function () {
            return this.syncMsg;
        };
        Header.prototype.getType = function () {
            return this.type;
        };
        Header.prototype.encode = function () {
            var me = this;
            switch (this.qos) {
                case RongIMLib.Qos[0]:
                    me.qos = RongIMLib.Qos.AT_MOST_ONCE;
                    break;
                case RongIMLib.Qos[1]:
                    me.qos = RongIMLib.Qos.AT_LEAST_ONCE;
                    break;
                case RongIMLib.Qos[2]:
                    me.qos = RongIMLib.Qos.EXACTLY_ONCE;
                    break;
                case RongIMLib.Qos[3]:
                    me.qos = RongIMLib.Qos.DEFAULT;
                    break;
            }
            var _byte = (this.type << 4);
            _byte |= this.retain ? 1 : 0;
            _byte |= this.qos << 1;
            _byte |= this.dup ? 8 : 0;
            return _byte;
        };
        Header.prototype.toString = function () {
            return "Header [type=" + this.type + ",retain=" + this.retain + ",qos=" + this.qos + ",dup=" + this.dup + "]";
        };
        return Header;
    }());
    RongIMLib.Header = Header;
    /**
     * äºŒè¿›åˆ¶å¸®åŠ©å¯¹è±¡
     */
    var BinaryHelper = (function () {
        function BinaryHelper() {
        }
        BinaryHelper.prototype.writeUTF = function (str, isGetBytes) {
            var back = [], byteSize = 0;
            for (var i = 0, len = str.length; i < len; i++) {
                var code = str.charCodeAt(i);
                if (code >= 0 && code <= 127) {
                    byteSize += 1;
                    back.push(code);
                }
                else if (code >= 128 && code <= 2047) {
                    byteSize += 2;
                    back.push((192 | (31 & (code >> 6))));
                    back.push((128 | (63 & code)));
                }
                else if (code >= 2048 && code <= 65535) {
                    byteSize += 3;
                    back.push((224 | (15 & (code >> 12))));
                    back.push((128 | (63 & (code >> 6))));
                    back.push((128 | (63 & code)));
                }
            }
            for (var i = 0, len = back.length; i < len; i++) {
                if (back[i] > 255) {
                    back[i] &= 255;
                }
            }
            if (isGetBytes) {
                return back;
            }
            if (byteSize <= 255) {
                return [0, byteSize].concat(back);
            }
            else {
                return [byteSize >> 8, byteSize & 255].concat(back);
            }
        };
        BinaryHelper.prototype.readUTF = function (arr) {
            if (Object.prototype.toString.call(arr) == "[object String]") {
                return arr;
            }
            var UTF = "", _arr = arr;
            for (var i = 0, len = _arr.length; i < len; i++) {
                if (_arr[i] < 0) {
                    _arr[i] += 256;
                }
                ;
                var one = _arr[i].toString(2), v = one.match(/^1+?(?=0)/);
                if (v && one.length == 8) {
                    var bytesLength = v[0].length, 
                    // store = _arr[i].toString(2).slice(7 - bytesLength);
                    store = '';
                    for (var st = 0; st < bytesLength; st++) {
                        store += _arr[st + i].toString(2).slice(2);
                    }
                    UTF += String.fromCharCode(parseInt(store, 2));
                    i += bytesLength - 1;
                }
                else {
                    UTF += String.fromCharCode(_arr[i]);
                }
            }
            return UTF;
        };
        /**
         * [convertStream å°†å‚æ•°xè½¬åŒ–ä¸ºRongIMStreamå¯¹è±¡]
         * @param  {any}    x [å‚æ•°]
         */
        BinaryHelper.prototype.convertStream = function (x) {
            if (x instanceof RongIMStream) {
                return x;
            }
            else {
                return new RongIMStream(x);
            }
        };
        BinaryHelper.prototype.toMQttString = function (str) {
            return this.writeUTF(str);
        };
        return BinaryHelper;
    }());
    RongIMLib.BinaryHelper = BinaryHelper;
    var RongIMStream = (function () {
        function RongIMStream(arr) {
            //å½“å‰æµæ‰§è¡Œçš„èµ·å§‹ä½ç½®
            this.position = 0;
            //å½“å‰æµå†™å…¥çš„å¤šå°‘å­—èŠ‚
            this.writen = 0;
            this.poolLen = 0;
            this.binaryHelper = new BinaryHelper();
            this.pool = arr;
            this.poolLen = arr.length;
        }
        RongIMStream.prototype.check = function () {
            return this.position >= this.pool.length;
        };
        RongIMStream.prototype.readInt = function () {
            if (this.check()) {
                return -1;
            }
            var end = "";
            for (var i = 0; i < 4; i++) {
                var t = this.pool[this.position++].toString(16);
                if (t.length == 1) {
                    t = "0" + t;
                }
                end += t.toString(16);
            }
            return parseInt(end, 16);
        };
        RongIMStream.prototype.readLong = function () {
            if (this.check()) {
                return -1;
            }
            var end = "";
            for (var i = 0; i < 8; i++) {
                var t = this.pool[this.position++].toString(16);
                if (t.length == 1) {
                    t = "0" + t;
                }
                end += t;
            }
            return parseInt(end, 16);
        };
        RongIMStream.prototype.readTimestamp = function () {
            if (this.check()) {
                return -1;
            }
            var end = "";
            for (var i = 0; i < 8; i++) {
                end += this.pool[this.position++].toString(16);
            }
            end = end.substring(2, 8);
            return parseInt(end, 16);
        };
        RongIMStream.prototype.readUTF = function () {
            if (this.check()) {
                return -1;
            }
            var big = (this.readByte() << 8) | this.readByte();
            return this.binaryHelper.readUTF(this.pool.subarray(this.position, this.position += big));
        };
        RongIMStream.prototype.readByte = function () {
            if (this.check()) {
                return -1;
            }
            var val = this.pool[this.position++];
            if (val > 255) {
                val &= 255;
            }
            return val;
        };
        RongIMStream.prototype.read = function (bytesArray) {
            if (bytesArray) {
                return this.pool.subarray(this.position, this.poolLen);
            }
            else {
                return this.readByte();
            }
        };
        RongIMStream.prototype.write = function (_byte) {
            var b = _byte;
            if (Object.prototype.toString.call(b).toLowerCase() == "[object array]") {
                [].push.apply(this.pool, b);
            }
            else {
                if (+b == b) {
                    if (b > 255) {
                        b &= 255;
                    }
                    this.pool.push(b);
                    this.writen++;
                }
            }
            return b;
        };
        RongIMStream.prototype.writeChar = function (v) {
            if (+v != v) {
                throw new Error("writeChar:arguments type is error");
            }
            this.write(v >> 8 & 255);
            this.write(v & 255);
            this.writen += 2;
        };
        RongIMStream.prototype.writeUTF = function (str) {
            var val = this.binaryHelper.writeUTF(str);
            [].push.apply(this.pool, val);
            this.writen += val.length;
        };
        RongIMStream.prototype.toComplements = function () {
            var _tPool = this.pool;
            for (var i = 0; i < this.poolLen; i++) {
                if (_tPool[i] > 128) {
                    _tPool[i] -= 256;
                }
            }
            return _tPool;
        };
        RongIMStream.prototype.getBytesArray = function (isCom) {
            if (isCom) {
                return this.toComplements();
            }
            return this.pool;
        };
        return RongIMStream;
    }());
    RongIMLib.RongIMStream = RongIMStream;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var SocketTransportation = (function () {
        /**
         * [constructor]
         * @param  {string} url [è¿žæŽ¥åœ°å€ï¼šåŒ…å«tokenã€version]
         */
        function SocketTransportation(_socket) {
            //è¿žæŽ¥çŠ¶æ€ true:å·²è¿žæŽ¥ false:æœªè¿žæŽ¥
            this.connected = false;
            //æ˜¯å¦å…³é—­ï¼š true:å·²å…³é—­ falseï¼šæœªå…³é—­
            this.isClose = false;
            //å­˜æ”¾æ¶ˆæ¯é˜Ÿåˆ—çš„ä¸´æ—¶å˜é‡
            this.queue = [];
            this.empty = new Function;
            this._socket = _socket;
            return this;
        }
        /**
         * [createTransport åˆ›å»ºWebScoketå¯¹è±¡]
         */
        SocketTransportation.prototype.createTransport = function (url, method) {
            if (!url) {
                throw new Error("URL can't be empty");
            }
            ;
            this.url = url;
            this.socket = new WebSocket(RongIMLib.RongIMClient._memoryStore.depend.wsScheme + url);
            this.socket.binaryType = "arraybuffer";
            this.addEvent();
            return this.socket;
        };
        /**
         * [send ä¼ é€æ¶ˆæ¯æµ]
         * @param  {ArrayBuffer} data [äºŒè¿›åˆ¶æ¶ˆæ¯æµ]
         */
        SocketTransportation.prototype.send = function (data) {
            if (!this.connected && !this.isClose) {
                //å½“é€šé“ä¸å¯ç”¨æ—¶ï¼ŒåŠ å…¥æ¶ˆæ¯é˜Ÿåˆ—
                this.queue.push(data);
                return;
            }
            if (this.isClose) {
                this._socket.fire("StatusChanged", RongIMLib.ConnectionStatus.CONNECTION_CLOSED);
                return;
            }
            var stream = new RongIMLib.RongIMStream([]), msg = new RongIMLib.MessageOutputStream(stream);
            msg.writeMessage(data);
            var val = stream.getBytesArray(true);
            var binary = new Int8Array(val);
            this.socket.send(binary.buffer);
            return this;
        };
        /**
         * [onData é€šé“è¿”å›žæ•°æ®æ—¶è°ƒç”¨çš„æ–¹æ³•ï¼Œç”¨æ¥æƒ³ä¸Šå±‚ä¼ é€’æœåŠ¡å™¨è¿”å›žçš„äºŒè¿›åˆ¶æ¶ˆæ¯æµ]
         * @param  {ArrayBuffer}    data [äºŒè¿›åˆ¶æ¶ˆæ¯æµ]
         */
        SocketTransportation.prototype.onData = function (data) {
            if (RongIMLib.MessageUtil.isArray(data)) {
                this._socket.onMessage(new RongIMLib.MessageInputStream(data).readMessage());
            }
            else {
                this._socket.onMessage(new RongIMLib.MessageInputStream(RongIMLib.MessageUtil.ArrayFormInput(data)).readMessage());
            }
            return "";
        };
        /**
         * [onClose é€šé“å…³é—­æ—¶è§¦å‘çš„æ–¹æ³•]
         */
        SocketTransportation.prototype.onClose = function (ev) {
            var me = this;
            me.isClose = true;
            me.socket = this.empty;
            RongIMLib.Bridge._client.clearHeartbeat();
            if (ev.code == 1006 && !this._status) {
                me._socket.fire("StatusChanged", RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE);
            }
            else {
                me._status = 0;
            }
        };
        /**
         * [onError é€šé“æŠ¥é”™æ—¶è§¦å‘çš„æ–¹æ³•]
         * @param {any} error [æŠ›å‡ºå¼‚å¸¸]
         */
        SocketTransportation.prototype.onError = function (error) {
            throw new Error(error);
        };
        /**
         * [addEvent ä¸ºé€šé“ç»‘å®šäº‹ä»¶]
         */
        SocketTransportation.prototype.addEvent = function () {
            var self = this;
            self.socket.onopen = function () {
                self.connected = true;
                self.isClose = false;
                //é€šé“å¯ä»¥ç”¨åŽï¼Œè°ƒç”¨å‘é€é˜Ÿåˆ—æ–¹æ³•ï¼ŒæŠŠæ‰€æœ‰ç­‰å¾—å‘é€çš„æ¶ˆæ¯å‘å‡º
                self.doQueue();
                self._socket.fire("connect");
            };
            self.socket.onmessage = function (ev) {
                //åˆ¤æ–­æ•°æ®æ˜¯ä¸æ˜¯å­—ç¬¦ä¸²ï¼Œå¦‚æžœæ˜¯å­—ç¬¦ä¸²é‚£ä¹ˆå°±æ˜¯flashä¼ è¿‡æ¥çš„ã€‚
                if (typeof ev.data == "string") {
                    self.onData(ev.data.split(","));
                }
                else {
                    self.onData(ev.data);
                }
            };
            self.socket.onerror = function (ev) {
                self.onError(ev);
            };
            self.socket.onclose = function (ev) {
                self.onClose(ev);
            };
        };
        /**
         * [doQueue æ¶ˆæ¯é˜Ÿåˆ—ï¼ŒæŠŠé˜Ÿåˆ—ä¸­æ¶ˆæ¯å‘å‡º]
         */
        SocketTransportation.prototype.doQueue = function () {
            var self = this;
            for (var i = 0, len = self.queue.length; i < len; i++) {
                self.send(self.queue[i]);
            }
        };
        /**
         * [disconnect æ–­å¼€è¿žæŽ¥]
         */
        SocketTransportation.prototype.disconnect = function (status) {
            var me = this;
            if (me.socket.readyState) {
                me.isClose = true;
                if (status) {
                    me._status = status;
                }
                this.socket.close();
            }
        };
        /**
         * [reconnect é‡æ–°è¿žæŽ¥]
         */
        SocketTransportation.prototype.reconnect = function () {
            this.disconnect();
            this.createTransport(this.url);
        };
        return SocketTransportation;
    }());
    RongIMLib.SocketTransportation = SocketTransportation;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var PollingTransportation = (function () {
        function PollingTransportation(socket) {
            this.empty = new Function;
            this.connected = false;
            this.pid = +new Date + Math.random() + "";
            this.queue = [];
            this.socket = socket;
            return this;
        }
        PollingTransportation.prototype.createTransport = function (url, method) {
            if (!url) {
                throw new Error("Url is empty,Please check it!");
            }
            ;
            this.url = url;
            var sid = RongIMLib.RongIMClient._storageProvider.getItem("sId" + RongIMLib.Navigation.Endpoint.userId), me = this;
            if (sid) {
                setTimeout(function () {
                    me.onSuccess("{\"status\":0,\"userId\":\"" + RongIMLib.Navigation.Endpoint.userId + "\",\"headerCode\":32,\"messageId\":0,\"sessionid\":\"" + sid + "\"}");
                    me.connected = true;
                }, 500);
                return this;
            }
            this.getRequest(url, true);
            return this;
        };
        PollingTransportation.prototype.requestFactory = function (url, method, multipart) {
            var reqest = this.XmlHttpRequest();
            if (multipart) {
                reqest.multipart = true;
            }
            reqest.timeout = 60000;
            reqest.open(method || "GET", RongIMLib.RongIMClient._memoryStore.depend.protocol + url);
            if (method == "POST" && "setRequestHeader" in reqest) {
                reqest.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
            }
            return reqest;
        };
        PollingTransportation.prototype.getRequest = function (url, isconnect) {
            var me = this;
            me.xhr = this.requestFactory(url + "&pid=" + encodeURIComponent(me.pid), "GET");
            if ("onload" in me.xhr) {
                me.xhr.onload = function () {
                    me.xhr.onload = me.empty;
                    if (this.responseText == "lost params") {
                        me.onError();
                    }
                    else {
                        me.onSuccess(this.responseText, isconnect);
                    }
                };
                me.xhr.onerror = function () {
                    me.disconnect();
                };
            }
            else {
                me.xhr.onreadystatechange = function () {
                    if (me.xhr.readyState == 4) {
                        me.xhr.onreadystatechange = me.empty;
                        if (/^(200|202)$/.test(me.xhr.status)) {
                            me.onSuccess(me.xhr.responseText, isconnect);
                        }
                        else if (/^(400|403)$/.test(me.xhr.status)) {
                            me.onError();
                        }
                        else {
                            me.disconnect();
                        }
                    }
                };
            }
            me.xhr.send();
        };
        /**
         * [send å‘é€æ¶ˆæ¯ï¼ŒMethod:POST]
         * queue ä¸ºæ¶ˆæ¯é˜Ÿåˆ—ï¼Œå¾…é€šé“å¯ç”¨å‘é€æ‰€æœ‰ç­‰å¾…æ¶ˆæ¯
         * @param  {string} data [éœ€è¦ä¼ å…¥cometæ ¼å¼æ•°æ®ï¼Œæ­¤å¤„åªè´Ÿè´£é€šè®¯é€šé“ï¼Œæ•°æ®è½¬æ¢åœ¨å¤–å±‚å¤„ç†]
         */
        PollingTransportation.prototype.send = function (data) {
            var me = this;
            var _send = me.sendxhr = this.requestFactory(RongIMLib.Navigation.Endpoint.host + "/websocket" + data.url + "&pid=" + encodeURIComponent(me.pid), "POST");
            if ("onload" in _send) {
                _send.onload = function () {
                    _send.onload = me.empty;
                    me.onData(_send.responseText);
                };
                _send.onerror = function () {
                    _send.onerror = me.empty;
                };
            }
            else {
                _send.onreadystatechange = function () {
                    if (_send.readyState == 4) {
                        this.onreadystatechange = this.empty;
                        if (/^(202|200)$/.test(_send.status)) {
                            me.onData(_send.responseText);
                        }
                    }
                };
            }
            _send.send(JSON.stringify(data.data));
        };
        PollingTransportation.prototype.onData = function (data, header) {
            if (!data || data == "lost params") {
                return;
            }
            var self = this, val = JSON.parse(data);
            if (val.userId) {
                RongIMLib.Navigation.Endpoint.userId = val.userId;
            }
            if (header) {
                RongIMLib.RongIMClient._storageProvider.setItem("sId" + RongIMLib.Navigation.Endpoint.userId, header);
            }
            if (!RongIMLib.MessageUtil.isArray(val)) {
                val = [val];
            }
            Array.forEach(val, function (m) {
                self.socket.fire("message", new RongIMLib.MessageInputStream(m, true).readMessage());
            });
            return "";
        };
        PollingTransportation.prototype.XmlHttpRequest = function () {
            var hasCORS = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest(), self = this;
            if ("undefined" != typeof XMLHttpRequest && hasCORS) {
                return new XMLHttpRequest();
            }
            else if ("undefined" != typeof XDomainRequest) {
                return new XDomainRequest();
            }
            else {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }
        };
        PollingTransportation.prototype.onClose = function () {
            if (this.xhr) {
                if (this.xhr.onload) {
                    this.xhr.onreadystatechange = this.xhr.onload = this.empty;
                }
                else {
                    this.xhr.onreadystatechange = this.empty;
                }
                this.xhr.abort();
                this.xhr = null;
            }
            if (this.sendxhr) {
                if (this.sendxhr.onload) {
                    this.sendxhr.onreadystatechange = this.sendxhr.onload = this.empty;
                }
                else {
                    this.sendxhr.onreadystatechange = this.empty;
                }
                this.sendxhr.abort();
                this.sendxhr = null;
            }
        };
        PollingTransportation.prototype.disconnect = function () {
            RongIMLib.RongIMClient._storageProvider.removeItem("sId" + RongIMLib.Navigation.Endpoint.userId);
            RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId + "msgId");
            this.onClose();
        };
        PollingTransportation.prototype.reconnect = function () {
            this.disconnect();
            this.createTransport(this.url);
        };
        PollingTransportation.prototype.onSuccess = function (responseText, isconnect) {
            var txt = responseText.match(/"sessionid":"\S+?(?=")/);
            this.onData(responseText, txt ? txt[0].slice(13) : 0);
            if (/"headerCode":-32,/.test(responseText)) {
                RongIMLib.RongIMClient._storageProvider.removeItem("sId" + RongIMLib.Navigation.Endpoint.userId);
                RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId + "msgId");
                return;
            }
            this.getRequest(RongIMLib.Navigation.Endpoint.host + "/pullmsg.js?sessionid=" + RongIMLib.RongIMClient._storageProvider.getItem("sId" + RongIMLib.Navigation.Endpoint.userId) + "&timestrap=" + encodeURIComponent(new Date().getTime() + Math.random() + ""));
            this.connected = true;
            isconnect && this.socket.fire("connect");
        };
        PollingTransportation.prototype.onError = function () {
            RongIMLib.RongIMClient._storageProvider.removeItem("sId" + RongIMLib.Navigation.Endpoint.userId);
            RongIMLib.RongIMClient._storageProvider.removeItem(RongIMLib.Navigation.Endpoint.userId + "msgId");
            this.onClose();
            this.connected = false;
            this.socket.fire("disconnect");
        };
        return PollingTransportation;
    }());
    RongIMLib.PollingTransportation = PollingTransportation;
})(RongIMLib || (RongIMLib = {}));
//objectnameæ˜ å°„
var typeMapping = {
    "RC:TxtMsg": "TextMessage",
    "RC:ImgMsg": "ImageMessage",
    "RC:VcMsg": "VoiceMessage",
    "RC:ImgTextMsg": "RichContentMessage",
    "RC:FileMsg": "FileMessage",
    "RC:LBSMsg": "LocationMessage",
    "RC:InfoNtf": "InformationNotificationMessage",
    "RC:ContactNtf": "ContactNotificationMessage",
    "RC:ProfileNtf": "ProfileNotificationMessage",
    "RC:CmdNtf": "CommandNotificationMessage",
    "RC:DizNtf": "DiscussionNotificationMessage",
    "RC:CmdMsg": "CommandMessage",
    "RC:TypSts": "TypingStatusMessage",
    "RC:CsChaR": "ChangeModeResponseMessage",
    "RC:CsHsR": "HandShakeResponseMessage",
    "RC:CsEnd": "TerminateMessage",
    "RC:CsSp": "SuspendMessage",
    "RC:CsUpdate": "CustomerStatusUpdateMessage",
    "RC:ReadNtf": "ReadReceiptMessage",
    "RC:VCAccept": "AcceptMessage",
    "RC:VCRinging": "RingingMessage",
    "RC:VCSummary": "SummaryMessage",
    "RC:VCHangup": "HungupMessage",
    "RC:VCInvite": "InviteMessage",
    "RC:VCModifyMedia": "MediaModifyMessage",
    "RC:VCModifyMem": "MemberModifyMessage",
    "RC:CsContact": "CustomerContact",
    "RC:PSImgTxtMsg": "PublicServiceRichContentMessage",
    "RC:PSMultiImgTxtMsg": "PublicServiceMultiRichContentMessage",
    "RC:GrpNtf": "GroupNotificationMessage",
    "RC:PSCmd": "PublicServiceCommandMessage",
    "RC:RcCmd": "RecallCommandMessage",
    "RC:SRSMsg": "SyncReadStatusMessage",
    "RC:RRReqMsg": "ReadReceiptRequestMessage",
    "RC:RRRspMsg": "ReadReceiptResponseMessage",
    "RCJrmf:RpMsg": "JrmfReadPacketMessage",
    "RCJrmf:RpOpendMsg": "JrmfReadPacketOpenedMessage"
}, 
//è‡ªå®šä¹‰æ¶ˆæ¯ç±»åž‹
registerMessageTypeMapping = {}, HistoryMsgType = {
    4: "qryCMsg",
    2: "qryDMsg",
    3: "qryGMsg",
    1: "qryPMsg",
    6: "qrySMsg",
    7: "qryPMsg",
    8: "qryPMsg",
    5: "qryCMsg"
}, disconnectStatus = { 1: 6 };
var RongIMLib;
(function (RongIMLib) {
    /**
     * é€šé“æ ‡è¯†ç±»
     */
    var Transportations = (function () {
        function Transportations() {
        }
        Transportations._TransportType = RongIMLib.Socket.WEBSOCKET;
        return Transportations;
    }());
    RongIMLib.Transportations = Transportations;
    var MessageUtil = (function () {
        function MessageUtil() {
        }
        MessageUtil.supportLargeStorage = function () {
            if (window.localStorage) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         *4680000 ä¸ºlocalstorageæœ€å°å®¹é‡5200000å­—èŠ‚çš„90%ï¼Œè¶…è¿‡90%å°†åˆ é™¤ä¹‹å‰è¿‡æ—©çš„å­˜å‚¨
         */
        MessageUtil.checkStorageSize = function () {
            return JSON.stringify(localStorage).length < 4680000;
        };
        MessageUtil.getFirstKey = function (obj) {
            var str = "";
            for (var key in obj) {
                str = key;
                break;
            }
            return str;
        };
        MessageUtil.isEmpty = function (obj) {
            var empty = true;
            for (var key in obj) {
                empty = false;
                break;
            }
            return empty;
        };
        MessageUtil.ArrayForm = function (typearray) {
            if (Object.prototype.toString.call(typearray) == "[object ArrayBuffer]") {
                var arr = new Int8Array(typearray);
                return [].slice.call(arr);
            }
            return typearray;
        };
        MessageUtil.ArrayFormInput = function (typearray) {
            if (Object.prototype.toString.call(typearray) == "[object ArrayBuffer]") {
                var arr = new Uint8Array(typearray);
                return arr;
            }
            return typearray;
        };
        MessageUtil.indexOf = function (arr, item, from) {
            for (var l = arr.length, i = (from < 0) ? Math.max(0, +from) : from || 0; i < l; i++) {
                if (arr[i] == item) {
                    return i;
                }
            }
            return -1;
        };
        MessageUtil.isArray = function (obj) {
            return Object.prototype.toString.call(obj) == "[object Array]";
        };
        //éåŽ†ï¼Œåªèƒ½éåŽ†æ•°ç»„
        MessageUtil.forEach = function (arr, func) {
            if ([].forEach) {
                return function (arr, func) {
                    [].forEach.call(arr, func);
                };
            }
            else {
                return function (arr, func) {
                    for (var i = 0; i < arr.length; i++) {
                        func.call(arr, arr[i], i, arr);
                    }
                };
            }
        };
        MessageUtil.remove = function (array, func) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (func(array[i])) {
                    return array.splice(i, 1)[0];
                }
            }
            return null;
        };
        MessageUtil.int64ToTimestamp = function (obj, isDate) {
            if (obj.low === undefined) {
                return obj;
            }
            var low = obj.low;
            if (low < 0) {
                low += 0xffffffff + 1;
            }
            low = low.toString(16);
            var timestamp = parseInt(obj.high.toString(16) + "00000000".replace(new RegExp("0{" + low.length + "}$"), low), 16);
            if (isDate) {
                return new Date(timestamp);
            }
            return timestamp;
        };
        //æ¶ˆæ¯è½¬æ¢æ–¹æ³•
        MessageUtil.messageParser = function (entity, onReceived, offlineMsg) {
            var message = new RongIMLib.Message(), content = entity.content, de, objectName = entity.classname, val, isUseDef = false;
            try {
                if (RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                    val = new RongIMLib.BinaryHelper().readUTF(content.offset ? MessageUtil.ArrayForm(content.buffer).slice(content.offset, content.limit) : content);
                    de = JSON.parse(val);
                }
                else {
                    val = new RongIMLib.BinaryHelper().readUTF(content.offset ? MessageUtil.ArrayFormInput(content.buffer).subarray(content.offset, content.limit) : content);
                    de = JSON.parse(val);
                }
            }
            catch (ex) {
                de = val;
                isUseDef = true;
            }
            //æ˜ å°„ä¸ºå…·ä½“æ¶ˆæ¯å¯¹è±¡
            if (objectName in typeMapping) {
                var str = "new RongIMLib." + typeMapping[objectName] + "(de)";
                message.content = eval(str);
                message.messageType = typeMapping[objectName];
            }
            else if (objectName in registerMessageTypeMapping) {
                var str = "new RongIMLib.RongIMClient.RegisterMessage." + registerMessageTypeMapping[objectName] + "(de)";
                if (isUseDef) {
                    message.content = eval(str).decode(de);
                }
                else {
                    message.content = eval(str);
                }
                message.messageType = registerMessageTypeMapping[objectName];
            }
            else {
                message.content = new RongIMLib.UnknownMessage({ content: de, objectName: objectName });
                message.messageType = "UnknownMessage";
            }
            //æ ¹æ®å®žä½“å¯¹è±¡è®¾ç½®messageå¯¹è±¡]
            var dateTime = MessageUtil.int64ToTimestamp(entity.dataTime);
            if (dateTime > 0) {
                message.sentTime = dateTime;
            }
            else {
                message.sentTime = +new Date;
            }
            message.senderUserId = entity.fromUserId;
            message.conversationType = entity.type;
            if (entity.fromUserId == RongIMLib.Bridge._client.userId) {
                message.targetId = entity.groupId;
            }
            else {
                message.targetId = (/^[234]$/.test(entity.type || entity.getType()) ? entity.groupId : message.senderUserId);
            }
            if (entity.direction == 1) {
                message.messageDirection = RongIMLib.MessageDirection.SEND;
                message.senderUserId = RongIMLib.Bridge._client.userId;
            }
            else {
                if (message.senderUserId == RongIMLib.Bridge._client.userId) {
                    message.messageDirection = RongIMLib.MessageDirection.SEND;
                }
                else {
                    message.messageDirection = RongIMLib.MessageDirection.RECEIVE;
                }
            }
            if ((entity.status & 2) == 2) {
                message.receivedStatus = RongIMLib.ReceivedStatus.RETRIEVED;
            }
            message.messageUId = entity.msgId;
            message.receivedTime = new Date().getTime();
            message.messageId = (message.conversationType + "_" + ~~(Math.random() * 0xffffff));
            message.objectName = objectName;
            message.receivedStatus = RongIMLib.ReceivedStatus.READ;
            message.offLineMessage = offlineMsg ? true : false;
            if (!offlineMsg) {
                if (RongIMLib.RongIMClient._memoryStore.connectAckTime > message.sentTime) {
                    message.offLineMessage = true;
                }
            }
            return message;
        };
        //é€‚é…SSL
        // static schemeArrs: Array<any> = [["http", "ws"], ["https", "wss"]];
        MessageUtil.sign = { converNum: 1, msgNum: 1, isMsgStart: true, isConvStart: true };
        return MessageUtil;
    }());
    RongIMLib.MessageUtil = MessageUtil;
    /**
     * å·¥å…·ç±»
     */
    var MessageIdHandler = (function () {
        function MessageIdHandler() {
        }
        MessageIdHandler.init = function () {
            this.messageId = +(RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.Navigation.Endpoint.userId + "msgId") || RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId + "msgId", 0) || 0);
        };
        MessageIdHandler.messageIdPlus = function (method) {
            RongIMLib.RongIMClient._memoryStore.depend.isPolling && this.init();
            if (this.messageId >= 65535) {
                method();
                return false;
            }
            this.messageId++;
            RongIMLib.RongIMClient._memoryStore.depend.isPolling && RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId + "msgId", this.messageId);
            return this.messageId;
        };
        MessageIdHandler.clearMessageId = function () {
            this.messageId = 0;
            RongIMLib.RongIMClient._memoryStore.depend.isPolling && RongIMLib.RongIMClient._storageProvider.setItem(RongIMLib.Navigation.Endpoint.userId + "msgId", this.messageId);
        };
        MessageIdHandler.getMessageId = function () {
            RongIMLib.RongIMClient._memoryStore.depend.isPolling && this.init();
            return this.messageId;
        };
        MessageIdHandler.messageId = 0;
        return MessageIdHandler;
    }());
    RongIMLib.MessageIdHandler = MessageIdHandler;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var MessageContent = (function () {
        function MessageContent(data) {
            throw new Error("This method is abstract, you must implement this method in inherited class.");
        }
        MessageContent.obtain = function () {
            throw new Error("This method is abstract, you must implement this method in inherited class.");
        };
        return MessageContent;
    }());
    RongIMLib.MessageContent = MessageContent;
    var NotificationMessage = (function (_super) {
        __extends(NotificationMessage, _super);
        function NotificationMessage() {
            _super.apply(this, arguments);
        }
        return NotificationMessage;
    }(MessageContent));
    RongIMLib.NotificationMessage = NotificationMessage;
    var StatusMessage = (function (_super) {
        __extends(StatusMessage, _super);
        function StatusMessage() {
            _super.apply(this, arguments);
        }
        return StatusMessage;
    }(MessageContent));
    RongIMLib.StatusMessage = StatusMessage;
    var ModelUtil = (function () {
        function ModelUtil() {
        }
        ModelUtil.modelClone = function (object) {
            var obj = {};
            for (var item in object) {
                if (item != "messageName" && "encode" != item) {
                    obj[item] = object[item];
                }
            }
            return obj;
        };
        ModelUtil.modleCreate = function (fields, msgType) {
            if (fields.length < 1) {
                throw new Error("Array is empty  -> registerMessageType.modleCreate");
            }
            var Object = function (message) {
                var me = this;
                for (var index in fields) {
                    if (message[fields[index]]) {
                        me[fields[index]] = message[fields[index]];
                    }
                }
                Object.prototype.messageName = msgType;
                Object.prototype.encode = function () {
                    return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
                };
            };
            return Object;
        };
        return ModelUtil;
    }());
    RongIMLib.ModelUtil = ModelUtil;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var CustomerStatusMessage = (function () {
        function CustomerStatusMessage(message) {
            this.messageName = "CustomerStatusMessage";
            this.status = message.status;
        }
        CustomerStatusMessage.obtain = function () {
            return null;
        };
        CustomerStatusMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CustomerStatusMessage;
    }());
    RongIMLib.CustomerStatusMessage = CustomerStatusMessage;
    /**
     * å®¢æœè½¬æ¢å“åº”æ¶ˆæ¯çš„ç±»åž‹å
     */
    var ChangeModeResponseMessage = (function () {
        function ChangeModeResponseMessage(message) {
            this.messageName = "ChangeModeResponseMessage";
            this.code = message.code;
            this.data = message.data;
            this.msg = message.msg;
        }
        ChangeModeResponseMessage.obtain = function () {
            return null;
        };
        ChangeModeResponseMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ChangeModeResponseMessage;
    }());
    RongIMLib.ChangeModeResponseMessage = ChangeModeResponseMessage;
    /**
     * å®¢æœè½¬æ¢æ¶ˆæ¯çš„ç±»åž‹å
     * æ­¤æ¶ˆæ¯ä¸è®¡å…¥æœªè¯»æ¶ˆæ¯æ•°
     */
    var ChangeModeMessage = (function () {
        function ChangeModeMessage(message) {
            this.messageName = "ChangeModeMessage";
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
        }
        ChangeModeMessage.obtain = function () {
            return null;
        };
        ChangeModeMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ChangeModeMessage;
    }());
    RongIMLib.ChangeModeMessage = ChangeModeMessage;
    var CustomerStatusUpdateMessage = (function () {
        function CustomerStatusUpdateMessage(message) {
            this.messageName = "CustomerStatusUpdateMessage";
            this.serviceStatus = message.serviceStatus;
            this.sid = message.sid;
        }
        CustomerStatusUpdateMessage.obtain = function () {
            return null;
        };
        CustomerStatusUpdateMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CustomerStatusUpdateMessage;
    }());
    RongIMLib.CustomerStatusUpdateMessage = CustomerStatusUpdateMessage;
    var HandShakeMessage = (function () {
        function HandShakeMessage(message) {
            this.messageName = "HandShakeMessage";
            message && (this.groupid = message.groupid);
        }
        HandShakeMessage.obtain = function () {
            return null;
        };
        HandShakeMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return HandShakeMessage;
    }());
    RongIMLib.HandShakeMessage = HandShakeMessage;
    var CustomerContact = (function () {
        function CustomerContact(message) {
            this.messageName = "CustomerContact";
            this.page = message.page;
            this.nickName = message.nickName;
            this.routingInfo = message.routingInfo;
            this.info = message.info;
            this.requestInfo = message.requestInfo;
        }
        CustomerContact.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CustomerContact;
    }());
    RongIMLib.CustomerContact = CustomerContact;
    var EvaluateMessage = (function () {
        function EvaluateMessage(message) {
            this.messageName = "EvaluateMessage";
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
            this.source = message.source;
            this.suggest = message.suggest;
            this.isresolve = message.isresolve;
            this.type = message.type;
        }
        EvaluateMessage.obtain = function () {
            return null;
        };
        EvaluateMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return EvaluateMessage;
    }());
    RongIMLib.EvaluateMessage = EvaluateMessage;
    /**
     * å®¢æœæ¡æ‰‹å“åº”æ¶ˆæ¯çš„ç±»åž‹å
     */
    var HandShakeResponseMessage = (function () {
        function HandShakeResponseMessage(message) {
            this.messageName = "HandShakeResponseMessage";
            this.msg = message.msg;
            this.status = message.status;
            this.data = message.data;
        }
        HandShakeResponseMessage.obtain = function () {
            return null;
        };
        HandShakeResponseMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return HandShakeResponseMessage;
    }());
    RongIMLib.HandShakeResponseMessage = HandShakeResponseMessage;
    var SuspendMessage = (function () {
        function SuspendMessage(message) {
            this.messageName = "SuspendMessage";
            this.uid = message.uid;
            this.sid = message.sid;
            this.pid = message.pid;
        }
        SuspendMessage.obtain = function () {
            return null;
        };
        SuspendMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return SuspendMessage;
    }());
    RongIMLib.SuspendMessage = SuspendMessage;
    var TerminateMessage = (function () {
        function TerminateMessage(message) {
            this.messageName = "TerminateMessage";
            this.code = message.code;
            this.msg = message.msg;
            this.sid = message.sid;
        }
        TerminateMessage.obtain = function () {
            return null;
        };
        TerminateMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return TerminateMessage;
    }());
    RongIMLib.TerminateMessage = TerminateMessage;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var IsTypingStatusMessage = (function () {
        function IsTypingStatusMessage(data) {
            this.messageName = "IsTypingStatusMessage";
            var msg = data;
        }
        IsTypingStatusMessage.prototype.encode = function () {
            return undefined;
        };
        IsTypingStatusMessage.prototype.getMessage = function () {
            return null;
        };
        return IsTypingStatusMessage;
    }());
    RongIMLib.IsTypingStatusMessage = IsTypingStatusMessage;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var InformationNotificationMessage = (function () {
        function InformationNotificationMessage(message) {
            this.messageName = "InformationNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> InformationNotificationMessage.");
            }
            this.message = message.message;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
        }
        InformationNotificationMessage.obtain = function (message) {
            return new InformationNotificationMessage({ message: message, extra: "" });
        };
        InformationNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return InformationNotificationMessage;
    }());
    RongIMLib.InformationNotificationMessage = InformationNotificationMessage;
    var CommandMessage = (function () {
        function CommandMessage(message) {
            this.messageName = "CommandMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> CommandMessage.");
            }
            try {
                if (Object.prototype.toString.call(message.data) == "[object String]") {
                    this.data = JSON.parse(message.data);
                }
                else {
                    this.data = message.data;
                }
            }
            catch (e) {
                this.data = message.data;
            }
            this.name = message.name;
            this.extra = message.extra;
        }
        CommandMessage.obtain = function (data) {
            return new CommandMessage({ data: data, extra: "" });
        };
        CommandMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CommandMessage;
    }());
    RongIMLib.CommandMessage = CommandMessage;
    var ContactNotificationMessage = (function () {
        function ContactNotificationMessage(message) {
            this.messageName = "ContactNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ContactNotificationMessage.");
            }
            this.operation = message.operation;
            this.targetUserId = message.targetUserId;
            this.message = message.message;
            this.extra = message.extra;
            this.sourceUserId = message.sourceUserId;
            if (message.user) {
                this.user = message.user;
            }
        }
        ContactNotificationMessage.obtain = function (operation, sourceUserId, targetUserId, message) {
            return new InformationNotificationMessage({ operation: operation, sourceUserId: sourceUserId, targetUserId: targetUserId, message: message });
        };
        ContactNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        ContactNotificationMessage.CONTACT_OPERATION_ACCEPT_RESPONSE = "ContactOperationAcceptResponse";
        ContactNotificationMessage.CONTACT_OPERATION_REJECT_RESPONSE = "ContactOperationRejectResponse";
        ContactNotificationMessage.CONTACT_OPERATION_REQUEST = "ContactOperationRequest";
        return ContactNotificationMessage;
    }());
    RongIMLib.ContactNotificationMessage = ContactNotificationMessage;
    var ProfileNotificationMessage = (function () {
        function ProfileNotificationMessage(message) {
            this.messageName = "ProfileNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ProfileNotificationMessage.");
            }
            this.operation = message.operation;
            try {
                if (Object.prototype.toString.call(message.data) == "[object String]") {
                    this.data = JSON.parse(message.data);
                }
                else {
                    this.data = message.data;
                }
            }
            catch (e) {
                this.data = message.data;
            }
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
        }
        ProfileNotificationMessage.obtain = function (operation, data) {
            return new ProfileNotificationMessage({ operation: operation, data: data });
        };
        ProfileNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ProfileNotificationMessage;
    }());
    RongIMLib.ProfileNotificationMessage = ProfileNotificationMessage;
    var CommandNotificationMessage = (function () {
        function CommandNotificationMessage(message) {
            this.messageName = "CommandNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ProfileNotificationMessage.");
            }
            try {
                if (Object.prototype.toString.call(message.data) == "[object String]") {
                    this.data = JSON.parse(message.data);
                }
                else {
                    this.data = message.data;
                }
            }
            catch (e) {
                this.data = message.data;
            }
            this.name = message.name;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
        }
        CommandNotificationMessage.obtain = function (name, data) {
            return new CommandNotificationMessage({ name: name, data: data, extra: "" });
        };
        CommandNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return CommandNotificationMessage;
    }());
    RongIMLib.CommandNotificationMessage = CommandNotificationMessage;
    var DiscussionNotificationMessage = (function () {
        function DiscussionNotificationMessage(message) {
            this.messageName = "DiscussionNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> DiscussionNotificationMessage.");
            }
            this.extra = message.extra;
            this.extension = message.extension;
            this.type = message.type;
            this.isHasReceived = message.isHasReceived;
            this.operation = message.operation;
            this.user = message.user;
            if (message.user) {
                this.user = message.user;
            }
        }
        DiscussionNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return DiscussionNotificationMessage;
    }());
    RongIMLib.DiscussionNotificationMessage = DiscussionNotificationMessage;
    var GroupNotificationMessage = (function () {
        function GroupNotificationMessage(msg) {
            this.messageName = "GroupNotificationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> GroupNotificationMessage.");
            }
            msg.operatorUserId && (this.operatorUserId = msg.operatorUserId);
            msg.operation && (this.operation = msg.operation);
            msg.data && (this.data = msg.data);
            msg.message && (this.message = msg.message);
        }
        GroupNotificationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return GroupNotificationMessage;
    }());
    RongIMLib.GroupNotificationMessage = GroupNotificationMessage;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var TextMessage = (function () {
        function TextMessage(message) {
            this.messageName = "TextMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> TextMessage.");
            }
            this.content = message.content;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        TextMessage.obtain = function (text) {
            return new TextMessage({ extra: "", content: text });
        };
        TextMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return TextMessage;
    }());
    RongIMLib.TextMessage = TextMessage;
    var TypingStatusMessage = (function () {
        function TypingStatusMessage(message) {
            this.messageName = "TypingStatusMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> TypingStatusMessage.");
            }
            this.typingContentType = message.typingContentType;
            this.data = message.data;
        }
        TypingStatusMessage.obtain = function (typingContentType, data) {
            return new TypingStatusMessage({ typingContentType: typingContentType, data: data });
        };
        TypingStatusMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return TypingStatusMessage;
    }());
    RongIMLib.TypingStatusMessage = TypingStatusMessage;
    var ReadReceiptMessage = (function () {
        function ReadReceiptMessage(message) {
            this.messageName = "ReadReceiptMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ReadReceiptMessage.");
            }
            this.lastMessageSendTime = message.lastMessageSendTime;
            this.messageUId = message.messageUId;
            this.type = message.type;
        }
        ReadReceiptMessage.obtain = function (messageUId, lastMessageSendTime, type) {
            return new ReadReceiptMessage({ messageUId: messageUId, lastMessageSendTime: lastMessageSendTime, type: type });
        };
        ReadReceiptMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ReadReceiptMessage;
    }());
    RongIMLib.ReadReceiptMessage = ReadReceiptMessage;

    var VoiceMessage = (function () {
        function VoiceMessage(message) {
            this.messageName = "VoiceMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> VoiceMessage.");
            }
            this.content = message.content;
            this.duration = message.duration;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        VoiceMessage.obtain = function (base64Content, duration) {
            return new VoiceMessage({ content: base64Content, duration: duration, extra: "" });
        };
        VoiceMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return VoiceMessage;
    }());
    RongIMLib.VoiceMessage = VoiceMessage;
    var RecallCommandMessage = (function () {
        function RecallCommandMessage(message) {
            this.messageName = "RecallCommandMessage";
            this.messageUId = message.messageUId;
            this.conversationType = message.conversationType;
            this.targetId = message.targetId;
            this.sentTime = message.sentTime;
            message.extra && (this.extra = message.extra);
            message.user && (this.user = message.user);
        }
        RecallCommandMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return RecallCommandMessage;
    }());
    RongIMLib.RecallCommandMessage = RecallCommandMessage;
    var ImageMessage = (function () {
        function ImageMessage(message) {
            this.messageName = "ImageMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> ImageMessage.");
            }
            this.content = message.content;
            this.imageUri = message.imageUri;
            message.extra && (this.extra = message.extra);
            message.user && (this.user = message.user);
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        ImageMessage.obtain = function (content, imageUri) {
            return new ImageMessage({ content: content, imageUri: imageUri, extra: "" });
        };
        ImageMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ImageMessage;
    }());
    RongIMLib.ImageMessage = ImageMessage;
    var LocationMessage = (function () {
        function LocationMessage(message) {
            this.messageName = "LocationMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> LocationMessage.");
            }
            this.latitude = message.latitude;
            this.longitude = message.longitude;
            this.poi = message.poi;
            this.content = message.content;
            this.extra = message.extra;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        LocationMessage.obtain = function (latitude, longitude, poi, content) {
            return new LocationMessage({ latitude: latitude, longitude: longitude, poi: poi, content: content, extra: "" });
        };
        LocationMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return LocationMessage;
    }());
    RongIMLib.LocationMessage = LocationMessage;
    var RichContentMessage = (function () {
        function RichContentMessage(message) {
            this.messageName = "RichContentMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> RichContentMessage.");
            }
            this.title = message.title;
            this.content = message.content;
            this.imageUri = message.imageUri;
            this.extra = message.extra;
            this.url = message.url;
            if (message.user) {
                this.user = message.user;
            }
        }
        RichContentMessage.obtain = function (title, content, imageUri, url) {
            return new RichContentMessage({ title: title, content: content, imageUri: imageUri, url: url, extra: "" });
        };
        RichContentMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return RichContentMessage;
    }());
    RongIMLib.RichContentMessage = RichContentMessage;
    var JrmfReadPacketMessage = (function () {
        function JrmfReadPacketMessage(message) {
            this.messageName = 'JrmfReadPacketMessage';
            message && (this.message = message);
        }
        JrmfReadPacketMessage.prototype.encode = function () {
            return "";
        };
        return JrmfReadPacketMessage;
    }());
    RongIMLib.JrmfReadPacketMessage = JrmfReadPacketMessage;
    var JrmfReadPacketOpenedMessage = (function () {
        function JrmfReadPacketOpenedMessage(message) {
            this.messageName = 'JrmfReadPacketOpenedMessage';
            message && (this.message = message);
        }
        JrmfReadPacketOpenedMessage.prototype.encode = function () {
            return "";
        };
        return JrmfReadPacketOpenedMessage;
    }());
    RongIMLib.JrmfReadPacketOpenedMessage = JrmfReadPacketOpenedMessage;
    var UnknownMessage = (function () {
        function UnknownMessage(message) {
            this.messageName = "UnknownMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> UnknownMessage.");
            }
            this.message = message;
        }
        UnknownMessage.prototype.encode = function () {
            return "";
        };
        return UnknownMessage;
    }());
    RongIMLib.UnknownMessage = UnknownMessage;
    var PublicServiceCommandMessage = (function () {
        function PublicServiceCommandMessage(message) {
            this.messageName = "PublicServiceCommandMessage";
            if (arguments.length == 0) {
                throw new Error("Can not instantiate with empty parameters, use obtain method instead -> PublicServiceCommandMessage.");
            }
            this.content = message.content;
            this.extra = message.extra;
            this.menuItem = message.menuItem;
            if (message.user) {
                this.user = message.user;
            }
            if (message.mentionedInfo) {
                this.mentionedInfo = message.mentionedInfo;
            }
        }
        PublicServiceCommandMessage.obtain = function (item) {
            return new PublicServiceCommandMessage({ content: "", command: "", menuItem: item, extra: "" });
        };
        PublicServiceCommandMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return PublicServiceCommandMessage;
    }());
    RongIMLib.PublicServiceCommandMessage = PublicServiceCommandMessage;
    var PublicServiceMultiRichContentMessage = (function () {
        function PublicServiceMultiRichContentMessage(messages) {
            this.messageName = "PublicServiceMultiRichContentMessage";
            this.richContentMessages = messages;
        }
        PublicServiceMultiRichContentMessage.prototype.encode = function () {
            return null;
        };
        return PublicServiceMultiRichContentMessage;
    }());
    RongIMLib.PublicServiceMultiRichContentMessage = PublicServiceMultiRichContentMessage;
    var SyncReadStatusMessage = (function () {
        function SyncReadStatusMessage(message) {
            this.messageName = "SyncReadStatusMessage";
            message.lastMessageSendTime && (this.lastMessageSendTime = message.lastMessageSendTime);
        }
        SyncReadStatusMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return SyncReadStatusMessage;
    }());
    RongIMLib.SyncReadStatusMessage = SyncReadStatusMessage;
    var ReadReceiptRequestMessage = (function () {
        function ReadReceiptRequestMessage(message) {
            this.messageName = "ReadReceiptRequestMessage";
            message.messageUId && (this.messageUId = message.messageUId);
        }
        ReadReceiptRequestMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ReadReceiptRequestMessage;
    }());
    RongIMLib.ReadReceiptRequestMessage = ReadReceiptRequestMessage;
    var ReadReceiptResponseMessage = (function () {
        function ReadReceiptResponseMessage(message) {
            this.messageName = "ReadReceiptResponseMessage";
            message.receiptMessageDic && (this.receiptMessageDic = message.receiptMessageDic);
        }
        ReadReceiptResponseMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return ReadReceiptResponseMessage;
    }());
    RongIMLib.ReadReceiptResponseMessage = ReadReceiptResponseMessage;
    var PublicServiceRichContentMessage = (function () {
        function PublicServiceRichContentMessage(message) {
            this.messageName = "PublicServiceRichContentMessage";
            this.richContentMessage = message;
        }
        PublicServiceRichContentMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return PublicServiceRichContentMessage;
    }());
    RongIMLib.PublicServiceRichContentMessage = PublicServiceRichContentMessage;
    var FileMessage = (function () {
        function FileMessage(message) {
            this.messageName = "FileMessage";
            message.name && (this.name = message.name);
            message.size && (this.size = message.size);
            message.type && (this.type = message.type);
            message.fileUrl && (this.fileUrl = message.fileUrl);
            message.extra && (this.extra = message.extra);
            message.user && (this.user = message.user);
        }
        FileMessage.obtain = function (msg) {
            return new FileMessage({ name: msg.name, size: msg.size, type: msg.type, fileUrl: msg.fileUrl });
        };
        FileMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return FileMessage;
    }());
    RongIMLib.FileMessage = FileMessage;
    var ChannelInfo = (function () {
        function ChannelInfo(Id, Key) {
            this.Id = Id;
            this.Key = Key;
        }
        return ChannelInfo;
    }());
    RongIMLib.ChannelInfo = ChannelInfo;
    var AcceptMessage = (function () {
        function AcceptMessage(message) {
            this.messageName = "AcceptMessage";
            this.callId = message.callId;
            this.mediaType = message.mediaType;
        }
        AcceptMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return AcceptMessage;
    }());
    RongIMLib.AcceptMessage = AcceptMessage;
    var RingingMessage = (function () {
        function RingingMessage(message) {
            this.messageName = "RingingMessage";
            this.callId = message.callId;
        }
        RingingMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return RingingMessage;
    }());
    RongIMLib.RingingMessage = RingingMessage;
    var SummaryMessage = (function () {
        function SummaryMessage(message) {
            this.messageName = "SummaryMessage";
            this.caller = message.caller;
            this.inviter = message.inviter;
            this.mediaType = message.mediaType;
            this.memberIdList = message.memberIdList;
            this.startTime = message.startTime;
            this.connectedTime = message.connectedTime;
            this.duration = message.duration;
            this.status = message.status;
        }
        SummaryMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return SummaryMessage;
    }());
    RongIMLib.SummaryMessage = SummaryMessage;
    var HungupMessage = (function () {
        function HungupMessage(message) {
            this.messageName = "HungupMessage";
            this.callId = message.callId;
            this.reason = message.reason;
        }
        HungupMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return HungupMessage;
    }());
    RongIMLib.HungupMessage = HungupMessage;
    var InviteMessage = (function () {
        function InviteMessage(message) {
            this.messageName = "InviteMessage";
            this.callId = message.callId;
            this.engineType = message.engineType;
            this.channelInfo = message.channelInfo;
            this.mediaType = message.mediaType;
            this.extra = message.extra;
            this.inviteUserIds = message.inviteUserIds;
        }
        InviteMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return InviteMessage;
    }());
    RongIMLib.InviteMessage = InviteMessage;
    var MediaModifyMessage = (function () {
        function MediaModifyMessage(message) {
            this.messageName = "MediaModifyMessage";
            this.callId = message.callId;
            this.mediaType = message.mediaType;
        }
        MediaModifyMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return MediaModifyMessage;
    }());
    RongIMLib.MediaModifyMessage = MediaModifyMessage;
    var MemberModifyMessage = (function () {
        function MemberModifyMessage(message) {
            this.messageName = "MemberModifyMessage";
            this.modifyMemType = message.modifyMemType;
            this.callId = message.callId;
            this.caller = message.caller;
            this.engineType = message.engineType;
            this.channelInfo = message.channelInfo;
            this.mediaType = message.mediaType;
            this.extra = message.extra;
            this.inviteUserIds = message.inviteUserIds;
            this.existedMemberStatusList = message.existedMemberStatusList;
        }
        MemberModifyMessage.prototype.encode = function () {
            return JSON.stringify(RongIMLib.ModelUtil.modelClone(this));
        };
        return MemberModifyMessage;
    }());
    RongIMLib.MemberModifyMessage = MemberModifyMessage;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var UserStatus = (function () {
        function UserStatus(platform, online, status) {
            this.platform = platform;
            this.online = online;
            this.status = status;
        }
        return UserStatus;
    }());
    RongIMLib.UserStatus = UserStatus;
    var MentionedInfo = (function () {
        function MentionedInfo(type, userIdList, mentionedContent) {
        }
        return MentionedInfo;
    }());
    RongIMLib.MentionedInfo = MentionedInfo;
    var DeleteMessage = (function () {
        function DeleteMessage(msgId, msgDataTime, direct) {
            this.msgId = msgId;
            this.msgDataTime = msgDataTime;
            this.direct = direct;
        }
        return DeleteMessage;
    }());
    RongIMLib.DeleteMessage = DeleteMessage;
    var CustomServiceConfig = (function () {
        function CustomServiceConfig(isBlack, companyName, companyUrl) {
        }
        return CustomServiceConfig;
    }());
    RongIMLib.CustomServiceConfig = CustomServiceConfig;
    var CustomServiceSession = (function () {
        function CustomServiceSession(uid, cid, pid, isQuited, type, adminHelloWord, adminOfflineWord) {
        }
        return CustomServiceSession;
    }());
    RongIMLib.CustomServiceSession = CustomServiceSession;
    var Conversation = (function () {
        function Conversation(conversationTitle, conversationType, draft, isTop, latestMessage, latestMessageId, notificationStatus, objectName, receivedStatus, receivedTime, senderUserId, senderUserName, sentStatus, sentTime, targetId, unreadMessageCount, senderPortraitUri, isHidden, mentionedMsg, hasUnreadMention) {
            this.conversationTitle = conversationTitle;
            this.conversationType = conversationType;
            this.draft = draft;
            this.isTop = isTop;
            this.latestMessage = latestMessage;
            this.latestMessageId = latestMessageId;
            this.notificationStatus = notificationStatus;
            this.objectName = objectName;
            this.receivedStatus = receivedStatus;
            this.receivedTime = receivedTime;
            this.senderUserId = senderUserId;
            this.senderUserName = senderUserName;
            this.sentStatus = sentStatus;
            this.sentTime = sentTime;
            this.targetId = targetId;
            this.unreadMessageCount = unreadMessageCount;
            this.senderPortraitUri = senderPortraitUri;
            this.isHidden = isHidden;
            this.mentionedMsg = mentionedMsg;
            this.hasUnreadMention = hasUnreadMention;
        }
        Conversation.prototype.setTop = function () {
            RongIMLib.RongIMClient._dataAccessProvider.addConversation(this, { onSuccess: function (data) { } });
        };
        return Conversation;
    }());
    RongIMLib.Conversation = Conversation;
    var Discussion = (function () {
        function Discussion(creatorId, id, memberIdList, name, isOpen) {
            this.creatorId = creatorId;
            this.id = id;
            this.memberIdList = memberIdList;
            this.name = name;
            this.isOpen = isOpen;
        }
        return Discussion;
    }());
    RongIMLib.Discussion = Discussion;
    var Group = (function () {
        function Group(id, name, portraitUri) {
            this.id = id;
            this.name = name;
            this.portraitUri = portraitUri;
        }
        return Group;
    }());
    RongIMLib.Group = Group;
    var Message = (function () {
        function Message(content, conversationType, extra, objectName, messageDirection, messageId, receivedStatus, receivedTime, senderUserId, sentStatus, sentTime, targetId, messageType, messageUId, isLocalMessage, offLineMessage, receiptResponse) {
            this.content = content;
            this.conversationType = conversationType;
            this.extra = extra;
            this.objectName = objectName;
            this.messageDirection = messageDirection;
            this.messageId = messageId;
            this.receivedStatus = receivedStatus;
            this.receivedTime = receivedTime;
            this.senderUserId = senderUserId;
            this.sentStatus = sentStatus;
            this.sentTime = sentTime;
            this.targetId = targetId;
            this.messageType = messageType;
            this.messageUId = messageUId;
            this.isLocalMessage = isLocalMessage;
            this.offLineMessage = offLineMessage;
            this.receiptResponse = receiptResponse;
        }
        return Message;
    }());
    RongIMLib.Message = Message;
    var MessageTag = (function () {
        function MessageTag(isCounted, isPersited) {
            this.isCounted = isCounted;
            this.isPersited = isPersited;
        }
        MessageTag.prototype.getMessageTag = function () {
            if (this.isCounted && this.isPersited) {
                return 3;
            }
            else if (this.isCounted || !this.isPersited) {
                return 2;
            }
            else if (!this.isCounted || this.isPersited) {
                return 1;
            }
            else if (!this.isCounted && !this.isPersited) {
                return 0;
            }
        };
        return MessageTag;
    }());
    RongIMLib.MessageTag = MessageTag;
    var PublicServiceMenuItem = (function () {
        function PublicServiceMenuItem(id, name, type, sunMenuItems, url) {
            this.id = id;
            this.name = name;
            this.type = type;
            this.sunMenuItems = sunMenuItems;
            this.url = url;
        }
        return PublicServiceMenuItem;
    }());
    RongIMLib.PublicServiceMenuItem = PublicServiceMenuItem;
    // TODO: TBD
    var PublicServiceProfile = (function () {
        function PublicServiceProfile(conversationType, introduction, menu, name, portraitUri, publicServiceId, hasFollowed, isGlobal) {
            this.conversationType = conversationType;
            this.introduction = introduction;
            this.menu = menu;
            this.name = name;
            this.portraitUri = portraitUri;
            this.publicServiceId = publicServiceId;
            this.hasFollowed = hasFollowed;
            this.isGlobal = isGlobal;
        }
        return PublicServiceProfile;
    }());
    RongIMLib.PublicServiceProfile = PublicServiceProfile;
    var UserInfo = (function () {
        function UserInfo(id, name, portraitUri) {
            this.id = id;
            this.name = name;
            this.portraitUri = portraitUri;
        }
        return UserInfo;
    }());
    RongIMLib.UserInfo = UserInfo;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var ServerDataProvider = (function () {
        function ServerDataProvider() {
            this.database = new RongIMLib.DBUtil();
        }
        ServerDataProvider.prototype.init = function (appKey) {
            new RongIMLib.FeatureDectector();
        };
        ServerDataProvider.prototype.connect = function (token, callback) {
            RongIMLib.RongIMClient.bridge = RongIMLib.Bridge.getInstance();
            RongIMLib.RongIMClient._memoryStore.token = token;
            RongIMLib.RongIMClient._memoryStore.callback = callback;
            if (RongIMLib.Bridge._client && RongIMLib.Bridge._client.channel && RongIMLib.Bridge._client.channel.connectionStatus == RongIMLib.ConnectionStatus.CONNECTED && RongIMLib.Bridge._client.channel.connectionStatus == RongIMLib.ConnectionStatus.CONNECTING) {
                return;
            }
            //å¾ªçŽ¯è®¾ç½®ç›‘å¬äº‹ä»¶ï¼Œè¿½åŠ ä¹‹åŽæ¸…ç©ºå­˜æ”¾äº‹ä»¶æ•°æ®
            for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.listenerList.length; i < len; i++) {
                RongIMLib.RongIMClient.bridge["setListener"](RongIMLib.RongIMClient._memoryStore.listenerList[i]);
            }
            RongIMLib.RongIMClient._memoryStore.listenerList.length = 0;
            RongIMLib.RongIMClient.bridge.connect(RongIMLib.RongIMClient._memoryStore.appKey, token, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (e) {
                    if (e == RongIMLib.ConnectionState.TOKEN_INCORRECT || !e) {
                        setTimeout(function () {
                            callback.onTokenIncorrect();
                        });
                    }
                    else {
                        setTimeout(function () {
                            callback.onError(e);
                        });
                    }
                }
            });
        };
        ServerDataProvider.prototype.reconnect = function (callback) {
            if (RongIMLib.Bridge._client && RongIMLib.Bridge._client.channel && RongIMLib.Bridge._client.channel.connectionStatus != RongIMLib.ConnectionStatus.CONNECTED && RongIMLib.Bridge._client.channel.connectionStatus != RongIMLib.ConnectionStatus.CONNECTING) {
                RongIMLib.RongIMClient.bridge.reconnect(callback);
            }
        };
        ServerDataProvider.prototype.logout = function () {
            RongIMLib.RongIMClient.bridge.disconnect();
            RongIMLib.RongIMClient.bridge = null;
        };
        ServerDataProvider.prototype.disconnect = function () {
            RongIMLib.RongIMClient.bridge.disconnect();
        };
        ServerDataProvider.prototype.sendReceiptResponse = function (conversationType, targetId, content, sendCallback) {
            var rspkey = RongIMLib.Bridge._client.userId + conversationType + targetId + 'RECEIVED', me = this;
            if (RongIMLib.MessageUtil.supportLargeStorage()) {
                var valObj = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(rspkey));
                if (valObj) {
                    var vals = [];
                    for (var key in valObj) {
                        var tmp = {};
                        tmp[key] = valObj[key].uIds;
                        valObj[key].isResponse || vals.push(tmp);
                    }
                    if (vals.length == 0) {
                        sendCallback.onSuccess();
                        return;
                    }
                    var interval = setInterval(function () {
                        if (vals.length == 1) {
                            clearInterval(interval);
                        }
                        var obj = vals.splice(0, 1)[0];
                        var rspMsg = new RongIMLib.ReadReceiptResponseMessage({ receiptMessageDic: obj });
                        me.sendMessage(conversationType, targetId, rspMsg, {
                            onSuccess: function (msg) {
                                var senderUserId = RongIMLib.MessageUtil.getFirstKey(obj);
                                valObj[senderUserId].isResponse = true;
                                RongIMLib.RongIMClient._storageProvider.setItem(rspkey, JSON.stringify(valObj));
                                sendCallback.onSuccess(msg);
                            },
                            onError: function (error, msg) {
                                sendCallback.onError(error, msg);
                            }
                        });
                    }, 200);
                }
                else {
                    sendCallback.onSuccess();
                }
            }
            else {
                sendCallback.onSuccess();
            }
        };
        ServerDataProvider.prototype.sendTypingStatusMessage = function (conversationType, targetId, messageName, sendCallback) {
            var me = this;
            if (messageName in RongIMLib.RongIMClient.MessageParams) {
                me.sendMessage(conversationType, targetId, RongIMLib.TypingStatusMessage.obtain(RongIMLib.RongIMClient.MessageParams[messageName].objectName, ""), {
                    onSuccess: function () {
                        setTimeout(function () {
                            sendCallback.onSuccess();
                        });
                    },
                    onError: function (errorCode) {
                        setTimeout(function () {
                            sendCallback.onError(errorCode, null);
                        });
                    }
                });
            }
        };
        ServerDataProvider.prototype.sendRecallMessage = function (content, sendMessageCallback) {
            var msg = new RongIMLib.RecallCommandMessage({ conversationType: content.conversationType, targetId: content.targetId, sentTime: content.sentTime, messageUId: content.messageUId, extra: content.extra, user: content.user });
            this.sendMessage(content.conversationType, content.senderUserId, msg, sendMessageCallback, false, null, null, 2);
        };
        ServerDataProvider.prototype.sendTextMessage = function (conversationType, targetId, content, sendMessageCallback) {
            var msgContent = RongIMLib.TextMessage.obtain(content);
            this.sendMessage(conversationType, targetId, msgContent, sendMessageCallback);
        };
        ServerDataProvider.prototype.setMessageContent = function(messageId, content, objectName){

        };
        ServerDataProvider.prototype.getRemoteHistoryMessages = function (conversationType, targetId, timestamp, count, callback, objectName) {
            if (count <= 1) {
                throw new Error("the count must be greater than 1.");
            }
            var modules = new Modules.HistoryMessageInput(), self = this;
            modules.setTargetId(targetId);
            if (timestamp === 0 || timestamp > 0) {
                modules.setDataTime(timestamp);
            }
            else {
                modules.setDataTime(RongIMLib.RongIMClient._memoryStore.lastReadTime.get(conversationType + targetId));
            }
            modules.setSize(count);
            RongIMLib.RongIMClient.bridge.queryMsg(HistoryMsgType[conversationType], RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), targetId, {
                onSuccess: function (data) {
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.set(conversationType + targetId, RongIMLib.MessageUtil.int64ToTimestamp(data.syncTime));
                    var list = data.list.reverse(), tempMsg = null, tempDir;
                    if (RongIMLib.MessageUtil.supportLargeStorage()) {
                        for (var i = 0, len = list.length; i < len; i++) {
                            tempMsg = RongIMLib.MessageUtil.messageParser(list[i]);
                            tempDir = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.Bridge._client.userId + tempMsg.messageUId + "SENT"));
                            if (tempDir) {
                                tempMsg.receiptResponse || (tempMsg.receiptResponse = {});
                                tempMsg.receiptResponse[tempMsg.messageUId] = tempDir.count;
                            }
                            list[i] = tempMsg;
                        }
                    }
                    else {
                        for (var i = 0, len = list.length; i < len; i++) {
                            list[i] = RongIMLib.MessageUtil.messageParser(list[i]);
                        }
                    }
                    setTimeout(function () {
                        callback.onSuccess(list, !!data.hasMsg);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        if (error === RongIMLib.ErrorCode.TIMEOUT) {
                            callback.onError(error);
                        }
                        else {
                            callback.onSuccess([], false);
                        }
                    });
                }
            }, "HistoryMessagesOuput");
        };
        ServerDataProvider.prototype.hasRemoteUnreadMessages = function (token, callback) {
            var xss = null;
            window.RCCallback = function (x) {
                setTimeout(function () { callback.onSuccess(!!+x.status); });
                xss.parentNode.removeChild(xss);
            };
            xss = document.createElement("script");
            xss.src = RongIMLib.RongIMClient._memoryStore.depend.api + "/message/exist.js?appKey=" + encodeURIComponent(RongIMLib.RongIMClient._memoryStore.appKey) + "&token=" + encodeURIComponent(token) + "&callBack=RCCallback&_=" + Date.now();
            document.body.appendChild(xss);
            xss.onerror = function () {
                setTimeout(function () { callback.onError(RongIMLib.ErrorCode.UNKNOWN); });
                xss.parentNode.removeChild(xss);
            };
        };
        ServerDataProvider.prototype.setMessageStatus = function(conversationType, targetId, timestamp, status, callback){
            callback.onSuccess();
        };
        ServerDataProvider.prototype.getRemoteConversationList = function (callback, conversationTypes, count) {
            var modules = new Modules.RelationsInput(), self = this;
            modules.setType(1);
            if (typeof count == 'undefined') {
                modules.setCount(0);
            }
            else {
                modules.setCount(count);
            }
            RongIMLib.RongIMClient.bridge.queryMsg(26, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (list) {
                    if (list.info) {
                        list.info = list.info.reverse();
                        for (var i = 0, len = list.info.length; i < len; i++) {
                            RongIMLib.RongIMClient.getInstance().pottingConversation(list.info[i]);
                        }
                    }
                    if (conversationTypes) {
                        var convers = [];
                        Array.forEach(conversationTypes, function (converType) {
                            Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (item) {
                                if (item.conversationType == converType) {
                                    convers.push(item);
                                }
                            });
                        });
                        callback.onSuccess(convers);
                    }
                    else {
                        callback.onSuccess(RongIMLib.RongIMClient._memoryStore.conversationList);
                    }
                },
                onError: function (error) {
                    if (error === RongIMLib.ErrorCode.TIMEOUT) {
                        callback.onError(error);
                    }
                    else {
                        callback.onSuccess([]);
                    }
                }
            }, "RelationsOutput");
        };
        ServerDataProvider.prototype.addMemberToDiscussion = function (discussionId, userIdList, callback) {
            var modules = new Modules.ChannelInvitationInput();
            modules.setUsers(userIdList);
            RongIMLib.RongIMClient.bridge.queryMsg(0, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.JOIN_IN_DISCUSSION);
                    });
                }
            });
        };
        ServerDataProvider.prototype.createDiscussion = function (name, userIdList, callback) {
            var modules = new Modules.CreateDiscussionInput(), self = this;
            modules.setName(name);
            RongIMLib.RongIMClient.bridge.queryMsg(1, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (discussId) {
                    if (userIdList.length > 0) {
                        self.addMemberToDiscussion(discussId, userIdList, {
                            onSuccess: function () { },
                            onError: function (error) {
                                setTimeout(function () {
                                    callback.onError(error);
                                });
                            }
                        });
                    }
                    setTimeout(function () {
                        callback.onSuccess(discussId);
                    });
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.CREATE_DISCUSSION);
                    });
                }
            }, "CreateDiscussionOutput");
        };
        ServerDataProvider.prototype.getDiscussion = function (discussionId, callback) {
            var modules = new Modules.ChannelInfoInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(4, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            }, "ChannelInfoOutput");
        };
        ServerDataProvider.prototype.quitDiscussion = function (discussionId, callback) {
            var modules = new Modules.LeaveChannelInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(7, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, callback);
        };
        ServerDataProvider.prototype.removeMemberFromDiscussion = function (discussionId, userId, callback) {
            var modules = new Modules.ChannelEvictionInput();
            modules.setUser(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(9, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, callback);
        };
        ServerDataProvider.prototype.setDiscussionInviteStatus = function (discussionId, status, callback) {
            var modules = new Modules.ModifyPermissionInput();
            modules.setOpenStatus(status.valueOf());
            RongIMLib.RongIMClient.bridge.queryMsg(11, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function (x) {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                }, onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.INVITE_DICUSSION);
                    });
                }
            });
        };
        ServerDataProvider.prototype.setDiscussionName = function (discussionId, name, callback) {
            var modules = new Modules.RenameChannelInput();
            modules.setName(name);
            RongIMLib.RongIMClient.bridge.queryMsg(12, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            });
        };
        ServerDataProvider.prototype.joinGroup = function (groupId, groupName, callback) {
            var modules = new Modules.GroupInfo();
            modules.setId(groupId);
            modules.setName(groupName);
            var _mod = new Modules.GroupInput();
            _mod.setGroupInfo([modules]);
            RongIMLib.RongIMClient.bridge.queryMsg(6, RongIMLib.MessageUtil.ArrayForm(_mod.toArrayBuffer()), groupId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "GroupOutput");
        };
        ServerDataProvider.prototype.quitGroup = function (groupId, callback) {
            var modules = new Modules.LeaveChannelInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(8, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), groupId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            });
        };
        ServerDataProvider.prototype.syncGroup = function (groups, callback) {
            //åŽ»é‡æ“ä½œ
            for (var i = 0, part = [], info = [], len = groups.length; i < len; i++) {
                if (part.length === 0 || !(groups[i].id in part)) {
                    part.push(groups[i].id);
                    var groupinfo = new Modules.GroupInfo();
                    groupinfo.setId(groups[i].id);
                    groupinfo.setName(groups[i].name);
                    info.push(groupinfo);
                }
            }
            var modules = new Modules.GroupHashInput();
            modules.setUserId(RongIMLib.Bridge._client.userId);
            modules.setGroupHashCode(md5(part.sort().join("")));
            RongIMLib.RongIMClient.bridge.queryMsg(13, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (result) {
                    //1ä¸ºç¾¤ä¿¡æ¯ä¸åŒ¹é…éœ€è¦å‘é€ç»™æœåŠ¡å™¨è¿›è¡ŒåŒæ­¥ï¼Œ0ä¸éœ€è¦åŒæ­¥
                    if (result === 1) {
                        var val = new Modules.GroupInput();
                        val.setGroupInfo(info);
                        RongIMLib.RongIMClient.bridge.queryMsg(20, RongIMLib.MessageUtil.ArrayForm(val.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                            onSuccess: function () {
                                setTimeout(function () {
                                    callback.onSuccess();
                                });
                            },
                            onError: function () {
                                setTimeout(function () {
                                    callback.onError(RongIMLib.ErrorCode.GROUP_MATCH_ERROR);
                                });
                            }
                        }, "GroupOutput");
                    }
                    else {
                        setTimeout(function () {
                            callback.onSuccess();
                        });
                    }
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.GROUP_SYNC_ERROR);
                    });
                }
            }, "GroupHashOutput");
        };
        ServerDataProvider.prototype.joinChatRoom = function (chatroomId, messageCount, callback) {
            var e = new Modules.ChrmInput();
            e.setNothing(1);
            RongIMLib.Bridge._client.chatroomId = chatroomId;
            RongIMLib.RongIMClient.bridge.queryMsg(19, RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()), chatroomId, {
                onSuccess: function () {
                    callback.onSuccess();
                    var modules = new Modules.ChrmPullMsg();
                    messageCount == 0 && (messageCount = -1);
                    modules.setCount(messageCount);
                    modules.setSyncTime(0);
                    RongIMLib.Bridge._client.queryMessage("chrmPull", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), chatroomId, 1, {
                        onSuccess: function (collection) {
                            var sync = RongIMLib.MessageUtil.int64ToTimestamp(collection.syncTime);
                            RongIMLib.RongIMClient._memoryStore.lastReadTime.set(chatroomId + RongIMLib.Bridge._client.userId + "CST", sync);
                            var list = collection.list;
                            if (RongIMLib.RongIMClient._memoryStore.filterMessages.length > 0) {
                                for (var i = 0, mlen = list.length; i < mlen; i++) {
                                    for (var j = 0, flen = RongIMLib.RongIMClient._memoryStore.filterMessages.length; j < flen; j++) {
                                        if (RongIMLib.RongIMClient.MessageParams[RongIMLib.RongIMClient._memoryStore.filterMessages[j]].objectName != list[i].classname) {
                                            RongIMLib.Bridge._client.handler.onReceived(list[i]);
                                        }
                                    }
                                }
                            }
                            else {
                                for (var i = 0, len = list.length; i < len; i++) {
                                    RongIMLib.Bridge._client.handler.onReceived(list[i]);
                                }
                            }
                        },
                        onError: function (x) {
                            setTimeout(function () {
                                callback.onError(RongIMLib.ErrorCode.CHATROOM_HISMESSAGE_ERROR);
                            });
                        }
                    }, "DownStreamMessages");
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.CHARTOOM_JOIN_ERROR);
                    });
                }
            }, "ChrmOutput");
        };
        ServerDataProvider.prototype.getChatRoomInfo = function (chatRoomId, count, order, callback) {
            var modules = new Modules.QueryChatroomInfoInput();
            modules.setCount(count);
            modules.setOrder(order);
            RongIMLib.RongIMClient.bridge.queryMsg("queryChrmI", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), chatRoomId, {
                onSuccess: function (list) {
                    setTimeout(function () {
                        callback.onSuccess(list);
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "QueryChatroomInfoOutput");
        };
        ServerDataProvider.prototype.quitChatRoom = function (chatroomId, callback) {
            var e = new Modules.ChrmInput();
            e.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(17, RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()), chatroomId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "ChrmOutput");
        };
        ServerDataProvider.prototype.setChatroomHisMessageTimestamp = function (chatRoomId, timestamp) {
            RongIMLib.RongIMClient._memoryStore.lastReadTime.set('chrhis_' + chatRoomId, timestamp);
        };
        ServerDataProvider.prototype.getChatRoomHistoryMessages = function (chatRoomId, count, order, callback) {
            var modules = new Modules.HistoryMsgInput();
            modules.setTargetId(chatRoomId);
            var timestamp = RongIMLib.RongIMClient._memoryStore.lastReadTime.get('chrhis_' + chatRoomId) || 0;
            modules.setTime(timestamp);
            modules.setCount(count);
            modules.setOrder(order);
            RongIMLib.RongIMClient.bridge.queryMsg(34, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (data) {
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.set('chrhis_' + chatRoomId, RongIMLib.MessageUtil.int64ToTimestamp(data.syncTime));
                    var list = data.list.reverse();
                    for (var i = 0, len = list.length; i < len; i++) {
                        list[i] = RongIMLib.MessageUtil.messageParser(list[i]);
                    }
                    setTimeout(function () {
                        callback.onSuccess(list, !!data.hasMsg);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        if (error === RongIMLib.ErrorCode.TIMEOUT) {
                            callback.onError(error);
                        }
                        else {
                            callback.onSuccess([], false);
                        }
                    });
                }
            }, "HistoryMsgOuput");
        };
        ServerDataProvider.prototype.addToBlacklist = function (userId, callback) {
            var modules = new Modules.Add2BlackListInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(21, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function () {
                    callback.onSuccess();
                },
                onError: function () {
                    callback.onError(RongIMLib.ErrorCode.BLACK_ADD_ERROR);
                }
            });
        };
        ServerDataProvider.prototype.getBlacklist = function (callback) {
            var modules = new Modules.QueryBlackListInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(23, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, callback, "QueryBlackListOutput");
        };
        ServerDataProvider.prototype.getBlacklistStatus = function (userId, callback) {
            var modules = new Modules.BlackListStatusInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(24, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (status) {
                    setTimeout(function () {
                        callback.onSuccess(RongIMLib.BlacklistStatus[status]);
                    });
                }, onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.BLACK_GETSTATUS_ERROR);
                    });
                }
            });
        };
        ServerDataProvider.prototype.removeFromBlacklist = function (userId, callback) {
            var modules = new Modules.RemoveFromBlackListInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(22, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function () {
                    callback.onSuccess();
                },
                onError: function () {
                    callback.onError(RongIMLib.ErrorCode.BLACK_REMOVE_ERROR);
                }
            });
        };
        ServerDataProvider.prototype.getFileToken = function (fileType, callback) {
            if (!(/(1|2|3|4)/.test(fileType.toString()))) {
                callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);
                return;
            }
            var modules = new Modules.GetQNupTokenInput();
            modules.setType(fileType);
            RongIMLib.RongIMClient.bridge.queryMsg(30, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "GetQNupTokenOutput");
        };
        ServerDataProvider.prototype.getFileUrl = function (fileType, fileName, oriName, callback) {
            if (!(/(1|2|3|4)/.test(fileType.toString()))) {
                setTimeout(function () {
                    callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);
                });
                return;
            }
            var modules = new Modules.GetQNdownloadUrlInput();
            modules.setType(fileType);
            modules.setKey(fileName);
            if (oriName) {
                modules.setFileName(oriName);
            }
            RongIMLib.RongIMClient.bridge.queryMsg(31, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "GetQNdownloadUrlOutput");
        };
        // methodType 1 : å¤šå®¢æœ(å®¢æœåŽå°ä½¿ç”¨);   2 : æ¶ˆæ¯æ’¤å›ž 
        ServerDataProvider.prototype.sendMessage = function (conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData, methodType) {
            if (!RongIMLib.Bridge._client.channel) {
                sendCallback.onError(RongIMLib.ErrorCode.RC_NET_UNAVAILABLE, null);
                return;
            }
            
            var modules = new Modules.UpStreamMessage();
            if (mentiondMsg && (conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP)) {
                modules.setSessionId(7);
            }
            else {
                modules.setSessionId(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag());
            }
            pushText && modules.setPushText(pushText);
            appData && modules.setAppData(appData);
            if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]) {
                var rspMsg = messageContent;
                if (rspMsg.receiptMessageDic) {
                    var ids = [];
                    for (var key in rspMsg.receiptMessageDic) {
                        ids.push(key);
                    }
                    modules.setUserId(ids);
                }
            }
            if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["SyncReadStatusMessage"]) {
                modules.setUserId(RongIMLib.Bridge._client.userId);
            }
            modules.setClassname(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName);
            modules.setContent(messageContent.encode());
            var content = modules.toArrayBuffer();
            if (Object.prototype.toString.call(content) == "[object ArrayBuffer]") {
                content = [].slice.call(new Int8Array(content));
            }
            var c = null, me = this, msg = new RongIMLib.Message();
            this.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    c = conver;
                    if (RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag() == 3) {
                        if (!c) {
                            c = RongIMLib.RongIMClient.getInstance().createConversation(conversationType, targetId, "");
                        }
                        c.sentTime = new Date().getTime();
                        c.sentStatus = RongIMLib.SentStatus.SENDING;
                        c.senderUserName = "";
                        c.senderUserId = RongIMLib.Bridge._client.userId;
                        c.notificationStatus = RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;
                        c.latestMessage = msg;
                        c.unreadMessageCount = 0;
                        RongIMLib.RongIMClient._dataAccessProvider.addConversation(c, { onSuccess: function (data) { } });
                    }
                    RongIMLib.RongIMClient._memoryStore.converStore = c;
                }
            });
            msg.content = messageContent;
            msg.conversationType = conversationType;
            msg.senderUserId = RongIMLib.Bridge._client.userId;
            msg.objectName = RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName;
            msg.targetId = targetId;
            msg.sentTime = new Date().getTime();
            msg.messageDirection = RongIMLib.MessageDirection.SEND;
            msg.sentStatus = RongIMLib.SentStatus.SENT;
            msg.messageType = messageContent.messageName;
			if (!RongIMLib.Bridge._client.channel.socket.socket.connected) {
				msg.sentStatus = RongIMLib.SentStatus.FAILED;
                sendCallback.onError(RongIMLib.ErrorCode.TIMEOUT, msg);
                return;
            }
            RongIMLib.RongIMClient.bridge.pubMsg(conversationType.valueOf(), content, targetId, {
                onSuccess: function (data) {
                    if (data && data.timestamp) {
                        RongIMLib.RongIMClient._memoryStore.lastReadTime.set('converST_' + RongIMLib.Bridge._client.userId + conversationType + targetId, data.timestamp);
                    }
                    if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"]) {
                        var reqMsg = msg.content;
                        var sentkey = RongIMLib.Bridge._client.userId + reqMsg.messageUId + "SENT";
                        RongIMLib.RongIMClient._storageProvider.setItem(sentkey, JSON.stringify({ count: 0, dealtime: data.timestamp, userIds: {} }));
                    }
                    if (RongIMLib.RongIMClient.MessageParams[msg.messageType].msgTag.getMessageTag() == 3) {
                        RongIMLib.RongIMClient._memoryStore.converStore.latestMessage = msg;
                        RongIMLib.RongIMClient._dataAccessProvider.addMessage(conversationType, targetId, msg, {
                            onSuccess: function (ret) {
                                msg = ret;
                                msg.messageUId = data.messageUId;
                                msg.sentTime = data.timestamp;
                                msg.sentStatus = RongIMLib.SentStatus.SENT;
                                msg.messageId = data.messageId;
                                console.log('SUCCESS ', msg.messageId);
                                RongIMLib.RongIMClient._dataAccessProvider.updateMessage(msg);
                            },
                            onError: function () { }
                        });
                    }
                    setTimeout(function () {
                        msg.sentTime = data.timestamp;
                        sendCallback.onSuccess(msg);
                    });
                },
                onError: function (errorCode) {
                    msg.sentStatus = RongIMLib.SentStatus.FAILED;
                    if (RongIMLib.RongIMClient.MessageParams[msg.messageType].msgTag.getMessageTag() == 3) {
                        RongIMLib.RongIMClient._memoryStore.converStore.latestMessage = msg;
                    }
                    RongIMLib.RongIMClient._dataAccessProvider.addMessage(conversationType, targetId, msg, {
                        onSuccess: function (ret) {
                            msg.messageId = ret.messageId;
                            RongIMLib.RongIMClient._dataAccessProvider.updateMessage(msg);
                        },
                        onError: function () { }
                    });
                    setTimeout(function () {
                        sendCallback.onError(errorCode, msg);
                    });
                }
            }, null, methodType);
            sendCallback.onBefore && sendCallback.onBefore(RongIMLib.MessageIdHandler.messageId);
            msg.messageId = RongIMLib.MessageIdHandler.messageId + "";
            console.log('before',msg.messageId);
        };
        ServerDataProvider.prototype.setConnectionStatusListener = function (listener) {
            if (RongIMLib.RongIMClient.bridge) {
                RongIMLib.RongIMClient.bridge.setListener(listener);
            }
            else {
                RongIMLib.RongIMClient._memoryStore.listenerList.push(listener);
            }
        };
        ServerDataProvider.prototype.setOnReceiveMessageListener = function (listener) {
            if (RongIMLib.RongIMClient.bridge) {
                RongIMLib.RongIMClient.bridge.setListener(listener);
            }
            else {
                RongIMLib.RongIMClient._memoryStore.listenerList.push(listener);
            }
        };
        ServerDataProvider.prototype.registerMessageType = function (messageType, objectName, messageTag, messageContent) {
            if (!messageType) {
                throw new Error("messageType can't be empty,postion -> registerMessageType");
            }
            if (!objectName) {
                throw new Error("objectName can't be empty,postion -> registerMessageType");
            }
            if (Object.prototype.toString.call(messageContent) == "[object Array]") {
                var regMsg = RongIMLib.ModelUtil.modleCreate(messageContent, messageType);
                RongIMLib.RongIMClient.RegisterMessage[messageType] = regMsg;
            }
            else if (Object.prototype.toString.call(messageContent) == "[object Function]" || Object.prototype.toString.call(messageContent) == "[object Object]") {
                if (!messageContent.encode) {
                    throw new Error("encode method has not realized or messageName is undefined-> registerMessageType");
                }
                if (!messageContent.decode) {
                    throw new Error("decode method has not realized -> registerMessageType");
                }
            }
            else {
                throw new Error("The index of 3 parameter was wrong type  must be object or function or array-> registerMessageType");
            }
            registerMessageTypeMapping[objectName] = messageType;
            RongIMClient.RegisterMessage[messageType].messageName = messageType;
            RongIMClient.MessageType[messageType] = messageType;
            RongIMClient.MessageParams[messageType] = { objectName: objectName, msgTag: messageTag };
        };
        ServerDataProvider.prototype.addConversation = function (conversation, callback) {
            var isAdd = true;
            for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.conversationList.length; i < len; i++) {
                if (RongIMLib.RongIMClient._memoryStore.conversationList[i].conversationType === conversation.conversationType && RongIMLib.RongIMClient._memoryStore.conversationList[i].targetId === conversation.targetId) {
                    RongIMLib.RongIMClient._memoryStore.conversationList.unshift(RongIMLib.RongIMClient._memoryStore.conversationList.splice(i, 1)[0]);
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                RongIMLib.RongIMClient._memoryStore.conversationList.unshift(conversation);
            }
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.updateConversation = function (conversation) {
            var conver;
            for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.conversationList.length; i < len; i++) {
                if (conversation.conversationType === RongIMLib.RongIMClient._memoryStore.conversationList[i].conversationType && conversation.targetId === RongIMLib.RongIMClient._memoryStore.conversationList[i].targetId) {
                    conversation.conversationTitle && (RongIMLib.RongIMClient._memoryStore.conversationList[i].conversationTitle = conversation.conversationTitle);
                    conversation.senderUserName && (RongIMLib.RongIMClient._memoryStore.conversationList[i].senderUserName = conversation.senderUserName);
                    conversation.senderPortraitUri && (RongIMLib.RongIMClient._memoryStore.conversationList[i].senderPortraitUri = conversation.senderPortraitUri);
                    conversation.latestMessage && (RongIMLib.RongIMClient._memoryStore.conversationList[i].latestMessage = conversation.latestMessage);
                    break;
                }
            }
            return conver;
        };
        ServerDataProvider.prototype.removeConversation = function (conversationType, targetId, callback) {
            var mod = new Modules.RelationsInput();
            mod.setType(conversationType);
            RongIMLib.RongIMClient.bridge.queryMsg(27, RongIMLib.MessageUtil.ArrayForm(mod.toArrayBuffer()), targetId, {
                onSuccess: function () {
                    var conversationList = RongIMLib.RongIMClient._memoryStore.conversationList;
                    for (var i = 0, len = conversationList.length; i < len; i++) {
                        
                        var conversation = RongIMLib.RongIMClient._memoryStore.conversationList[i];

                        if (conversationType == conversation.conversationType && targetId == conversation.targetId) {
                            conversationList.splice(i, 1);
                            break;
                        }
                }
                callback.onSuccess(true);
                }, onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.CONVER_REMOVE_ERROR);
                    });
                }
            });
        };
        ServerDataProvider.prototype.getMessage = function (messageId, callback) {
            callback.onSuccess(new RongIMLib.Message());
        };
        ServerDataProvider.prototype.addMessage = function (conversationType, targetId, message, callback) {
            if (callback) {
                callback.onSuccess(message);
            }
        };
        ServerDataProvider.prototype.removeMessage = function (conversationType, targetId, messageIds, callback) {
            RongIMLib.RongIMClient.getInstance().deleteRemoteMessages(conversationType, targetId, messageIds, callback);
        };
        ServerDataProvider.prototype.removeLocalMessage = function (conversationType, targetId, timestamps, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.updateMessage = function (message, callback) {
            if (callback) {
                callback.onSuccess(message);
            }
        };
        ServerDataProvider.prototype.clearMessages = function (conversationType, targetId, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.updateMessages = function (conversationType, targetId, key, value, callback) {
            var me = this;
            if (key == "readStatus") {
                if (RongIMLib.RongIMClient._memoryStore.conversationList.length > 0) {
                    me.getConversationList({
                        onSuccess: function (list) {
                            Array.forEach(list, function (conver) {
                                if (conver.conversationType == conversationType && conver.targetId == targetId) {
                                    conver.unreadMessageCount = 0;
                                }
                            });
                        },
                        onError: function (errorCode) {
                            callback.onError(errorCode);
                        }
                    }, null);
                }
            }
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.getConversation = function (conversationType, targetId, callback) {
            var conver = null;
            for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.conversationList.length; i < len; i++) {
                if (RongIMLib.RongIMClient._memoryStore.conversationList[i].conversationType == conversationType && RongIMLib.RongIMClient._memoryStore.conversationList[i].targetId == targetId) {
                    conver = RongIMLib.RongIMClient._memoryStore.conversationList[i];
                    if (RongIMLib.MessageUtil.supportLargeStorage()) {
                        var count = RongIMLib.RongIMClient._storageProvider.getItem("cu" + RongIMLib.Bridge._client.userId + conversationType + targetId);
                        if (conver.unreadMessageCount == 0) {
                            conver.unreadMessageCount = Number(count);
                        }
                    }
                }
            }
            callback.onSuccess(conver);
        };
        ServerDataProvider.prototype.getConversationList = function (callback, conversationTypes, count, isHidden) {
            RongIMLib.RongIMClient.getInstance().getRemoteConversationList({
                    onSuccess: function (list) {
                        if (RongIMLib.MessageUtil.supportLargeStorage()) {
                            Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (item) {
                                var count = RongIMLib.RongIMClient._storageProvider.getItem("cu" + RongIMLib.Bridge._client.userId + item.conversationType + item.targetId);
                                if (item.unreadMessageCount == 0) {
                                    item.unreadMessageCount = Number(count);
                                }
                            });
                        }
                        RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList = false;
                        callback.onSuccess(list);
                    },
                    onError: function (errorcode) {
                        callback.onSuccess([]);
                    }
                }, conversationTypes, count, isHidden);
        };
        ServerDataProvider.prototype.clearConversations = function (conversationTypes, callback) {
            Array.forEach(conversationTypes, function (conversationType) {
                Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (conver) {
                    if (conversationType == conver.conversationType) {
                        RongIMLib.RongIMClient.getInstance().removeConversation(conver.conversationType, conver.targetId, { onSuccess: function () { }, onError: function () { } });
                    }
                });
            });
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.getHistoryMessages = function (conversationType, targetId, timestamp, count, callback) {
            RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(conversationType, targetId, timestamp, count, callback);
        };
        ServerDataProvider.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
            var count = 0;
            if (conversationTypes) {
                for (var i = 0, len = conversationTypes.length; i < len; i++) {
                    Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (conver) {
                        if (conver.conversationType == conversationTypes[i]) {
                            count += conver.unreadMessageCount;
                        }
                    });
                }
            }
            else {
                Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (conver) {
                    count += conver.unreadMessageCount;
                });
            }
            callback.onSuccess(count);
        };
        ServerDataProvider.prototype.getConversationUnreadCount = function (conversationTypes, callback) {
            var count = 0;
            Array.forEach(conversationTypes, function (converType) {
                Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (conver) {
                    if (conver.conversationType == converType) {
                        count += conver.unreadMessageCount;
                    }
                });
            });
            callback.onSuccess(count);
        };
        ServerDataProvider.prototype.getUnreadCount = function (conversationType, targetId, callback) {
            this.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    callback.onSuccess(conver ? conver.unreadMessageCount : 0);
                },
                onError: function (error) {
                    callback.onError(error);
                }
            });
        };
        ServerDataProvider.prototype.clearUnreadCountByTimestamp = function (conversationType, targetId, timestamp, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.clearUnreadCount = function (conversationType, targetId, callback) {
            this.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    if (conver) {
                        if (RongIMLib.MessageUtil.supportLargeStorage()) {
                            RongIMLib.RongIMClient._storageProvider.removeItem("cu" + RongIMLib.Bridge._client.userId + conversationType + targetId);
                        }
                        conver.unreadMessageCount = 0;
                        conver.mentionedMsg = null;
                        var mentioneds = RongIMLib.RongIMClient._storageProvider.getItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId);
                        if (mentioneds) {
                            var info = JSON.parse(mentioneds);
                            delete info[conversationType + "_" + targetId];
                            if (!RongIMLib.MessageUtil.isEmpty(info)) {
                                RongIMLib.RongIMClient._storageProvider.setItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId, JSON.stringify(info));
                            }
                            else {
                                RongIMLib.RongIMClient._storageProvider.removeItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId);
                            }
                        }
                    }
                    callback.onSuccess(true);
                },
                onError: function (error) {
                    callback.onError(error);
                }
            });
        };
        ServerDataProvider.prototype.setConversationToTop = function (conversationType, targetId, isTop, callback) {
            var me = this;
            this.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    conver.isTop = isTop;
                    me.addConversation(conver, callback);
                    callback.onSuccess(true);
                },
                onError: function (error) {
                    callback.onError(error);
                }
            });
        };
        ServerDataProvider.prototype.clearListeners = function () {
        };
        ServerDataProvider.prototype.setServerInfo = function (info) {
        };
        ServerDataProvider.prototype.getUnreadMentionedMessages = function (conversationType, targetId) {
            return null;
        };
        ServerDataProvider.prototype.setConversationHidden = function (conversationType, targetId, isHidden) {
        };
        ServerDataProvider.prototype.setMessageExtra = function (messageId, value, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.setMessageReceivedStatus = function (messageId, receivedStatus, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.setMessageSentStatus = function (messageId, sentStatus, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.getAllConversations = function (callback) {
            callback.onSuccess([]);
        };
        ServerDataProvider.prototype.getConversationByContent = function (keywords, callback) {
            callback.onSuccess([]);
        };
        ServerDataProvider.prototype.getMessagesFromConversation = function (conversationType, targetId, keywords, callback) {
            callback.onSuccess([]);
        };
        ServerDataProvider.prototype.searchConversationByContent = function (keyword, callback, conversationTypes) {
            callback.onSuccess([]);
        };
        ServerDataProvider.prototype.searchMessageByContent = function (conversationType, targetId, keyword, timestamp, count, total, callback) {
            callback.onSuccess([]);
        };
        ServerDataProvider.prototype.getDelaTime = function () {
            return RongIMLib.RongIMClient._memoryStore.deltaTime;
        };
        ServerDataProvider.prototype.getUserStatus = function (userId, callback) {
            callback.onSuccess(new RongIMLib.UserStatus());
        };
        ServerDataProvider.prototype.setUserStatus = function (userId, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.subscribeUserStatus = function (userIds, callback) {
            callback.onSuccess(true);
        };
        ServerDataProvider.prototype.setOnReceiveStatusListener = function (callback) {
            callback();
        };
        return ServerDataProvider;
    }());
    RongIMLib.ServerDataProvider = ServerDataProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var VCDataProvider = (function () {
        function VCDataProvider(addon) {
            this.userId = "";
            this.useConsole = false;
            this.addon = addon;
        }
        VCDataProvider.prototype.init = function (appKey) {
            this.useConsole && console.log("init");
            this.addon.initWithAppkey(appKey);
            // 0 ä¸å­˜ä¸è®¡æ•°  1 åªå­˜ä¸è®¡æ•° 3 å­˜ä¸”è®¡æ•°
            this.addon.registerMessageType("RC:VcMsg", 3);
            this.addon.registerMessageType("RC:ImgTextMsg", 3);
            this.addon.registerMessageType("RC:FileMsg", 3);
            this.addon.registerMessageType("RC:LBSMsg", 3);
            this.addon.registerMessageType("RC:PSImgTxtMsg", 3);
            this.addon.registerMessageType("RC:PSMultiImgTxtMsg", 3);
            this.addon.registerMessageType("RCJrmf:RpMsg", 3);
            this.addon.registerMessageType("RCJrmf:RpOpendMsg", 1);
            this.addon.registerMessageType("RC:GrpNtf", 1);
            this.addon.registerMessageType("RC:DizNtf", 0);
            this.addon.registerMessageType("RC:InfoNtf", 0);
            this.addon.registerMessageType("RC:ContactNtf", 0);
            this.addon.registerMessageType("RC:ProfileNtf", 0);
            this.addon.registerMessageType("RC:CmdNtf", 0);
            this.addon.registerMessageType("RC:CmdMsg", 0);
            this.addon.registerMessageType("RC:TypSts", 0);
            this.addon.registerMessageType("RC:CsChaR", 0);
            this.addon.registerMessageType("RC:CsHsR", 0);
            this.addon.registerMessageType("RC:CsEnd", 0);
            this.addon.registerMessageType("RC:CsSp", 0);
            this.addon.registerMessageType("RC:CsUpdate", 0);
            this.addon.registerMessageType("RC:CsContact", 0);
            this.addon.registerMessageType("RC:ReadNtf", 0);
            this.addon.registerMessageType("RC:VCAccept", 0);
            this.addon.registerMessageType("RC:VCRinging", 0);
            this.addon.registerMessageType("RC:VCSummary", 0);
            this.addon.registerMessageType("RC:VCHangup", 0);
            this.addon.registerMessageType("RC:VCInvite", 0);
            this.addon.registerMessageType("RC:VCModifyMedia", 0);
            this.addon.registerMessageType("RC:VCModifyMem", 0);
            this.addon.registerMessageType("RC:PSCmd", 0);
            this.addon.registerMessageType("RC:RcCmd", 0);
            this.addon.registerMessageType("RC:SRSMsg", 0);
            this.addon.registerMessageType("RC:RRReqMsg", 0);
            this.addon.registerMessageType("RC:RRRspMsg", 0);
        };
        VCDataProvider.prototype.connect = function (token, callback, userId) {
            this.useConsole && console.log("connect");
            this.userId = userId;
            this.connectCallback = callback;
            this.addon.connectWithToken(token, userId);
        };
        VCDataProvider.prototype.setServerInfo = function (info) {
            'setServerInfo' in this.addon && this.addon.setServerInfo(info.navi);
        };
        VCDataProvider.prototype.logout = function () {
            this.useConsole && console.log("logout");
            this.disconnect();
        };
        VCDataProvider.prototype.disconnect = function () {
            this.useConsole && console.log("disconnect");
            this.addon.disconnect(true);
        };
        VCDataProvider.prototype.clearListeners = function () {
            this.addon.setOnReceiveStatusListener();
            this.addon.setConnectionStatusListener();
            this.addon.setOnReceiveMessageListener();
        };
        VCDataProvider.prototype.setConnectionStatusListener = function (listener) {
            var me = this;
            /**
            ConnectionStatus_TokenIncorrect = 31004,
            ConnectionStatus_Connected = 0,
            ConnectionStatus_KickedOff = 6, // å…¶ä»–è®¾å¤‡ç™»å½•
            ConnectionStatus_Connecting = 10,// è¿žæŽ¥ä¸­
            ConnectionStatus_SignUp = 12, // æœªç™»å½•
            ConnectionStatus_NetworkUnavailable = 1, // è¿žæŽ¥æ–­å¼€
            ConnectionStatus_ServerInvalid = 8, // æ–­å¼€
            ConnectionStatus_ValidateFailure = 9,//æ–­å¼€
            ConnectionStatus_Unconnected = 11,//æ–­å¼€
            ConnectionStatus_DisconnExecption = 31011 //æ–­å¼€
            RC_NAVI_MALLOC_ERROR   = 30000,//æ–­å¼€
            RC_NAVI_NET_UNAVAILABLE= 30002,//æ–­å¼€
            RC_NAVI_SEND_FAIL      = 30004,//æ–­å¼€
            RC_NAVI_REQ_TIMEOUT    = 30005,//æ–­å¼€
            RC_NAVI_RECV_FAIL      = 30006,//æ–­å¼€
            RC_NAVI_RESOURCE_ERROR = 30007,//æ–­å¼€
            RC_NAVI_NODE_NOT_FOUND = 30008,//æ–­å¼€
            RC_NAVI_DNS_ERROR      = 30009,//æ–­å¼€
            */
            me.connectListener = listener;
            this.useConsole && console.log("setConnectionStatusListener");
            me.addon.setConnectionStatusListener(function (result) {
                switch (result) {
                    case 10:
                        listener.onChanged(RongIMLib.ConnectionStatus.CONNECTING);
                        break;
                    case 31004:
                        me.connectCallback.onTokenIncorrect();
                        break;
                    case 1:
                    case 8:
                    case 9:
                    case 11:
                    case 12:
                    case 31011:
                    case 30000:
                    case 30002:
                    case 30004:
                    case 30005:
                    case 30006:
                    case 30007:
                    case 30008:
                    case 30009:
                        listener.onChanged(RongIMLib.ConnectionStatus.DISCONNECTED);
                        break;
                    case 0:
                    case 33005:
                        me.connectCallback.onSuccess(me.userId);
                        listener.onChanged(RongIMLib.ConnectionStatus.CONNECTED);
                        break;
                    case 6:
                        listener.onChanged(RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT);
                        break;
                }
            });
        };
        VCDataProvider.prototype.setOnReceiveMessageListener = function (listener) {
            var me = this, localCount = 0;
            me.messageListener = listener;
            this.useConsole && console.log("setOnReceiveMessageListener");
            me.addon.setOnReceiveMessageListener(function (result, leftCount) {
                var message = me.buildMessage(result);
                if ((leftCount == 0 && localCount == 1) || leftCount > 0) {
                    message.offLineMessage = true;
                }
                else {
                    message.offLineMessage = false;
                }
                localCount = leftCount;
                
                var voipMsgTypes = ['AcceptMessage', 'RingingMessage', 'HungupMessage', 'InviteMessage', 'MediaModifyMessage', 'MemberModifyMessage'];
                var isVoIPMsg = voipMsgTypes.indexOf(message.messageType) > -1;
                                
                if (isVoIPMsg) {
                    RongIMClient._voipProvider && RongIMClient._voipProvider.onReceived(message);
                }else{
                    listener.onReceived(message, leftCount);
                }
            });
        };
        VCDataProvider.prototype.sendTypingStatusMessage = function (conversationType, targetId, messageName, sendCallback) {
            var me = this;
            this.useConsole && console.log("sendTypingStatusMessage");
            if (messageName in RongIMLib.RongIMClient.MessageParams) {
                me.sendMessage(conversationType, targetId, RongIMLib.TypingStatusMessage.obtain(RongIMLib.RongIMClient.MessageParams[messageName].objectName, ""), {
                    onSuccess: function () {
                        setTimeout(function () {
                            sendCallback.onSuccess();
                        });
                    },
                    onError: function (errorCode) {
                        setTimeout(function () {
                            sendCallback.onError(errorCode, null);
                        });
                    }
                });
            }
        };
        VCDataProvider.prototype.sendTextMessage = function (conversationType, targetId, content, sendMessageCallback) {
            var msgContent = RongIMLib.TextMessage.obtain(content);
            this.useConsole && console.log("sendTextMessage");
            this.sendMessage(conversationType, targetId, msgContent, sendMessageCallback);
        };
        VCDataProvider.prototype.getRemoteHistoryMessages = function (conversationType, targetId, timestamp, count, callback) {
            var me = this;
            try {
                this.useConsole && console.log("getRemoteHistoryMessages");
                this.addon.getRemoteHistoryMessages(conversationType, targetId, timestamp ? timestamp : 0, count, function (ret, hasMore) {
                    var list = ret ? JSON.parse(ret).list : [], msgs = [];
                    list.reverse();
                    for (var i = 0, len = list.length; i < len; i++) {
                        msgs[i] = me.buildMessage(list[i].obj);
                    }
                    callback.onSuccess(msgs, hasMore ? true : false);
                }, function (errorCode) {
                    callback.onError(errorCode);
                });
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.TIMEOUT);
            }
        };
        VCDataProvider.prototype.getRemoteConversationList = function (callback, conversationTypes, count, isGetHiddenConvers) {
            try {
                this.useConsole && console.log("getRemoteConversationList");
                var converTypes = conversationTypes || [1, 2, 3, 4, 5, 6, 7, 8];
                var result = this.addon.getConversationList(converTypes);
                var list = JSON.parse(result).list, convers = [], me = this, index = 0;
                list.reverse();
                isGetHiddenConvers = typeof isGetHiddenConvers === 'boolean' ? isGetHiddenConvers : false;
                for (var i = 0, len = list.length; i < len; i++) {
                    var tmpObj = list[i].obj, obj = JSON.parse(tmpObj);
                    if (obj != "") {
                        if (obj.isHidden == 1 && isGetHiddenConvers) {
                            continue;
                        }
                        convers[index] = me.buildConversation(tmpObj);
                        index++;
                    }
                }
                convers.reverse();
                callback.onSuccess(convers);
            }
            catch (e) {
                callback.onSuccess(convers);
                throw new Error(e);
            }
        };
        VCDataProvider.prototype.removeConversation = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("removeConversation");
                this.addon.removeConversation(conversationType, targetId);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_REMOVE_ERROR);
            }
        };
        VCDataProvider.prototype.joinChatRoom = function (chatRoomId, messageCount, callback) {
            this.useConsole && console.log("joinChatRoom");
            this.addon.joinChatRoom(chatRoomId, messageCount, function () {
                callback.onSuccess();
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.quitChatRoom = function (chatRoomId, callback) {
            this.useConsole && console.log("quitChatRoom");
            this.addon.quitChatRoom(chatRoomId, function () {
                callback.onSuccess();
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.addToBlacklist = function (userId, callback) {
            this.useConsole && console.log("addToBlacklist");
            this.addon.addToBlacklist(userId, function () {
                callback.onSuccess();
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.getBlacklist = function (callback) {
            this.useConsole && console.log("getBlacklist");
            this.addon.getBlacklist(function (blacklistors) {
                callback.onSuccess(blacklistors);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.getBlacklistStatus = function (userId, callback) {
            this.useConsole && console.log("getBlacklistStatus");
            this.addon.getBlacklistStatus(userId, function (result) {
                callback.onSuccess(result);
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.removeFromBlacklist = function (userId, callback) {
            this.useConsole && console.log("removeFromBlacklist");
            this.addon.removeFromBlacklist(userId, function () {
                callback.onSuccess();
            }, function (error) {
                callback.onError(error);
            });
        };
        VCDataProvider.prototype.sendMessage = function (conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData) {
            var me = this, users = [];
            me.useConsole && console.log("sendMessage");
            if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]) {
                var rspMsg = messageContent;
                if (rspMsg.receiptMessageDic) {
                    var ids = [];
                    for (var key in rspMsg.receiptMessageDic) {
                        ids.push(key);
                    }
                    users = ids;
                }
            }
            if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["SyncReadStatusMessage"]) {
                users.push(me.userId);
            }
            var msg = me.addon.sendMessage(conversationType, targetId, RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName, messageContent.encode(), pushText || "", appData || "", function (progress) {
            }, function (message) {
                sendCallback.onSuccess(me.buildMessage(message));
            }, function (message, code) {
                sendCallback.onError(code, me.buildMessage(message));
            }, users);
            var tempMessage = JSON.parse(msg);
            sendCallback.onBefore && sendCallback.onBefore(tempMessage.messageId);
            RongIMLib.MessageIdHandler.messageId = tempMessage.messageId;
        };
        VCDataProvider.prototype.registerMessageType = function (messageType, objectName, messageTag, messageContent) {
            this.useConsole && console.log("registerMessageType");
            this.addon.registerMessageType(objectName, messageTag.getMessageTag());
            var regMsg = RongIMLib.ModelUtil.modleCreate(messageContent, messageType);
            RongIMLib.RongIMClient.RegisterMessage[messageType] = regMsg;
            RongIMClient.RegisterMessage[messageType].messageName = messageType;
            registerMessageTypeMapping[objectName] = messageType;
            RongIMClient.MessageType[messageType] = messageType;
            RongIMClient.MessageParams[messageType] = { objectName: objectName, msgTag: messageTag };
        };
        VCDataProvider.prototype.addMessage = function (conversationType, targetId, message, callback) {
            this.useConsole && console.log("addMessage");
            var msg = this.addon.insertMessage(conversationType, targetId, message.senderUserId, message.objectName, JSON.stringify(message.content), function () {
                callback.onSuccess(me.buildMessage(msg));
            }, function () {
                callback.onError(RongIMLib.ErrorCode.MSG_INSERT_ERROR);
            }), me = this;
        };
        VCDataProvider.prototype.removeMessage = function (conversationType, targetId, delMsgs, callback) {
        };
        VCDataProvider.prototype.removeLocalMessage = function (conversationType, targetId, timestamps, callback) {
            try {
                this.useConsole && console.log("removeLocalMessage");
                this.addon.deleteMessages(timestamps);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.MSG_DEL_ERROR);
            }
        };
        VCDataProvider.prototype.getMessage = function (messageId, callback) {
            try {
                this.useConsole && console.log("getMessage");
                var msg = this.addon.getMessage(messageId);
                msg = this.buildMessage(msg);
                callback.onSuccess(msg);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.GET_MESSAGE_BY_ID_ERROR);
            }
        };
        VCDataProvider.prototype.clearMessages = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("clearMessages");
                this.addon.clearMessages(conversationType, targetId);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_GET_ERROR);
            }
        };
        VCDataProvider.prototype.getConversation = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("getConversation");
                var ret = this.addon.getConversation(conversationType, targetId);
                callback.onSuccess(this.buildConversation(ret));
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_GET_ERROR);
            }
        };
        VCDataProvider.prototype.getConversationList = function (callback, conversationTypes, count, isGetHiddenConvers) {
            this.useConsole && console.log("getConversationList");
            this.getRemoteConversationList(callback, conversationTypes, count, isGetHiddenConvers);
        };
        VCDataProvider.prototype.clearConversations = function (conversationTypes, callback) {
            try {
                this.useConsole && console.log("clearConversations");
                this.addon.clearConversations();
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_CLEAR_ERROR);
            }
        };
        VCDataProvider.prototype.setMessageContent = function(messageId, content, objectName){
            content = JSON.stringify(content);
            this.addon.setMessageContent(messageId, content, objectName);
        };
        // true : 倒序， false 正序
        VCDataProvider.prototype.getHistoryMessages = function (conversationType, targetId, timestamp, count, callback, objectName, direction) {
            this.useConsole && console.log("getHistoryMessages");
            if (count <= 0) {
                callback.onError(RongIMLib.ErrorCode.TIMEOUT);
                return;
            }
            objectName = objectName || "";
            direction = typeof direction == 'undefined' || direction;
            try {
                var ret = this.addon.getHistoryMessages(conversationType, targetId, timestamp ? timestamp : 0, count, objectName, direction);
                var list = ret ? JSON.parse(ret).list : [], msgs = [], me = this;
                list.reverse();
                for (var i = 0, len = list.length; i < len; i++) {
                    msgs[i] = me.buildMessage(list[i].obj);
                }
                callback.onSuccess(msgs, len == count);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.TIMEOUT);
            }
        };
        VCDataProvider.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
            try {
                var result;
                this.useConsole && console.log("getTotalUnreadCount");
                if (conversationTypes) {
                    result = this.addon.getTotalUnreadCount(conversationTypes);
                }
                else {
                    result = this.addon.getTotalUnreadCount();
                }
                callback.onSuccess(result);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_TOTAL_UNREAD_ERROR);
            }
        };
        VCDataProvider.prototype.getConversationUnreadCount = function (conversationTypes, callback) {
            this.useConsole && console.log("getConversationUnreadCount");
            this.getTotalUnreadCount(callback, conversationTypes);
        };
        VCDataProvider.prototype.getUnreadCount = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("getUnreadCount");
                var result = this.addon.getUnreadCount(conversationType, targetId);
                callback.onSuccess(result);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_TYPE_UNREAD_ERROR);
            }
        };
        VCDataProvider.prototype.clearUnreadCount = function (conversationType, targetId, callback) {
            try {
                this.useConsole && console.log("clearUnreadCount");
                var result = this.addon.clearUnreadCount(conversationType, targetId);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_CLEAR_ERROR);
            }
        };
        VCDataProvider.prototype.clearUnreadCountByTimestamp = function (conversationType, targetId, timestamp, callback) {
            try {
                this.useConsole && console.log("clearUnreadCountByTimestamp");
                var result = this.addon.clearUnreadCountByTimestamp(conversationType, targetId, timestamp);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_CLEAR_ERROR);
            }
        };
        VCDataProvider.prototype.setConversationToTop = function (conversationType, targetId, isTop, callback) {
            try {
                this.useConsole && console.log("setConversationToTop");
                this.addon.setConversationToTop(conversationType, targetId, isTop);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_SETOP_ERROR);
            }
        };
        VCDataProvider.prototype.setConversationHidden = function (conversationType, targetId, isHidden) {
            this.addon.setConversationHidden(conversationType, targetId, isHidden);
        };
        VCDataProvider.prototype.setMessageReceivedStatus = function (messageId, receivedStatus, callback) {
            try {
                this.useConsole && console.log("setMessageReceivedStatus");
                this.addon.setMessageReceivedStatus(messageId, receivedStatus);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.TIMEOUT);
            }
        };
        VCDataProvider.prototype.setMessageSentStatus = function (messageId, sentStatus, callback) {
            try {
                this.useConsole && console.log("setMessageSentStatus");
                this.addon.setMessageSentStatus(messageId, sentStatus);
                callback.onSuccess(true);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.TIMEOUT);
            }
        };
        VCDataProvider.prototype.getFileToken = function (fileType, callback) {
            this.useConsole && console.log("getFileToken");
            this.addon.getUploadToken(fileType, function (token) {
                callback.onSuccess({ token: token });
            }, function (errorCode) {
                callback.onError(errorCode);
            });
        };
        VCDataProvider.prototype.getFileUrl = function (fileType, fileName, oriName, callback) {
            this.useConsole && console.log("getFileUrl");
            this.addon.getDownloadUrl(fileType, fileName, oriName, function (url) {
                callback.onSuccess({ downloadUrl: url });
            }, function (errorCode) {
                callback.onError(errorCode);
            });
        };
        VCDataProvider.prototype.searchConversationByContent = function (keyword, callback, conversationTypes) {
            var converTypes = [];
            if (typeof conversationTypes == 'undefined') {
                converTypes = [1, 2, 3, 4, 5, 6, 7];
            }
            else {
                converTypes = conversationTypes;
            }
            try {
                this.useConsole && console.log("searchConversationByContent");
                var result = this.addon.searchConversationByContent(converTypes, keyword);
                var list = JSON.parse(result).list, convers = [], me = this;
                list.reverse();
                for (var i = 0, len = list.length; i < len; i++) {
                    convers[i] = me.buildConversation(list[i].obj);
                }
                callback.onSuccess(convers);
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.CONVER_GETLIST_ERROR);
            }
        };
        VCDataProvider.prototype.searchMessageByContent = function (conversationType, targetId, keyword, timestamp, count, total, callback) {
            var me = this;
            try {
                this.useConsole && console.log("searchMessageByContent");
                this.addon.searchMessageByContent(conversationType, targetId, keyword, timestamp, count, total, function (ret, matched) {
                    var list = ret ? JSON.parse(ret).list : [], msgs = [];
                    list.reverse();
                    for (var i = 0, len = list.length; i < len; i++) {
                        msgs[i] = me.buildMessage(list[i].obj);
                    }
                    callback.onSuccess(msgs, matched);
                });
            }
            catch (e) {
                callback.onError(RongIMLib.ErrorCode.TIMEOUT);
            }
        };
        VCDataProvider.prototype.getChatRoomInfo = function (chatRoomId, count, order, callback) {
            this.useConsole && console.log("getChatRoomInfo");
            this.addon.getChatroomInfo(chatRoomId, count, order, function (ret, count) {
                var list = ret ? JSON.parse(ret).list : [], chatRoomInfo = { userInfos: [], userTotalNums: count };
                if (list.length > 0) {
                    for (var i = 0, len = list.length; i < len; i++) {
                        chatRoomInfo.userInfos.push(JSON.parse(list[i].obj));
                    }
                }
                callback.onSuccess(chatRoomInfo);
            }, function (errcode) {
                callback.onError(errcode);
            });
        };
        VCDataProvider.prototype.setChatroomHisMessageTimestamp = function (chatRoomId, timestamp) {
        };
        VCDataProvider.prototype.getChatRoomHistoryMessages = function (chatRoomId, count, order, callback) {
        };
        VCDataProvider.prototype.setMessageStatus = function(conversationType, targetId, timestamp, status, callback){
            this.addon.updateMessageReceiptStatus(conversationType, targetId, timestamp);
            callback.onSuccess(true);
        };
        VCDataProvider.prototype.getDelaTime = function () {
            return this.addon.getDeltaTime();
        };
        VCDataProvider.prototype.getUserStatus = function (userId, callback) {
            var me = this;
            this.addon.getUserStatus(userId, function (status) {
                callback.onSuccess(me.buildUserStatus(status));
            }, function (code) {
                callback.onError(code);
            });
        };
        VCDataProvider.prototype.setUserStatus = function (userId, callback) {
            this.addon.setUserStatus(userId, function () {
                callback.onSuccess(true);
            }, function (code) {
                callback.onError(code);
            });
        };
        VCDataProvider.prototype.subscribeUserStatus = function (userIds, callback) {
            this.addon.subscribeUserStatus(userIds, function () {
                callback.onSuccess(true);
            }, function (code) {
                callback.onError(code);
            });
        };
        VCDataProvider.prototype.setOnReceiveStatusListener = function (callback) {
            var me = this;
            this.addon.setOnReceiveStatusListener(function (userId, status) {
                callback(userId, me.buildUserStatus(status));
            });
        };
        VCDataProvider.prototype.getUnreadMentionedMessages = function (conversationType, targetId) {
            var me = this;
            var mentions = JSON.parse(me.addon.getUnreadMentionedMessages(conversationType, targetId)).list;
            for (var i = 0, len = mentions.length; i < len; i++) {
                var temp = JSON.parse(mentions[i].obj);
                temp.content = JSON.parse(temp.content);
                mentions[i] = temp;
            }
            return mentions;
        };
        VCDataProvider.prototype.hasRemoteUnreadMessages = function (token, callback) {
            callback.onSuccess(false);
        };
        VCDataProvider.prototype.sendRecallMessage = function (content, sendMessageCallback) {
            var me = this;
            this.addon.recallMessage("RC:RcCmd", JSON.stringify(content), content.push||"",
            function() {
                content.objectName = 'RC:RcCmd';
                sendMessageCallback.onSuccess(me.buildMessage(JSON.stringify(content)));
            },
            function(errorCode) {
              sendMessageCallback.onError(errorCode);
            });
        };
        VCDataProvider.prototype.updateMessage = function (message, callback) { };
        VCDataProvider.prototype.updateMessages = function (conversationType, targetId, key, value, callback) { };
        VCDataProvider.prototype.reconnect = function (callback) { };
        VCDataProvider.prototype.sendReceiptResponse = function (conversationType, targetId, content, sendCallback) { 
            var message = new RongIMLib.ReadReceiptResponseMessage({ receiptMessageDic: content });
            this.sendMessage(conversationType, targetId, message, {
                onSuccess: function (msg) {
                    var senderUserId = RongIMLib.MessageUtil.getFirstKey(obj);
                    valObj[senderUserId].isResponse = true;
                    RongIMLib.RongIMClient._storageProvider.setItem(rspkey, JSON.stringify(valObj));
                    sendCallback.onSuccess(msg);
                },
                onError: function (error, msg) {
                    sendCallback.onError(error, msg);
                }
            });
        };
        VCDataProvider.prototype.setMessageExtra = function (messageId, value, callback) { };
        VCDataProvider.prototype.addMemberToDiscussion = function (discussionId, userIdList, callback) { };
        VCDataProvider.prototype.createDiscussion = function (name, userIdList, callback) { };
        VCDataProvider.prototype.getDiscussion = function (discussionId, callback) { };
        VCDataProvider.prototype.quitDiscussion = function (discussionId, callback) { };
        VCDataProvider.prototype.removeMemberFromDiscussion = function (discussionId, userId, callback) { };
        VCDataProvider.prototype.setDiscussionInviteStatus = function (discussionId, status, callback) { };
        VCDataProvider.prototype.setDiscussionName = function (discussionId, name, callback) { };
        VCDataProvider.prototype.joinGroup = function (groupId, groupName, callback) { };
        VCDataProvider.prototype.quitGroup = function (groupId, callback) { };
        VCDataProvider.prototype.syncGroup = function (groups, callback) { };
        VCDataProvider.prototype.addConversation = function (conversation, callback) { };
        VCDataProvider.prototype.updateConversation = function (conversation) {
            return null;
        };
        VCDataProvider.prototype.buildUserStatus = function (result) {
            var userStatus = new RongIMLib.UserStatus();
            var obj = JSON.parse(result);
            if (obj.us && obj.us[0]) {
                userStatus.platform = obj.us[0].p;
                userStatus.online = !!obj.us[0].o;
                userStatus.status = obj.us[0].s;
            }
            return userStatus;
        };
        VCDataProvider.prototype.buildMessage = function (result) {
            var message = new RongIMLib.Message(), ret = JSON.parse(result);
            message.conversationType = ret.conversationType;
            message.targetId = ret.targetId;
            message.messageDirection = ret.direction;
            message.senderUserId = ret.senderUserId;
            if (ret.direction == RongIMLib.MessageDirection.RECEIVE) {
                message.receivedStatus = ret.status;
            }
            else if (ret.direction == RongIMLib.MessageDirection.SEND) {
                message.sentStatus = ret.status;
            }
            message.sentTime = ret.sentTime;
            message.objectName = ret.objectName;
            var content = ret.content ? JSON.parse(ret.content) : ret.content;
            var messageType = typeMapping[ret.objectName] || registerMessageTypeMapping[ret.objectName];
            if(content){
                content.messageName = messageType;
            }
            message.content = content;
            message.messageId = ret.messageId;
            message.messageUId = ret.messageUid;
            message.messageType = messageType;
            return message;
        };
        VCDataProvider.prototype.buildConversation = function (val) {
            if (val === '') {
                return null;
            }

            var conver = new RongIMLib.Conversation(), c = JSON.parse(val), lastestMsg = c.lastestMsg ? this.buildMessage(c.lastestMsg) : {};
            conver.conversationTitle = c.title;
            conver.conversationType = c.conversationType;
            conver.draft = c.draft;
            conver.isTop = c.isTop;
            conver.isHidden = c.isHidden;
            lastestMsg.conversationType = c.conversationType;
            lastestMsg.targetId = c.targetId;
            conver.latestMessage = lastestMsg;
            conver.latestMessageId = lastestMsg.messageId;
            conver.latestMessage.messageType = typeMapping[lastestMsg.objectName] || registerMessageTypeMapping[lastestMsg.objectName];
            conver.objectName = lastestMsg.objectName;
            conver.receivedStatus = RongIMLib.ReceivedStatus.READ;
            conver.sentTime = lastestMsg.sentTime;
            conver.senderUserId = lastestMsg.senderUserId;
            conver.sentStatus = lastestMsg.status;
            conver.targetId = c.targetId;
            conver.unreadMessageCount = c.unreadCount;
            conver.hasUnreadMention = c.m_hasUnreadMention;
            var mentions = this.getUnreadMentionedMessages(c.conversationType, c.targetId);
            if (mentions.length > 0) {
                // 取最后一条 @ 消息
                var mention = mentions.pop();
                conver.mentionedMsg = { uid: mention.messageUid, time: mention.sentTime, mentionedInfo: mention.content.mentionedInfo, sendUserId: mention.senderUserId };
            }
            return conver;
        };
        return VCDataProvider;
    }());
    RongIMLib.VCDataProvider = VCDataProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var DBUtil = (function () {
        function DBUtil() {
        }
        //RongIMClint.init æ—¶å€™æ‰§è¡Œï¼Œä¼ å…¥å½“å‰ç™»å½•äººçš„Id
        DBUtil.prototype.init = function (userId) {
            var me = this, isInit = false;
            me.userId = userId;
            me.db = openDatabase("RongIMLibDB", "1.0", "RongIMLibDB", 10 * 1024 * 1024);
            if (me.db) {
                isInit = true;
                var converSql = "create table if not exists t_conversation_" + userId + " (conversationType,targetId,content,sentTime,isTop)";
                var messageSql = "create table if not exists t_message_" + userId + " (id integer not null primary key autoincrement,messageType,messageUId,conversationType,targetId,sentTime,content,localMsg)";
                me.execUpdate(converSql);
                me.execUpdate(messageSql);
            }
            return isInit;
        };
        DBUtil.prototype.execSearchByParams = function (sql, values, callback) {
            this.db.transaction(function (tx) {
                tx.executeSql(sql, values, function (tx, results) {
                    callback(results.rows, results.rowsAffected);
                }, function (tx, results) {
                    throw new Error("{errorCode:" + results.code + ",content:" + results.message + "}");
                });
            });
        };
        DBUtil.prototype.execSearch = function (sql, callback) {
            this.db.transaction(function (tx) {
                tx.executeSql(sql, [], function (tx, results) {
                    callback(results.rows, results.rowsAffected);
                }, function (tx, result) {
                    throw new Error("{errorCode:" + result.code + ",content:" + result.message + "}");
                });
            });
        };
        DBUtil.prototype.execUpdateByParams = function (sql, values) {
            this.db.transaction(function (tx) {
                tx.executeSql(sql, values);
            }, function (tx, result) {
                throw new Error("{errorCode:" + tx.code + ",content:" + tx.message + "}");
            });
        };
        DBUtil.prototype.execUpdate = function (sql) {
            this.db.transaction(function (tx) {
                tx.executeSql(sql);
            }, function (tx, result) {
                throw new Error("{errorCode:" + tx.code + ",content:" + tx.message + "}");
            });
        };
        return DBUtil;
    }());
    RongIMLib.DBUtil = DBUtil;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var WebSQLDataProvider = (function () {
        function WebSQLDataProvider() {
            this.database = new RongIMLib.DBUtil();
        }
        WebSQLDataProvider.prototype.init = function (appKey) {
        };
        WebSQLDataProvider.prototype.connect = function (token, callback) {
            RongIMLib.RongIMClient.bridge = RongIMLib.Bridge.getInstance();
            RongIMLib.RongIMClient._memoryStore.token = token;
            RongIMLib.RongIMClient._memoryStore.callback = callback;
            if (RongIMLib.Bridge._client && RongIMLib.Bridge._client.channel && RongIMLib.Bridge._client.channel.connectionStatus == RongIMLib.ConnectionStatus.CONNECTED && RongIMLib.Bridge._client.channel.connectionStatus == RongIMLib.ConnectionStatus.CONNECTING) {
                return;
            }
            RongIMLib.RongIMClient.bridge.connect(RongIMLib.RongIMClient._memoryStore.appKey, token, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (e) {
                    if (e == RongIMLib.ConnectionState.TOKEN_INCORRECT || !e) {
                        setTimeout(function () {
                            callback.onTokenIncorrect();
                        });
                    }
                    else {
                        setTimeout(function () {
                            callback.onError(e);
                        });
                    }
                }
            });
            //å¾ªçŽ¯è®¾ç½®ç›‘å¬äº‹ä»¶ï¼Œè¿½åŠ ä¹‹åŽæ¸…ç©ºå­˜æ”¾äº‹ä»¶æ•°æ®
            for (var i = 0, len = RongIMLib.RongIMClient._memoryStore.listenerList.length; i < len; i++) {
                RongIMLib.RongIMClient.bridge["setListener"](RongIMLib.RongIMClient._memoryStore.listenerList[i]);
            }
            RongIMLib.RongIMClient._memoryStore.listenerList.length = 0;
        };
        WebSQLDataProvider.prototype.reconnect = function (callback) {
            if (RongIMLib.Bridge._client && RongIMLib.Bridge._client.channel && RongIMLib.Bridge._client.channel.connectionStatus != RongIMLib.ConnectionStatus.CONNECTED && RongIMLib.Bridge._client.channel.connectionStatus != RongIMLib.ConnectionStatus.CONNECTING) {
                RongIMLib.RongIMClient.bridge.reconnect(callback);
            }
        };
        WebSQLDataProvider.prototype.logout = function () {
            RongIMLib.RongIMClient.bridge.disconnect();
            RongIMLib.RongIMClient.bridge = null;
        };
        WebSQLDataProvider.prototype.disconnect = function () {
            RongIMLib.RongIMClient.bridge.disconnect();
        };
        WebSQLDataProvider.prototype.sendReceiptResponse = function (conversationType, targetId, sendCallback) {
            var rspkey = RongIMLib.Bridge._client.userId + conversationType + targetId + 'RECEIVED', me = this;
            if (RongIMLib.MessageUtil.supportLargeStorage()) {
                var valObj = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(rspkey));
                if (valObj) {
                    var vals = [];
                    for (var key in valObj) {
                        var tmp = {};
                        tmp[key] = valObj[key].uIds;
                        valObj[key].isResponse || vals.push(tmp);
                    }
                    if (vals.length == 0) {
                        sendCallback.onSuccess();
                        return;
                    }
                    var interval = setInterval(function () {
                        if (vals.length == 1) {
                            clearInterval(interval);
                        }
                        var obj = vals.splice(0, 1)[0];
                        var rspMsg = new RongIMLib.ReadReceiptResponseMessage({ receiptMessageDic: obj });
                        me.sendMessage(conversationType, targetId, rspMsg, {
                            onSuccess: function (msg) {
                                var senderUserId = RongIMLib.MessageUtil.getFirstKey(obj);
                                valObj[senderUserId].isResponse = true;
                                RongIMLib.RongIMClient._storageProvider.setItem(rspkey, JSON.stringify(valObj));
                                sendCallback.onSuccess(msg);
                            },
                            onError: function (error, msg) {
                                sendCallback.onError(error, msg);
                            }
                        });
                    }, 200);
                }
                else {
                    sendCallback.onSuccess();
                }
            }
            else {
                sendCallback.onSuccess();
            }
        };
        WebSQLDataProvider.prototype.sendTypingStatusMessage = function (conversationType, targetId, messageName, sendCallback) {
            var me = this;
            if (messageName in RongIMLib.RongIMClient.MessageParams) {
                me.sendMessage(conversationType, targetId, RongIMLib.TypingStatusMessage.obtain(RongIMLib.RongIMClient.MessageParams[messageName].objectName, ""), {
                    onSuccess: function () {
                        setTimeout(function () {
                            sendCallback.onSuccess();
                        });
                    },
                    onError: function (errorCode) {
                        setTimeout(function () {
                            sendCallback.onError(errorCode, null);
                        });
                    }
                });
            }
        };
        WebSQLDataProvider.prototype.sendTextMessage = function (conversationType, targetId, content, sendMessageCallback) {
            var msgContent = RongIMLib.TextMessage.obtain(content);
            this.sendMessage(conversationType, targetId, msgContent, sendMessageCallback);
        };
        WebSQLDataProvider.prototype.sendRecallMessage = function (content, sendMessageCallback, user) {
            var msg = new RongIMLib.RecallCommandMessage({ conversationType: content.conversationType, targetId: content.targetId, sentTime: content.sentTime, messageUId: content.messageUId, extra: content.extra, user: content.user });
            this.sendMessage(content.conversationType, content.targetId, msg, sendMessageCallback, false, null, null, 2);
        };
        WebSQLDataProvider.prototype.getRemoteHistoryMessages = function (conversationType, targetId, timestamp, count, callback) {
            var modules = new Modules.HistoryMessageInput(), self = this;
            modules.setTargetId(targetId);
            if (timestamp === 0 || timestamp > 0) {
                modules.setDataTime(timestamp);
            }
            else {
                modules.setDataTime(RongIMLib.RongIMClient._memoryStore.lastReadTime.get(conversationType + targetId));
            }
            modules.setSize(count);
            RongIMLib.RongIMClient.bridge.queryMsg(HistoryMsgType[conversationType], RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), targetId, {
                onSuccess: function (data) {
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.set(conversationType + targetId, RongIMLib.MessageUtil.int64ToTimestamp(data.syncTime));
                    var list = data.list.reverse(), tempMsg = null, tempDir;
                    if (RongIMLib.MessageUtil.supportLargeStorage()) {
                        for (var i = 0, len = list.length; i < len; i++) {
                            tempMsg = RongIMLib.MessageUtil.messageParser(list[i]);
                            tempDir = JSON.parse(RongIMLib.RongIMClient._storageProvider.getItem(RongIMLib.Bridge._client.userId + tempMsg.messageUId + "SENT"));
                            if (tempDir) {
                                tempMsg.receiptResponse || (tempMsg.receiptResponse = {});
                                tempMsg.receiptResponse[tempMsg.messageUId] = tempDir.count;
                            }
                            list[i] = tempMsg;
                        }
                    }
                    else {
                        for (var i = 0, len = list.length; i < len; i++) {
                            list[i] = RongIMLib.MessageUtil.messageParser(list[i]);
                        }
                    }
                    setTimeout(function () {
                        callback.onSuccess(list, !!data.hasMsg);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        if (error === RongIMLib.ErrorCode.TIMEOUT) {
                            callback.onError(error);
                        }
                        else {
                            callback.onSuccess([], false);
                        }
                    });
                }
            }, "HistoryMessagesOuput");
        };
        WebSQLDataProvider.prototype.hasRemoteUnreadMessages = function (token, callback) {
            var xss = null;
            window.RCCallback = function (x) {
                setTimeout(function () { callback.onSuccess(!!+x.status); });
                xss.parentNode.removeChild(xss);
            };
            xss = document.createElement("script");
            xss.src = RongIMLib.RongIMClient._memoryStore.depend.api + "/message/exist.js?appKey=" + encodeURIComponent(RongIMLib.RongIMClient._memoryStore.appKey) + "&token=" + encodeURIComponent(token) + "&callBack=RCCallback&_=" + Date.now();
            document.body.appendChild(xss);
            xss.onerror = function () {
                setTimeout(function () { callback.onError(RongIMLib.ErrorCode.UNKNOWN); });
                xss.parentNode.removeChild(xss);
            };
        };
        WebSQLDataProvider.prototype.getRemoteConversationList = function (callback, conversationTypes, count) {
            var modules = new Modules.RelationsInput(), self = this;
            modules.setType(1);
            if (typeof count == 'undefined') {
                modules.setCount(0);
            }
            else {
                modules.setCount(count);
            }
            RongIMLib.RongIMClient.bridge.queryMsg(26, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (list) {
                    RongIMLib.RongIMClient._memoryStore.conversationList.length = 0;
                    if (list.info) {
                        list.info = list.info.reverse();
                        for (var i = 0, len = list.info.length; i < len; i++) {
                            RongIMLib.RongIMClient.getInstance().pottingConversation(list.info[i]);
                        }
                    }
                    if (conversationTypes) {
                        var convers = [];
                        Array.forEach(conversationTypes, function (converType) {
                            Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (item) {
                                if (item.conversationType == converType) {
                                    convers.push(item);
                                }
                            });
                        });
                        callback.onSuccess(convers);
                    }
                    else {
                        callback.onSuccess(RongIMLib.RongIMClient._memoryStore.conversationList);
                    }
                },
                onError: function (error) {
                    if (error === RongIMLib.ErrorCode.TIMEOUT) {
                        callback.onError(error);
                    }
                    else {
                        callback.onSuccess([]);
                    }
                }
            }, "RelationsOutput");
        };
        WebSQLDataProvider.prototype.addMemberToDiscussion = function (discussionId, userIdList, callback) {
            var modules = new Modules.ChannelInvitationInput();
            modules.setUsers(userIdList);
            RongIMLib.RongIMClient.bridge.queryMsg(0, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.JOIN_IN_DISCUSSION);
                    });
                }
            });
        };
        WebSQLDataProvider.prototype.createDiscussion = function (name, userIdList, callback) {
            var modules = new Modules.CreateDiscussionInput(), self = this;
            modules.setName(name);
            RongIMLib.RongIMClient.bridge.queryMsg(1, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (discussId) {
                    if (userIdList.length > 0) {
                        self.addMemberToDiscussion(discussId, userIdList, {
                            onSuccess: function () { },
                            onError: function (error) {
                                setTimeout(function () {
                                    callback.onError(error);
                                });
                            }
                        });
                    }
                    setTimeout(function () {
                        callback.onSuccess(discussId);
                    });
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.CREATE_DISCUSSION);
                    });
                }
            }, "CreateDiscussionOutput");
        };
        WebSQLDataProvider.prototype.getDiscussion = function (discussionId, callback) {
            var modules = new Modules.ChannelInfoInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(4, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (errorCode) {
                    setTimeout(function () {
                        callback.onError(errorCode);
                    });
                }
            }, "ChannelInfoOutput");
        };
        WebSQLDataProvider.prototype.quitDiscussion = function (discussionId, callback) {
            var modules = new Modules.LeaveChannelInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(7, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, callback);
        };
        WebSQLDataProvider.prototype.removeMemberFromDiscussion = function (discussionId, userId, callback) {
            var modules = new Modules.ChannelEvictionInput();
            modules.setUser(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(9, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, callback);
        };
        WebSQLDataProvider.prototype.setDiscussionInviteStatus = function (discussionId, status, callback) {
            var modules = new Modules.ModifyPermissionInput();
            modules.setOpenStatus(status.valueOf());
            RongIMLib.RongIMClient.bridge.queryMsg(11, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function (x) {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                }, onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.INVITE_DICUSSION);
                    });
                }
            });
        };
        WebSQLDataProvider.prototype.setDiscussionName = function (discussionId, name, callback) {
            var modules = new Modules.RenameChannelInput();
            modules.setName(name);
            RongIMLib.RongIMClient.bridge.queryMsg(12, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), discussionId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            });
        };
        WebSQLDataProvider.prototype.joinGroup = function (groupId, groupName, callback) {
            var modules = new Modules.GroupInfo();
            modules.setId(groupId);
            modules.setName(groupName);
            var _mod = new Modules.GroupInput();
            _mod.setGroupInfo([modules]);
            RongIMLib.RongIMClient.bridge.queryMsg(6, RongIMLib.MessageUtil.ArrayForm(_mod.toArrayBuffer()), groupId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "GroupOutput");
        };
        WebSQLDataProvider.prototype.quitGroup = function (groupId, callback) {
            var modules = new Modules.LeaveChannelInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(8, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), groupId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            });
        };
        WebSQLDataProvider.prototype.syncGroup = function (groups, callback) {
            //åŽ»é‡æ“ä½œ
            for (var i = 0, part = [], info = [], len = groups.length; i < len; i++) {
                if (part.length === 0 || !(groups[i].id in part)) {
                    part.push(groups[i].id);
                    var groupinfo = new Modules.GroupInfo();
                    groupinfo.setId(groups[i].id);
                    groupinfo.setName(groups[i].name);
                    info.push(groupinfo);
                }
            }
            var modules = new Modules.GroupHashInput();
            modules.setUserId(RongIMLib.Bridge._client.userId);
            modules.setGroupHashCode(md5(part.sort().join("")));
            RongIMLib.RongIMClient.bridge.queryMsg(13, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (result) {
                    //1ä¸ºç¾¤ä¿¡æ¯ä¸åŒ¹é…éœ€è¦å‘é€ç»™æœåŠ¡å™¨è¿›è¡ŒåŒæ­¥ï¼Œ0ä¸éœ€è¦åŒæ­¥
                    if (result === 1) {
                        var val = new Modules.GroupInput();
                        val.setGroupInfo(info);
                        RongIMLib.RongIMClient.bridge.queryMsg(20, RongIMLib.MessageUtil.ArrayForm(val.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                            onSuccess: function () {
                                setTimeout(function () {
                                    callback.onSuccess();
                                });
                            },
                            onError: function () {
                                setTimeout(function () {
                                    callback.onError(RongIMLib.ErrorCode.GROUP_MATCH_ERROR);
                                });
                            }
                        }, "GroupOutput");
                    }
                    else {
                        setTimeout(function () {
                            callback.onSuccess();
                        });
                    }
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.GROUP_SYNC_ERROR);
                    });
                }
            }, "GroupHashOutput");
        };
        WebSQLDataProvider.prototype.joinChatRoom = function (chatroomId, messageCount, callback) {
            var e = new Modules.ChrmInput();
            e.setNothing(1);
            RongIMLib.Bridge._client.chatroomId = chatroomId;
            RongIMLib.RongIMClient.bridge.queryMsg(19, RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()), chatroomId, {
                onSuccess: function () {
                    callback.onSuccess();
                    var modules = new Modules.ChrmPullMsg();
                    messageCount == 0 && (messageCount = -1);
                    modules.setCount(messageCount);
                    modules.setSyncTime(0);
                    RongIMLib.Bridge._client.queryMessage("chrmPull", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), chatroomId, 1, {
                        onSuccess: function (collection) {
                            var sync = RongIMLib.MessageUtil.int64ToTimestamp(collection.syncTime);
                            RongIMLib.RongIMClient._storageProvider.setItem(chatroomId + RongIMLib.Bridge._client.userId + "CST", sync);
                            var list = collection.list;
                            if (RongIMLib.RongIMClient._memoryStore.filterMessages.length > 0) {
                                for (var i = 0, mlen = list.length; i < mlen; i++) {
                                    for (var j = 0, flen = RongIMLib.RongIMClient._memoryStore.filterMessages.length; j < flen; j++) {
                                        if (RongIMLib.RongIMClient.MessageParams[RongIMLib.RongIMClient._memoryStore.filterMessages[j]].objectName != list[i].classname) {
                                            RongIMLib.Bridge._client.handler.onReceived(list[i]);
                                        }
                                    }
                                }
                            }
                            else {
                                for (var i = 0, len = list.length; i < len; i++) {
                                    RongIMLib.Bridge._client.handler.onReceived(list[i]);
                                }
                            }
                        },
                        onError: function (x) {
                            setTimeout(function () {
                                callback.onError(RongIMLib.ErrorCode.CHATROOM_HISMESSAGE_ERROR);
                            });
                        }
                    }, "DownStreamMessages");
                },
                onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.CHARTOOM_JOIN_ERROR);
                    });
                }
            }, "ChrmOutput");
        };
        WebSQLDataProvider.prototype.getChatRoomInfo = function (chatRoomId, count, order, callback) {
            var modules = new Modules.QueryChatroomInfoInput();
            modules.setCount(count);
            modules.setOrder(order);
            RongIMLib.RongIMClient.bridge.queryMsg("queryChrmI", RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), chatRoomId, {
                onSuccess: function (list) {
                    setTimeout(function () {
                        callback.onSuccess(list);
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "QueryChatroomInfoOutput");
        };
        WebSQLDataProvider.prototype.quitChatRoom = function (chatroomId, callback) {
            var e = new Modules.ChrmInput();
            e.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(17, RongIMLib.MessageUtil.ArrayForm(e.toArrayBuffer()), chatroomId, {
                onSuccess: function () {
                    setTimeout(function () {
                        callback.onSuccess();
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "ChrmOutput");
        };
        WebSQLDataProvider.prototype.setChatroomHisMessageTimestamp = function (chatRoomId, timestamp) {
            RongIMLib.RongIMClient._memoryStore.lastReadTime.set('chrhis_' + chatRoomId, timestamp);
        };
        WebSQLDataProvider.prototype.getChatRoomHistoryMessages = function (chatRoomId, count, order, callback) {
            var modules = new Modules.HistoryMsgInput();
            modules.setTargetId(chatRoomId);
            var timestamp = RongIMLib.RongIMClient._memoryStore.lastReadTime.get('chrhis_' + chatRoomId) || 0;
            modules.setTime(timestamp);
            modules.setCount(count);
            modules.setOrder(order);
            RongIMLib.RongIMClient.bridge.queryMsg(34, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (data) {
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.set('chrhis_' + chatRoomId, RongIMLib.MessageUtil.int64ToTimestamp(data.syncTime));
                    var list = data.list.reverse();
                    for (var i = 0, len = list.length; i < len; i++) {
                        list[i] = RongIMLib.MessageUtil.messageParser(list[i]);
                    }
                    setTimeout(function () {
                        callback.onSuccess(list, !!data.hasMsg);
                    });
                },
                onError: function (error) {
                    setTimeout(function () {
                        if (error === RongIMLib.ErrorCode.TIMEOUT) {
                            callback.onError(error);
                        }
                        else {
                            callback.onSuccess([], false);
                        }
                    });
                }
            }, "HistoryMsgOuput");
        };
        WebSQLDataProvider.prototype.addToBlacklist = function (userId, callback) {
            var modules = new Modules.Add2BlackListInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(21, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function () {
                    callback.onSuccess();
                },
                onError: function () {
                    callback.onError(RongIMLib.ErrorCode.BLACK_ADD_ERROR);
                }
            });
        };
        WebSQLDataProvider.prototype.getBlacklist = function (callback) {
            var modules = new Modules.QueryBlackListInput();
            modules.setNothing(1);
            RongIMLib.RongIMClient.bridge.queryMsg(23, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, callback, "QueryBlackListOutput");
        };
        WebSQLDataProvider.prototype.getBlacklistStatus = function (userId, callback) {
            var modules = new Modules.BlackListStatusInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(24, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function (status) {
                    setTimeout(function () {
                        callback.onSuccess(RongIMLib.BlacklistStatus[status]);
                    });
                }, onError: function () {
                    setTimeout(function () {
                        callback.onError(RongIMLib.ErrorCode.BLACK_GETSTATUS_ERROR);
                    });
                }
            });
        };
        WebSQLDataProvider.prototype.removeFromBlacklist = function (userId, callback) {
            var modules = new Modules.RemoveFromBlackListInput();
            modules.setUserId(userId);
            RongIMLib.RongIMClient.bridge.queryMsg(22, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), userId, {
                onSuccess: function () {
                    callback.onSuccess();
                },
                onError: function () {
                    callback.onError(RongIMLib.ErrorCode.BLACK_REMOVE_ERROR);
                }
            });
        };
        WebSQLDataProvider.prototype.getFileToken = function (fileType, callback) {
            if (!(/(1|2|3|4)/.test(fileType.toString()))) {
                callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);
                return;
            }
            var modules = new Modules.GetQNupTokenInput();
            modules.setType(fileType);
            RongIMLib.RongIMClient.bridge.queryMsg(30, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "GetQNupTokenOutput");
        };
        WebSQLDataProvider.prototype.getFileUrl = function (fileType, fileName, oriName, callback) {
            if (!(/(1|2|3|4)/.test(fileType.toString()))) {
                setTimeout(function () {
                    callback.onError(RongIMLib.ErrorCode.QNTKN_FILETYPE_ERROR);
                });
                return;
            }
            var modules = new Modules.GetQNdownloadUrlInput();
            modules.setType(fileType);
            modules.setKey(fileName);
            if (oriName) {
                modules.setFileName(oriName);
            }
            RongIMLib.RongIMClient.bridge.queryMsg(31, RongIMLib.MessageUtil.ArrayForm(modules.toArrayBuffer()), RongIMLib.Bridge._client.userId, {
                onSuccess: function (data) {
                    setTimeout(function () {
                        callback.onSuccess(data);
                    });
                },
                onError: function (errcode) {
                    callback.onError(errcode);
                }
            }, "GetQNdownloadUrlOutput");
        };
        // methodType 1 : å¤šå®¢æœ(å®¢æœåŽå°ä½¿ç”¨);   2 : æ¶ˆæ¯æ’¤å›ž 
        WebSQLDataProvider.prototype.sendMessage = function (conversationType, targetId, messageContent, sendCallback, mentiondMsg, pushText, appData, methodType) {
            if (!RongIMLib.Bridge._client.channel) {
                sendCallback.onError(RongIMLib.ErrorCode.RC_NET_UNAVAILABLE, null);
                return;
            }
            if (!RongIMLib.Bridge._client.channel.socket.socket.connected) {
                sendCallback.onError(RongIMLib.ErrorCode.TIMEOUT, null);
                throw new Error("connect is timeout! postion:sendMessage");
            }
            var modules = new Modules.UpStreamMessage();
            if (mentiondMsg && (conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP)) {
                modules.setSessionId(7);
            }
            else {
                modules.setSessionId(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag());
            }
            pushText && modules.setPushText(pushText);
            appData && modules.setAppData(appData);
            if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["ReadReceiptResponseMessage"]) {
                var rspMsg = messageContent;
                if (rspMsg.receiptMessageDic) {
                    var ids = [];
                    for (var key in rspMsg.receiptMessageDic) {
                        ids.push(key);
                    }
                    modules.setUserId(ids);
                }
            }
            if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["SyncReadStatusMessage"]) {
                modules.setUserId(RongIMLib.Bridge._client.userId);
            }
            modules.setClassname(RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName);
            modules.setContent(messageContent.encode());
            var content = modules.toArrayBuffer();
            if (Object.prototype.toString.call(content) == "[object ArrayBuffer]") {
                content = [].slice.call(new Int8Array(content));
            }
            var c = null, me = this, msg = new RongIMLib.Message();
            this.getConversation(conversationType, targetId, {
                onSuccess: function (conver) {
                    c = conver;
                    if (RongIMLib.RongIMClient.MessageParams[messageContent.messageName].msgTag.getMessageTag() == 3) {
                        if (!c) {
                            c = RongIMLib.RongIMClient.getInstance().createConversation(conversationType, targetId, "");
                        }
                        c.sentTime = new Date().getTime();
                        c.sentStatus = RongIMLib.SentStatus.SENDING;
                        c.senderUserName = "";
                        c.senderUserId = RongIMLib.Bridge._client.userId;
                        c.notificationStatus = RongIMLib.ConversationNotificationStatus.DO_NOT_DISTURB;
                        c.latestMessage = msg;
                        c.unreadMessageCount = 0;
                        RongIMLib.RongIMClient._dataAccessProvider.addConversation(c, { onSuccess: function (data) { } });
                    }
                    RongIMLib.RongIMClient._memoryStore.converStore = c;
                }
            });
            msg.content = messageContent;
            msg.conversationType = conversationType;
            msg.senderUserId = RongIMLib.Bridge._client.userId;
            msg.objectName = RongIMLib.RongIMClient.MessageParams[messageContent.messageName].objectName;
            msg.targetId = targetId;
            msg.sentTime = new Date().getTime();
            msg.messageDirection = RongIMLib.MessageDirection.SEND;
            msg.sentStatus = RongIMLib.SentStatus.SENT;
            msg.messageType = messageContent.messageName;
            RongIMLib.RongIMClient.bridge.pubMsg(conversationType.valueOf(), content, targetId, {
                onSuccess: function (data) {
                    data && data.timestamp && RongIMLib.RongIMClient._storageProvider.setItem('converST_' + RongIMLib.Bridge._client.userId + conversationType + targetId, data.timestamp);
                    if ((conversationType == RongIMLib.ConversationType.DISCUSSION || conversationType == RongIMLib.ConversationType.GROUP) && messageContent.messageName == RongIMLib.RongIMClient.MessageType["ReadReceiptRequestMessage"]) {
                        var reqMsg = msg.content;
                        var sentkey = RongIMLib.Bridge._client.userId + reqMsg.messageUId + "SENT";
                        RongIMLib.RongIMClient._storageProvider.setItem(sentkey, JSON.stringify({ count: 0, dealtime: data.timestamp, userIds: {} }));
                    }
                    if (RongIMLib.RongIMClient.MessageParams[msg.messageType].msgTag.getMessageTag() == 3) {
                        RongIMLib.RongIMClient._memoryStore.converStore.latestMessage = msg;
                        RongIMLib.RongIMClient._dataAccessProvider.addMessage(conversationType, targetId, msg, {
                            onSuccess: function (ret) {
                                msg = ret;
                                msg.messageUId = data.messageUId;
                                msg.sentTime = data.timestamp;
                                msg.sentStatus = RongIMLib.SentStatus.SENT;
                                msg.messageId = data.messageId;
                                RongIMLib.RongIMClient._dataAccessProvider.updateMessage(msg);
                            },
                            onError: function () { }
                        });
                    }
                    setTimeout(function () {
                        msg.sentTime = data.timestamp;
                        sendCallback.onSuccess(msg);
                    });
                },
                onError: function (errorCode) {
                    msg.sentStatus = RongIMLib.SentStatus.FAILED;
                    if (RongIMLib.RongIMClient.MessageParams[msg.messageType].msgTag.getMessageTag() == 3) {
                        RongIMLib.RongIMClient._memoryStore.converStore.latestMessage = msg;
                    }
                    RongIMLib.RongIMClient._dataAccessProvider.addMessage(conversationType, targetId, msg, {
                        onSuccess: function (ret) {
                            msg.messageId = ret.messageId;
                            RongIMLib.RongIMClient._dataAccessProvider.updateMessage(msg);
                        },
                        onError: function () { }
                    });
                    setTimeout(function () {
                        sendCallback.onError(errorCode, msg);
                    });
                }
            }, null, methodType);
        };
        WebSQLDataProvider.prototype.setConnectionStatusListener = function (listener) {
            if (RongIMLib.RongIMClient.bridge) {
                RongIMLib.RongIMClient.bridge.setListener(listener);
            }
            else {
                RongIMLib.RongIMClient._memoryStore.listenerList.push(listener);
            }
        };
        WebSQLDataProvider.prototype.setOnReceiveMessageListener = function (listener) {
            if (RongIMLib.RongIMClient.bridge) {
                RongIMLib.RongIMClient.bridge.setListener(listener);
            }
            else {
                RongIMLib.RongIMClient._memoryStore.listenerList.push(listener);
            }
        };
        WebSQLDataProvider.prototype.registerMessageType = function (messageType, objectName, messageTag, messageContent) {
            if (!messageType) {
                throw new Error("messageType can't be empty,postion -> registerMessageType");
            }
            if (!objectName) {
                throw new Error("objectName can't be empty,postion -> registerMessageType");
            }
            if (Object.prototype.toString.call(messageContent) == "[object Array]") {
                var regMsg = RongIMLib.ModelUtil.modleCreate(messageContent, messageType);
                RongIMLib.RongIMClient.RegisterMessage[messageType] = regMsg;
            }
            else if (Object.prototype.toString.call(messageContent) == "[object Function]" || Object.prototype.toString.call(messageContent) == "[object Object]") {
                if (!messageContent.encode) {
                    throw new Error("encode method has not realized or messageName is undefined-> registerMessageType");
                }
                if (!messageContent.decode) {
                    throw new Error("decode method has not realized -> registerMessageType");
                }
            }
            else {
                throw new Error("The index of 3 parameter was wrong type  must be object or function or array-> registerMessageType");
            }
            registerMessageTypeMapping[objectName] = messageType;
        };
        WebSQLDataProvider.prototype.updateConversation = function (conversation) {
            var sql = "update t_conversation_" + this.database.userId + " set content = ?,sentTime = ?,istop = ? where conversationType = ? and targetId = ?";
            this.database.execUpdateByParams(sql, [JSON.stringify(conversation), conversation.sentTime, conversation.isTop, conversation.conversationType, conversation.targetId]);
            return conversation;
        };
        WebSQLDataProvider.prototype.addConversation = function (conver, callback) {
            var me = this;
            var sSql = "select * from t_conversation_" + me.database.userId + " t where t.conversationType = ? and t.targetId = ?";
            me.database.execSearchByParams(sSql, [Number(conver.conversationType), conver.targetId], function (results, rowsAffected) {
                if (results.length > 0 && rowsAffected) {
                    me.updateConversation(conver);
                }
                else {
                    var iSql = "insert into t_conversation_" + me.database.userId + "(conversationType,targetId,content,sentTime,isTop) values(?,?,?,?,?)";
                    me.database.execUpdateByParams(iSql, [conver.conversationType, conver.targetId, JSON.stringify(conver), conver.sentTime, conver.isTop]);
                }
                callback.onSuccess(true);
            });
        };
        WebSQLDataProvider.prototype.removeConversation = function (conversationType, targetId, callback) {
            var sql = "delete from t_conversation_" + this.database.userId + "  where conversationType = ? and targetId = ?";
            this.database.execUpdateByParams(sql, [conversationType, targetId]);
            callback.onSuccess(true);
        };
        WebSQLDataProvider.prototype.getConversation = function (conversationType, targetId, callback) {
            var sql = "select t.content from t_conversation_" + this.database.userId + " t where t.conversationType = ? and t.targetId = ?", conver = null;
            this.database.execSearchByParams(sql, [Number(conversationType), targetId], function (results, rowsAffected) {
                var conver;
                if (results.length > 0 && rowsAffected) {
                    conver = JSON.parse(results[0].content);
                }
                callback.onSuccess(conver);
            });
        };
        WebSQLDataProvider.prototype.getConversationList = function (callback, conversationTypes, count, isHidden) {
            if (RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList) {
                RongIMLib.RongIMClient.getInstance().getRemoteConversationList({
                    onSuccess: function (list) {
                        RongIMLib.RongIMClient._memoryStore.conversationList = list;
                        for (var i = 0, len = list.length; i < len; i++) {
                            me.addConversation(list[i], {
                                onSuccess: function () { },
                                onError: function () { }
                            });
                        }
                        RongIMLib.RongIMClient._memoryStore.isSyncRemoteConverList = false;
                    },
                    onError: function (errorCode) {
                        callback.onError(errorCode);
                    }
                }, conversationTypes, count, isHidden);
            }
            //æŸ¥è¯¢ç½®é¡¶ä¼šè¯ã€‚
            var tSql = "select * from t_conversation_" + this.database.userId + " t where t.isTop = 1 ";
            //æŽ’åºæŸ¥è¯¢ä¼šè¯ã€‚
            var oSql = "select * from t_conversation_" + this.database.userId + " c where c.isTop != 1 order by c.sentTime ";
            var me = this;
            if (conversationTypes) {
                tSql += " and t.conversationType in (" + conversationTypes.join(",") + ")";
                oSql += " and c.conversationType in (" + conversationTypes.join(",") + ")";
            }
            tSql += " union " + oSql;
            this.database.execSearch(tSql, function (results) {
                if (results.length > 0) {
                    var convers = [];
                    for (var i = 0, len = results.length; i < len; i++) {
                        convers.push(JSON.parse(results[i].content));
                    }
                    RongIMLib.RongIMClient._memoryStore.conversationList = convers;
                }
                callback.onSuccess(RongIMLib.RongIMClient._memoryStore.conversationList);
            });
        };
        WebSQLDataProvider.prototype.clearConversations = function (conversationTypes, callback) {
            var sql = "delete from t_conversation_" + this.database.userId + " where conversationType in (?)";
            this.database.execUpdateByParams(sql, [conversationTypes.join(",")]);
            Array.forEach(conversationTypes, function (conversationType) {
                Array.forEach(RongIMLib.RongIMClient._memoryStore.conversationList, function (conver) {
                    if (conversationType == conver.conversationType) {
                        RongIMLib.RongIMClient.getInstance().removeConversation(conver.conversationType, conver.targetId, { onSuccess: function () { }, onError: function () { } });
                    }
                });
            });
            callback.onSuccess(true);
        };
        WebSQLDataProvider.prototype.getMessage = function (messageUId, callback) {
            var sql = "select * from t_message_" + this.database.userId + " t where t.messageUId = ?";
            this.database.execSearchByParams(sql, [messageUId], function (results, rowsAffected) {
                if (results.length > 0 && rowsAffected) {
                    var msg = JSON.parse(results[0].content);
                    callback.onSuccess(msg);
                }
                else {
                    callback.onSuccess(null);
                }
            });
        };
        WebSQLDataProvider.prototype.addMessage = function (conversationType, targetId, message, callback) {
            var sql = "insert into t_message_" + this.database.userId + " (messageType,messageUId,conversationType,targetId,sentTime,content,localMsg)" +
                "values(?,?,?,?,?,?,?)";
            var localmsg = message.messageUId ? 0 : 1;
            this.database.execUpdateByParams(sql, [message.messageType, message.messageUId, message.conversationType, message.targetId, message.sentTime, JSON.stringify(message), localmsg]);
            if (callback) {
                var searchSql = "select t.id from t_message_" + this.database.userId + " t where t.sentTime = ? and t.conversationType = ? and t.targetId = ?";
                this.database.execSearchByParams(searchSql, [message.sentTime, conversationType, targetId], function (results, rowsAffected) {
                    rowsAffected && (message.messageId = results[0].id);
                    callback.onSuccess(message);
                });
            }
        };
        WebSQLDataProvider.prototype.removeMessage = function (conversationType, targetId, delMsgs, callback) {
            if (delMsgs.length == 0) {
                return;
            }
            var arr = [];
            for (var i = 0, len = delMsgs.length; i < len; i++) {
                arr.push(delMsgs[i].msgId);
            }
            var sql = "delete from t_message_" + this.database.userId + " where messageUId in (?)";
            this.database.execUpdateByParams(sql, arr.join(','));
        };
        WebSQLDataProvider.prototype.removeLocalMessage = function (conversationType, targetId, messageIds, callback) {
            if (messageIds.length == 0) {
                return;
            }
            var sql = "delete from t_message_" + this.database.userId + " where id in (" + messageIds.join(",") + ") and conversationType = ? and targetId = ? and localMsg = 1";
            this.database.execUpdateByParams(sql, [conversationType, targetId]);
            callback.onSuccess(true);
        };
        WebSQLDataProvider.prototype.updateMessage = function (message, callback) {
            var sql = "update t_message_" + this.database.userId + " set messageUId = ?,sentTime = ?,content = ?,localMsg = ? where id = ?";
            this.database.execUpdateByParams(sql, [message.messageUId, message.sentTime, JSON.stringify(message), message.isLocalMessage, message.messageId]);
        };
        //TODO
        WebSQLDataProvider.prototype.updateMessages = function (conversationType, targetId, key, value, callback) {
            throw new Error("Not implemented yet");
        };
        WebSQLDataProvider.prototype.clearMessages = function (conversationType, targetId, callback) {
            var sql = "delete from t_message_" + this.database.userId + " where conversationType = ? and targetId = ? ";
            this.database.execUpdateByParams(sql, [conversationType, targetId]);
            callback.onSuccess(true);
        };
        WebSQLDataProvider.prototype.getHistoryMessages = function (conversationType, targetId, timestrap, count, callback) {
            var sql = "select * from (select * from t_message_" + this.database.userId + " t where t.conversationType = ? and t.targetId = ? ";
            var params = [conversationType, targetId], results = [], me = this;
            if (timestrap !== 0) {
                var times = RongIMLib.RongIMClient._memoryStore.lastReadTime.get(conversationType + targetId);
                if (times != 0) {
                    sql += "and t.sentTime < ? ";
                    params.push(times);
                    timestrap = times;
                }
            }
            sql += "order by t.sentTime desc limit ?) order by sentTime ";
            params.push(count);
            me.database.execSearchByParams(sql, params, function (result, rowsAffected) {
                for (var i = 0, len = result.length; i < len; i++) {
                    results.push(JSON.parse(result[i].content));
                }
                if (len < count) {
                    RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(conversationType, targetId, timestrap, count - result.length, {
                        onSuccess: function (list, hasMsg) {
                            for (var i = 0, len = list.length; i < len; i++) {
                                !list[i].targetId ? list[i].targetId = targetId : null;
                                RongIMLib.RongIMClient._dataAccessProvider.addMessage(list[i].conversationType, list[i].targetId, list[i], {
                                    onSuccess: function (message) { },
                                    onError: function () { }
                                });
                            }
                            me.database.execSearchByParams(sql, params, function (result) {
                                var ret = [];
                                for (var i = 0, len = result.length; i < len; i++) {
                                    ret.push(JSON.parse(result[i].content));
                                }
                                callback.onSuccess(ret, hasMsg);
                            });
                        },
                        onError: function (error) { }
                    });
                }
                else {
                    //TODO å¯èƒ½å­˜åœ¨ len å’Œ count ç›¸ç­‰å¹¶ä¸”æœåŠ¡å™¨æ²¡æœ‰åŽ†å²æ¶ˆæ¯ï¼Œå¯¼è‡´å¤šæ‹‰å–ä¸€æ¬¡åŽ†å²æ¶ˆæ¯ã€‚
                    callback.onSuccess(results, true);
                    RongIMLib.RongIMClient._memoryStore.lastReadTime.set(conversationType + targetId, result[len - 1].sentTime);
                }
            });
        };
        WebSQLDataProvider.prototype.getTotalUnreadCount = function (callback, conversationTypes) {
            var sql = "select t.content from t_conversation_" + this.database.userId + " t";
            this.database.execSearch(sql, function (results) {
                var count = 0;
                if (conversationTypes) {
                    for (var j = 0, len = conversationTypes.length; j < len; j++) {
                        for (var i = 0, len_1 = results.length; i < len_1; i++) {
                            var conver = JSON.parse(results[i].content);
                            if (conver.conversationType == conversationTypes[j]) {
                                count += conver.unreadMessageCount;
                            }
                        }
                    }
                }
                else {
                    for (var i = 0, len = results.length; i < len; i++) {
                        var conver = JSON.parse(results[i].content);
                        count += conver.unreadMessageCount;
                    }
                }
                callback.onSuccess(count);
            });
        };
        WebSQLDataProvider.prototype.getConversationUnreadCount = function (conversationTypes, callback) {
            if (conversationTypes.length == 0) {
                callback.onSuccess(0);
                return;
            }
            var sql = "select t.content from t_conversation_" + this.database.userId + " t where t.conversationType in (" + conversationTypes.join(",") + ")";
            this.database.execSearchByParams(sql, [], function (results) {
                var count = 0;
                for (var i = 0, len = results.length; i < len; i++) {
                    var conver = JSON.parse(results[i].content);
                    count += conver.unreadMessageCount;
                }
                callback.onSuccess(count);
            });
        };
        WebSQLDataProvider.prototype.getUnreadCount = function (conversationType, targetId, callback) {
            var sql = "select t.content from t_conversation_" + this.database.userId + " t where t.conversationType = ? and t.targetId = ?";
            this.database.execSearchByParams(sql, [conversationType, targetId], function (results) {
                var count = 0;
                for (var i = 0, len = results.length; i < len; i++) {
                    var conver = JSON.parse(results[i].content);
                    count += conver.unreadMessageCount;
                }
                callback.onSuccess(count);
            });
        };
        WebSQLDataProvider.prototype.clearUnreadCountByTimestamp = function (conversationType, targetId, timestamp, callback) {
            callback.onSuccess(true);
        };
        WebSQLDataProvider.prototype.clearUnreadCount = function (conversationType, targetId, callback) {
            var sSql = "select * from t_conversation_" + this.database.userId + " t where t.conversationType = ? and t.targetId = ?";
            var uSql = "update t_conversation_" + this.database.userId + " set content = ? where conversationType = ? and targetId = ?", me = this;
            this.database.execSearchByParams(sSql, [conversationType, targetId], function (results, rowsAffected) {
                var mentioneds = RongIMLib.RongIMClient._storageProvider.getItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId);
                if (mentioneds) {
                    var info = JSON.parse(mentioneds);
                    delete info[conversationType + "_" + targetId];
                    if (!RongIMLib.MessageUtil.isEmpty(info)) {
                        RongIMLib.RongIMClient._storageProvider.setItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId, JSON.stringify(info));
                    }
                    else {
                        RongIMLib.RongIMClient._storageProvider.removeItem("mentioneds_" + RongIMLib.Bridge._client.userId + '_' + conversationType + '_' + targetId);
                    }
                }
                if (results.length == 0 && !rowsAffected) {
                    callback.onSuccess(false);
                }
                else {
                    var conver = JSON.parse(results[0].content);
                    conver.unreadMessageCount = 0;
                    conver.mentionedMsg = null;
                    me.database.execUpdateByParams(uSql, [JSON.stringify(conver), conversationType, targetId]);
                    callback.onSuccess(true);
                }
            });
        };
        WebSQLDataProvider.prototype.setConversationToTop = function (conversationType, targetId, isTop, callback) {
            var sql = "update t_conversation_" + this.database.userId + " set isTop = ? where conversationType = ? and targetId = ?";
            this.database.execUpdateByParams(sql, [conversationType, isTop, targetId]);
            callback.onSuccess(true);
        };
        WebSQLDataProvider.prototype.setConversationHidden = function (conversationType, targetId, isHidden) {
        };
        WebSQLDataProvider.prototype.setMessageExtra = function (messageUId, value, callback) {
            var sSql = "select t.content from t_message_" + this.database.userId + " t where t.messageUId = ?";
            var uSql = "UPADTE t_message_" + this.database.userId + " t SET t.content = ? where t.messageUId = ?";
            this.database.execSearchByParams(sSql, [messageUId], function (results, rowsAffected) {
                if (results.length == 0 && !rowsAffected) {
                    callback.onSuccess(false);
                }
                else {
                    var msg = JSON.parse(results[0].content);
                    msg.extra = value;
                    this.database.execUpdateByParams(uSql, [JSON.stringify(msg), messageUId]);
                }
            });
        };
        WebSQLDataProvider.prototype.setMessageReceivedStatus = function (messageUId, receivedStatus, callback) {
            var sSql = "select t.content from t_message_" + this.database.userId + " t where t.messageUId = ?";
            var uSql = "update t_message_" + this.database.userId + " set content = ? where messageUId = ?", me = this;
            this.database.execSearchByParams(sSql, [messageUId], function (results, rowsAffected) {
                if (results.length == 0 && !rowsAffected) {
                    callback.onSuccess(false);
                }
                else {
                    var msg = JSON.parse(results[0].content);
                    msg.receivedStatus = receivedStatus;
                    me.database.execUpdateByParams(uSql, [JSON.stringify(msg), messageUId]);
                    callback.onSuccess(true);
                }
            });
        };
        WebSQLDataProvider.prototype.dropTable = function (sql) {
            this.database.execUpdate(sql);
        };
        WebSQLDataProvider.prototype.setServerInfo = function (info) {
        };
        WebSQLDataProvider.prototype.setMessageSentStatus = function (messageUId, sentStatus, callback) {
            var sSql = "select t.content from t_message_" + this.database.userId + " t where t.messageUId = ?";
            var uSql = "update t_message_" + this.database.userId + " set content = ? where messageUId = ?";
            this.database.execSearchByParams(sSql, [messageUId], function (results, rowsAffected) {
                if (results.length == 0 && !rowsAffected) {
                    callback.onSuccess(false);
                }
                else {
                    var msg = JSON.parse(results[0].content);
                    msg.sentStatus = sentStatus;
                    this.database.execUpdateByParams(uSql, [JSON.stringify(msg), messageUId]);
                    callback.onSuccess(true);
                }
            });
        };
        WebSQLDataProvider.prototype.getUnreadMentionedMessages = function (conversationType, targetId) {
            return null;
        };
        WebSQLDataProvider.prototype.searchConversationByContent = function (keyword, callback, conversationTypes) {
            callback.onSuccess([]);
        };
        WebSQLDataProvider.prototype.searchMessageByContent = function (conversationType, targetId, keyword, timestamp, count, total, callback) {
            callback.onSuccess([]);
        };
        WebSQLDataProvider.prototype.getDelaTime = function () {
            return 0;
        };
        WebSQLDataProvider.prototype.getUserStatus = function (userId, callback) {
            callback.onSuccess(new RongIMLib.UserStatus());
        };
        WebSQLDataProvider.prototype.setUserStatus = function (userId, callback) {
            callback.onSuccess(true);
        };
        WebSQLDataProvider.prototype.subscribeUserStatus = function (userIds, callback) {
            callback.onSuccess(true);
        };
        WebSQLDataProvider.prototype.clearListeners = function () {
        };
        WebSQLDataProvider.prototype.setOnReceiveStatusListener = function (callback) {
            callback();
        };
        return WebSQLDataProvider;
    }());
    RongIMLib.WebSQLDataProvider = WebSQLDataProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var CookieProvider = (function () {
        function CookieProvider() {
            this.prefix = 'rong_';
        }
        CookieProvider.prototype.setItem = function (composedKey, object, isSave) {
            if (composedKey.indexOf(this.prefix) == -1) {
                composedKey = this.prefix + composedKey;
            }
            if (isSave) {
                var exp = new Date();
                exp.setTime(exp.getTime() + RongIMLib.RongIMClient._memoryStore.depend.cookieValidity * 24 * 3600 * 1000);
                document.cookie = composedKey + "=" + decodeURIComponent(object) + ";path=/;expires=" + exp.toGMTString();
            }
            else {
                document.cookie = composedKey + "=" + decodeURIComponent(object) + ";path=/;";
            }
        };
        CookieProvider.prototype.getItem = function (composedKey) {
            if (composedKey) {
                if (composedKey.indexOf(this.prefix) == -1) {
                    composedKey = this.prefix + composedKey;
                }
                composedKey = composedKey.replace(/\|/, "\\|");
            }
            var arr = document.cookie.match(new RegExp("(^| )" + composedKey + "=([^;]*)(;|$)"));
            if (arr != null) {
                return (arr[2]);
            }
            return null;
        };
        CookieProvider.prototype.removeItem = function (composedKey) {
            if (composedKey.indexOf(this.prefix) == -1) {
                composedKey = this.prefix + composedKey;
            }
            if (this.getItem(composedKey)) {
                document.cookie = composedKey + "=;path=/;expires=Thu, 01-Jan-1970 00:00:01 GMT";
            }
        };
        CookieProvider.prototype.getItemKey = function (regStr) {
            var arrs = document.cookie.match(new RegExp("(^| )rong_navi\\w+?=([^;]*)(;|$)")), val = "";
            if (arrs) {
                for (var i = 0, len = arrs.length; i < len; i++) {
                    if (arrs[i].indexOf(regStr) > -1) {
                        val = arrs[i];
                        break;
                    }
                }
            }
            return val ? val.split("=")[0].replace(/^\s/, "") : null;
        };
        CookieProvider.prototype.clearItem = function () {
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g), me = this;
            if (keys) {
                for (var i = keys.length; i--;) {
                    if (keys[i].indexOf(me.prefix) > -1) {
                        document.cookie = keys[i] + "=0;path=/;expires=" + new Date(0).toUTCString();
                    }
                }
            }
        };
        //å•ä½ï¼šå­—èŠ‚
        CookieProvider.prototype.onOutOfQuota = function () {
            return 4 * 1024;
        };
        return CookieProvider;
    }());
    RongIMLib.CookieProvider = CookieProvider;
    var MemeoryProvider = (function () {
        function MemeoryProvider() {
            this._memeoryStore = {};
            this.prefix = "rong_";
        }
        MemeoryProvider.prototype.setItem = function (composedKey, object) {
            this._memeoryStore[composedKey] = decodeURIComponent(object);
        };
        MemeoryProvider.prototype.getItem = function (composedKey) {
            return this._memeoryStore[composedKey];
        };
        MemeoryProvider.prototype.removeItem = function (composedKey) {
            if (this.getItem(composedKey)) {
                delete this._memeoryStore[composedKey];
            }
        };
        MemeoryProvider.prototype.getItemKey = function (regStr) {
            var me = this, item = null, reg = new RegExp(regStr + "\\w+");
            for (var key in me._memeoryStore) {
                var arr = key.match(reg);
                if (arr) {
                    item = key;
                }
            }
            return item;
        };
        MemeoryProvider.prototype.clearItem = function () {
            var me = this;
            for (var key in me._memeoryStore) {
                delete me._memeoryStore[key];
            }
        };
        //å•ä½ï¼šå­—èŠ‚
        MemeoryProvider.prototype.onOutOfQuota = function () {
            return 4 * 1024;
        };
        return MemeoryProvider;
    }());
    RongIMLib.MemeoryProvider = MemeoryProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var LocalStorageProvider = (function () {
        // static _instance: LocalStorageProvider = new LocalStorageProvider();
        function LocalStorageProvider() {
            this.prefix = 'rong_';
            this._host = "";
            var d = new Date(), m = d.getMonth() + 1, date = d.getFullYear() + '/' + (m.toString().length == 1 ? '0' + m : m) + '/' + d.getDate(), nowDate = new Date(date).getTime();
            for (var key in localStorage) {
                if (key.lastIndexOf('RECEIVED') > -1) {
                    var recObj = JSON.parse(localStorage.getItem(key));
                    for (var key_1 in recObj) {
                        nowDate - recObj[key_1].dealtime > 0 && (delete recObj[key_1]);
                    }
                    if (RongIMLib.ObjectTools.isEmpty(recObj)) {
                        localStorage.removeItem(key);
                    }
                    else {
                        localStorage.setItem(key, JSON.stringify(recObj));
                    }
                }
                if (key.lastIndexOf('SENT') > -1) {
                    var sentObj = JSON.parse(localStorage.getItem(key));
                    nowDate - sentObj.dealtime > 0 && (localStorage.removeItem(key));
                }
            }
        }
        LocalStorageProvider.prototype.setItem = function (composedKey, object) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                localStorage.setItem(composedKey, object);
            }
        };
        LocalStorageProvider.prototype.getItem = function (composedKey) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                return localStorage.getItem(composedKey ? composedKey : "");
            }
            return "";
        };
        LocalStorageProvider.prototype.getItemKey = function (composedStr) {
            var item = "";
            for (var key in localStorage) {
                if (key.indexOf(composedStr) > -1) {
                    item = key;
                    break;
                }
            }
            return item;
        };
        LocalStorageProvider.prototype.removeItem = function (composedKey) {
            if (composedKey) {
                composedKey.indexOf(this.prefix) == -1 && (composedKey = this.prefix + composedKey);
                localStorage.removeItem(composedKey.toString());
            }
        };
        LocalStorageProvider.prototype.clearItem = function () {
            var me = this;
            for (var key in localStorage) {
                if (key.indexOf(me.prefix) > -1) {
                    me.removeItem(key);
                }
            }
        };
        //å•ä½ï¼šå­—èŠ‚
        LocalStorageProvider.prototype.onOutOfQuota = function () {
            return JSON.stringify(localStorage).length;
        };
        return LocalStorageProvider;
    }());
    RongIMLib.LocalStorageProvider = LocalStorageProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var UserDataProvider = (function () {
        function UserDataProvider() {
            this.opersistName = 'RongIMLib';
            this.keyManager = 'RongUserDataKeyManager';
            this._host = "";
            this.prefix = "rong_";
            this.oPersist = document.createElement("div");
            this.oPersist.style.display = "none";
            this.oPersist.style.behavior = "url('#default#userData')";
            document.body.appendChild(this.oPersist);
            this.oPersist.load(this.opersistName);
        }
        UserDataProvider.prototype.setItem = function (key, value) {
            key && key.indexOf(this.prefix) == -1 && (key = this.prefix + key);
            this.oPersist.setAttribute(key, value);
            var keyNames = this.getItem(this.keyManager);
            keyNames ? keyNames.indexOf(key) == -1 && (keyNames += ',' + key) : (keyNames = key);
            this.oPersist.setAttribute(this.prefix + this.keyManager, keyNames);
            this.oPersist.save(this.opersistName);
        };
        UserDataProvider.prototype.getItem = function (key) {
            key && key.indexOf(this.prefix) == -1 && (key = this.prefix + key);
            return key ? this.oPersist.getAttribute(key) : key;
        };
        UserDataProvider.prototype.removeItem = function (key) {
            key && key.indexOf(this.prefix) == -1 && (key = this.prefix + key);
            this.oPersist.removeAttribute(key);
            this.oPersist.save(this.opersistName);
            var keyNames = this.getItem(this.keyManager), keyNameArray = keyNames && keyNames.split(',') || [];
            for (var i = 0, len = keyNameArray.length; i < len; i++) {
                if (keyNameArray[i] == key) {
                    keyNameArray.splice(i, 1);
                }
            }
            this.oPersist.setAttribute(this.prefix + this.keyManager, keyNameArray.join(','));
            this.oPersist.save(this.opersistName);
        };
        UserDataProvider.prototype.getItemKey = function (composedStr) {
            var item = null, keyNames = this.getItem(this.keyManager), keyNameArray = keyNames && keyNames.split(',') || [], me = this;
            if (keyNameArray.length) {
                for (var i = 0, len = keyNameArray.length; i < len; i++) {
                    if (keyNameArray[i] && keyNameArray[i].indexOf(composedStr) > -1) {
                        item = keyNameArray[i];
                        break;
                    }
                }
            }
            return item;
        };
        UserDataProvider.prototype.clearItem = function () {
            var keyNames = this.getItem(this.keyManager), keyNameArray = [], me = this;
            keyNames && (keyNameArray = keyNames.split(','));
            if (keyNameArray.length) {
                for (var i = 0, len = keyNameArray.length; i < len; i++) {
                    keyNameArray[i] && me.removeItem(keyNameArray[i]);
                }
                me.removeItem(me.keyManager);
            }
        };
        UserDataProvider.prototype.onOutOfQuota = function () {
            return 10 * 1024 * 1024;
        };
        return UserDataProvider;
    }());
    RongIMLib.UserDataProvider = UserDataProvider;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var FeatureDectector = (function () {
        function FeatureDectector() {
            this.script = document.createElement("script");
            this.head = document.getElementsByTagName("head")[0];
            RongIMLib.Transportations._TransportType = RongIMLib.Socket.WEBSOCKET;
            if ("WebSocket" in window && "ArrayBuffer" in window && WebSocket.prototype.CLOSED === 3 && !RongIMLib.RongIMClient._memoryStore.depend.isPolling) {
                var str = RongIMLib.RongIMClient._memoryStore.depend.protobuf;
                this.script.src = str;
                this.head.appendChild(this.script);
            }
            else {
                RongIMLib.Transportations._TransportType = "xhr-polling";
                window["Modules"] = Polling;
            }
        }
        return FeatureDectector;
    }());
    RongIMLib.FeatureDectector = FeatureDectector;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var FeaturePatcher = (function () {
        function FeaturePatcher() {
        }
        FeaturePatcher.prototype.patchAll = function () {
            this.patchJSON();
            this.patchForEach();
        };
        FeaturePatcher.prototype.patchForEach = function () {
            if (!Array.forEach) {
                Array.forEach = function (arr, func) {
                    for (var i = 0; i < arr.length; i++) {
                        func.call(arr, arr[i], i, arr);
                    }
                };
            }
        };
        FeaturePatcher.prototype.patchJSON = function () {
            if (!window["JSON"]) {
                window["JSON"] = (function () {
                    function JSON() {
                    }
                    JSON.parse = function (sJSON) {
                        return eval('(' + sJSON + ')');
                    };
                    JSON.stringify = function (value) {
                        return this.str("", { "": value });
                    };
                    JSON.str = function (key, holder) {
                        var i, k, v, length, mind = "", partial, value = holder[key], me = this;
                        if (value && typeof value === "object" && typeof value.toJSON === "function") {
                            value = value.toJSON(key);
                        }
                        switch (typeof value) {
                            case "string":
                                return me.quote(value);
                            case "number":
                                return isFinite(value) ? String(value) : "null";
                            case "boolean":
                            case "null":
                                return String(value);
                            case "object":
                                if (!value) {
                                    return "null";
                                }
                                partial = [];
                                if (Object.prototype.toString.apply(value) === "[object Array]") {
                                    length = value.length;
                                    for (i = 0; i < length; i += 1) {
                                        partial[i] = me.str(i, value) || "null";
                                    }
                                    v = partial.length === 0 ? "[]" : "[" + partial.join(",") + "]";
                                    return v;
                                }
                                for (k in value) {
                                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                                        v = me.str(k, value);
                                        if (v) {
                                            partial.push(me.quote(k) + ":" + v);
                                        }
                                    }
                                }
                                v = partial.length === 0 ? "{}" : "{" + partial.join(",") + "}";
                                return v;
                        }
                    };
                    JSON.quote = function (string) {
                        var me = this;
                        me.rx_escapable.lastIndex = 0;
                        return me.rx_escapable.test(string) ? '"' + string.replace(me.rx_escapable, function (a) {
                            var c = me.meta[a];
                            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                        }) + '"' : '"' + string + '"';
                    };
                    JSON.rx_escapable = new RegExp('[\\\"\\\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]', "g");
                    JSON.meta = {
                        "\b": "\\b",
                        "   ": "\\t",
                        "\n": "\\n",
                        "\f": "\\f",
                        "\r": "\\r",
                        '"': '\\"',
                        "''": "\\''",
                        "\\": "\\\\"
                    };
                    return JSON;
                }());
            }
        };
        return FeaturePatcher;
    }());
    RongIMLib.FeaturePatcher = FeaturePatcher;
})(RongIMLib || (RongIMLib = {}));
var RongIMLib;
(function (RongIMLib) {
    var ObjectTools = (function () {
        function ObjectTools() {
        }
        ObjectTools.isEmpty = function (obj) {
            var empty = true;
            for (var key in obj) {
                empty = false;
                break;
            }
            return empty;
        };
        ObjectTools.buildOptions = function (one, opts, protocol) {
            if (typeof one == 'object') {
                for (var key in opts) {
                    if (key == 'fileUploadURL' || key == 'fileQNURL' || key == 'protobuf' || key == 'long' || key == 'byteBuffer' || key == 'navi' || key == 'api' ||
                        key == 'emojiImage' || key == 'voiceLibamr' || key == 'voicePCMdata' || key == 'voiceSwfobjct' || key == 'voicePlaySwf' || key == 'callFile') {
                        one[key] && (opts[key] = one[key]);
                    }
                    else {
                        one[key] && (opts[key] = one[key]);
                    }
                }
            }
            return opts;
        };
        return ObjectTools;
    }());
    RongIMLib.ObjectTools = ObjectTools;
    var PublicServiceMap = (function () {
        function PublicServiceMap() {
            this.publicServiceList = [];
        }
        PublicServiceMap.prototype.get = function (publicServiceType, publicServiceId) {
            for (var i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (this.publicServiceList[i].conversationType == publicServiceType && publicServiceId == this.publicServiceList[i].publicServiceId) {
                    return this.publicServiceList[i];
                }
            }
        };
        PublicServiceMap.prototype.add = function (publicServiceProfile) {
            var isAdd = true, me = this;
            for (var i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == publicServiceProfile.conversationType && publicServiceProfile.publicServiceId == me.publicServiceList[i].publicServiceId) {
                    this.publicServiceList.unshift(this.publicServiceList.splice(i, 1)[0]);
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                this.publicServiceList.unshift(publicServiceProfile);
            }
        };
        PublicServiceMap.prototype.replace = function (publicServiceProfile) {
            var me = this;
            for (var i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == publicServiceProfile.conversationType && publicServiceProfile.publicServiceId == me.publicServiceList[i].publicServiceId) {
                    me.publicServiceList.splice(i, 1, publicServiceProfile);
                    break;
                }
            }
        };
        PublicServiceMap.prototype.remove = function (conversationType, publicServiceId) {
            var me = this;
            for (var i = 0, len = this.publicServiceList.length; i < len; i++) {
                if (me.publicServiceList[i].conversationType == conversationType && publicServiceId == me.publicServiceList[i].publicServiceId) {
                    this.publicServiceList.splice(i, 1);
                    break;
                }
            }
        };
        return PublicServiceMap;
    }());
    RongIMLib.PublicServiceMap = PublicServiceMap;
    /**
     * ä¼šè¯å·¥å…·ç±»ã€‚
     */
    var ConversationMap = (function () {
        function ConversationMap() {
            this.conversationList = [];
        }
        ConversationMap.prototype.get = function (conversavtionType, targetId) {
            for (var i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType == conversavtionType && this.conversationList[i].targetId == targetId) {
                    return this.conversationList[i];
                }
            }
            return null;
        };
        ConversationMap.prototype.add = function (conversation) {
            var isAdd = true;
            for (var i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.unshift(this.conversationList.splice(i, 1)[0]);
                    isAdd = false;
                    break;
                }
            }
            if (isAdd) {
                this.conversationList.unshift(conversation);
            }
        };
        /**
         * [replace æ›¿æ¢ä¼šè¯]
         * ä¼šè¯æ•°ç»„å­˜åœ¨çš„æƒ…å†µä¸‹è°ƒç”¨addæ–¹æ³•ä¼šæ˜¯å½“å‰ä¼šè¯è¢«æ›¿æ¢ä¸”è¿”å›žåˆ°ç¬¬ä¸€ä¸ªä½ç½®ï¼Œå¯¼è‡´ç”¨æˆ·æœ¬åœ°ä¸€äº›è®¾ç½®å¤±æ•ˆï¼Œæ‰€ä»¥æä¾›replaceæ–¹æ³•
         */
        ConversationMap.prototype.replace = function (conversation) {
            for (var i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.splice(i, 1, conversation);
                    break;
                }
            }
        };
        ConversationMap.prototype.remove = function (conversation) {
            for (var i = 0, len = this.conversationList.length; i < len; i++) {
                if (this.conversationList[i].conversationType === conversation.conversationType && this.conversationList[i].targetId === conversation.targetId) {
                    this.conversationList.splice(i, 1);
                    break;
                }
            }
        };
        return ConversationMap;
    }());
    RongIMLib.ConversationMap = ConversationMap;
    var CheckParam = (function () {
        function CheckParam() {
        }
        CheckParam.getInstance = function () {
            if (!CheckParam._instance) {
                CheckParam._instance = new CheckParam();
            }
            return CheckParam._instance;
        };
        CheckParam.prototype.check = function (f, position, d) {
            var c = arguments.callee.caller;
            //"_client" in Bridge ||
            if (RongIMLib.RongIMClient._dataAccessProvider || d) {
                for (var g = 0, e = c.arguments.length; g < e; g++) {
                    if (!new RegExp(this.getType(c.arguments[g])).test(f[g])) {
                        throw new Error("The index of " + g + " parameter was wrong type " + this.getType(c.arguments[g]) + " [" + f[g] + "] -> position:" + position);
                    }
                }
            }
            else {
                throw new Error("The parameter is incorrect or was not yet instantiated RongIMClient -> position:" + position);
            }
        };
        CheckParam.prototype.getType = function (str) {
            var temp = Object.prototype.toString.call(str).toLowerCase();
            return temp.slice(8, temp.length - 1);
        };
        CheckParam.prototype.checkCookieDisable = function () {
            document.cookie = "checkCookie=1";
            var arr = document.cookie.match(new RegExp("(^| )checkCookie=([^;]*)(;|$)")), isDisable = false;
            if (!arr) {
                isDisable = true;
            }
            document.cookie = "checkCookie=1;expires=Thu, 01-Jan-1970 00:00:01 GMT";
            return isDisable;
        };
        return CheckParam;
    }());
    RongIMLib.CheckParam = CheckParam;
    var LimitableMap = (function () {
        function LimitableMap(limit) {
            this.map = {};
            this.keys = [];
            this.limit = limit || 10;
        }
        LimitableMap.prototype.set = function (key, value) {
            if (this.map.hasOwnProperty(key)) {
                if (this.keys.length === this.limit) {
                    var firstKey = this.keys.shift();
                    delete this.map[firstKey];
                }
                this.keys.push(key);
            }
            this.map[key] = value;
        };
        LimitableMap.prototype.get = function (key) {
            return this.map[key] || 0;
        };
        LimitableMap.prototype.remove = function (key) {
            delete this.map[key];
        };
        return LimitableMap;
    }());
    RongIMLib.LimitableMap = LimitableMap;
    var RongAjax = (function () {
        function RongAjax(options) {
            var me = this;
            me.xmlhttp = null;
            me.options = options;
            var hasCORS = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
            if ("undefined" != typeof XMLHttpRequest && hasCORS) {
                me.xmlhttp = new XMLHttpRequest();
            }
            else if ("undefined" != typeof XDomainRequest) {
                me.xmlhttp = new XDomainRequest();
            }
            else {
                me.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        RongAjax.prototype.send = function (callback) {
            var me = this;
            me.options.url || (me.options.url = "http://upload.qiniu.com/putb64/-1");
            me.xmlhttp.onreadystatechange = function () {
                if (me.xmlhttp.readyState == 4) {
                    if (me.options.type) {
                        callback();
                    }
                    else {
                        callback(JSON.parse(me.xmlhttp.responseText.replace(/'/g, '"')));
                    }
                }
            };
            me.xmlhttp.open("POST", me.options.url, true);
            me.xmlhttp.withCredentials = false;
            if ("setRequestHeader" in me.xmlhttp) {
                if (me.options.type) {
                    me.xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
                }
                else {
                    me.xmlhttp.setRequestHeader("Content-type", "application/octet-stream");
                    me.xmlhttp.setRequestHeader('Authorization', "UpToken " + me.options.token);
                }
            }
            me.xmlhttp.send(me.options.type ? "appKey=" + me.options.appKey + "&deviceId=" + me.options.deviceId + "&timestamp=" + me.options.timestamp + "&deviceInfo=" + me.options.deviceInfo + "&privateInfo=" + JSON.stringify(me.options.privateInfo) : me.options.base64);
        };
        return RongAjax;
    }());
    RongIMLib.RongAjax = RongAjax;
})(RongIMLib || (RongIMLib = {}));
//# sourceMappingURL=RongIMLib.js.map