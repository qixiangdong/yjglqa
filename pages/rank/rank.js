// pages/history/history.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logs: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    let date= new Date();
    let today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    this.setData({
      today
    })
    wx.showLoading({
      title: '加载中',
    })
    const _ = db.command
    db.collection('history').where({
      date: _.eq(today)
    }).orderBy('score', 'desc').orderBy('duration', 'asc').limit(20).get().then(res=>{
              // 输出 [{ "title": "The Catcher in the Rye", ... }]
              console.log(res.data);
              wx.hideLoading({
                success: (res) => {},
              })
              that.setData({
                logs: res.data
              })
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