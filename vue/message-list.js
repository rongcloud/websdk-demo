'use strict';
(function(RongIM) {
  var components = RongIM.components;

  var messageList = {
    name: 'message-list',
    template: `
    <div class="rong-main">
        <div class="rong-message-list">
            <div v-for="message in messageList" :class="['rong-message rong-message-' + message._direction ]">
                <div :class="['rong-avatar rong-message-' + message._direction + '-avatar']" :style="{'background-image': 'url(' + message._sender.portrait + ')'}"></div>
                <div class="rong-message-content">{{message._content}}</div>
                <div class="rong-message-senttime">
                    <em>{{message._sentTime}}</em>
                </div>
                <div class="rong-clearfix"></div>
            </div>
        </div>

        <div class="rong-edior-box">
          <div class="rong-editor-input">
            <textarea v-model="content" name="editor-input" class="rong-input rong-editor-input-content" placeholder="说点什么..."  @keyup.enter="send"></textarea>
          </div>
        </div>
    </div>
    `,
    data: function() {
      return {
        content: '',
        messageList: []
      };
    },
    created: function() {
      getHistoryMessages(this);
    },
    mounted: function(){
      mounted(this);
    },
    methods: {
      send: function() {
        sendMessage(this);
      }
    },
    watch: {
      $route: function(to, from) {
        getHistoryMessages(this);
      }
    }
  };

  var getConversation = function(ctx){
    var params = ctx.$route.params;
    var type = +params.conversationType;
    var id = params.targetId;
    return {
      type: type,
      id: id
    };
  };

  var isActive = function(message, ctx){
    var conversation = getConversation(ctx);
    var type = conversation.type;
    var id = conversation.id;
    return (message.conversationType == type && message.targetId == id);
  };
  function mounted(ctx){
    var Message = RongIM.Message;
    Message.watch(function(message){
      
      if (isActive(message, ctx)) {
        ctx.messageList.push(message);
      }
    });
  };

  function sendMessage(ctx) {
    var Message = RongIM.Message;
    var content = ctx.content;
    var conversation = getConversation(ctx);

    Message.sendTxt({
      content: content,
      type: conversation.type,
      targetId: conversation.id
    }, function(error, message) {
      ctx.messageList.push(message);
      ctx.content = '';
    });
  }

  function getHistoryMessages(ctx) {
    var conversation = getConversation(ctx);
    RongIM.Message.get({
      type: conversation.type,
      targetId: conversation.id
    }, function(error, messageList) {
      if (error) {
        console.error('Conversation.get Error: %s', error);
        return;
      }
      ctx.messageList = messageList;
    });
  }

  components.messageList = messageList;
})(RongIM, {
  Vue: Vue
});