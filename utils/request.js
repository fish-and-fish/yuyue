// utils/request.js
const BASE_URL = 'http://127.0.0.1:8099';
const CLOUD_ENV = 'prod-5gbsbih9f5adb83c';
const CLOUD_SERVICE = 'shop';

const request = (options) => {
  options.useCloud = true;
  const headers = {
    'Content-Type': 'application/json'
  };
  const app = getApp();
  if (app.globalData.token) {
    headers['Authorization'] = `${app.globalData.token}`;
  }

  if (options.useCloud) {
    return new Promise((resolve, reject) => {
      wx.cloud.callContainer({
        config: {
          env: CLOUD_ENV
        },
        path: options.path,
        header: {
          ...headers,
          'X-WX-SERVICE': CLOUD_SERVICE
        },
        method: options.method || 'GET',
        data: options.data || {},
        success: resolve,
        fail: (err) => {
          console.error('Cloud request failed:', err);
          reject(err);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${BASE_URL}${options.path}`,
        method: options.method || 'GET',
        header: {
          ...headers,
        },
        data: options.data || {},
        success: resolve,
        fail: reject
      });
    });
  }
};

export default request;