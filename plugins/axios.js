/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 15:25:26
 * @LastEditTime: 2019-08-20 16:38:12
 * @LastEditors: Please set LastEditors
 */
import Vue from 'vue'
import axios from 'axios'
//import conf from '../common/config'

const whiteList = [];

/* eslint-disable */
export default ({ app, redirect, res, store, isDev }) => {
    let axiosInstance = axios.create({
        baseURL: _getBaseUrl()
    })

    axiosInstance.interceptors.request.use(config => {
        config = _mockConfig(config);
        if (!isDev && process.server) {
            // 直接连 php 端口，要去掉 /i/
            console.log('requrl--config2', config);
            config.url = config.url.replace('/i/', '/');
            if (process.env.runtime === 'dev') {
                config.url = config.url.replace('http://0.0.0.0:9000/o/', process.env.baseUrl + '/o/');
            } else {
                config.url = config.url.replace('http://0.0.0.0:8080/o/', process.env.baseUrl + '/o/');
            }
        }
        // _logReq(config)
        return config
    })

    axiosInstance.interceptors.response.use(response => {
        if (process.client) {
            return _clientResHandle(response)
        } else {
            return _serverResHandler(response, store, res);
        }
    }, _responseErrorHanlder)

    // response handler for client
    function _clientResHandle (response) {
        const res = response.data;
        if (!res || (!res.error_code && res.error_code !== 0)) {
            _toast(`获取信息失败 [EMPTY_RES]`); // 如果未返回有效格式信息
        } else if (String(res.error_code) === '10002') {
            redirect('/login');
        } else if (String(res.error_code) === '10005') {
            redirect('/setting/wechatauth')
        } else if (String(res.error_code) !== '0' && whiteList.indexOf(String(res.error_code)) === -1 /* 透传 error_code 白名单中的 response */) {
            const eMsg = res.error_msg || '获取信息失败 [ECODE_NOT_0]';
            _toast(`${eMsg}(${res.error_code})`);
        } else {
            return response;
        }
        // for catch use
        // note: 这里的 reject 不会传递给 _responseErrorHanlder，会直接 reject 给当前实例的 .catch
        return Promise.reject(new Error(res.error_msg || '获取信息失败'));
    }

    // response handler for server
    function _serverResHandler (response, store) {
        _logRes(response)
        const res = response.data;
        if (!res || (!res.error_code && res.error_code !== 0)) {
            _commitError('获取信息失败 [SERVER:EMPTY_RES]');
        } else if (String(res.error_code) === '10002') {
            redirect('/login');
        } else if (String(res.error_code) === '10005') {
            redirect('/setting/wechatauth')
        } else if (String(res.error_code) !== '0' && whiteList.indexOf(String(res.error_code)) === -1 /* 透传 error_code 白名单中的 response */) {
            const eMsg = res.error_msg + ' [SERVER]' || '获取信息失败 [SERVER:ECODE_NOT_0]';
            _commitError(eMsg, res.error_code);
        } else {
            return response;
        }

        // for catch use
        // note: 这里的 reject 不会传递给 _responseErrorHanlder，会直接 reject 给当前实例的 .catch
        const error = new Error(res.error_msg + ' [SERVER]' || '获取信息失败[SERVER]');
        return Promise.reject(error);
    }

    function _responseErrorHanlder (error) {
        if (process.client) {
            _toast('接口错误 [NOT_200]');
        } else {
            if (!store.state.fetchError.isError) {
                // 如果不是 serverResHandler 阶段捕获的错误，需要再给个错误信息，这是 200 之外的错误
                _commitError('接口错误 [SERVER:NOT_200]')
            }
        }
        return Promise.reject(error);
    }

    function _mockConfig (config) {
        if (!isDev) { return config };
        const target = conf.mockList.find(api => config.url.indexOf(api) !== -1)
        if (target) {
            // 通过 nuxt.config.js => proxy 规则转发
            config.url = config.baseURL + '/mock' + target;
        }
        return config
    }

    function _commitError (eMsg, eCode) {
        store.commit('SET_FETCH_ERROR', Object.assign({}, { isError: true, error_code: eCode, error_msg: eMsg }));
    }

    function _toast (message) {
        Vue.prototype.$message({
            message: message,
            type: 'error'
        })
    }

    function _getBaseUrl () {
        let res;
        if (!isDev && process.server) {
            // dev php 端口是 9000，prod 和 qa 环境都是 8080
            if (process.env.runtime === 'dev') {
                res = 'http://114.215.16.208:9000';
            } else {
                res = 'http://0.0.0.0:9000';
            }
        } else {
            //res = process.env.baseUrl;
            res = '';
        }
        return res;
    }

    /* 打印 http 日志，debug 用 */
    function _logRes (response) {
        console.log('\n')
        console.log(`[AXIOS]-[RESPONSE] [${response.status}] [${response.statusText}] [${response.config.method}] [${response.config.url}] ${new Date()}`);
        console.log('request-params \n', response.config.params);
        console.log('request-send-data \n', response.config.data);
        console.log('request-headers \n', response.config.headers);
        console.log('response-data \n', response.data);
    }

    /* 打印 http 日志，debug 用 */
    function _logReq (config) {
        console.log('\n')
        console.log('[AXIOS]-[REQUEST]')
        console.log('headers', config.headers)
        console.log('baseURL', config.baseURL)
        console.log('method', config.method)
        console.log('url', config.url)
    }

    Vue.prototype.$http = app.$http = axiosInstance;
    app.$get = axiosInstance.get;
    app.$post = axiosInstance.post;
}
