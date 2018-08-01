const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const request = (url,param) => {
  return new Promise((resolve,reject)=>{
    wx.request({
      url: `https://www.kar98k.club/user/${url}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded', 
        'cookie': wx.getStorageSync("sessionid")
      },
      method: 'POST',
      data: param,
      success: res => {
        console.log(res)
        wx.setStorageSync("sessionid", res.header["set-cookie"])
        resolve(res.data)
      },
      fail: err => {
        reject(err)
      },
      complete: ()=>{
        wx.stopPullDownRefresh();
      }
    })
  })
}

module.exports = {
  formatTime: formatTime,
  request
}
