<template>
  <div class="cellbar" @click="$emit('click',$event)">
    <div class="cellbar_left">
        <span>{{label}}</span>
    </div>
      <div class="cellbar_right">
          <i>{{ type === 'password' ? "******":text}}</i>
          <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {
    props:["label","text","type"]
}
</script>

<style scoped lang="less">
    .cellbar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;
        margin-left:15px;
        border-bottom:1px solid #ededed;
        .cellbar_right{
            color:#b7baba;
            i{
                font-size: 13px;
            }
            span{
                margin-right:12px;
            }
        }
    }
</style>