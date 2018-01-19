let comparator = ({pred, computor}) => {
  return (a, b) => {
    a = computor(a)
    b = computor(b)
    if (pred(a, b)) {
      return -1
    } else if (pred(b, a)) {
      return 1
    } else {
      return 0
    }
  }
}
let computor = (a) => {
  return a['title']
}
/// char type compare
let type = (charValue) => {
  if (/[0-9]/.test(charValue)) {
    return 1
  } else if (/[a-z]/.test(charValue)) {
    return 2
  } else if (/[A-Z]/.test(charValue)) {
    return 4 
  }  else if (isChinese(charValue)) {
    return 8
  } else {
    return 16
  }
}
// should a before b?
let pred = (a, b) => {
  let typeA = type(a)
  let typeB = type(b)
  if (typeA === typeB) {
    if (a < b) {
      return true
    } else if (a > b) {
      return false
    } else {
      return true
    }
  } else {
    return pred(typeA, typeB)
  }
}

let sortTree = ({treeData}) => {
  return treeData.sort(comparator({computor, pred}))
}

describe('测试排序', () => {
  it('纯数字', () => { // 供异步调用
    expect(sortTree()).toEqual(true) // 检查单引号
  })
  it('双引号', () => { // 供异步调用
    expect(transformToUrl(contentBodyWithColonSmall).indexOf('small') >= 0).toEqual(true) // 检查双引号
  })
  it('jpg', () => { // 供异步调用
    expect(transformToUrl(contentBodyWithPng).indexOf('small') >= 0).toEqual(true) // 检查双引号
  })
  it('gif', () => { // 供异步调用
    expect(transformToUrl(contentBodyWithGif).indexOf('small') >= 0).toEqual(true) // 检查双引号
  })
})