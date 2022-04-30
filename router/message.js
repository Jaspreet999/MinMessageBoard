const mongoose = require('mongoose')

const userMessageSchema = new mongoose.Schema(
    {
        date:{
            required:true,
            type: Date,
            default:new Date(),
            immutable:true
        },
        name:String,
        message:String
    }
)

module.exports = mongoose.model("messageSchema",userMessageSchema)