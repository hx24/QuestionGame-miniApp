//app.js

// 1. 注册App
App({
  glbData: {
    name: 'huangxin',
    userid: '',
  },
  onLaunch: function () {
    const This = this;
    // 小程序启动时执行
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res.authSetting['scope.userInfo'])
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              This.glbData.userid = res.signature;
              wx.redirectTo({
                url: '/pages/wait/wait'
              })
            }
          })
        } else {
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
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