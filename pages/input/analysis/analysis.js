//analysis.js

Page({

  data: {
    items: [
      { name: 'AorN', value: '要么全都是，要么全都不是' },
      { name: 'Bla', value: '仅是指责', checked: 'true' },
      { name: 'Cata', value: '悲观夸大' },
      { name: 'DownP', value: '无视积极面' },
      { name: 'EmoRea', value: '仅靠感觉判断' },
      { name: 'ForTell', value: '悲观预测' },
      { name: 'IoUn', value: '总是不确定' },
      { name: 'Lab', value: '贴标签' },
      { name: 'MinRe', value: '读心' },
      { name: 'NegFil', value: '不看整体' },
      { name: 'NotA', value: '持续不接受' },
      { name: 'Over', value: '极端总结' },
      { name: 'Per', value: '只怪自己' },
      { name: 'ShoAM', value: '套用自己标准给他人' },
      { name: 'No', value: '都不适用' },
    ],
    save: "保存",
    rightHolder: "我觉得其实也可以这样想……",
    wrongHolder: "我的想法是……",
    inputWrongValue: "",
    inputRightValue: ""
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

})