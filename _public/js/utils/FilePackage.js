(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
