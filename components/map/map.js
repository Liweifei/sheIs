const app = getApp()
var self;
var QQMapWX = require('../../static/js/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'L4MBZ-GK4KJ-OVDFJ-KACZ7-23RJO-VWFKE' // 必填 L4MBZ-GK4KJ-OVDFJ-KACZ7-23RJO-VWFKE是腾讯位置服务开发者key
});  
Component({
  data: {
    longitude: '',
    latitude: '',
    map:false,
    mapScale:16,
    mapObj:null,
    markers:[]
  },
  pageLifetimes: {
    show() {
      
    }
  },
  ready(){
    self = this;
    self.mapObj = wx.createMapContext('myMap');
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        console.log('初始化拿到的经纬度：' + res.latitude + ',' + res.longitude)
        self.setData({
          map: true,
          latitude: res.latitude,
          longitude: res.longitude,
        })
        // 经纬度转地点
        // 东照大厦经纬度 ln：113.27641 la：23.13153
        qqmapsdk.reverseGeocoder({
          location:{
            latitude: res.latitude,
            longitude: res.longitude
          },
          //位置坐标，默认获取当前位置，非必须参数
          //Object格式
          // location: {
          //   latitude: 39.984060,
          //   longitude: 116.307520
          // }
          success: function (res) {//成功后的回调
            self.triggerEvent('getLocation', res.result.address)
          }
        });
        // 查询地点
        // console.log(qqmapsdk);
        // qqmapsdk.search({
        //   keyword: '广东省广州市越秀区东风中路515号',
        //   success: function (res) {
        //     console.log(res);
        //   },
        //   fail: function (res) {
        //     console.log(res);
        //   }
        // });
        
      }
    })
    // wx.chooseLocation(({
    //   success(res) {
    //     console.log(res)
    //   }
    // }))
  },
  methods:{
    position(){//定位
      wx.getLocation({
        type: 'gcj02',
        success(res) {
          console.log('定位拿到的经纬度：' + res.latitude + ',' + res.longitude)
          self.setData({
            map: true,
            latitude: res.latitude,
            longitude: res.longitude,
          })
          //新增markers
          const markers = self.data.markers;
          markers.push({
            id: 0,
            iconPath:"/static/img/woman.png",
            width:"70rpx",
            height:"70rpx",
            latitude: res.latitude,
            longitude: res.longitude,
            // alpha:0,
            // callout: {
            //   content: "东照大厦",
            //   padding: 10,
            //   display: 'ALWAYS',
            //   textAlign: 'center',
            //   // borderRadius: 10,
            //   // borderColor:'#ff0000',
            //   // borderWidth: 2,
            // }
          }) 
          self.setData({
            markers: markers
          })

          // 经纬度转地点
          // 东照大厦经纬度 ln：113.27641 la：23.13153
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude
            },
            //位置坐标，默认获取当前位置，非必须参数
            //Object格式
            // location: {
            //   latitude: 39.984060,
            //   longitude: 116.307520
            // }
            success: function (re) {//成功后的回调
              console.log(re)
              self.setData({
                latitude: res.latitude,
                longitude: res.longitude,
              })
              self.mapObj.moveToLocation();
              self.triggerEvent('getLocation', re.result.address)
            }
          });
        }
      })
    },
    magnify() {//地图放大
      if(self.data.mapScale<18){
        self.setData({
          mapScale: ++self.data.mapScale
        })
      }
    },
    shrink() {//地图缩小
      if (self.data.mapScale > 5) {
        self.setData({
          mapScale: (--self.data.mapScale)
        })
      }
    },
    showMarkerInfo(e) {//点击头像获取相关信息
      console.log(e.markerId)
    },
  }
})
