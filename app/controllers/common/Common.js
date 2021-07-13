

const NewsModel = require('../../models/news')
const BlogModel = require('../../models/blogs')
const CmsModel = require('../../models/cms')
const walletModel = require('../../models/wallet')
const base64Img = require('base64-img')
const sharp = require ('sharp')
const fs = require('fs')
var jwt = require('jsonwebtoken');

class Common {
    constructor() {
        return {
            getBlogs: this.getBlogs.bind(this),
            getNews: this.getNews.bind(this),
            viewBlogs: this.viewBlogs.bind(this),
            viewNews: this.viewNews.bind(this),
            _uploadBase64image: this._uploadBase64image.bind(this),
            _validateBase64: this._validateBase64.bind(this),
            getCms: this.getCms.bind(this),
            viewCms: this.viewCms.bind(this),
        }
    }
    
      async getNews(req, res) {
        try {
            let options = {
                page: Number(req.body.page) || 1,
                limit: Number(req.body.limit) || 10,
                sort: { createdAt: -1 },
                lean: true,
            }
            let query = {}
            if (req.body.searchData ){
                query = { $or: [{ title: { $regex: req.body.searchData, $options: "i" } }, { content: { $regex: req.body.searchData, $options: "i" } }] }
            }
            let data = await NewsModel.paginate(query, options)
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }

    async viewNews(req, res) {
        try {
            if(!req.query._id){
                res.json({ code: 400, success: false, message: "_id is required", data: data }) 
               }else{
                let query = {_id:req.query._id, status: 'active' }
                let data = await NewsModel.findOne(query)
                // console.log("NewsModel", data)
                res.json({ code: 200, success: true, message: "Get data successfully ", data: data })
               }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getBlogs(req, res) {
        try {
            let options = {
                page: Number(req.body.page) || 1,
                limit: Number(req.body.limit) || 10,
                sort: { createdAt: -1 },
                lean: true,
            }
            let query = {}
            if (req.body.searchData ){
                query = { $or: [{ title: { $regex: req.body.searchData, $options: "i" } }, { content: { $regex: req.body.searchData, $options: "i" } }] }
            }
            console.log("req.body.searchData",req.body)
            let data = await BlogModel.paginate(query, options)
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async viewBlogs(req, res) {
        try {
           if(!req.query._id){
            res.json({ code: 400, success: false, message: "_id is required", data: data }) 
           }else{
            let query = {_id:req.query._id, status: 'active' }
            let data = await BlogModel.findOne(query)
            // console.log("BlogModel", data)
            res.json({ code: 200, success: true, message: "Get data successfully ", data: data })
           }
           
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async _uploadBase64image(base64,child_path) {
        try {
            let parant_path = 'public'
            let storagePath = `${parant_path}/${child_path}`;
            if (!fs.existsSync(parant_path)) {
                fs.mkdirSync(parant_path);
            }
            if(!fs.existsSync(storagePath)){
                fs.mkdirSync(storagePath);
             }
            console.log(global.globalPath,"............",'driver', storagePath)
            let filename =`${Date.now()}_image`
             let base64Image = await this._validateBase64(base64)
            let filepath = await base64Img.imgSync(base64, storagePath, filename);
            console.log("filepath", filepath)
            return filepath
        } catch (error) {
            console.error("error in _createWallet", error)
        }
    }

    async _validateBase64( base64Image, maxHeight = 640, maxWidth = 640 ){
        try {
            const destructImage = base64Image.split(";");
            const mimType = destructImage[0].split(":")[1];
            const imageData = destructImage[1].split(",")[1];

            let resizedImage = Buffer.from(imageData, "base64")
            resizedImage = await sharp(resizedImage).resize(maxHeight, maxWidth).toBuffer()
            return `data:${mimType};base64,${resizedImage.toString("base64")}`
            
        } catch (error) {
            console.error("error in _validateBase64", error)
        }
    }
    async getCms(req, res) {
        try {
            let query = {}
            let data = await CmsModel.find(query)
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async viewCms(req, res) {
        try {
            if(req.query.type){
                let data = await CmsModel.findOne({type:req.query.type})
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
            }else{
                res.json({ code: 400, success: false, message: "type is required "})
            }
            // console.log("news", data)
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }

  

}



module.exports = new Common();
