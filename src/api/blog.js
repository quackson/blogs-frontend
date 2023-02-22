import request from '@/request'

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