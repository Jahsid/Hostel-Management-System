const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { generateAdminToken, generateWardenToken, generateStudentToken, verifyToken } = require('../utils/auth');
const User = require('../models/User');

exports.login = async (req, res, next) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ success, errors: [{ msg: 'Invalid credentials' }] });
            }

            let token;
            if (user.isAdmin) {
                token = generateAdminToken(user.id, user.isAdmin);
            } else if (user.isWarden) {
                token = generateWardenToken(user.id, user.isWarden);
            } else {
                token = generateStudentToken(user.id, true)
            }

            res.status(200).json({
                success: true,
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        isWarden: user.isWarden,
                    },
                },
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    } catch (error) {
        next(error);
    }
};


exports.changePassword = async (req, res, next) => {
    let success = false;
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        const { email, password, newPassword } = req.body;

        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({success, errors: [{ msg: 'Invalid credentials' }] });
            }

            const oldPassword = await bcrypt.compare(password, user.password);

            if (!oldPassword) {
                return res.status(400).json({success, errors: [{ msg: 'Invalid credentials' }] });
            }

            const salt = await bcrypt.genSalt(10);
            const newp = await bcrypt.hash(newPassword, salt);

            user.password = newp;
            await user.save();

            success = true;
            res.status(200).json({ success, msg: 'Password changed successfully' });

        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    } catch (error) {
        next(error);
    }
}

exports.verifySession = async (req, res, next) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array(), success});
    }
    try {
        const { token } = req.body;
        const decoded = verifyToken(token);
        if (decoded) {
            success = true;
            return res.status(200).json({success, data: decoded});
        }
        return res.status(400).json({success, "message": "Invalid token"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({success, "message": "Server Error"});
    }
}


exports.register = async (req, res) => {
    let success = false;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password, isAdmin, isWarden } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success, errors: [{ msg: "User already exists"}] });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
            isWarden: isWarden || false,
        });

        await user.save();
        success = true;

        res.status(201).json({ success, msg: "User registered successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
}