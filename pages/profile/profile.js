// pages/profile/profile.js
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });

      request({
        path: `/course/book/info`,
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
      });
    } else {
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }
  },
  handleNavClick(e) {
    const targetPage = e.currentTarget.dataset.url;
    if (targetPage !== this.data.currentPage) {
      wx.navigateTo({ url: targetPage });
    }
  }
});
