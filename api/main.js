import request from '../request/axios'

export function testRequest(data) {
  return request.axios({
    method: 'GET',
    url: '/categories',
    data
  })
}

export function mainLists() {
  return request.axios({
    method: 'GET',
    url: '/miniapp/main/layout'
  })
}
export function mainListDetail(id) {
  return request.axios({
    method: 'GET',
    url: '/miniapp/modules/' + id
  })
}

export function postDuiHua(tplId, data) {
  return request.axios({
    method: 'POST',
    url: `/miniapp/templates/${tplId}`,
    data
  })
}
export function templateHistory(moduleId, userId, pageNo, pageSize) {
  return request.axios({
    method: 'GET',
    url: `/miniapp/modules/${userId}/${moduleId}/history?pageNo=${pageNo}&pageSize=${pageSize}`,
  })
}
// /wx/api/v1/miniapp/{userId}/{moduleId}/dialog
export function postQuestion(userId, moduleId, data) {
  return request.axios({
    method: 'POST',
    url: `/miniapp/${userId}/${moduleId}/dialog`,
    data
  })
}
// /wx/api/v1/miniapp/{userId}/{moduleId}/dialog
export function questionHistory(userId, moduleId, pageNo, pageSize) {
  return request.axios({
    method: 'GET',
    url: `/miniapp/${userId}/${moduleId}/dialog?pageNo=${pageNo}&pageSize=${pageSize}`
  })
}

export function getOrders(userId, pageNo, pageSize) {
  return request.axios({
    method: 'GET',
    url: `/wx/api/v1/orders?pageNo=${pageNo}&pageSize=${pageSize}&userId=${userId}`
  })
}
