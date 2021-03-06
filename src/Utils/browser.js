/**
 * @description 判断是否是兼容浏览器
 */
export const isCompatibleBrowser = ({
  userAgent
}) => {
  if (userAgent.indexOf('chrome62') >= 0) {
    return true
  } else if (userAgent.indexOf('IE11') >= 0) {
    return true
  } else {
    return false
  }
}

/**
 * @description 是否是外链
 */
export const isOuterLink = ({
  elementNode
}) => {
  return elementNode.href.indexOf('http') >= 0
}