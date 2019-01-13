// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
import Login from '@/components/login/Login'
// 按需加载
const Home = ()=> import('@/components/home/Home')
const Users = ()=> import('@/components/users/Users')
const Roles = ()=> import('@/components/roles/Roles')
const Rights = ()=> import('@/components/rights/Rights')
const Categories = ()=>import('@/components/categories/Categories')
// const Goods = ()=>import('@/components/goods/Goods')
// const GoodsAdd = () =>import('@/components/goods-add/GoodsAdd')
const NotFound = () =>import('@/components/404/NotFound')

// 通过特殊语法，/*webpackChunkName: "goods"*/ 可以将多个组件合并为同一个js文件输出
// webpackChunkName 的值相同即可
const Goods = ()=>import(/*webpackChunkName: "goods"*/ '@/components/goods/Goods')
const GoodsAdd = () =>import(/*webpackChunkName: "goods"*/ '@/components/goods-add/GoodsAdd')

// 改成按需加载的方式
// import Home from '@/components/home/Home'
// import Users from '@/components/users/Users'
// import Roles from '@/components/roles/Roles'
// import Rights from '@/components/rights/Rights'
// import Categories from '@/components/categories/Categories'
// import Goods from '@/components/goods/Goods'
// import GoodsAdd from '@/components/goods-add/GoodsAdd'
// import NotFound from '@/components/404/NotFound'
// 安装插件
Vue.use(VueRouter)

// 创建路由实例,并导出
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login },
    {
      path: '/home', component: Home,
      children: [
        {
          path: '/users',
          component: Users
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/categories',
          component: Categories
        },
        {
          path: '/goods/:page?',
          component: Goods
        },
        {
          path: '/goods-add',
          component: GoodsAdd
        }
      ]
    },
    { path: '*', component: NotFound }

  ]
})
router.beforeEach((to, from, next) => {
  /*
   登录访问控制的思路:
   1 判断访问的是不是登录页面
   2 如果是，直接 next() 放行
   3 如果不是，就判断有没有登录
   4 如果没有登录，就跳转到登录页面，让用户登录
   5 如果登录了，就直接 next() 放行
 */
  if (to.path === '/login') {
    next()
    return
  }
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
// 导出路由
export default router
