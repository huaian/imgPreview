const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
const jsonGeneratedRouter = require('./data/index')
// const router = jsonServer.router(path.join(__dirname, 'test.json'))
const router = jsonServer.router(jsonGeneratedRouter)
const middlewares = jsonServer.defaults()
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.json(req.query)
})
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
// 解决请求参数不一致问题
/**
 * @description 1. 分页参数 offset, limit ->  _limit=1&_start=0
 */
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // 1. 分页参数 offset, limit ->  _limit=1&_start=0
  if (req.method === 'GET') {
    console.log(req.query)
    if (req.query.offset) {
      req.query._start = req.query.offset // offset -> _start
    } 
    if (req.query.limit) {
      req.query._limit = req.query.limit // limit -> _limit
    }
  }
  // Continue to JSON Server router
  next()
})
// Add this before server.use(router)
server.use(jsonServer.rewriter({
  // '/api/*': '/$1',
  // '/blog/:resource/:id/show': '/:resource/:id'
}))
// Use default router
server.use(router)
// In this example, returned resources will be wrapped in a body property
router.render = (req, res) => {
  // console.log(res.locals)
  res.json({ // 包裹元素到body的bo中
    code: {
      code: '0000',
      message: '请求成功'
    },
    bo: res.locals.data
  })
}
// 分页

// server.use('/api', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})