import request from '@/request'

export function getPersonalInfo(id) {
  return request({
    url: '/getPersonalInfo',
    method: 'get',
    params: {
      userId: id
    }
  })
}