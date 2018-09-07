<template>
  <div class="goods">
    <div class="goods-left" ref="goodsLeft">
      <ul>
        <li v-for="(item,index) in goods" :class="{'active':currentIndex===index}" @click="selectMenu(index,$event)">

          <span>
            <span>


            </span>

          {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-right" ref="goodsRight">
      <ul>
        <li  v-for="item in goods" ref="foodList" class="goods-right">
          <h5>{{item.name}}</h5>
          <ul>


              <li v-for="food in item.foods" class="item-li"  @click="selectFood(item.name)"  >

                <div class="icon">
                  <img :src="food.icon" alt="" width="57" height="57">
                </div>

                <div class="icon-1" style="width:200px">

                  <div style="width:100%;height:30px;display:inline-block">{{food.name}}</div>
                  <div class="cart">

                    <span style="display:inline-block;float:left">{{food.price}}</span>
                    <cartcontrol  :food="food" @add="addFood"></cartcontrol>
                  </div>
                </div>

              </li>


          </ul>
        </li>
      </ul>
   </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods"></shopcart>

    <!--<good_detail @add="addFood" :food="selectedFood" ref="good_detail"></good_detail>-->
  </div>

</template>
<script>
  import BScroll from 'better-scroll';
  import axios from 'axios';
  import cartcontrol from './cartcontrol.vue';
  import shopcart from './shopcart.vue';
  import good_detail from './good_detail.vue';

  export default {
    name: "goods",

    data() {
     return {
        goods: [],
        scrollY: 0,
        listHeight: [],
       selectedFood: {},


      }
    },
    created() {
     axios.get('http://localhost:3003/data')
        .then((data) => {
           this.goods=data.data;
           this.$nextTick(() => {
                 this.initScroll();
                this.calculateHeight();
    });
   }, () => {
        console.log('这里是用了vue-source,后端没有接口')
      })

    },
    computed: {
      currentIndex(){
            for(let i=0;i<this.listHeight.length;i++){
              let height1 = this.listHeight[i];
              let height2 = this.listHeight[i + 1];
              if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                return i;
              }
            }
            return 0;

      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
          if (food.count) {
          foods.push(food);
        }
      });
      });
        return foods;
      }

    },
    methods: {

      gotoDetail(){
//        this.$router.push({path: 'goods_detail?goodsId=122'});

      },
      calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight;
          this.listHeight.push(height)
        }
      },
      addFood(target) {
        this._drop(target);
      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
      });
      },
      initScroll(){
        this.goodsLeft=new BScroll(this.$refs.goodsLeft,{
          click:true
        })
        this.goodsRight=new BScroll(this.$refs.goodsRight,{
          click:true,
          probeType: 3

        }),
          this.goodsRight.on("scroll",(pos)=>{

            this.scrollY = Math.abs(Math.round(pos.y));
      })

      },
      selectMenu(index,event){

        if(!event._constructed){
           return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.goodsRight.scrollToElement(el, 300);

      },
      selectFood(name){
        this.$router.push({
          path: '/good_detail/${name}',
//          query:{name:this.selectedFood.name}

        })
      },


    },
    components:{

      "cartcontrol": cartcontrol,
      "shopcart": shopcart,
      "good_detail": good_detail
    }

  }

</script>
<style>
  @import "../../static/css/font-awesome.css";
  .goods {
    position:absolute;
    top:352px;
    display:flex;
    bottom:-8px;
    overflow:hidden;
    width:100%
  }

  .goods .goods-left {
    width:80px;
    height:auto;
    background:#f3f5f7;
  }

  .goods .goods-left li.active {
    display:table;
    height:54px;
    width:56px;
    padding:0 12px;
    line-height:24px;
    background:#fff;
  }
  .goods .goods-left li{display:table;
    height:54px;
    width:56px;
    padding:0 12px;
    line-height:24px;}
  .goods .goods-left li span {
    display:table-cell;
    /*height:34px;*/
    width:56px;
    padding:0 0px;
    vertical-align: middle;
    /*line-height:14px;*/
    white-space:nowrap;
  }

  .goods .goods-right {
    flex:1
  }
  .goods .goods-right .goods-right{background:#ccc;}
  .goods .goods-right .item-li{line-height:60px; background:#fff;display:flex}
  .goods .goods-right .item-li .icon{text-align:left;display:inline-block;flex:0 0 27px;margin: 10px;}

</style>
