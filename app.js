// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 初始化云环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        env: 'prod-5gbsbih9f5adb83c', // 你的云环境 ID
        traceUser: true,
      });
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  switchTab(e) {
    const pagePath = e.currentTarget.dataset.path;
    if (pagePath !== this.globalData.currentTab) {
      this.globalData.currentTab = pagePath;
      wx.switchTab({
        url: pagePath
      });
    }
  },
})