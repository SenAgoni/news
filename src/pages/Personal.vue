<template>
  <div>
      <!-- 头部用户信息部分 -->
      <div class="profile">
          <img src="http://img0.imgtn.bdimg.com/it/u=2786741331,312930537&fm=26&gp=0.jpg" alt="">
          <div class="profile_info">
              <span class="iconfont iconxingbienan"></span>
              <i>火星网友</i>
              <p>2019-10-10</p>
          </div>
          <div class="profile_arrow">
              <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .profile{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:30px 12px;
        border-bottom:5px solid #e4e4e4;
        img{
            flex:1;
            width:70/360*100vw;
            height:70/360*100vw;
            border-radius: 50%;
        }
        .profile_info{
            flex:3;
            margin:10px;
            p{
                font-size:14px;
                color:#a1a1b6;
                margin-top:8px;
            }
            span{
                color: #84c0ec;
            }
        }
        .profile_arrow{
            flex:1;
            display: flex;
            justify-content: flex-end;
        }
    }
</style>