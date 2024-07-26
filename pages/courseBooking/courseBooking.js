// pages/courseBooking/courseBooking.js
import BASE_URL from '../../config.js';
import request from '../../utils/request';

Page({
  data: {
    course: {},
    teachers: [],
    selectedTeacher: '',
    selectedDate: '',
    selectedTimeSlot: '',
    timeSlots: [
      { start: '08:00', end: '09:00' },
      { start: '09:00', end: '10:00' },
      { start: '10:00', end: '11:00' },
      { start: '11:00', end: '12:00' },
      { start: '12:00', end: '13:00' },
      { start: '13:00', end: '14:00' },
      { start: '14:00', end: '15:00' },
      { start: '15:00', end: '16:00' },
      { start: '16:00', end: '17:00' },
      { start: '17:00', end: '18:00' },
      { start: '18:00', end: '19:00' },
      { start: '19:00', end: '20:00' },
      { start: '20:00', end: '21:00' }
    ],
  },
  onLoad: function(options) {
    this.setData({
      course: {
        id: options.id,
        courseName: options.courseName,
        courseImage: options.courseImage,
      }
    });
    wx.request({
      url: `${BASE_URL}/course/all/teacher?courseId=${this.data.course.id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: (res) => {
        if (res.data.success) {
          this.setData({
            teachers: res.data.data
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
  selectTeacher(e) {
    const selectedTeacher = this.data.teachers[e.detail.value];
    this.setData({
      selectedTeacher: selectedTeacher.teacherName
    });
  },
  selectDate(e) {
    this.setData({
      selectedDate: e.detail.value
    });
  },
  selectTimeSlot(e) {
    const selectedTimeSlot = this.data.timeSlots[e.currentTarget.dataset.index];
    this.setData({
      selectedTimeSlot: `${selectedTimeSlot.start} - ${selectedTimeSlot.end}`
    });
  },
  confirmBooking() {
    if (!this.data.selectedTeacher || !this.data.selectedDate || !this.data.selectedTimeSlot) {
      wx.showToast({
        title: '请先选择老师、日期和时间',
        icon: 'none'
      });
      return;
    }

    const selectedSlot = this.data.timeSlots.find(slot => `${slot.start} - ${slot.end}` === this.data.selectedTimeSlot);
    wx.request({
      url: `${BASE_URL}/course/book`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        courseId: this.data.course.id,
        teacherId: this.data.teachers.find(teacher => teacher.teacherName === this.data.selectedTeacher).id,
        startTime: `${this.data.selectedDate} ${selectedSlot.start}:00`,
        endTime: `${this.data.selectedDate} ${selectedSlot.end}:00`
      },
      success: (res) => {
        if (res.data.success) {
          wx.showToast({
            title: '预约成功',
            icon: 'success'
          });
          wx.redirectTo({
            url: '/pages/myBookings/myBookings?status=BOOKING'
          });
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
          });
        }
      }
    });
  }
});
