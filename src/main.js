/**
 * 这是一个路由的主入口文件,只是用来联系所有的vue文件 并且所有的路由也是由这里来配置的
 */
// 先引入vue文件
import Vue from "vue";
// 导入app.vue文件
import App from "@/App.vue";
// 引入vant包
import Vant from 'vant';
// 引入axios包,因为axios请求会在很多地方都可以用到
import axios from 'axios';
// 引入路由模块
import VueRouter from "vue-router";
// 引入登录页的组件文件
import Login from "@/pages/Login";
import Register from "@/pages/Register";
// 引入用户中心的组件
import Personal from '@/pages/Personal';
import edit from '@/pages/edit';
import Myfollow from '@/pages/Myfollow';
import Threadfollow from '@/pages/Threadfollow';
import Mycollect from '@/pages/Mycollect';
import Index from '@/pages/Index';
// 最后要注册一个路由中间件
Vue.use(VueRouter);
Vue.use(Vant);
// 像vant一样要绑定到根实例的原型链上
Vue.prototype.$axios = axios;
// 配置路由的基准路径
axios.defaults.baseURL = "http://localhost:3000";
// 路由:1.创建一个路由数组,用来匹配路径的组件
const routes = [{
        path: '/login',
        component: Login
    },
    {
        path: '/register',
        component: Register
    },
    {
        path: '/personal',
        component: Personal
    },
    {
        path: '/edit',
        component: edit
    },
    {
        path: '/myfollow',
        component: Myfollow
    },
    {
        path: '/Threadfollow',
        component: Threadfollow
    },
    {
        path: '/Mycollect',
        component: Mycollect
    },
    {
        path: '/',
        component: Index
    },
]
// 路由:2.创建一个路由对象 这是注册一个路由对象 运用路由VueRouter方法
const router = new VueRouter({
    routes
})
//创建一个vue实例
var app = new Vue({
    //这里是作用域,也就是这里的实例要运用到哪一个区域
    el: '#app',
    // 路由:3.挂载路由
    router,
    // 这里就是把App中的元素渲染出来
    render(createElement) {
        return createElement(App);
    }
})
// 路由守卫就是每请求一个路由,就会经过这里
router.beforeEach((to, from, next) => {
    console.log(to)
    const hasToken = localStorage.getItem("token");
    if (to.path === '/personal' || to.path === '/edit') {
        if (hasToken) {
            return next();
        } else {
            app.$toast.fail('请先登录')
            return next('/login')
        }
    } else {
        // 若是请求其他页面就可以直接代码往下执行
        next();
    }
})
// 下面是所有的axios的请求都会直接经过这里
axios.interceptors.response.use(res => {
    const {
        message,
        statusCode
    } = res.data;
    // 能正常请求后台，但是响应的code是401时弹出错误 -- 这一个方法是在根实例下 而且这一个请求是所有的后台请求接口都会经过这里的  
    if (message && statusCode == 401) {
        // 这是操作数据获取有所失败的时候的提示
        app.$toast.fail(message);
    }
    // 这里是axios请求失败的时候响应回来的信息
    if (message === '用户验证信息失败') {
        app.$router.push('/login')
    }
    return res;
})