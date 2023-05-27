// components/details/templatem/templatem.js
import Dialog from '@vant/weapp/dialog/dialog';
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/userInfo'
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: ['userInfo'],
    actions: ['handleUpdate']
  },
  /**
   * 组件的属性列表
   */
  properties: {
    formConfig: {
      type: [Array],
      value: []
    },
    tplId: {
      type: [Number],
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showDialog: true
  },

  observers: {
    'formConfig': function(val, val2) {
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showSheet: function(ev) {
      let item = ev.currentTarget.dataset.item
      let key = 'formConfig['+item+'].show'
      let obj = {}
      obj[key] = true
      this.setData(obj)
    },
    onClose: function(ev) {
      let item = ev.currentTarget.dataset.index
      let key = 'formConfig['+item+'].show'
      let obj = {}
      obj[key] = false
      this.setData(obj)
    },
    onSelect: function(ev) {
      let inx = ev.currentTarget.dataset.index
      let key = 'formConfig['+inx+'].val'
      let obj = {}
      obj[key] = ev.detail.value
      this.setData(obj)
    },
    onChange: function(ev) {
      let inx = ev.currentTarget.dataset.index
      let key = 'formConfig['+inx+'].val'
      let obj = {}
      obj[key] = ev.detail
      this.setData(obj)
    },
    onConfirmDate: function(ev) {
      let inx = ev.currentTarget.dataset.index
      let key = 'formConfig['+inx+'].val'
      let obj = {}
      let d1 = this._getDayStrs(ev.detail[0])
      let d2 = this._getDayStrs(ev.detail[1])
      obj[key] = d1 + ',' + d2
      this.setData(obj)
      this.onClose(ev)
    },
    onResult: function(ev) {
      this.setData({
        showDialog: true
      })
      let data = this.properties.formConfig
      console.log(this.data.userInfo) 

      let resdata = []
      for (let d of data) {
        resdata.push({
          "name": d.name,
          "sectionId": d.id,
          "title": d.title,
          "valuestr": d.val,
          "orderNo": d.orderNo
        })
      }
      let resObj = {
        "userId": this.data.userInfo.id,
        "requestTime": new Date().getTime(),
        "moduleId": this.data.tplId,
        "sections": resdata
      }
      wx.navigateTo({
        url: '/pages/main/result/result',
        success: (res) => {
          res.eventChannel.emit('someData', { data: resObj, tplId: this.data.tplId })
        }
      })
    },
    onCloseDialog: function() {
      console.log('close')
    },
    onClickTag: function(ev) {
      let item = ev.currentTarget.dataset
      let inx = item.index
      let pinx = item.paindex
      console.log(item)
      let key = 'formConfig['+pinx+'].val'
      let obj = {}
      obj[key] = item.item.name
      this.setData(obj)
    },
    _getDayStrs(v) {
      let year = v.getFullYear(), month = v.getMonth() + 1, day = v.getDate()
      year = year >= 10 ? year : '0' + year
      month = month >= 10 ? month : '0' + month
      day = day >= 10 ? day : '0' + day
      let str = year + '-' + month + '-' + day
      return str
    }
  }
})
