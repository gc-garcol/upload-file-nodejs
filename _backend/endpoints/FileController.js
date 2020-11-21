const formidable = require("formidable");
const fs = require('fs');
const path = require("path");
const multer = require("multer");

const express = require('express');
const router = express.Router();

const ENV = require('../../env');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${ENV.UPLOAD_DIR}`);
    },
    filename: (req, file, callback) => {
        let filename = `${file.originalname}`;
        callback(null, filename);
    }
});

// const uploadManyFiles = multer({storage: storage}).fields([{ name: 'myfiles', maxCount: 31}]);
const uploadManyFiles = multer({storage: storage}).any();

router.post('/', uploadManyFiles, (req, res) => {
    console.log(req);
    console.log("=====");
    console.log(req.body);
    if (req.files.length <= 0) {
        return res.send(`You must select at least 1 file or more.`);
    }
    res.send(`Your files has been uploaded.`);
});

module.exports = router;