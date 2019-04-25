Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/static/img/icon_component.png",
      selectedIconPath: "/static/img/icon_component_HL.png",
      text: "首页"
    }, {
        pagePath: "/pages/my/my",
      iconPath: "/static/img/icon_API.png",
      selectedIconPath: "/static/img/icon_API_HL.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})