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
        <div class="block" style="margin-left:32%; bottom:2%; position: absolute;background-color:#FFEFD5;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageint"
            :page-size="perpage"
            layout="prev, pager, next, jumper"
            :total="20">
          </el-pagination>
        </div>

      </el-main>

      <el-aside>
        <div style="position:absolute; width:18%; height:320px;">
        <card-me :userinfo="userInfo" class="me-area" style="height:100%;"></card-me>
        </div>
        <div style="margin-top:300px; position:absolute; width:18%; height:280px;">
        <card-tag :tags="hotTags" :title="tagtitle" class="me-tags"  style="height:100%;"></card-tag>
        </div>
        <div  style="margin-top:630px; position:absolute; width:18%; height:100px;">
        <el-card class="search">
          <h1 style="font-size:25px;">MultiSearch
            <span style="margin-left:30%;" text-color="#696969"><i class="el-icon-search" @click="search"></i></span>
          </h1>
          <el-col>搜索文本<el-input class="searchText" v-model="inputC" style="width:60%;margin-left:10%;"></el-input></el-col>
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
            style="margin-top:5%;">
            {{tag}}
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
          <el-button v-else class="button-new-tag" size="small" @click="showInput"style="margin-top:5%;">+ 添加标签</el-button>
        </el-card>
        </div>
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

  import {getArticles, getHotArtices, getNewArtices} from '@/api/article'
  import {getUserInfo} from '@/api/login'
  import {getHotTags} from '@/api/tag'
  import {listArchives} from '@/api/article'

  export default {
    name: 'Index',
    created() {
      this.userid = this.$store.state.id;  
      console.log(this.userid)
      this.getHotArtices()
      this.getUserInfo()
      this.getHotTags()
    },
    data() {
      return {
        backgroundImgUrl: require('../../src/assets/img/bg.jpg'),
        hotTags: [],
        articleshow: [],
        userInfo:{}, 
        userid:0,   
        pageint:1,
        perpage:5,
        inputC:"",
        tagtitle:"HOT TAGS",
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
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
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      search() {
        var tags = this.dynamicTags
        var content = this.inputC
        console.log(tags)
        this.$router.push({
          name:'searchpage',
          params:{
            searchtags:tags,
            searchcontent:content
          }
        })
      },
      getUserInfo() {
        let that = this
        if (that.userid < 0)
          return
        getUserInfo(that.userid).then(data => {
          that.userInfo = data.content
          //console.log(that.userInfo)
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '用户信息加载失败!', showClose: true})
          }
        })
      },
      handleSizeChange(val) {
        
      },
      handleCurrentChange(val) {        
        this.pageint = val;
        this.getHotArtices()
      },
      getHotArtices() {
        let that = this
        
        getHotArtices(that.pageint, that.perpage).then(data => {
          if (data.code == 0) {
            that.articleshow = data.content;
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '最热文章加载失败!', showClose: true})
          }

        })

      },
      getHotTags() {        
        let that = this;   
        getHotTags().then(data => {
          that.hotTags = data.content
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '最热标签加载失败!', showClose: true})
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
