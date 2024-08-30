import axios from 'axios';
import qs from 'qs';
import { useUserStore } from '../store/user';
import { ElMessageBox, ElMessage } from 'element-plus';

// 未登录或者token过期导致请求失败的接口在弹窗登录中登录成功后重新发起请求
let failRequest = [];

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  // timeout: 10000 // request timeout
  timeout: 60000 // request timeout
});

service.defaults.headers['Content-Type'] = 'application/json';
service.defaults.headers['channel'] = 'pc';

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    // 如果是formData提交格式的，将data转为formData格式
    if (
      config.headers['Content-Type'] &&
      config.headers['Content-Type']
        .toLowerCase()
        .indexOf('application/x-www-form-urlencoded') > -1
    ) {
      config.data = qs.stringify(config.data);
    }

    const userStore = useUserStore();
    const token = userStore.getToken();

    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.error(error); // for debug
    return Promise.reject(error);
  }
);

let unloginShow = false; // 登录过期提示弹窗显示状态

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    return new Promise((resolve, reject) => {
      const res = response.data;
      const headers = response.headers;
      if (
        headers['content-type'] === 'application/msexcel;charset=UTF-8' ||
        headers['content-type'] === 'application/msword;charset=UTF-8' ||
        headers['content-type'] === 'application/octet-stream;charset=UTF-8' ||
        headers['content-type'] === 'application/octet-stream;charset=utf-8' ||
        headers['content-type'] === 'multipart/form-data;charset=utf-8'
      ) {
        resolve(response);
      } else if (res.success === true && res.code === '0000') {
        // 成功
        resolve(res);
      } else {
        if (res.code === '0005' || res.code === '1003') {
          const userStore = useUserStore();
          userStore.setToken(null);

          // 记录因token过期导致请求失败的接口
          failRequest.push({
            request: {
              url: response.config.url,
              data: response.config.data,
              method: response.config.method,
              headers: response.config.headers
            },
            resolve,
            reject
          });

          if (unloginShow) return; // 未登录弹窗同时只显示1次
          unloginShow = true;
          ElMessageBox.prompt('登录过期，请输入密码重新登录', '提示', {
            confirmButtonText: '登录',
            cancelButtonText: '取消',
            inputType: 'password'
          })
            .then(({ value }) => {
              const username = userStore.getUserName();
              userStore
                .reLogin({ username, password: value })
                .then(() => {
                  ElMessage({
                    type: 'success',
                    message: `登录成功`
                  });
                  // 重新对未登录导致的失败的接口发起请求
                  if (failRequest.length > 0) {
                    Promise.all(
                      failRequest.map((item) => service(item.request))
                    )
                      .then((resList) => {
                        resList.forEach((res, index) => {
                          failRequest[index].resolve(res);
                        });
                      })
                      .catch(() => {
                        // 只要其中一个失败了就全部失败
                        failRequest.forEach((item) => {
                          item.reject();
                        });
                      })
                      .finally(() => {
                        failRequest = [];
                      });
                  }
                })
                .catch(() => {
                  reject(res);
                });
            })
            .catch(() => {
              // 取消登录
              reject(res);
              failRequest = [];
            })
            .finally(() => {
              unloginShow = false;
            });
        }
        // else if (res.errno === 403) {
        //   ElMessage({
        //     type: 'error',
        //     message: `无访问权限`
        //   })
        // }
        else {
          // 如果是blob类型
          if (response.config.responseType == 'blob' && res) {
            // 将res转换成json
            let reader = new FileReader();
            reader.readAsText(res, 'utf-8');
            reader.addEventListener('load', function () {
              let resJson = JSON.parse(reader.result);
              ElMessage({
                type: 'error',
                grouping: true, // 相同内容只显示一次
                message: resJson.message || '出现错误'
              });
              reject(resJson);
              // 移除reader
            });
          } else {
            ElMessage({
              type: 'error',
              grouping: true, // 相同内容只显示一次
              message: res.message || '出现错误'
            });
            reject(res);
          }
        }
      }
    });
  },
  (error) => {
    console.error('err' + error); // for debug
    ElMessage({
      message:
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message,
      type: 'error',
      grouping: true, // 相同内容只显示一次
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
