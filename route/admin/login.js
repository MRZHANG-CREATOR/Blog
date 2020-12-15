const bcrypt = require('bcrypt')
const session = require('koa-session')
const {
    User
} = require('../../model/user')
module.exports = async (ctx, next) => {
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
            ctx.session.user = user
            ctx.redirect('/admin/user') //重定向到user页面
        } else {
            ctx.body = "<h1>Password error</h1>"
        }
    } else {
        ctx.res.writeHead(400)
        ctx.body = "<h1>Username inexistence or password error</h1>"
    }
}