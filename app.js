// app.js
// 导入数据
var jsonList = require('data/json.js'); 
App({
  onLaunch() {
    var that = this;
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: false,
        env: "yjglwd-2g2vas2fc7cfd230"
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let capsule = wx.getMenuButtonBoundingClientRect();
		if (capsule) {
		 	this.globalData.Custom = capsule;
			this.globalData.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
		} else {
			this.globalData.CustomBar = e.statusBarHeight + 50;
		}
      }
    })
    let userInfo = wx.getStorageSync('userInfo');
    let userProfile = wx.getStorageSync('userProfile');
    let openid = wx.getStorageSync('openid')
    if(userInfo){
      this.globalData.userInfo = userInfo;
    }
    if(userProfile){
      this.globalData.userProfile = userProfile;
    }
    if(openid){
      this.globalData.openid = openid;
    }else{
      wx.cloud.callFunction({
        name: 'getOpenId',
        complete: res => {
          console.log(res.result);
          that.globalData.openid = res.result.openid
          wx.setStorageSync('openid', res.result.openid);
        }
      })
    }

    if(!userInfo || !userProfile || !openid){
      wx.cloud.database().collection('user').get()
      .then(res => {
        console.log(res);
        if(res.data&&res.data.length==1){
          let user = res.data[0]
            that.globalData.user = user
            let openid = user._openid
            let userInfo = {
              nickName: user.nickName,
              avatarUrl: user.avatarUrl
            }
            let userProfile = {
              name: user.name,
              phone: user.phone,
              awardphone: user.awardphone
            }
            that.globalData.openid = openid
            that.globalData.userInfo = userInfo
            that.globalData.userProfile = userProfile
            wx.setStorageSync('openid', openid);
            wx.setStorageSync('userInfo', userInfo);
            wx.setStorageSync('userProfile', userProfile);

        }

        console.log(that.globalData.user);
        console.log(that.globalData.openid);
        console.log(that.globalData.userInfo);
      })
      .catch(err => {
        console.log(err);
      })
    }

  },
  globalData: {
    userInfo: null,
    userProfile: null,
    openid: null,
    user: null,
    allQuestionList: jsonList.questionList,
    answeredQuestionList: null,
    answers: null,
  }
})
