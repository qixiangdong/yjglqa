// pages/wronglist/wronglist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let chooseValue = app.globalData.answers;
    let questionList = app.globalData.answeredQuestionList;
    console.log(chooseValue);
    console.log(questionList);

    for (let i=0; i<questionList.length; i++) {
      let question = questionList[i]
      let option = [];
      if(question['true']==chooseValue[i]){
        question.checked = true
      }
      if(question.type==3){
        for(const item of question.option){
          let selected = false;
          if(item==chooseValue[i]){
            selected = true;
          }
            option.push({
              item: item,
              selected: selected
            })
        }
      }
      if(question.type==1){
        for(const key in question.option){
          let selected = false;
          if(key==chooseValue[i]){
            selected = true;
          }
            option.push({
              item: key+question.option[key],
              selected: selected
            })
        }
      }
      question.option = option;
    }

    this.setData({
      questionList,
      chooseValue
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

  },
  // 返回首页
  toIndex: function(){
    wx.switchTab({
      url: '../index/index'
    })
  }
})