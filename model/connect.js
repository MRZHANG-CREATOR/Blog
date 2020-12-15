//database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('Database connect success')
    }).catch(() => {
        console.log('Database connect fail')
    })