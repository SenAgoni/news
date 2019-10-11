<template>
<div>
  <div class="post-detail" v-if="post.type!=2">
      <div class="header">
          <div class="left">
              <span class="iconfont iconjiantou2"></span>
              <span class="iconfont iconnew"></span>
          </div>
          <div class="right" v-if="!post.has_follow" @click="handelFollow">
              <span>关注</span>
          </div>
          <div class="right follow" v-if="post.has_follow" @click="handelUnFollow">
              <span>已关注</span>
          </div>
      </div>
      <div class="post-content">
          <h3>{{post.title}}</h3>
          <p>{{post.user.nickname}}    2019-10-10</p>
          <div class="content" v-html="post.content">
              <!-- 这里的插值表达式只能直接渲染文本,不能渲染html标签 所以要使用v-html -->
          </div>
      </div>
      <div class="star-father">
          <div class="star" :class="{isLike:post.has_like}" @click="handleStar">
              <span class="iconfont icondianzan"></span>112
          </div>
          <div class="weixin">
              <span class="iconfont iconweixin"></span>微信
          </div>
      </div>
  </div>
  <div class="post-vedio" v-if="post.type==2">
      <video
      :src="post.content" 
      controls class="video"
      poster="../../static/images/tanqi.png"
      ></video>
      <div class="author">
            <img :src="$axios.defaults.baseURL+post.user.head_img" alt="">
            <p>{{post.user.nickname}}</p>
            <div class="right" v-if="!post.has_follow" @click="handelFollow">
              <span>关注</span>
            </div>
            <div class="right follow" v-if="post.has_follow" @click="handelUnFollow">
              <span>已关注</span>
          </div>
      </div>
      <div class="post-content">
          <h3 style="padding:10px">{{post.title}}</h3>
      </div>
      <div class="star-father">
          <div class="star" :class="{isLike:post.has_like}" @click="handleStar">
              <span class="iconfont icondianzan"></span>112
          </div>
          <div class="weixin">
              <span class="iconfont iconweixin"></span>微信
          </div>
      </div>
  </div>
  <!-- 底部的组件 -->
<PostdetailFooter
:post="post"
/>
</div>
</template>

<script>
// 引入底部组件
import PostdetailFooter from '@/components/PostdetailFooter'
export default {
    data(){
        return {
            post:{
                user:{},
            },
        }
    },
    // 然后页面一加载就要渲染数据
    mounted(){
        const config = {
                url:"/post/" + this.$route.params.id,
            }
            if(localStorage.getItem("token")){
               config.headers = {
                    Authorization: localStorage.getItem('token')
                }
            }
        this.$axios(config).then(res=>{
            const {data} = res.data;
            this.post = data;
        })
    },
    components:{
        PostdetailFooter,
    },
    methods:{
        handelFollow(){
            const config = {
                url:"/user_follows/" + this.post.user.id,
            }
            if(localStorage.getItem("token")){
               config.headers = {
                    Authorization: localStorage.getItem('token')
                }
            }
            this.$axios(config).then(res=>{
                const {message} = res.data;
                if(message==='已关注' || message==="关注成功"){
                    this.post.has_follow = true;
                    this.$toast.success(message);
                }
            })
        },
        handelUnFollow(){
             const config = {
                url:"/user_unfollow/" + this.post.user.id,
            }
            if(localStorage.getItem("token")){
               config.headers = {
                    Authorization: localStorage.getItem('token')
                }
            }
            this.$axios(config).then(res=>{
                const {message} = res.data;
                if(message ==="取消关注成功"){
                    this.post.has_follow = false;
                    this.$toast.success(message);
                }
            })
        },
        handleStar(){
            const config = {
                url:"/post_like/" + this.post.user.id,
            }
            if(localStorage.getItem("token")){
               config.headers = {
                    Authorization: localStorage.getItem('token')
                }
            }
            this.$axios(config).then(res=>{
                const {message} = res.data;
                if(message ==="点赞成功"){
                    this.post.has_like = true;
                    this.$toast.success(message);
                }
                if(message ==="取消成功"){
                    this.post.has_like = false;
                    this.$toast.success(message);
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.right{
            font-size:12px;
            height:26/360*100vw;
            width:62/360*100vw;
            line-height:26/360*100vw;
            border:1px solid #f00;
            text-align: center;
            border-radius: 50px;
            position: absolute;
            right:20px;
            background-color: #f00;
            color:#fff;
        }
.author{
    display: flex;
    align-items: center;
    img{
        width:40/360*100vw;
        height:40/360*100vw;
        border-radius: 50%;
        margin-right:10px;
    }
}
.video{
    width:100%;
}
.isLike{
    border:none !important;
    color:#fff;
    background-color: #f00;
}
.post-detail{
    padding: 10px;
    
}
.star-father{
        display: flex;
        justify-content: space-around;
        margin-top:25px;
        margin-bottom:170px;
        .star{
            padding:6px 18px;
            border:1px solid #999;
            border-radius: 50px;
            font-size:14px;
            span{
                margin-right:8px;
                font-weight: 600;
            }
        }
        .weixin{
            padding:6px 18px;
            border:1px solid #999;
            border-radius: 50px;
            font-size:14px;
            span{
                margin-right:8px;
                color:#03c803;
            }
        }
    }
    .header{
        position: fixed;
        top:0;
        background-color: #fff;
        width:100%;
        display:flex;
        align-items: center;
        .left{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                &:nth-child(2){
                    font-size:54px;
                    margin-left:10px;
                }
                &:nth-child(1){
                    font-size:16px;
                }
            }
        }
        
        .follow{
            color:#000;
            background-color: #fff;
            border:1px solid #999;
        }
    }
    .post-content{
        line-height: 1.6;
        p{
            font-size:12px;
            color:#9d9ab1;
            margin:8px 0 15px 0;
        }
        margin-top:70/360*100vw;
    }
    .content{
           /deep/ img{
                width:100%;
            }
        }
</style>