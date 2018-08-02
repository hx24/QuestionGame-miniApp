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
      // url: `https://www.kar98k.club/user/${url}`,
      url: `http://192.168.1.123/user/${url}`,
      header: {
        'content-type': 'application/x-www-form-urlencoded', 
        'cookie': wx.getStorageSync("sessionid")
      },
      method: 'POST',
      data: param,
      success: res => {
        if (res.statusCode==200){
          var cookie = res.header["set-cookie"] || res.header["Set-Cookie"]; // 调试时是set-cookie  真机运行时是Set-Cookiel
          wx.setStorageSync("sessionid", cookie);
          resolve(res.data)
        } else{
          if (res.statusCode == 403){
            wx.redirectTo({
              url: '/pages/login/login'
            })
          }
          reject(res)
        }
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
