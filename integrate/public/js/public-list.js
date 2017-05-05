/**
 * Created by wangchengkuo on 17/4/12.
 */
function getPublicList(instance,_options) {
    var options = {
        props: ['stat'],
        template: 'template/public-list.html',
        methods: {
            getPublicServiceList: function () {
                /*
                 getRemotePublicServiceList = function (mpId, conversationType, pullMessageTime, callback)
                 */
                var that = this;

                /*$.getJSON('public-mock-data.json', function (data) {
                    console.log(data);
                    that.stat.publicList = data.publicList;
                    return false;
                });*/


                instance.getPublicServiceList({
                    onSuccess: function (list) {
                        console.log("获取已关注公众号 成功");
                        that.stat.publicList = list;
                    },
                    onError: function (error) {
                        console.log("获取已关注公众号 失败");
                    }
                });
            },
            publicAdd: function () {
                this.stat.currentView = "publicSearch";
            },
            goPublicChat: function (item) {
                this.stat.currentView = 'publicChat';
                this.stat.currentPublic = item;
            }
        },
        mounted: function () {
            this.getPublicServiceList();
            $('title').text(this.stat.currentView);
        }
    };
    return common.getComponent(options);
}