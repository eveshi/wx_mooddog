// pages/history/hisDe/hisDe.js
var app = getApp()
const imageLink = [
  "../../../images/verySad.png",
  "../../../images/sad.png",
  "../../../images/calm.png",
  "../../../images/happy.png",
  "../../../images/veryHappy.png"
]
const items = [
  { id: 0, name: '请选择' },
  { id: 1, name: '仅是指责' },
  { id: 2, name: '全都是和全不是' }
  // { name: 'Cata', value: '悲观夸大' },
  // { name: 'DownP', value: '无视积极面' },
  // { name: 'EmoRea', value: '仅靠感觉判断' },
  // { name: 'ForTell', value: '悲观预测' },
  // { name: 'IoUn', value: '总是不确定' },
  // { name: 'Lab', value: '贴标签' },
  // { name: 'MinRe', value: '读心' },
  // { name: 'NegFil', value: '不看整体' },
  // { name: 'NotA', value: '持续不接受' },
  // { name: 'Over', value: '极端总结' },
  // { name: 'Per', value: '只怪自己' },
  // { name: 'ShoAM', value: '套用自己标准给他人' },
  // { name: 'No', value: '都不适用' },
]

Page({

  data: {
    id: 0,
    timeData: {},
    tgtChange: [],
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
      console.log(userData)
      var newRow = {}
      var newTgt = [{},{},{}]
      var date = new Date(userData.created_at*1000)
      newRow.year = date.getFullYear()
      newRow.month = date.getMonth()+"月"
      newRow.day = date.getDate()+"日"
      newRow.hour = date.getHours()
      newRow.min = date.getMinutes()
      newRow.sec = date.getSeconds()
      console.log(newRow)
      newRow.mood = imageLink[userData.moodSave]
      console.log(newRow)
      if(userData.content != ""){
        newRow.content = userData.content        
      }
      else{
        newRow.content = "汪~这里没有内容哦~"
      }
      console.log(newRow)
      newTgt[0].tgts = userData.tgts1
      console.log(newTgt)
      newTgt[0].tgtsChange = userData.tgts1Change
      newTgt[0].tgtsTrapId = items[userData.tgts1TrapId].name
      newTgt[1].tgts = userData.tgts2
      newTgt[1].tgtsChange = userData.tgts2Change
      newTgt[1].tgtsTrapId = items[userData.tgts2TrapId].name
      newTgt[2].tgts = userData.tgts3
      newTgt[2].tgtsChange = userData.tgts3Change
      newTgt[2].tgtsTrapId = items[userData.tgts3TrapId].name
      for(var i=0; i<3; i++){
        console.log(i)
        if(newTgt[i].tgts==""&&newTgt[i].tgtsChange==""&&newTgt[i].tgtsTrapId=="请选择"){
          newTgt[i].show = "false"
        }
        else{
          newTgt[i].show = "true"
        }
      }
      console.log(newTgt)
      if (newTgt[i].tgts == "") {
        newTgt[i].tgts = "汪~没有填写内容哦"
      }
      if (newTgt[i].tgtsChange == "") {
        newTgt[i].tgtsChange = "汪~没有填写内容哦"
      }
      if (newTgtsTrapId == "请选择") {
        newTgt[i].tgtsTrapId = "汪~没有选择思维陷阱~"
      }
      console.log(newTgt)
      this.setData({
        timeData: newRow,
        tgtChange: newTgt
      })
      console.log(this.data.timeData)
      console.log(this.data.tgtChange)
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