const app = getApp();
import request from '../../utils/request';

Page({
  data: {
    userInfo: {},
    finishCourseNum: 0,
    bookingCourseNum: 0,
    vip: false,
    expiredTime: ''
  },
  onLoad: function () {
    this.fetchCourseInfo();
  },
  fetchCourseInfo: function () {
    request({
      path: '/course/book/info',
      method: 'POST'
    }).then(res => {
      if (res.data.success) {
        this.setData({
          finishCourseNum: res.data.data.finishCourseNum,
          bookingCourseNum: res.data.data.bookingCourseNum,
          vip: res.data.data.vip,
          expiredTime: res.data.data.expiredTime
        });
      } else {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        });
      }
    }).catch(err => {
      wx.showToast({
        title: 'Request failed',
        icon: 'none'
      });
      console.error(err);
    });
  },
  handleNavClick(e) {
    const targetPage = e.currentTarget.dataset.url;
    if (targetPage !== this.data.currentPage) {
      wx.navigateTo({url: targetPage});
    }
  }
});