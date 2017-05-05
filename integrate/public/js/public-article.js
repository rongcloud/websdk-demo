/**
 * Created by wangchengkuo on 17/4/12.
 */
function getPublicArticle(_options) {
    var options = {
        props: ['stat'],
        template: 'template/public-article.html',
        methods: {
            goPublicChat: function () {
                this.stat.currentView = 'publicChat';
            }
        },
        mounted:function () {
            $('title').text(this.stat.currentView);
        }
    };
    return common.getComponent(options);
}