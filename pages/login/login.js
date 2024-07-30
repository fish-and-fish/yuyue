// pages/login/login.js
const app = getApp();

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      wx.redirectTo({
        url: '/pages/profile/profile'
      });
    }
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      app.loginBackend(e.detail.userInfo);
      wx.redirectTo({
        url: '/pages/profile/profile'
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '您拒绝了授权，无法使用该小程序',
        showCancel: false
      });
    }
  }
});
