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
	import {postBlog,editDetail} from '@/api/blog'
	export default {
		// 注册
		components: {
			mavonEditor,
		},
		created(){
			this.getInfo()
		},
		data() {
			return {
				content:'', // 输入的markdown
				html:'',    // 及时转的html
				title:'',
				inputVisible: false,
				inputValue: '',
				options:[{
					value: true,
					label: '公开'
				},
				{
					value: false,
					label: '私密'
				},
				],
				value: '',
				contents:{
					id:-1,
					title:'',
					content:'',
					detail:'',
					author:{
						id:-1,
						name:'',
						avatarURL:'',
						contact:'',
						email:'',
						graduate:'',
					},
					tags:[],
					avatar:'',
					comments:'',
					permission:{
						isPublic:true,
						needReviewComment:false,
					},
					visits:0,
					likes:0,

				},
			}
		},
		methods: {
			// 所有操作都会被解析重新渲染
			change(value, render){
				// render 为 markdown 解析后的结果[html]
				this.html = render;
				
			},
			// 提交
			submit(){
				let that = this
				that.contents.permission.isPublic = this.value
				// console.log(this.content);
				// console.log(this.html);
				// console.log(this.title)
				// console.log(that.contents)
				// console.log(that.contents.permission.isPublic)
				console.log(that.contents.author.id)
				console.log(that.contents.detail)
				postBlog(that.contents.author.id,that.contents).then(data => {
					console.log(that.contents.author.id,data.content,that.content)
					editDetail(that.contents.author.id,data.content,that.content)
				})
			},
			getInfo(){
				let that = this
				// console.log(this.$store.state)
				// console.log(this.$store.state.email)
				that.contents.author = this.$store.state
				// console.log(this.contents.author)
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