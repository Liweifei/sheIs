//logs.js
const util = require('../../utils/util.js')
const serviceHelper = require("../../utils/service.js")
const app = getApp()
var self

Component({
  data: {
    logs: [],
    userInfo: app.globalData.userInfo,
    loginType:app.globalData.loginType,
    spinShow:false,
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  },
  attached(){
    self=this;
    app.finished = (res) => {
      wx.hideLoading()
      self.setData({
        userInfo: res.userInfo,
        loginType: res.loginType
      })
    }
    console.log("sdfffffffff")
  },
  methods:{
    login(){
      this.setData({
        spinShow:true
      })
      wx.getUserInfo({
        lang: "zh_CN",
        success: result => {
          wx.login({
            success: res => {
              console.log(res)
              if (res.code) {
                //发送res.code 到后台
                serviceHelper.postData({
                  url: "/user/login",
                  param: {
                    code: res.code
                  },
                  doSuccess(res) {
                    console.log(res)
                    if (res.type) {
                      wx.setStorageSync("sheIsToken", res.data.token)
                      wx.setStorageSync("sheIsUserInfo", result.userInfo)
                      app.globalData.userInfo = result.userInfo;
                      serviceHelper.token = res.data.token;
                      app.globalData.loginType = true
                      
                      self.setData({
                        spinShow: false,
                        userInfo: result.userInfo,
                        loginType: true
                      })
                    }
                  },
                  doFail() {
                    self.setData({
                      spinShow: false
                    })
                  }
                })
              }
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
          })
        },
        fail(){
          self.setData({
            spinShow: false
          })
          wx.showToast({
            title: '获取账号信息失败！',
            icon: 'cancel',
            duration: 2000
          })
        }
      })
    }
  }
})
