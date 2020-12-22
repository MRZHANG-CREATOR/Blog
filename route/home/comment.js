const {
    Comment
} = require('../../model/comment')
module.exports = async (ctx, next) => {
    // let bpdy = ctx.request.body
    // console.log(bpdy)
    ctx.body = 'bpdy'
}