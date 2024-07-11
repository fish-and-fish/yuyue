Page({
  data: {
    courseName: '',
    courseImage: '',
    timeSlots: [
      '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00',
      '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00',
      '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00',
      '20:00-21:00', '21:00-22:00'
    ],
    selectedTimeSlot: null
  },
  onLoad(options) {
    this.setData({
      courseName: options.courseName,
      courseImage: options.courseImage
    });
  },
  selectTimeSlot(e) {
    this.setData({
      selectedTimeSlot: e.currentTarget.dataset.index
    });
  },
  bookCourse() {
    wx.navigateTo({
      url: '/pages/bookingSuccess/bookingSuccess'
    });
  }
});
