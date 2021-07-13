

// const walletModel = require('../models/wallet')
// const sgMail = require('@sendgrid/mail')
// const constant = require('../utilities/constants')
// // console.log("api key1111", process.env.SENDGRID_API_KEY1)
// sgMail.setApiKey(process.env.SENDGRID_API_KEY1)
// const base64Img = require('base64-img')
// var jwt = require('jsonwebtoken');

// const nodemailer = require('nodemailer');
// const fs = require('fs');
// const transactionModel = require('../models/transactions');

class Common {
    constructor() {
        return {
            // jwtDecode: this.jwtDecode.bind(this),
            // emailsenderdyanmic: this.emailsenderdyanmic.bind(this),
            // _createWallet: this._createWallet.bind(this),
            // _sendMail: this._sendMail.bind(this),
            // _uploadBase64Profile: this._uploadBase64Profile.bind(this),
            // _createHistory: this._createHistory.bind(this),
            // _updateRank: this._updateRank.bind(this),
            // _getAllRank: this._getAllRank.bind(this)
        }
    }

    async _updateRank(id) {
        try {
            console.log("index,,,,,,", typeof id,)
            let id1 = typeof id == 'object' ? id.toString() : id
            let Rank = await walletModel.find().sort({ total_amount: -1 })
            const index = Rank.findIndex(element => element.user_id == id1);
            console.log("index,,,,,,", index)
            return index
        } catch (error) {
            console.error("error in _createWallet", error)
        }
    }
    async _getAllRank(id) {
        try {
            let Rank = await walletModel.find().sort({ total_amount: -1 })
            return Rank
        } catch (error) {
            console.error("error in _createWallet", error)
        }
    }
    async _sendMail(toMail, text = constant.defaultMsg, subject = constant.defaultSub) {
        try {
            const msg = {
                to: toMail, // Change to your recipient
                from: constant.fromMail, // Change to your verified sender
                subject: subject,
                // text: text,
                html: `<strong>${text}</strong>`,
            }

            let sendMail = await sgMail.send(msg)
            console.log("sendMail", sendMail)
        } catch (error) {
            console.error("error in _sendMail", error)
        }
        return true
    }
    async jwtDecode(token) {
        try {
            let tokeData = await jwt.verify(token, config.superSecret)
            if (tokeData) {
                return tokeData
            }
        } catch (error) {
            console.log("failed authentication in jwt decode")
        }

    }


    async emailsenderdyanmic(data) {
        if (data.from && Array.isArray(data.to) && data.password && data.subject && data.text) {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: data.from,
                    pass: data.password
                },
                port: 587,
                host: 'smtp.gmail.com',
                // tls: {
                //   rejectUnauthorized: false
                // }
            });

            try {
                var info = await transporter.sendMail({
                    from: data.from,
                    to: data.to,
                    subject: data.subject,
                    text: data.text
                });
                console.log('Data email', info);
                return "Mail send";
            } catch (err) {
                console.log('Error while sending mail', err);
                return "please check email or password or please turn on less secure app access";
            }
        }
        else {
            return "please send proper parameter to the function";
        }
    }
    async _createWallet(id, type) {
        try {
            let saveData1 = {}
            saveData1.wallet_type = type;
            saveData1.user_id = id
            saveData1.status = 'active'

            let saveData = new walletModel(saveData1)
            await saveData.save();
            console.log("wallet create successfully")
        } catch (error) {
            console.error("error in _createWallet", error)
        }
        return true

    }

    async _uploadBase64Profile(base64, child_path) {
        try {
            let parant_path = 'public'
            let storagePath = `${parant_path}/${child_path}`;
            if (!fs.existsSync(parant_path)) {
                fs.mkdirSync(parant_path);
            }
            if (!fs.existsSync(storagePath)) {
                fs.mkdirSync(storagePath);
            }
            console.log(global.globalPath, "............", 'driver', storagePath)
            let filename = `${Date.now()}_image`
            //  let base64Image = await this._validateBase64(base64)
            let filepath = await base64Img.imgSync(`data:image/jpeg;base64,${base64}`, storagePath, filename);
            console.log("filepath", filepath)
            return filepath
        } catch (error) {
            console.error("error in _uploadBase64Profile", error)
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
    async _createHistory(toId = null, fromId = null, amount, type, transactionType) {
        try {
            let saveData = {
                transaction_type: transactionType,
                type: type,
            }
            if (fromId) {
                saveData.from_id = fromId
            } if (toId) {
                saveData.to_id = toId
            }
            if (amount) {
                saveData.amount = Number(amount)
            }
            let saveData1 = new transactionModel(saveData)
            await saveData1.save()
            return
        } catch (error) {
            console.error("error in _createWallet", error)
        }
    }

}

module.exports = new Common();
