const ApiCaller = require("../../utils/ApiCaller");
const FilePackage = require("../../utils/FilePackage");

/**
 * @property {Object} namespace
 * @author garcol
 */
class IndexService {
    
    constructor(namespace) {
        this.namespace = namespace;
    }

    /**
     * handle submit file
     */
    submitFile = () => {
        const formData = FilePackage.builder(this.namespace.submitForm)
                            .putData('pathfile', 'garcoldir')
                            .build();

        console.log(Array.from(formData));
        ApiCaller.post(this.namespace.POST_UPLOAD, formData, this.namespace.onResponseSubmitFile, ApiCaller.MULTI_FILE);                  
    }

}

module.exports = IndexService;