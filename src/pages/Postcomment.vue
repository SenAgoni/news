<template>
  <div class="father">
      <headerEdit title="精彩跟帖"/>
      <div class="comment-all" v-for="(item,index) in comment">
        <div class="head">
            <div class="head-left">
                <img src="../../static/images/tanqi.png" alt="">
                <div class="info">
                    <i>{{item.user.nickname}}</i>
                    <p>2小时前</p>
                </div>
            </div>
            <div class="head-right">
                <p>
                    回复
                </p>
            </div>
        </div>
        <replay
        v-if="item.parent"
         :data="item.parent"
        />
        <div class="comment">
            <p>
                {{item.content}}
            </p>
        </div>
      </div>
      <postdetailFooter
        :post="comment"
        />
  </div>
</template>

<script>
import headerEdit from '@/components/headerEdit';
import postdetailFooter from '@/components/PostdetailFooter';
import replay from '@/components/replay';
export default {
    data(){
        return {
            comment:[],
        }
    },
    components:{
        headerEdit,
        replay,
        postdetailFooter
    },
    mounted(){
        this.$axios({
            url:`/post_comment/${this.$route.params.id}`
        }).then(res=>{
            const {data} = res.data;
            this.comment = data;
        })
    }
}
</script>

<style scoped lang="less">
.father{
    margin-bottom:200px;
}
.comment{
    margin-top:20px;
}
.comment-all{
        padding:0px 20px 20px 25px;
        border-bottom: 1px solid #e4e4e4;
        margin-bottom:10px;
}
    .head{
        display: flex;
        justify-content: space-between;
        margin-bottom:20px;
    }
    .head-left{
        display: flex;
        align-content: center;
        img{
            width:60/360*100vw;
            height:60/360*100vw;
            border-radius: 50%;
        }
        .info{
            margin-left:20px;
            line-height: 1.6;
            p{
                color:#c49b70;
                font-size:14px;
            }
        }
    }
    .head-right{
        font-size:14px;
        color:#70709a;
    }
</style>