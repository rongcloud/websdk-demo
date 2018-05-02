'use strict';
(function(RongIM) {
    var components = RongIM.components;

    var conversationList = components.conversationList;
    var messageList = components.messageList;

    var routes = {
        linkActiveClass: 'rong-selected',
        maps: [{
            path: '/conversation/:conversationType/:targetId',
            name: 'conversation',
            components: {
                list: conversationList,
                chat: messageList
            }
        },{
            path: '/',
            components: {
                list: conversationList
            }
        }]
    };
    RongIM.routes = routes;
})(RongIM, {});