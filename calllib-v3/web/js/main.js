(function (RongCall, dependencies) {
  'use strict';

  var Vue = dependencies.Vue,
    VueRouter = dependencies.VueRouter;

  function getRouter() {
    var router = new VueRouter({
      routes: [
        {
          path: '/login',
          name: 'login',
          component: RongCall.login
        },
        {
          path: '/call',
          name: 'call',
          component: RongCall.call
        },
        {
          path: '*',
          redirect: '/login'
        }
      ]
    });
    router.beforeEach(function (to, from, next) {
      var ignoreAuthRoutes = ['login'];
      var toName = to.name;
      var instance = RongCall.instance || {};
      var auth = instance.auth;
      if (ignoreAuthRoutes.indexOf(toName) === -1 && !auth) {
        return next({ name: 'login' });
      }
      next();
    });
    return router;
  }

  function init(config) {
    RongCall.instance = new Vue({
      el: config.el,
      router: getRouter()
    });
  }

  RongCall.init = init;

})(window.RongCall, {
  win: window,
  Vue: window.Vue,
  VueRouter: window.VueRouter
});