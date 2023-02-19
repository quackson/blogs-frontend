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
					v-model="title"
					placeholder="请输入文章标题"
					class="my-write-input">
			</el-input>
		</div>
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
	export default {
		// 注册
		components: {
			mavonEditor,
		},
		data() {
			return {
				content:'', // 输入的markdown
				html:'',    // 及时转的html
				title:'',
				options:[{
					value: '选项一',
					label: '公开'
				},
				{
					value: '选项二',
					label: '私密'
				},
				],
				value: ''
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
				console.log(this.content);
				console.log(this.html);
				console.log(this.title)
			}
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
</style>