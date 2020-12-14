const {
    User
} = require('../../model/user')
module.exports = async (ctx, next) => {
    const {
        message,
        id
    } = ctx.query
    if (id) {
        let userEdit = await User.findOne({
            _id: id
        })
        console.log(userEdit)
        ctx.render('user-edit', {
            message: message
        })
    } else {
        console.log('add option')
        ctx.render('user-edit', {
            message: message
        })
    }

}