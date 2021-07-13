const commenFunction = require('../../middlewares/common')
const UsersModel = require('../../models/users');
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const _ = require('underscore');

class users {
    constructor() {
        return {
            signUp: this.signUp.bind(this),
            verifyOtp: this.verifyOtp.bind(this),
            login: this.login.bind(this),
            
        }
    }

    //create sign_up Api
    async _generateRefID() {
        try {
            let flage = false
            let fourDigitsRandom
            do {
                fourDigitsRandom = await Math.floor(1000 + Math.random() * 9000);
                let getData = await UsersModel.find({ Referral_id: fourDigitsRandom.toString() })
                if (getData.length > 0) {
                    flage = true
                } else {
                    flage = false
                }
            }
            while (flage);

            return '@' + fourDigitsRandom

        } catch (error) {
            throw error
        }

    }
    async rendomOtp() {
        try {
            let fourDigitsRandom
            fourDigitsRandom = await Math.floor(1000 + Math.random() * 9000);
            return fourDigitsRandom

        } catch (error) {
            throw error
        }

    }
    async signUp(req, res) {
        try {
            let saveData
            let data = {}
            let stoken
            let error
            let getUser
            let { name, email,profile_pic,state,country,pin,country_code,device_type, contact_number,gender,address,DOB,social_id,password, social_type, } = req.body
            if (social_type == 'manual') {
                getUser = await UsersModel.findOne({ $and: [{ $or: [{email: email},{ contact_number: contact_number }] }, { social_type: social_type }, { user_type: 'user' }] })
                // console.log("getUser", getUser)
                if (getUser) {
                    error = true
                } else {
                    let imagePath
                    if (profile_pic && profile_pic != "") {
                        let data = await commenFunction._uploadBase64image(profile_pic, 'ProfileImage')
                        imagePath = data.replace(/\\/g, "/");
                    } 
        
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(password, salt);
                    saveData = new UsersModel({
                        name: name,
                        profile_pic: imagePath,
                        email: email,
                        password: hash,
                        contact_number: contact_number,
                        gender: gender,
                        address: address,
                        country_code: country_code,
                        pin: pin,
                        state: state,
                        country: country,
                        DOB: DOB,
                        social_id: "",
                        social_type: social_type,
                        device_type: device_type
                    })
                    data = await saveData.save();
                }
            } else{
                getUser = await UsersModel.findOne({ $and: [{ email: email }, { SocialType: SocialType }, { user_type: 'user' }] })
                if (getUser) {
                    data = getUser
                } else {
                    let imagePath
                    if (profile_pic && profile_pic != "") {
                        let data = await commenFunction._uploadBase64image(profile_pic, 'ProfileImage')
                        imagePath = data.replace(/\\/g, "/");
                    } 
                    // const salt = bcrypt.genSaltSync(10);
                    // const hash = bcrypt.hashSync(password, salt);
                    saveData = new UsersModel({
                        name: name,
                        profile_pic: imagePath,
                        email: email,
                        contact_number: contact_number,
                        gender: gender,
                        address: address,
                        country_code: country_code,
                        pin: pin,
                        state: state,
                        country: country,
                        DOB: DOB,
                        social_id: social_id,
                        social_type: social_type,
                        device_type: device_type
                    })
                    data = await saveData.save();
                }
            }
            if (data && !_.isEmpty(data) ) {
                stoken = {
                    _id: data._id,
                    email: data.email
                }
                // data.token
                console.log("dataatatat",data)
                let token = await jwt.sign(stoken, process.env.SUPERSECRET, { expiresIn: '7d' });
                return res.json({ code: 200, success: true, message: 'Data save successfully', data: token })
            } else if (error) {
                res.json({ code: 404, success: false, message: 'Email/Number already exist', data: {email: getUser.email, contact_number: getUser.contact_number} })
            } else {
                res.json({ success: false, message: "Somthing went wrong", })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.json({ success: false, message: "Somthing went wrong", })
        }

    }
    async login(req, res) {
        try {
            let { email,contact_number, password } = req.body
            let getUser = await UsersModel.findOne({ $and: [{ $or: [{email: email},{ contact_number: contact_number }] }, { social_type: 'manual' }, { user_type: 'user' }] }).lean()
           if (getUser ) {
            if(getUser.block_user =='1'){
                return res.json({ code: 404, success: false, message: 'User is blocked by admin', })
             }else {
                let verifypass = await bcrypt.compareSync(password, getUser.password);
                if (verifypass) {
                    let stoken = {
                        _id: getUser._id,
                        email: getUser.email
                    }
                    getUser.token = await jwt.sign(stoken, process.env.SUPERSECRET, { expiresIn: '7d' });
                    // if(getUser.profile_pic !=""){
                    //     getUser.imageUrl = Constants.imageUrl + getUser.profile_pic
                    // }else{
                    //     getUser.imageUrl = Constants.imageUrl + Constants.defaultImge
                    // }
                    // let imagenew = 
                    // getUser.imageUrl = Constants.imageUrl + getUser.profile_pic != ""?getUser.profile_pic :  Constants.defaultImge
                    res.json({ code: 200, success: true, message: 'login successfully', data: getUser })
                } else {
                    res.json({ code: 404, success: false, message: 'invalid password', })
                }
             }
              
            } else {
                res.json({ code: 404, success: false, message: 'Email is not register', })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.json({ success: false, message: "Somthing went wrong", })
        }
    }
    async verifyOtp(req, res) {
        try {

            let { number, otp } = req.body
            let getUser = await UsersModel.findOne({ number: Number(number) }).lean();
            // console.log("getUser", getUser)
            if (getUser) {
                let dt = moment().utcOffset("+05:30").format("DD.MM.YYYY HH.mm.ss");
                let endDate = moment(dt, "DD.MM.YYYY HH.mm.ss");
                let startDate = moment(getUser.otp_details.otp_time, "DD.MM.YYYY HH.mm.ss");
                // console.log(",,,", getUser.otp_details.otp != Number(otp), getUser.otp_details.otp, Number(otp))
                if (getUser.otp_details.otp != Number(otp)) {
                    errorMessage = "Otp is invalid"
                }
                if (Number(endDate.diff(startDate, 'seconds')) > 120) {
                    errorMessage = "Time is expired"

                } if (Number(endDate.diff(startDate, 'seconds')) <= 120 && getUser.otp_details.otp == Number(otp)) {
                    getUser.otp_details.status = true
                    getUser.otp_details.otp = 0
                    data = await UsersModel.findOneAndUpdate({ _id: getUser._id }, getUser)
                    successMessage = "Otp verified successfully"
                }
            } else {
                errorMessage = "Authentication is Failed"
            }
            if (errorMessage) {
                res.json({ success: false, message: errorMessage })
            } else {
                res.json({ success: true, message: successMessage })
            }
        } catch (error) {
            console.log("error in catch", error)
            res.json({ success: false, message: "Somthing went wrong", data: null })
        }

    }

}

module.exports = new users();