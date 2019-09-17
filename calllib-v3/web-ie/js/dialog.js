(function (RongCall) {
  /* 弹框 */

  var utils = RongCall.utils;

  function removeSelf($el) {
    var parent = $el.parentElement;
    parent.removeChild($el);
  }

  /* 选择人员弹框 */
  var selectUser = function (options) {
    options = options || {};

    var userList = options.userList;
    userList = userList.map(function (user) {
      user.isSelected = false;
      return user;
    });

    return utils.mountDialog({
      name: 'rong-select-dialog',
      template: '#rong-template-dialog-users',
      data: function () {
        return {
          isShow: true,
          userList: userList
        };
      },
      computed: {
        hasSelectedUser: function () {
          var selectedUser = this.userList.filter(function (user) {
            return user.isSelected;
          });
          return selectedUser.length;
        }
      },
      methods: {
        selectUser: function (user) {
          user.isSelected = !user.isSelected;
        },
        cancel: function () {
          this.isShow = false;
          options.canceled && options.canceled();
        },
        confirm: function () {
          var userList = this.userList;
          userList = userList.filter(function (user) {
            return user.isSelected;
          });
          options.confirmed && options.confirmed(userList);
          this.isShow = false;
        }
      },
      watch: {
        isShow: function (isShow) {
          !isShow && removeSelf(this.$el);
        }
      }
    });
  };

  /* 提示弹框 */
  var toast = function (options) {
    options = options || {};

    return utils.mountDialog({
      name: 'rong-toast-dialog',
      template: '#rong-template-dialog-toast',
      data: function () {
        return {
          isShow: true,
          content: options.content
        };
      },
      watch: {
        isShow: function (isShow) {
          !isShow && removeSelf(this.$el);
        }
      },
      mounted: function () {
        var context = this;
        setTimeout(function () {
          if (context.isShow) {
            context.isShow = false;
            options && options.onDestoryed();
          }
        }, options.destroyTimeout || 5000);
      }
    });
  };

  RongCall.dialog = {
    selectUser: selectUser,
    toast: toast
  };
})(window.RongCall, {
  win: window
});