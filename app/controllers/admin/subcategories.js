// const commenFunction = require('../common/Common')
// const UsersModel = require('../../models/users');
// const NewsModel = require('../../models/news')
// const BlogModel = require('../../models/blogs')
const SubCategoryModel = require('../../models/admin/subcategories')
const ChapterModel = require('../../models/admin/chapters')
const QuestionModel = require('../../models/admin/questions')
// const moment = require("moment");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
class SubCategories {
    constructor() {
        return {
            create: this.create.bind(this),
            get: this.get.bind(this),
            delete: this.delete.bind(this),
            getList: this.getList.bind(this),
            // getListById: this.getListById.bind(this),
            // updateBlogs: this.updateBlogs.bind(this)


            // submitReferral: this.submitReferral.bind(this)
        }
    }

    async create(req, res) {
        try {
            let { name, content, image, category_meta } = req.body
            console.log("hiiii consol", name, category_meta.name)
            let getData = await SubCategoryModel.findOne({ name: name, category: category_meta._id })
            if (getData) {
                res.json({ code: 422, success: false, message: 'This name is all ready exist', })
            } else {
                let obj = {}
                if (name) {
                    obj.name = name
                }
                if (content) {
                    obj.content = content
                }
                if (category_meta) {
                    obj.category = category_meta._id
                    obj.category_meta = category_meta
                }
                let saveData = new SubCategoryModel(obj)
                await saveData.save();
                res.json({ code: 200, success: true, message: 'Save successfully', })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async get(req, res) {
        try {
            let options = {
                page: Number(req.body.page) || 1,
                limit: Number(req.body.limit) || 10,
                sort: { createdAt: -1 },
                lean: true,
            }
            let query = {}
            if (req.body.searchData) {
                query = { $or: [{ name: { $regex: req.body.searchData, $options: "i" } }, { content: { $regex: req.body.searchData, $options: "i" } }] }
            }
            let data = await SubCategoryModel.paginate(query, options)
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async delete(req, res) {
        try {
            //    console.log("news",  req.query._id)
            let data
            data = await SubCategoryModel.findByIdAndRemove({ _id: req.query._id })
            await ChapterModel.deleteMany({ subcategory: req.query._id })
            await QuestionModel.deleteMany({ subcategory: req.query._id })
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "delete successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getList(req, res) {
        try {
            if (req.query._id) {
                let data = await SubCategoryModel.find({ category: req.query._id })
                res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
            } else {
                let data = await SubCategoryModel.find()
                // console.log("news", data)
                res.json({ code: 200, success: true, message: "Get list successfully ", data: data })

            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    // async getListById(req, res){
    //     try {
    //         // console.log("news", data)
    //         res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
    //     } catch (error) {
    //         console.log("Error in catch", error)
    //         res.status(500).json({ success: false, message: "Somthing went wrong", })
    //     }
    // }
    //////////////////////////////////////////////////////end//////////////////////////////////////////////



    async updateNews(req, res) {
        try {
            let { title, content, id, image, status } = req.body
            console.log("hiiii", title, content, id, status)
            let getData = await NewsModel.findOne({ _id: id }).lean()

            if (getData) {
                if (title) {
                    getData.title = title
                }
                if (content) {
                    getData.content = content
                }
                if (image) {
                    getData.image = image
                }
                if (status) {
                    getData.status = status
                }
                console.log("upadate datata", getData, typeof status)
                let update = await NewsModel.findOneAndUpdate({ _id: id }, getData, { new: true })
                res.json({ code: 200, success: true, message: 'news update successfully', data: update })
            } else {
                res.json({ code: 400, success: false, message: 'this news is not exist', })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async updateBlogs(req, res) {
        try {
            let { title, content, id, image, status } = req.body
            console.log("hiiii", title, content, id)
            let getData = await BlogModel.findOne({ _id: id })

            if (getData) {
                let obj = {}
                if (title) {
                    obj.title = title
                }
                if (content) {
                    obj.content = content
                }
                if (image) {
                    obj.image = image
                }
                if (status) {
                    obj.status = status
                }
                let update = await BlogModel.findOneAndUpdate({ _id: id }, { $set: obj }, { new: true })
                res.json({ code: 200, success: true, message: 'news update successfully', data: update })
            } else {
                res.json({ code: 400, success: false, message: 'this news is not exist', })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }

    async createBlogs(req, res) {
        try {
            let { title, content, id, image } = req.body
            let obj = {
                title: title,
                content: content,
                created_by: '607e5136b24182674c4a8ed6',
                image: image
            }
            let getData = await BlogModel.findOne({ title: title })
            if (getData) {
                res.json({ code: 422, success: false, message: 'this title is all ready exist', })
            } else {
                let saveData = new BlogModel(obj)
                await saveData.save();
                res.json({ code: 200, success: true, message: 'blog save successfully', })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async uploadeImage(req, res) {
        try {
            console.log("hiiiiiii", req.body, req.file)
            if (req.file) {
                res.json({ code: 200, success: true, message: 'uploade successfully', data: req.file })
            } else {
                res.json({ success: false, message: "Internal server error", })
            }

        } catch (error) {
            res.json({ success: false, message: "Internal server error", })
        }
    }
    async uploadeImagebase64(req, res) {
        try {
            if (req.body.image) {
                let data = await commenFunction._uploadBase64image(req.body.image, 'NewsAndBlogs')
                var path2 = data.replace(/\\/g, "/");
                res.json({ code: 200, success: true, message: 'uploade successfully', data: path2 })
            } else {
                res.json({ code: 400, success: false, message: "order_image is require", })
            }

        } catch (error) {
            res.json({ code: 400, success: false, message: "Internal server error", })
        }
    }


}



module.exports = new SubCategories();