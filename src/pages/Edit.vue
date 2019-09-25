// 此文件是一个编辑页面
<template>
  <div>
    <!-- 头部部分 -->
    <headerEdit title="编辑资料" />
    <div class="header_pic">
      <!-- 把图片路径改成数据库中返回来的服务器的存储地址 -->
      <img :src="profile.head_img">
      <van-uploader
        class="upload"
        :after-read="afterRead"
      />
    </div>
    <!-- 条形码部分 -->
    <!-- 要在这里修改昵称要显示一个弹窗就可以了这里是要运用到组件才可以 -->
    <!-- 用户名部分 -->
    <cellbar
      label="昵称"
      :text="profile.nickname"
      @click="handlenickname"
    />
    <van-dialog
      v-model="show"
      title="昵称"
      show-cancel-button
      @confirm="handlenicknameSuer"
    >
      <!-- 这里的组件是要绑定数据的,但是当我不小心点击了取消数据依然改了,所以用户体验不好,所以不能直接绑定这一个数据
    所以渲染数据要在点击出现这一个窗口之后才能显示在那里-->
      <van-cell-group>
        <van-field
          v-model="value"
          placeholder="请输入昵称"
        />
      </van-cell-group>
    </van-dialog>
    <!-- 密码部分 -->
    <cellbar
      label="密码"
      :text="profile.password"
      type="password"
      @click="handlepassword"
    />
    <van-dialog
      v-model="show1"
      title="密码"
      show-cancel-button
      @confirm="handlepasswordSuer"
    >
    <van-cell-group>
        <van-field
          v-model="password1"
          placeholder="请输入密码"
        />
      </van-cell-group>
      </van-dialog>
      <!-- 性别部分 性别部分要使用单选框 -->
    <cellbar
      label="性别"
      :text="profile.gender===1 ? '男':'女'"
      @click="handlegender"
    />
    <!-- 这里是性别按钮的单选框 -->
    <van-dialog
      v-model="show3"
      title="性别"
      show-cancel-button
      @confirm="handlegenderSuer"
    >
    <van-radio-group v-model="radio"> <van-cell-group>
    <van-cell title="男" clickable @click="radio = '1'">
      <van-radio slot="right-icon" name="1" />
    </van-cell>
    <van-cell title="女" clickable @click="radio = '0'">
      <van-radio slot="right-icon" name="0" />
    </van-cell>
  </van-cell-group>
</van-radio-group>
</van-dialog>
  </div>
</template>

<script>
// 引入头部组件
import headerEdit from "@/components/headerEdit";
// 引入条形码组件
import cellbar from '@/components/CellBar'
export default {
  // 接收数据用的
  data() {
    return {
      profile: {},
      show: false,
      show1: false,
      show2: false,
      show3: false,
      radio: "1",
      value: '',
      password1:''
    }
  },
  methods: {
      // 文件上传的方法
    afterRead(file) {
      // 而且这一个图片会自发把图片已经上传到服务器了
      // 这是文件上传之后就会触发的函数
      let formData = new FormData();
      // 然后把文件追加到formData中
      formData.append('file', file.file)
      // 然后就直接发送axios请求
      this.$axios({
        url: '/upload',
        method: 'post',
        // 添加头信息 这里是要添加一个请求头信息的
        headers: {
          Authorization: localStorage.getItem('token')
        },
        data: formData
      }).then(res => {
        // 然后创建一个数据来接收返回来的图片的路径
        const { message, data } = res.data;
        if (message === '文件上传成功') {
          this.profile = data;
          this.profile.head_img = this.$axios.defaults.baseURL + data.url;
          // 上传成功后就要把数据发送axios请求送到编辑出才能显示 
          this.init({ head_img: data.url })
        }
      })
    },
    handlenickname() {
      this.show = !this.show
      this.value = this.profile.nickname;
    },
    handlenicknameSuer() {
      // 然后点击确认按钮就把值付给this.value 因为value值是一个双向数据绑定的所以可以直接赋值this.value给this.profile
      this.profile.nickname = this.value;
      // 然后就发送axios请求,来编辑用户资料数据
        this.init({nickname:this.value})
    },
    handlepassword(){
        // 这里要显示 的是密码框才行
        this.show1 = !this.show1
        this.password1 = this.profile.password;
    },
    handlepasswordSuer(){
        this.profile.password = this.password1;
        this.init({password:this.password1});
    },
    handlegender(){
        this.show3 = !this.show3;
        //判断profile.gender是1还是0 就要默认选中相对应 的那一个
        // 里面的this.profile.gender是一个数值型,但是我的1是一个字符串所以要改
        if(this.profile.gender === 1){
            this.radio = '1'
        }else{
            this.radio = '0'
        }
    },
    handlegenderSuer(){
        // 然后再把那个值赋值给this.profile.gender
        this.profile.gender = +this.radio;
        // 最后在调用修改接口,修改数据
         this.init({gender : +this.radio});
    },
    // 这是发送axios请求的封装
    init(data) {
      this.$axios({
        url: '/user_update/' + localStorage.getItem('user_id'),
        method: 'post',
        // 添加头信息 这里是要添加一个请求头信息的
        headers: {
          Authorization: localStorage.getItem('token')
        },
        data,
      }).then(res => {
        const { message } = res.data;
        if (message === '修改成功') {
          this.$toast.success(message);
          this.upload()
        }
      })
    },
    upload() {
      // 从本地存储中提取数据
      let hasToken = localStorage.getItem("token");
      let user_id = localStorage.getItem("user_id");
      // 然后就发送axios请求,从数据库中获取数据
      let axios = this.$axios;
      if (hasToken) {
        axios({
          url: '/user/' + user_id,
          // 添加头信息 这里是要添加一个请求头信息的
          headers: {
            Authorization: hasToken
          }
        }).then(res => {
          if (!res.data.statusCode) {
            // 这里的条件是如果没有渲染失败的状态码回来就渲染页面,如果有就就要跳转到登录页并且把原先的数据删除
            const data = res.data.data;
            // 设置默认用户头像 如果他有头像就用它的,如果他没有就要用自己的
            // 把数据存到data数据中
            this.profile = data;
            if (data.head_img) {
              // 服务器的基准地址加上图片
              this.profile.head_img = axios.defaults.baseURL + this.profile.head_img;
            } else {
              data.head_img = "./static/images/tanqi.png"
            }
          } else {
            this.$toast.fail('请先登录');
            this.$router.push('/login');
            // 顺便把原本的token清除掉
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
          }
        })
      }
    }
  },

  // 挂载组件
  components: {
    headerEdit,
    cellbar
  },
  // 一刷新就要渲染数据
  mounted() {
    this.upload()
  },

}
</script>

<style scoped lang="less">
.header_pic {
  display: flex;
  justify-content: center;
  position: relative;
  img {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    border-radius: 50%;
    margin-top: 10px;
  }
  .upload {
    position: absolute;
    opacity: 0;
  }
  /deep/ .van-uploader__upload {
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
  }
}
</style>