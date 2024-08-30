import { CodeToText } from 'element-china-area-data';
import { stringEncode as encode } from '../utils/orb.descode';

/**
 * 获取类型
 * @param {Any} obj 需要获取类型的值
 * @returns
 */
export function typeOf(obj) {
  const toString = Object.prototype.toString;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
}

/**
 * 字符串加密
 */
const stringEncodeKey = '3y8yPzAOxnQSSPaTlaiy0g==';

export function stringEncode(_string) {
  return encode(_string, stringEncodeKey);
}

/**
 * 深拷贝
 * @param {Any} data 需要深拷贝的值
 */
export function deepCopy(data) {
  const type = typeOf(data);
  let obj;
  if (type === 'object') {
    obj = {};
  } else if (type === 'array') {
    obj = [];
  } else {
    return data;
  }

  if (type === 'object') {
    Object.keys(data).forEach((key) => {
      obj[key] = deepCopy(data[key]);
    });
  } else {
    data.forEach((item) => {
      obj.push(deepCopy(item));
    });
  }
  return obj;
}

/**
 * 修改浏览器tab栏图标
 * @param {*} link
 */
export function changeFavicon(link) {
  let favicon = document.querySelector('link[rel="icon"]');
  if (favicon !== null) {
    favicon.href = link;
  } else {
    favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = link;
    document.head.appendChild(favicon);
  }
}

/**
 * 向body中添加属性
 * @param {*} key
 * @param {*} value
 */
export function setPropertyToBody(key, value) {
  document.body.style.setProperty(key, value);
}

/**
 * 下载blob文件
 * @param {*} blobFile blob文件
 * @param {*} fileName 文件名称
 */
export function downloadBlobToFile(fileName, blobFile, type) {
  const link = document.createElement('a');
  link.style.display = 'none';
  const blob = new Blob([blobFile], { type: type || blobFile.type });
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

/**
 * url转blob
 * @param {*} url 需要转成成blob文件的url网址
 * @returns
 */
export function urlToBlob(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.blob())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * 城市代码转为文字
 * @param {*}
 * @returns
 */
export function getCodeToText(codeStr, codeArray) {
  if (null === codeStr && null === codeArray) {
    return null;
  } else if (null === codeArray) {
    codeArray = codeStr.split(',');
  }
  let area = '';
  if (codeArray.length && codeArray[0] !== 'undefined') {
    switch (codeArray.length) {
      case 1:
        area += CodeToText[codeArray[0]];
        break;
      case 2:
        area += CodeToText[codeArray[0]] + '/' + CodeToText[codeArray[1]];
        break;
      case 3:
        area +=
          CodeToText[codeArray[0]] +
          CodeToText[codeArray[1]] +
          CodeToText[codeArray[2]];
        break;
      default:
        break;
    }
  }

  return area;
}

/**
 * 数字金额转大写
 * @param {*} 传入数字金额
 * @returns  返回大写的金额
 */
export function convertCurrency(money) {
  //汉字的数字
  const cnNums = new Array(
    '零',
    '壹',
    '贰',
    '叁',
    '肆',
    '伍',
    '陆',
    '柒',
    '捌',
    '玖'
  );
  //基本单位
  let cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  let cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  let cnDecUnits = new Array('角', '分', '毫', '厘');
  //整数金额时后面跟的字符
  let cnInteger = '整';
  //整型完以后的单位
  let cnIntLast = '元';
  //最大处理的数字
  let maxNum = 999999999999999.9999;
  //金额整数部分
  let integerNum;
  //金额小数部分
  let decimalNum;
  //输出的中文金额字符串
  let chineseStr = '';
  //分离金额后用的数组，预定义
  let parts;
  // 传入的参数为空情况
  if (money == '') {
    return '';
  }
  money = parseFloat(money);
  if (money >= maxNum) {
    return '';
  }
  // 传入的参数为0情况
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转为字符串
  money = money.toString();
  // indexOf 检测某字符在字符串中首次出现的位置 返回索引值（从0 开始） -1 代表无
  if (money.indexOf('.') == -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  //转换整数部分
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    // 最后+ 元
    chineseStr += cnIntLast;
  }
  // 转换小数部分
  if (decimalNum != '') {
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }

  return chineseStr;
}
/**
 * @description 格式化金额
 * @param {String | Number} amount - 金额
 * @param {Number} decimalDigits - 保留的小数位数
 * @return {String}
 */
export function formatAmount(amount, decimalDigits = 2, type) {
  const amountStr = String(Number(amount).toFixed(decimalDigits));
  if (type) {
    //不需要千分位
    return amountStr;
  }
  const reg = /\B(?=(?:\d{3})+$)/g;
  // 是否是小数
  const isDecimal = amountStr.indexOf('.') > -1;
  if (isDecimal) {
    // 整数部分
    const integerPart = amountStr.substring(0, amountStr.indexOf('.'));
    // 小数部分
    const decimalPart = amountStr.substring(
      amountStr.length,
      amountStr.indexOf('.')
    );
    return `${integerPart.replace(reg, ',')}${decimalPart}`;
  } else {
    return amountStr.replace(reg, ',');
  }
}
