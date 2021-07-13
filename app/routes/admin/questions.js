const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('QuestionsSheets');
let questions = require('../../controllers/admin/questions');


router.post('/upload-image',questions.uploadeImagebase64)
router.post('/get-questions',questions.get)
router.post('/add-question',questions.create)
router.delete('/delete-question',questions.delete)
router.post('/uploade-sheet',upload.single('xlsSheet'),questions.uploadeXlsSheet)
router.post('/insert-data',questions.insertXlsSheetData)

//,


module.exports = router;

