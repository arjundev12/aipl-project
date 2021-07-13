const UsersModel = require('../../models/users');
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const walletModel = require('../../models/wallet')
const FcmTokenModel = require("../../models/fcmToken")
const NotificationModel = require("../../models/notification")
const Notification = require('../../middlewares/notification')
class users {
    constructor() {
        return {
            sendNotificationToUser: this.sendNotificationToUser.bind(this),
            getNotificationById: this.getNotificationById.bind(this),
            viewNotification: this.viewNotification.bind(this),
            getCountNotification: this.getCountNotification.bind(this)
        }
    }

    //create wallet Api

    async sendNotificationToUser(req, res) {
        try {
            let { senderId, reciverId } = req.body
            if (!reciverId || !senderId) {
                return res.json({ code: 400, success: false, message: "Perameter is missing", })
            } else {
                // console.log("senderId, ..reciverId..", senderId, reciverId)
                let fcmTokenData = await FcmTokenModel.findOne({ userId: reciverId }).populate('userId').lean()
                // console.log("fcmTokenData", fcmTokenData)
                let senderDetails = await UsersModel.findOne({ _id: senderId }).lean()
                if (fcmTokenData) {
                    let message = {
                        title: "Press the mining button for earning",
                        time: moment().utcOffset("+05:30").format("DD.MM.YYYY HH.mm.ss")
                    }
                    let saveNotification = new NotificationModel({
                        title: message.title,
                        toId: reciverId,
                        fromId: senderId,
                        type: 'Remember',
                        time: message.time
                    })
                    await saveNotification.save()
                    let data = {
                        fromName: senderDetails ? senderDetails.name : "",
                        toName: fcmTokenData.userId.name ? fcmTokenData.userId.name : "",
                        toId: reciverId,
                        fromId: senderId,
                    }
                    let sendnotification = await Notification._sendPushNotification(message, fcmTokenData.fcmToken, data)
                    res.json({ code: 200, success: true, message: "Notification send successfully", })
                } else {
                    res.json({ code: 400, success: true, message: "Fcm token is not updated", })
                }
            }
        } catch (error) {
            console.log("error in catch", error)
            res.json({ code: 400, success: false, message: "Somthing went wrong", })
        }
    }
    async getNotificationById(req, res) {
        try {
            let userId = req.query.userId
            if (!userId) {
                return res.json({ code: 400, success: false, message: "userId is required", })
            } else {
                let getData = await NotificationModel.find({toId: userId}).populate('fromId', 'name profile_pic minner_Activity')
                await NotificationModel.updateMany({toId: userId},{$set:{view_status: true}})
                res.json({ code: 200, success: true, message: "Get notification successfully", getData })
            }
        } catch (error) {
            console.log("error in catch", error)
            res.json({ code: 400, success: false, message: "Somthing went wrong", })
        }
    }
    async getCountNotification(req, res) {
        try {
            let userId = req.query.userId
            if (!userId) {
                return res.json({ code: 400, success: false, message: "userId is required", })
            } else {
                let getData = await NotificationModel.count({ $and:[{toId: userId}, {view_status: false}]})
                res.json({ code: 200, success: true, message: "Get notification successfully", getData })
            }
        } catch (error) {
            console.log("error in catch", error)
            res.json({ code: 400, success: false, message: "Somthing went wrong", })
        }
    }

    async viewNotification(req, res) {
        try {
            let {userId, notification_id} = req.body
            if (!userId) {
                return res.json({ code: 400, success: false, message: "userId is required", })
            } else {
                let getData = await NotificationModel.findOneAndUpdate({ _id: notification_id,toId: userId},{$set: {view_status: true}}, {new: true})
                res.json({ code: 200, success: true, message: "Get notification successfully", getData })
            }
        } catch (error) {
            console.log("error in catch", error)
            res.json({ code: 400, success: false, message: "Somthing went wrong", })
        }
    }
}

module.exports = new users();