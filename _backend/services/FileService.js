const UncheckedUtil = require("../utils/UncheckedUtil");
const fs = require("fs");
const ENV = require("../../env");
const MulterUtil = require("../utils/MulterUtil");

/**
 * @author garcol
 */
class FileService {
    constructor() {

    }

    /**
     * 
     * @param {String} folderName 
     * @param {Function} errorHandler 
     */
    getFolder = (folderName, errorHandler) => {
        const files = [];

        let folder = folderName ? `${ENV.UPLOAD_DIR}/${folderName}` : `${ENV.UPLOAD_DIR}`;

        let callable = () => {
            fs.readdirSync(folder).forEach(file => {
                files.push(file);
            });
            return files;
        }

        return UncheckedUtil.call(callable, errorHandler);
    }

    /**
     * 
     * @param {String} folderName 
     */
    createDirIfNotExist = (folderName) => {
        let correctDir = MulterUtil.getCorrectDirInUploadDir(folderName);
        return MulterUtil.createDirIfNotExist(correctDir);
    }
}

const INSTANCE = new FileService();
module.exports = INSTANCE;