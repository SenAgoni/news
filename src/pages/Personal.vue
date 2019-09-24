<template>
  <div>
      <!-- 头部用户信息部分 -->
      <div class="profile">
        <!-- 用户头像是不能自己固定的,所以可以根据那个用户登录就渲染他自己设置的用户头像,所以要验证是哪一个用户登录啦 -->
          <img :src = "profile.head_img" alt="">
          <div class="profile_info">
              <span class="iconfont iconxingbienan"></span>
              <i>{{profile.nickname}}</i>
              <p>2019-10-10</p>
          </div>
          <div class="profile_arrow">
              <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
      <cellbar
      label="我的关注"
      text="关注的用户"
      ></cellbar>
      <cellbar
      label="我的跟帖"
      text="跟帖/回复"
      ></cellbar>
      <cellbar
      label="我的收藏"
      text="文章/视频"
      ></cellbar>
      <Loginout
      label="退出"
      ></Loginout>
  </div>
</template>

<script>
// 引入组件
import cellbar from '@/components/CellBar'
import Loginout from '@/components/Loginout'
export default {
    data(){
        // 存储一个对象就好
        return {
            profile :{}
        }
    },
    // 页面一加载,就要把数据拿出来,然后就渲染到页面中
    mounted(){
        // 从本地存储中提取数据
        let hasToken = localStorage.getItem("token");
        let user_id = localStorage.getItem("user_id");
        // 然后就发送axios请求,从数据库中获取数据
        let axios = this.$axios;
        if(hasToken){
            axios({
                url:'/user/'+user_id,
                // 添加头信息 这里是要添加一个请求头信息的
                headers:{
                    Authorization: hasToken
                }
            }).then(res=>{
                    if(!res.data.statusCode){
                        // 这里的条件是如果没有渲染失败的状态码回来就渲染页面,如果有就就要跳转到登录页并且把原先的数据删除
                        const data = res.data.data;
                        // 设置默认用户头像 如果他有头像就用它的,如果他没有就要用自己的
                        // 把数据存到data数据中
                        this.profile = data;
                        if(data.head_img){
                             // 服务器的基准地址加上图片
                            this.profile.head_img = axios.defaults.baseURL + this.profile.head_img;
                        }else{
                            data.head_img = "../static/images/tanqi.png"
                        }
                    }else{
                        this.$toast.fail('请先登录');
                        this.$router.push('/login');
                        // 顺便把原本的token清除掉
                        localStorage.removeItem('token')
                        localStorage.removeItem('user_id')
                    }
            })
        }
    },
    // 注册组件
    components:{
        cellbar,
        Loginout
    }
}
</script>

<style scoped lang="less">
    .profile{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:30px 15px;
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
            span{
                color:#b7baba;
            }
        }
    }
</style>