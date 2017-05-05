/**
 * Created by wangchengkuo on 17/4/12.
 */
function getPublicInfo(instance,_options) {
    var options = {
        props: ['stat'],
        template: 'template/public-info.html',
        methods: {
            goPublicChat: function () {
                this.stat.currentView = 'publicChat';
            },
            unsubscribePublic: function () {
                var that=this;
                var publicServiceType = RongIMLib.ConversationType.APP_PUBLIC_SERVICE; //固定值
                if(this.stat.currentPublic.conversationType == 8){
                    publicServiceType = RongIMLib.ConversationType.PUBLIC_SERVICE
                }
                var publicServiceId = this.stat.currentPublic.publicServiceId;
                instance.unsubscribePublicService(publicServiceType, publicServiceId, {
                    onSuccess: function (list) {
                        console.log("取消订阅公众号 成功");
                        console.log(list);
                        that.stat.currentPublic.hasFollowed=false;
                    },
                    onError: function (error) {
                        console.log("取消订阅公众号 失败");
                    }
                });
            },
            subscribePublic: function () {
                var that=this;

                var publicServiceType = RongIMLib.ConversationType.APP_PUBLIC_SERVICE; //固定值
                if(this.stat.currentPublic.conversationType == 8){
                    publicServiceType = RongIMLib.ConversationType.PUBLIC_SERVICE
                }
                var publicServiceId = this.stat.currentPublic.publicServiceId;
                instance.subscribePublicService(publicServiceType, publicServiceId, {
                    onSuccess: function (list) {
                        console.log("订阅公众号 成功");
                        console.log(list);
                        that.stat.currentPublic.hasFollowed=true;
                    },
                    onError: function (error) {
                        console.log("订阅公众号 失败");
                    }
                });
            },
            goPublicSearch: function () {
                this.stat.currentView = 'publicSearch';
            }
        },
        mounted: function () {
            $('title').text(this.stat.currentView);
        }
    };
    return common.getComponent(options);
}