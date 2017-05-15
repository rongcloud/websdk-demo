/**
 * Created by wangchengkuo on 17/4/12.
 */
function getPublicSearch(instance,_options) {
    var options = {
        props: ['stat'],
        template: 'template/public-search.html',
        methods: {
            publicSearch: function () {

                var that = this;
                /*$.getJSON('public-mock-data.json', function (data) {
                    var listUnFollowed = [];
                    $(data.searchList).each(function () {
                        this.hasFollowed == false && listUnFollowed.push(this);
                    });

                    that.stat.searchList = listUnFollowed;

                });
                return false;*/

                var keywords = this.stat.searchVal;
                var searchType = 1; //[0-exact 1-fuzzy]
                instance.searchPublicService(searchType, keywords, {
                    onSuccess: function (list) {
                        //console.log("查找公众号 成功");
                        //that.stat.searchList=list;
                        var listUnFollowed = [];
                        $(list).each(function () {
                            this.hasFollowed == false && listUnFollowed.push(this);
                        });
                        if(listUnFollowed.length == 0){
                            that.stat.searchResult = false;
                            that.stat.searchList=[];
                        }else {
                            that.stat.searchResult = true;
                            that.stat.searchList = listUnFollowed;
                        }


                    },
                    onError: function (error) {
                        console.log("查找公众号 失败");
                    }
                });
            },
            goPublicInfo: function (item) {
                this.stat.currentView = 'publicInfo';
                this.stat.currentPublic = item;
            },
            goPublicList: function () {
                this.stat.currentView = "publicList";
            }
        },
        mounted: function () {
            $('title').text(this.stat.currentView);
        }
    };
    return common.getComponent(options);
}