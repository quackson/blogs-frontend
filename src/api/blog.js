import request from '@/request'

export function getBlogdetail(bid,pid){
    return request({
        url: `/blog/${bid}/post/${pid}`,
        method: 'get'
    })
}

export function getBlogContentDetail(detail){
    return request({
        url: `${detail}`,
        method: 'get'
    })
}