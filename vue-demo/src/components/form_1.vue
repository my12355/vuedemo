<template>

  <div class="form">

    <el-form ref="form" :rules="rules" :model="form">
      <el-form-item label="地址：" prop="fAdderss">
        <el-input class="inp" v-model="form.fAdderss" auto-complete="true" input-width="70%"></el-input>

      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input class="inp" v-model="form.phone" auto-complete="true"></el-input>
      </el-form-item>


      <city-pick></city-pick >
      <date-pick></date-pick >
     <photo></photo>

      <el-button @click="resetForm('form')">重置</el-button>
      <el-button type="primary" class="btn-add" @click="submitForm('form')">提交</el-button>
    </el-form>

  </div>
</template>
<script>
import city_choose from "./city_choose.vue"
import date_choose from "./calender.vue"
import cropper from "./cropper.vue"
  export default {
    name: "Form_1",
    data() {
      // 此处自定义校验手机号码js逻辑
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
      var validatePhone = (rule, value, callback)=>{
        if (!value) {
          return callback(new Error('号码不能为空!!'))
        }
        setTimeout(()=>{
          if (!phoneReg.test(value)) {
          callback(new Error('格式有误'))
        } else {
          callback()
        }
      }, 1000)
      }
      return {
        form: {
          fAdderss: '',
          adderss: '',
          phone: '',
        },
        // 校验规则
        rules: {
          fAdderss: [
            {
              required: true, //是否必填
              message: '地址不能为空', //规则
              trigger: 'blur'  //何事件触发
            },
            //可以设置双重验证标准
            {min: 3, max: 5, message: '长度在 3 到 5 个字符',}
          ],
          // 校验手机号码，主要通过validator来指定验证器名称
          phone: [{ required: true, validator: validatePhone, trigger: 'blur' }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if(valid) {
            alert('success!');
          } else {
            console.log('error submit!!')
          return false
        }
      })
      },
      resetForm(formName) {
        this.$nextTick(function() {
          this.$refs[formName].resetFields();
        })
      }


    },
    components:{

      "city-pick":city_choose,
      "date-pick":date_choose,
      "photo":cropper
    }
  }
</script>
<style>

  .form {
    position:absolute;
    top:0;
    left:0;
    background:#fff;
    width:100%;
    min-height:100%;
    z-index:100;
    padding:2rem 0rem;
  }

  .form input {
    display:block;
    margin:10px 10px
  }
  .el-input__inner{width:70%}
</style>
