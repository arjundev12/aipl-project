const commenFunction = require('../common/Common')
// const UsersModel = require('../../models/users');
// const NewsModel = require('../../models/news')
// const BlogModel = require('../../models/blogs')
const QuestionModel = require('../../models/admin/questions')
var XLSX = require('xlsx');
const fs = require('fs').promises
class Question {
    constructor() {
        return {
            create: this.create.bind(this),
            get: this.get.bind(this),
            uploadeXlsSheet: this.uploadeXlsSheet.bind(this),
            uploadeImagebase64: this.uploadeImagebase64.bind(this),
            delete: this.delete.bind(this),
            insertXlsSheetData: this.insertXlsSheetData.bind(this)
            // submitReferral: this.submitReferral.bind(this)
        }
    }

    async create(req, res) {
        try {
            let { question, content, id, category_meta, subcategory_meta, chapter_meta, options, difficulty_level, info, pin, flag } = req.body
            //    console.log("hiiii", category_meta, subcategory_meta, chapter_meta )

            let obj = {}
            if (question) {
                obj.question = question
            }
            if (content) {
                obj.content = content
            }
            if (info) {
                obj.info = info
            }
            if (pin) {
                obj.pin = pin
            }
            if (flag) {
                obj.flag = flag
            }
            if (difficulty_level) {
                obj.difficulty_level = difficulty_level
            }
            if (category_meta) {
                obj.category = category_meta._id
                obj.category_meta = category_meta
            }
            if (subcategory_meta) {
                obj.subcategory = subcategory_meta._id
                obj.subcategory_meta = subcategory_meta
            }
            if (chapter_meta) {
                obj.chapter = chapter_meta._id
                obj.chapter_meta = chapter_meta
            }
            if (options) {
                if (options.D) {
                    obj.options = [{ A: options.A }, { B: options.B }, { C: options.C }, { D: options.D }]
                } else {
                    obj.options = [{ A: options.A }, { B: options.B }, { C: options.C }]
                }
                obj.correct_index = options.answer == 'A' ? 0 : options.answer == 'B' ? 1 : options.answer == 'C' ? 2 : 3
            }
            let saveData = new QuestionModel(obj)
            await saveData.save();
            res.json({ code: 200, success: true, message: 'news save successfully', })
            // let getData = await QuestionModel.findOne({ question: question })
            // if (getData) {
            //     res.json({ code: 422, success: false, message: 'this question is all ready exist', })
            // } else {

            // }

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
                query = { $or: [{ question: { $regex: req.body.searchData, $options: "i" } }, { content: { $regex: req.body.searchData, $options: "i" } }] }
            }
            let data = await QuestionModel.paginate(query, options)
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
            let data = await QuestionModel.findByIdAndRemove({ _id: req.query._id })
            // let data1 = await ChapterModel.deleteMany({subcategory: req.query._id})
            // let data1 = await QuestionModel.deleteMany({subcategory: req.query._id})
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "delete successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
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
                let data = await commenFunction._uploadBase64image(req.body.image, 'questionImage')
                var path2 = data.replace(/\\/g, "/");
                res.json({ code: 200, success: true, message: 'uploade successfully', data: path2 })
            } else {
                res.json({ code: 400, success: false, message: "order_image is require", })
            }

        } catch (error) {
            res.json({ code: 400, success: false, message: "Internal server error", })
        }
    }
    async uploadeXlsSheet(req, res) {
        try {
            if (req.file.path) {
                var path2 = req.file.path.replace(/\\/g, "/");
                res.json({ code: 200, success: true, message: 'uploade successfully', data: path2 })
            } else {
                res.json({ code: 400, success: false, message: "order_image is require", })
            }

        } catch (error) {
            res.json({ code: 400, success: false, message: "Internal server error", })
        }
    }
    async insertXlsSheetData(req, res) {
        try {
            let { path, category_meta, subcategory_meta, chapter_meta } = req.body
            var workbook = await XLSX.readFile(path);
            let y = workbook.SheetNames[0]
            let worksheet = workbook.Sheets[y];
            let jsonData = await XLSX.utils.sheet_to_json(worksheet)
            let newArray = []
            if (jsonData.length >= 0) {
                for (const item of jsonData) {
                    let obj = {}
                    obj.question = item.question
                    if (item.option_D) {
                        obj.options = [{ A: item.option_A }, { B: item.option_B }, { C: item.option_C }, { D: item.option_D }]
                    } else {
                        obj.options = [{ A: item.option_A }, { B: item.option_B }, { C: item.option_C }]
                    }
                    obj.correct_index = item.answer == 'A' ? 0 : item.answer == 'B' ? 1 : item.answer == 'C' ? 2 : 3
                    obj.difficulty_level = item.difficulty_level
                    obj.info = item.info
                    if (category_meta) {
                        obj.category = category_meta._id
                        obj.category_meta = category_meta
                    }
                    if (subcategory_meta) {
                        obj.subcategory = subcategory_meta._id
                        obj.subcategory_meta = subcategory_meta
                    }
                    if (chapter_meta) {
                        obj.chapter = chapter_meta._id
                        obj.chapter_meta = chapter_meta
                    }
                    if (item.pin) {
                        obj.pin = item.pin
                    }
                    if (item.flag) {
                        obj.flag = item.flag
                    }
                    newArray.push(obj)
                }
            }
           await fs.unlink(path);
            let savedata = await QuestionModel.insertMany(newArray)
            res.json({ code: 200, success: true, message: 'Save successfully', data: newArray })
        } catch (error) {
            console.log("error in catch", error)
            res.json({ code: 400, success: false, message: "Internal server error",error })
        }
    }
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




}



module.exports = new Question();