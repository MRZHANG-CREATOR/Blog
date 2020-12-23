const {
    Comment
} = require('../../model/comment')
module.exports = (ctx, next) => {
    const {
        content,
        uid,
        aid
    } = ctx.request.body
    console.log(bpdy)
    Comment.create({
        content: content,
        uid: uid,
        aid: aid,
    })
    ctx.body = 'bpdy'
}