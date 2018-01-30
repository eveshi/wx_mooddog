//mood.js
//输入情绪数据

var app = getApp();
const imageLink = [
  "images/verySad.png",
  "images/sad.png",
  "images/calm.png",
  "images/happy.png",
  "images/veryHappy.png"
]
var i = 2;

Page({
  data:{
    question: '汪汪~告诉我你现在的心情吧',
    answer: 'images/calm.png',
    quickSave: '快速保存',
    moreDetails: '详细记录',
  },

  mines: function(){
    if (i > 0){
      i --;
    }

    this.setData({
      answer: imageLink[i]
    })

  },

  add: function(){
    if (i < 4){
      i ++;
    }

    this.setData({
      answer: imageLink[i]
    })

  },

  savemode: function(){
    // 向 tableID 为 21194 的数据表插入一条记录
    let tableID = 21194
    let Product = new wx.BaaS.TableObject(tableID)
    let product = Product.create()

    product.set('moodSave', i)

    product.save().then((res) => {
      //成功保存，出现成功界面
      wx.navigateTo({
        url: '../success/success',
      })
     }, (err) => { })

  },

  nextPage: function(){
    //进入下一界面并传参
    if(i<3){
      wx.navigateTo({
        url: '../details/details?id='+i,
      })      
    }
    else{
      wx.navigateTo({
        url: '../detailHappy/detailHappy?id=' + i,
      })      
    }
  }
})