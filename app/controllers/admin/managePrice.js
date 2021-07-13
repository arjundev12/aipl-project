const commenFunction = require('../common/Common')
const UsersModel = require('../../models/users');
const NewsModel = require('../../models/news')
const BlogModel = require('../../models/blogs')
const ManagePriceModel = require('../../models/managePrice')
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
class ManagePrice {
    constructor() {
        return {
            create: this.create.bind(this),
            update: this.update.bind(this),
            getData: this.getData.bind(this),
            viewData: this.viewData.bind(this),
        }
    }

    async create(req, res) {
        try {
            let { title, content, id, image } = req.body
            console.log("hiiii", title, content, id)
            let getData = await ManagePriceModel.findOne({ title: title })

            if (getData) {
                res.json({ code: 422, success: false, message: 'this title is all ready exist', })
            } else {
                let obj = {
                    mining_rate: 0.0416, // per user
                    created_by: '607e5136b24182674c4a8ed6',
                }
                let saveData = new ManagePriceModel(obj)
                await saveData.save();
                res.json({ code: 200, success: true, message: 'news save successfully', })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async update(req, res) {
        try {
            let { referral_ammount, earning_ammount, mining_rate, mining_ammount, number_reward, reddit_reward,status, id } = req.body
            console.log("hiiii", id)
            if (!id) {
                res.status(500).json({ code: 422, success: false, message: "Id is required", })
            } else {
                let getData = await ManagePriceModel.findOne({ _id: id })
                if (getData) {
                    let obj = {}
                    if (referral_ammount) {
                        obj.referral_ammount = referral_ammount
                    }
                    if (earning_ammount) {
                        obj.earning_ammount = earning_ammount
                    }
                    if (mining_rate) {
                        obj.mining_rate = mining_rate
                    }
                    if (mining_ammount) {
                        obj.mining_ammount = mining_ammount
                    }
                    if (number_reward) {
                        obj.number_reward = number_reward
                    }
                    if (reddit_reward) {
                        obj.reddit_reward = reddit_reward
                    }
                    if (status) {
                        obj.status = status
                    }

                    let saveData = await ManagePriceModel.findOneAndUpdate({ _id: id }, { $set: obj })
                    res.json({ code: 200, success: true, message: 'Update successfully', saveData })
                } else {
                    res.json({ code: 404, success: false, message: 'Data not found', })
                }
            }


        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async getData(req, res) {
        try {
            let getData = await ManagePriceModel.find()
            res.json({ code: 200, success: true, message: 'Get data successfully',data: getData })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async viewData(req, res) {
        try {
             if(req.query.id){
                let getData = await ManagePriceModel.findOne({_id: req.query.id})
                res.json({ code: 200, success: true, message: 'Get data successfully', getData })
             }else{
                res.json({ code: 422, success: false, message: 'Id is required', getData })
             }
           
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
}



module.exports = new ManagePrice();