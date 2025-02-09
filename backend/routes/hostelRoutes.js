const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { createHostel } = require('../controllers/hostelController');

// @route   POST api/hostel/create-hostel
// @desc    Create hostel
// @access  Public
router.post('/create-hostel', [
    check('name', 'Name is required').not().isEmpty(),
    check("location", 'Location is required').not().isEmpty(),
    check('rooms', 'Rooms is required').not().isEmpty(),
    check("capacity", 'Capacity is required').not().isEmpty(),
    check('vacant', 'Vacant is required').not().isEmpty(),
], createHostel);

module.exports = router;
