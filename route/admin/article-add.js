const formidable = require('formidable')
const path = require('path')
const {
    Article
} = require('../../model/article')
module.exports = async (ctx, next) => {
    // formidable模块  支持get post 请求  还支持文件上传
    const form = new formidable({
        uploadDir: path.join(__dirname, '../', '../', 'public', 'uploads'),
        keepExtensions: true
    }) //创建表单解析对象
    await new Promise((resolve, reject) => {
        form.parse(ctx.req, async (err, fields, files) => {
            if (err) {
                reject(err);
                return;
            }
            let cover = files.cover.path.split('public')[1]
            Article.create({
                title: fields.title,
                author: fields.author,
                publishData: fields.publishData,
                cover: cover,
                content: fields.content
            })
            await ctx.redirect('/admin/article')
            resolve();
        });
    });
}