const mongoose = require('mongoose')

const userSchema =new  mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    phonenumber : {
        type : Number,
        required : true,
        unique : true,
        minlength : 10,
        maxlength : 10
    },
    password : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model("User",userSchema)