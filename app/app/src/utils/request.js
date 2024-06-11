import store from '@/store'
import axios from 'axios'
// import { Message } from 'element-ui';

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // Message({
  //   message: '加载中...',
  //   type: 'loading',
  //   duration: 0, // 不会自动消失
  //   forbidClick: true // 禁止背景点击
  // });

  // 只要有token，就在请求时携带，便于请求需要授权的接口
  const token = store.state.token
  if (token) {
    config.headers.token = token
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});


// 导出配置好的实例
export default instance
