const {
    Article
} = require('../../model/article')
const pagination = require('mongoose-sex-page')
module.exports = async (ctx) => {
    let result = await pagination(Article).page(1).size(4).display(5).find().populate('author').exec(); //多集合联合查询
    await ctx.render('home/default', {
        result: result
    })
}