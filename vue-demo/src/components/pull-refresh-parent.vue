<template>
  <div class="contSingleList">
    <div class="tabItem">
      <slot></slot>
    </div>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :dataList="scrollData">
      <ul class="listItem">
        <li v-for="(item,index) in listdata">
          <span>{{ item.date }}</span>
          <span>{{ item.portfolio }}</span>
          <span :class="{'state0':(item.state===0),'state1':(item.state==1),state2:(item.state===2)}"  >{{ item.drop }}</span>
        </li>
      </ul>
    </v-scroll>
  </div>
</template>
<style lang="less">
</style>
<script type="text/ecmascript-6">
  import myScroll from './pull-refresh.vue';
  import axios from 'axios';
  export default {
    data() {
      return {
        counter: 1, //当前页
        num: 10, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        scrollData: {
          noFlag: false //暂无更多数据显示
        }
      }
    },
   mounted: function() {
      this.getList();

    },

   created(){
    axios.get('http://localhost:3003/api')
     .then((data) => {
       let response = [];
       for(let i=0;i<data.data.length;i++){
        this.listdata.push({
           date: data.data[i].text,
           portfolio: data.data[i].link,
           drop:data.data[i].hot,
           state: 2
         })

       }
       this.listdata = response.slice(0, this.num);
       console.log(data.data)
     }, () => {
       console.log('这里是用了vue-source,后端没有接口')
     })

   },

    methods:{
      getList() {
          let response = []
//
          for(let i=0;i<10;i++){
           this.listdata.push({
              date: "111"+i,
              portfolio: "222",
              drop: "333",
              state: 2
            })

          }

        this.listdata = response.slice(0, this.num);

        console.log("listdata"+this.listdata)

      },
      onRefresh(done){
        this.getList();

        done(); // call done


      },
      onInfinite(done) {
        this.counter++;
        let i = this.pageStart = this.pageEnd - this.num;
        let end = this.pageEnd = this.num * this.counter;

          console.log("end:"+end)
          console.log("i:"+i)
        let more = this.$el.querySelector('.load-more')
//        for(i; i < end; i++) {
//          if(i >30) {
//            more.style.display = 'none'; //隐藏加载条
//            //走完数据调用方法
//            this.scrollData.noFlag = true;
//
//            break;
//          } else {
//            this.listdata.push({
//              date: data.data[i].text,
//              portfolio: data.data[i].link,
//              drop:data.data[i].hot,
//              state: 2
//            })
//            more.style.display = 'none'; //隐藏加载条
//          }
//        }

        axios.get('http://localhost:3003/api')
          .then((data) => {
            let response = [];
            for(let i=0;i<end;i++){

              if(i>20){
                more.style.display = 'none'; //隐藏加载条
                //走完数据调用方法
                this.scrollData.noFlag = true;
                break;
              }else{
                this.listdata.push({
                  date: data.data[i].text,
                  portfolio: data.data[i].link,
                  drop:data.data[i].hot,
                  state: 2
                })
                more.style.display = 'none'; //隐藏加载条
              }


            }
            this.listdata = response.slice(0, this.num);
//            console.log(data.data)
          }, () => {
            console.log('这里是用了vue-source,后端没有接口')
          })
        done();
      }

    },
    components:{
      "v-scroll":myScroll
    }

  }
</script>
<style>

  .listItem{font-size:.3rem}
</style>
