const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('QuestionsImage');
let faq = require('../../controllers/admin/faq');


// router.post('/upload-image',faq.uploadeImagebase64)
router.post('/list-faq',faq.get)
router.post('/add-faq',faq.create)
router.get('/get-faq',faq.getById)
router.put('/update-faq',faq.update)
// router.delete('/delete-question',faq.delete)



module.exports = router;

