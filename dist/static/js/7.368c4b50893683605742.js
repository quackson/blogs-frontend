webpackJsonp([7],{Lr6H:function(t,e,i){t.exports=i.p+"static/img/bg.3df8855.jpg"},fBNd:function(t,e){},mlqX:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("QAqB"),n=i("Bs21"),s=i("hrok"),r=i("CFbC"),o=i("Q6dk"),c=i("ada0"),l=i("viA7"),u=i("M9A7"),p=i("iNxE"),h={name:"Index",created:function(){this.userid=this.$store.state.id,console.log(this.userid),this.getHotArtices(),this.getUserInfo(),this.getHotTags()},data:function(){return{backgroundImgUrl:i("Lr6H"),hotTags:[],articleshow:[],userInfo:{},userid:0,pageint:1,perpage:5,inputC:"",tagtitle:"HOT TAGS",dynamicTags:[],inputVisible:!1,inputValue:""}},methods:{handleClose:function(t){this.dynamicTags.splice(this.dynamicTags.indexOf(t),1)},showInput:function(){var t=this;this.inputVisible=!0,this.$nextTick(function(e){t.$refs.saveTagInput.$refs.input.focus()})},handleInputConfirm:function(){var t=this.inputValue;t&&this.dynamicTags.push(t),this.inputVisible=!1,this.inputValue=""},search:function(){var t=this.dynamicTags,e=this.inputC;console.log(t),this.$router.push({name:"searchpage",params:{searchtags:t,searchcontent:e}})},getUserInfo:function(){var t=this;t.userid<0||0==t.userid||Object(u.b)(t.userid).then(function(e){t.userInfo=e.content}).catch(function(e){"error"!==e&&t.$message({type:"error",message:"用户信息加载失败!",showClose:!0})})},handleSizeChange:function(t){},login:function(){this.$router.push("/login")},handleCurrentChange:function(t){this.pageint=t,this.getHotArtices()},getHotArtices:function(){var t=this;Object(l.e)(t.pageint,t.perpage).then(function(e){0==e.code?t.articleshow=e.content:t.$message({type:"error",message:e.reason,showClose:!0})}).catch(function(e){"error"!==e&&t.$message({type:"error",message:"最热文章加载失败!",showClose:!0})})},getHotTags:function(){var t=this;Object(p.c)().then(function(e){t.hotTags=e.content}).catch(function(e){"error"!==e&&t.$message({type:"error",message:"最热标签加载失败!",showClose:!0})})}},components:{"card-me":a.a,"card-article":n.a,"card-tag":r.a,ArticleScrollPage:o.a,CardArchive:s.a,"article-item":c.a}},g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-container",[i("el-main",{staticClass:"me-articles"},[t._l(t.articleshow,function(e){return i("div",{key:e.id,staticStyle:{width:"90%","margin-left":"5%"}},[i("el-row",[i("el-col",{attrs:{span:24}},[i("article-item",t._b({staticStyle:{"margin-top":"2%"}},"article-item",e,!1))],1)],1)],1)}),t._v(" "),i("div",{staticClass:"block",staticStyle:{"margin-left":"32%",bottom:"2%",position:"absolute","background-color":"#FFEFD5"}},[i("el-pagination",{attrs:{"current-page":t.pageint,"page-size":t.perpage,layout:"prev, pager, next, jumper",total:20},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){t.pageint=e},"update:current-page":function(e){t.pageint=e}}})],1)],2),t._v(" "),i("el-aside",[i("div",{staticStyle:{position:"absolute",width:"18%",height:"320px"}},[this.userid?i("card-me",{staticClass:"me-area",staticStyle:{height:"100%"},attrs:{userinfo:t.userInfo}}):i("el-card",{staticStyle:{height:"100%"}},[i("div",{staticStyle:{"text-align":"center"}},[i("img",{attrs:{src:"https://img1.baidu.com/it/u=3834820558,1776972742&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400",contain:"",height:"100px",width:"100px"}})]),t._v(" "),i("h1",{staticClass:"me-author-name"},[t._v("访问用户")]),t._v(" "),i("div",{staticStyle:{"text-align":"center","margin-top":"5%"}},[i("el-button",{staticStyle:{"font-size":"18px","margin-top":"10%"},attrs:{type:"primary",plain:"",size:"medium"},on:{click:t.login}},[t._v("登录")])],1)])],1),t._v(" "),i("div",{staticStyle:{"margin-top":"305px",position:"absolute",width:"18%",height:"300"}},[i("card-tag",{staticClass:"me-tags",staticStyle:{height:"100%"},attrs:{tags:t.hotTags,title:t.tagtitle}})],1),t._v(" "),i("div",{staticStyle:{"margin-top":"650px",position:"absolute",width:"18%",height:"100px"}},[i("el-card",{staticClass:"search"},[i("h1",{staticStyle:{"font-size":"25px"}},[t._v("multisearch\n        "),i("span",{staticStyle:{"margin-left":"30%"},attrs:{"text-color":"#696969"}},[i("i",{staticClass:"el-icon-search",on:{click:t.search}})])]),t._v(" "),i("el-col",[t._v("搜索文本"),i("el-input",{staticClass:"searchText",staticStyle:{width:"60%","margin-left":"10%"},model:{value:t.inputC,callback:function(e){t.inputC=e},expression:"inputC"}})],1),t._v(" "),t._l(t.dynamicTags,function(e){return i("el-tag",{key:e,staticStyle:{"margin-top":"20px"},attrs:{closable:"","disable-transitions":!1},on:{close:function(i){return t.handleClose(e)}}},[t._v("\n        "+t._s(e)+"\n      ")])}),t._v(" "),t.inputVisible?i("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",staticStyle:{"margin-top":"5%"},attrs:{size:"small"},on:{blur:t.handleInputConfirm},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleInputConfirm.apply(null,arguments)}},model:{value:t.inputValue,callback:function(e){t.inputValue=e},expression:"inputValue"}}):i("el-button",{staticClass:"button-new-tag",staticStyle:{"margin-top":"5%"},attrs:{size:"small"},on:{click:t.showInput}},[t._v("+ 添加标签")])],2)],1)])],1)},staticRenderFns:[]};var d=i("VU/8")(h,g,!1,function(t){i("fBNd")},"data-v-d570d048",null);e.default=d.exports}});
//# sourceMappingURL=7.368c4b50893683605742.js.map