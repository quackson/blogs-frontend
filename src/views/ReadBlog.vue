<template>
    <div class="my-view-body" v-title :data-title="title">
        <el-container class="my-view-container">
            <el-main>
                <div class="my-view-card">
                    <h1 class="my-view-title">
                        {{ article.title }}
                    </h1>
                    <div class="my-view-author">
                        <a>
                            <img class="my-view-picture" :src="article.author.avatar"></img>
                        </a>
                        <div class="my-view-info">
                            <span>{{ article.author.nickname }}</span>
                            <span>阅读 {{ article.viewCounts }}</span>
                            <span>评论 {{ article.commentCounts }}</span>
                        </div>
                        <el-button
                            v-if = "this.article.author.id == this.$store.state.id"
                            @click="editblog()">
                            编辑
                        </el-button>     
                    </div>
                    <div class="my-view-content">
                        <markdown-editor :editor=article.editor style="min-height: 700px;"></markdown-editor>
                    </div>
                    <div class="my-view-end">
                        <el-alart
                            title="文章结束..."
                            type="success"
                            center
                            :closable="false">
                        </el-alart>
                    </div>
                    <div class="my-view-comment">
                        <div class="my-view-comment-write">
                            <el-row :gutter="20">
                                <el-col :span="2">
                                    <a>
                                        <img class="my-view-picture" :src="avatar"></img>
                                    </a>
                                </el-col>
                                <el-col :span="22">
                                    <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 2}"
                                        placeholder="你的评论..."
                                        class="my-view-comment-text"
                                        v-model="commentinfo.content"
                                        resize="none">
                                    </el-input>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="2" :offset="22">
                                    <el-button type="text" @click="postcomment()">评论</el-button>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="my-view-comment-title">
                            <span>{{ article.commentCounts }} 条评论</span>
                        </div>
                        <el-card
                            v-for="(item,index) in commentinfos"
                            :index="index"
                            :key="index">
                            {{ item.content }}
                        </el-card>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import MarkdownEditor from '@/components/markdown/MarkdownEditor'
    import {getBlogdetail,getBlogContentDetail,postcommentdetail,getcommentdetail} from '@/api/blog'
    import CommmentItem from '@/components/comment/CommentItem'
    export default {
        name: 'ReadBlog',
        created() {
            this.getBlog()
        },
        data() {
            return {
                article: {
                    id: '',
                    title: '测试',
                    viewCounts: 0,
                    commentCounts: 0,
                    author: {
                        id: '',
                        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                        nickname: '软工学生',
                    },
                    editor: {
                        value: '# 一级标题\n## 二级标题',
                        toolbarsFlag: false,
                        subfield: false,
                        defaultOpen: 'preview'
                    },
                },
                commentinfo: {
                    id: -1,
                    author: {
						id: 		-1,
						name: 		'',
						avatarURL:	'',
						contact:	'',
						email:		'',
						graduate:	'',
					},
                    content: '',
                    post:'',
                    replyed:'',
                    replyTo: {},
                    reviewPassed: true,
                },
                commentinfos:[],
            }
        },
        computed: {
            title(){
                return `${this.article.title} - 文章 - For Fun`
            },
            avatar(){
                return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            },
        },
        methods:{
            getBlog(){
                let that = this
                that.commentinfo.author = this.$store.state
                that.commentinfo.post = `/blog/${that.$route.params.userid}/post/${this.$route.params.blogid}`
                // console.log("store")
                // console.log(this.$store.state.id)
                getBlogdetail(that.$route.params.userid,that.$route.params.blogid).then(data => {
                    // console.log('getblog')
                    // console.log(data)
                    that.article.author.id = data.content.blogger.id
                    that.article.id = data.content.id
                    that.article.title = data.content.title
                    console.log("detail",data.content.detail)
                    getBlogContentDetail(data.content.detail).then(data => {
                        console.log(data)
                        that.article.editor.value = data.content
                    })
                    that.article.author.avatar = 'http://10.129.167.54:8079'+data.content.blogger.avatarUrl
                    // console.log(that.article.author.avatar)
                    that.article.author.nickname = data.content.blogger.name
                    that.article.viewCounts = data.content.visits
                }).catch(error => {
                    if(error !== 'error') {
                        that.$message({type: 'error', message:'文章加载失败',showClose: true})
                    }
                })
                getcommentdetail(that.$route.params.userid,that.$route.params.blogid,true,0,1000).then(data => {
                    console.log(that.$route.params.userid,that.$route.params.blogid)
                    console.log('getcommentdetail')
                    console.log(data)
                    that.commentinfos = data.content
                    that.article.commentCounts = that.commentinfos.length
                    console.log(this.commentinfos)
                })
            },
            editblog(){
                console.log(this.$route.params.userid,this.$route.params.blogid)
                this.$router.push({
                    name:'postboard',
                    params:{
                        userid:this.$route.params.userid,
                        blogid:this.$route.params.blogid,
                    }
                })
            },
            postcomment(){
                console.log(this.commentinfo)
                postcommentdetail(this.$route.params.userid,this.$route.params.blogid,this.commentinfo,-1).then(data => {
                    this.getBlog()
                    this.commentinfo.content = ''
                })
            },
        },
        components: {
            'markdown-editor': MarkdownEditor,
        }
    }
</script>
<style>
    .my-view-body{
        margin: 100px auto 140px;
        height: 100%;
        width: 80%;
    }

    .my-view-container{
        width: 100%;
    }

    .el-main {
        overflow: hidden;
    }

    .my-view-title {
        font-size: 34px;
        font-weight: 700;
        line-height: 1.3;
    }

    .my-view-author {
        margin-top: 30px;
        vertical-align: middle;
    }

    .my-view-picture {
        width: 40px;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 50%;
        vertical-align: middle;
        background-color: #5fb878;
    }

    .my-view-end {
        margin-top: 20px;
    }

    .my-view-comment {
        margin-top: 60px;
    }

    .my-view-comment-title {
        font-weight: 600;
        border-bottom: 1px solid #f0f0f0;
        padding-bottom: 20px;
    }

    .my-view-comment-write {
        margin-top: 20px;
    }

    .my-view-comment-text {
        font-size: 16px;
    }
</style>