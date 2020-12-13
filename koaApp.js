const Koa = require('koa')
const app = new Koa();
const Router = require('koa-router')
const router = new Router()
const static = require('koa-static-cache')
const KoaBody = require('koa-body')
const bcrypt = require('bcrypt') //哈希算法密码加密模块 依赖Python  node-gyp  windows-build-tools  注意安装
const session = require('koa-session') //return way
const nunjucks = require('koa-nunjucks-2')
require('./model/connect')
const {
    User
} = require('./model/user')
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
    ext: "html",
    path: __dirname + '/views/admin',
    nunjucksConfig: {
        trimBlocks: true
    }
}))
app.use(static('./public', {
    prefix: "/public",
    dynamic: true,
    gzip: true
}))
app.use(require('./middleware/loginGuard')) //登录拦截中间件
router.get('/admin/login', (ctx, next) => {
    ctx.render('login')
})
router.post('/admin/login', KoaBody(), async (ctx, next) => {
    const {
        email,
        password
    } = ctx.request.body;
    let user = await User.findOne({
        email
    }) //find success  return object
    if (user) {
        let pwdRight = await bcrypt.compare(password, user.password) //密码比对
        if (pwdRight) {
            // console.log('user exist')
            ctx.session.user = user
            ctx.redirect('/admin/user') //重定向到user页面
            // console.log('rediret sucess')
        } else {
            ctx.body = "<h1>Password error</h1>"
        }
    } else {
        ctx.res.writeHead(400)
        ctx.body = "<h1>Username inexistence or password error</h1>"
    }
})
app.use(async (ctx, next) => { //公共资源分发中间件
    ctx.state.userInfo = ctx.session.user
    await next()
})
router.get('/admin/user', KoaBody(), require('./route/admin/user')) //user router
router.get('/admin/user-edit', require('./route/admin/user-edit')) //user-edit router
router.post('/admin/user-edit-fn', koaBody(), require('./route/admin/user-edit-fn')) //user-edit router

app.use(router.routes())
app.listen(8000, (0, 0, 0, 0), (req, res) => {
    console.log('http://localhost:8000')
})