Page({
  data: {
    courseName: '',
    courseImage: '',
    teachers: ['老师A', '老师B', '老师C'],
    teacher: '',
    date: '',
    timeSlots: [],
    selectedTime: '',
  },
  onLoad: function (options) {
    const { courseName, courseImage } = options;
    this.setData({
      courseName,
      courseImage,
      timeSlots: this.generateTimeSlots(),
    });
  },
  generateTimeSlots: function () {
    const timeSlots = [];
    for (let i = 8; i < 20; i++) {
      timeSlots.push(`${i}:00-${i + 1}:00`);
    }
    return timeSlots;
  },
  bindTeacherChange: function (e) {
    this.setData({
      teacher: this.data.teachers[e.detail.value],
    });
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value,
    });
  },
  selectTime: function (e) {
    this.setData({
      selectedTime: e.currentTarget.dataset.time,
    });
  },
  bookCourse: function () {
    const { teacher, selectedTime } = this.data;
    if (!teacher || !selectedTime) {
      wx.showToast({
        title: '请选择老师和时间',
        icon: 'none',
      });
      return;
    }
    wx.navigateTo({
      url: `/pages/bookingSuccess/bookingSuccess?courseName=${this.data.courseName}`,
    });
  },
});
