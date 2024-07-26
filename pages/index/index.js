import request from '../../utils/request';

Page({
  data: {
    loading: true,
    courses: [],
    currentPage: '/pages/index/index',
    errorMessage: ''
  },

  onLoad: function () {
    this.fetchCourses();
  },

  fetchCourses: function () {
    const that = this;
    request({
      path: '/course/all',
      method: 'GET',
    }).then(res => {
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
    }).catch(() => {
      that.setData({
        errorMessage: '无法获取课程信息，请稍后再试。',
        loading: false
      });
    });
  },

  navigateToCourseBooking(e) {
    const {id, courseName, courseImage} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/courseBooking/courseBooking?id=${id}&courseName=${courseName}&courseImage=${courseImage}`
    });
  },

  handleNavClick(e) {
    const targetPage = e.currentTarget.dataset.url;
    if (targetPage !== this.data.currentPage) {
      wx.navigateTo({url: targetPage});
    }
  }

});
