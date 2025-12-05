const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController')

router.get('/', controller.getNotifications);
router.get('/unread-count', controller.getUnreadCount);
router.post('/mark-read', controller.markAsRead);
router.delete('/:id', controller.deleteNotification);

module.exports = router;