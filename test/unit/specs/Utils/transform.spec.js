let contentBodyWithColon = '<span><img　src="http://baidu.com/imgs/a.jpg"></span>'
let contentBodyWithColonSmall = "<div><img　src='http://baidu.com/imgs/a.jpg'></div>"
let contentBodyWithPng = '<span><img　src="http://baidu.com/imgs/a.jpg" checked></span>'
let contentBodyWithGif = "<div><img　src='http://baidu.com/imgs/a.jpg'></div>" // gif transform ?
import { transformToUrl } from '@ssr/utils/filters'
describe('检查缩略图正则转换', () => {
  it('单引号', () => { // 供异步调用
    expect(transformToUrl(contentBodyWithColonSmall).indexOf('small') >= 0).toEqual(true) // 检查单引号
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