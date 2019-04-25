var baseURL = "http://localhost:3888";
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
const service={
  token:null,
  postData({ url, param = {}, doSuccess, doFail}){
    wx.request({
      url: baseURL + url,
      header: {
        "content-type": "application/json;charset=UTF-8"
      },
      data: param,
      method: 'POST',
      success(res) {
        doSuccess(res.data);
      },
      fail() {
        doFail();
      },
    })
  },
  getData({ url, param = {}, doSuccess, doFail }) {
    var urlLink = '';
    Object.keys(param).map((key) => {
      var link = '&' + key + "=" + param[key];
      urlLink += link;
    })
    wx.request({
      url: host + url + "?" + urlLink.substr(1),
      header: {
        "content-type": "application/json;charset=UTF-8"
      },
      method: 'GET',
      success(res) {
        doSuccess(res.data);
      },
      fail() {
        doFail();
      },
    })
  }
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
module.exports = service;