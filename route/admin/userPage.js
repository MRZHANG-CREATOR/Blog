const {
    User
} = require('../../model/user')
module.exports = async (ctx, next) => {
    ctx.state.currentPage = 'user'
    let page = ctx.query.page || 1; //users page
    let pageSize = 2 //page size
    let count = await User.countDocuments({}) //Query number of users
    let totalPage = Math.ceil(count / pageSize)
    page = page >= 1 && page <= totalPage ? page : 1
    let start = (page - 1) * pageSize
    let users = await User.find({}).limit(2).skip(start) //Query all user information
    console.log(users)
    await ctx.render('admin/user', {
        users: users, // username: ctx.session.username //只有当前网页能获得，需要共用的话存在state中,已经转到state了
        page: page,
        totalPage: totalPage,
        count: count
    })
}