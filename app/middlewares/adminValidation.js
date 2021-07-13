const {
    check,
    validationResult
} = require('express-validator/check');
class Validation {
    constructor() {
        return {
            adminLogin: this.adminLogin.bind(this),
            validateAddArticle: this.validateAddArticle.bind(this),
            createCompany: this.createCompany.bind(this),

            CompanyArticles: this.CompanyArticles.bind(this),
            listValidation: this.listValidation.bind(this),
            //
            createProject: this.createProject.bind(this),
            idValidation: this.idValidation.bind(this),

            addProjectArticle: this.addProjectArticle.bind(this),
            seoListById: this.seoListById.bind(this),
            findDataBycompanyId: this.findDataBycompanyId.bind(this),
            companyMember: this.companyMember.bind(this),
            //articles
            createArticleData: this.createArticleData.bind(this),
            createAdminUser: this.createAdminUser.bind(this),
            change_password: this.change_password.bind(this),
            downloadCompanyData: this.downloadCompanyData.bind(this),
            createCountry: this.createCountry.bind(this),
            createMailTemplate: this.createMailTemplate.bind(this),
            

        }
    }
    async downloadCompanyData(req, res, next){
        if (Object.keys(req.body).length == 6) {
            req.checkBody({
                download_id: {
                    notEmpty: true,                   
                    errorMessage: { "field_name": "download_id", "error_msg": 'download_id is required' },
                },
                email: {
                    notEmpty: true,
                    isEmail: {
                        // more than one options must be passed as arrays
                        // errorMessage: 'Invalid email'
                        errorMessage: { "field_name": "email", "error_msg": 'Fill a valid email' },
                    },
                    errorMessage: { "field_name": "email", "error_msg": 'Email address is required' },
                },
                user_id: {
                    notEmpty: true,
                    matches: {

                        options: /^[0-9]{1,2}$/i,
                        // errorMessage: 'Password should contain minimum 4 characters and max 15'
                        errorMessage: { "field_name": "user_id", "error_msg": 'user_id should contain minimum 1 number' },
                    },
                    errorMessage: { "field_name": "user_id", "error_msg": 'user_id is required' },
                },
                title: {
                    notEmpty: true,   
                                 
                    errorMessage: { "field_name": "title", "error_msg": 'title is required' },
                },
                path: {
                    notEmpty: true,                  
                    errorMessage: { "field_name": "path", "error_msg": 'path is required' },
                },
                type: {
                    notEmpty: true,                   
                    errorMessage: { "field_name": "type", "error_msg": 'type is required' },
                }
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }
    
    
    async adminLogin(req, res, next) {
        // console.log(req)
        // return next();
        if (Object.keys(req.body).length == 2) {
            req.checkBody({
                email: {
                    notEmpty: true,
                    isEmail: {
                        // more than one options must be passed as arrays
                        // errorMessage: 'Invalid email'
                        errorMessage: { "field_name": "email", "error_msg": 'Fill a valid email' },
                    },
                    errorMessage: { "field_name": "email", "error_msg": 'Email address is required' },
                },
                password: {
                    notEmpty: true,
                    matches: {

                        options: /^[ A-Z a-z 0-9 $@$!%*?&#~^()-_+=]{4,15}$/,
                        // errorMessage: 'Password should contain minimum 4 characters and max 15'
                        errorMessage: { "field_name": "password", "error_msg": 'Password should contain minimum 4 characters and max 15' },
                    },
                    errorMessage: { "field_name": "password", "error_msg": 'Password is required' },
                }
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }

    async validateAddArticle(req, res, next) {
        if (Object.keys(req.body).length == 2) {
            req.checkBody({
                article: {
                    notEmpty: true,

                    errorMessage: 'Article is required'
                },
                category: {
                    notEmpty: true,
                    errorMessage: 'Category is require',
                },
                subcategory: {
                    notEmpty: true,
                    errorMessage: 'Category is require',
                },
                content: {
                    notEmpty: true,
                    errorMessage: "Content is require"
                }
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
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


    async createCompany(req, res, next) {
       // console.log("locations.office_type", req.body.locations.office_type)
       //console.log(req.body)
       req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
        if (Object.keys(req.body).length == 9 || Object.keys(req.body).length == 10 || Object.keys(req.body).length == 11) {
            req.checkBody({
                name: {
                    notEmpty: true,
                    matches: {
                        options: /^[ A-Za-z 0-9]{2,50}$/i,
                        errorMessage: { "field_name": "first_name", "error_msg": 'first_name should contain characters only' },
                    },

                    errorMessage: { "field_name": "first_name", "error_msg": 'first_name is require' },
                },
                location: {
                    notEmpty: true,
                    // matches: {
                    //     options: /^[ A-Z a-z 0-9]{2,50}$/i,
                    //     errorMessage: { "field_name": "office_type", "error_msg": 'office_type should contain characters only' },
                    // },

                    errorMessage: { "field_name": "location", "error_msg": 'office_type is require' },
                },

                //     "locations.address.building": {
                //         notEmpty: true,

                //         errorMessage: { "field_name": "building", "error_msg": 'building is require' },
                //     },
                //     "locations.address.street": {
                //         notEmpty: true,
                //         matches: {

                //             options: /^[ A-Za-z 0-9]{2,100}$/i,
                //             errorMessage: { "field_name": "street", "error_msg": 'street should contain characters only' },
                //         },

                //         errorMessage: { "field_name": "street", "error_msg": 'street is require' },
                //     },
                //    "locations.address.city": {
                //         notEmpty: true,
                //         matches: {

                //             options: /^[ A-Za-z ]{2,50}$/i,
                //             errorMessage: { "field_name": "city", "error_msg": 'city should contain characters only' },
                //         },
                //         errorMessage: { "field_name": "city", "error_msg": 'city is require' },
                //     },
                //    "locations.address.country": {
                //         notEmpty: true,
                //         matches: {

                //             options: /^[ A-Za-z]{2,50}$/i,
                //             errorMessage: { "field_name": "country", "error_msg": 'country should contain characters only' },
                //         },
                //         errorMessage: { "field_name": "country", "error_msg": 'country is require' },
                //     },
                //     "locations.address.zip": {
                //         notEmpty: true,
                //         matches: {

                //             options: /^[ 0-9]{6,6}$/i,
                //             errorMessage: { "field_name": "zip", "error_msg": 'zip should contain 6 number only' },
                //         },
                //         errorMessage: { "field_name": "zip", "error_msg": 'zip is require' },
                //     },
                //     "locations.contact": {
                //         notEmpty: true,
                //         matches: {

                //             options: /^[ 0-9]{10,12}$/i,
                //             errorMessage: { "field_name": "contact", "error_msg": 'contact should contain minimum 10 number and maximum 12 number only' },
                //         },
                //         errorMessage: { "field_name": "contact", "error_msg": 'contact is require' },
                //     },
                //    "locations.email": {
                //         notEmpty: true,
                //         isEmail: {
                //             errorMessage: { "field_name": "email", "error_msg": 'Fill a valid email' },
                //         },
                //         errorMessage: { "field_name": "email", "error_msg": 'Email address is required' },
                //     },
                company_type: {
                    notEmpty: true,
                    errorMessage: { "field_name": "company_type", "error_msg": 'company_type is require' },
                },
                sector: {
                    notEmpty: true,
                    // matches: {

                    //     options: /^[ 0-9]{1,12}$/i,
                    //     errorMessage: { "field_name": "cat_id", "error_msg": 'cat_id should contain minimum 1 number and maximum 12 number only' },
                    // },
                    errorMessage: { "field_name": "sector", "error_msg": 'sector is require' },
                },
                // "sector.name": {
                //     notEmpty: true,
                //     matches: {

                //         options: /^[ A-Z a-z 0-9]{2,50}$/i,
                //         errorMessage: { "field_name": "cat_name", "error_msg": 'cat_name should contain characters only' },
                //     },
                //     errorMessage: { "field_name": "cat_name", "error_msg": 'cat_name is require' },
                // },
                employee: {
                    notEmpty: true,
                    // matches: {
                    //     options: /^[ 0-9]{1,12}$/i,
                    //     errorMessage: { "field_name": "employees", "error_msg": 'employees should contain minimum 1 number and maximum 12 number only' },
                    // },
                    errorMessage: { "field_name": "employees", "error_msg": 'employees is require' },
                },
                // incorporation: {
                //     notEmpty: true,

                //     errorMessage: { "field_name": "incorporation", "error_msg": 'incorporation is require' },
                // },
                turnover: {
                    notEmpty: true,

                    errorMessage: { "field_name": "turnover", "error_msg": 'turnover is require' },
                },
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }

    }

    async CompanyArticles(req, res, next) {

        req.body = req.body.data ? JSON.parse(req.body.data) : req.body;

        if (Object.keys(req.body).length <= 9) {
            req.checkBody({
              
                // subcategory: {
                //     notEmpty: true,
                //     // matches: {
                //     //     // more than one options must be passed as arrays
                //     //     options: /^[0-9]{1,12}$/i,
                //     //     // errorMessage: 'Mobile number should contain minimum 10 number'
                //     //     errorMessage: { "field_name": "category_id", "error_msg": 'category_id should contain minimum 1 number and maximum 12' },
                //     // },

                //     errorMessage: { "field_name": "subcategory", "error_msg": 'subcategory is require' },
                // },
              
                channel: {
                    notEmpty: true,
                    // matches: {
                    //     // more than one options must be passed as arrays
                    //     options: /^[0-9]{1,12}$/i,
                    //     // errorMessage: 'Mobile number should contain minimum 10 number'
                    //     errorMessage: { "field_name": "subcategory_id", "error_msg": 'subcategory_id should contain minimum 1 number and maximum 12' },
                    // },

                    errorMessage: { "field_name": "channel", "error_msg": 'channel is require' },
                },
              
                // title: {
                //     notEmpty: true,
                //     // matches: {
                //     //     // more than one options must be passed as arrays
                //     //     options: /^[0-9]{1,12}$/i,
                //     //     // errorMessage: 'Mobile number should contain minimum 10 number'
                //     //     errorMessage: { "field_name": "subcategory_cat_id", "error_msg": 'subcategory_cat_id should contain minimum 1 number and maximum 12' },
                //     // },
                //     errorMessage: { "field_name": "title", "error_msg": 'title is require' },
                // },
                header_media: {
                    notEmpty: true,
                    // matches: {
                    //     // more than one options must be passed as arrays
                    //     options: /^[0-9]{1,12}$/i,
                    //     // errorMessage: 'Mobile number should contain minimum 10 number'
                    //     errorMessage: { "field_name": "location_id", "error_msg": 'location_id should contain minimum 1 number and maximum 12' },
                    // },
                    errorMessage: { "field_name": "header_media", "error_msg": 'header_media is require' },
                },
                common_article: {
                    notEmpty: true,
                    // matches: {

                    //     options: /^[ A-Za-z 0-9]{2,50}$/i,
                    //     errorMessage: { "field_name": "location_name", "error_msg": 'location_name should contain characters only' },
                    // },
                    errorMessage: { "field_name": "common_article", "error_msg": 'common_article is require' },
                },
                adv_article: {
                    notEmpty: true,
                    // matches: {

                    //     options: /^[ A-Za-z 0-9]{2,50}$/i,
                    //     errorMessage: { "field_name": "channel", "error_msg": 'channel should contain characters only' },
                    // },
                    errorMessage: { "field_name": "adv_article", "error_msg": 'adv_article is required' },
                }
            })

            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }
    async listValidation(req, res, next) {
        if (Object.keys(req.body).length == 2 || Object.keys(req.body).length == 3) {
            req.checkBody({
                page: {
                    notEmpty: true,
                    // matches: {

                    //     options: /^[1-9 ]{1,10}$/,
                    //     // errorMessage: 'Password should contain minimum 4 characters and max 15'
                    //     errorMessage: { "field_name": "page", "error_msg": 'page should contain minimum 1 number and max 10' },
                    // },
                    errorMessage: { "field_name": "page", "error_msg": 'page is required' },
                },
                limit: {
                    notEmpty: true,
                    // matches: {

                    //     options: /^[1-9 ]{1,10}$/,
                    //     // errorMessage: 'Password should contain minimum 4 characters and max 15'
                    //     errorMessage: { "field_name": "limit", "error_msg": 'limit should contain minimum 1 number and max 10' },
                    // },
                    errorMessage: { "field_name": "limit", "error_msg": 'limit is required' },
                },
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }
    //project validation
    async createProject(req, res, next) {
        req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
        if (Object.keys(req.body).length >= 7) {
            req.checkBody({
                name: {
                    notEmpty: true,
                    matches: {
                        // more than one options must be passed as arrays
                        options: /^[a-z A-Z0-9]{2,100}$/i,
                        errorMessage: { "field_name": "name", "error_msg": 'name should contain minimum 6 character' }
                    },
                    errorMessage: { "field_name": "name", "error_msg": 'name is required' },
                },
                commissioning: {
                    notEmpty: true,
                    
                    errorMessage: { "field_name": "commissioning", "error_msg": 'commissioning address is required' },
                },
                existing_scope: {
                    notEmpty: true,
                    matches: {
                        // more than one options must be passed as arrays
                        options: /^[a-z A-Z0-9 , _ - ]{2,100}$/i,
                        errorMessage: { "field_name": "existing_scope", "error_msg": 'existing_scope should contain minimum 3 number' }
                    },
                    errorMessage: { "field_name": "existing_scope", "error_msg": 'commissioning address is required' },
                 },
                target_scope: {
                    notEmpty: true,
                    matches: {
                        // more than one options must be passed as arrays
                        options: /^[a-z A-Z0-9 , _ -  ]{2,100}$/i,
                        errorMessage: { "field_name": "target_scope", "error_msg": 'target_scopeshould contain minimum 3 number' }
                    },
                    errorMessage: { "field_name": "target_scope", "error_msg": 'target_scope address is required' },
                },
                type: {
                    notEmpty: true,
                    errorMessage: { "field_name": "type", "error_msg": 'type is required' },
                },
                url: {
                    notEmpty: true,
                    errorMessage: { "field_name": "url", "error_msg": 'url is required' },
                },
                belonging_companies: {
                    notEmpty: true,
                    errorMessage: { "field_name": "belonging_companies", "error_msg": 'belonging_companies is required' },
                },


            })

            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }
    async idValidation(req, res, next) {
        console.log(req.params.id);
        // console.log("params >>>", params);
        if (Object.keys(req.params).length == 1) {
            req.checkParams({
                id: {
                    notEmpty: true,

                    errorMessage: { "field_name": "id", "error_msg": 'Id is required' },
                }

            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }

    }
    async addProjectArticle(req, res, next) {
       
        req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
        
        if (Object.keys(req.body).length == 5) {
            req.checkBody({
                
                
                channel: {
                    notEmpty: true,
                    // matches: {
                    //     // more than one options must be passed as arrays
                    //     options: /^[0-9]{1,12}$/i,
                    //     // errorMessage: 'Mobile number should contain minimum 10 number'
                    //     errorMessage: { "field_name": "subcategory_id", "error_msg": 'subcategory_id should contain minimum 1 number and maximum 12' },
                    // },

                    errorMessage: { "field_name": "channel", "error_msg": 'channel is require' },
                },
             
                // title: {
                //     notEmpty: true,
                //     // matches: {
                //     //     // more than one options must be passed as arrays
                //     //     options: /^[0-9]{1,12}$/i,
                //     //     // errorMessage: 'Mobile number should contain minimum 10 number'
                //     //     errorMessage: { "field_name": "subcategory_cat_id", "error_msg": 'subcategory_cat_id should contain minimum 1 number and maximum 12' },
                //     // },
                //     errorMessage: { "field_name": "title", "error_msg": 'title is require' },
                // },
                header_media: {
                    notEmpty: true,
                    // matches: {
                    //     // more than one options must be passed as arrays
                    //     options: /^[0-9]{1,12}$/i,
                    //     // errorMessage: 'Mobile number should contain minimum 10 number'
                    //     errorMessage: { "field_name": "location_id", "error_msg": 'location_id should contain minimum 1 number and maximum 12' },
                    // },
                    errorMessage: { "field_name": "header_media", "error_msg": 'header_media is require' },
                },
                common_article: {
                    notEmpty: true,
                    // matches: {

                    //     options: /^[ A-Za-z 0-9]{2,50}$/i,
                    //     errorMessage: { "field_name": "location_name", "error_msg": 'location_name should contain characters only' },
                    // },
                    errorMessage: { "field_name": "common_article", "error_msg": 'common_article is require' },
                },
                adv_article: {
                    notEmpty: true,
                    // matches: {

                    //     options: /^[ A-Za-z 0-9]{2,50}$/i,
                    //     errorMessage: { "field_name": "channel", "error_msg": 'channel should contain characters only' },
                    // },
                    errorMessage: { "field_name": "adv_article", "error_msg": 'adv_article is required' },
                }
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }
    async companyMember(req, res, next) {
        req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
        if (Object.keys(req.body).length == 6 || Object.keys(req.body).length==8 || Object.keys(req.body).length==9) {
            req.checkBody({
                name: {
                    notEmpty: true,
                    matches: {
                        options: /^[ A-Za-z 0-9]{2,50}$/i,
                        errorMessage: { "field_name": "name", "error_msg": 'name should contain characters only' },
                    },
                    errorMessage: { "field_name": "name", "error_msg": 'name is required' },
                },
                dob: {
                    notEmpty: true,
                    errorMessage: { "field_name": "name", "error_msg": 'name is required' },
                },
                
                biography: {
                    notEmpty: true,
                    errorMessage: { "field_name": "biography", "error_msg": 'biography is required' },
                },
                history: {
                    notEmpty: true,
                    errorMessage: { "field_name": "history", "error_msg": 'history is required' },
                },
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }
    async createArticleData(req, res, next) {
        req.body = req.body.data ? JSON.parse(req.body.data) : req.body;
        console.log("Object.keys(req.body).length")
        console.log(Object.keys(req.body).length);

        if (Object.keys(req.body).length == 9 || Object.keys(req.body).length == 10 || Object.keys(req.body).length == 11 || Object.keys(req.body).length == 12) {
            req.checkBody({
                title: {
                    notEmpty: true,
                    errorMessage: { "field_name": "title", "error_msg": 'title is require' },
                },
                category: {
                    notEmpty: true,
                    errorMessage: { "field_name": "category", "error_msg": 'category is require' },
                },
                subcategory: {
                    notEmpty: true,
                    errorMessage: { "field_name": "subcategory", "error_msg": 'subcategory is require' },
                },
                location: {
                    notEmpty: true,
                    errorMessage: { "field_name": "location", "error_msg": 'location is require' },
                },
                channel: {
                    notEmpty: true,
                    errorMessage: { "field_name": "channel", "error_msg": 'channel is require' },
                },


            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }
    async seoListById(req, res, next) {
        if (Object.keys(req.params).length = 1) {
            req.checkParams({
                id: {
                    notEmpty: true,
                    errorMessage: { "field_name": "id", "error_msg": 'id is require' },
                }
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }

    }

    async findDataBycompanyId(req, res, next) {
        if (Object.keys(req.params).length = 1) {
            req.checkParams({
                id: {
                    notEmpty: true,
                    errorMessage: { "field_name": "id", "error_msg": 'id is require' },
                }
            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }

    }
    ///////////////////////admin User validation
    async createAdminUser(req, res, next) {
        // if (!req.file || req.file == null || req.file == undefined) {
        //     return res.json({ code: 422, success: false, message: "profile_pic is required", errors: errors });
        // }
        if (Object.keys(req.body).length <= 7) {
            req.checkBody({
                email: {
                    notEmpty: true,
                    isEmail: {
                        errorMessage: { "field_name": "email", "error_msg": 'Fill a valid email' },
                    },
                    errorMessage: { "field_name": "email", "error_msg": 'Email address is required' },
                },
                password: {
                    notEmpty: true,
                    matches: {
                        options: /^[ A-Z a-z 0-9 $@$!%*?&#~^()-_+=]{4,15}$/,
                        errorMessage: { "field_name": "password", "error_msg": 'Password should contain minimum 4 characters and max 15' },
                    },
                    errorMessage: { "field_name": "password", "error_msg": 'Password is required' },
                },
                first_name: {
                    notEmpty: true,
                    matches: {
                        options: /^[ A-Za-z ]{1,50}$/i,
                        errorMessage: { "field_name": "first_name", "error_msg": 'Full name should contain characters only' },
                    },
                    errorMessage: { "field_name": "first_name", "error_msg": 'Full Name is require' },
                },
                phone: {
                    notEmpty: true,
                    matches: {
                        options: /^[ 0-9 ]{10,12}$/i,
                        errorMessage: { "field_name": "phone", "error_msg": 'phone should contain number only' },
                    },
                    errorMessage: { "field_name": "phone", "error_msg": 'phone is require' },
                },
                location: {
                    notEmpty: true,
                    errorMessage: { "field_name": "location", "error_msg": 'location is require' },
                },
                dob: {
                    notEmpty: true,
                    errorMessage: { "field_name": "dob", "error_msg": 'dob is require' },
                },
                role_id: {
                    notEmpty: true,
                    matches: {
                        options: /^[ 0-9]{1,50}$/i,
                        errorMessage: { "field_name": "role_id", "error_msg": 'role_id should contain number only' },
                    },
                    errorMessage: { "field_name": "role_id", "error_msg": 'role_id is require' },
                }

            })
            const errors = await this._validationErrorsFormat(req);
            if (errors) {
                return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
            } else {
                return next();
            }
        } else {
            res.json({ code: 422, success: false, message: "Please send proper parameters" })
        }
    }
   async change_password(req,res,next){
    if (Object.keys(req.body).length <= 4) {
        req.checkBody({
            email: {
                notEmpty: true,
                isEmail: {
                    errorMessage: { "field_name": "email", "error_msg": 'Fill a valid email' },
                },
                errorMessage: { "field_name": "email", "error_msg": 'Email address is required' },
            },
            currentPassword: {
                notEmpty: true,
                matches: {
                    options: /^[ A-Z a-z 0-9 $@$!%*?&#~^()-_+=]{4,15}$/,
                    errorMessage: { "field_name": "password", "error_msg": 'Password should contain minimum 4 characters and max 15' },
                },
                errorMessage: { "field_name": "password", "error_msg": 'Password is required' },
            }, 
            newPassword: {
                notEmpty: true,
                matches: {
                    options: /^[ A-Z a-z 0-9 $@$!%*?&#~^()-_+=]{4,15}$/,
                    errorMessage: { "field_name": "password", "error_msg": 'New Password should contain minimum 4 characters and max 15' },
                },
                errorMessage: { "field_name": "password", "error_msg": 'New Password is required' },
            }, 

        })
        const errors = await this._validationErrorsFormat(req);
        if (errors) {
            return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
        } else {
            return next();
        }
    } else {
        res.json({ code: 422, success: false, message: "Please send proper parameters" })
    }

   }
   async deletecompanytype(req, res, next) {
    if (Object.keys(req.params).length = 1) {
        req.checkParams({
            id: {
                notEmpty: true,
                errorMessage: { "field_name": "id", "error_msg": 'id is require' },
            }
        })
        const errors = await this._validationErrorsFormat(req);
        if (errors) {
            return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
        } else {
            return next();
        }
    } else {
        res.json({ code: 422, success: false, message: "Please send proper parameters" })
    }

}
async Createcompanytype(req, res, next) {
    if (Object.keys(req.body).length <= 3) {
        req.checkBody({
            name: {
                notEmpty: true,

                errorMessage: 'Name is required'
            },
            status: {
                notEmpty: true,
                errorMessage: 'Status is require',
            },
           
        })
        const errors = await this._validationErrorsFormat(req);
        if (errors) {
            return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
        } else {
            return next();
        }
    } else {
        res.json({ code: 422, success: false, message: "Please send proper parameters" })
    }
}
async createCountry(req,res,next){
    console.log(Object.keys(req.body).length );
    if (Object.keys(req.body).length == 6 || Object.keys(req.body).length == 7 || Object.keys(req.body).length == 8) {
        req.checkBody({
            sortname: {
                notEmpty: true,

                errorMessage: 'sortName is required'
            },
            name: {
                notEmpty: true,
                errorMessage: 'Name is require',
            },
            phonecode: {
                notEmpty: true,
                errorMessage: 'Phonecode  is require',
            },
            validation_min_len: {
                notEmpty: true,
                errorMessage: 'validation_min_len is require',
            },
            validation_max_len: {
                notEmpty: true,
                errorMessage: 'validation_man_len is require',
            },
            language: {
                notEmpty: true,
                errorMessage: 'language is require',
            },
            status: {
                notEmpty: true,
                errorMessage: 'status is require',
            },
           
        })
        const errors = await this._validationErrorsFormat(req);
        if (errors) {
            return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
        } else {
            return next();
        }
    } else {
        res.json({ code: 422, success: false, message: "Please send proper parameters" })
    }
}

async createMailTemplate(req,res,next){
    req.checkBody({
        body: {
            notEmpty: true,
            errorMessage: { "field_name": "body", "error_msg": 'Mail body is required!' }
        },
        subject: {
            notEmpty: true,
            errorMessage: { "field_name": "subject", "error_msg": 'Subject body is required!' }
        },
        language_id: {
            notEmpty: true,
            errorMessage: { "field_name": "language_id", "error_msg": 'language id is required!' }
        },
        module_name: {
            notEmpty: true,
            errorMessage: { "field_name": "module_name", "error_msg": 'Module name is required!' }
        }
    });
    const errors = await this._validationErrorsFormat(req);
    if (errors) {
        return res.json({ code: 422, success: false, message: "Resolve these errors", errors: errors });
    } else {
        return next();
    }
}

}

module.exports = new Validation();