<template>
  
    <el-container>

      <el-main class="me-articles">

        <article-scroll-page></article-scroll-page>

      </el-main>

      <el-aside>

        <card-me :userInfo="userInfo" :userId="userId" class="me-area"></card-me>
        <card-tag :tags="hotTags" class="me-tags"></card-tag>

      </el-aside>

    </el-container>
  
</template>

<script>
  import CardMe from '@/components/card/CardMe'
  import CardArticle from '@/components/card/CardArticle'
  import CardArchive from '@/components/card/CardArchive'
  import CardTag from '@/components/card/CardTag'
  import ArticleScrollPage from '@/views/common/ArticleScrollPage'

  import {getArticles, getHotArtices, getNewArtices} from '@/api/article'
  import {getPersonalInfo} from '@/api/user'
  import {getHotTags} from '@/api/tag'
  import {listArchives} from '@/api/article'

  export default {
    name: 'Index',
    created() {
      this.getHotArtices()
      this.getNewArtices()
      this.getHotTags()
      this.listArchives()
      this.getPersonalInfo()
      this.getMeInfo()
    },
    data() {
      return {
        hotTags: [],
        hotArticles: [],
        newArticles: [],
        archives: [],
        userInfo:{},
        userId:-1
      }
    },
    methods: {
      getMeInfo() {
        this.userId = 0
      },
      getPersonalInfo() {
        let that = this
        /*
        getPersonalInfo().then(data => {
          that.userInfo = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '用户信息加载失败!', showClose: true})
          }
        */
        that.userInfo = {
          'userName':'testuser',
          'email':'17xxx@pku.edu.cn',
          'contactInfo':123123123,
          'userId':1,
          'graduate':'Peking University'
        }

        console.log(this.userInfo)
      },
      getHotArtices() {
        let that = this
        getHotArtices().then(data => {
          that.hotArticles = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '最热文章加载失败!', showClose: true})
          }

        })

      },
      getNewArtices() {
        let that = this
        getNewArtices().then(data => {
          that.newArticles = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '最新文章加载失败!', showClose: true})
          }

        })

      },
      getHotTags() {
        
        let that = this;        
        var color= ['primary', 'success', 'warning', 'danger', 'info', 'text']
        var temp_data = [];
        /*
        getHotTags().then(data => {
          temp_data = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '最热标签加载失败!', showClose: true})
          }

        })
        */
        temp_data = [
          {
            id: 0,
            tagname:"test1"
          },{
            id: 1,
            tagname:"test2"
          },{
            id: 2,
            tagname:"3"
          },{
            id: 3,
            tagname:"t"
          }
        ]
        for(var i=0; i<temp_data.length; i++) {
          temp_data[i].color = color[i%6];
        }
        that.hotTags = temp_data;
        console.log(this.hotTags)
      },
      listArchives() {
        listArchives().then((data => {
          this.archives = data.data
        })).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章归档加载失败!', showClose: true})
          }
        })
      }

    },
    components: {
      'card-me': CardMe,
      'card-article': CardArticle,
      'card-tag': CardTag,
      ArticleScrollPage,
      CardArchive
    }
  }
</script>

<style scoped>

  .el-container {
    width: 100%;
  }

  .el-aside {
    margin-right: 5%;
    width: 100%;
  }

  .el-main {
    padding: 0px;
    line-height: 16px;
  }

  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 20px;
  }

  .me-tags {
    margin-top:10%;
  }
</style>
