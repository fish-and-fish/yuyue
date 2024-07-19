Page({
  data: {
    courses: []
  },
  onLoad: function () {
    this.getCourses();
  },
  getCourses: function () {
    wx.request({
      url: `${getApp().globalData.baseUrl}/course/all`,
      method: 'GET',
      success: (res) => {
        if (res.data.success) {
          this.setData({
            courses: res.data.data
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '网络错误，请稍后重试',
          icon: 'none'
        });
      }
    });
  }
});
