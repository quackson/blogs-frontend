import request from '@/request'

export function getBlogdetail(bid){
    return request({
        url: `/blog/${bid}/post`,
        method: 'get'
    })
}