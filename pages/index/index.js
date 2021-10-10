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
    if(app.globalData.user){
      wx.navigateTo({
        url: '/pages/qa/qa',
      })
    }else{
      wx.showToast({
        title: '请先完善个人信息',
        duration: 2000,
        icon: "error",
        mask: true,
        success: (res) => {
        },
        fail: (res) => {},
        complete: (res) => {},
      })
    }

  }
})
