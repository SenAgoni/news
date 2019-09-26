<template>
<div>
  <!-- 这个组件是只有一张封面图的时候可以用到的  -->
  <div class="newslist" v-if="post.cover.length > 0 &&post.cover.length <3 && post.type === 1">
      <!-- 布局是要左右布局 -->
      <div class="news-left">
        <p>{{post.title}}</p>
        <span>
          {{post.user.nickname}} <i>{{post.comment_length}}跟帖</i>
        </span>
      </div>
      <div class="news-right">
        <img :src="post.cover[0].url">
      </div>
  </div>
  <!-- 三张图片 -->
  <div class="newsthreelist" v-if="post.cover.length >= 3">
      <!-- 布局是要左右布局 -->
      <div class="news-threeleft">
        <p>{{post.title}}</p>
      </div>
      <div class="news-threepic">
        <img :src="item.url" v-for="(item,index) in post.cover" v-if=" index < 3">
      </div>
      <span>
          {{post.user.nickname}} <i>{{post.comment_length}}跟帖</i>
        </span>
  </div>
  <!-- 视频部分 -->
  <div class="vedio" v-if="post.type === 2 && post.cover.length === 1">
      <!-- 布局是要左右布局 -->
      <div class="vedio-title">
        <p>{{post.title}}</p>
      </div>
      <div class="vedio-pic">
        <img :src="post.cover[0].url">
        <div class="layer">
            <span class="iconfont iconshipin"></span>
        </div>
      </div>
       <span>
          {{post.user.nickname}} <i>{{post.comment_length}}跟帖</i>
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
        width:90/360*100vw;
        height:90/360*100vw;
        object-fit: cover;
      }
    }
  }
  .newsthreelist{
    padding: 10px;
    border-bottom:1px solid #dedede;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
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
    .vedio{
      padding: 10px;
      border-bottom:1px solid #dedede;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-content: space-between;
        span{
        color:#868686;
        font-size:14px;
      }
        .vedio-title{
              p{
                display:-webkit-box;
                -webkit-line-clamp:2;
                -webkit-box-orient:vertical;
                overflow:hidden;
            }
        }
        .vedio-pic{
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            width:100%;
            height:170/360*100vw;
          }
          .layer{
            position: absolute;
            width:48/360*100vw;
            height:48/360*100vw;
            background-color: rgba(0, 0, 0, .5);
            border-radius: 50%;
            text-align:center;
            span{
              color:#fff;
              font-size:38px;
            }
          }
        }
    }
</style>