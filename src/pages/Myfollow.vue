<template>
  <div>
      <!-- 头部可以引入头部封装好的组件 -->
      <headerEdit title="我的关注"/>
      <!-- 内容部分 -->
      <div class="Myfollow_content" v-for="(item,index) in list">
          <img :src="$axios.defaults.baseURL+item.head_img" alt="">
          <div class="content_middle">
              <p>{{item.nickname}}</p>
              <span>2019-10-10</span>
          </div>
          <span @click="handlecansel(index)">取消关注</span>
      </div>
  </div>
</template>

<script>
// 引入头部组件
import headerEdit from "@/components/headerEdit";
export default {
    // 存储要渲染的数据
    data(){
        return {list:[],}
    },
    // 然后加载时就要发送axios请求
    mounted(){
        this.$axios({
            url:'/user_follows',
            // 添加头信息 这里是要添加一个请求头信息的
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res=>{
            const {data} = res.data;
            this.list = data;
        })
    },
    methods:{
        handlecansel(index){
            let id = this.list[index].id;
            this.$axios({
                url:'/user_unfollow/'+id,
                method:'get',
                 // 添加头信息 这里是要添加一个请求头信息的
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(res=>{
                this.list.splice(index,1)
                this.$toast.success(res.data);
            })
        }
    },
components:{
    headerEdit,
}
}
</script>

<style scoped lang="less">
.Myfollow_content{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:20px 15px;
    border-bottom:1px solid #e1e1e1;
    img{
        width: 60/360*100vw;
        height: 60/360*100vw;
        border-radius: 50%;
    }
    .content_middle{
        flex:1;
        margin-left:10px;
        span{
            color:#999;
            font-size:13px;
        }
    }
    &>span{
        display: block;
        width:73/360*100vw;
        height:30/360*100vw;
        line-height:30/360*100vw;
        text-align: center;
        background-color: #e1e1e1;
        font-size:12px;
        color:#404040;
        border-radius: 50px;
    }
}
</style>