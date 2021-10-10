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

    var that = this;
    if(this.globalData.user==null){
      wx.cloud.database().collection('user').where({
      }).get()
      .then(res => {
        console.log(res);
        if(res.data&&res.data.length>0){
          let user = res.data[0]
            that.globalData.user = user
            that.globalData.openid = user._openid
            that.globalData.userInfo = {
              nickName: user.nickName,
              avatarUrl: user.avatarUrl
            }
        }

        console.log(that.globalData.user);
        console.log(that.globalData.openid);
        console.log(that.globalData.userInfo);
      })
      .catch(err => {
        wx.showToast({
          title: '网络错误',
          icon: "error",
          duration: 2000
        })
      })
    
    }
  },
  globalData: {
    userInfo: null,
    openid: null,
    user: null,
    questionList: jsonList.questionList  // 拿到答题数据
  }
})
