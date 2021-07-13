const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('NewsAndBlogs');
// create login routes
let getNewsAndBlog = require('../../controllers/common/Common');
let managePrice = require('../../controllers/admin/managePrice');
let validationData= require('../../middlewares/FrontendValidator');
const Auth = require('../../middlewares/loginToken')
// upload.single('profile_image')
router.post('/add-price',Auth.jwtVerify,managePrice.create)
router.put('/update-price',Auth.jwtVerify,managePrice.update)
router.get('/get-price',Auth.jwtVerify,managePrice.getData)
router.get('/view-price',Auth.jwtVerify,managePrice.viewData)

module.exports = router;

