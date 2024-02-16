const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Routes for Room Management
router.post('/create', roomController.createRoom);
router.get('/getAll', roomController.getAllRooms);
router.put('/update/:id', roomController.updateRoom);
router.delete('/delete/:id', roomController.deleteRoom);
router.get('/getHostels/:id', roomController.getHostel)
router.get('/getAvailableRoom/', roomController.getAvailableRoom)
router.get('/getRoomates/:room_no', roomController.getRoomates)
module.exports = router;