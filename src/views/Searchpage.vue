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
            :total="this.total">
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

  import {getArtices, getNewArtices} from '@/api/article'
  import {getUserInfo} from '@/api/login'
  import {getHotTags} from '@/api/tag'
  import {listArchives} from '@/api/article'

  export default {
    name: 'searchpage',
    created() {
      console.log(this.$route.params)
      this.searchcontent = this.$route.params.searchcontent;
      this.searchtags = this.$route.params.searchtags;
      this.userid = this.$store.state.id;  
      console.log(this.userid)
      this.getArtices()
      this.getUserInfo()
      this.getHotTags()
    },
    data() {
      return {
        searchcontent:'',
        searchtags:[],
        backgroundImgUrl: require('../../src/assets/img/bg.jpg'),
        hotTags: [],
        articleshow: [],
        articles:[],
        userInfo:{}, 
        userid:0,   
        pageint:1,
        perpage:5,
        inputC:"",
        tagtitle:"HOT TAGS",
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        total:0,
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
            that.$message({type: 'error', message: '????????????????????????!', showClose: true})
          }
        })
      },
      handleSizeChange(val) {
        
      },
      handleCurrentChange(val) {        
        this.pageint = val;
        this.getArticesInPage(val)
      },
      getArticesInPage(val) {
        if (typeof(this.articles) == "undefined") {
          return 
        }
        console.log("deal show")
        var artis=[]
        let that = this;
        var end = that.perpage*val;
        if(end > that.articles.length)
            end = that.articles.length;
        var begin = that.perpage*(val - 1);
        for(var i = begin; i < end; i = i + 1){
          artis.push(that.articles[i]);
        }
        that.articleshow = artis;
        
      },
      getArtices() {
        let that = this
        //console.log("get")
        getArtices(that.searchtags, that.searchcontent).then(data => {
          //console.log(data)
          if (data.code == 0) {
            that.articles = data.content;
            //console.log(that.articles)
            that.total = data.content.length;
            //console.log(that.total)
            that.pageint = 1;
          that.getArticesInPage(1);
          }else{
            that.$message({type: 'error', message: data.reason, showClose: true})
          }
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '????????????????????????!', showClose: true})
          }

        })
        //that.getArticesInPage(1);

      },
      getHotTags() {        
        let that = this;   
        getHotTags().then(data => {
          that.hotTags = data.content
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '????????????????????????!', showClose: true})
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
