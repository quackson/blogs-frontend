<template>
    

    <el-container >
      <sidebar> </sidebar>
      <el-col :span="4">
        <el-row>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            style="margin-top:20%;margin-left:30%;">
            <img v-if="BlogInfo.blogger.avatarUrl" :src="BlogInfo.blogger.avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-row>
        <el-row>
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-change="handleChange"
            :file-list="fileList3"
            style="margin-left:40%;margin-top:5%;">
            <el-button size="small" type="primary" style="font-size:100%">点击上传</el-button>
          </el-upload>
        </el-row>
      <el-row>
        <div style="text-align:center;margin-top:5%;">
        </div>
          <el-form ref="form" :model="BlogInfo.blogger" label-width="50%" size="medium" style="font-size:20px;margin-top:10%;">
            <el-form-item label="用户名称" style="width:100%;height:20%;font-size:20px;margin-top:10%;">
              <el-input v-model="BlogInfo.blogger.name"></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" style="width:100%;height:20%;margin-top:5%;">
              <el-input v-model="BlogInfo.blogger.email"></el-input>
            </el-form-item>
            <el-form-item label="用户毕业院校" style="width:100%;height:20%;margin-top:5%;">
              <el-input v-model="BlogInfo.blogger.graduate"></el-input>
            </el-form-item>
            <el-form-item label="用户联系方式" style="width:100%;height:20%;margin-top:5%;">
              <el-input v-model="BlogInfo.blogger.contact"></el-input>
            </el-form-item>
          </el-form>
      </el-row>
      <el-row>
        <div style="margin-top:5%;">
          <el-button type="success" plain style="font-size:100%;margin-left:38%;">提交修改</el-button>
        </div>
      </el-row>
      </el-col>
      <el-col>
        <div v-for="a in articles" :key="a.id" style="width:90%;margin-left:5%;">
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

  import {getPersonalInfo} from '@/api/user'
  import {getHotTags} from '@/api/tag'
  import {listArchives} from '@/api/article'

  export default {
    name: 'userboard',
    created() {
    },
    data() {
      return {
        BlogInfo : {
            blogger: {
                  id:-1,
                  avatarUrl:'https://img0.baidu.com/it/u=1250551608,2180019998&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                  name: 'testuser',
                  email: '17000xx',
                  contact:'asdasdasd',
                  graduate:'peking'
                },
            visitCount: 0,
            likeCount:  0,
            fans:  0,
            blogCount:  0,
            blogsUrl:   0
        },
        articles:[
            {
              id:0,
              title: "article1",
              content: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
              author: {
                  id: 0,
                  name: "testuser1",
                  avatarUrl: "xxxx",
                  contact: 'xxxxxxx',
                  email: "xxxxxxxxxx",
                  graduate: "xxxxxxxxxx"
              },
              tags: [
                {
                  id: 0,
                  name:"test1",
                  owner:{
                            id: 0,
                            name:  "test",
                            avatarUrl:  "url",
                            contact: "123123123",
                            email: "123@pku.edu.cn",
                            graduate: "peking University"
                        },
                  description:"xxxxxxxxxxxxxx"
                },{
                  id: 1,
                  name:"t",
                  owner:{
                            id: 0,
                            name:  "test",
                            avatarUrl:  "url",
                            contact: "123123123",
                            email: "123@pku.edu.cn",
                            graduate: "peking University"
                        },
                  description:"xxxxxxxxxxxxxx"
              }],
              avatar: "xxxxxxxxxxx",
              comments: "xxxxxxxxxxxxxxx",
              permission: {
                  isPublic: true ,
                  needReviewComment:  true
              },
              visits: 123,
              likes: 11,
              unreviewedCount: 12
          }
        ],
        perpage:5,
        pageint:1,
        userID:-1
      }
    },
    created(){
      for(var i=0; i < 2;++i){
        this.articles = this.articles.concat(this.articles)
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageint = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleAvatarSuccess(res, file) {
        let user = this.BlogInfo
        user.blogger.imageUrl = URL.createObjectURL(file.raw);
        this.BlogInfo = user
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    components: {
      'card-me': CardMe,
      'card-article': CardArticle,
      'card-tag': CardTag,
      ArticleScrollPage,
      CardArchive,
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
