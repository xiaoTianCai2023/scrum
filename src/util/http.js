import axios from "axios";
import EventBus from './event'
// console.log(store)

//创建新的axios实例
const instance = axios.create({

});

// 中间件，每次请求都会走到这里
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log('axios中间件', response)

    if (response.status === 200) {

        // 代表没有登录
        if(response.data.code === 401) {
            // 将页面直接跳转到  /login
            // window.location.href = '/login'

            EventBus.emit('global_not_login', response.data.msg)
            return Promise.reject('没有登录状态')
        }

        // 全局的错误处理
        if (response.data.code !== 0 && response.data.code !== 401) {
            EventBus.emit('global_error_tips', response.data.msg)
        }
    } else {
        
        EventBus.emit('global_error_tips', response.data.message)
    }


    return response;
}, function (error) {
    // console.log('发生错误',error)
    EventBus.emit('global_error_tips', error.response.data.message)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance