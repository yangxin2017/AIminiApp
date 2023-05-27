import { observable, action } from 'mobx-miniprogram'
export const store = observable({
  info: {
    name: '123'
  },
  // 计算属性
  get userInfo() {
    return this.info
  },
  // actions
  handleUpdate: action(function(userinfo) {
    this.info = userinfo
  })

})
