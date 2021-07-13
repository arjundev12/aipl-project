const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('QuestionsImage');
let subscription = require('../../controllers/admin/subscription');


// router.post('/upload-image',faq.uploadeImagebase64)
router.post('/list-subscription',subscription.get)
router.post('/add-subscription',subscription.create)
router.get('/get-subscription',subscription.getById)
router.put('/update-subscription',subscription.update)
// router.delete('/delete-question',faq.delete)



module.exports = router;

