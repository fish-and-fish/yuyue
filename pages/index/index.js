import request from '../../utils/request';
const app = getApp();

Page({
  data: {
    loading: true,
    courses: [],
    currentPage: '/pages/index/index',
    errorMessage: ''
  },

  onShow: function () {
    console.log(111);
    wx.hideHomeButton();
  },

  onLoad: function () {
    this.initPage();
  },

  initPage: function () {
    if (app.globalData.token) {
      this.fetchCourses();
    } else {
      app.loginBackend(app.globalData.userInfo).then(() => {
        this.fetchCourses();
      }).catch(err => {
        this.setData({
          errorMessage: '登录失败，请重试。',
          loading: false
        });
      });
    }
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
