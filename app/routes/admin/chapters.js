const express = require('express');
const router = express.Router();

let chapters = require('../../controllers/admin/chapters');
router.post('/get-chapters',chapters.get)
router.post('/add-chapter',chapters.create)
router.delete('/delete-chapter',chapters.delete)
router.get('/chapter-list',chapters.getList)

module.exports = router;

