

const commenFunction = require('../../middlewares/common')
const UsersModel = require('../../models/users');
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const TransactionModal = require('../../models/transactions')
const DocumentsModel = require('../../models/userDocument')

class adminAuth {
    constructor() {
        return {
            loginAdmin: this.loginAdmin.bind(this),
            getUser: this.getUser.bind(this),
            adminAddUser: this.adminAddUser.bind(this),
            AdminUpdateUser: this.AdminUpdateUser.bind(this),
            getTransaction: this.getTransaction.bind(this),
            getKycDoc: this.getKycDoc.bind(this),
            getUserKyc:this.getUserKyc.bind(this),
            getTotalCount: this.getTotalCount.bind(this)

        }
    }

    async loginAdmin(req, res) {
        try {
            let { email, password } = req.body
            let getUser = await UsersModel.findOne({ $and: [{ email: email }, { login_type: 'manual' }, { user_type: 'admin' }] },
                { username: 1, email: 1, Referral_id: 1, password: 1, login_type: 1 }).lean()
            // console.log("getUser", getUser)
            if (getUser) {
                let verifypass = await bcrypt.compareSync(password, getUser.password);
                if (verifypass) {
                    let stoken = {
                        _id: getUser._id,
                        email: getUser.email
                    }
                    getUser.token = await jwt.sign(stoken,process.env.SUPERSECRET, { expiresIn: '1d' });
                    res.json({ code: 200, success: true, message: 'login successfully', data: getUser })
                } else {
                    res.json({ code: 404, success: false, message: 'invalid password',})
                }
            } else {
                res.json({ code: 404, success: false, message: 'Email is not register', })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async getUser(req, res) {
        try {
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
                lean: true,
                // select: 'name user_type minner_Activity createdAt',
            }
            let query = {user_type: 'user'}
            if (req.body.searchData) {
                query = {
                    user_type: 'user',
                    $or: [{ email: { $regex: req.body.searchData, $options: "i" } },
                    { name: { $regex: req.body.searchData, $options: "i" } },
                    { username: { $regex: req.body.searchData, $options: "i" } }]
                }
            }
            let getUser = await UsersModel.paginate(query, options)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: getUser })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async adminAddUser(req, res) {
            try {
                let saveData
                let data
                let stoken
                let error
                let { name, email,username, password } = req.body
                // if (login_type == 'manual') {
                  let  getUser = await UsersModel.findOne({ $and: [{ email: email }, { login_type: 'manual' }, { user_type: 'user' }] })
                    console.log("getUser", getUser)
                    if (getUser) {
                        console.log("getUser", getUser)
                        error = true
                    } else {
                        const salt = bcrypt.genSaltSync(10);
                        const hash = bcrypt.hashSync(password, salt);
                        saveData = new UsersModel({
                            name: name,
                            username: username,
                            email: email,
                            password: hash,
                            login_type: 'manual',
                            Referral_id: ""
                        })
                        data = await saveData.save();
                    }
                // }
                //  else if (social_media_key && social_media_key != "") {
                //     getUser = await UsersModel.findOne({ $and: [{ email: email }, { login_type: login_type }, { user_type: 'user' }] })
                //     if (getUser) {
                //         data = await UsersModel.findOneAndUpdate(
                //             {
                //                 $and: [{ email: req.body.email }, { login_type: login_type }]
                //             },
                //             {
                //                 $set: { social_media_key: social_media_key }
                //             }, { new: true }).lean()
    
                //             data.social_status = "old"
                //     } else {
                //         let obj =  {
                //             name: name? name: "",
                //             email: email,
                //             username: "",
                //             login_type: login_type,
                //             Referral_id: await this._generateRefID(),
                //             social_media_key: social_media_key
    
                //         }
                //             // if(username){
                //             //     obj.usename = username
                //             // }else{
                //             //     obj.usename = ""  
                //             // }
                          
                //         saveData = new UsersModel(obj)
                //        let data1= await saveData.save();
                //          data= await UsersModel.findOne({_id:data1._id }).lean()
                //         data.social_status = "new"
                //         await commenFunction._createWallet(data._id, 'user')
                //     }
    
                // }
                if (data) {
                    // stoken = {
                    //     _id: data._id,
                    //     email: data.email
                    // }
                    // data.token = await jwt.sign(stoken, process.env.SUPERSECRET, { expiresIn: '7d' });
                    return res.json({ code: 200, success: true, message: 'Data save successfully', data: data })
                } else if (error) {
                    res.json({ code: 404, success: false, message: 'Email already exist', data: getUser.email })
                } else {
                    res.json({ success: false, message: "Somthing went wrong", })
                }
    
            } catch (error) {
                console.log("Error in catch", error)
                res.json({ success: false, message: "Somthing went wrong", })
            }
    
    }
    //////////////////////////////////////////////////////////end///////////////////////////////////////
    async getUserKyc(req, res) {
        try {
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
                lean: true,
                // select: 'name user_type minner_Activity createdAt',
            }
            let query = {user_type: 'user',  is_complete_kyc :{ $ne : '0'},}
            if (req.body.searchData) {
                query = {
                    user_type: 'user',
                    is_complete_kyc :{ $ne : '0'},
                    $or: [{ email: { $regex: req.body.searchData, $options: "i" } },
                    { name: { $regex: req.body.searchData, $options: "i" } },
                    { username: { $regex: req.body.searchData, $options: "i" } }]
                }
            }
            let getUser = await UsersModel.paginate(query, options)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: getUser })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async AdminUpdateUser(req, res) {
        try {
            let { _id, name, email,country_code, username, number, profile_pic, login_type, country, reddit_username, minner_Activity ,is_number_verify,is_complete_kyc,block_user} = req.body
            // console.log("getUser",_id, block_user)
            // let array = [{ _id: _id }, { login_type: login_type }]
            let query = {_id: _id }
            // if (email) {
            //     array.push({
            //         email: email
            //     })
            // }
            let getUser = await UsersModel.findOne(query).lean()
            // console.log("getUser", getUser)
            if (getUser) {
                let updateData = {}
                if (name && name != "") {
                    updateData.name = name
                }
                if (username && username != "") {
                    updateData.username = username
                }
                if (number && number != "") {
                    updateData.number = number
                    // updateData.is_number_verify = "2"
                }
                if (country && country != "") {
                    updateData.country = country
                }
                if (profile_pic && profile_pic != "") {
                    updateData.profile_pic = profile_pic
                }
                if (minner_Activity && minner_Activity != "") {
                    updateData.minner_Activity = minner_Activity
                }

                if (reddit_username && reddit_username != "") {
                    updateData.reddit_username = reddit_username
                }
                if (is_number_verify && is_number_verify != "") {
                    updateData.is_number_verify = is_number_verify
                }
                if (is_complete_kyc && is_complete_kyc != "") {
                    updateData.is_complete_kyc = is_complete_kyc
                }
                if (country_code && country_code != "") {
                    updateData.country_code = country_code
                }
                if (block_user && block_user != "") {
                    updateData.block_user = block_user
                }
                
                
                let updateUser = await UsersModel.findOneAndUpdate(query, { $set: updateData }, { new: true })
                res.json({ code: 200, success: true, message: 'profile update successfully', data: updateUser })
            } else {
                res.json({ code: 404, success: false, message: 'Email is not register', })
            }
        } catch (error) {
            console.log("Error in catch", error)
            if (error.codeName == 'DuplicateKey') {
                res.json({ code: 400, success: false, message: `${Object.keys(error.keyValue)} is already exist`, })
            } else {
                res.json({ code: 500, success: false, message: "Somthing went wrong", })
            }
        }
    }
    async getTotal(transaction_type ){
        let getUser 
        try {
             getUser = await TransactionModal.aggregate([
            {
                $group :{
                    _id: '$transaction_type',
                    totalAmount: {
                        $sum: "$amount"
                    },
                }
            }
        ])
        // console.log("getUsertotal amount",getUser )
        } catch (error) {
            console.log("error in catch 88",error ) 
        }
         return getUser
    }
    async getTransaction(req, res) {
        try {
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
                lean: true,
                // select: 'name user_type minner_Activity createdAt',
            }
            let query = {}
            let total_amount

            if (req.body.type && req.body.type != "") {
                query.type = req.body.type
            }
            if (req.body.transaction_type && req.body.transaction_type != "") {
                query.transaction_type = req.body.transaction_type
                // console.log("req.body.transaction_typereq.body.transaction_type", req.body.transaction_type)
                total_amount= await this.getTotal()

            }
             if (req.body.toId && req.body.toId != "") {
                // { title: { $regex: searchData, $options: "i" }
                query.to_id = { $regex: req.body.toId, $options: "i" }
            } 
            if (req.body.todayDate && req.body.todayDate != "") {
                query.createdAt = { "$gte": new Date(req.body.todayDate).toISOString() }// + "T00:00:00Z" 
                query.createdAt["$lte"] = new Date(req.body.todayDate).toISOString()// + "T12:00:00Z"
            } 
            if (req.body.toDate && req.body.toDate != "") {
                query.createdAt = { "$lte": req.body.toDate + "T12:00:00Z" }
            } 
            if (req.body.fromDate && req.body.fromDate != "") {
                query.createdAt["$gte"] = new Date(req.body.fromDate)// + "T00:00:00Z"
            } 
            if (req.body.sort && req.body.sort != "") {
                options.sort = req.body.sort
            }
            let getUser = await TransactionModal.paginate(query, options)
            getUser.total_amount = total_amount
            res.json({ code: 200, success: true, message: "Get list successfully ", data: getUser })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    
    async getKycDoc(req, res ){
        try {
            let id = req.query.id
             let getUser = await DocumentsModel.findOne({owner: id})
             if(getUser){
                 res.json({code :200, success: true, message: "Get data successfully", data: getUser})
             }else{
                res.json({code :404, success: false, message: "Not found", data: getUser})
             }
        // console.log("getUsertotal amount",getUser )
        } catch (error) {
            console.log("error in catch 88",error ) 
            res.json({code :404, success: false, message: "Not found"})
        }
    }
    async getTotalCount(req, res ){
        try {
            let query1 = { "$match": { $and: [{block_user: '0' }] } }
            let getUser = await UsersModel.aggregate([  {
                $group: {
                    _id: {
                      minner_Activity: "$minner_Activity" ,
                      block_user: "$block_user"
                    },
                    COUNT: {
                        $sum: 1
                    }
                }
            },])
            res.json({code :200, success: true, message: "Get data successfully", data: getUser})
        // console.log("getUsertotal amount",getUser )
        } catch (error) {
            console.log("error in catch 88",error ) 
            res.json({code :404, success: false, message: "Not found"})
        }
    }
}



module.exports = new adminAuth();