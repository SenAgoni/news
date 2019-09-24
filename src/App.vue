// 这个文件是用来填写坑位的,相当于是所有的vue文件的输出部分
<template>
  <div id="app">
      <!-- 这是用于填坑的是要填什么组件就要书写什么样的坑 -->
      <router-view></router-view>
    </div>
</template>

<script>
export default {
data(){
  return {
    list:[]
  }
}
}
</script>

<style>
/* 引入字体图标样式 */
@import url("http://at.alicdn.com/t/font_1426139_h6vn3jbl5q.css");
/* // 在app主页面的vue文件中引入刚下载的包,因为有可能所有的 文件都是需要用到的 */
@import url('../node_modules/vant/lib/index.css');
/* 这里书写样式最初始化的 */
*{
  margin:0;
  padding:0;
}
ul,li,ol{
  list-style: none;
}
i,em{
  font-style: normal;
}
input{
  outline: none;
}
a{
  color:inherit;
}
a:hover{
  text-decoration: none;
}
</style>