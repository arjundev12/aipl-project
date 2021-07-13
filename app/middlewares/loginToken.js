const jwt = require('jsonwebtoken');
// const request = require('request');
const UsersModel = require('../models/users')
console.log("process of env", process.env.SUPERSECRET)

class TokenVerification {
    constructor() {
        return {
            jwtVerify: this.jwtVerify.bind(this),
            // Checkvaliduser: this.Checkvaliduser.bind(this),
            // CheckUserlogin: this.CheckUserlogin.bind(this)
        }
    }

    async jwtVerify(req, res, next) {
        // console.log("headers.........",req.headers)
        try {
            jwt.verify(req.headers.token, process.env.SUPERSECRET, async (err, logindecoded) => {
                if (err) {
                    return res.json({ success: false, status: '401', data: 'Failed to authenticate token.' });
                } else {
                    console.log("logindecoded", logindecoded);
                   const userdata= await UsersModel.findOne({email: logindecoded.email})
                    // console.log(logindecoded);
                    if(userdata.user_type ==='admin'){
                        return next();
                    }else{
                        return res.json({ success: false, status: '401', data: 'You are not admin so please use admin credential' });
                    }
                }
            });

        } catch (e) {
            return res.json({ success: false, status: '401', data: 'Failed to authenticate token.', error: e });
        }

    };




    //check token  users

    // vierifi jwt for users
    async CheckUserlogin(req, res, next) {
        try {
            let token = req.headers.token || req.headers.auth
            let email = req.headers.email
            if (token) {
                jwt.verify(token, config.superSecret, async (err, decoded) => {
                    console.log(decoded);
                    if (err) {
                        if (err.name == "TokenExpiredError") {
                            let data = await this._checkLoginStatus(email)
                            console.log("data, ", data)
                            if (data) {
                                console.log("data, ", data)
                                let stoken = {
                                    id: data.id,
                                    email: data.email,
                                }
                                let token1 = await jwt.sign(stoken, config.superSecret, { expiresIn: '7d' })
                                req.headers.token = token1
                                next()
                            } else {
                                return res.json({ code: 401, success: false, message: "jwt expired" })
                            }
                        } else {
                            return res.json({ code: 401, success: false, message: "authentication failed" })
                        }
                    }
                    else {
                        //   req.users = decoded;
                        let data = await this._checkLoginStatus(email)
                        console.log("success", data);
                        if (data) {
                            next()
                        } else {
                            return res.json({ code: 400, success: false, message: "authentication failed" })
                        }

                    }
                })
            } else {
                return res.json({ code: 400, success: false, message: "authentication failed" })
            }

        } catch (e) {
            return res.json({ code: 400, success: false, message: "authentication failed" })
        }

    }

}

module.exports = new TokenVerification();


