<template>

  <div class="cartcontrol">

    <div class="decrease"  v-show="food.count>0" @click.stop.prevent="decrease">
      <i class="fa  fa-minus-square"></i>

    </div>

    <div class="num" v-show="food.count>0">

     {{food.count}}
    </div>

    <div class="add" @click.stop.prevent="addCart">

          <i class="fa  fa-plus-square-o"></i>
    </div>


  </div>


</template>
<script>
  import Vue from 'vue';
 export default{
  props: {
    food: {
      type: Object
    }
  },

  methods:{
    addCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$emit('add', event.target);
    },
    decrease(event){
      if (!event._constructed) {
        return;
      }
      if (this.food.count) {
        this.food.count--;
      }

    }

  }
}

</script>
<style>
  @import "../../static/css/font-awesome.css";
  .cartcontrol{display:flex;width:100px}
  .cartcontrol>div{flex:1;margin:10px;width:20px;height:20px;line-height:20px}
  .cartcontrol i{color:green;font-size:.5rem;}


</style>
