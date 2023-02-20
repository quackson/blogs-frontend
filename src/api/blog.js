import request from '@/request'

export function getBlogdetail(bid,pid){
    return request({
        url: `/blog/${bid}/post/${pid}`,
        method: 'get'
    })
}