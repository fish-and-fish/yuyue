Page({
  data: {
    teachers: ['古筝', '吉他', '钢琴'],
    teacherName: '',
    date: '',
    time: ''
  },

  bindTeacherChange(e) {
    this.setData({
      teacherName: this.data.teachers[e.detail.value]
    });
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    });
  },

  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    });
  },

  submitBooking() {
    if (!this.data.teacherName) {
      wx.showToast({
        title: '请选择老师',
        icon: 'none'
      });
      return;
    }

    if (!this.data.date) {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      });
      return;
    }

    if (!this.data.time) {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      });
      return;
    }

    wx.navigateTo({
      url: '../bookingSuccess/bookingSuccess'
    });
  }
});
