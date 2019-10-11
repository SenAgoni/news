<template>
  <div>
    <div class="comment-thread" v-if="data">
      <div class="thread-top">
        <div class="thread-left">
          <span>1</span>
          <span>{{data.user.nickname}}1</span>
          <i>2小时前</i>
        </div>
        <div class="thread-right">
          <p>回复</p>
        </div>
      </div>
      <div class="thread-bottom">
        <p>{{data.content}}</p>
      </div>
    </div>
    <replay
      v-if="data.parent"
      :data="data.parent"
    ></replay>
  </div>
</template>

<script>
export default {
  name: "replay",
  props: ["data"],

}
</script>

<style scoped lang="less">
.comment-thread {
  line-height: 2.4;
  border: 1px solid #dadada;
  padding: 10px 10px 20px;
}
.thread-top {
  display: flex;
  justify-content: space-between;
}
.thread-left {
  i {
    font-size: 14px;
    color: #707070;
  }
}
</style>