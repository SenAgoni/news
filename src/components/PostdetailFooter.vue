<template>
<div>
    <!-- 这是未输入文字之前的框框 -->
  <div class="click-before" v-show="!isShow">
      <div class="left">
          <input type="text" placeholder="写跟贴" @focus="isShow=!isShow">
      </div>
      <div class="right">
          <i>{{post.comment_length}}</i>
          <div class="icon">
              <span class="iconfont iconpinglun-"></span>
              <span class="iconfont iconshoucang" @click="handleshoucang" :class="{isStar:post.has_star}"></span>
              <span class="iconfont iconfenxiang"></span>
          </div>
      </div>
  </div>
  <!-- 这是点击输入后的框框状态 这里一定要使用v-show因为v-show使用了,在页面消失但是在结构中还有 -->
    <div class="click-after" v-show="isShow">
        <textarea rows="6" placeholder="书写评论" @blur="isShow=false" class="textarea" ref="textarea" :autofocus="true"></textarea>
        <span>发送</span>
    </div>
</div>
</template>

<script>
export default {
    // 接收数据
    props:["post"],
    data(){
        return {
            isShow:false,
        }
    },
    methods:{
        handleshoucang(){
            const {id} = this.post;
            const config = {
                url:"/post_star/" + id,
            }
            if(localStorage.getItem("token")){
               config.headers = {
                    Authorization: localStorage.getItem('token')
                }
            }
            this.$axios(config).then(res=>{
                const {message} = res.data;
                if(message === "用户信息验证失败"){
                    this.$router.replace('/login')
                }
                if(message==="收藏成功"){
                    this.$toast.success(message);
                    this.post.has_star = true;
                }
                if(message==="取消成功"){
                    this.$toast.success(message);
                    this.post.has_star = false;
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.isStar{
    color:#f00
}
.click-after{
    border-top:1px solid #999;
    position: fixed;
    bottom:0;
    background-color:#fff;
    width:100%;
    padding:15px 10px;
    box-sizing: border-box;
    vertical-align: middle;
    .textarea{
        width:260/360*100vw;
        border:none;
        background-color: #d7d7d7;
        border-radius: 10px;
        padding-top:10px;
        padding-left:10px;
        box-sizing: border-box;
        resize: none;
    }
    span{
        background-color: #f00;
        padding:5px 20px;
        text-align: center;
        color:#fff;
        border-radius: 50px;
    }
}
    .click-before{
        position: fixed;
        bottom:-10px;
        width:100%;
        background-color: #fff;
        border-top:1px solid #999;
        display:flex;
        align-items: center;
        padding-left:10px;
        padding-top:10px;
        margin-top:20px;
        margin-bottom:10px;
        box-sizing: border-box;
        height:75px;
        .left{
            flex:1.5;
            margin-right:10px;
            input{
                border:none;
                border-radius: 50px;
                background-color:#d7d7d7;
                height:35/360*100vw;
                font-size:12px;
                padding-left:20px;
                width:100%;
                box-sizing:border-box;
            }
        }
        .right{
            flex:1;
            position: relative;
            i{
                position: absolute;
                left:8px;
                top:-6px;
                background-color: #f00;
                color:#fff;
                font-size:12px;
                border-radius: 50px;
                padding:0 3px;
            }
            .icon{
                display: flex;
                justify-content: space-around;
            }
            span{
                font-size:26px;
            }
        }
    }

</style>