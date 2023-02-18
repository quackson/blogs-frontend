<template>
    

    <el-container >
      <sidebar> </sidebar>
      <el-col :span="20">
        <div v-for="a in followed" :key="a.id" style="width:90%;margin-left:5%;">
          <el-row>
            <el-col :span="22">
              <article-item v-bind="a" style="margin-top:1%;"></article-item>
            </el-col>
            <el-col :span="2">
              <el-row><i class="el-icon-edit" style="text-color=#000000;font-size:30px;margin-top:20%;"></i></el-row>
            </el-col>
          </el-row>
        </div>
        <div class="block" style="margin-left:30%; bottom:1%; position: absolute;background-color:#FFEFD5;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </el-col>
    </el-container>
  
</template>

<script>
  import CardMe from '@/components/card/CardMe'
  import SideBar from '@/views/SideBar'
  import CardArticle from '@/components/card/CardArticle'
  import CardArchive from '@/components/card/CardArchive'
  import CardTag from '@/components/card/CardTag'
  import ArticleScrollPage from '@/views/common/ArticleScrollPage'
  import ArticleItem from '@/components/article/ArticleItem'

  import {getPersonalInfo, updateUserInfo} from '@/api/login'
  import {getHotTags} from '@/api/tag'
  import {listArchives} from '@/api/article'

  export default {
    name: 'userboard',
    
    data() {
      return {
        followed:[],
        perpage:10,
        pageint:1
      }
    },
    created() { 
      this.getFollowed()
    },
    methods: {
      getBloggerInfo() {
        let that  = this;
        getPersonalInfo(that.userID).then(data => {
          that.BlogInfo = data.content
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '用户信息加载失败!', showClose: true})
          }
        })

      },
      handleSizeChange(val) {
        this.pageint = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      getFollowed() {
        
      }
      
    },
    components: {
      'article-item':ArticleItem,
      'sidebar':SideBar
    }
  }
</script>

<style scoped>

  .el-container {
    width: 100%;
    height:100%;
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
