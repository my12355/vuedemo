<template>
<div>


  <input type="text" placeholder="点我选择区域" @click="choose" class="user_address" ref="user_address">
  <input type="hidden" class="user_address_code" ref="user_address_code">
  <div class="divwrap" v-if="show">

    <v-distpicker type="mobile" wrapper="address-wrapper" @province="selectProvince" @city="selectCity" @area="selectArea" address-container="address-container"></v-distpicker>

  </div>
  <div class="mask" v-show="mask"></div>


</div>


</template>
<script>
  import VDistpicker from 'v-distpicker'
  export default {
    name: 'city_choose',
    components: { VDistpicker },
    data() {
      return {
        show:false,
        mask:false,
        select: { province: '', city: '', area: '' },

        link_value:"",
        link_code:"",
         blank:" "
      }
    },
    methods: {
      choose(){

        this.show=!this.show
        this.mask=!this.mask
      },
      selectProvince(value) {
        this.select.province = value
        console.log(value.value);
        this.link_value=value.value+this.blank
        this.link_code=value.code+this.blank
        console.log(this.link_code)
      },
      selectCity(value) {
        this.select.city = value
        console.log(value.value);
        this.link_value+=value.value+this.blank;
        this.link_code+=value.code+this.blank;
        console.log(this.link_code)
      },
      selectArea(value) {
        this.select.area = value;
        this.show=false;
        this.mask=false;
        console.log(value.value);
        this.link_value+=value.value;
        this.link_code+=value.code+this.blank
        this.$refs.user_address.value=this.link_value
        this.$refs.user_address_code.value=this.link_code;
        console.log(this.link_code)

      },
    },
  }



</script>
<style scoped>
  .divwrap{
    height: 400px;
    overflow-y: auto;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 100000;
    background: #fff;
  }
  .mask{
    height: 100%;
    overflow-y: auto;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 500;
    background: rgba(0,0,0,0.5);
  }
  .divwrap>>>.distpicker-address-wrapper{
    color: #999;
  }
  .divwrap>>>.address-header{
    position: fixed;
    bottom: 400px;
    width: 100%;
    background: #000;
    color:#fff;
    z-index:10000
  }
  .divwrap>>>.address-header ul li{
    flex-grow: 1;
    text-align: center;
  }
  .divwrap>>>.address-header .active{
    color: #fff;
    border-bottom:#666 solid 8px
  }
  .divwrap>>>.address-container .active{
    color: #000;
  }
.user_address{width:80%;height:1rem;}


</style>
