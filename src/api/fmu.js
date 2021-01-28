import request from '@/utils/request'

// 获取模型列表
export function getModelInfo(query) {
  return request({
    url: '/FMUModel/GetPageModelInfo',
    method: 'get',
    params: query
  })
}

// 浏览量+1
export function addViewNum(data) {
  return request({
    url: '/FMUModel/AddViewNum',
    method: 'put',
    params: data
  })
}

// 调用量+1
export function addInvokeNum(data) {
  return request({
    url: '/FMUModel/AddInvokeNum',
    method: 'put',
    params: data
  })
}

export function login(data) {
  return request({
    url: '/User/Login',
    method: 'post',
    data
  })
}
