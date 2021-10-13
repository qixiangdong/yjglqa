// index.js
// 获取应用实例
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    todayCanAnswer: false
  },
  onLoad() {
  }, 
  onShow(){
    this.checkTodayAnwserStatus();
  },
  checkTodayAnwserStatus(){
    //一天答题一次
    let openid = app.globalData.openid;
    const _ = db.command
    var that = this;
    let date= new Date();
    let today = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
    db.collection('history').where({
      _openid: openid,
      date: _.eq(today)
    }).get(
      {
        success: function(res) {
          // res.data 包含该记录的数据
          if(res.data.length>=1){
            that.setData({
              todayCanAnswer: false
            })
          }else{
            that.setData({
              todayCanAnswer: true
            })
          }

          console.log(that.data.todayCanAnswer);
        }
      }
    )
  },
  /**
  * 用户点击右上角分享
  */
 onShareAppMessage: function () {

 },
 toAbout(){
  wx.navigateTo({
    url: '../about/about',
  })
 },
 toMyProfile(){
wx.navigateTo({
  url: '../myprofile/myprofile',
})
 },
  startQA(){
    if(app.globalData.userProfile){
      wx.navigateTo({
        url: '/pages/qa/qa',
      })
    }else{
      wx.showToast({
        title: '先完善个人资料',
        duration: 2000,
        icon: "error",
        mask: true,
        success: (res) => {
        },
        fail: (res) => {},
        complete: (res) => {
          setTimeout(()=>{
            wx.navigateTo({
              url: '../myprofile/myprofile',
            })
          },1000);
        },
      })
    }

  }
})
