// pages/history/history.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let MyUser = new wx.BaaS.User()

    // wx.BaaS.login 方法会返回完成登录后的当前用户信息，同时，我们也给出 wx.BaaS.storage.get('userinfo') 获取存储在 storage 的当前用户信息。
    let user = new wx.Baas.storage.get('userid')

    // 查询 nickName 中包含 like 的用户
    let query = new wx.BaaS.Query()

    query.equalTo("id",uid)

    MyUser.setQuery(query).find().then((res) => {
      console.log(res.data)
    }, (err) => {
      // err
    })

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