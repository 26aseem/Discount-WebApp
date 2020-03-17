const Offer = require("../models/offer");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");  //File System

exports.getOfferById = (req, res, next, id) => {
    Offer.findById(id)
    .populate("category")
    .exec((err, offer) => {
        if(err){
            return res.status(400).json({
                error: "Offer not found"
            });
        }
        req.offer = offer;
    });
    next();
};

exports.createOffer = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Issues with the image"
            });
        }

        let offer = req.offer;
        offer = _.extend

        //handle file here
        if(file.photo){
            if(file.photo.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            offer.photo.data = fs.readFileSync(file.photo.path)
            offer.photo.contentType = file.photo.type
        }

        //save to the db
        offer.save((err, offer) => {
            if(err){
                res.status(400).json({
                    error: "Saving image to the Database failed"
                });
            }
            return res.json(offer);
        });

    })
};



exports.getOffer = (req, res) => {
    req.offer.photo = undefined    //So that offer loads quickly
    return res.json(req.offer)
};

//Performance optimization
exports.photo = (req, res, next) => {
    if(req.offer.photo.data){
        res.set("Content-Type", req.offer.photo.contentType)
        return res.send(req.offer.photo.data)
    }
    next();
};

exports.deleteOffer = (req, res) => {
    let offer = req.offer;
    offer.remove((err, deletedOffer) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete the offer"
            });
        }

        res.json({
            message: "Deletion was successful"
        });
    });
};


exports.updateOffer = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if(err){
            return res.status(400).json({
                error: "Issues with the image"
            });
        }
        //destructure the fields
        const { offerName, offerDesc, offerStartDate, offerEndDate } = fields;
        if(
            !offerName ||
            !offerDesc ||
            !offerStartDate ||
            !offerEndDate
        ){
            return res.status(400).json({
                error: "Please include all the fields"
            });
        }


        let offer = new Offer(fields);
        if(file.photo){
            if(file.photo.size > 3*1024*1024){
                return res.status(400).json({
                    error: "File size greater than 3 MB"
                });
            }
            offer.photo.data = fs.readFileSync(file.photo.path)
            offer.photo.contentType = file.photo.type
        }

        //save to the db
        offer.save((err, offer) => {
            if(err){
                res.status(400).json({
                    error: "Saving image to the Database failed"
                });
            }
            return res.json(offer);
        });

    })
};