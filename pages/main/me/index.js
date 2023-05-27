// const app = getApp()
import { initTabActive } from '../../../utils/index'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/userInfo'
Page({
  data: {
    show: false,
    isCz: true
  },
  onShow: function() {
    initTabActive.bind(this)(2)
  },
  onShowCZ() {
    this.setData({
      show: true,
      isCz: true
    })
  },
  onShowWm() {
    this.setData({
      show: true,
      isCz: false
    })
  },
  
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo'],
      actions: ['handleUpdate']
    })
    console.log(this.data)
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
  goOrders() {
    wx.navigateTo({
      url: '/pages/main/orders/orders',
    })
  }
})
