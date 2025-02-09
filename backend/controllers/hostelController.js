const { validationResult } = require('express-validator');
const { Hostel } = require('../models');

exports.createHostel = async (req, res) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { name, location, rooms, capacity, vacant } = req.body;

        const newHostel = new Hostel({
            name,
            location,
            rooms,
            capacity,
            vacant
        })

        await newHostel.save();
        success = true;
        res.status(201).json({ success, msg: "Hostel created successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}
