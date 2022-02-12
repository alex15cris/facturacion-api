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
const BranchService = require("../service/branch.service");
const BaseController = require("./base.ctrl");
const log4js_1 = require("log4js");
const page_request_1 = require("../model/page-request");
const logger = (0, log4js_1.getLogger)("BranchController");
class BranchController extends BaseController {
    constructor() {
        super(new BranchService());
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger.debug("Start create override in BranchController");
            try {
                let objectCreated = yield new BranchService().createWithEstablishment(req.params.establishmentId, req.body);
                res.send(objectCreated);
            }
            catch (error) {
                logger.error(error);
                let message = error.message;
                if (error.code == 11000)
                    message = "Registro ya existe";
                res.status(500).send(error.message);
            }
        });
        this.retrieve = (req, res) => __awaiter(this, void 0, void 0, function* () {
            logger.debug("Start retrive override in BranchController");
            try {
                let establishmentId = req.params.establishmentId;
                let pageRequest = new page_request_1.PageRequest(req);
                let response = yield this._service.retrieve({ establishment: establishmentId }, pageRequest);
                res.header('X-Total-Count', response.total);
                res.send(response.data);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
    }
}
module.exports = BranchController;
