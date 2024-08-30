import dayjs from 'dayjs';
import store from '@/store/index.js';
import utils from '@/utils';
import { refreshToken, userLogin } from '@/api/login.js';

// 接口状态码
const responseCode = {
  /**
   * 请求成功
   */
  SUCCESS: {
    value: '0000',
    msg: '请求成功'
  },
  /**
   * 该接口需要在公众号中使用
   */
  FOLLOW_WX: {
    value: '1000',
    msg: '请在公众号中使用'
  },
  /**
   * token失效
   */
  TOKEN_INVAILD: {
    value: '9997',
    msg: '未登录或登录过期'
  },
  /**
   * 交易失败
   */
  DEAL_FAILD: {
    value: '1002',
    msg: '交易失败'
  },
  /**
   * 请求字段有误
   */
  FEILD_FAILD: {
    value: '1003',
    msg: '请求字段有误'
  },
  /**
   * 找不到对应记录
   */
  NOT_FIND: {
    value: '1004',
    msg: '找不到对应记录'
  },
  /**
   * 保存信息失败
   */
  SAVE_FAILD: {
    value: '1005',
    msg: '保存信息失败'
  },
  /**
   * 不具备商家身份
   */
  NOT_MCHT: {
    value: '5001',
    msg: '不具备商家身份'
  },
  /**
   * 参数异常
   */
  PARAM_FAILD: {
    value: '9998',
    msg: '参数异常'
  },
  /**
   * 系统异常
   */
  SYS_ERROR: {
    value: '9999',
    msg: '出错了~'
  }
};

// 用来控制是否同时显示多个错误弹窗
let errorModeShow = false;

// request方法req参数的默认数据格式
const defaultData = {
  url: '', // 请求接口地址
  data: {}, // 请求数据
  header: {}, // 请求头
  method: 'POST', // 请求方式
  timeout: 60000, // 超时时间
  showLoading: false, // 是否显示loading动画
  loadingText: '加载中...', // loading对应的提示文字
  loadingMask: true // loading弹窗是否有遮罩层
};

// 登录过期需要在刷新token成功重新出发的接口
let authFailUrlMap = {},
  refreshTokenFlag = false;

