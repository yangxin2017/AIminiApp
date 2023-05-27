// pages/main/records/records.js
import { initTabActive } from '../../../utils/index'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/userInfo'
import { mainLists, templateHistory } from '../../../api/main'
import { formatTime } from '../../../utils/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    tabs: [],
    pageNo: 1,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo'],
      actions: ['handleUpdate']
    })

    let ts = []
    mainLists().then((res) => {
      for (let d of res.data) {
        ts.push({ id: d.id, name: d.title1, data: [], pageNo: 1, pageSize: 10, hasNext: false })
      }
      this.setData({
        tabs: ts
      })
      this.initModuleHistory(ts[0], 0)
    })
  },
  onChange(ev) {
    console.log(ev)
    let ts = this.data.tabs[ev.detail.index]
    this.initModuleHistory(ts, ev.detail.index)
  },

  onLoadMoreHistory(ev) {
    let index = ev.detail.params
    let ts = this.data.tabs[index]
    ts.pageNo = ts.pageNo + 1
    this.initModuleHistory(ts, index)
  },

  initModuleHistory(ts, index) {
    let data = ts.data
    templateHistory(ts.id, this.data.userInfo.id, ts.pageNo, ts.pageSize).then(res => {
      console.log(res)
      for (let d of res.data.data) {
        d.timestr = formatTime(d.requestTime)
        data.push(d)
      }
      let key = `tabs[${index}].data`
      let key2 = `tabs[${index}].hasNext`
      let dat = {}
      dat[key] = data
      dat[key2] = res.data.totalPages > ts.pageNo
      this.setData(dat)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    initTabActive.bind(this)(1)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})