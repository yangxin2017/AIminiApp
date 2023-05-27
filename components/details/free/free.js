// components/details/free/free.js
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import { postQuestion, questionHistory } from '../../../api/main'
import { store } from '../../../store/userInfo'
import Toast from '@vant/weapp/toast/toast';

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
    tplId: {
      type: [Number],
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: "",
    triggered: false,
    lists: [
      // { id: 1, question: '欢迎', answer: "4月28日消息，外媒放出了iPhone15 Pro的最新渲染图和爆料信息：静音键从拨动式升级为按钮式，并且支持更丰富的自定义功能。充电接口不仅升级到USB-C接口，并且支持更快的雷电3，从而实现实时4K录制功能。遗憾的是潜望式长焦镜头是iPhone15 Pro Max的独享配置，iPhone15 Pro将继续使用3倍光学变焦镜头，苹果终于开启了独宠Pro Max机型的战略了。" },
      // { id: 2, question: '欢迎', answer: "4月28日消息，外媒放出了iPhone15 Pro的最新渲染图和爆料信息：静音键从拨动式升级为按钮式，并且支持更丰富的自定义功能。充电接口不仅升级到USB-C接口，并且支持更快的雷电3，从而实现实时4K录制功能。遗憾的是潜望式长焦镜头是iPhone15 Pro Max的独享配置，iPhone15 Pro将继续使用3倍光学变焦镜头，苹果终于开启了独宠Pro Max机型的战略了。" },
      // { id: 3, question: '欢迎', answer: "4月28日消息，外媒放出了iPhone15 Pro的最新渲染图和爆料信息：静音键从拨动式升级为按钮式，并且支持更丰富的自定义功能。充电接口不仅升级到USB-C接口，并且支持更快的雷电3，从而实现实时4K录制功能。遗憾的是潜望式长焦镜头是iPhone15 Pro Max的独享配置，iPhone15 Pro将继续使用3倍光学变焦镜头，苹果终于开启了独宠Pro Max机型的战略了。" }
    ],
    scrollHeight: 0,
    printAnimate: {
      i: 0,
      len: 0,
      inter: null
    },
    pageNo: 1,
    pageSize: 10,
    total: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    sendQuestion(ev) {
      console.log(this.data.value)
      let tmp = { id: new Date().getTime(), question: this.data.value, answer: '请稍候...' }
      this.data.lists.push(tmp)
      this.setData({
        lists: this.data.lists
      })
      let inx = this.data.lists.length - 1
      let key = `lists[${inx}].answer`
      let keyObj = {}
      this.setScrollHeight();
      postQuestion(this.data.userInfo.id, this.data.tplId, {
        requestMessage: this.data.value,
        requestTime: new Date().getTime(),
        dialogLevel: 3
      }).then(res => {
        ///keyObj[key] = res.data.responseMessage
        this.printAnimateText(keyObj, key, res.data.responseMessage)
      })
    },
    printAnimateText(keyObj, key, fullText) {
      this.data.printAnimate.len = fullText.length
      this.data.printAnimate.i = 0
      if (this.data.printAnimate.inter) {
        clearInterval(this.data.printAnimate.inter)
      }
      this.data.printAnimate.inter = setInterval(() => {
        this.data.printAnimate.i++;
        if (this.data.printAnimate.i >= this.data.printAnimate.len) {
          clearInterval(this.data.printAnimate.inter)
        }
        keyObj[key] = fullText.substring(0, this.data.printAnimate.i)
        this.setData(keyObj)
      }, 100)
    },
    refreshData(ev) {
      console.log('new page')
      this.data.pageNo++
      if (this.data.pageNo > this.data.total) {
        wx.showToast({
          icon: "none",
          title: '没有数据了'
        })
      } else {
        this.initHistory()
      }

      this.setData({
        triggered: false
      })
    },
    setScrollHeight() {
      setTimeout(()=>{
        const query = wx.createSelectorQuery()
        query.select('#svAdvantage').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res) => {
          this.setData({
            scrollHeight: res[1].scrollHeight + 9000
          })
        });
      }, 500)
    },
    initHistory(callback) {
      wx.showLoading({
        title: '加载中...',
      })
      questionHistory(this.data.userInfo.id, this.data.tplId, this.data.pageNo, this.data.pageSize).then(res => {
        let arr = []
        for (let d of res.data.data) {
          arr.push({ id: d.id, question: d.requestMessage, answer: d.responseMessage })
        }
        this.setData({
          lists: arr
        })
        wx.hideLoading()
        this.data.total = res.data.totalPages
        if (callback)
          callback()
      })
    }
  },
  lifetimes: {
    ready() {
      this.initHistory(() => {
        this.setScrollHeight()
      })
    },
    attached() {
      // console.log("FASD")
    }
  },
})
