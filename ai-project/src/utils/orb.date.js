const vDate = {};

// 时间格式
vDate.add0 = function (m) {
  return m < 10 ? '0' + m : m;
};

// vDate.parse = function (time, cFormat) {
//   if (arguments.length === 0) {
//     return null;
//   }
//   const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
//   let date;
//   if (typeof time === 'object') {
//     date = time;
//   } else {
//     if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
//       time = parseInt(time);
//     }
//     if ((typeof time === 'number') && (time.toString().length === 10)) {
//       time = time * 1000;
//     }
//     date = new Date(time);
//   }
//   const formatObj = {
//     y: date.getFullYear(),
//     m: date.getMonth() + 1,
//     d: date.getDate(),
//     h: date.getHours(),
//     i: date.getMinutes(),
//     s: date.getSeconds(),
//     a: date.getDay()
//   };
//   const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
//     let value = formatObj[key];
//     // Note: getDay() returns 0 on Sunday
//     if (key === 'a') {
//       return ['日', '一', '二', '三', '四', '五', '六'][value ];
//     }
//     if (result.length > 0 && value < 10) {
//       value = '0' + value;
//     }
//     return value || 0;
//   });
//   console.log(timeStr);
//   return timeStr;
// };

vDate.format = function (timestamp, type) {
  if (timestamp === '' || timestamp === null || timestamp === undefined) {
    return '';
  }
  // timestamp是整数，否则要parseInt转换,不会出现少个0的情况
  const time = new Date(timestamp);
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  if (type.toLowerCase() === 'date'.toLowerCase()) {
    return year + '-' + vDate.add0(month) + '-' + vDate.add0(date);
  }
  if (type.toLowerCase() === 'dateTime'.toLowerCase()) {
    return (
      year +
      '-' +
      vDate.add0(month) +
      '-' +
      vDate.add0(date) +
      ' ' +
      vDate.add0(hours) +
      ':' +
      vDate.add0(minutes) +
      ':' +
      vDate.add0(seconds)
    );
  }
  if (type.toLowerCase() === 'time'.toLowerCase()) {
    return (
      vDate.add0(hours) + ':' + vDate.add0(minutes) + ':' + vDate.add0(seconds)
    );
  }
  // 按照日期模板生成
  let str = type;
  str = str.replace(/yyyy/g, year);
  str = str.replace(/MM/g, vDate.add0(month));
  str = str.replace(/dd/g, vDate.add0(date));
  str = str.replace(/HH/g, vDate.add0(hours));
  str = str.replace(/mm/g, vDate.add0(minutes));
  str = str.replace(/ss/g, vDate.add0(seconds));
  return str;
};

vDate.desc = function (timestamp) {
  if (timestamp === '' || timestamp === null || timestamp === undefined) {
    return '';
  }
  let r;

  const time = new Date(timestamp);
  const currTime = new Date();
  const result = Math.abs(currTime.getTime() - time.getTime());
  let seconds;
  if (result < 60000) {
    // 一分钟内
    seconds = parseInt(result / 1000);
    if (seconds === 0) {
      r = '刚刚';
    } else {
      r = seconds + '秒前';
    }
  } else if (result >= 60000 && result < 3600000) {
    // 一小时内
    seconds = parseInt(result / 60000);
    r = seconds + '分钟前';
  } else if (result >= 3600000 && result < 86400000) {
    // 一天内
    seconds = parseInt(result / 3600000);
    r = seconds + '小时前';
  } else if (result >= 86400000 && result < 1702967296) {
    // 三十天内
    seconds = parseInt(result / 86400000);
    r = seconds + '天前';
  } else {
    // 日期格式
    r = vDate.format(timestamp, 'date');
  }
  return r;
};

export default vDate;
