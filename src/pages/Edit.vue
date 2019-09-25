// 此文件是一个编辑页面
<template>
  <div>
      <!-- 头部部分 -->
      <headerEdit
      title="编辑资料"
      />
      <div class="header_pic">
          <!-- 把图片路径改成数据库中返回来的服务器的存储地址 -->
          <img :src="profile.head_img">
          <van-uploader class="upload" :after-read="afterRead" />
      </div>
      <!-- 条形码部分 -->
      <cellbar
      label="昵称"
      :text="profile.nickname"
      />
      <cellbar
      label="密码"
      :text="profile.password"
      />
      <cellbar
      label="性别"
      :text="profile.gender===1 ? '男':'女'"
      />
  </div>
</template>

<script>
// 引入头部组件
import headerEdit from "@/components/headerEdit";
// 引入条形码组件
import cellbar from '@/components/CellBar'
export default {
    // 接收数据用的
    data(){
        return {
            profile:{}
        }
    },
    // 文件上传的方法
    methods:{
        afterRead(file){
            // 而且这一个图片会自发把图片已经上传到服务器了
            // 这是文件上传之后就会触发的函数
            let formData = new FormData();
            // 然后把文件追加到formData中
            formData.append('file',file.file)
            // 然后就直接发送axios请求
            this.$axios({
                url:'/upload',
                method:'post',
                // 添加头信息 这里是要添加一个请求头信息的
                headers:{
                    Authorization: localStorage.getItem('token')
                },
                data:formData
            }).then(res=>{
                // 然后创建一个数据来接收返回来的图片的路径
                const {message,data} = res.data;
                if(message === '文件上传成功'){
                    this.profile = data;
                    this.profile.head_img = this.$axios.defaults.baseURL + data.url;
                    // 上传成功后就要把数据发送axios请求送到编辑出才能显示 
                    this.$axios({
                        url:'/user_update/' + localStorage.getItem('user_id'),
                        method:'post',
                        // 添加头信息 这里是要添加一个请求头信息的
                        headers:{
                            Authorization: localStorage.getItem('token')
                        },
                        data:{
                            head_img:data.url
                            }
                    }).then(res=>{
                       const {message} = res.data;
                       if(message === '修改成功'){
                       this.$toast.success(message)
                       }
                    })
                }
            })
        }
    },

    // 挂载组件
    components:{
        headerEdit,
        cellbar
    },
    // 一刷新就要渲染数据
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
                            data.head_img = "./static/images/tanqi.png"
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

}
</script>

<style scoped lang="less">
.header_pic{
    display: flex;
    justify-content: center;
    position: relative;
    img{
        width:70/360*100vw;
        height:70/360*100vw;
        border-radius: 50%;
        margin-top:10px;
    }
    .upload{
        position: absolute;
        opacity: 0;
    }
    /deep/ .van-uploader__upload{
     width:70/360*100vw;
     height:70/360*100vw;
    }
}

</style>