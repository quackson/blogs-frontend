<template>
	<div class="markdown-container">
		<div class="title" style="font-size:20px;">
			发布博客编辑器
		</div>
		<div class="my-write-title">
			<el-input
					resize="none"
					type="textarea"
					autosize
					v-model="contents.title"
					placeholder="请输入文章标题"
					class="my-write-input">
			</el-input>
		</div>
		<div class="my-write-content">
			<el-input
					resize="none"
					type="textarea"
					autosize
					v-model="contents.content"
					placeholder="请输入文章简介"
					class="my-write-input">
			</el-input>
		</div>
		<el-card class="search">
			<el-col>
				添加标签
			</el-col>
			<el-tag
            	:key="tag"
            	v-for="tag in contents.tags"
            	closable
            	:disable-transitions="false"
            	@close="handleClose(tag)"
            	style="margin-top:5%;">
            	{{tag.name}}
          	</el-tag>
        	<el-input
            	class="input-new-tag"
            	v-if="inputVisible"
            	v-model="inputValue"
            	ref="saveTagInput"
            	size="small"
            	@keyup.enter.native="handleInputConfirm"
            	@blur="handleInputConfirm"
            	style="margin-top:5%;"
          	>
          	</el-input>
          	<el-button v-else class="button-new-tag" size="small" @click="showInput" style="margin-top:5%;">+ 添加标签</el-button>
        </el-card>
		<mavon-editor 
				v-model="content" 
				ref="md" 
				@change="change" 
				style="min-height:800px;"
		/>
		<div class="select">
			<el-select v-model="value" placeholder="请选择是否公开">
				<el-option
					v-for="item in options"
					:key="item.value"
					:label="item.label"
					:value="item.value">
				</el-option>
			</el-select>
		</div>
		<el-button @click="submit" style="font-size:20px;">提交</el-button>
  </div>
</template>
<script>
	import { mavonEditor } from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	import {postBlog,editDetail,getBlogdetail,getBlogContentDetail,editPost} from '@/api/blog'
	export default {
		// 注册
		components: {
			mavonEditor,
		},
		created() {
			this.getInfo()
		},
		data() {
			return {
				content:		'', // 输入的markdown
				html:			'',    // 及时转的html
				title:			'',
				inputVisible:	false,
				inputValue: 	'',
				options: [
					{ value: true,  label: '公开' },
					{ value: false, label: '私密' },
				],
				value: '',
				contents: {
					id: 		-1,
					title: 		'',
					content: 	'',
					detail: 	'',
					author: {
						id: 		-1,
						name: 		'',
						avatarURL:	'',
						contact:	'',
						email:		'',
						graduate:	'',
					},
					tags: [],
					avatar: '',
					comments: '',
					permission: {
						isPublic: true,
						needReviewComment: false,
					},
					visits: 0,
					likes: 0,

				},
			}
		},
		methods: {
			// 所有操作都会被解析重新渲染
			change(value, render) {
				// render 为 markdown 解析后的结果[html]
				this.html = render;
				
			},
			// 提交
			submit() {
				let that = this

				const postInfo = that.contents

				postInfo.permission.isPublic = this.value
				console.log('submit')
				if(that.$route.params.userid){
					console.log('have param')
					editPost(that.$route.params.userid,that.$route.params.blogid,postInfo).then(data => {
						console.log('editpost')
						console.log(data)
					})
					editDetail(that.$route.params.userid,that.$route.params.blogid,that.content).then(data => {
						console.log('editdetail')
						console.log(data)
					})
				}
				else{
					const authorId = postInfo.author.id
					// 在函数中也可以定义临时的函数.
					// 我们要用`await`语法, 所以这个函数需要被标记为async
					async function addPost() {
						console.log(`authorId = ${authorId}, detail = ${postInfo.detail}`)
						let ret = await postBlog(authorId, postInfo) // await可以阻塞调用, 直到API接口请求完成, 才将获取到的数据赋值给ret
						// 对了, 接口必须被标记为async才能使用await语法. 可以去看看postBlog函数的定义, 也加上async标记了. 
						if (ret.code != 0) {
							console.error(ret.reason)
							return	// 这里我图省事儿了. 正常应该抛出异常的, 这样就可以在下面的`addPost().catch()`中统一处理了.
						}
						let postId = ret.content

						ret = await editDetail(authorId, postId, that.content)
						// Duplicated code. Should be "abstracted out"
						if (ret.code != 0) {
							console.error(ret.reason)
							return
						} 
					} 
					// 上面只是定义了方法, 这里调用. 
					addPost().catch(e => {
						// Handle network error
						console.log("Network ERROR!")
						console.error(e)
					})
				}
				
				that.$router.push({
					name:'userboard'
				})
			},
			getInfo() {
				let that = this
				// console.log(this.$store.state)
				// console.log(this.$store.state.email)
				that.contents.author = this.$store.state
				// console.log(this.contents.author)
				if(that.$route.params.userid){
					getBlogdetail(that.$route.params.userid,that.$route.params.blogid).then(data => {
						console.log(data)
						that.contents = data.content
						console.log(that.contents)
						getBlogContentDetail(data.content.detail).then(data => {
							console.log(data)
							that.content = data.content
							console.log("all gets!")
						})
					})
				}
			},
			handleClose(tag) {
				
        		this.contents.tags.splice(this.contents.tags.indexOf(tag), 1);
      		},
			showInput() {
        		this.inputVisible = true;
        		this.$nextTick(_ => {
          			this.$refs.saveTagInput.$refs.input.focus();
        		});
      		},
			handleInputConfirm() {
        		let inputValue = this.inputValue;
        		if (inputValue) {
					inputValue = {name:inputValue};
          			this.contents.tags.push(inputValue);
        		}
        		this.inputVisible = false;
        		this.inputValue = '';
     		},
		},
		mounted() {

		}
	}
</script>
<style>
.markdown-container{
	width:70%;
	height:100%;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
	width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>