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
const CustomerService = require("../service/customer.service");
const BaseController = require("./base.ctrl");
const log4js_1 = require("log4js");
const logger = (0, log4js_1.getLogger)("CustomerController");
class CustomerController extends BaseController {
    constructor() {
        super(new CustomerService());
        this.findByTaxId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let taxId = req.params.taxId;
                let customer = yield this._service.findOne({ taxId: taxId });
                res.send(customer);
            }
            catch (e) {
                logger.error(e);
                res.status(e.code).send(e.message);
            }
        });
    }
}
module.exports = CustomerController;
