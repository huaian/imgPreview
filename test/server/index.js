// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const path = require('path')
// const router = jsonServer.router('test.json')
const jsonGeneratedRouter = require('./test')
// const router = jsonServer.router(path.join(__dirname, 'test.json'))
const router = jsonServer.router(jsonGeneratedRouter)
const middlewares = jsonServer.defaults()
 
// server.use(middlewares)
// server.use(router)
// server.listen(3000, () => {
//   console.log('JSON Server is running')
// })

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)
// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.json(req.query)
})
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
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
  res.json({
    code: {
      code: '0000',
      message: '请求成功'
    },
    body: res.locals.data
  })
}
// server.use('/api', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})