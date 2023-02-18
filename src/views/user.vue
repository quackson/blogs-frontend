<template>
    

    <el-container >

      <el-main class="me-articles">

        <div v-for="a in articleshow" :key="a.id" style="width:90%;margin-left:5%;">
          <el-row>
            <el-col :span="24">
              <article-item v-bind="a" style="margin-top:1%;"></article-item>
            </el-col>
          </el-row>
        </div>
        <div class="block" style="margin-left:32%; bottom:1%; position: absolute;background-color:#FFEFD5;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageint"
            :page-size="perpage"
            layout="prev, pager, next, jumper"
            :total="BlogInfo.blogCount">
          </el-pagination>
        </div>

      </el-main>

      <el-aside>

        <card-me :userinfo="userInfo" class="me-area" style="position:absolute; width:18%;"></card-me>
        <card-tag :tags="hotTags" :title="tagtitle" class="me-tags" style="margin-top:21%;position:absolute; width:18%;"></card-tag>

      </el-aside>

    </el-container>
  
</template>

<script>
  import CardMe from '@/components/card/CardMe'
  import CardArticle from '@/components/card/CardArticle'
  import CardArchive from '@/components/card/CardArchive'
  import CardTag from '@/components/card/CardTag'
  import ArticleScrollPage from '@/views/common/ArticleScrollPage'
  import ArticleItem from '@/components/article/ArticleItem'

  import {getBlogInfo, getUserBlog, getUserTags} from '@/api/user'
  import {getPersonalInfo} from '@/api/user'
  import {getHotTags} from '@/api/tag'
  import {listArchives} from '@/api/article'

  export default {
    name: 'user',
    created() {      
      this.userInfo =  this.$route.params.userInfo;
      this.getBlogInfo()
      this.getUserBlog()
      this.getUserTags()
    },
    data() {
      return {
        hotTags: [],
        tagtitle:"TAGS",
        articleshow: [],
        pageint:1,
        perpage:5,
        userInfo:{},
        BlogInfo:[]
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {        
        this.pageint = val;
        let that = this
        this.getUserBlog()
        console.log(`当前页: ${val}`);
      },
      getBlogInfo() {
        let that = this
        
        getBlogInfo(that.userInfo.id).then(data => {
          if (data.code == 0) {
            that.BlogInfo = data.content;
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '加载用户信息失败!', showClose: true})
          }

        })
        
      },
      getUserBlog() {
        let that = this
        
        getUserBlog(that.userInfo.id, that.pageint, that.perpage).then(data => {
          if (data.code == 0) {
            that.articleshow = data.content;
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }

        })
        
        
      },
      getUserTags() {
        
        let that = this;   
        getUserTags(that.userInfo.id).then(data => {
          that.getUserTags = data.content
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '标签加载失败!', showClose: true})
          }

        })
        
      },

    },
    components: {
      'card-me': CardMe,
      'card-article': CardArticle,
      'card-tag': CardTag,
      ArticleScrollPage,
      CardArchive,      
      'article-item':ArticleItem,
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
  .el-tag + .el-tag {
    margin-left: 10px;
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
  .background{
    width:100%;  
    height:100%;  
    z-index:-1;
    position: absolute;
}
</style>
