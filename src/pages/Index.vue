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
    <van-tabs
      v-model="active"
      sticky
      swipeable
    >
      <van-tab
        v-for="(item,index) in categories"
        :key="index"
        :title="item.name"
      >
      <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
      </div>
        <!-- 这里刚刚出问题是因为内容是要在tab标签里面的 因为这里的内容是要关连到栏目表的所以要把页面要显示内容写到这里 -->
        <Newscontent
          v-for="(item,index) in postlist"
          :key="index"
          :post="item"
        />
        <!-- 这是一个分页组件的使用 -->
        <van-list
          :immediate-check="true"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        </van-list>
        <!-- 上面的post是为了让这边请求回来的数据发送给定义组件那边来渲染页面 -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 引入新闻列表内容
import Newscontent from '@/components/Newscontent'
export default {
  data() {
    return {
      active: localStorage.getItem('token') ? 1 : 0,
      categories: [],
      postlist: [],
      // 这是用户访问网页,显示的第几页的页数,默认是第一页的页数
      pageIndex: 1,
      // 这是用户每访问一页就要显示每一页该显示的页数, 先默认5条
      pageSize: 5,
      // 接口所需要的category是一个导航条上面的栏目的id ,每一个栏目都有一个相对应的id ,所以要监听那个active的变化,然后就相对应的变化
      cid: 999,
      // 分页组件的使用
      loading: false,
      finished: false,
    }
  },
  // 这里来监听cid的变化,然后让后台来决定要渲染的是个什么数据
  watch: {
    active() {
      // 当监听到变化时我再次发送axios请求
      this.cid = this.categories[this.active].id;
      this.pageIndex = 1;
      this.$axios({
        url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`,
      }).then(res => {
        const { data } = res.data;
        this.postlist = data;
        this.$axios({
          url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        }).then(res => {
          setTimeout(() => {
            const { data } = res.data;
            //这里的数据是要接着原本就有的数据来渲染页面的才能显示增加的意思
            const newData = [...this.postlist, ...data] //把数据直接追加到新数组中,然后可以直接渲染页面
            //这里是把后面获取的数据来添加到一个新的数组中,然后就要赋值给this.postlist
            this.postlist = newData;
            this.loading = false;
            // 这里是要数据库里面没有数据了才可以说是已加载完成
            if (data.length < 5) {
              // 为什么要<5呢?因为数据长度小于一个页面的渲染的话就要显示加载完成了
              this.finished = true;
              // 这个改为true就代表数据已经渲染完成了,数据库里面已经没有数据了
            }
          }, 20);
        })
      })

    }
  },
  components: {
    Newscontent,
  },
  // 一加载页面就要发送axios请求,然后就要渲染头条栏目

  mounted() {
    const config = {
      url: `/category`,
      //请求头是用于默认登录用户才有
    }
    if (localStorage.getItem('token')) {
      config.headers = {
        Authorization: localStorage.getItem('token')
      }
    }
    this.$axios(config).then(res => {
      // 然后就要结构数据,并把数据存在于data()函数中
      const { data } = res.data;
      this.categories = data;
      // 获取到栏目信息后就要直接先默认获取头条的数据
      this.$axios({
        url: `/post?category=${this.cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`,
      }).then(res => {
        const { data } = res.data;
        // 然后把这个数据存储起来发送给定义组件那边
        this.postlist = data;
      })
    })
  },
  methods: {
    // 这一个事件是一往下拉就会触发的事件
    onLoad() {
      // 然后那一个页数就要增加一页  每一次往下拉请求一次新数据就先增加一个
      ++this.pageIndex;
      // 然后就发送axios请求,获取下一页的数据
      this.init(this.cid);
    },
    init(cid) {
      this.$axios({
        url: `/post?category=${cid}&pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
      }).then(res => {
        setTimeout(() => {
          const { data } = res.data;
          // 这里的数据是要接着原本就有的数据来渲染页面的才能显示增加的意思
          const newData = [...this.postlist, ...data] //把数据直接追加到新数组中,然后可以直接渲染页面
          // 这里是把后面获取的数据来添加到一个新的数组中,然后就要赋值给this.postlist
          this.postlist = newData;
          this.loading = false;
          // 这里是要数据库里面没有数据了才可以说是已加载完成
          if (data.length < 5) {
            // 为什么要<5呢?因为数据长度小于一个页面的渲染的话就要显示加载完成了
            this.finished = true;
            // 这个改为true就代表数据已经渲染完成了,数据库里面已经没有数据了
          }
        }, 20);
      })
    }
  },
}
</script>

<style scoped lang="less">
.index-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: #ff0000;
  padding: 0 10px;
  .index-search {
    display: flex;
    flex: 1;
    background-color: #f97979;
    height: 34/360 * 100vw;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    p {
      font-size: 14px;
      margin-left: 5px;
    }
  }
  .logo {
    span {
      font-size: 40px;
    }
  }
  .index-user {
    span {
      font-size: 20px;
    }
  }
}
/deep/.van-tabs__nav {
  background-color: #e4e4e4;
}
/deep/.van-tabs__line {
  height: 2px;
}
.arrow{
    position: absolute;
    width:40/360*100vw;
    height:21/360*100vw;
    right: -1px;
    top:10px;
    background-color: #e4e4e4;
    text-align: center;
    span{
        font-size:25px;
    }
}
</style>