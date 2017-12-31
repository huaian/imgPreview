import {isCompatibleBrowser} from '@/Utils/browser' 
import _ from "lodash"
let Chrome62UserAgent = 'chrome62' // TODO
let Chrome61UserAgent = '' // TODO
let IE8UserAgent = '' // TODO
let IE9UserAgent = '' // TODO
let IE10UserAgent = '' // TODO
let IE11UserAgent = 'IE11' // TODO
let FirefoxUserAgent = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:57.0) Gecko/20100101 Firefox/57.0"
describe('browser utils', () => {
  it('检查IE11允许', () => { // 供异步调用
    expect(isCompatibleBrowser( {userAgent: IE11UserAgent})).toEqual(true) // 检查state状态
  })
  it('检查chrome62以上版本可以', () => { // 供异步调用
    expect(isCompatibleBrowser({
      userAgent: Chrome62UserAgent
    })).toEqual(true) // 检查state状态
  })
  it('检查IE11以下IE浏览器', () => { // 供异步调用
    expect(isCompatibleBrowser({
      userAgent: IE8UserAgent 
    })).toEqual(false) // 检查state状态
    expect(isCompatibleBrowser({
      userAgent: IE9UserAgent 
    })).toEqual(false) // 检查state状态
    expect(isCompatibleBrowser({
      userAgent: IE10UserAgent 
    })).toEqual(false) // 检查state状态
  })
  it('检查Chrome62以下chrome浏览器', () => { // 供异步调用
    expect(isCompatibleBrowser({
      userAgent: Chrome61UserAgent
    })).toEqual(false) // 检查state状态
  })
  it('检查非IE和非Chrome浏览器', () => { // 供异步调用
    expect(isCompatibleBrowser({
      userAgent: FirefoxUserAgent
    })).toEqual(false) // 检查state状态
  })
})