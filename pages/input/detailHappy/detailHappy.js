// pages/input/detailHappy/detailHappy.js
var app = getApp();
// var mood;
// var inputValue;

Page({

  data: {
    title: "汪~让你有好情绪的事件是？",
    saveAll: "保存全部",
    contentHolder: "我……（请尽可能准确地描述自己的情绪，具体的词汇可以点击上方的小问号，参考我们的词汇表哦）",
    inputValue: "",
    quickSave: "全部保存",
    analysisThen: "分析",
    mood: 2
  },

  diary: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  savemode: function () {
    // 向 tableID 为 21194 的数据表插入一条记录
    let tableID = 21194
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()

    product.set('moodSave', parseInt(this.data.mood))
    product.set('content', this.data.inputValue)

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
        },
      })
    }, (err) => { })
  },

  onLoad: function (options) {
    this.setData({
      mood: options.id
    })
    console.log(this.data.mood)
  },

})