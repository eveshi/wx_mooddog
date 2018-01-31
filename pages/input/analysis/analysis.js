//analysis.js

var app = getApp()
var inValue = {
  inW1: "abxc",
  inR1: "abc",
  inW2: "abv",
  inR2: "bmb",
  inW3: "yui",
  inR3: "ftu",
}

Page({

  data: {
    popUp: "汪~你做得非常好！\n你知道吗？\n我们出现负面想法，\n常常是因为陷入了思维陷阱。\n现在，就让我们一起来看一看，\n是什么负面想法困扰了你呢？",
    descri:"让我们写出三个困扰你的想法吧！",
    whatTrap: "诶~我陷入的思维陷阱是：",
    items: [
      { id: '1', name: '要么全都是，要么全都不是' },
      { id: '2', name: '仅是指责'},
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
    ],
    index0: 0,
    index1: 0,
    index2: 0,
    save: "全部保存",
    rightHolder: "我觉得其实也可以这样想……",
    wrongHolder: "我的想法是……",
    tgts1TrapId: 0,
    tgts1Change: "",
    tgts2: "",
    tgts2TrapId: 0,
    tgts2Change: "",
    tgts3: "",
    tgts3TrapId: 0,
    tgts3Change: "", 
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },

  wrong: function (e) {
    this.setData({
      inputWrongValue: e.detail.value
    })
    console.log(this.data.inputWrongValue)
  },

  right: function (e) {
    this.setData({
      inputRightValue: e.detail.value
    })
    console.log(this.data.inputRightValue)
  },

  trapChange0: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index0: e.detail.value
    })
  },

  trapChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },

  trapChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  inputValue: function(e){
    var id = e.target.id
    inValue.id = e.detail.value
    console.log(inValue.id)
  },

  savemode: function () {
    // 向 tableID 为 21194 的数据表插入一条记录
    let tableID = 21194
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()

    product.set('moodSave', app.globalData.mood)
    product.set('content', app.globalData.detailValue)
    product.set('tgts1',inValue.inW1)
    product.set('tgts1Change', inValue.inR1)
    product.set('tgts2', inValue.inW2)
    product.set('tgts2Change', inValue.inR2)
    product.set('tgts3', inValue.inW3)
    product.set('tgts3Change', inValue.inR3)
    product.set('tgts1Trap', this.index0)
    product.set('tgts1Trap', this.index1)
    product.set('tgts1Trap', this.index2)

    product.save().then((res) => {
      //成功提示成功
      wx.showModal({
        content: '保存成功！',
        showCancel: false,
        confirmColor: "#8A976A",
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else {
          }
        }
      })
    }, (err) => { })
  },

  onReady: function(){
    wx.showModal({
      content: this.data.popUp,
      conformText: "我明白了",
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