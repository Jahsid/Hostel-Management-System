// Import necessary modules
const Room = require('../models/Room'); // Assuming your Room model is defined in a separate file
const Hostel = require('../models/Hostel')

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const { roomNumber, capacity, occupancy } = req.body;
    
    // Validate roomNumber and capacity here if needed
    
    const newRoom = new Room({
      roomNumber,
      capacity,
      occupancy: occupancy || false, // Default to false if not provided
    });

    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update room details
exports.updateRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const updatedData = req.body;

    // Validate updatedData here if needed

    const room = await Room.findByIdAndUpdate(roomId, updatedData, { new: true });

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findByIdAndDelete(roomId);

    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getHostel = async (req, res) => {
  try {
    const hostelId = req.params.id; // Assuming the hostelId is provided in the request parameters

    const hostel = await Hostel.findOne({ _id: hostelId });

    if (!hostel) {
      return res.status(404).json({ error: 'Hostel not found' });
    }

    res.json(hostel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
