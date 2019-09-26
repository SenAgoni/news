<template>
<!-- 这里的根标签不能有所变化 -->
  <div>
      <headerEdit title="我的收藏"/>
      <!-- 封装内容组件 -->
      <Newscontent/>
  </div>
</template>

<script>
// 引入头部组件
import headerEdit from "@/components/headerEdit";
import Newscontent from "@/components/Newscontent";
export default {
    components:{
        headerEdit,
        Newscontent
    }
}
</script>

<style>

</style>