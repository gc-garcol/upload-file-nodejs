/**
 * @author garcol
 */
const multer = require("multer");
const fs = require('fs');
const path = require("path");

const ENV = require('../../env');

/**
 * @author garcol
 */
class MulterUtil {

    constructor() {

    }

    getBaseStorage(){
        return storage;
    }

    /**
     * 
     * @param {HttpServletRequest} req 
     */
    moveFile(req, inputname){
        let files = req.files[inputname];
        files.forEach((file) => {
            let fileName = file.originalname;

            let correctDir = this.getCorrectDirInUploadDir(req.body.pathfile);
            this.createDirIfNotExist(correctDir);

            let oldpath = `${path.join(ENV.TMP_UPLOAD_DIR, fileName)}`;
            let newpath = `${path.join(correctDir, fileName)}`;
            this.move(oldpath, newpath);
        });
    }

    getCorrectDirInUploadDir(dirName){
        return `${path.join(ENV.UPLOAD_DIR, dirName)}`;
    }

    /**
     * 
     * @param {String} dirname 
     */
    createDirIfNotExist(dirname) {
        if (!fs.existsSync(dirname)) {
            console.log(`MulterUtil->createDirIfNotExist | ${dirname}`);
            fs.mkdirSync(dirname);
            return false;
        }

        return true;
    }

    /**
     * 
     * @param {String} oldpath 
     * @param {String} newpath 
     */
    move(oldpath, newpath){
        fs.rename(oldpath, newpath, (error) => {
            error && console.log.bind(null, error);
        })
    }

}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${ENV.TMP_UPLOAD_DIR}`);
    },
    filename: (req, file, callback) => {
        let filename = `${file.originalname}`;
        callback(null, filename);
    }
});

const INSTANCE = new MulterUtil();
module.exports = INSTANCE;