//analysis.js

var app = getApp();

Page({

  data: {
    popUp: "汪~你做得非常好！\n你知道吗？\n我们出现负面想法，\n常常是因为陷入了思维陷阱。\n现在，就让我们一起来看一看，\n是什么负面想法困扰了你呢？",
    descri:"让我们写出三个困扰你的想法吧！",
    whatTrap: "诶~我陷入的思维陷阱是：",
    items: [
      { id: 0, name: '请选择' },
      { id: 1, name: '非此即彼'},
      { id: 2, name: '以偏概全'},
      { id: 3, name: '心理过滤' },
      { id: 4, name: '否定正面思考' },
      { id: 5, name: '以偏概全' },
      { id: 6, name: '读心术' },
      { id: 7, name: '先知错误' },
      { id: 8, name: '双目镜把戏' },
      { id: 9, name: '情绪化推理' },
      { id: 10, name: '"应该"句式' },
      { id: 11, name: '乱贴标签' },
      { id: 12, name: '罪责归己' },
    ],
    inValue: [
      {id:"inW1", value: ""},
      {id:"inR1", value: ""},
      {id:"inW2", value: ""},
      {id:"inR2", value: ""},
      {id:"inW3", value: ""},
      {id:"inR3", value: ""},
    ], 
    index: [
      {id:"0", value:"0"},
      {id:"1", value:"0"},
      {id:"2", value:"0"},
    ],
    save: "全部保存",
    rightHolder: "我觉得其实也可以这样想……",
    wrongHolder: "我的想法是……", 
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  trapChange: function (e) {
    var id = e.target.id
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var test = this.data.index
    for(var i=0;i<3;i++){
      if(id==test[i].id){
        test[i].value = e.detail.value
        this.setData({
          index: test
        })
      }
    }
  },

  inputValue: function(e){
    var id = e.target.id
    var test = this.data.inValue
    for(var i=0;i<6;i++){
      if(id==test[i].id){
        test[i].value = e.detail.value
        this.setData({
          inValue: test
        })
      }
    }
  },

  example: function(){
    wx.navigateTo({
      url: '../example/example',
    })
  },

  explain: function(){
    wx.navigateTo({
      url: '../explain/explain',
    })
  },

  savemode: function () {
    // 向 tableID 为 21194 的数据表插入一条记录
    let tableID = 21194
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()

    console.log(app.globalData.mood)
    console.log(app.globalData.detailValue)

    product.set('moodSave', app.globalData.mood)
    product.set('content', app.globalData.detailValue)
    product.set('tgts1', this.data.inValue[0].value)
    product.set('tgts1Change', this.data.inValue[1].value)
    product.set('tgts2', this.data.inValue[2].value)
    product.set('tgts2Change', this.data.inValue[3].value)
    product.set('tgts3', this.data.inValue[4].value)
    product.set('tgts3Change', this.data.inValue[5].value)
    product.set('tgts1TrapId', this.data.index[0].value)
    product.set('tgts2TrapId', this.data.index[1].value)
    product.set('tgts3TrapId', this.data.index[2].value)

    product.save().then((res) => {
      //成功提示成功
      wx.showModal({
        content: '保存成功！',
        showCancel: false,
        confirmColor: "#8A976A",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.reLaunch({
              url: '../mood/mood',
            })
          } else {
          }
        }
      })
    }, (err) => { })
  },

  onReady: function(){
    wx.showModal({
      content: this.data.popUp,
      confirmText: "我明白了",
      showCancel: false,
      confirmColor: "#8A976A",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else {
        }
      }
    })
  }

})