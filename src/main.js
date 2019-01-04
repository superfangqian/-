// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//导入路由配置
import router from "./router"
//导入element-ui
import ElementUI from "element-ui"
//导入element-ui的样式文件
import 'element-ui/lib/theme-chalk/index.css'
//导入自己的样式
import '@/assets/css/index.css'
// 导入axios
import axios from 'axios'
//把axios添加到原型上
Vue.prototype.axios = axios
// axiso的基准地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"
// 请求拦截器
// 配置好以后，不需要每次设置请求头
axios.interceptors.request.use((config)=>{
// 统一设置请求头
  config.headers.Authorization =localStorage.getItem('token')
// 返回config
  return config

})
//安装插件
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
