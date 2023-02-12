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
            <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
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
          <el-form ref="form" label-width="50%" size="medium" style="font-size:20px;margin-top:10%;">
            <el-form-item label="用户名称" style="width:100%;height:20%;font-size:20px;margin-top:10%;">
              <el-input v-model="name" place></el-input>
            </el-form-item>
            <el-form-item label="用户邮箱" style="width:100%;height:20%;margin-top:5%;">
              <el-input v-model="email"></el-input>
            </el-form-item>
            <el-form-item label="用户毕业院校" style="width:100%;height:20%;margin-top:5%;">
              <el-input v-model="graduate"></el-input>
            </el-form-item>
            <el-form-item label="用户联系方式" style="width:100%;height:20%;margin-top:5%;">
              <el-input v-model="contact"></el-input>
            </el-form-item>
          </el-form>
      </el-row>
      <el-row>
        <div style="margin-top:5%;">
          <el-button type="success" plain @click="updateUserInfo()" style="font-size:100%;margin-left:38%;">提交修改</el-button>
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

  import {getPersonalInfo, updateUserInfo} from '@/api/user'
  import {getHotTags} from '@/api/tag'
  import {listArchives} from '@/api/article'

  export default {
    name: 'userboard',
    
    data() {
      return {
        userInfo : {},
        name: '',
        contact: '',
        graduate: '',
        email: '',
        avatarUrl:'',
        BlogInfo : {},
        articles:[],
        perpage:5,
        pageint:1,
        userID:-1
      }
    },
    created() { 
      //console.log('cookie')    
      //console.log(this.$cookieStore.getCookie('id'))
      this.userInfo = this.$route.params.userInfo;
      console.log("get userinfo")
      console.log(this.userInfo)
      this.name = this.$route.params.userInfo.name;
      this.contact = this.$route.params.userInfo.contact;
      this.graduate = this.$route.params.userInfo.graduate;
      this.email = this.$route.params.userInfo.email;
      this.avatarUrl = this.$route.params.userInfo.avatarUrl;
      this.userID = this.$store.state.id;
      this.getBloggerInfo()
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
      handleAvatarSuccess(res, file) {
        var avatarUrlNew = URL.createObjectURL(file.raw);
        this.avatarUrl = avatarUrlNew
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
      },
      updateUserInfo(){
        let that  = this;
        var blogger = {
          id: that.userID,
          name:  that.name,
          avatarUrl:that.avatarUrl,
          contact: that.contact,
          email:  that.email, 
          graduate: that.graduate,
        }
        updateUserInfo(that.userID, blogger).then(data => {
          console.log("modify success")
          that.$store.dispatch('updateUserInfo', blogger).then(() => {              
                }).catch((error) => {
                  if (error !== 'error') {
                    that.$message({message: error, type: 'error', showClose: true});
                  }
                })
        }).catch(error => {
          //console.log(error)
          if (error !== 'error') {
            that.$message({type: 'error', message: '用户信息修改失败!', showClose: true})
          }
        })
        
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
