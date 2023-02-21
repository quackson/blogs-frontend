<template>
    

    <el-container >
      <sidebar> </sidebar>
      <el-col :span="4">
        <el-row>
          <el-upload
            class="avatar-uploader"
            action=""
            :on-change="handleChange"
            :show-file-list="false" 
            :http-request="uploadavatar"
            style="margin-top:20%;margin-left:30%;">
            <img v-if="avatarUrl && if2" :src="avatarUrl" class="avatar">
            <img v-else-if="avatarUrl && !if2" :src="avatarUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-row>
        <el-row>
          <el-upload
            class="upload-demo"
            action=""
            :on-change="handleChange"
            :show-file-list="false" 
            :file-list="fileList"
            :http-request="uploadavatar"
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
            <el-col :span="24">
              <article-item 
              :id= 'a.id'
              :title='a.title'
              :detail='a.detail'
              :content='a.content'
              :blogger='a.blogger'
              :tags:='a.tags'
              :permission='a.permission'
              :visits='a.visits'
              :likes='a.likes'
              style="margin-top:1%;"></article-item>
            </el-col>
          </el-row>
        </div>
        <div class="block" style="margin-left:30%; bottom:1%; position: absolute;background-color:#FFEFD5;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="perpage"
            layout="prev, pager, next, jumper"
            :total="BlogInfo.blogCount">
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
  import {getBlogInfo, getUserBlog, uploadavatar} from '@/api/user'
  import {getHotTags} from '@/api/tag'
  import {listArchives} from '@/api/article'

  export default {
    name: 'userboard',
    
    data() {
      return {
        userInfo:{},
        name: '',
        contact: '',
        graduate: '',
        email: '',
        avatarUrl:'',
        BlogInfo : {},
        articles:[],
        fileList:[],
        perpage:5,
        pageint:1,
        userID:-1,
        if2: false
      }
    },
    watch:{
      'avatarUrl'(oval, val){
        console.log("avatarUrl")
      }
    },
    created() { 
      //console.log(this.$route.params.userInfo)
      //console.log(this.$route.params.userInfo.avatarUrl)
      this.userInfo = this.$route.params.userInfo;
      //this.name = this.$route.params.userInfo.name;
      this.name = this.$store.state.name;
      this.contact = this.$store.state.contact;
      this.graduate = this.$store.state.graduate;
      this.email = this.$store.state.email;
      this.avatarUrl = 'http://10.129.167.54:8079' + this.$store.state.avatarUrl;
      this.userID = this.$store.state.id;
      this.getBlogInfo()
      this.getUserBlog()
    },
    methods: {
      getBlogInfo() {
        let that  = this;
        getBlogInfo(that.userID).then(data => {
          that.BlogInfo = data.content
          that.userInfo = that.BlogInfo.blogger
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '用户信息加载失败!', showClose: true})
          }
        })
        console.log(that.BlogInfo)

      },
      getUserBlog() {
        let that = this        
        getUserBlog(that.userID, that.pageint, that.perpage).then(data => {
          if (data.code == 0) {
            //console.log(data.content)
            that.articles = data.content;
            //console.log(that.articles)
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }
        })      
        //console.log(that.articles) 
      },
      handleSizeChange(val) {
        this.perpage = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageint = val;
        this.getUserBlog();
        console.log(`当前页: ${val}`);
      },
      uploadavatar(resource) {
        let fd = new FormData()
        fd.append('file', resource.file)
      
        const that = this 
        

        uploadavatar(fd, that.userID).then(data => {
          if (data.code !== 0) {
            that.$message({type: 'error', message: data.reason, showClose: true})
            return 
          }
          const avatarUri = data.content
          // that.avatarUrl = 'http://10.129.167.54:8079' + avatarUri
          //that.avatarUrl = 'http://10.129.167.54:8079' + '/static/avatars/default'
          that.avatarUrl = 'http://10.129.167.54:8079' + avatarUri
          this.$forceUpdate()
          //console.error("GET IT ")
          that.if2 = !that.if2
          //console.log(that.avatarUrl)
          var blogger = {
            id: that.userID,
            name:  that.name,
            avatarUrl: avatarUri,
            contact: that.contact,
            email:  that.email, 
            graduate: that.graduate,
          }
          that.$store.dispatch('updateUserInfo', blogger).then(() => {})
            .catch((error) => {
              if (error === 'error') { return; }
                that.$message({message: error, type: 'error', showClose: true});
            })
        }).catch(error => {
          console.error(error)
          if (error !== 'error') {
            that.$message({type: 'error', message: '头像上传失败!', showClose: true})
          }
        })      
        
      },
      handleAvatarSuccess(res, file) {
        //var avatarUrlNew = URL.createObjectURL(file.raw);
        //this.avatarUrl = avatarUrlNew
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
