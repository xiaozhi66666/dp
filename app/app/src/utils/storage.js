// 约定一个通用的键名
const INFO_KEY = 'user_info'
const TOKEN_KEY = 'token'

// 获取个人信息
export const getInfo = () => {
  const defaultObj = { stuId: '',stuName: ''}
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultObj
}

// 获取token
export const gettoken = () => {
  const result = localStorage.getItem(TOKEN_KEY)
  return result ? JSON.parse(result) : 0;
}

// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

// 设置token
export const settoken = (payload) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(payload))
}

// // 移除个人信息
// export const removeInfo = () => {
//   localStorage.removeItem(INFO_KEY)
// }
