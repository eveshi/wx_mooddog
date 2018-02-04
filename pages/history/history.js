// pages/history/history.js
var app = getApp()
const imageLink = [
  "../../images/verySad.png",
  "../../images/sad.png",
  "../../images/calm.png",
  "../../images/happy.png",
  "../../images/veryHappy.png"
]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter: [
      { name: "all", value: "全部"},
      { name: 4, value: "好开心"},
      { name: 3, value: "开心"},
      { name: 2, value: "一般"},
      { name: 1, value: "不开心" },
      { name: 0, value: "好不开心"},
    ],
    index: 0,
    userHistoryModel: [],
    userHistory: [],
    id: 0,
  },

  moodChange: function(e){
    this.setData({
      index: e.detail.value
    })
    var histo = this.data.userHistoryModel
    var histo2 = []
    //需要重新过滤月份和年份
    for(var i=0; i<histo.length; i++){
      if(histo[i].show != "true"){
        if(this.data.filter[this.data.index].name == "all"){
          histo[i].moodShow = "true"
          histo2.push(histo[i])
        }
        else if(histo[i].mood != this.data.filter[this.data.index].name){
          histo[i].moodShow = "false"
        }
        else if(histo[i].mood == this.data.filter[this.data.index].name){
          histo[i].moodShow = "true"
          histo2.push(histo[i])
        }
      }
    }
    console.log(histo2)
    var newArray = []
    if(histo2.length == 0){
      newArray.push({content:"无记录", moodShow:"true"})
    }
    else if(histo2 == histo){
      newArray = histo
    }
    else{
      //重排月份
      var yH = histo2[histo2.length - 1].year
      var yL = histo2[0].year
      newArray = []
      var newCut
      var flag
      for (; yH > yL - 1; yH--) {
        console.log(yH)
        for (var a = 12; a > 0; a--) {
          flag = false
          for (var i = histo2.length - 1; i > -1; i--) {
            if (histo2[i].month == a) {
              console.log(histo2[i].month)
              newCut = { year:0, month:0, day: "", content: "", mood: 0, moodImg: "", _id: "", moodShow: "true" }
              if (flag == false) {
                newArray.push({ year: yH, month: a + "月  ", show: "true" })
                flag = true
              }
              newCut.year = histo2[i].year
              newCut.month = histo2[i].month
              newCut.day = histo2[i].day
              newCut.content = histo2[i].content
              newCut.mood = histo2[i].mood
              newCut.moodImg = histo2[i].moodImg
              newCut._id = histo2[i]._id
              newArray.push(newCut)
            }
          }
        }
      }
    }
    this.setData({
      userHistory: newArray
    })
  },

  details: function(e){
    console.log(e.target.dataset._id)
    this.setData({
      id: e.target.dataset._id
    })
    console.log(this.data.id)
    var itemId = this.data.id
    // console.log(itemId._id)
    wx.navigateTo({
      url: 'hisDe/hisDe?id='+itemId,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let userInfo = wx.BaaS.storage.get('userinfo')
    // 尝试获取用户信息，若获取失败，则使用 wx.BaaS.login 进行登录
    if (userInfo) {
      let {
      id
    } = userInfo
      this.setData({
        id
      })
    }
    else {
      wx.BaaS.login().then(res => {
        let {
        id
      } = wx.BaaS.storage.get('userinfo')
        this.setData({
          id
        })
      }).catch(err => console.log(err))
    }

    //利用query查询含有相关id的文件
    let query = new wx.BaaS.Query()

    var id = parseInt(userInfo.id)

    query.compare("created_by","=",id)

    let tableID = 21194

    var Product = new wx.BaaS.TableObject(tableID)
    Product.setQuery(query).find().then((res) => {
      var userData = res.data
      var objectLen = userData['objects'].length
      var historySingle = { year: 0, month:0, day:0, content: "", mood: 0, moodImg: "", _id:"" }
      var history = []
      var date
      // 创建新数组
      for(var i=0; i<objectLen; i++){
        date = new Date(userData['objects'][i].created_at*1000)
        historySingle.year = date.getFullYear()
        historySingle.month = date.getMonth()+1
        historySingle.day = date.getDate()
        historySingle.content = userData['objects'][i].content
        historySingle.mood = userData['objects'][i].moodSave
        historySingle.moodImg = imageLink[historySingle.mood]
        historySingle._id = userData['objects'][i]._id
        history.push(historySingle)
        historySingle = { year: 0, month: 0, day: 0, content: "", mood: 0, moodImg: "", _id: "" }
      }
      // 筛选出年份和月份
      var yH = history[history.length-1].year
      var yL = history[0].year
      var newArray = []
      var newCut
      var flag
      for(;yH>yL-1;yH--){
        console.log(yH)
        for(var a=12;a>0;a--){
          flag = false
          for(var i=history.length-1; i>-1; i--){
            if(history[i].month == a){
              newCut = { year:0, month: 0, day: "", content: "", mood: 0, moodImg: "", _id: "", moodShow: "true" }
              if (flag == false) {
                newArray.push({ year: yH, month: a + "月  ", show: "true" })
                flag = true
              }
              newCut.year = history[i].year
              newCut.month = history[i].month
              newCut.day = history[i].day + "号"
              newCut.content = history[i].content
              newCut.mood = history[i].mood
              newCut.moodImg = history[i].moodImg
              newCut._id = history[i]._id
              newArray.push(newCut)
            }
          }
        }
      }
      this.setData({
        userHistoryModel: newArray,
        userHistory: newArray
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