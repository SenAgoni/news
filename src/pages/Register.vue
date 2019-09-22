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
     type="password"
     :value="form.password"
     @input="handelpassword"
     :rule="/^[0-9a-zA-Z]{3,10}$/"
     errormsg="密码格式错误"
     ></AuthInput>
     <!-- 昵称 -->
      <AuthInput 
     placeholder="昵称"
     :value="form.nickname"
     @input="handelnickname"
     :rule="/^[\u4E00-\u9FA5A-Za-z0-9_]+$/"
     errormsg="昵称格式错误"
     ></AuthInput>
     <!-- 跳转登录处 -->
     <div class="close tips">
        已经注册?<router-link to="/Register">跳转登录页</router-link>
      </div>
      <!-- 登录按钮存放处 -->
      <div class="close">
        <AuthButton 
        text="注册"
        :formdata="form"
        ></AuthButton>
      </div>
    </div>
  </div>
</template>

<script>
// 引入输入框组件
import AuthInput from '@/components/AuthInput'
// 引入按钮组件
import AuthButton from '@/components/AuthButton'
export default {
    // 这里是要把用户输入的值传递到后台去的
    data(){
        return {
            form:{
                username:"",
                password:"",
                nickname:""
            }
        }
    },
    // 这里是要挂载组件的
    components:{
        AuthInput,
        AuthButton
    },
    methods:{
        handelsubmit(value){
            // 这里注册的事件是用于让子组件传值给父组件
            this.form.username = value;
        },
        handelpassword(value){
           this.form.password = value;
        },
        handelnickname(value){
            this.form.nickname = value;
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
.tips{
  display: flex;
  justify-content: flex-end;
  font-size:14px;
  a{
    color:#24acf2;
  }
}
</style>