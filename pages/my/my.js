// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    userInfo: app.globalData.userInfo,
    hasUserInfo: false,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let userInfo = app.globalData.userInfo;
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo
      })
    }
  },
  openpage(e){
    console.log(e);
    if(this.data.userInfo){
      let url = e.currentTarget.dataset.url;
      wx.navigateTo({
        url: url,
      })
    }else{
      wx.showToast({
        title: '请先授权',
        icon: "error"
      })
    }
  },
  login() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        app.globalData.userInfo = res.userInfo;
        wx.setStorageSync('userInfo', res.userInfo);
      }
    })

    // wx.login({
    //   success (res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: 'http://localhost:8080/api/weapplogin',
    //         data: {
    //           code: res.code
    //         },
    //         success: function(res){
    //           app.globalData.openid = res.data.openid;
    //           app.globalData.session_key = res.data.session_key;
    //           wx.setStorageSync('openid', res.data.openid);
    //           wx.setStorageSync('session_key', res.data.session_key);

    //         },
    //         fail: function(res){
    //             wx.showToast({
    //               title: '登录失败',
    //               icon: 'error',
    //               duration: 2000
    //             })
    //         }
    //       })
    //     }
    //   }
    // })
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