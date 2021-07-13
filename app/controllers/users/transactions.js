const UsersModel = require('../../models/users');
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const walletModel = require('../../models/wallet')
const TransactionModel = require('../../models/transactions');
const ManagePriceModel = require('../../models/managePrice')
class users {
    constructor() {
        return {
            getTransactionGroupWise: this.getTransactionGroupWise.bind(this),
            // uploadeImage: this.uploadeImage.bind(this),
            // submitReferral: this.submitReferral.bind(this)
        }
    }

    //create wallet Api

    async getTransactionGroupWise(req, res) {
        try {
            let query1 = { "$match": { $and: [{ to_id: req.body.toId }] } }
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
            let data = {}
            for (let iterator of getUser) {
                iterator.totalAmount = iterator.totalAmount.toString()
                iterator.COUNT =   iterator.COUNT.toString()
                
            }
            data.transaction = getUser
            data.wallet
            let walletData = await walletModel.findOne({ user_id: req.body.toId }).populate('user_id', 'ref_to_users').lean()
            // let miningRate =0
            let constantdb = await ManagePriceModel.find()
            let miningRate = constantdb[0].mining_rate
            if (walletData.user_id.ref_to_users) {
                for (let item of walletData.user_id.ref_to_users) {
                    let userData = await this._getUserData(item.id)
                    if (userData.minner_Activity == true) {
                        miningRate += constantdb[0].mining_rate
                        // activeminer += 1
                    }

                }
            }
            walletData.total_amount = walletData.total_amount.toString()
            walletData.current_mining_rate = miningRate+" /per hour",
            walletData.current_time = moment().utcOffset("+05:30").format("DD.MM.YYYY HH.mm.ss")
            delete walletData.user_id
            data.wallet = walletData
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.json({ code: 404, success: false, message: "Data not found", })
        }
    }
    async _getUserData(id) {
        try {
            let data = await UsersModel.findOne({ _id: id }, {
                // // ref_to_users: 0,
                // password: 0,
                // block_user: 0,
                // user_type: 0,
                // is_email_verify: 0,
                // is_number_verify: 0,
                // is_super_admin: 0,
                minner_Activity: 1
            }).lean()
            return data
        } catch (error) {
            console.log("Error in catch", error)
        }
    }

    // [
    //     { $project: { day: { $dayOfMonth: '$createdAt' } } },
    //     {
    //         $group: {
    //             _id: {
    //                 day: '$day',
    //                 amount: "$amount",
    //                 status: "$status",
    //                 transaction_type: "$transaction_type",
    //                 type: "$type",
    //                 to_id: "to_id"
    //             },
    //             count: {
    //                 $sum: 1
    //             }
    //         }
    //     }]
    // if (req.body.type && req.body.type != "") {
    //     query.type = req.body.type
    // } if (req.body.toId && req.body.toId != "") {
    //     query.to_id = req.body.toId
    // } if (req.body.todayDate && req.body.todayDate != "") {
    //     query.createdAt = { "$gte": new Date(req.body.todayDate).toISOString() }// + "T00:00:00Z" 
    //     query.createdAt["$lte"] = new Date(req.body.todayDate).toISOString()// + "T12:00:00Z"
    // } if (req.body.toDate && req.body.toDate != "") {
    //     query.createdAt = { "$lte": req.body.toDate + "T12:00:00Z" }
    // } if (req.body.fromDate && req.body.fromDate != "") {
    //     query.createdAt["$gte"] = new Date(req.body.fromDate)// + "T00:00:00Z"
    // }

}

module.exports = new users();