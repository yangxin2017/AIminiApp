// pages/main/detail/detail.js

import { mainListDetail } from '../../../api/main'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/userInfo'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "公文写作",
    active: 0,
    formConfig: [],
    tplId: -1
  },

  onChange: function(ev) {
    setTimeout(()=> {
      var freeDH = this.selectComponent("#freeDH")
      freeDH.setScrollHeight()
    }, 10)
  },
  onClosePage() {
    wx.navigateBack();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getTypeObj(m) {
    let type = m.uiType
    if (type == 1) {
      return { id: m.id, name: m.name, orderNo: m.orderNo, title: m.title, type: 'text', val: '', len: 30 }
    } else if (type == 2) {
      let ds = m.values
      let datas = []
      for (let i=0;i<ds.length;i++) {
        datas.push({ id: i+1, name: ds[i], value: ds[i] })
      }
      return { id: m.id, name: m.name, orderNo: m.orderNo, title: m.title, type: 'select', val: '', show: false, datas: datas }
    } else if (type == 3) {
      let ds = m.values
      let datas = []
      for (let i=0;i<ds.length;i++) {
        datas.push({ id: i+1, name: ds[i], value: ds[i] })
      }
      return { id: m.id, name: m.name, orderNo: m.orderNo, title: m.title, type: 'enum', val: '', show: false, datas: datas }
    } else if (type == 4) {
      return { id: m.id, name: m.name, orderNo: m.orderNo, title: m.title, type: 'textarea', val: '', len: 150 }
    }
  },
  onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo'],
      actions: ['handleUpdate']
    })
    /////////////////////////
    let id = options.id
    this.setData({
      title: options.title
    })
    
    mainListDetail(id).then(res => {
      let configs = []
      for (let r of res.data) {
        configs.push(this.getTypeObj(r))
      }
      this.setData({
        formConfig: configs,
        tplId: id
      })
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