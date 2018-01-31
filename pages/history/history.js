// pages/history/history.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userOb1: "asd",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let userInfo = wx.BaaS.storage.get('userinfo')
    // wx.showLoading({
    //   title: '狗粮进食中~',
    //   mask: true
    // })
    // 尝试获取用户信息，若获取失败，则使用 wx.BaaS.login 进行登录
    if (userInfo) {
      let {
      id
    } = userInfo
      this.setData({
        id
      })
    console.log(id)
    }
    else {
      wx.BaaS.login().then(res => {
        let {
        id
      } = wx.BaaS.storage.get('userinfo')
        this.setData({
          id
        })
        console.log(id)
      }).catch(err => console.log(err))
    }

    //利用query查询含有相关id的文件
    let query = new wx.BaaS.Query()

    var id = parseInt(userInfo.id)
    console.log(id)

    query.compare("created_by","=",id)

    let tableID = 21194

    var Product = new wx.BaaS.TableObject(tableID)
    Product.setQuery(query).find().then((res) => {
      var userData = res.data
      console.log(userData)
      this.setData({
        userOb1: userData['objects'][0]
      })
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