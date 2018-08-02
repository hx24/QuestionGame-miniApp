// pages/wait/wait.js
const util = require('../../utils/util.js');
const request=util.request;

var flag = 1;
var oldstartData;
var layerLoading;
var showLoading = true;

wx.removeStorageSync("currentQuestion");  //清空问题

var getPlayRoundTimes = 0;

var getPlayRoundTimer;

var _ordertimer = null;
var data = new Date();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roundName: '暂无场次',
    noRound: true,
    round_reward: '----',
    round_startdate: '----',
    rewardAll: 0,
    revive: 0,
    countDown: '--:--:--',
    historiess: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.fn_getPlayRound()
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
    this.fn_getPlayRound()
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
  
  },
  fn_getPlayRound() {
    const This=this;
    if (showLoading) {
      wx.showLoading();
    }
    request('getRound').then(function (data) {
      showLoading = false;
      wx.hideLoading();
      console.log(data)

      data = data.result;

      var round = data.round;
      var personinfo = data.personinfo;

      if (round) { //有场次信息
        This.setData({
          noRound: false,
          roundName: round.title,
          round_reward: round.reward,
          round_startdate: round.time
        })
        wx.setStorageSync("roundId", JSON.stringify(round.ID));
        wx.setStorageSync("roundData", JSON.stringify(round));

        This.startCountdown(round.time);  //倒计时开始时间

      } else {
        This.setData({
          noRound: true,
          roundName: "暂无场次",
          round_reward: "----",
          round_startdate: "--:--"
        })

        clearInterval(_ordertimer);

        if (getPlayRoundTimer) {
          clearInterval(getPlayRoundTimer);
        }

        getPlayRoundTimer = setTimeout(function () {
          This.fn_getPlayRound();
        }, 30 * 1000);      // 没有场次，30s请求一次
      }

      This.setData({
        rewardAll: personinfo.rewardAll,
        revive: personinfo.revive,
        historiess: personinfo.history,
      })
    }, function () {
      // 请求失败
      wx.hideLoading();
      if (getPlayRoundTimes < 2) {  //自动请求3次，错误后提示
        setTimeout(function () {
          This.fn_getPlayRound();
        }, 5 * 1000);
        getPlayRoundTimes++;
      } else {
        wx.showToast({
          title: '获取场次信息失败,请下拉刷新或尝试重新登录',
          duration: 3000
        })
      }
    })
  },
  leftTimer(enddate) {
    var leftTime = (new Date(enddate)) - new Date(); //计算剩余的毫秒数
    //		var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
    var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
    //		days = checkTime(days);
    hours = checkTime(hours);
    minutes = checkTime(minutes);
    seconds = checkTime(seconds);
    if (hours >= 0 || minutes >= 0 || seconds >= 0) {
      this.setData({
        countDown: hours + ":" + minutes + ":" + seconds
      })
    }

    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
      clearInterval(_ordertimer);
      _ordertimer = null;
      wx.removeStorageSync("currentQuestion");  //答题开始，先清空之前缓存的问题
      wx.redirectTo({
        url: '/pages/rest/rest',
      })
    }
  },
  startCountdown(v) {
    if (_ordertimer) {
      if (oldstartData == v) {
        return;
      } else {
        clearInterval(_ordertimer)
        _ordertimer = null;
      }
      //已经在倒计时了

    }

    oldstartData = v;
    var timeArr = v.split(":");

    var date1 = new Date(),
      date2 = new Date();

    date2.setHours(timeArr[0]);
    date2.setMinutes(timeArr[1]);
    date2.setSeconds("0")

    if (date2 < date1) {
      // 本场游戏已经开始<br />您只能观战，不能答题
      wx.redirectTo({
        url: '/pages/rest/rest',
      })
      return; //设置的时间小于现在时间退出
    }
    const This=this;
    _ordertimer = setInterval(function () {
      This.leftTimer(date2)
    }, 1000);
  }

})





function checkTime(i) { //将0-9的数字前面加上0，例1变为01
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
