<template>
<div class="shopcart-out">
  <div class="shopcart" @click="toggleList">

    <div class="total_num">{{totalCount}}</div>
    <div class="total_price">{{totalPrice}}</div>
    <div class="secript" :class="payClass">

      {{payDesc}}

    </div>


  </div>
  <div class="ball-container">
    <div v-for="ball in balls">
      <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        <div class="ball" v-show="ball.show">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
  <transition name="fold">
    <div class="shopcart-list" v-show="listShow">
      <div class="list-header" style="display:flex">
        <h1 class="title" style="flex:1">购物车</h1>
        <span class="empty" @click="empty" style="flex:1">清空</span>
      </div>
      <div class="list-content" ref="listContent">
        <ul>
          <li class="food" v-for="food in selectFoods" style="display:flex">
            <span class="name" style="flex:1">{{food.name}}</span>
            <div class="price" style="flex:1">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cartcontrol-wrapper" style="flex:2">
              <cartcontrol  :food="food"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div class="list-mask" @click="hideList" v-show="listShow"></div>
  </transition>
</div>


</template>
<script>

  import BScroll from 'better-scroll';
  import cartcontrol from './cartcontrol.vue';
  export default {
    data(){
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls:[],
        fold: true
      }
    },
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 20
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food)=>{
          total+= food.price * food.count;
      })
        ;
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food)=>{
          count+= food.count;
      })
        ;
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass(){
        if(this.totalPrice < this.minPrice){
          return 'not-enough';
        } else {
          return "enouth";
        }
      },
      listShow(){
          if(!this.totalCount){
           this.fold=true;
          }

         let show=!this.fold;

          if(show){
            this.$nextTick(() => {
              if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            }else{
              this.scroll.refresh();
            }
          });

          }
          return show;
      }

    },
    methods:{
        toggleList(){
          if (!this.totalCount) {
             return false;
           }
           this.fold = !this.fold;
        },
        hideList() {
          this.fold = true;
        },
      empty(){
        this.selectFoods.forEach((food)=>{
          food.count = 0;
      });
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
        el.style.transform = 'translate3d(0,0,0)';
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = 'translate3d(0,0,0)';
        inner.style.transform = 'translate3d(0,0,0)';
        el.addEventListener('transitionend', done);
      });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }

  },
    components:{
      "cartcontrol":cartcontrol
    }
  }


</script>
<style>

  .shopcart-out {
    display:flex;
    width:100%;
    position:fixed;
    bottom:0rem;
    background:#ccc;
    z-index:10000;
    height:30px;
  }
  .shopcart{width:100%;display:flex}
  .shopcart > div {
    flex:1
  }
  .shopcart-list{z-index:20;position:fixed;bottom:32px;width:100%;height:200px;background:#fff;border-top:1px solid #ccc}
.list-mask{width:100%;height:100%;position:fixed;top:0;left:0;background:rgba(0,0,0,0.5);z-index:10}

  .ball-container .ball{position: fixed;left: 32px;bottom: 22px;z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)}

  .inner{
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: rgb(0, 160, 220);
    transition: all 0.4s linear
  }

</style>
