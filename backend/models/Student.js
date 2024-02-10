const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    admission_no:{
        type:Number,
        required:true,
        unique:true
    },
    room_no:{
        type:Number,
        required:false
    },
    batch:{
        type:Number,
        required:true
    },
    dept:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    father_name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true
    },
    aadhar_card:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    hostel:{
        type:Schema.Types.ObjectId,
        ref:'hostel'
    },
    date:{
        type:Date,
        default:Date.now
    },
    roomId: {
        type:Schema.Types.ObjectId,
        ref:'room'
    }
})

module.exports = Student = mongoose.model('student',StudentSchema);