//detail.js
var app = getApp();
// var mood;
// var inputValue;

Page({

  data: {
    title: "刚才发生了什么呢？",
    saveAll: "保存全部",
    contentHolder: "刚才……",
    inputValue: "",
    quickSave: "保存",
    analysisThen: "分析",
    mood: 2
  },

  diary: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
    console.log(this.data.inputValue)
  },

  savemode: function(){
    // 向 tableID 为 21194 的数据表插入一条记录
    let tableID = 21194
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()

    product.set('moodSave', parseInt(this.data.mood))
    product.set('content', this.data.inputValue)

    product.save().then((res) => {
      //成功提示成功
      wx.navigateTo({
        url: '../success/success',
      })
     }, (err) => { })
  },

  onLoad: function (options) {
    this.setData({
      mood: options.id
    })
    console.log(this.data.mood)
  },

  nextPage: function () {
    wx.navigateTo({
      url: '../analysis/analysis',
    })
  },

})