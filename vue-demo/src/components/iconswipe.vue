<template>
  <!--定义外层-->



  <div class="wrapper clearfix" ref="wrapper">

    <div class="content clearfix" ref="sliderGroup">
      <ul class="content_ul">
        <li v-for="(item,index) in items_1" :data-id="'item-'+(index)" >

          <img :src="item.url"/>

        </li>
      </ul>

      <ul class="content_ul">
        <li v-for="(item,index) in items_2" :data-id="'item-'+(index)">
          <img :src="item.url"/>
        </li>
      </ul>
    </div>
    <!--定义需要滚动的内容区域-->

    <!--定义轮播图小圆点-->
    <div class="dots">
      <span class="dot" :class="{active: currentPageIndex === index }" v-for="(item, index) in dots"></span>
    </div>
  </div>

</template>

<script>

  import BScroll from 'better-scroll';
  import a from '../assets/fenlei/jiudian.jpg';
  import b from '../assets/fenlei/ktv.jpg';
  import c from '../assets/fenlei/jipiao.jpg';
  import d from '../assets/fenlei/liren.jpg';
  import e from '../assets/fenlei/maoyan.jpg';
  import f from '../assets/fenlei/kuaican.jpg';
  import g from '../assets/fenlei/hongbao.jpg';
  import h from '../assets/fenlei/guoqing.jpg';
  import i from '../assets/fenlei/dianying.jpg';
  import j from '../assets/fenlei/maoyan.jpg';


  export default {

    data() {
      return {
        items_1: [
          {"url": a},
          {"url": b},
          {"url": c},
          {"url": d},
          {"url": e},
          {"url": f},
          {"url": g},
          {"url": h},
          {"url": i},
          {"url": j}
//
        ],
        items_2: [
          {"url": a},
          {"url": b},
          {"url": c},
          {"url": d},
          {"url": e},
          {"url": f},
          {"url": g},
          {"url": h},
          {"url": i},
          {"url": j}
        ],
        loop: true, // 是否为循环播放
        dots: [], // 存放轮播小圆点
        currentPageIndex: 0, // 当前是哪个
        autoPlay: true, // 是否自动轮播
        interval: 4000, // 设置自动轮播的时间
      }
    },
    mounted() {
      // 设置20ms的延迟
      setTimeout(() => {
        this._setSliderWidth();
      this._initDots();
      this._initScroll();
      // 设置自动轮播
      if (this.autoPlay) {
        this._play();
      }
    }, 0)
      // 监听窗口改变重置高度
      window.addEventListener('resize', () => {
        if (!this.scroll) {
        return false;
      }
      this._setSliderWidth(true);
      this.scroll.refresh(); // 强制刷新
    })
    },
    activated() {
      if (this.autoPlay) {
        this._play()
      }
    },
    deactivated() {
      clearTimeout(this.timer)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      // 定义一个计算宽度的方法
      _setSliderWidth() {
        //获取子元素的个数
        this.children = this.$refs.sliderGroup.children;
        let width = 0;
        let wrapperWidth = this.$refs.wrapper.clientWidth;

        for (let i = 0; i < this.children.length; i++) {

          let child = this.children[i];
          child.style.width = wrapperWidth + 'px';
          width += wrapperWidth;

        }
        this.$refs.sliderGroup.style.width = width + 'px';

      },

      _initScroll() {
        this.scroll = new BScroll(this.$refs.wrapper, {
          scrollX: true,
          scrollY: true,
          momentum: false,
          snap: {
            threshold: .1,
            speed: 400
          },
          snapThreshold: .1,
          click: true,
          snapSpeed: 400,
          preventDefault: false
        })

        this.scroll.on("scrollEnd", ()=>{
          let pageIndex = this.scroll.getCurrentPage().pageX
          console.log("pageIndex" + pageIndex)

        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          this._play()
        }

      })
        //手指滑动停止自动轮播
        this.scroll.on("beforeScrollStart", () => {

          if(this.autoPlay){

          clearTimeout(this.timer)
        }
      })

      },
      // 初始化添加小圆点
      _initDots() {
        this.dots = new Array(this.children.length)
      },


      // 设置自动轮播
      _play() {
        let pageIndex = this.currentPageIndex + 1;
        if (this.loop) {
          pageIndex += 1;
        }
        this.timer = (() => {
          this.scroll.goToPage(pageIndex, 0, 400);
      }, 0);
      }
    },
    // 组件销毁的时候清理定时器,仅仅是性能优化
    destroyed() {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .wrapper {
    position:relative;
    width:100%;
    height:88px;
    overflow:hidden;
  }
  .wrapper .content{height:100%}

  .content_ul {

    float:left;
    width:100%;
  }

  li {
    list-style:none;
    float:left;
    box-sizing:border-box;
    overflow:hidden;
    text-align:center;
    width:20%;
    height:1rem;
    margin:.1rem 0;
  }

  li img {
    display:block;
    width:1rem;
    height:1rem;
    margin:0 auto;

  }

  .dots {
    position:absolute;
    right:0;
    left:0;
    bottom:2px;
    text-align:center;
    font-size:0;
  }

  .dot {
    display:inline-block;
    margin:0 4px;
    width:8px;
    height:8px;
    border-radius:50%;
    background:#ddd;
  }

  .dot.active {
    background:red;
  }


</style>
