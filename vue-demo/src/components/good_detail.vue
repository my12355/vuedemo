<template>
  <div ref="good_detail"  class="good_detail">
    <swiper :options="swiperOption"  ref="mySwiper" id="swiper">
      <!-- 这部分放你要渲染的那些内容 -->
      <swiper-slide v-for="item in items" class="single_slide" :key="item.index">


              <img :src="item.url" alt="" class="swiper-image">

      </swiper-slide>
      <!-- 这是轮播的小圆点 -->
      <div class="swiper-pagination" slot="pagination">

        <!--<span class="swiper-pagination-current">{{currentvalue}}</span>/-->
        <!--<span class="swiper-pagination-total">{{}}</span>-->
      </div>
    </swiper>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  import axios from 'axios';
  export default {
    name:"good_detail",

    data() {
      return {
//        showFlag:true,
        currentvalue:"",
        totalvalue:"",
        items:[
          {"url":require("../assets/fenlei/jiudian.jpg")},
          {"url":require("../assets/fenlei/jipiao.jpg")},
          {"url":require("../assets/fenlei/ktv.jpg")},
          {"url":require("../assets/fenlei/liren.jpg")}
          ],


        swiperOption: {
          initialSlide: 0,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          notNextTick: true,
          //循环
          loop:true,
          speed:400,
          //设定初始化时slide的索引
          initialSlide:0,
          //自动播放
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          //滑动速度

          //滑动方向
          direction : 'horizontal',
          //小手掌抓取滑动
          grabCursor : true,

          //滑动之后回调函数
          on: {
            slideChangeTransitionEnd: function(){
              console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
            },
          },
          //左右点击
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //分页器设置
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
            type: 'fraction',
//            //自定义分页器样式
//            renderCustom: function (swiper, current, total) {
//              const activeColor = '#168fed'
//              const normalColor = '#aeaeae'
//              let color = ''
//              let paginationStyle = ''
//              let html = ''
////              for (let i = 1; i <= total; i++) {
////                if (i === current) {
////                  color = activeColor
////                } else {
////                  color = normalColor
////                }
////                paginationStyle = `background:${color};opacity:1;margin-right:20px;width:20px;height:20px;transform:skew(15deg);border-radius:0;`
//                html += `<span class="swiper-pagination-bullet" style="">current/total</span>`
////              }
//              return html
//            }
          }
        }
    }
    },
    //定义这个sweiper对象
    computed: {
    swiper() {
        return this.$refs.mySwiper.swiper;
      }
    },
    mounted () {
      //这边就可以使用swiper这个对象去使用swiper官网中的那些方法
      this.swiper.slideTo(0, 0, false);
    },
    created() {
      let that=this
      axios.get('http://localhost:3003/data')
        .then((data) => {
//        that.items=data.data[that.name];
      this.$nextTick(() => {

    });
    }, () => {
        console.log('这里是用了vue-source,后端没有接口')
      })

    },
    methods:{

      show() {
//        this.showFlag = true;

      },
    },
    components: {
      swiper,
      swiperSlide
    },

  }
</script>
<style>

  .good_detail{position:fixed;top:0;left:0;width:100%;z-index:100000;background:#fff;}
  .single_slide{width:100%;height:400px;}
  .single_slide img{width:100%;height:100%;display:block;}
  .swiper-pagination{position:absolute;bottom:10px;width:200px;height:100px;right:10px;color:#262626;font-size:.4rem}
  .swiper-pagination-bullet{background:#ccc;color:#262626;width:20px;height:20px;font-size:.4rem}
</style>
