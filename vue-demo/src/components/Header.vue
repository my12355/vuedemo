<template>

  <div class="header" ref="header">

    <div class="div_sech">

      <i class="fa fa-search"></i>
      <input type="text" placeholder="搜索" :style="isFocus?'':'text-indent:1.2em;'" v-model="search" @focus="initPage" ref="search">
      <span v-if="isFocus">
         <i class="fa fa-close" style="margin-right:20px"  @click="toggleDrawer"></i>
      </span>
      <span v-if="!isFocus">
         <span id="Subm" @click="iptShearch">确定</span>
      </span>

    </div>
    <div class="history" ref="history" v-if="!isFocus">

      <div class="text-span" v-if="historyxs">

        <span v-for="(item,index) in searches_list" :key="index" @click="historysearch(item)">{{item}}</span>

     </div>
      <div class="clear"  v-show="historyxs">
        <p v-if="historyxs" @click="clearhis()">清空</p>
      </div>
    </div>

    <div class="search_list">

    </div>

 </div>

</template>
<script>
  import _ from 'lodash'; //引入lodash
  import axios from 'axios';
  import {Toast} from 'mint-ui';
  import {saveSearch} from '../../static/js/cache.js'; //引入本地存储js
  import storage from 'good-storage';
  import $ from 'jquery'


  let sources = [];
  export default {
    name: 'Header',
    data() {
      return {
        search:'',
        isFocus:true,
        searches_list:[], //历史搜索记录列表
        historyxs:false
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },

    created() {
      let _this=this;
      axios.get('http://localhost:3003/data')
        .then((res)=>{
      _this.hottxt=res.data.name;

      console.log(this.hottxt)
    }, ()=>{
        console.log('这里是用了vue-source,后端没有接口')
      }
    )

    },
    computed: {

    },

    methods: {
      // 改变顶栏背景色
      handleScroll() {
        let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
        let header_1 = this.$refs.header;
        let headerHeight = header_1.clientHeight;
        console.log("scrolled:" + scrolled);
        console.log("headerHeight:" + headerHeight)
        if (scrolled > headerHeight) {
          let a = scrolled / headerHeight;
          header_1.style.background = 'rgba(0,173,176,' + a + ')'
        } else {
          header_1.style.background = "#ccc"
        }
      },
      //输入框获取焦点
      initPage() {
        this.isFocus = false;
//        this.$emit('initSearchPage');
        //为避免重复先清空再添加
        this.searches_list = [];
        let searches = storage.get('_search_');
        this.searches_list = searches ? searches : [];
        if(this.searches_list.length > 0) {
          this.historyxs = true;
        } else {
          this.historyxs = false;

        }

      },
      //点击搜索
      iptShearch() {
        this.isFocus = true;
        if (this.search != '') { //搜索框不为空

          saveSearch(this.search); // 本地存储搜索的内容

          let params = {
            majorInfo: this.search //零件号或零件名（中英文）或零件类型名称或责任人名称
          }
          this.$emit('handleSearch', params)
//向后台发送请求--开始


          //向后台发送请求--结束

          this.isFocus = true;
          this.search = '';
        }else{
          Toast({
            "message":"请输入内容",
            "position":"bottom"
          })
        }


      },
      //高级搜索按钮
     toggleDrawer() {
      this.$emit('initSearchPage')
       this.$emit('listenSlide')
      },
      //清空历史记录
      clearhis() {
        storage.remove('_search_');
        this.searches_list = [];
        this.historyxs = false;

      },
      //点击历史搜索把搜索的记录添加到good-storage中
      historysearch(item) {
        saveSearch(item);
        this.search = item;
        this.iptShearch();
        this.historyxs = false;

      },

    }



  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../static/css/font-awesome.css";
  @import "../../static/css/header.scss";
  .stick{background:red}
  .history{position:fixed;top:40px;left:0;width:100%;height:100%;background:#fff}
  .history li{display:inline-block;width:50px;height:20px;}
  .history  span{margin:10px}
.mint-search{background:#fff}
.search_list{position:absolute;top:40px;left:0px;background:#fff;width:100%}
.pro_img{width:100%;height:100px;background:#ccc;margin-bottom:10px}
</style>
