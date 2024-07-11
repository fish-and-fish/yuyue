Page({
  data: {
    // 这里可以添加需要的数据
  },
  navigateToBook(e) {
    const courseName = e.currentTarget.dataset.courseName;
    const courseImage = e.currentTarget.dataset.courseImage;
    wx.navigateTo({
      url: `/pages/book/book?courseName=${courseName}&courseImage=${courseImage}`
    });
  }
});
