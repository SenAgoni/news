<template>
  <div
    class="button"
    :formdata="formdata"
    @click="submitform"
  >
    {{text}}
  </div>
</template>

<script>
export default {
  props: [
    "text",
    "formdata"
  ],
  methods: {
    submitform() {
      // 这里可以判断一下要发送那一个axios请求
      // 然后就在这里发送axios请求 类似于axios请求 因为数据再那边已经被处理好了,所以要在这边发送axios请求,就要把数据传送过来
      // 因为在main.js文件就已经在跟实例上挂载了$axios,所以以后可以再任何地方去使用了
      let axios = this.$axios;
      if (!this.formdata.nickname) {
        axios({
          url: '/login',
          method: 'POST',
          data: this.formdata,
        }).then(res => {
          if (res.data.message === '登录成功') {
            this.$toast.success('登录成功')
            // 如果登录成功就要跳转页面,登录失败就不跳转 $router方法就是运用push和back来跳转到括号里指定的路径
            setTimeout(() => {
                this.$router.push('/')
            }, 2000);
          }
        })
      }else if(this.formdata.nickname){
          axios({
          url: '/register',
          method: 'POST',
          data: this.formdata,
        }).then(res => {
          if (res.data.message === '注册成功') {
            // 如果登录成功就要跳转页面,登录失败就不跳转 $router方法就是运用push和back来跳转到括号里指定的路径
            this.$toast.success('注册成功')
            // 如果登录成功就要跳转页面,登录失败就不跳转 $router方法就是运用push和back来跳转到括号里指定的路径
            setTimeout(() => {
                this.$router.push('/login')
            }, 2000);
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.button {
  width: 100%;
  height: 48 /360 * 100vw;
  display: flex;
  justify-content: center;
  // 这是在横轴居中的flex布局的样式
  align-items: center;
  background-color: #cc3300;
  color: #fff;
  font-size: 20px;
  border-radius: 50px;
  margin-top: 20px;
}
</style>