<template>
  <div id="app" class="colorRed">
      这是第一单组件文件
      <div class="box">这是利用了rem写出来的文字</div>
      <p>
          <!-- 这是给路由跳转添加一个点击跳转到登录页的路由 -->
          <router-link to="/login">跳转到登录页</router-link>
      </p>
      <router-view></router-view>
    </div>
</template>

<script>
export default {
// 这里书写除了template外的所有数据 比如data(){} computed{} watch{}
}
</script>

<style>
/* 这里书写样式就是写组件 */
.colorRed{
    color:#000;
}
html{
    font-size: 10vw;
}
    
body{
    font-size:0.5rem;
}

.box{
    width: 5rem;
    height:5rem;
    background: rgba(17, 0, 255, 0.24);
}
</style>