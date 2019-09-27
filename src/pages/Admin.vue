<template>
  <div>
      <headerEdit title="栏目管理"/>
      <div class="delete-channel">
          <p>点击删除以下频道</p>
          <div class="channel">
              <span v-for="(item,index) in channels" @click="Reducechannel(index)">{{item.name}}</span>
          </div>
      </div>
      <div class="delete-channel">
          <p>点击添加以下频道</p>
          <div class="channel">
              <span v-for="(item,index) in channels2" @click="Addchannel(item)">{{item.name}}</span>
          </div>
      </div>
  </div>
</template>

<script>
// 引入头部组件
import headerEdit from "@/components/headerEdit";
export default {
    data(){
        return {
            channels:[],
            channels2:[],
        }
    },
    mounted(){
        this.$axios({
            url:'/category',
        }).then(res=>{
            const {data} = res.data;
            this.channels = data;
            this.channels2 = [...this.channels];
        })
    },
    // 挂载组件
    components:{
        headerEdit,
    },
    methods:{
        Addchannel(name){
            this.channels.push(name);
        },
        Reducechannel(index){
            this.channels.splice(index,1)
        }
    }
}
</script>

<style scoped lang="less">
    .delete-channel{
        padding:12px;
        p{
            font-size:12px;
            color:#846d96;
            margin-bottom:15px;
        }
        .channel{
            display:flex;
            flex-wrap: wrap;
            span{
                display: block;
                border:1px solid #d5d5d5;
                padding:10px 14px;
                margin-right:15px;
                margin-bottom: 10px;
                &:nth-child(4n){
                    margin-right:0;
                }
            }
        }
    }
</style>