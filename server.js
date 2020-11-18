const express = require('express')
const app = express();
const formidable = require("formidable");
const fs = require('fs');
const path = require("path");
const multer = require("multer");

// config
const PORT = 54000;

// body parse
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// static
app.use(express.static('public'))

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, `uploads`);
    },
    filename: (req, file, callback) => {
      let filename = `${file.originalname}`;
      callback(null, filename);
    }
});

const uploadManyFiles = multer({storage: storage}).array("myfiles", 31);

// API controller
app.post('/api/file', uploadManyFiles, (req, res) => {
    if (req.files.length <= 0) {
        return res.send(`You must select at least 1 file or more.`);
    }
    res.send(`Your files has been uploaded.`);
});



 
app.listen(PORT);