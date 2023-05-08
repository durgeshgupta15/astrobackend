const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/loginWithMobile', userController.loginWithMobile);
router.post('/sendOtp', userController.sendOtp);
router.post('/verifyOtp', userController.verifyOtp);

router.post('/userLogin', userController.userLogin);
router.post('/register', userController.register);
router.post('/getUserProfile', authenticateToken, userController.getUserProfile);
router.post('/editUserProfile', authenticateToken, userController.editUserProfile);
router.post('/changePassword', authenticateToken, userController.changePassword);


router.post('/getUserCourse', authenticateToken, userController.getUserCourse);
router.post('/getUserCourseDetail', authenticateToken, userController.getUserCourseDetail);
router.post('/getUserPaymentHistory', authenticateToken, userController.getUserPaymentHistory);

router.post('/addCoursePayemnt', authenticateToken, userController.addCoursePayemnt);
router.post('/getTodayPanchang', userController.getTodayPanchang);
router.post('/getAllHoroscope', userController.getAllHoroscope);

router.get('/getAccessToken', userController.getAccessToken);
router.post('/myKundali', userController.myKundali);
router.post('/kundaliMatch', userController.kundaliMatch);
router.get('/test', userController.test);

module.exports = router;
