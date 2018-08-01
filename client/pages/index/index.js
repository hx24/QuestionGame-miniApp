//index.js
//获取应用实例
const app = getApp();

let names = [
  '姚明','小红','黄鑫'
]

Page({
  data: {
    name: 'huangxin',
    numbers: [0,1,2,3],
    names,
    score: 90
  },

// 生命周期，执行顺序也如下
  // 页面加载时执行，只会执行一次
  onLoad: function () {
    this.setData({     // 修改data ，使用setData函数
      name: 'rasck'
    })
  },
  // 页面显示时执行
  onShow() {

  },
  // 页面第一次渲染完成之后，只执行一次，相当于html中的onload
  onReady(){

  },
  // 页面隐藏时执行
  onHide(){

  },
  // 页面卸载时执行，相当于ondestry。tab之间的切换不会卸载页面
  onUnload(){

  },
  // 在进行NavigatorTo  跳转到的那个目标页面会被加载，跳转之前的页面会被隐藏(hide)，回退(NavigatorBack),目标页面会 show ，回退之前的页面会被卸载(unload)
  onTap(event){
    console.log(event);
    console.log('我是谁');
  }
 
})
