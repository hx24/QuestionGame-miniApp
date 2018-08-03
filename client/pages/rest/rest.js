// pages/rest/rest.js

const request = require('../../utils/util.js').request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gifTop: 0,
    roundName: '',
    question_index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.question = wx.getStorageSync("currentQuestion");

    if (!this.question) {
      this.question = { questionindex: 0 }
    } else {
      this.question = JSON.parse(this.question);
    }

    const This = this;
    var query = wx.createSelectorQuery();
    wx.getSystemInfo({
      success: function (res) {
        var gifTop = -(240 - 190 / res.pixelRatio) / 2 + 'rpx';
        This.setData({ gifTop })
      }
    });

    this.roundData = JSON.parse(wx.getStorageSync("roundData"));  // 正常进入这里一定是有roundData的
    this.setData({
      roundName: this.roundData.title,
      question_index: this.question.questionindex + 1
    })

    var para = {
      roundId: this.roundData.ID,
      index: this.question.questionindex   // 要请求的题目的索引
    };

    this.getQuestion(para)
  },
  getQuestion(param) {
    const This = this;
    request("getQuestion", param).then(function (data) {
      data = data.result;

      if (Object.keys(data).length==0) { //  result 是空对象
        setTimeout(function () {
          This.getQuestion(); // 没有获取到题目信息，重新获取
        }, 500)

      } else {
        if (data.end) {	// 结束
          wx.redirectTo({
            url: '/pages/rank/rank'
          })
        } else {
          wx.setStorageSync("currentQuestion", JSON.stringify(data));
          wx.setStorageSync("clickFlag", 1);  //接收到题目时，将clickFlag置为1 ，代表这道题还没有选择过
          console.log('存入问题', JSON.stringify(data))
          //获取到了题目信息
          wx.redirectTo({
            url: '/pages/answer/answer'
          })
        }

      }

    }, function () {
      setTimeout(function () {
        This.getQuestion(param); // 请求失败，重新获取
      }, 500)
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})