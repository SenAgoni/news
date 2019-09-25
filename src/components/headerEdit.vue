<template>
  <div class="header" @click="$router.back()">
      <!-- 这里可以直接回转到前一个页面 -->
      <!-- 此布局可以分成三份 最后一个用于占位置 -->
      <span class="iconfont iconjiantou2"></span>
      <h4>{{title}}</h4>
      <span class="iconfont iconjiantou2"></span>
  </div>
</template>

<script>
export default {
props:["title"]
}
</script>

<style scoped lang="less">
.header{
    display:flex;
    justify-content: space-between;
    padding:10px;
    span:last-child{
        opacity: 0;
    }
}
</style>