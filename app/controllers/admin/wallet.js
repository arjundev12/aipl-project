const commenFunction = require('../common/Common')
const UsersModel = require('../../models/users');
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const walletModel = require('../../models/wallet')
const TransactionModel = require('../../models/transactions');
class users {
    constructor() {
        return {
            getWallet: this.getWallet.bind(this),
            // uploadeImage: this.uploadeImage.bind(this),
            // submitReferral: this.submitReferral.bind(this)
        }
    }

    //create wallet Api

    async getWallet(req, res) {
        try {
            let data
            let _id = req.query._id
            data = await walletModel.findOne({ user_id: _id }).populate('user_id','name username email user_type ').lean()
            let query1 = { "$match": { $and: [{ to_id: _id.toString() }] } }
            let getUser = await TransactionModel.aggregate([query1, {
                $group: {
                    _id: {
                        date: {
                            $dateFromParts: {
                                year: { $year: "$_id" },
                                month: { $month: "$_id" },
                                day: { $dayOfMonth: "$_id" }
                            },
                        },
                    },
                    totalAmount: {
                        $sum: "$amount"
                    },
                    COUNT: {
                        $sum: 1
                    }
                }
            },])
            
            for (const iterator of getUser) {
                let newdate = iterator._id.date.toString()
                let date1 = newdate.split('2021')
                iterator._id.date = date1[0]
            }
            data.transactions= getUser
            res.json({ code: 200, success: true, message: 'Get successfully', data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.json({code: 500, success: false, message: "Somthing went wrong", })
        }
    }



}

module.exports = new users();