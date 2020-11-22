/**
 * @author garcol
 */ 
class ResponseBuilder {
    
    constructor() {

    }

    /**
     * @param {HttpServletResponse} res
     * @param {Integer} httpStatus 
     * @param {JsonObject} data 
     */
    build = (res, httpStatus, data = {}) => {
        return res.status(httpStatus).send.bind(res, data);
    }

}

const INSTANCE = new ResponseBuilder();
module.exports = INSTANCE;