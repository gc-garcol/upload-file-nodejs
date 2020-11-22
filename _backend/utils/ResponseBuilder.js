/**
 * @author garcol
 */ 
class ResponseBuilder {
    
    constructor() {

    }

    /**
     * 
     * @param {Integer} httpStatus 
     * @param {JsonObject} data 
     */
    build = (httpStatus, data = {}) => {
        return {
            status: httpStatus,
            data: data
        }
    }

}

const INSTANCE = new ResponseBuilder();
module.exports = INSTANCE;