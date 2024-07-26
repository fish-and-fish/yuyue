// pages/myBookings/myBookings.js
import BASE_URL from '../../config.js';
import request from '../../utils/request';

Page({
  data: {
    status: 'BOOKING',
    currentPage: '/pages/myCourses/myCourses',
    bookings: []
  },
  onLoad: function(options) {
    this.setData({
      status: options.status
    });
    this.fetchBookings();
  },
  fetchBookings() {
    wx.request({
      url: `${BASE_URL}/course/book/list?status=${this.data.status}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        if (res.data.success) {
          this.setData({
            bookings: res.data.data
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      }
    });
  },
  switchStatus(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      status
    }, () => {
      this.fetchBookings();
    });
  },
  cancelBooking(e) {
    const bookingId = e.currentTarget.dataset.id;
    wx.request({
      url: `${BASE_URL}/course/book/cancel`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        id: bookingId
      },
      success: (res) => {
        if (res.data.success) {
          wx.showToast({
            title: '取消成功',
            icon: 'success'
          });
          this.fetchBookings();
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      }
    });
  },
  handleNavClick(e) {
    const targetPage = e.currentTarget.dataset.url;
    if (targetPage !== this.data.currentPage) {
      wx.navigateTo({ url: targetPage });
    }
  }
});

