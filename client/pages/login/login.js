// pages/login.js
const app = getApp();
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    phone: '',
    phoneOk: false,
    shouldLogin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在验证信息',
    })
    const This = this;
    // 验证该用户是否已注册
    wx.login({
      success: loginRes => {
        const { code } = loginRes;
        util.request('login', {code}).then(res => {
          wx.hideLoading();
          if (!res.error) {
            console.log('登录成功')
            // 登录成功
            wx.redirectTo({
              url: '/pages/wait/wait'
            })
          } else {
            // 该用户未绑定手机号
            This.setData({
              shouldLogin: true
            })
          }
        },function(){
            wx.showToast({
              title: '验证失败，请稍后再试',
              icon: 'none',
              duration: 5000
            })
            wx.hideLoading();
        })
      }
    })
  },
  handleLogin(){
    var content = this.data.phone ? '请输入正确的手机号':'请输入手机号';
    content = content + '\n符合规则即可，不校验真实性' ;
    wx.showModal({
      duration: 300,
      title: '',
      content: content,
      showCancel: false
    })
  },
  handleInput(e){
    const { value } = e.detail;
    var patt = new RegExp("^[1][3-9][0-9]{9}$");
    console.log(patt.test(value))
    this.setData({
      phone: value,
      phoneOk: patt.test(value)
    })
  },
  getPermissionOk(res){
    const This = this;
    if (res.detail.signature){   // 权限获取成功
      this.login(res.detail.userInfo.nickName)
    }else{
      wx.showModal({
        duration: 300,
        title: '未授权',
        content: '您未授权，将匿名进入程序',
        showCancel: false,
        success: function(){
          This.login('微信用户');
        }
      });
    }
  },
  login(name){
    wx.showLoading({
      title: '登录中',
    })
    const This = this;
    wx.login({
      success: ({ code }) => {
        var param = {
          code,
          phone: This.data.phone,
          name: name
        }
        util.request('login', param).then(res => {
          wx.hideLoading();
          if (!res.error) {
            // 登录成功
            wx.redirectTo({
              url: '/pages/wait/wait'
            })
          } else {
            // 该用户未绑定手机号
            This.setData({
              shouldLogin: true
            })
          }
        }, function () {
          wx.hideLoading();
          wx.showToast({
            title: '登录失败，请稍后再试',
            icon: 'none',
          })
        })
      }
    })
  }
})