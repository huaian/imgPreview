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

let sortTree = ({data}) => {
  return data.sort(comparator({computor, pred}))
}

describe('测试排序', () => {
  it('纯数字', () => { //
    expect(sortTree({
      data: [{title: '012'}, {title: '123'}, {title: '345'}]
    })[0].title === '012').toEqual(true) //
  })
  it('纯字母', () => { //
    expect(sortTree({
      data: [{title: 'd'}, {title: 'b'}, {title: 'c'}]
    })[0].title === 'b').toEqual(true) //
  })
  it('大小写字母', () => { // 
    expect(sortTree({
      data: [{title: 'A'}, {title: 'a'}, {title: 'B'}]
    })[0].title === 'a').toEqual(true) //
  })
  it('汉字', () => { // 
    expect(sortTree({
      data: [{title: '赵'}, {title: '钱'}]
    })[0].title === '钱').toEqual(true) //
  })
})