// app.js
// 导入数据
var jsonList = require('data/json.js'); 
App({
  onLaunch() {
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

    if(userInfo){
      this.globalData.userInfo = userInfo;
    }

    if(userProfile){
      this.globalData.userProfile = userProfile;
    }
  },
  globalData: {
    userInfo: null,
    userProfile: null,
    questionList: jsonList.questionList  // 拿到答题数据
  }
})
