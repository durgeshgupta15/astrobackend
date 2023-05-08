const express = require('express');
const router = express.Router();
const youtubeVideoController = require('../controllers/youtubeVideosController');
const authenticateToken = require('../middleware/auth.middleware');


router.post('/getAllVideos', authenticateToken, youtubeVideoController.showAllChannelVideos);


module.exports = router;

