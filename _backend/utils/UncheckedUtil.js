/**
 * @author thaivan
 */
class UncheckedUtil {
    constructor() {

    }

    /**
     * 
     * @param {Funtion} callable 
     * @param {Funtion} errorHandler 
     * @returns callable result
     */
    call(callable, errorHandler) {
        try {
            return callable();
        } catch(error) {
            console.log(error);
            errorHandler && errorHandler(error);
            return null;
        }
    }

    /**
     * 
     * @param {Funtion} runnable 
     * @param {Funtion} errorHandler 
     */
    run(runnable, errorHandler) {
        try {
            runnable();
        } catch(error) {
            console.log(error);
            errorHandler && errorHandler(error);
        }
    }
}

const INSTANCE = new UncheckedUtil();
module.exports = INSTANCE;