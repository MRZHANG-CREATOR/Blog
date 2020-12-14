//User data operation
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Joi = require('joi')
const userSchema = new mongoose.Schema({ //userdata format template
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
async function creatUser() { //create user test
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash('helloWorld', salt)
    const user = await User.create({ //测试创建
        username: 'helloWorld',
        email: 'helloWorld@qq.cn',
        password: password,
        role: "admin",
        state: 0
    })
}

async function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(2).max(12).required().error(new Error('username format err')),
        email: Joi.string().email().required().error(new Error('email这出错啦')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().required().error(new Error('password这出错啦')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('role这出错啦')),
        state: Joi.number().valid(0, 1).required().error(new Error('这state出错啦')),
    })
    let value = schema.validate(user, {
        abortEarly: false,
        cache: false,
        errors: {
            label: false
        }
    })
    return value
}
module.exports = {
    User, //es6 键值相同可以简写
    validateUser
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