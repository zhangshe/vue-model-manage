import request from '@/utils/request'

export function getModelInfo(query) {
  return request({
    url: '/FMUModel/GetPageModelInfo',
    method: 'get',
    params: query
  })
}

export function login(data) {
  return request({
    url: '/User/Login',
    method: 'post',
    data
  })
}
