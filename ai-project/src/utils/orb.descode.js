import CryptoJS from 'crypto-js'

const options = {
  mode: CryptoJS.mode.ECB,
  padding: CryptoJS.pad.Pkcs7
}

export function stringEncode(word, keyStr) {
  if (word == null) {
    console.error('传入参数不能为空')
    return ''
  }

  keyStr = keyStr || 'dSp4IMlwpr5Sbou8fY2Y1A=='

  const key = CryptoJS.enc.Base64.parse(keyStr)
  const encryptedData = CryptoJS.AES.encrypt(word, key, options)
  return encryptedData.toString()
}

// 解密
export function stringDecode(word, keyStr) {
  keyStr = keyStr || 'dSp4IMlwpr5Sbou8fY2Y1A=='

  if (word == null) {
    console.error('传入参数不能为空')
    return null
  }

  const key = CryptoJS.enc.Base64.parse(keyStr)
  const decryptedData = CryptoJS.AES.decrypt(word, key, options)

  // 解密后，需要按照Utf8的方式将明文转位字符串
  const decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData).toString()
  return decryptedStr
}
