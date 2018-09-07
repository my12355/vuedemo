<template>
  <div class="contSingleList">
   <ul>
      <li v-for="list in  listdata">
        <span>{{list.date}}</span>
      </li>
    </ul>

  </div>
</template>
<style lang="less">
</style>
<script type="text/ecmascript-6">
  import axios from 'axios';
  export default {
    data() {
      return {
//        counter: 1, //当前页
//        num: 10, // 一页显示多少条
        pageStart: 0, // 开始页数
        pageEnd: 0, // 结束页数
        listdata: [], // 下拉更新数据存放数组
        scrollData: {
          noFlag: false //暂无更多数据显示
        }
      }
    },


    created(){
      axios.get('http://localhost:3003/api')
        .then((data) => {

          for(let i=0;i<data.data.length;i++){

            console.log("data.data.length"+data.data.length)
            this.listdata.push({
              date: data.data[i].text,
              portfolio: data.data[i].link,
              drop:data.data[i].hot,
//              state: 2
            })

          }
          console.log(data.data)
        }, () => {
          console.log('这里是用了vue-source,后端没有接口')
        })

    },

    methods:{

    },
    components:{

    }

  }
</script>
<style>

  .contSingleList li{font-size:.3rem;line-height:36px}
</style>
