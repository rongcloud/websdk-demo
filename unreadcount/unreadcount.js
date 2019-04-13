(function (win) {
  let utils = {
    isNumber: (num) => {
      return Object.prototype.toString.call(num) === '[object Number]';
    }
  };
  let Cache = {
    set: (key, value) => {
      localStorage.setItem(key, value);
    },
    get: (key) => {
      return localStorage.getItem(key);
    },
    remove: (key) => {
      localStorage.removeItem(key);
    }
  };
  let getUId = (conversationType, targetId) => {
    return ['rongunread', conversationType, targetId].join('_');
  };
  let getTimes = (conversationType, targetId) => {
    let uid = getUId(conversationType, targetId);
    let times = Cache.get(uid) || "[]";
    return JSON.parse(times);
  };
  let add = (conversationType, targetId, message) => {
    let uid = getUId(conversationType, targetId);
    let times = getTimes(conversationType, targetId);
    let { sentTime } = message;
    if (utils.isNumber(sentTime)) {
      times.push(sentTime);
      Cache.set(uid, JSON.stringify(times));
    }
  }
  let get = (conversationType, targetId) => {
    let times = getTimes(conversationType, targetId);
    return times.length;
  }
  let remove = (conversationType, targetId, message) => {
    let uid = getUId(conversationType, targetId);
    let times = getTimes(conversationType, targetId);
    let { sentTime } = message;
    if (utils.isNumber(sentTime)) {
      times = times.filter((time) => { return time > sentTime });
      if (times.length == 0) {
        Cache.remove(uid);
      } else {
        Cache.set(uid, JSON.stringify(times));
      }
    }
  }

  win.UnreadTools = {
    add,
    get,
    remove
  };
})(window);

/* 
示例：

// 设置
let conversationType = 1;
let targetId = 'test01'
let message = {
  sentTime: 839381023
}
UnreadTools.set(conversationType, targetId, message);

// 获取
let unreadCount = UnreadTools.get(conversationType, targetId);

// 移除
UnreadTools.remove(conversationType, targetId);
*/