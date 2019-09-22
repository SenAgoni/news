/**
 * 这是一个路由的主入口文件,只是用来联系所有的vue文件 并且所有的路由也是由这里来配置的
 */
// 先引入vue文件
import Vue from "vue";
// 导入app.vue文件
import App from "@/App.vue";
// 引入vant包
import Vant from 'vant';
// 引入路由模块
import VueRouter from "vue-router";
// 引入登录页的组件文件
import Login from "@/pages/Login";
// 最后要注册一个路由中间件
Vue.use(VueRouter);
Vue.use(Vant);
// 路由:1.创建一个路由数组,用来匹配路径的组件
const routes = [
    {path:'/login',component:Login}
]
// 路由:2.创建一个路由对象 这是注册一个路由对象 运用路由VueRouter方法
const router = new VueRouter({
    routes
}) 
//创建一个vue实例
new Vue({
      //这里是作用域,也就是这里的实例要运用到哪一个区域
      el:'#app',
    // 路由:3.挂载路由
    router,
    // 这里就是把App中的元素渲染出来
     render(createElement){
        return createElement(App);
     }
})
