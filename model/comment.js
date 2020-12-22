const {
    string
} = require('joi')
const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'article'
    },
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String
    }

})
const Comment = mongoose.model('Comment', commentSchema)
module.exports = {
    Comment
}