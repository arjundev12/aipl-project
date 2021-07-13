

const commenFunction = require('../common/Common')
const UsersModel = require('../../models/users');
const CmsModel = require('../../models/cms')
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
class Cms {
    constructor() {
        return {
            create: this.create.bind(this),
            update: this.update.bind(this),
            get: this.get.bind(this)
        }
    }

    async create(req, res) {
        try {
            let { title, content, type  } = req.body
            // console.log("hiiii", title, content,)
            let getData = await CmsModel.findOne({ title: title, type: type })
            if (getData) {
                res.json({ code: 422, success: false, message: 'this title is all ready exist', })
            } else {
                let obj = {
                    title: title,
                    content: content,
                    type: type,
                    created_by: '607e5136b24182674c4a8ed6',
                }
                let saveData = new CmsModel(obj)
                await saveData.save();
                res.json({ code: 200, success: true, message: 'Cms save successfully', })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async update(req, res) {
        try {
            let { title, content, id } = req.body
            // console.log("hiiii", title, content, id)
            let getData = await CmsModel.findOne({ _id: id })
            if (getData) {
                let obj = {}
                if (title) {
                    obj.title = title
                }
                if (content) {
                    obj.content = content
                }
                let getData1 = await CmsModel.findOneAndUpdate({ _id: id }, { $set: obj })
                res.json({ code: 200, success: true, message: 'Update data successfully', getData1 })
            } else {
                res.json({ code: 404, success: false, message: 'Id not found ', })

            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async get(req, res) {
        try {
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
                lean: true,
                // select: 'name user_type minner_Activity createdAt',
            }
            let query = {}
            // if (req.body.searchData) {
            //     query = {
            //         user_type: 'user',
            //         $or: [{ email: { $regex: req.body.searchData, $options: "i" } },
            //         { name: { $regex: req.body.searchData, $options: "i" } },
            //         { username: { $regex: req.body.searchData, $options: "i" } }]
            //     }
            // }
            let getUser = await CmsModel.paginate(query, options)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: getUser })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
}



module.exports = new Cms();