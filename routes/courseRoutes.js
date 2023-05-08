const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authenticateToken = require('../middleware/auth.middleware');

router.post('/login', courseController.login);
router.post('/getAllUsers', authenticateToken, courseController.getAllUsers);
router.post('/addNewCourse', authenticateToken, courseController.addNewCourse);
router.post('/getAllCourses', courseController.getAllCourses);
router.post('/getCoursesDetail', courseController.getCoursesDetail);
router.post('/editCourse', authenticateToken, courseController.editCourse);
router.post('/deleteCourse', authenticateToken, courseController.deleteCourse);

router.post('/getAllPaymentHistory', authenticateToken, courseController.getAllPaymentHistory);
router.post('/getAllPurchasedCourse', authenticateToken, courseController.getAllPurchasedCourse);

router.post('/getAllCategory', courseController.getAllCategory);
router.post('/addCategory', authenticateToken, courseController.addCategory);
router.post('/deleteCategory', authenticateToken, courseController.deleteCategory);

router.post('/blockUnblockUser', authenticateToken, courseController.blockUnblockUser);

router.post('/getSliders', courseController.getSliders);
router.post('/getSliderDetail', courseController.getSliderDetail);
router.post('/deleteSliders', authenticateToken, courseController.deleteSliders);
router.post('/addNewSlider', authenticateToken, courseController.addSliders);

router.post('/checkCoursePurchasedOrNot', authenticateToken, courseController.checkCoursePurchasedOrNot);
router.post('/insertPayment', authenticateToken, courseController.insertPayment);

router.post('/getAllPanchang', courseController.getAllPanchang);
router.post('/deletePanchang', authenticateToken, courseController.deletePanchang);
router.post('/addNewPanchang', authenticateToken, courseController.addNewPanchang);
router.post('/editPanchang', authenticateToken, courseController.editPanchang);

router.post('/getAllRashi', courseController.getAllRashi);

router.post('/getAllReviews', courseController.getAllReviews);
router.post('/deleteReview', authenticateToken, courseController.deleteReview);
router.post('/addReviews', authenticateToken, courseController.addReviews);


router.post('/getAllBirthDetail', authenticateToken, courseController.getAllBirthDetail);
router.post('/getAllMacthDetail', authenticateToken, courseController.getAllMacthDetail);

router.post('/getAllBirthMobileDetail', authenticateToken, courseController.getAllBirthMobileDetail);
router.post('/getAllMacthMobileDetail', authenticateToken, courseController.getAllMacthMobileDetail);

router.post('/getBlog', courseController.getBlog);
router.post('/addBlog', authenticateToken, courseController.addBlog);
router.post('/editBlog', authenticateToken, courseController.editBlog);
router.post('/deleteBlog', authenticateToken, courseController.deleteBlog);

router.post('/getSubscribe', authenticateToken, courseController.getSubscribe);
router.post('/addSubscribe', courseController.addSubscribe);

router.post('/getBlogBySlug', courseController.getBlogBySlug);
router.post('/sendMail', authenticateToken, courseController.sendMail);



module.exports = router;
