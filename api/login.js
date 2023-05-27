import request from '../request/axios'

// 登录
export function login(data) {
  return request.axios({
    method: 'post',
    url: '/users/miniapp/login',
    data
  })
}

// 获取用户信息
export function getInfo(userId) {
  return request.axios({
    method: 'get',
    url: '/users/basicInfo/' + userId
  })
}
