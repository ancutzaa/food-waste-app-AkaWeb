const express = require('express');
const router = express.Router();
const controller = require('../controllers/marketplaceController');

router.get('/feed', controller.getFriendFeed);

module.exports = router;