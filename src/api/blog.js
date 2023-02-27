import request from '@/request'
import { method } from 'lodash'

export function getBlogdetail(bid,pid) {
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

export async function postBlog(bid, content) {
    console.log(content)
    return request({
        url: `/blog/${bid}/post`,
        method: 'post',
        data: content
    })
}

export async function editDetail(bid, pid, detail) {
    console.log(`
        bid    = ${bid}
        pid    = ${pid}
        detail = ${detail}
    `)
    return request({
        url: `/blog/${bid}/post/${pid}/detail`,
        method: 'patch',
        data: detail,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8'
        }
    })
}

export function postcommentdetail(bid,pid,comment,reply){
    console.log(`
        bid    = ${bid}
        pid    = ${pid}
        comment = ${comment}
        reply = ${reply}
    `)
    console.log(comment)
    return request({
        url: `/blog/${bid}/post/${pid}/comment`,
        method: 'post',
        data: comment,
        params:{reply: 0},
    })
}

export function getcommentdetail(bid,pid,all,page,ppage){
    return request ({
        url: `/blog/${bid}/post/${pid}/comment`,
        method: 'get',
        params:{
            all:all,
            page:page,
            perpage:ppage,
        }
    })
}

export function editPost(bid,pid,detail){
    return request({
        url:`/blog/${bid}/post/${pid}`,
        method:'patch',
        data:detail
    })
}

export function uploadimagedetail(uid,formdata){
    console.log(formdata)
    return request({
        url:`/blogger/${uid}/attachment`,
        method:'post',
        data:formdata,
        headers: {
            'Content-Type': 'multipart/form-data' 
        },
    })
}