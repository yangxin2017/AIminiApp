// pages/main/orders/orders.js
import { getOrders } from '../../../api/main'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/userInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    hasNext: false,
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
    this.initOrders()
  },

  initOrders() {
    getOrders(this.data.userInfo.id, this.data.pageNo, this.data.pageSize).then(res => {
      let arr = []
      for (let d of res.data.data) {
        arr.push({
          type: d.serviceType == 1 ? '包月' : '次数',
          source: d.rechargetSource == 1 ? '微信' : (d.rechargetSource == 2 ? '手动' : '其他'),
          month: d.rechargePeriod,
          count: d.rechargeCount
        })
      }
      let total = res.data.totalPages
      this.setData({
        datalist: arr,
        hasNext: this.pageNo <= total
      })
    })
  },

  LoadMore() {
    this.setData({
      pageNo: this.pageNo + 1
    })
    this.initOrders()
  },

  onClosePage() {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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