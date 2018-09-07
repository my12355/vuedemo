<template>
<div class="home" v-show="isShow">

  <Header_1></Header_1>
  <swipe
    class="slide"
    v-model="index1"
    :autoplayTime="4000"
    :speed="300"
  >
    <swipe-item v-for="i in item1" :key="i" style="">number{{ i }}</swipe-item>
  </swipe>

  <iconswipe></iconswipe>
  <!--<pull-load></pull-load>-->
  <footer_ui></footer_ui>
  <goods></goods>

</div>

</template>
<script>
  import Header from "./Header_1.vue";
  import iconswipe from "./iconswipe.vue";
  import pullLoad from "./pull-refresh-parent.vue";
  import footer from "./footer_ui.vue";
  import goods from "./goods.vue";
  import axios from "axios";

  export default {
    name: "Home",
    data() {
      return {
        isShow:true,
        index1: 0,
        item1: 6,
        itemCommon: 6,
        indexLoop: 0,
        indexNoLoop: 0,
        index3: 0,
        index4: 0,
        isLoop: true,
        autoplay: 0,
        pagination: true,
        itemAsync: 6,
        index5: 0,


      };
    },

    mounted() {
      // 该轮播组件也支持异步渲染
      setTimeout(()=> {
        this.item = 10;
    },6000);
    },

    methods: {

      decreaseHandler() {
        this.itemAsync = this.itemAsync > 1 ? this.itemAsync - 1 : 1;
        // 避免删除卡片后，镜头落在轮播图外
        this.index5 = this.index5 >= this.itemAsync ? this.itemAsync - 1 : this.index5;
        // 删除卡片后，需要在 $nextTick 下手动调用 组件下的 reset 方法
        this.$nextTick(()=>{
          this.$refs.swipeAsync.reset();
      });

      },
    },
    watch:{
      $route(now,old){     //监控路由变换，控制返回按钮的显示
        if(now.path=="/Home"){
          this.isShow=true;
        } else{
          this.isShow=false;
        }
      }
    },
    components: {
      "Header_1": Header,
      "iconswipe": iconswipe,
      "pull-load": pullLoad,
      "footer_ui": footer,
      "goods": goods
    }
  };
</script>
<style>
  @import "../../static/css/swipe.css";

</style>
