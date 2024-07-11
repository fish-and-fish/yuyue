Page({
  data: {
    // 可以根据需要添加数据
  },
  cancelBooking() {
    wx.showModal({
      title: '取消预约',
      content: '确定要取消这次预约吗？',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '预约已取消',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  }
});
