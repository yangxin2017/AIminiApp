// components/records/record-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    datalist: {
      type: [Array],
      value: []
    },
    index: {
      type: [String, Number],
      value: -1
    },
    hasNext: {
      type: [Boolean],
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goDetail() {
      wx.navigateTo({
        url: '/pages/main/result-view/result',
      })
    },
    LoadMore() {
      this.triggerEvent('LoadMore', { params: this.data.index }, {})
    }
  }
})
