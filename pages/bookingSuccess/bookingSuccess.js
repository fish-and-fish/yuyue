Page({
  data: {
    courseName: '',
  },
  onLoad: function (options) {
    this.setData({
      courseName: options.courseName,
    });
  },
  viewMyCourses: function () {
    wx.switchTab({
      url: '/pages/mycourses/mycourses',
    });
  },
});
