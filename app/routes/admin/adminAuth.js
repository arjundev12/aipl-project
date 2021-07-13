const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('QuestionsImage');
// create login routes
const admin_controller = require('../../controllers/admin/admin');
// const user_controller = require('../../controllers/users/userAuth');
const wallet = require('../../controllers/admin/wallet')
const validationData= require('../../middlewares/FrontendValidator');
const Auth = require("../../middlewares/loginToken")
// upload.single('profile_image')
router.post('/login',validationData.login, admin_controller.loginAdmin)
// router.post('/get-user',Auth.jwtVerify, admin_controller.getUser)
router.put('/update-user', Auth.jwtVerify,admin_controller.AdminUpdateUser)
router.post('/get-transaction',Auth.jwtVerify, admin_controller.getTransaction)
router.get('/get-Kyc',Auth.jwtVerify, admin_controller.getKycDoc)
router.post('/get-kyc-user',Auth.jwtVerify, admin_controller.getUserKyc)
router.get('/wallet',Auth.jwtVerify, wallet.getWallet)
router.get('/get-total',Auth.jwtVerify, admin_controller.getTotalCount)

// router.post('/update-profile',Auth.jwtVerify,validationData.update, user_controller.UpdateProfile)
// router.get('/user-details',Auth.jwtVerify, user_controller.getUserDetails)
////////////////////////////////////////////////////////////////
router.post('/add-user', admin_controller.adminAddUser)
router.post('/get-user', admin_controller.getUser)




module.exports = router;

