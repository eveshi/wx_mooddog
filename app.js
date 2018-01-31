//app.js
App({
  globalData:{
    mood: 2,
    detailValue: "",   
  },

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // require SDK
    require('./sdk-v1.1.3')

    // 初始化 SDK
    let clientID = '1e470692fad80cc17af9'
    wx.BaaS.init(clientID)

    // 登录
    wx.BaaS.login().then((res) => {
      // wx.BaaS.storage.set("userId", res.data.id)
      // console.log(res.data)
      console.log("1")
      let data1 = res.data.id
      console.log(data1)
    }, (err) => {

    })

    //获取用户数据
    // wx.BaaS.storage.get('userinfo').then((res) => {

    // }, (err) => {

    // })
  },
  globalData: {
    userInfo: null
  }
})