const express = require('express');
const router = express.Router();

let subCategories = require('../../controllers/admin/subcategories');
router.post('/get-subcategory',subCategories.get)
router.post('/add-subcategory',subCategories.create)
router.delete('/delete-subcategory',subCategories.delete)
router.get('/subcategory-list',subCategories.getList)
// router.get('/subcategory-list',subCategories.getListById)




module.exports = router;

