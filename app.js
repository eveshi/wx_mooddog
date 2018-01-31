//app.js
App({
  globalData:{
    mood: 2,
    detailValue: "",
    tgts1: "",
    // tgts1TrapId: 0,
    // tgts1Change: "",
    // tgts2: "",
    // tgts2TrapId: 0,
    // tgts2Change: "",
    // tgts3: "",
    // tgts3TrapId: 0,
    // tgts3Change: "",    
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
    wx.BaaS.login(false).then((res) => {

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