const axios = require("axios");

/**
 * @author garcol
 */
class ApiCaller {

    constructor() {
        this.MULTI_FILE = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        this.DEFAULT = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    }

    /**
     * 
     * @param {String} url 
     * @param {Any} params 
     * @param {Header} headers 
     * @param {Function} handler 
     * @param {Function} errorCallback 
     * @param {Function} finallyCallback 
     */
    post = async (url, params, handler, headers, errorCallback, finallyCallback) => {
        try {
            headers = headers || this.DEFAULT ;
            let response = await axios.post(url, params, headers);
            handler(response);
        } catch(error) {
            console.log(error);
            errorCallback && errorCallback(error);
        }

        finallyCallback && finallyCallback();
    }

}

const INSTANCE = new ApiCaller();
module.exports = INSTANCE;