'use strict';
(function(RongIM) {
  var components = RongIM.components;
  var Conversation = RongIM.Conversation;
  var im = RongIM.im;

  var conversationList = {
    name: 'conversation-list',
    template: `
      <div class="rong-conversation-box">
          <div class="rong-conversation-list">
              <div class="rong-conversation" v-for="conversation in conversationList" @click="show(conversation)">
                  <div class="rong-conversation-user">
                      <div class="rong-conversation-avatar rong-avatar" :style="{'background-image': 'url(' + conversation._target.portrait + ')'}"></div>
                  </div>
                  <div class="rong-conversation-title">{{conversation._target.name}}</div>
                  <div class="rong-conversation-message">
                      <span class="rong-conversation-sendername">{{conversation._sender.name}}:</span>
                      <em class="rong-conversation-content">{{conversation.latestMessage._content}}</em>
                  </div>
                  <div class="rong-conversation-senttime">{{conversation._sentTime}}</div>
              </div>
          </div>
      </div>
        `,
    data: function() {
      return {
        conversationList: []
      };
    },
    mounted: function(){
      mounted(this);
    },
    created: function() {
      getConversationList(this);
    },
    methods: {
      show: function(conversation){
        var conversationType = conversation.conversationType;
        var targetId = conversation.targetId;

        this.$router.push({
            name: 'conversation',
            params: {
              conversationType: conversationType,
              targetId: targetId
          }
        });
      }
    }
  };

  function mounted(ctx){
    var Conversation = RongIM.Conversation;
    Conversation.watch(function(){
      getConversationList(ctx);
    });
  }
  function getConversationList(ctx) {
    var Conversation = RongIM.Conversation;
    Conversation.get(function(error, conversationList) {
      if (error) {
        console.error('Conversation.get Error: %s', error);
        return;
      }
      ctx.conversationList = conversationList;
    });
  }

  components.conversationList = conversationList;
})(RongIM, {
  Vue: Vue
});