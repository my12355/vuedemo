<template>

  <div>
    <input type="text" @click="setDate2" v-bind:value="data2" readonly ref="calender"/>
    <!--<p @click = "setDate2" placeholder="请选择日期">设定指定的日期（2015-2-20）</p>-->
  </div>
</template>
<script>
  export default{
    data () {
      return {
        data2:'2010-03-05'
      }
    },
    methods:{
      setDate2(){

        this.$picker.show({
          type:'datePicker',
          date:this.date2,
          onOk: (date) =>{
//          this.data2 = date
          this.$refs.calender.value = date

          console.log( this.$refs.calender.value)
      }
      });




      },
    }
  }



</script>
<style>
</style>
