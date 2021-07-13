const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('ProfileImage');
// create login routes
const user_transactions = require('../../controllers/users/transactions');


const validationData= require('../../middlewares/FrontendValidator');

router.post('/get-transactions',user_transactions.getTransactionGroupWise);








module.exports = router;

