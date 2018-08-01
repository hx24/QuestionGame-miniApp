// 通过 getApp 全局函数可以获得app实例，访问app实例上的属性
const app = getApp();
Page({
  pageData: {
      age: 12
  },
  onLoad(){
    console.log(this.pageData);  // 使用this访问当前页面实例
  },
  onReady: () => console.log(app.glbData),
  onGetUserInfo(event){
    console.log(event);
  },
  onTry(){
    wx.getUserInfo({
      success: msg=>{
        console.log(msg);
      },
      fail: msg=>{
        console.log(msg);
      },
    })
  },
  onAuthLocation(){
    wx.authorize({
      scope: 'scope.userLocation',
      success: msg=>console.log(msg),
      fail: msg=>console.log(msg)
    })
  },
  onGetLocation(){
    wx.getLocation({
      success: res => console.log(res),
      fail: res => console.log(res),
    })
  },
  onGetAuthSettings(){
    wx.getSetting({
      success: res => console.log(res),
    })
  },
  onGoToSetting(){
    wx.openSetting({
      success: res => console.log(res),
    })
  },
  onCache() {
    wx.setStorage({
      key: 'name',
      data: {p1: 'rasck'},
      success: err=>{
        console.log('success', err);
      }
    })
  },
  onGetCache() {
    wx.getStorage({
      key: 'name',
      success: data => {
        console.log(data);
      }
    })
  },
  // 上面两个都是异步方式设置和获取缓存
  // 对应的异步方法
  // wx.setStorageSync('key', 'value')
  // var value = wx.getStorageSync('key')
  onGetCacheInfo() {
    wx.getStorageInfo({
      success: data => {
        console.log(data);
      }
    })
  },
  onReq() {
    wx.showLoading({
      title: '请求中',
    });
    wx.request({
      url: 'https://uj6eyl0x.qcloud.la/hello',
      data:{
        name: 'rasck'
      },
      method: 'POST',
      success: data=>{
        setTimeout(()=>{
          wx.hideLoading();
          wx.showToast({
            title: '请求成功',
          })
        },1000)
        
        console.log(data)
      }
    })
  },
  
})