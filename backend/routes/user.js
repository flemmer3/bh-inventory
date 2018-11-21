const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', (req, res) => {
    console.log('user signup');

    const { email, password } = req.body
    // ADD VALIDATION
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the email: ${email}`
            });
        } else {
            const newUser = new User({
                email: email,
                password: password
            });
            newUser.save((err, savedUser) => {
                if (err) return res.json(err);
                res.json(savedUser);
            });
        }
    });
});

module.exports = router