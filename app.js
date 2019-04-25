var self;
//app.js
App({
  onLaunch: function () {
    self=this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    // wx.showLoading({
    //   title: '努力加载中',
    //   mask:true,
    // })
    var token = wx.getStorageSync('sheIsToken');
    if (token){
      console.log(token)
      // 存在token 直接拿用户信息
      wx.getSetting({
        success: res => {
          // console.log(res.authSetting)
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              lang: "zh_CN",
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                self.globalData.userInfo = res.userInfo
                self.globalData.loginType = true

                // 由于 getUserInfo 是网络请求，可能会在 初始化完 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (self.finished) {
                  self.finished(self.globalData)
                }
              }
            })
          }
        }
      })
      
    }else{

    }
    
    
    
  },
  globalData: {
    userInfo: null,
    token:null,
    location:"",
    loginType:false//判断登录状态
  }
})