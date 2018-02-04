// pages/dataAna/dataAna.js
let app = getApp()

Page({

  data: {
  moodData: [],
  buttonName: [
    {name:"全部", choose:"true"},
    {name: "1年", choose: "false" },
    {name: "30天", choose: "false" },
    {name: "7天", choose: "false" },
  ]
  },

  detail: function(e){
    console.log(e.detail)
    console.log(e.target)
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
      var historySingle = { year: 0, month: 0, day: 0, content: "", mood: 0, moodImg: "", _id: "" }
      var history = []
      var date
      var mood = [
      { label: "好不开心", value: 0, color:"#588C73" },
      { label: "不开心", value: 0, color:"#77AF9C" },
      { label: "心情一般", value: 0, color:"#F2E394" },
      { label: "开心", value: 0, color:"#F2AE72" },
      { label: "好开心", value: 0, color:"#D96459" },
      ]
      // 创建新数组
      for (var i = 0; i < objectLen; i++) {
        date = new Date(userData['objects'][i].created_at * 1000)
        historySingle.year = date.getFullYear()
        historySingle.month = date.getMonth() + 1
        historySingle.day = date.getDate()
        historySingle.mood = userData['objects'][i].moodSave
        for(var a = 0; a<5; a++){
          if(historySingle.mood == a){
            mood[a].value += 1
          }
        }
        history.push(historySingle)
        historySingle = { year: 0, month: 0, day: 0, content: "", mood: 0, moodImg: "", _id: "" }
      }
      //output percentage of value
      var totalValue = 0
      for(var b=0;b<5;b++){
        totalValue += mood[b].value
      }
      for (var c = 0; c < 5; c++) {
        mood[c].percent = ((mood[c].value/totalValue)*100).toFixed(0)+'%'
      }


      // 筛选出年份和月份
      var yH = history[history.length - 1].year
      var yL = history[0].year
      var newArray = []
      var newCut
      var flag
      for (; yH > yL - 1; yH--) {
        console.log(yH)
        for (var a = 12; a > 0; a--) {
          flag = false
          for (var i = history.length - 1; i > -1; i--) {
            if (history[i].month == a) {
              newCut = { year: 0, month: 0, day: "", content: "", mood: 0, moodImg: "", _id: "", moodShow: "true" }
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
        moodData: mood
      })

//饼图初始化
      let WxChart = require("../../utils/wx-chart.js");
      let getChartInstances = WxChart.getChartInstances;

      let basePie = windowWidth => {

        let wxPie = new WxChart.WxDoughnut('basePie', {
          width: windowWidth,
          height: 350,
          // point:{
          //   format: percentageFormatLabel
          // },
          color:{
            luminosity: "dark",
            hue: "orange"
          }          
        });

        wxPie.update(mood);
        return {
          chart: wxPie,
          redraw: () => {
            wxPie.update(mood);
          }
        };
      };

      let windowWidth = 320
      try {
        let res = wx.getSystemInfoSync();
        windowWidth = res.windowWidth;
      } catch (e) {
        // do something when get system info failed
      }
      console.log(windowWidth)

      this.basePieChart = basePie(windowWidth);
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