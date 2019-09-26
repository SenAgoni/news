<template>
<div>
  <!-- 这个组件是只有一张封面图的时候可以用到的  -->
  <div class="newslist" v-for="(item,index) in post" v-if="item.cover.length > 0 && item.cover.length < 2">
      <!-- 布局是要左右布局 -->
      <div class="news-left">
        <p>{{item.title}}</p>
        <span>
          {{item.user.nickname}} <i>{{item.comment_length}}跟帖</i>
        </span>
      </div>
      <div class="news-right">
        <img :src="item.cover[0].url">
      </div>
  </div>
  <!-- 这里要做把三张图的显示 -->
  <div class="newsthreelist" v-for="(item,index) in post" v-if="item.cover.length >2">
      <!-- 布局是要左右布局 -->
      <div class="news-threeleft">
        <p>{{item.title}}</p>
      </div>
      <div class="news-threepic">
        <!-- 这里的图片是要放三张图 -->
        <img :src="v.url" v-for="(v,index) in item.cover">
      </div>
       <span>
          {{item.user.nickname}} <i>{{item.comment_length}}跟帖</i>
      </span>
  </div>
</div>
</template>

<script>
export default {
  // 声明可以接受的数据 
  props:["post"],
}
</script>

<style scoped lang="less">
  .newslist{
    display: flex;
    padding:10px 10px;
    border-bottom:1px solid #e4e4e4;
    .news-left{
      flex:7;
      display: flex;
      flex-direction: column;
      align-content: space-between;
      justify-content: space-between;
      p{
         display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        overflow:hidden;
        margin:10px 0 5px 0;
      }
      span{
        color:#919093;
        font-size:14px;
        i{
          margin-left:5px;
        }
      }
    }
    .news-right{
      flex:3;
      img{
        // 这里是定义图片的大小
        width:80/360*100vw;
        height:80/360*100vw;
        object-fit: cover;
      }
    }
  }
  .newsthreelist{
    padding: 10px;
    span{
      color:#868686;
      font-size:14px;
    }
  }
  .news-threepic{
    display: flex;
    justify-content:space-between;
    line-height: 1.8;
    img{
      width:33%;
    }
  }
  .news-threeleft{
      margin-bottom:10px;
        p{
            display:-webkit-box;
            -webkit-line-clamp:2;
            -webkit-box-orient:vertical;
            overflow:hidden;
        }
    }
</style>