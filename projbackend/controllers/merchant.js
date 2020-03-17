const Merchant = require("../models/merchant");

exports.getMerchantById = (req, res, next, id) => {
    Merchant.findById(id).exec((err,merchant) => {
        if(err || !merchant){
            return res.status(400).json({
                error: "No merchant was found in the database"
            });
        }

        req.profile = merchant;
        next();
    });
};


exports.getMerchant = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encrypt_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.getAllMerchants = (req, res) => {
    Merchant.find().exec((err, merchants) => {
        if(err || !merchants){
            return res.status(400).json({
                error: "NO merchants found"
            })
        }
        return res.json(merchants);
        
    });

};

/*
exports.updateMerchant = (req, res) => {
    Merchant.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new : true, useFindAndModify : false},
        (err, merchant) => {
            if(err || !merchant){
                return res.status(400).json({
                    error: "NOT authorised. Update unsuccessful"
                })
            }
            merchant.salt = undefined;
            merchant.encrypt_password = undefined;
            merchant.createdAt = undefined;
            merchant.updatedAt = undefined;
            return res.json(merchant);
        }
    )
};
*/

//Performance optimization
exports.merchantPhoto = (req, res, next) => {
    if(req.merchant.merchantPhoto.data){
        res.set("Content-Type", req.merchant.merchantPhoto.contentType)
        return res.send(req.merchant.merchantPhoto.data)
    }
    next();
};

exports.deleteMerchant = (req, res) => {
    let merchant = req.merchant;
    merchant.remove((err, deletedMerchant) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the merchant"
            });
        }

        res.json({
            message: "Deletion was successful"
        });
    });
};


exports.updateMerchant = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Issues with the image"
            });
        }
        //destructure the fields
        const { merchantName, ownerName, city, state, country, streetAddress, pincode, email, contact, altcontact, category, description } = fields;
        if(
            !merchantName ||
            !ownerName ||
            !city ||
            !state ||
            !country ||
            !streetAddress ||
            !pincode ||
            !email ||
            !contact ||
            !category ||
            !description

        ){
            return res.status(400).json({
                error: "Please include all the fields"
            });
        }


        let merchant = new Merchant(fields);
        if(file.merchantPhoto){
            if(file.merchantPhoto.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            merchant.merchantPhoto.data = fs.readFileSync(file.merchantPhoto.path)
            merchant.merchantPhoto.contentType = file.merchantPhoto.type
        }

        //save to the db
        merchant.save((err, merchant) => {
            if(err){
                res.status(400).json({
                    error: "Saving image to the Database failed"
                });
            }
            merchant.salt = undefined;
            merchant.encrypt_password = undefined;
            merchant.createdAt = undefined;
            merchant.updatedAt = undefined;
            return res.json(merchant);
        });

    })
};
