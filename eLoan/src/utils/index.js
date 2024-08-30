let utils = {
  // 跳转富文本
  toRichText(title, content) {
    uni.setStorageSync('richText', {
      title,
      content
    });
    uni.navigateTo({
      url: '/pages/rich-text/index'
    });
  },
  /**
   * 将数字转换成金额
   * @param {*} value
   * @param {*} fixed
   * @returns
   */
  parseToMoney(value, fixed = 2) {
    if (value === undefined || value === null) {
      return 0;
    }
    return !!fixed
      ? Number(Number(value).toFixed(fixed)).toLocaleString()
      : Number(value).toLocaleString();
  },
  /**
   * 给传入的字符串每隔length位添加空格，不足length位不添加，例如字符串str是"123456",length=4，则返回"1234 56"
   * @param {*} str
   * @param {*} length
   */
  addBlankToString(str, length) {
    return str
      ? str
          .split('')
          .map((item, index) =>
            index && index % length === 0 ? ` ${item}` : item
          )
          .join('')
      : '';
  }
};

export default utils;
