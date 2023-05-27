// const app = getApp()
import { initTabActive } from '../../../utils/index'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/userInfo'

import { login, getInfo } from '../../../api/login'
import { mainLists } from '../../../api/main'
Page({
  data: {
    time: +new Date(),
    menus: [],
    mpCode: null,
    loading: false,

    isIn: false
  },
  judgeIsSub(gzhCode) {
    wx.showLoading({
      title: '加载中,请稍候...',
    })
    wx.login({
      success: (res) => {
        let code = res.code
        login({jsCode: code, mpCode: ""}).then((r) => {
          wx.setStorageSync('token', r.data.sessionKey)
          wx.setStorageSync('userId', r.data.userId)
          if (r.code === 0) {
            getInfo(r.data.userId).then(ri => {
              this.handleUpdate(ri.data)
              this.initMainLayout()
              this.setData({
                isIn: true
              })
            })
          }
        })
        // this.goSubGZHPage()
      },
    })
  },
  initMainLayout() {
    mainLists().then(res => {
      let menu = res.data
      let arr = []
      for (let m of menu) {
        arr.push({
          id: m.id, title: m.title1, desc: m.title2, url: 'https://warmstar.cc/static' + m.imgUrl
        })
      }
      this.setData({
        menus: arr
      })
      wx.hideLoading()
    })
  },
  goSubGZHPage() {
    wx.navigateTo({
      url: '/pages/main/gongzhonghao/gongzhonghao',
    })
  },
  goAuthPage() {
    wx.navigateTo({ 
      url: '/pages/main/authweb/authWeb',
    })
  },
  onLoad(options) {
    this.judgeIsSub(options.code)
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['userInfo'],
      actions: ['handleUpdate']
    })

    // let menus = [
    //   {id: 1, url: "../../images/icon1.png", title: "公文写作", desc: "按照写作步骤一步一步生成文章", config: [
    //     {id: 1, title: '文章标题', len: 30, type: 'text', val: ''},
    //     {id: 2, title: '阅读人群：', type: 'select', val: '', show: false, datas: [
    //       {id: 1, name: '企业', value: '企业'},
    //       {id: 2, name: '政府', value: '政府'},
    //     ]},
    //     {id: 3, title: '文章风格', len: 30, type: 'text', val: ''},
    //     {id: 4, title: '关键词', len: 30, type: 'textarea', val: ''},
    //     {id: 4, title: '数字', len: 30, type: 'number', val: ''},
    //     {id: 4, title: '时间范围', len: 30, type: 'date', val: ''},
    //     {id: 5, title: '应用场景：', type: 'select', val: '', show: false, datas: [
    //       {id: 1, name: '科研', value: '科研'},
    //       {id: 2, name: '需求分析', value: '需求分析'},
    //     ]},
    //     {id: 99, title: '阅读人群：', type: 'enum', val: '', show: false, datas: [
    //       {id: 1, name: '企业', value: '企业'},
    //       {id: 2, name: '政府', value: '政府'},
    //       {id: 3, name: '政府2', value: '政府2'},
    //     ]},
    //   ]},
    //   {id: 2, url: "../../images/icon1.png", title: "小红书种草文案", desc: "根据产品特点，帮你生成符合小红书调性的分享文案.."},
    //   {id: 3, url: "../../images/icon1.png", title: "小红书笔记标题", desc: "为你的小红书笔记生成充满点击欲的标题"},
    //   {id: 4, url: "../../images/icon1.png", title: "小红书旅游攻略", desc: "根据目的地和旅游天数生成旅游攻略"},
    //   {id: 5, url: "../../images/icon1.png", title: "短视频脚本大纲", desc: "千字直播脚本，内容详细，秒生成，太方便啦!"},
    //   {id: 6, url: "../../images/icon1.png", title: "带货视频口播搞", desc: "带货视频口播搞"},
    //   {id: 7, url: "../../images/icon1.png", title: "视频内容灵感", desc: "蹭热点拍视频？让AI写稿助手来提供灵感"},
    //   {id: 8, url: "../../images/icon1.png", title: "生成摘要", desc: "根据题目和关键词生成摘要"},
    //   {id: 9, url: "../../images/icon1.png", title: "文章优化", desc: ""},
    //   {id: 10, url: "../../images/icon1.png", title: "文章检查", desc: ""},
    // ]
    // this.setData({
    //   menus: menus
    // })

    var that = this
    // wx.getSetting({
    //   success: (res) => {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success () {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.getUserInfo().then(info => {
    //             console.log(this.userInfo)
    //             console.log(info)
    //           })
    //         }
    //       })
    //     } else {
    //       wx.getUserInfo().then(info => {
    //         this.handleUpdate({name: 'BBBBBBB'})
    //         console.log(this.data.userInfo)
    //       })
    //     }
    //   }
    // })
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
  onShow: function() {
    initTabActive.bind(this)(0)
    // let pages = getCurrentPages();
    // let currPage = pages[pages.length - 1];
    // console.log(currPage)
    console.log(this.data)
    if (!this.data.isIn && this.data.mpCode) {
      this.judgeIsSub(this.data.mpCode)
    }
  },
  toDetail: function(event) {
    let id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: '../detail/detail?id=' + id + '&title=' + event.currentTarget.dataset.item.title,
      // success: function(res) {
      //   res.eventChannel.emit('someData', { data: event.currentTarget.dataset.item })
      // }
    })
  }
})
