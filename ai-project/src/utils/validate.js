/**
 * 校验数字长度，接收两个参数，总长度和小数位长度，计算的时候不包括小数点
 */
export function checkNumberLength(number, numLength, decimalDigits = 2) {
  if (!!number) {
    const _numberString = number.toString();
    if (_numberString.indexOf('.') > -1) {
      if (_numberString.replace('.', '').length <= numLength) {
        return _numberString.split('.')[1].length <= decimalDigits;
      } else {
        return false;
      }
    } else {
      return _numberString.length <= numLength;
    }
  } else {
    return true;
  }
}
