/**
 * @author garcol
 */
class FilePackage {
    
    constructor() {

    }

    builder = (form) => {
        return new Builder(form);
    }
}

/**
 * Builder
 * @author garcol
 */
class Builder {

    /**
     * convert FormDOM to FormData
     * @param {FormDOM} form 
     */
    constructor(form) {
        this.formData = new FormData(form);
    }

    putData = (name, file) => {
        this.formData.append(name, file);
        return this;
    }

    build = () => {
        return this.formData;
    }
}

const INSTANCE = new FilePackage();
module.exports = INSTANCE;