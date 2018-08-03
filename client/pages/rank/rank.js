// pages/rank/rank.js
const request = require('../../utils/util.js').request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rankDatas: [],
    currentIndex: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading();
    this.loadData();
  },
  loadData(){
    const This = this;
    request("getRank", {}).then(function (data) {
      wx.stopPullDownRefresh();
      wx.hideLoading();
      data = data.result;
      if (data && data.length) {
        This.setData({
          rankDatas: data,
          currentIndex: data.length - 1,
          currentRank: data[data.length - 1]  // 默认显示最后一场
        })
      }
    }, function () {
      wx.stopPullDownRefresh();
      wx.hideLoading();
    })
  },
  next() {
    let { currentIndex, rankDatas } = this.data;
    if (currentIndex < rankDatas.length - 1) {
      this.setData({
        currentIndex: currentIndex+1,
        currentRank: rankDatas[currentIndex]
      })
    }
  },
  preview() {
    let { currentIndex} = this.data;
    if (currentIndex > 0) {
      this.setData({
        currentIndex: currentIndex-1,
        currentRank: this.data.rankDatas[currentIndex]
      })
    }
  },
  back(){
    wx.redirectTo({
      url: '/pages/wait/wait'
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.loadData();
  },

})