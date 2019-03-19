import axios from 'axios';
import qs from 'query-string';
import {store} from '@/store/index'

// axios.defaults.withCredentials = true;
// axios.withCredentials = true;

/**
 * http request 拦截器
 */
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    let token = store.getState('auth').auth.token;
    if(token){
      config.headers['Authorization'] = 'Bearer '+token;
    }
    config.data = qs.stringify(config.data);
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
/**
 * 统一定义 response 拦截
 * 如果返回 code 为 0，说明调用错误，统一进行错误提示
 */
axios.interceptors.response.use(
  response => {
    // if (parseInt(response.data.code) === 2) {
    //     return Promise.reject('Token 失效');
    //   }
    // }
    return response.data;
  },
  error => {
    if (error.response && error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

export default axios;
