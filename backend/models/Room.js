// Example Room Model
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  capacity: { type: Number, required: true },
  occupancy: { type: Boolean, default: false },
  students:[{
    student_id:{type:mongoose.Schema.Types.ObjectId,ref:'student'},
    name:{type:String}
  }]
  // Add other relevant attributes
});

const Room = mongoose.model('room', roomSchema);

module.exports = Room;
