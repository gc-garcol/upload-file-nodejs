const multer = require("multer");
const {Base64} = require('js-base64');
const express = require('express');
const MulterUtil = require("../utils/MulterUtil");

const router = express.Router();
const ResponseBuilder = require("../utils/ResponseBuilder");
const HttpStatus = require("../constants/HttpStatus");

const FileService = require("../services/FileService");

const INPUT_FILES = 'myfiles';
const MAX_FILES = 31;


const uploadManyFiles = multer({storage: MulterUtil.getBaseStorage()}).fields([{ name: INPUT_FILES, maxCount: MAX_FILES}]);

/**
 * [POST] /api/file
 */
router.post('/', uploadManyFiles, (req, res) => {
    console.log(`FileController [URL] ${req.originalUrl}`);

    if (req.files.length <= 0) {
        return res.status(HttpStatus.BAD_REQUEST).send({message: `You must select at least 1 file or more.`});
    }

    MulterUtil.moveFile(req, INPUT_FILES);

    return res.status(HttpStatus.OK).send({message: `Your files has been uploaded.`});
});

/**
 * [GET] /api/file
 */
router.get("/", (req, res) => {
    let folderNameBase64 = req.query.folderName;
    let folderName = (folderNameBase64 && Base64.decode(folderNameBase64)) || "";

    console.log(`FileController [URL] ${req.originalUrl} -> ${folderNameBase64} - ${folderName}`);

    const files = FileService.getFolder(folderName);

    let responseHandler = (files === null) 
    ? ResponseBuilder.build(res, HttpStatus.NOT_FOUND, {message: "folder not found!!"})
    : ResponseBuilder.build(res, HttpStatus.OK, {files: files.join()})

    responseHandler();
});

/**
 * [POST] /api/file/createfolder
 */
router.post("/createfolder", (req, res) => {
    let folderNameBase64 = req.query.folderName;
    let fullFolderName = (folderNameBase64 && Base64.decode(folderNameBase64)) || "";

    console.log(`FileController [URL] ${req.originalUrl} - ${fullFolderName}`);

    let result = FileService.createDirIfNotExist(fullFolderName);

    let fd = fullFolderName.split("/");
    res.status(200).send({message: `Created folder ${fd[fd.length - 1]}`});
});

/**
 * 
 */
router.delete("/", (req, res) => {
    let elemmentBase64 = req.query.element;
    console.log(`element ${elemmentBase64}`);
    let fullPathElement = (elemmentBase64 && Base64.decode(elemmentBase64)) || "";

    console.log(`FileControllers [URL] ${req.originalUrl} - ${fullPathElement}`);

    if (fullPathElement == "/") {
        res.status(400).send({message: "Cannot delete root!!"});
        return;
    }

    let fd = fullPathElement.split("/");

    FileService.deleteElement(`${fullPathElement}`, () => {
        res.status(200).send({message: `Deleted ${fd[fd.length - 1]}`});
    })
});

module.exports = router;