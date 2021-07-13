const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('NewsAndBlogs');
// create login routes
let getNewsAndBlog = require('../../controllers/common/Common');
let createNewsAndBlog = require('../../controllers/admin/newsAndBlog');
let validationData= require('../../middlewares/FrontendValidator');
const Auth = require("../../middlewares/loginToken")
// upload.single('profile_image')
router.post('/news',Auth.jwtVerify,createNewsAndBlog.createNews)
router.post('/blogs',Auth.jwtVerify,createNewsAndBlog.createBlogs)
router.put('/news',Auth.jwtVerify,createNewsAndBlog.updateNews)
router.put('/blogs',Auth.jwtVerify,createNewsAndBlog.updateBlogs)


router.post('/get-news', getNewsAndBlog.getNews)
router.post('/get-blogs', getNewsAndBlog.getBlogs)
// router.post('/upload-image',upload.single('image'), createNewsAndBlog.uploadeImage)
router.post('/upload-image', createNewsAndBlog.uploadeImagebase64)


module.exports = router;

