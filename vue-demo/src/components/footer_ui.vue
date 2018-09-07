<template>
  <div class="footer-outer">

    <div class="footer-ui">

      <ul>


        <router-link tag="li" class="nav-item" :to='{name:"index"}'>首页</router-link>
        <router-link tag="li" class="nav-item" :to='{name:"index"}'>分类</router-link>
        <router-link tag="li" class="nav-item" :to='{name:"index"}'>购物车</router-link>
        <router-link tag="li" class="nav-item" :to='{name:"Form_1"}'>个人中心</router-link>


      </ul>

    </div>
    <transition name="fade">
      <div v-show="detailShow" class="tanceng">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">111</h1>

            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="(item,index) in seller.supports">
                <span class="icon"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="hideDetail" style="width:250px;height:50px;text-align:center">
          <i class="fa fa-close" style="display:inline-block;width:50px;height:50px;color:red"></i>
        </div>
      </div>
    </transition>
  </div>


</template>
<script>

  const response_1 = require('../assets/common/data/seller.json');
  const ERR_OK = 0;
  import router from "../router/index.js";
export default{
  name:"Footer_ui",
  props: {

  },
  data(){
   return{
      detailShow:false,



    }
  },
  created(){

    if (response_1.errno === ERR_OK) {
      this.seller = Object.assign({}, this.seller, response_1.data);
    }
  },
  methods:{
//   go_form(){
//      this.$router.push({path: '/Form_1'})
//    },
    showDetail() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    },

  }


}

</script>
<style>
  @import "../../static/css/font-awesome.css";
  @import "../../static/css/footer-ui.css";
.footer-outer{width:100%;position:fixed;bottom:0rem;background:#ccc;z-index:200000}
.footer-ui ul{display:flex}
.footer-ui li{width:25%;height:2rem;flex:1;line-height:2rem;}
.tanceng{position:absolute;top:50%;left:50%;width:400px;height:400px;margin-left:-200px;margin-top:-200px;background:#ccc;color:#fff}
</style>
