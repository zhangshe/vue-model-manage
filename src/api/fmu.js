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

// 添加模型
export function addModule(data) {
  return request({
    url: '/FMUModel/AddModule',
    method: 'post',
    data
  })
}

// 修改模型
export function updateModule(data) {
  return request({
    url: '/FMUModel/UpdateModule',
    method: 'post',
    data
  })
}

// 删除模型
export function delModel(data) {
  return request({
    url: '/FMUModel/DelModel',
    method: 'delete',
    data
  })
}
