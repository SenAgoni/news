<template>
  <div class="loginout" @click="handelLoginout">
      <div>
        <span>{{label}}</span>
      </div>
      <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
    props:["label"],
    methods:{
        handelLoginout(){
            // 这里的意思是可以直接把这一个网页替换成想要退出的网页
            this.$router.replace('/')
            // 顺便把原本的token清除掉
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
        }
    }
}
</script>

<style scoped lang="less">
    .loginout{
        display: flex;
        justify-content: space-between;
        padding:20px 0;
        margin-left:15px;
        border-bottom:1px solid #ededed;
        .arrow{
            color:#b7baba;
            margin-right:12px;
        }
    }
</style>