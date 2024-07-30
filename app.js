import request from './utils/request';

App({
  globalData: {
    userInfo: null,
    sessionKey: null,
    openId: null,
    currentTab: null,
    token: null
  },

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

    // 检查用户是否已经授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              this.loginBackend(res.userInfo);  // 后端登录
            }
          })
        } else {
          // 如果没有授权，则跳转到登录页面
          wx.redirectTo({
            url: '/pages/login/login'
          });
        }
      }
    });
  },

  loginBackend(userInfo) {
    wx.login({
      success: res => {
        if (res.code) {
          request({
            path: '/course/login',
            method: 'POST',
            data: {
              code: res.code,
              userInfo: userInfo
            }
          }).then(res => {
            if (res.data.success) {
              this.globalData.sessionKey = res.data.data.sessionKey;
              this.globalData.openId = res.data.data.openId;
              this.globalData.token = res.data.data.token; // Store the token
            } else {
              console.error('登录失败', res.data.message);
            }
          }).catch(err => {
            console.error('请求失败', err);
          });
        } else {
          console.error('登录失败！' + res.errMsg);
        }
      }
    });
  },

});