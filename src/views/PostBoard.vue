<template>
	<div class="markdown-container">
		<div class="title">
			发布博客编辑器
		</div>
		<mavon-editor 
				v-model="content" 
				ref="md" 
				@change="change" 
				style="min-height: 700px"
		/>
		<button @click="submit">提交</button>
  </div>
</template>
<script>
	import { mavonEditor } from 'mavon-editor'
	import 'mavon-editor/dist/css/index.css'
	import CardMe from '@/components/card/CardMe'
  import SideBar from '@/views/SideBar'
  import CardArticle from '@/components/card/CardArticle'
  import CardArchive from '@/components/card/CardArchive'
  import CardTag from '@/components/card/CardTag'
  import ArticleScrollPage from '@/views/common/ArticleScrollPage'
  import ArticleItem from '@/components/article/ArticleItem'
	export default {
		// 注册
		components: {
			mavonEditor,
		},
		data() {
			return {
				content:'', // 输入的markdown
				html:'',    // 及时转的html
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
			}
		},
		mounted() {

		}
	}
</script>
<style>
</style>