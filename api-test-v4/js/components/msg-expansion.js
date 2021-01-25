(function (win, dependencies, components) {
    var Vue = dependencies.Vue,
      RongIM = dependencies.RongIM,
      utils = RongIM.Utils,
      Service = RongIM.Service;
  
    components.apiExpansion = Vue.component('api-expansion', {
      template: utils.getTemp('rong-tpl-expansion'),
      props: ['isOpen'],
      data: function() {
        return {
            isOpen: true,
        }
      },
      watch: {
        isOpen: function (val, newval) {
          console.warn(val, newval);
        }
      },
      computed: {
        
      },
      methods: {
        
      },
      mounted: function() {
        console.warn('msg-expansion');
      }
    });
  
  })(window, {
    Vue: Vue,
    iview: iview,
    RongIM: RongIM
  }, window.RongIM.components);