function request(req) {
  if (req.file) {
    return doUpload(req);
  } else {
    return doRequest(req);
  }
}
// 请求
function doRequest(req) {
  // 组装req的默认数据格式
  req = initReq(req);
  return new Promise((resolve, reject) => {
    // 创建请求数据
    // const requestData = {
    // 	bizContent: req.data,
    // 	sessionId: utils.uuid().replace(/-/g, ''),
    // 	trxTime: dayjs().format('YYYYMMDDHHmmss'),
    // 	versionNo: '1.0.0',
    // 	terminal: utils.getPlatform()
    // }
    // token
    const token = uni.getStorageSync('token');
    console.log('输出获取的token', token);
    // header
    const header = req.header || {};
    header.channel = 'h5';
    if (token) {
      header['Authorization'] = token;
    }
    // 判断是否需要显示loading(此处loading弹窗为uniapp自带的loading弹窗)
    if (req.showLoading) {
      uni.showLoading({
        title: req.loadingText,
        mask: req.loadingMask
      });
    }
    // 读取config
    const config = utils.getConfig();
    // if (config.appId) {
    // 	requestData.bizContent.appId = config.appId
    // }

    // console.log('输出requestData', requestData, config);

    // 发起请求
    uni.request({
      url: config.baseUrl + req.url,
      data: req.data,
      header,
      method: req.method,
      timeout: req.timeout,
      success: (res) => {
        const data = res.data;
        console.log(config.baseUrl + req.url + '请求参数', req.data);
        console.log(config.baseUrl + req.url + '请求结果', data);
        if (data.code === '0000') {
          resolve(data.data);
        } else {
          if (data.code === '0005' && req.url.indexOf('refreshToken') == -1) {
            // 只有登录接口才会
            if (!refreshTokenFlag) {
              const sn = uni.getStorageSync('sn');
              const mobile = uni.getStorageSync('mobile');
              refreshTokenFlag = true;
              refreshToken({
                sn,
                mobile
              })
                .then((res) => {
                  if (res.newToken) {
                    // 这里的newToken是三方的token 不是我们的
                    userLogin({
                      loginType: 'min',
                      sn,
                      mobile
                    })
                      .then((res) => {
                        uni.setStorageSync('userInfo', res);
                        uni.setStorageSync('token', res.token);
                        Object.keys(authFailUrlMap).forEach((key) => {
                          doRequest(authFailUrlMap[key].req)
                            .then((res) => {
                              authFailUrlMap[key].resolve(res);
                            })
                            .catch((err) => {
                              authFailUrlMap[key].reject(err);
                            });
                        });
                      })
                      .catch(() => {
                        Object.keys(authFailUrlMap).forEach((key) => {
                          authFailUrlMap[key].reject(authFailUrlMap[key].res);
                        });
                      });
                  }
                  if (res.loginUrl) {
                    window.location.href = `${res.loginUrl}${
                      res.loginUrl.indexOf('?') == -1 ? '?' : '&'
                    }schema=${encodeURIComponent(
                      `${window.location.origin}/#/pages/login/index?sn=${sn}&mobile={1}`
                    )}`;
                  }
                })
                .catch(() => {
                  // 更新失败 让之前的接口全部失败
                  Object.keys(authFailUrlMap).forEach((key) => {
                    authFailUrlMap[key].reject(authFailUrlMap[key].res);
                  });
                })
                .finally(() => {
                  // 不管成功失败 都清空map
                  authFailUrlMap = {};
                  // 刷新token状态改为false
                  refreshTokenFlag = false;
                });
            } else {
              authFailUrlMap[`${config.baseUrl + req.url}`] = {
                resolve,
                reject,
                res,
                req
              };
            }
            return;
          } else {
            if (req.showFail === false || data.code === '0005') {
              return;
            }
            console.log('执行else data', data);
            showErrorModal(data.message || '出错了~').then(() => {});
            reject(res);
          }
        }
      },
      fail: (error) => {
        showErrorModal('出错了~');
        reject(error);
        console.log('失败了', error);
      },
      complete: () => {
        if (req.showLoading) {
          uni.hideLoading();
        }
      }
    });
  });
}

// 文件上传
function doUpload(req) {
  return new Promise((resolve, reject) => {
    // token
    const token = uni.getStorageSync('token');
    // header
    const header = req.header || {};
    header.channel = 'mp';
    if (token) {
      header['Authorization'] = token;
    }
    let file = req.file;
    let promise = new Promise((resolve, reject) => {
      resolve(file);
    });
    // 需要压缩
    if (file.size / 1024 / 1024 > 5 && file.type.indexOf('image') != -1) {
      promise = utils.compressImage(file, 5 / (file.size / 1024 / 1024));
    }

    let requestData = {
      ...req.data
    };

    // 读取config
    const config = utils.getConfig();

    promise.then((res) => {
      file = res;
      console.log('文件上传开始', file, requestData);
      uni.uploadFile({
        url: config.fileUrl + (req.url || 'file/uploadTemp'),
        header,
        name: req.name || 'file',
        file,
        filePath: req.filePath,
        formData: requestData,
        success: (res) => {
          console.log('输出请求结果', res);
          try {
            if (res && res.data && res.statusCode == 200) {
              let data = JSON.parse(res.data);
              let code = data.code;
              console.log('data', data.data, code);
              if (code == '0000') {
                let result = data.data;
                if (!result.fileName) {
                  result.fileName = fileName;
                }
                resolve(result);
              } else {
                showErrorModal(data.message || '出错了~').then(() => {});
                reject(res);
              }
              reject();
            } else {
              console.log('执行else');
              uni.showModal({
                title: '提示',
                content: '出错啦：' + res.statusCode
              });
              reject(res);
            }
          } catch (e) {
            //TODO handle the exception
            reject(res);
            showErrorModal(
              res.statusCode == 502 ? '上传服务未启动' : '出现错误'
            );
          }
        },
        fail: (error) => {
          showErrorModal(
            error.errMsg == 'request:fail timeout' ? '连接超时' : '出现错误'
          );
          reject(error);
        },
        complete: () => {}
      });
    });
  });
}
// 组合data和defaultData
function initReq(data) {
  if (!data) {
    data = {};
  }
  data = {
    ...defaultData,
    ...data
  };
  return data;
}

function showErrorModal(msg) {
  return new Promise((resolve, reject) => {
    if (errorModeShow) return;
    errorModeShow = true;
    uni.showModal({
      title: '提示',
      content: msg,
      showCancel: false,
      success: (res) => {
        errorModeShow = false;
        if (res.confirm) {
          resolve();
        } else {
          reject();
        }
      }
    });
  });
}

export default request;
