// pages/history/hisDe/hisDe.js
var app = getApp()
const imageLink = [
  "../../../images/verySad.png",
  "../../../images/sad.png",
  "../../../images/calm.png",
  "../../../images/happy.png",
  "../../../images/veryHappy.png"
]

Page({

  data: {
    id: 0,
    contData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })

    let query = new wx.BaaS.Query()

    query.compare("_id","=", this.data.id)

    let tableID = 21194

    var Product = new wx.BaaS.TableObject(tableID)
    Product.setQuery(query).find().then((res) => {
      var userData = res.data['objects'][0]
      var newRow = {}
      var date = new Date(userData.created_at*1000)
      newRow.year = date.getFullYear()
      newRow.month = date.getMonth()+"月"
      newRow.day = date.getDate()+"日"
      newRow.hour = date.getHours()
      newRow.min = date.getMinutes()
      newRow.sec = date.getSeconds()
      newRow.mood = imageLink[userData.moodSave]
      newRow.content = userData.content
      newRow.tgts1 = userData.tgts1
      newRow.tgts1Change = userData.tgts1Change
      newRow.tgts1TrapId = userData.tgts1TrapId
      newRow.tgts2 = userData.tgts2
      newRow.tgts2Change = userData.tgts2Change
      newRow.tgts2TrapId = userData.tgts2TrapId
      newRow.tgts3 = userData.tgts3
      newRow.tgts3Change = userData.tgts3Change
      newRow.tgts3TrapId = userData.tgts3TrapId
      this.setData({
        contData: newRow
      })
      console.log(this.data.contData)
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