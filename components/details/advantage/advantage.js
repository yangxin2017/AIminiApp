// components/details/advantage/advantage.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showDetail: false,
    value: "",
    triggered: false,
    lists: [
      { id: 1, question: '欢迎', answer: "4月28日消息，外媒放出了iPhone15 Pro的最新渲染图和爆料信息：静音键从拨动式升级为按钮式，并且支持更丰富的自定义功能。充电接口不仅升级到USB-C接口，并且支持更快的雷电3，从而实现实时4K录制功能。遗憾的是潜望式长焦镜头是iPhone15 Pro Max的独享配置，iPhone15 Pro将继续使用3倍光学变焦镜头，苹果终于开启了独宠Pro Max机型的战略了。" },
      { id: 2, question: '欢迎', answer: "4月28日消息，外媒放出了iPhone15 Pro的最新渲染图和爆料信息：静音键从拨动式升级为按钮式，并且支持更丰富的自定义功能。充电接口不仅升级到USB-C接口，并且支持更快的雷电3，从而实现实时4K录制功能。遗憾的是潜望式长焦镜头是iPhone15 Pro Max的独享配置，iPhone15 Pro将继续使用3倍光学变焦镜头，苹果终于开启了独宠Pro Max机型的战略了。" },
      { id: 3, question: '欢迎', answer: "4月28日消息，外媒放出了iPhone15 Pro的最新渲染图和爆料信息：静音键从拨动式升级为按钮式，并且支持更丰富的自定义功能。充电接口不仅升级到USB-C接口，并且支持更快的雷电3，从而实现实时4K录制功能。遗憾的是潜望式长焦镜头是iPhone15 Pro Max的独享配置，iPhone15 Pro将继续使用3倍光学变焦镜头，苹果终于开启了独宠Pro Max机型的战略了。" }
    ],
    scrollHeight: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onRefresh: function(ev) {
      console.log('xiala')
    },
    onPullDownRefresh:function(){
      this.onRefresh();
    },
    refreshData(ev) {
      console.log(ev)
      this.setData({
        triggered: false
      })
    },
    setDetail() {
      this.setData({
        showDetail: true
      })
      setTimeout(()=>{
        const query = wx.createSelectorQuery()
        query.select('#svAdvantage').boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec((res) => {
          console.log(res);
          this.setData({
            scrollHeight: res[1].scrollHeight + 300
          })
        });
      }, 500)
    },
    setDetailOff() {
      this.setData({
        showDetail: false
      })
    },
    changeVal(ev) {
      this.setData({
        value: ev.detail
      })
    },
    sendQuestion(ev) {
      console.log(this.data.value)
    },
  },
})
