const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default: false
    },
    isWarden:{
        type:Boolean,
        required:true,
        default: false
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = User = mongoose.model('user',UserSchema);
