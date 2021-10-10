var app = getApp();
const db = wx.cloud.database()
var starttime;
Page({
  data: {
    chooseValue: [], // 选择的答案序列
    totalScore: 100, // 总分
    indexQ:0
  },
  getRandomArrayElements(arr, count) {
    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
  onLoad: function (options) {
    let question1 = app.globalData.questionList['question1'];
    let question2 = app.globalData.questionList['question2'];
    let question1_5 = this.getRandomArrayElements(question1, 5)
    let question2_5 = this.getRandomArrayElements(question2, 5)
    let questionList = question1_5.concat(question2_5);
    this.setData({
      questionList
    })

    starttime = new Date();
  },
  /*
  * 单选事件
  */
  radioChange: function (e) {
    console.log(e);
    let index = e.currentTarget.dataset.index;
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.data.chooseValue[index] = e.detail.value;
    console.log(this.data.chooseValue);

  },
  outTest: function () {
    wx.showModal({
      title: '提示',
      content: '你真的要退出答题吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '../index/index'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  submit() {
    console.log(this.data.chooseValue);
    if (this.data.chooseValue.length != 10 || this.data.chooseValue.includes(undefined)) {
      wx.showToast({
        title: '你还有问题没有回答!',
        icon: 'none',
        duration: 3000,
        success: function () {
          return;
        }
      })
    } else {
          //计算总分
    for (let index = 0; index < this.data.chooseValue.length; index++) {
      var trueValue = this.data.questionList[index]['true'];
      var chooseVal = this.data.chooseValue[index];
      console.log('第' + index + '题选择了' + chooseVal + '答案是' + trueValue);
      if (chooseVal.toString() != trueValue.toString()) {
        console.log('错了');
        this.setData({
          totalScore: this.data.totalScore - this.data.questionList[index]['scores']  // 扣分操作
        })
      }
    }
      let endtime = new Date();
      let duration = ((endtime - starttime) / 1000).toFixed(1);
      console.log(duration);
      wx.navigateTo({
        url: '../results/results?totalScore=' + this.data.totalScore + '&duration=' + duration
      })
      var that = this;
      let date = new Date().toLocaleDateString();
      db.collection('history').add({
        data: {
          date: date,
          score: this.data.totalScore,
          avatarUrl: app.globalData.userInfo.avatarUrl,
          nickName: app.globalData.userInfo.nickName,
          duration: duration
        },
        success: function (res) {
          console.log(res);
        }
      })
    }
  },
  getScore() {
    //计算总分
    for (let index = 0; index < this.data.chooseValue; index++) {
      var trueValue = this.data.questionList[index]['true'];
      var chooseVal = this.data.chooseValue[index];
      console.log('第' + index + '题选择了' + chooseVal + '答案是' + trueValue);
      if (chooseVal.toString() != trueValue.toString()) {
        console.log('错了');
        this.setData({
          totalScore: this.data.totalScore - this.data.questionList[index]['scores']  // 扣分操作
        })
      }
    }

  }
})