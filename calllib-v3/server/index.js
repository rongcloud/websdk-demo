var app = require('express')(),
  setting = require('./setting'),
  http = require('http'),
  bodyParser = require("body-parser"),
  RongSDK = require('rongcloud-sdk')({
    appkey: setting.appkey,
    secret: setting.secret
  }),
  port = setting.port;

var Group = RongSDK.Group,
  User = RongSDK.User;

var groupId, userList;


// 允许跨域
var allowCors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

app.use(allowCors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', function (req, res) {
  var params = req.params,
    body = req.body;
  var userId = body.userId;
  var user = {
    id: userId,
    name: userId,
    portrait: '  '
  };
  var token;
  User.register(user).then(function (result) {
    console.log('register result', result);
    token = result.token;
    var joinGroup, joinParams;
    if (!groupId) {
      groupId = +new Date() + '';
      joinGroup = Group.create;
      joinParams = {
        id: groupId,
        name: groupId,
        members: [{ id: userId }]
      };
      console.log('createParams', joinParams);
    } else {
      joinGroup = Group.join;
      joinParams = {
        id: groupId,
        member: { id: userId }
      };
      console.log('joinParams', joinParams);
    }
    return joinGroup(joinParams);
  }).then(function (result) {
    return Group.get({ id: groupId });
  }).then(function (result) {
    result.userId = userId;
    result.groupId = groupId;
    result.token = token;
    console.log('result', result);
    return res.send(result);
  }).catch(function (e) {
    console.error('error', e);
  });
});

app.post('/getMembers', function (req, res) {
  var params = req.params,
    body = req.body;
  Group.get({
    id: body.groupId || groupId
  }).then(function (result) {
    return res.send(result);
  });
});

app.listen(port, function () {
  console.log(
`CallLib Demo Server 启动成功
AppKey: ${setting.appkey} (Web 需一致)
Server 地址: http://localhost:${port}
请将此 Server 地址填入 CallLib Demo Web 的 setting.js 文件
  `);
});