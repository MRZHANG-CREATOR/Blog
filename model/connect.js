//database connection
const mongoose = require('mongoose')
const config = require('config')
// console.log(process.env.APP_PASSWORD)
// console.log(config.util.getEnv('APP_PASSWORD'))
// mongoose.connect('mongodb://localhost/blog', {
// mongoose.connect('mongodb://blog:blog@localhost:27017/blog', {
mongoose.connect(`mongodb://${config.get('db.user')}:${process.env.APP_PASSWORD}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Database connect success')
    }).catch(() => {
        console.log('Database connect fail')
    })