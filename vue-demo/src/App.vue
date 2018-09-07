<template>
  <div id="app">
    <router-view></router-view>
    <home></home>

  </div>
</template>

<script>

  import Home from "./components/home.vue";
  import Form_1 from "./components/form_1.vue";
//  import good_detail from "./components/good_detail.vue";


  export default {
     name: "app",
     components: {
     "home": Home,
       Form_1,
//       good_detail
    },

    methods:{


    },
    created() {

    },


  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "../static/css/font-awesome.css";


  #app {
    font-family:'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    text-align:center;
    color:#2c3e50;
    margin-top:60px;
  }
  body{margin:0;}
</style>
