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
const IndicatorService = require("../service/indicator.service");
const page_request_1 = require("../model/page-request");
const logger = (0, log4js_1.getLogger)("InvoiceController");
class InvoiceController {
    constructor() {
        this.retrieve = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let company = res.locals.jwtPayload.company;
                let pageRequest = new page_request_1.PageRequest(req);
                let response = yield this.invoiceService.retrieve({ company }, pageRequest);
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
                let company = res.locals.jwtPayload.company;
                let invoice = yield this.invoiceService.findById(req.params._id);
                res.send(invoice);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.createInvoice = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.company = res.locals.jwtPayload.company;
                let branchId = req.params.branchId;
                let invoice = req.body;
                logger.debug("Create invoice ==>>", invoice);
                let newInvoice = yield new InvoiceService().createInvoice(branchId, invoice);
                res.status(200).send(newInvoice);
            }
            catch (e) {
                logger.error(e);
                res.status(500).send(e.message);
            }
        });
        this.indicators = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let company = res.locals.jwtPayload.company;
                let indicator = req.params.indicator;
                let year = Number(req.query.year);
                let month = Number(req.query.month);
                let day = Number(req.query.day);
                let result;
                switch (indicator) {
                    case 'monthly':
                        result = yield this.indicatorService.monthly(company, year);
                        break;
                    case 'daily':
                        result = yield this.indicatorService.daily(company, year, month, day);
                        break;
                    case 'topProduct':
                        result = yield this.indicatorService.topProducts(company);
                        break;
                }
                res.status(200).send(result);
            }
            catch (e) {
                logger.error(e);
                res.status(500).send(e.message);
            }
        });
        this.queryInvoices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let company = res.locals.jwtPayload.company;
                let pageRequest = new page_request_1.PageRequest(req);
                let response = yield this.invoiceService.queryInvoice(company, req.body, pageRequest);
                res.header('X-Total-Count', response.total);
                res.status(200).send(response.data);
            }
            catch (e) {
                logger.error(e);
                res.status(500).send(e.message);
            }
        });
        this.indicatorService = new IndicatorService();
        this.invoiceService = new InvoiceService();
    }
}
module.exports = InvoiceController;
