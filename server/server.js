const Koa = require('koa')
const logger = require('koa-logger')
const koaBody = require('koa-body')
const session = require('koa-session')
const static = require('koa-static')
const router = require('./config/routes')
const path = require('path')

const app = new Koa()
// logger
app.use(logger())
// koa body
app.use(koaBody())
// session
app.keys = ['this is my secret and fuck you all'] // 我理解为一个加密的钥匙，类似一个token
app.use(session({
  key: 'uid', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true /** (boolean) signed or not (default true) */
}, app))
// router
app.use(router.routes())

const isDev = process.env.NODE_ENV === 'development'
if (!isDev) {
  // --->production
  // 所有 /public 的url 请求的都是静态文件， 这里用到的就是 webpack的 output中的 publicPath属性
  app.use(static(path.join(__dirname, '../dist')))
  // app.get('*', function (request, response) {
  //   response.sendFile(path.resolve(__dirname, '../dist', 'index.html'))
  // })
}

app.listen('8888')
