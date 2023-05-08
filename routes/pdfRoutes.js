const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
// const authenticateToken = require('../middleware/auth.middleware');

router.post('/birthDetail', pdfController.basicHoroscope);
router.post('/matchingDetail', pdfController.matchingDetail);
router.post('/downloadFile', pdfController.downloadFile);
router.post('/downloadMatchingFile', pdfController.downloadMatchingFile);
// router.post('/getAllUsers', authenticateToken, courseController.getAllUsers);

module.exports = router;