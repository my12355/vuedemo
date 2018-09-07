<template>

  <!--<div class="parent">-->
  <!--<p>父组件</p>-->
  <!--<child>-->
  <!--<p slot="my-header">我是头部</p>-->
  <!--<p slot="my-footer">我是尾部</p>-->
  <!--</child>-->
  <!--</div>-->

  <!--<div class="parent">-->
  <!--<p>父组件</p>-->
  <!--<child>-->
  <!--<p slot="my-body">我是主体</p>-->
  <!--<p>我是其他内容</p>-->
  <!--<p slot="my-footer">我是尾部</p>-->
  <!--</child>-->
  <!--</div>-->
  <!--<div class="parent">-->
  <!--<p>父组件</p>-->
  <!--<child>-->
  <!--<p slot="my-body">我是主体</p>-->
  <!--<p>我是其他内容</p>-->
  <!--<p slot="my-footer">我是尾部</p>-->
  <!--</child>-->
  <!--</div>-->

  <!--<div class="parent">-->
  <!--<p>父组件</p>-->
  <!--<child>-->
  <!--<template scope="props">-->
  <!--<p>hello from parent</p>-->
  <!--<p>{{ props.xxx }}</p>-->
  <!--</template>-->
  <!--</child>-->
  <!--</div>-->

  <!--<div class="parent">-->
  <!--<p>父组件</p>-->
  <!--<child>-->
  <!--<template slot="item" scope="props">-->
  <!--<li>{{ props.text }}</li>-->
  <!--</template>-->
  <!--</child>-->
  <!--</div>-->
  <!--<div id="app">-->
    <!--<test-slot>-->
      <!--<div slot="one">-->
        <!--<span>one</span>-->
        <!--<span>第一个</span>-->
      <!--</div>-->
      <!--<div>-->
        <!--<span>此div没有slot</span>-->
      <!--</div>-->
      <!--<div slot="two">-->
        <!--<span>two</span>-->
        <!--<span>第二个</span>-->
      <!--</div>-->
    <!--</test-slot>-->
  <!--</div>-->


  <div id="app">
    <h2>app</h2>
    <test-slot :items="items">
      <template slot-scope="props">
        <span>{{ props.addr }}</span>
        <span>{{ props.cname }}</span>
        <span>{{ props.age }}</span>
      </template>
    </test-slot>
  </div>
</template>
<script>

  import testSlot from "./testSlot.vue";

  export default {
    data (){
      return {
        items:[
          { text:'文字1' , cname:'tom' , addr:'usa' },
          { text:'文字2' , cname:'wangwu' , addr:'uk' },
          { text:'文字3' , cname:'zhangsan' , addr:'un' }
        ]
      }
    },
    methods:{

    },
    components:{
      testSlot
    }
  }

</script>
<style>
</style>
