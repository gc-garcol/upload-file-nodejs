const ApiCaller = require("../../utils/ApiCaller");
const FilePackage = require("../../utils/FilePackage");
const Base64 = require("js-base64");

/**
 * @property {Object} namespace
 * @author garcol
 */
class IndexNetworkService {
    
    constructor(namespace) {
        this.namespace = namespace;
    }

    /**
     * Handle submit file
     * @param {String} currentDir 
     */
    submitFile = (currentDir) => {
        const formData = FilePackage.builder(this.namespace.submitForm)
                            .putData('pathfile', currentDir)
                            .build();

        console.log(Array.from(formData));
        ApiCaller.post(this.namespace.BASE_API, formData, this.namespace.onResponseSubmitFile, ApiCaller.MULTI_FILE);       
    }

    /**
     * 
     * @param {String} currentDir 
     */
    getFiles = (currentDir) => {
        let encodeDir = Base64.encode(currentDir);
        let url = `${this.namespace.BASE_API}?folderName=${encodeDir}`;
        ApiCaller.get(url, this.namespace.onReceiveFiles);
    }

    /**
     * 
     * @param {String} fullPathDir 
     */
    createFolder = (fullPathDir) => {
        let encodeDir = Base64.encode(fullPathDir);
        let url = `${this.namespace.BASE_API}/createfolder?folderName=${encodeDir}`;
        ApiCaller.post(url, null, this.namespace.onResponseCreateFolder);
    }

    /**
     * 
     * @param {String} fullPathDir 
     */
    deleteElement = (fullPathDir) => {
        let encodeDir = Base64.encode(fullPathDir);
        let url = `${this.namespace.BASE_API}?element=${encodeDir}`;
        ApiCaller.del(url, this.namespace.onResponseDelete);
    }
}

module.exports = IndexNetworkService;