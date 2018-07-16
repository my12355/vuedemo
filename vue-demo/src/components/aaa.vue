<template>

  <div class="parent">
    <p>父组件</p>
    <child>
      <p slot="my-header">我是头部</p>
      <p slot="my-footer">我是尾部</p>
    </child>
  </div>
</template>
<script>

  import childNode from "./bbb.vue";

  export default{

    components:{

      "child":childNode
    }
  }

</script>
<style>
</style>
