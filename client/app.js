//app.js

// 1. 注册App
App({
  glbData: {
    name: 'huangxin',
    userid: '',
  },
  onLaunch: function () {
    console.log('小程序启动了');
  },
  // onShow和onHide的效果可以通过远程调试看效果，隐藏打开微信、小程序返回到微信和微信切换回小程序，都会触发下面两个函数
  onShow(){
    // 后台切换到小程序时执行
    console.log('onShow');
  },
  onHide() {
    // 小程序切换到后台时执行
    console.log('onHide');
  },
  globalData: {
    userInfo: null
  }
})