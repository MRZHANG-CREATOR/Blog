const bcrypt = require('bcrypt')
const {
    User
} = require('../../model/user')
module.exports = async ctx => {
    const {
        username,
        email,
        password,
        role,
        state
    } = ctx.request.body;
    const id = ctx.query.id;
    let user = await User.findOne({
        _id: id
    })
    let isValid = await bcrypt.compare(password, user.password) //
    if (isValid) {
        await User.updateOne({
            _id: id
        }, {
            username: username,
            email: email,
            role: role,
            state: state
        })
        await ctx.redirect('/admin/user')
    } else {
        await ctx.render('admin/user-edit', {
            message: "err:密码错误",
            userEdit: ctx.request.body,
            link: "/admin/user-modify?id=" + id,
            button: "Modification"
        })
    }
}