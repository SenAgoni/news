<template>
  <div>
      <!-- 顶部部分 -->
      <div class="index-head">
          <div class="logo"> 
              <span class="iconfont iconnew"></span>
          </div>
          <div class="index-search">
              <span class="iconfont iconsearch"></span>
              <p>搜索新闻</p>
          </div>
          <router-link to="/personal">
          <div class="index-user">
            <span class="iconfont iconwode"></span>
          </div>
          </router-link>
      </div>
      <!-- nav导航栏 -->
    <van-tabs v-model="active" sticky swipeable>
        <van-tab 
        v-for="(item,index) in categories" 
        :title="item.name">
        <!-- 这里刚刚出问题是因为内容是要在tab标签里面的 因为这里的内容是要关连到栏目表的所以要把页面要显示内容写到这里 -->
            <Newscontent
                :post="postlist"
            />
            <!-- 上面的post是为了让这边请求回来的数据发送给定义组件那边来渲染页面 -->
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入新闻列表内容
import Newscontent from '@/components/Newscontent'
export default {
    data(){
        return {
            active:1,
            categories:[],
            postlist:[],
        }
    },
    components:{
        Newscontent,
    },
    // 一加载页面就要发送axios请求,然后就要渲染头条栏目

    mounted(){
        const config = {
            url:'/category',
            //请求头是用于默认登录用户才有
        }
        if(localStorage.getItem('token')){
            config.headers = {
                Authorization: localStorage.getItem('token')
            }
        }
        this.$axios(config).then(res=>{
            // 然后就要结构数据,并把数据存在于data()函数中
            const {data} = res.data;
            this.categories = data;
            // 获取到栏目信息后就要直接先默认获取头条的数据
            this.$axios({
                url:'/post'
            }).then(res=>{
                const {data} = res.data;
                // 然后把这个数据存储起来发送给定义组件那边
                this.postlist = data;
            })
        })
    }
}
</script>

<style scoped lang="less">
    .index-head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#fff;
        background-color: #ff0000;
        padding:0 10px;
        .index-search{
            display: flex;
            flex:1;
            background-color: #f97979;
            height:34/360*100vw;
            margin:0 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            p{
                font-size:14px;
                margin-left:5px;
            }
        }
        .logo{
            span{
                font-size:40px;
            }
        }
        .index-user{
            span{
                font-size:20px;
            }
        }
    }
    /deep/.van-tabs__nav{
        background-color:#e4e4e4;
    }
    /deep/.van-tabs__line{
        height:2px;
    }
</style>