const Koa = require('koa')
const app = new Koa();
const Router = require('koa-router')
const router = new Router()
const static = require('koa-static-cache')
const KoaBody = require('koa-body')
const KoaParser = require('koa-bodyparser')
const bcrypt = require('bcrypt') //哈希算法密码加密模块 依赖Python  node-gyp  windows-build-tools  注意安装
const session = require('koa-session') //return way
const nunjucks = require('koa-nunjucks-2') //模板引擎
const dateFormat = require('dateformat') //日期格式修改模块
const morgan = require('koa-morgan') //引入morgan模块
const config = require('config')
require('./model/connect') //mongoose
app.use(KoaParser())
const fs = require('fs');
const koaBody = require('koa-body');
app.keys = ['zhangpipi'];
const CONFIG = { //session options
    key: 'zhanghuanhuan',
    /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true,
    /** (boolean) automatically commit headers (default true) */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false,
    /** (boolean) secure cookie*/
    sameSite: null,
    /** (string) session cookie sameSite options (default null, don't set it) */
};
app.use(session(CONFIG, app));
app.use(nunjucks({
    ext: "njk",
    path: __dirname + '/views',
    nunjucksConfig: {
        trimBlocks: true
    }
}))
app.use(static('./public', {
    prefix: "/public",
    dynamic: true,
    gzip: true
}))
router.get('/admin/login', async (ctx) => {
    await ctx.render('admin/login');
})
app.use(require('./middleware/loginGuard')) //登录拦截中间件
router.get("/home", KoaBody(), require('./route/home/home'))
router.get("/article", require('./route/home/article'))
router.get('/favicon.ico', async ctx => {
    ctx.body = ""
})
router.get('/admin/loginout', require('./route/admin/loginout'))
router.post('/admin/login', require('./route/admin/login'))
app.use(async (ctx, next) => { //公共资源分发中间件
    ctx.state.userInfo = ctx.session.user
    ctx.state.dateFormat = dateFormat
    await next()
})
// console.log(config.get('title'))
//获取系统环境变量 返回值是对象
// console.log(process.env)
if (process.env.NODE_ENV == 'development') {
    console.log('开发环境')
    app.use(morgan())
} else {
    console.log('生产环境')
}
router.get('/admin/user', KoaBody(), require('./route/admin/userPage')) //user router
router.get('/admin/user-edit', require('./route/admin/user-edit')) //user-edit router
router.post('/admin/user-edit', require('./route/admin/user-edit-fn')) //user-edit  post router
router.post('/admin/user-modify', require('./route/admin/modify')) //user-modify router
router.get('/admin/delete', require('./route/admin/user-delete')) //delete router
router.get('/admin/article', require('./route/admin/article')) //article router
router.get('/admin/article-edit', require('./route/admin/article-edit')) //aricle-edit router
router.post('/admin/article-add', require('./route/admin/article-add')) //article-add  post router
router.post('/home/comment', require('./route/home/comment')) //comment  post router   post 不能加koabody()了
app.use(router.routes())
app.listen(8000, (0, 0, 0, 0), (req, res) => {
    console.log('http://localhost:8000')
})