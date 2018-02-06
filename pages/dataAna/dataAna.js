// pages/dataAna/dataAna.js
let app = getApp()
var moodBase = [
  { label: "好不开心", value: 0, color: "#588C73" },
  { label: "不开心", value: 0, color: "#77AF9C" },
  { label: "心情一般", value: 0, color: "#F2E394" },
  { label: "开心", value: 0, color: "#F2AE72" },
  { label: "好开心", value: 0, color: "#D96459" },
]
let WxChart = require("../../utils/wx-chart.js");

let basePie = (windowWidth,pa) => {

  let wxPie = new WxChart.WxDoughnut('basePie', {
    width: windowWidth,
    height: 350,
    // point:{
    //   format: percentageFormatLabel
    // },
    color: {
      luminosity: "dark",
      hue: "orange"
    }
  });

  wxPie.update(pa);
  return {
    chart: wxPie,
    redraw: (pa) => {
      wxPie.update(pa);
    }
  };
};

Page({

  data: {
  moodData: [],
  moodDataAll: [],
  buttonName: [
    {id:0, name:"全部", choose:"true"},
    {id:1, name: "90天", choose: "false" },
    {id:2, name: "30天", choose: "false" },
    {id:3, name: "7天", choose: "false" },
  ],
  show: "false",
  width: 320
  },

  changeCharts: function(e){
    console.log(e.target.dataset.id)
    var id = e.target.dataset.id
    var date = ((new Date()).getTime()/1000).toFixed(0)
    var button = [
      { id: 0, name: "全部", choose: "true" },
      { id: 1, name: "90天", choose: "false" },
      { id: 2, name: "30天", choose: "false" },
      { id: 3, name: "7天", choose: "false" },
    ]
    for(var i=0;i<4;i++){
      if(id == i){
        button[i].choose = "true"
      }else{
        button[i].choose = "false"
      }
    }
    this.setData({
      buttonName: button
    })
    var all = this.data.moodDataAll
    var mood = [
      { label: "好不开心", value: 0, color: "#588C73" },
      { label: "不开心", value: 0, color: "#77AF9C" },
      { label: "心情一般", value: 0, color: "#F2E394" },
      { label: "开心", value: 0, color: "#F2AE72" },
      { label: "好开心", value: 0, color: "#D96459" },
    ]
    var newDate
    if(id==0){
      for(var a=0;a<all.length;a++){
        for(var b=0;b<5;b++){
          if(all[a].mood==b){
            mood[b].value += 1
          }
        }
      }
    }else if(id==1){
      newDate = date-2592000*3
      for (var a = 0; a < all.length; a++) {
        if(all[a].date > newDate){
          for (var b = 0; b < 5; b++) {
            if (all[a].mood == b) {
              mood[b].value += 1
            }
          }
        }
      }
    }else if(id==2){
      newDate = date - 2592000
      for (var a = 0; a < all.length; a++) {
        if (all[a].date > newDate) {
          for (var b = 0; b < 5; b++) {
            if (all[a].mood == b) {
              mood[b].value += 1
            }
          }
        }
      }
    }else if(id==3){
      newDate = date - 604800
      for (var a = 0; a < all.length; a++) {
        if (all[a].date > newDate) {
          for (var b = 0; b < 5; b++) {
            if (all[a].mood == b) {
              mood[b].value += 1
            }
          }
        }
      }
    }
    var totalValue = 0
    var newMood = []
    for (var b = 0; b < 5; b++) {
      if (mood[b].value != 0) {
        newMood.push(mood[b])
      }
      totalValue += mood[b].value
    }
    for (var c = 0; c < newMood.length; c++) {
      newMood[c].percent = ((newMood[c].value / totalValue) * 100).toFixed(0) + '%'
    }
    this.setData({
      moodData: newMood
    })
    this.basePieChart = basePie(this.data.width,newMood);
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

    query.compare("created_by", "=", id)

    let tableID = 21194

    var Product = new wx.BaaS.TableObject(tableID)
    Product.setQuery(query).find().then((res) => {
      var userData = res.data
      var objectLen = userData['objects'].length
      var historySingle = { date: 0, mood: 0,}
      var history = []
      var mood = moodBase
      var flag = "false"
      // 创建新数组
      for (var i = 0; i < objectLen; i++) {
        historySingle.date = userData['objects'][i].created_at
        historySingle.mood = userData['objects'][i].moodSave
        for(var a = 0; a<5; a++){
          if(historySingle.mood == a){
            mood[a].value += 1
            flag = "true"
          }
        }
        history.push(historySingle)
        historySingle = { date: 0, mood: 0,}
      }
      //output percentage of value
      var totalValue = 0
      var newMood = []
      for(var b=0;b<5;b++){
        if(mood[b].value!=0){
          newMood.push(mood[b])
          console.log(mood[b])
        }
        totalValue += mood[b].value
      }
      for (var c = 0; c < newMood.length; c++) {
        newMood[c].percent = ((newMood[c].value/totalValue)*100).toFixed(0)+'%'
      }
      this.setData({
        moodData: newMood,
        moodDataAll: history,
        show: flag
      })

//饼图初始化
      let windowWidth = 320
      try {
        let res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        // do something when get system info failed
      }
      this.setData({
        width: windowWidth
      })
      this.basePieChart = basePie(windowWidth,newMood);
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