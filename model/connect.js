//database connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/blog', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('success')
    }).catch(() => {
        console.log('fail')
    })