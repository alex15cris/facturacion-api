"use strict";
class ServiceException extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
    }
}
Object.seal(ServiceException);
module.exports = ServiceException;
