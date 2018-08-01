//logs.js

const util = require('../../utils/util.js')

Page({
  data: {
    color: 'red',
    names: 'Jack,Lee,Marry',
  },
  onLoad: function () {
    
  },
  onGetRandomNum(event){
    console.log(event) 
    this.setData({
      randomNum: event.detail
    })
  },
  onPullDownRefresh(){
    util.request('getRound', {phone: 13176863291,name: '黄鑫'}).then(data=>{
      console.log(data)
    })
  }
})


function test(){
  console.log(132)
}
