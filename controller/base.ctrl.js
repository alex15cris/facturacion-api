"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const page_request_1 = require("../model/page-request");
const log4js_1 = require("log4js");
const logger = (0, log4js_1.getLogger)("BaseController");
class BaseController {
    constructor(service) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.company = res.locals.jwtPayload.company;
                let objectParam = req.body;
                let objectCreated = yield this._service.create(objectParam);
                res.send(objectCreated);
            }
            catch (error) {
                logger.error(error);
                let message = error.message;
                if (error.code == 11000)
                    message = "Registro ya existe";
                res.status(500).send(message);
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                var objectParam = req.body;
                let objectUpdated = yield this._service.update(req.params._id, objectParam);
                res.send(objectUpdated);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._service.delete(req.params._id);
                res.send({ "success": "success" });
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.retrieve = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let company = res.locals.jwtPayload.company;
                let pageRequest = new page_request_1.PageRequest(req);
                let response = yield this._service.retrieve({ company }, pageRequest);
                res.header('X-Total-Count', response.total);
                res.send(response.data);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let objectFound = yield this._service.findById(req.params._id);
                res.send(objectFound);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this._service = service;
    }
}
module.exports = BaseController;
