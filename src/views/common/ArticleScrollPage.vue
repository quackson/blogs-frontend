<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <article-item v-for="a in articles" :key="a.id" v-bind="a"></article-item>
  </scroll-page>
</template>

<script>
  import ArticleItem from '@/components/article/ArticleItem'
  import ScrollPage from '@/components/scrollpage'
  import {getArticles} from '@/api/article'

  export default {
    name: "ArticleScrollPage",
    props: {
      offset: {
        type: Number,
        default: 100
      },
      page: {
        type: Object,
        default() {
          return {}
        }
      },
      query: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    watch: {
      'query': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage.pageNumber = 1
          this.getArticles()
        },
        deep: true
      },
      'page': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPage = this.page
          this.getArticles()
        },
        deep: true
      }
    },
    created() {
      this.getArticles()
    },
    data() {
      return {
        loading: false,
        noData: false,
        innerPage: {
          pageSize: 5,
          pageNumber: 1,
          name: 'a.createDate',
          sort: 'desc'
        },
        articles: []
      }
    },
    methods: {
      load() {
        this.getArticles()
      },
      view(id) {
        this.$router.push({path: `/view/${id}`})
      },
      getArticles() {
        let that = this
        that.loading = true
        /*
        getArticles(that.query, that.innerPage).then(data => {

          let newArticles = data.content
          if (newArticles && newArticles.length > 0) {
            that.innerPage.pageNumber += 1
            that.articles = that.articles.concat(newArticles)
          } else {
            that.noData = true
          }

        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章加载失败!', showClose: true})
          }
        }).finally(() => {
          that.loading = false
        })
        */
        that.innerPage.pageNumber += 1
        var articles = [
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
        ]
        for(var i=0; i<10; i=i+1){
          articles = articles.concat(articles)
        }
        that.articles = articles
      }
    },
    components: {
      'article-item': ArticleItem,
      'scroll-page': ScrollPage
    }

  }
</script>

<style scoped>
  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 10px;

  }
</style>
