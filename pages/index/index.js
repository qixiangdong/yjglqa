// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
  },
  onLoad() {
  },
  startQA(){
    if(app.globalData.userProfile){
      wx.navigateTo({
        url: '/pages/qa/qa',
      })
    }else{
      wx.showToast({
        title: '请先完善个人信息',
        duration: 1000,
        icon: "error",
        mask: true,
        success: (res) => {

          wx.switchTab({
            url: '../my/my',
          })
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }

  }
})
