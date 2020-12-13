const Joi = require('joi')
const schema = Joi.object({
    username: Joi.number()
        .min(2)
        .max(100)
        .required()
    // .error(new Error('username format error'))
})
// const value = schema.validate({
//     username: '1'
// })
// console.log(value)
// (async function run() {
try {
    schema.validateAsync({
        username: '120',
    });
} catch (err) {
    console.log(err.message)
}
// })()