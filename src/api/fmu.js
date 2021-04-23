import request from '@/utils/request'

// 获取模型列表
export function getModelInfo(query) {
  return request({
    url: '/FMUModel/GetPageModelInfo',
    method: 'get',
    params: query
  })
}
// 根据条件获取模型列表
export function getModelInfoByCondition(query) {
  return request({
    url: '/FMUModel/GetModelInfoListByCondition',
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
// 获取模型
export function getModelInfoById(query) {
  return request({
    url: '/FMUModel/GetFMUDetail',
    method: 'get',
    params: query
  })
}
// 上传模型
export function uploadModule(data) {
  return request({
    url: '/FMUModel/Post',
    method: 'post',
    data
  })
}

// 添加API模型
export function addAPIModule(data) {
  return request({
    url: '/FMUModel/AddAPIModule',
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

// 上传调用记录
export function PostInvokelog(data) {
  return request({
    url: '/FMUModel/PostUseRecord',
    method: 'post',
    data
  })
}
// 获取调用记录
export function GetInvokeLog(query) {
  return request({
    url: '/FMUModel/GetUseRecord',
    method: 'get',
    params: query

  })
}

// 删除API文件
export function delApiFile(data) {
  return request({
    url: '/FMUModel/DelApiFile',
    method: 'post',
    params: data
  })
}
