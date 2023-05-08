const express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer();
var path = require('path');
const { addSliders, addReviews, addNewCourse, updateCourse, editCourse, editCoursesss, editCoursess, addBlog, editBlog } = require('../functions/course_function/courseFunctions');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var uploadImage = multer({
    storage: storage
    // mypic is the name of file attribute
}).single("image");

var uploadImage2 = multer({
    storage: storage
    // mypic is the name of file attribute
}).single("image1");

var uploadImage1 = multer({
    storage: storage
}).fields([{ name: 'image', maxCount: 1 }, { name: 'image1', maxCount: 1 },]);


router.post('/uploadImage', (req, res) => {
    uploadImage(req, res, function (err) {
        console.log("--", err)
        if (err) res.status(500).send(err);

        else {
            // console.log(req.file)
            let filePath = "uploads/" + req?.file?.originalname;
            // console.log(filePath)
            addSliders(filePath, req.body).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    console.log("-----", e)
                    res.status(500).send(e);
                })

        }
    })
})

router.post('/reviews', (req, res) => {
    uploadImage(req, res, function (err) {
        console.log("--", err)
        if (err) res.status(500).send(err);

        else {
            let filePath = "uploads/" + req?.file?.originalname;
            // console.log(filePath)
            addReviews(filePath, req.body).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    res.status(500).send(e);
                })

        }
    })
})

router.post('/uploadCourse', (req, res) => {
    uploadImage1(req, res, function (err) {
        console.log("--", err)
        if (err) res.status(500).send(err);
        else {
            let filePath = "uploads/" + req?.files['image'][0]?.originalname;
            let filePath1 = "uploads/" + req?.files['image1'][0]?.originalname;
            // console.log(req.files)
            addNewCourse(req, filePath, filePath1).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    console.log("-----", e)
                    res.status(500).send(e);
                })
        }
    })
})

router.post('/editCourseUpload', (req, res) => {
    uploadImage1(req, res, function (err) {
        console.log("--", err)
        if (err) res.status(500).send(err);
        else {
            let filePath = "uploads/" + req?.files['image'][0]?.originalname;
            let filePath1 = "uploads/" + req?.files['image1'][0]?.originalname;
            updateCourse(req, filePath, filePath1).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    console.log("-----", e)
                    res.status(500).send(e);
                })

        }
    })
})
router.post('/editCourses', (req, res) => {
    uploadImage(req, res, function (err) {
        console.log("--", err)
        if (err) res.status(500).send(err);
        else {
            editCourse(req).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    console.log("-----", e)
                    res.status(500).send(e);
                })

        }
    })
})

router.post('/editCoursess', (req, res) => {
    uploadImage1(req, res, function (err) {
        if (err) res.status(500).send(err);
        else {
            let filePath = "uploads/" + req?.files['image'][0]?.originalname;
            editCoursess(req, filePath).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    console.log("-----", e)
                    res.status(500).send(e);
                })

        }
    })
})

router.post('/editCoursesss', (req, res) => {
    uploadImage2(req, res, function (err) {
        if (err) res.status(500).send(err);
        else {
            let filePath = "uploads/" + req?.file?.originalname;
            editCoursesss(req, filePath).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    console.log("-----", e)
                    res.status(500).send(e);
                })

        }
    })
})



router.post('/addNewBlog', (req, res) => {
    uploadImage(req, res, function (err) {
        if (err) res.status(500).send(err);
        else {
            let filePath = "uploads/" + req?.file?.originalname;
            addBlog(req, filePath).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    console.log("-----", e)
                    res.status(500).send(e);
                })

        }
    })
})
router.post('/editBlog', (req, res) => {
    uploadImage(req, res, function (err) {
        if (err) res.status(500).send(err);
        else {
            let filePath = "uploads/" + req?.file?.originalname;
            editBlog(req, filePath).then((s) => {
                res.status(200).send(s)
            })
                .catch((e) => {
                    console.log("-----", e)
                    res.status(500).send(e);
                })

        }
    })
})


module.exports = router