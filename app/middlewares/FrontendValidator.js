// const {
//     check,
//     validationResult
// } =  require('express-validator');

class FrontEntValidator {
    constructor() {
        return {
            signUp: this.signUp.bind(this),
            verifyOtp: this.verifyOtp.bind(this),
            login: this.login.bind(this),
            updateProfile: this.updateProfile.bind(this),
            submitReferral: this.submitReferral.bind(this),
            verifyforgot: this.verifyforgot.bind(this),
            setForgotPass: this.setForgotPass.bind(this),
            chekUserName: this.chekUserName.bind(this),
            chekRedditUserName: this.chekRedditUserName.bind(this),
            resetPassword: this.resetPassword.bind(this)
        }
    }
    async _validationErrorsFormat(req) {
        var errors = req.validationErrors();
        if (errors) {
            var response = [];
            var temp = [];
            errors.forEach(function (err) {
                // check for duplicate error message
                if (temp.indexOf(err.param) == -1) {
                    response.push(err.msg);
                }
                temp.push(err.param);
            });
            return response;
        }
    }

    
    async signUp(req, res, next) {
        // return next();
        // console.log("request.body", req.body)
        if (req.body.social_type== 'manual'){
            if (Object.keys(req.body).length <= 16) {
                req.checkBody({
                    user_id: {
                        notEmpty: true,
                        errorMessage: { "field_name": "user_id", "error_msg": 'number/email is required' },
                    },
                    password: {
                        notEmpty: true,
                        errorMessage: { "field_name": "password", "error_msg": 'password is required' },
                    },
                    social_type: {
                        notEmpty: true,
                        errorMessage: { "field_name": "social_type", "error_msg": 'social_type is required' },
                    },
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
        }else{
            if (Object.keys(req.body).length <= 16) {
                req.checkBody({
                    name: {
                        notEmpty: true,
                        errorMessage: { "field_name": "name", "error_msg": 'name is required' },
                    },
                    email: {
                        notEmpty: true,
                        errorMessage: { "field_name": "name", "error_msg": 'email is required' },
                    },
                    social_id: {
                        notEmpty: true,
                        errorMessage: { "field_name": "social_id", "error_msg": 'social_id is required' },
                    },
                    social_type: {
                        notEmpty: true,
                        errorMessage: { "field_name": "login_type", "error_msg": 'login_type is required' },
                    },
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        } 
        }
    }
    async login (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=4) {
                req.checkBody({
                    user_id: {
                        notEmpty: true,
                        errorMessage: { "field_name": "user_id", "error_msg": 'user_id is required' },
                    },
                    password: {
                        notEmpty: true,
                        errorMessage: { "field_name": "password", "error_msg": 'password is required' },
                    },
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async updateProfile (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=11) {
                req.checkBody({
                    user_id: {
                        notEmpty: true,
                        errorMessage: { "field_name": "user_id", "error_msg": 'user_id is required' },
                    },
                    social_type: {
                        notEmpty: true,
                        errorMessage: { "field_name": "social_type", "error_msg": 'social_type is required' },
                    }
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    
    ////////////////////////////////////////////////////////////////////////end ba panal/////////////////////////////////////////////
    async verifyOtp (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    number: {
                        notEmpty: true,
                        matches: {
                            // more than one options must be passed as arrays
                            options: /^[0-9]{6,10}$/i,
                            // errorMessage: 'Mobile number should contain minimum 10 number'
                            errorMessage: { "field_name": "number", "error_msg": 'Mobile number should contain minimum 6 number' },
                        },
                        errorMessage: { "field_name": "number", "error_msg": 'Contact Number is required' },
                    },
                    otp: {
                        notEmpty: true,
                        matches: {
                            // more than one options must be passed as arrays
                            options: /^[0-9]{4,4}$/i,
                            // errorMessage: 'Mobile number should contain minimum 10 number'
                            errorMessage: { "field_name": "otp", "error_msg": 'Otp should contain minimum 4 number' },
                        },
                        errorMessage: { "field_name": "otp", "error_msg": 'Otp is required' },
                    },
                    
                })

           

            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async verifyforgot (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    email: {
                        notEmpty: true,
                        // matches: {
                        //     // more than one options must be passed as arrays
                        //     options: /^[0-9]{6,10}$/i,
                        //     // errorMessage: 'Mobile number should contain minimum 10 number'
                        //     errorMessage: { "field_name": "number", "error_msg": 'Mobile number should contain minimum 6 number' },
                        // },
                        errorMessage: { "field_name": "email", "error_msg": 'Email is required' },
                    },
                    otp: {
                        notEmpty: true,
                        matches: {
                            // more than one options must be passed as arrays
                            options: /^[0-9]{4,4}$/i,
                            // errorMessage: 'Mobile number should contain minimum 10 number'
                            errorMessage: { "field_name": "otp", "error_msg": 'Otp should contain minimum 4 number' },
                        },
                        errorMessage: { "field_name": "otp", "error_msg": 'Otp is required' },
                    },
                    
                })

           

            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async setForgotPass (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    email: {
                        notEmpty: true,
                        // matches: {
                        //     // more than one options must be passed as arrays
                        //     options: /^[0-9]{6,10}$/i,
                        //     // errorMessage: 'Mobile number should contain minimum 10 number'
                        //     errorMessage: { "field_name": "number", "error_msg": 'Mobile number should contain minimum 6 number' },
                        // },
                        errorMessage: { "field_name": "email", "error_msg": 'Email is required' },
                    },
                    newPassword: {
                        notEmpty: true,
                        errorMessage: { "field_name": "newPassword", "error_msg": 'newPassword is required' },
                    },
                    
                })

           

            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
   
    async submitReferral (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=3) {
                req.checkBody({
                    referral_code: {
                        notEmpty: true,
                        errorMessage: { "field_name": "referral_code", "error_msg": 'referral_code is required' },
                    },
                    username: {
                        notEmpty: true,
                        errorMessage: { "field_name": "username", "error_msg": 'username is required' },
                    },
                    email: {
                        notEmpty: true,
                        errorMessage: { "field_name": "email", "error_msg": 'email is required' },
                    }
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    ///////////////////////////////////////////////////////////
    async chekUserName (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    username: {
                        notEmpty: true,
                        errorMessage: { "field_name": "username", "error_msg": 'username is required' },
                    }
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }
    async chekRedditUserName (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=2) {
                req.checkBody({
                    reddit_username: {
                        notEmpty: true,
                        errorMessage: { "field_name": "reddit_username", "error_msg": 'reddit_username is required' },
                    }
                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }

    async resetPassword (req, res, next) {
        // return next();
        if (Object.keys(req.body).length <=3) {
                req.checkBody({
                    oldPassword: {
                        notEmpty: true,
                        errorMessage: { "field_name": "oldPassword", "error_msg": 'oldPassword is required' },
                    },
                    newPassword: {
                        notEmpty: true,
                        errorMessage: { "field_name": "newPassword", "error_msg": 'newPassword is required' },
                    },
                    _id: {
                        notEmpty: true,
                        errorMessage: { "field_name": "_id", "error_msg": '_id is required' },
                    }

                    
                })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                // return res.json({ code : 422 ,success: false, message: errors[0] });
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters", errors: null })
        }
    }


    
}

module.exports = new FrontEntValidator();