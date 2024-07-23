Page({
  data: {
    loading: true,
    courses: [],
    errorMessage: ''
  },

  onLoad: function() {
    this.fetchCourses();
  },

  fetchCourses: function() {
    const that = this;
    wx.request({
      url: 'http://127.0.0.1:8099/course/all',
      method: 'GET',
      success(res) {
        if (res.data.success) {
          that.setData({
            courses: res.data.data,
            loading: false
          });
        } else {
          that.setData({
            errorMessage: res.data.message,
            loading: false
          });
        }
      },
      fail() {
        that.setData({
          errorMessage: '无法获取课程信息，请稍后再试。',
          loading: false
        });
      }
    });
  },

  navigateToCourseBooking(e) {
    const { id, courseName, courseImage} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/courseBooking/courseBooking?id=${id}&courseName=${courseName}&courseImage=${courseImage}`
    });
  }

});
