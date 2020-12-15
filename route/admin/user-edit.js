const {
    User
} = require('../../model/user')
module.exports = async (ctx, next) => {
    const {
        message,
        id
    } = ctx.query
    if (id) {
        const userEdit = await User.findOne({
            _id: id
        })
        // console.log(userEdit)
        await ctx.render('user-edit', {
            message: message,
            userEdit: userEdit,
            link: "/admin/user-modify?id=" + id,
            button: "Modification"
        })
    } else {
        await ctx.render('user-edit', {
            message: message,
            link: "/admin/user-edit",
            button: "Add"
        })
    }

}