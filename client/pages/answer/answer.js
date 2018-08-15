// pages/answer/answer.js
const request = require('../../utils/util.js').request;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    secondSize: '',
    second: 0,
    questionindex: 0,
    question: '',
    options: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.question = JSON.parse(wx.getStorageSync("currentQuestion"));
    this.setData({
      second: this.question.startsecond,
      questionindex: Number.parseInt(this.question.questionindex),
      question: this.question.question,
      options: this.question.answers
    })
    this.answer = 4;  // 回答的序号，4 未答  0,1，2，3 已选答案
    if (this.question.isanswer) {
      this.clickFlag = true;
    }
    this.getResultTimes = 0;


    const This = this;
    this.timer = setInterval(function () {
      var second = This.data.second-1;

      This.setData({
        second
      })

      if (second == 0) {
        clearInterval(This.timer);
        This.clickFlag = false;  //倒计时结束，不可再选择
        This.setData({
          second: "结束",
          secondSize: '45rpx'
        })
        if (This.question.isanswer) {
          This.fn_submitAnswer();
        } else {
          This.fn_getResult();
        }
      }
    }, 1000);   //倒计时
  },
  handleSelect(event) {
    var index = event.target.dataset.index;
    if (this.clickFlag) {
      this.setData({
        selectOption: index
      })
      this.answer = index;
      this.clickFlag = false;	 //已选择后，不可修改

      if (this.data.second == "结束") {
        answerSecond = 10;
      }
    }
  },
  fn_submitAnswer() {
    const This = this;
    var paraAnswer = {
      roundId: This.question.roundId,   //场次ID
      questionId: This.question.questionid,    // 题目ID
      questionIndex: This.question.questionindex - 1,
      answer: This.answer   //结果    告诉服务，4为未作答
    }

    console.log("开始提交答案" + This.question.questionindex);
    console.log(JSON.stringify(paraAnswer));

    request("commitAnswer", paraAnswer).then(function (data) {
      data = data.result;
      if (data.success != "OK") {
        wx.showToast({
          title: '答案提交失败,您已出局',
          icon: 'none',
          duration: 2000
        })
      }
      This.fn_getResult();
    }, function (error) {
      wx.showToast({
        title: '答案提交失败,您已出局',
        icon: 'none',
        duration: 2000
      })
      This.fn_getResult();
    })
  },
  fn_getResult (){
    const This = this;
    var paraResult = {
      roundId: This.question.roundId,   //场次ID
      questionId: This.question.questionid,    // 题目ID
      questionIndex: This.question.questionindex - 1
    }
    request("getResult", paraResult).then(function (data) {
      data = data.result;

      if (Object.keys(data).length==0) {  //没有请求到结果
        setTimeout(function () {
          This.fn_getResult();
        }, 500);
      } else {
        console.log("请求到result");
        console.log(data);

        This.setData({
          correctOption: data.correct,
          optionCounts: data.answerCount,
          result_second: 10
        })

        if (data.correct != This.data.selectOption) {
          let errorOption = 4;
          if (This.data.selectOption == 0 || This.data.selectOption) errorOption = This.data.selectOption;
          //用户选择了错误答案
          This.setData({
            errorOption
          })
        }

        var timer = setInterval(function () {
          var result_second = This.data.result_second-1;
          This.setData({
            result_second
          })

          if (result_second == 0) {
            clearInterval(timer)
            wx.redirectTo({
              url: '/pages/rest/rest',
            })
          }
        }, 1000);   //倒计时
      }

    }, function () {
      This.getResultTimes++;
      if (This.getResultTimes % 10 == 0) {
        wx.showToast({
          title: '获取结果失败,正在重新获取',
          icon: 'none',
          duration: 2000
        })
      }
      setTimeout(function () {
        This.fn_getResult();
      }, 500);
    });
  }
})