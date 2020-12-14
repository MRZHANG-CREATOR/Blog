const Joi = require('joi')
const bcrypt = require('bcrypt') //哈希算法密码加密模块 依赖Python  node-gyp  windows-build-tools  注意安装
const {
    User,
    validateUser
} = require('../../model/user')
module.exports = async (ctx, next) => {
    let content = ctx.request.body
    const value = validateUser(content) //user data verify module 
    if (value.error) {
        let err = value.error
        ctx.redirect(`/admin/user-edit?message=${err}`) //为什么传过去的参数总是多出20% ??
    } else {
        let userExist = await User.findOne({
            email: content.email
        }) //return object
        if (userExist) {
            return ctx.redirect(`/admin/user-edit?message=邮箱已被注册`) //  错误处理中间件？？？
        } else { //allow add   start encrypt it
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(content.password, salt)
            content.password = password
            await User.create(content)
            ctx.redirect('/admin/user')
        }
    }
}