const express = require('express');
const { home, handleuploadFile, handlemultipleImage, handlevalue, handleaddValue, handleEdit, handleDeleteuser, handledataEdit } = require('../controlers/homcontroller');
const upload = require('../middleware/upload');
const multer = require('multer');
const pool = require('../configs/database');
const tableuser = require('../controlers/ajaxcontroler');
const router = express.Router();
//set up a router for file upload
router.get("/upload", (req, res) => {
    res.render('upload.ejs')
})
router.get('/', home)
//upload images file
router.post('/upload-profile-pic', handleuploadFile);
//upload multiple images
let uploadmultiple = upload.array('multiple_images', 3);
router.post('/upload-multiple-images', (req, res, next) => {
    uploadmultiple(req, res, function (err) {
        if (err instanceof multer.MulterError && err.code == "LIMIT_UNEXPECTED_FILE") {
            res.send("LIMIT_UNEXPECTED_FILE");
        }
        else if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.files) {
            return res.send('Please select an image to upload');
        }
        else if (err) {
            res.send(err);
        } else {
            next();
        }
    })
}, handlemultipleImage);
//table 
router.get('/table', handlevalue);
router.post('/uservalues', handleaddValue);
//edit
router.get('/edit/:userid', handleEdit);
router.post('/editussers', handledataEdit);
//delete user
router.post('/delete/:userid', handleDeleteuser);
// show user
router.get('/tableuser', tableuser)
module.exports = router;