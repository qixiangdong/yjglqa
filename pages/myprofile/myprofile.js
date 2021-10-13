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
    userInfo: null,
    hasUserInfo: false,
    phone: null
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
  getPhoneNumber(e){
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'getPhone',
      data:{
        cloudID: e.detail.cloudID
      }
    }).then(res=>{
      
      let phone = res.result.list[0].data.phoneNumber;
        console.log(phone);
        that.setData({phone});
      wx.hideLoading({
        success: (res) => {},
      })
    });
  },
  submit(e){
    if(!this.data.userInfo){
      wx.showToast({
        title: '请先授权',
        duration: 2000,
        icon: "error",
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
      return;
    }
    let name = e.detail.value.name.trim();
    let phone = this.data.phone;
    let awardphone = e.detail.value.awardphone.trim();
    if(!phone){
      wx.showToast({
        title: '请授权手机号',
        duration: 2000,
        icon: "error",
        success: (res) => {},
        fail: (res) => {},
        complete: (res) => {},
      })
      return;
    }
    if(name==""|| awardphone==""){
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
      awardphone: awardphone
    }
    
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    db.collection('user').add({
      data: {
        name: name,
        phone: phone,
        awardphone: awardphone,
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
        console.log(userProfile);
        app.globalData.userProfile = userProfile;
        wx.setStorageSync('userProfile', userProfile);
        wx.hideLoading({
          success: (res) => {},
        })
      }
    })

  },  login() {
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = app.globalData.userInfo;
    if (userInfo) {
      // let userInfo = {
      //   nickName: user.nickName,
      //   avatarUrl: user.avatarUrl
      // }
      this.setData({
        hasUserInfo: true,
        userInfo
      })
    }

    if(app.globalData.userProfile){
      this.setData({
        userProfile: app.globalData.userProfile
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