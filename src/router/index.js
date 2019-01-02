// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
// 安装插件
Vue.use(VueRouter)

// 创建路由实例,并导出
const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// 导出路由
export default router
