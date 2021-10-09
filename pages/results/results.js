// pages/results/results.js
var app = getApp();
Page({
  data: {
    totalScore: null, // 分数
    wrongList: [], // 错误的题数-乱序
    wrongListSort: [],  // 错误的题数-正序
    chooseValue: [], // 选择的答案
    remark: ["好极了！你很棒棒哦","哎哟不错哦","别灰心，继续努力哦！"], // 评语
    modalShow: false,
    duration: null
  },
  onLoad: function (options) {
    console.log(options);
    
    //let wrongList = JSON.parse(options.wrongList);
    //let wrongListSort = JSON.parse(options.wrongListSort);
    //let chooseValue = JSON.parse(options.chooseValue);
    let duration = options.duration;
    this.setData({
      totalScore: options.totalScore != ""?options.totalScore:"无",
      duration: duration,
      //wrongList: wrongList,
      //wrongListSort: wrongListSort,
      //chooseValue: chooseValue,
      //questionList: app.globalData.questionList[options.testId],  // 拿到答题数据
      //testId: options.testId  // 课程ID
    })
   // console.log(this.data.chooseValue);
  },
  // 查看错题
  toView: function(){
    // 显示弹窗
    this.setData({
      modalShow: true
    })
  },
  // 返回首页
  toIndex: function(){
    wx.switchTab({
      url: '../index/index'
    })
  }
})