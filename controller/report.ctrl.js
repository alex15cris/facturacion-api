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
const log4js_1 = require("log4js");
const InvoiceService = require("../service/invoice.service");
const logger = (0, log4js_1.getLogger)("InvoiceController");
class ReportController {
    constructor() {
        this.reportInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                logger.debug("start reportInvoice id:", req.params.invoceId);
                this.invoiceService.invoiceReport(req.params.invoceId, res);
            }
            catch (e) {
                logger.error(e);
                res.sendStatus(500);
            }
        });
        this.invoiceService = new InvoiceService();
    }
}
module.exports = ReportController;
