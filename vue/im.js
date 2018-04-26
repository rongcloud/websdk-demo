(function(RongIM, dependencies) {
  
  var RongIMLib = dependencies.RongIMLib;
  var RongService = dependencies.RongService;

  var init = function() {

    var routes = RongIM.routes;

    var router = new VueRouter({
        linkActiveClass: routes.linkActiveClass,
        routes: routes.maps
    });

    var im = new Vue({
      el: "#rong-im",
      router: router
    });

    RongIM.im = im;
  };

  var config = RongIM.config;
  var modules = {
    RongIMLib: RongIMLib
  };
  RongService.init(config, function(services, currentUser) {
    console.log('CurrentUser %o', currentUser);
    
    var Conversation = services.Conversation;
    var Message = services.Message;

    RongIM.Conversation = Conversation;
    RongIM.Message = Message;
    
    init();

  }, modules);

})(RongIM, {
  VueRouter: VueRouter,
  RongService: RongService,
  RongIMLib: RongIMLib
});