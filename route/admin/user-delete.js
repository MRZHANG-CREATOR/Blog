const {
    User
} = require('../../model/user')

module.exports = async (ctx, next) => {

    let id = ctx.query.id
    await User.findOneAndDelete({
        _id: id
    })
    ctx.redirect('/admin/user')
}