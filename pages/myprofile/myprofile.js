const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    modalName: "Modal",
    textareaAValue: '',
    showDetail: false,
    userProfile: null,
    userInfo: {}
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  submit(e){
    let name = e.detail.value.name.trim();
    let phone = e.detail.value.phone.trim();
    if(name==""|| phone==""){
      wx.showToast({
        title: '你还有信息未填写',
        duration: 2000,
        icon: "error"
      })
      return;
    }
    let userProfile = {
      name: name,
      phone: phone,
    }
    
    var that = this;
    db.collection('user').add({
      data: {
        name: name,
        phone: phone,
        avatarUrl: this.data.userInfo.avatarUrl,
        nickName: this.data.userInfo.nickName
      },
      success: function(res) {
        console.log(res);
        that.setData({
          userProfile
        })
        that.setData({
          showDetail: true
        })
        app.globalData.userProfile = userProfile;
        wx.setStorageSync('userProfile', userProfile);

      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.userInfo==null){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
      this.setData({userInfo: app.globalData.userInfo});
    }
    if(app.globalData.user){
      this.setData({
        user: app.globalData.user
      })
      this.setData({
        showDetail: true
      })
    }
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