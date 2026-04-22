const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, deleteMessage } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getMessages);
router.post('/', sendMessage);
router.delete('/:id', auth, deleteMessage);

module.exports = router;
