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

    getBaseStorage = () => {
        return storage;
    }

    /**
     * 
     * @param {HttpServletRequest} req 
     */
    moveFile = (req, inputname) => {
        let files = req.files[inputname];
        files.forEach((file) => {
            let fileName = file.originalname;
            let correctDir = `${path.join(ENV.UPLOAD_DIR, req.body.pathfile)}`;
            if (!fs.existsSync(correctDir)) {
                fs.mkdirSync(correctDir);
            }

            let oldpath = `${path.join(ENV.UPLOAD_DIR, fileName)}`;
            let newpath = `${path.join(correctDir, fileName)}`;
            fs.rename(oldpath, newpath, (error) => {
                console.log(error);
            })
        });
        }

}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, `${ENV.UPLOAD_DIR}`);
    },
    filename: (req, file, callback) => {
        let filename = `${file.originalname}`;
        callback(null, filename);
    }
});

const INSTANCE = new MulterUtil();
module.exports = INSTANCE;