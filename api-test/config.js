(function (win) {

  var isDebug = false;

  var im = {
    appkey: 'n19jmcy59f1q9',
    token: 'Kn2p4uokgY5AZOFVsKTbKq+YsUIoF3ojin3K277sfOnEb+B6ZpahsTOCVisdS43pwz7SnsSF0xxiLfygEojZP7ywLi39+nOPq12llTIt1oc=',
    navi: '',
    targetId: 'api_test_target',
    // customCMP: '',
    isPolling: false,
  };

  if (!isDebug) {
    delete im.cmpUrl;
  }

  var config = {
    im: im,
    isDebug: isDebug,
    debugConf: {
      autoRun: false,
      isShowMsg: false
    }
  };

  win.RongIM = win.RongIM || {};
  win.RongIM = {
    config: config,
    components: {}
  };

})(window);