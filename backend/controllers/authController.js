const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user (or use admin from env if not in DB)
        let user = await User.findOne({ username });
        
        // Simple logic: if DB is empty, let's allow login with ENVs and create user
        if (!user && username === process.env.ADMIN_USER) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASS, salt);
            user = new User({ username, password: hashedPassword });
            await user.save();
        }

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { username: user.username } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
