//用户集合
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: false,
        default: 'normal'
    },
    state: {
        type: Number,
        default: 0
    }
})
const User = mongoose.model('User', userSchema) //返回构造函数
async function creatUser() {
    const salt = await bcrypt.genSalt(10)
    const pass = await bcrypt.hash('helloWorld', salt)
    const user = await User.create({ //测试创建
        username: 'helloWorld',
        email: 'helloWorld@qq.cn',
        password: pass,
        role: "admin",
        state: 0
    })
}
// creatUser()
// User.create({//测试创建
//     username: 'helloWorld',
//     email: 'helloWorld@qq.cn',
//     password: 'helloWorld',
//     role: "admin",
//     state: 0
// }).then(() => {
//     console.log('create success')
// }).catch(() => {
//     console.log('create fail')
// })
module.exports = {
    User //es6 键值相同可以简写
}