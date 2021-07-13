const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('ProfileImage');
// create login routes
const user_notification = require('../../controllers/users/notifications');


const validationData= require('../../middlewares/FrontendValidator');

router.post('/send-notification',user_notification.sendNotificationToUser);
router.get('/get-notification',user_notification.getNotificationById);
router.post('/view-notification',user_notification.viewNotification);
router.get('/count-Notification',user_notification.getCountNotification);








module.exports = router;

