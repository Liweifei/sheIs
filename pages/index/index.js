//index.js
//获取应用实例
const app = getApp()

Component({
  data: {
    userInfo: {},
    hasUserInfo: false,
    location: "",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        console.log(this.getTabBar())
        this.getTabBar().setData({
          selected: 0
        })
      }
      // if (app.globalData.userInfo) {
      //   this.setData({
      //     userInfo: app.globalData.userInfo,
      //     hasUserInfo: true
      //   })
      // } else if (this.data.canIUse) {
      //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      //   // 所以此处加入 callback 以防止这种情况
      //   app.userInfoReadyCallback = res => {
      //     this.setData({
      //       userInfo: res.userInfo,
      //       hasUserInfo: true
      //     })
      //   }
      // } else {
      //   // 在没有 open-type=getUserInfo 版本的兼容处理
      //   wx.getUserInfo({
      //     lang:"zh_CN",
      //     success: res => {
      //       app.globalData.userInfo = res.userInfo
      //       this.setData({
      //         userInfo: res.userInfo,
      //         hasUserInfo: true
      //       })
      //     }
      //   })
      // }
    }
  },
  methods:{
    getUserInfo: function (e) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },
    getLocation(info) {//拿到当前位置信息
      console.info(info.detail)
      this.setData({
        location: info.detail
      })
    },
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  
})
