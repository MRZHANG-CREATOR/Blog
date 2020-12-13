const Joi = require('joi')
module.exports = async (ctx, next) => {
    // console.log(ctx.request.body)
    const content = ctx.request.body
    const schema = Joi.object({
        username: Joi.string().min(2).max(12).required().error(new Error('username format err')),
        email: Joi.string().email().required().error(new Error('这出错啦')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().required().error(new Error('这出错啦')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('这出错啦')),
        state: Joi.number().valid(0, 1).required().error(new Error('这出错啦')),
    })
    try {
        await schema.validate(content)
        // console.log('pass')
    } catch (e) {
        console.log('err')
        // ctx.redirect(`/admin/user-edit?message=${e.message}`)
        ctx.body = e
    }

}