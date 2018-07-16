<template>
  <div id="app">

    <Header></Header>
    <swipe
      class="slide"
      v-model="index1"
      :autoplayTime="4000"
      :speed="300"
    >
      <swipe-item v-for="i in item1" :key="i" style="">number{{ i }}</swipe-item>
    </swipe>
    <aaa></aaa>
  </div>
</template>

<script>
  import Header from "./components/Header.vue"
  import aaa from "./components/aaa.vue"
  export default {
    "name":"app",
    data() {
      return {
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
      setTimeout(() => {
        this.item = 10;
    }, 6000);
    },

    methods: {
      decreaseHandler() {
        this.itemAsync = this.itemAsync > 1 ? this.itemAsync - 1 : 1;
        // 避免删除卡片后，镜头落在轮播图外
        this.index5 = this.index5 >= this.itemAsync ? this.itemAsync - 1 : this.index5;
        // 删除卡片后，需要在 $nextTick 下手动调用 组件下的 reset 方法
        this.$nextTick(() => {
          this.$refs.swipeAsync.reset();
      });
      },
    },
    components:{

      "Header":Header,
      "aaa":aaa
    }
  };
</script>

<style>

  @import "../static/css/swipe.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
