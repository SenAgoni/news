<template>
  <div>
      <headerEdit title="我的跟帖"/>
      <!-- 评论的数据结构也是要循环渲染的 -->
      <div class="thread-follow" v-for="(item,index) in list">
          <p>2019-10-10 10:25</p>
          <div class="parent" v-if="item.parent?true:false">
              <!-- 这里是一个回复的内容 有回复内容就要显示这一部分 -->
              <p>@:{{item.parent.user.nickname}}</p>
              <p>{{item.parent.content}}</p>
          </div>
          <div class="replay">
              <p>{{item.content}}</p>
              <div class="jiantou">
                  <p>原文: {{item.post.title}}
                </p>
               <span class="iconfont iconjiantou1"></span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// 引入头部组件
import headerEdit from "@/components/headerEdit";
export default {
    // 把数据存储到这里
    data(){
        return {
            list:[]
        }
    },
    mounted(){
        // 一加载页面就要发送axios请求
        this.$axios({
            url:'/user_comments',
            method:'get',
            // 添加头信息 这里是要添加一个请求头信息的
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res=>{
            const {data} = res.data;
            console.log(data);
            this.list = data;
        })
    },
// 挂载组件
    components:{
        headerEdit,
    }
}
</script>

<style scoped lang="less">
.thread-follow{
    padding:10px;
    border-bottom:1.5px solid #d7d7d7;
    &>p{
        color:#aca6b1;
        font-size:14px;
        padding:10px 0;
    }
}
    .parent{
        color:#9b9795;
        background-color: #e4e4e4;
        font-size:13px;
        line-height: 2;
        padding:18px 8px;
    }
    .replay{
        line-height: 2;
        padding-top:8px;
        .jiantou{
            display: flex;
        &>p{
            color:#898989;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space:nowrap;
            font-size:14px;
        }
        }
    }
</style>