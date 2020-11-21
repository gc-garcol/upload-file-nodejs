const multer = require("multer");

const express = require('express');
const router = express.Router();

const MulterUtil = require("../utils/MulterUtil");

const INPUT_FILES = 'myfiles';
const MAX_FILES = 31;

const uploadManyFiles = multer({storage: MulterUtil.getBaseStorage()}).fields([{ name: INPUT_FILES, maxCount: MAX_FILES}]);

router.post('/', uploadManyFiles, (req, res) => {
    if (req.files.length <= 0) {
        return res.send(`You must select at least 1 file or more.`);
    }

    MulterUtil.moveFile(req, INPUT_FILES);

    res.send(`Your files has been uploaded.`);
});

module.exports = router;