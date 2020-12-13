const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs')
app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'art')
// app.engine('art', require('express-art-template')) 
//开放静态资源文件
const public = path.join(__dirname, 'public') //路径拼接
app.use(express.static(public))
// const home = require('./route/home')
// const admin = require('./route/admin')
// app.use('/home', home)
// app.use('/admin', admin)
app.get('/login', (req, res, next) => {
    const content = fs.readFileSync('./public/admin/login.html').toString()
    res.send(content)
    // res.send("<h1>hello world</h1>")
    // res.render('./public/admin/login.html')//not available
})
// app.use(router.routes())
app.listen(800);
console.log('服务器启动成功，http://localhost:800')