// pages/main/result/result.js
import { postDuiHua } from '../../../api/main'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultText: '',
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('someData', (data) => {
      this.setData({
        isLoading: true
      })
      postDuiHua(data.tplId, data.data).then((res) => {
        this.setData({
          resultText: res.data.responseMessage,
          isLoading: false
        })
      })
    })
  },
  onClosePage() {
    wx.navigateBack()
  },

  copyText(e) {
    wx.setClipboardData({
      data: this.data.resultText,
      success: function (res) {
        wx.showToast({
          title: '内容已经复制到剪贴板'
        })
      }
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