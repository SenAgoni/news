<template>
  <div class="box">
    <div class="loginbox">
      <!-- 这是顶部页面的删除符号 -->
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <!-- 这是放logo的地方 -->
      <div class="logo">
          <span class="iconfont iconnew"></span>
      </div>
      <!-- 用户和密码输入框 -->
      <!-- 因为输入框需要提示用户改填写啥,所以要有一个placeholder属性 -->
     <AuthInput 
     placeholder="手机号码"
     errormsg="手机号码格式错误"
     :value="form.username"
     @input="handelsubmit"
     :rule="/^1[0-9]{4,10}$/"
     ></AuthInput>
     <!-- 密码部分 -->
      <AuthInput 
     placeholder="密码"
     :value="form.password"
     @input="handelpassword"
     :rule="/^[0-9a-zA-Z]{4,10}$/"
     errormsg="密码格式错误"
     ></AuthInput>
      <!-- 登录按钮存放处 -->
      <div class="close">
        <button @click="submitform">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
// 引入输入框组件
import AuthInput from '@/components/AuthInput'
export default {
    // 这里是要把用户输入的值传递到后台去的
    data(){
        return {
            form:{
                username:"",
                password:""
            }
        }
    },
    // 这里是要挂载组件的
    components:{
        AuthInput,
    },
    methods:{
        handelsubmit(value){
            // 这里注册的事件是用于让子组件传值给父组件
            this.form.username = value;
        },
        handelpassword(value){
           this.form.password = value;
        },
        submitform(){
            // 点击登录按钮的时候,要获取到上面所输入的值 现在仅仅只是一个验证表单数据是否能获取
            console.log(this.form)
        }
    }
}
</script>

<style scoped lang="less">
.box{
    padding: 20px;
}
.loginbox {
    width:100%;
  .close {
    span {
      color: #040404;
      font-size: 24px;
    }
  }
  .logo{
      span{
        color: #d81e06;
        font-size: 126 / 360 *100vw;
        display: flex;
        justify-content: center;
      }
  }
}
</style>