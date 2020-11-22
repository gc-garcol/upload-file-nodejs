const ApiCaller = require("../../utils/ApiCaller");
const FilePackage = require("../../utils/FilePackage");

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
        currentDir = "/garcol";
        const formData = FilePackage.builder(this.namespace.submitForm)
                            .putData('pathfile', currentDir)
                            .build();

        console.log(Array.from(formData));
        ApiCaller.post(this.namespace.POST_UPLOAD, formData, this.namespace.onResponseSubmitFile, ApiCaller.MULTI_FILE);                  
    }

}

module.exports = IndexNetworkService;