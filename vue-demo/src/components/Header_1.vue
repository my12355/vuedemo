<template>

  <div class="header" ref="header">

    <div class="div_sech">

      <i class="fa fa-search"></i>
      <input type="text" placeholder="搜索"  @focus="handleinput()" v-model="searchtxt" ref="search">
      <span>
         <i class="fa fa-close" style="margin-right:20px"  v-show="searchtxt" @click="searchtxtclear"></i>
      </span>
      <span>

       <span id="Subm" @click="Subm">确定</span>



      </span>

    </div>
    <!--<div class="history" ref="history">-->

      <!--<ul class="text-span" v-if="historyxs">-->

        <!--<li v-for="(item,index) in hottxt" :class="{ on:index==0}" @click="hotsearch(item)">{{item}}</li>-->

      <!--</ul>-->
      <!--<ul class="clear his_ulcon"  v-show="historyxs">-->
        <!--<p @click="clearhis()">清空</p>-->
      <!--</ul>-->
    <!--</div>-->

    <!--<div class="search_list">-->

    <!--</div>-->

  </div>

</template>
<script>
  import _ from 'lodash'; //引入lodash
  import axios from 'axios';
  import {Toast} from 'mint-ui';
  import {saveSearch} from '../../static/js/cache.js'; //引入本地存储js
  import storage from 'good-storage';
  import $ from 'jquery';

  let sources = [];
  export default {
    name: 'Header_1',
    data() {
      return {
        searchtxt:'',      //input框输入字符v-model双向绑定
        historyxs:false,  //历史记录显示与不显示控制
        hottxt:''    //热门搜索
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
      searchtxtclear(){   //清空小叉号
        this.searchtxt='';
      },

      Subm(){ //点击搜索跳转到表单填写页面
        if(this.searchtxt!=''){ //搜索框不为空
          saveSearch(this.searchtxt); // 本地存储搜索的内容
          console.log("this.$router的值是："+this.$router);
//          点击一个div，跳转到form页面
//          this.$router.push({path: '/form_1'})

          this.historyxs=false;
          this.searchtxt='';
        }
      },
      handleinput(){         //输入框获取焦点显示搜索历史记录
        //为避免重复先清空再添加
        $('.his_ulcon').children('li').remove();
        let searches=storage.get('_search_');
        if(searches!=undefined){
          this.historyxs=true;
          for(var i=0;i<searches.length;i++){
            $('.his_ulcon p').before(`<li @click="hotsearch(searches[i])">${searches[i]}<li>`)
          }
        }

      },
      clearhis(){  //清空历史记录
        storage.remove('_search_');
        $('.his_ulcon').children('li').remove();
      },
      hotsearch(item){    //点击热门搜索把搜索的记录添加到good-storage中并跳转搜索列表页
        saveSearch(item);
//        this.$router.push({
//          path: '/swipe'
//        });
        this.historyxs=false;
      }

    },
    watch:{
      'searchtxt':function(){
        //监听输入内容向后台请求数据
        console.log('数据改变触发相应事件');
      }
    },
    components:{

}


  }

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../static/css/font-awesome.css";
  @import "../../static/css/base.css";
  @import "../../static/css/header.scss";
  .stick{background:red}
  .history{position:fixed;top:40px;left:0;width:100%;height:100%;background:#fff}
  .history li{display:inline-block;width:50px;height:20px;}
  .history  span{margin:10px}
  .mint-search{background:#fff}
  .search_list{position:absolute;top:40px;left:0px;background:#fff;width:100%}
  .pro_img{width:100%;height:100px;background:#ccc;margin-bottom:10px}
  .his_ulcon{display:flex}
  .his_ulcon li{flex:1;margin:5px}





</style>
