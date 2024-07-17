Page({
  data: {
    teachers: ['Teacher A', 'Teacher B', 'Teacher C'],
    selectedTeacher: '',
    selectedTeacherName: '请选择老师',
    selectedDate: '请选择日期',
    timeSlots: [
      '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00',
      '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00',
      '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00'
    ],
    selectedTimeSlot: ''
  },

  bindTeacherChange(e) {
    const selectedTeacher = e.detail.value;
    this.setData({
      selectedTeacher,
      selectedTeacherName: this.data.teachers[selectedTeacher]
    });
  },

  bindDateChange(e) {
    this.setData({
      selectedDate: e.detail.value
    });
  },

  selectTimeSlot(e) {
    this.setData({
      selectedTimeSlot: e.currentTarget.dataset.time
    });
  },

  submitBooking() {
    if (!this.data.selectedTeacher) {
      wx.showToast({
        title: '请选择老师',
        icon: 'none'
      });
      return;
    }
    if (this.data.selectedDate === '请选择日期') {
      wx.showToast({
        title: '请选择日期',
        icon: 'none'
      });
      return;
    }
    if (!this.data.selectedTimeSlot) {
      wx.showToast({
        title: '请选择时间',
        icon: 'none'
      });
      return;
    }
    // Proceed with booking logic here

    wx.navigateTo({
      url: '/pages/bookingSuccess/bookingSuccess'
    });
  }
});
