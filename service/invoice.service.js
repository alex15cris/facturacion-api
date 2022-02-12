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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const invoice_repository_1 = __importDefault(require("./../repository/invoice.repository"));
const branch_repository_1 = __importDefault(require("./../repository/branch.repository"));
const establishment_repository_1 = __importDefault(require("./../repository/establishment.repository"));
const invoice_1 = require("../model/invoice");
const mongoose_1 = require("mongoose");
const report_service_1 = __importDefault(require("./report.service"));
const inovice_detail_repository_1 = __importDefault(require("../repository/inovice.detail.repository"));
const log4js_1 = require("log4js");
const path_1 = __importDefault(require("path"));
const mail_service_1 = require("./mail.service");
const customer_repository_1 = __importDefault(require("../repository/customer.repository"));
const catalog_repository_1 = __importDefault(require("../repository/catalog.repository"));
const logger = (0, log4js_1.getLogger)("InvoiceService");
class InvoiceService {
    constructor() {
        this.createInvoice = (branchId, invoice) => __awaiter(this, void 0, void 0, function* () {
            logger.debug('start createInvoice branchId:', branchId);
            let branch = yield this.branchRepository.findById(this.toObjectId(branchId));
            let establishment = yield this.establishmentRepository.findById(branch.establishment);
            branch.next = branch.next + 1;
            logger.debug('branch', branch);
            yield this.branchRepository.update(branch._id, branch);
            let customer = yield this.customerRepository.findById(this.toObjectId(invoice.customer));
            invoice.establishment = establishment._id;
            invoice.branch = branchId;
            invoice.secuence = establishment.code + "-" + branch.code + "-" + "0".repeat(5) + branch.next;
            invoice.firstName = customer.firstName;
            invoice.lastName = customer.lastName;
            invoice.taxId = customer.taxId;
            let createdInvoice = yield this.invoiceRespository.create(invoice);
            let createdDetail;
            for (let detail of invoice.detail) {
                detail.company = createdInvoice.company;
                detail.invoice = createdInvoice._id;
                createdDetail = yield this.invoiceDetailRespository.create(detail);
            }
            const isWin = process.platform === "win32";
            let base = path_1.default.join(__dirname, '../report');
            if (isWin)
                base = base.replace(/\\/g, '/');
            logger.debug('Base', base);
            const options = {
                base: 'file://' + base + path_1.default.sep,
                type: 'pdf',
                orientation: 'portrait'
            };
            logger.debug('options', options);
            let invoiceFound = yield this.invoiceRespository.findById(this.toObjectId(createdInvoice._id));
            let filePath = path_1.default.join(__dirname, '../../pdf');
            let fileName = invoice.secuence + '.pdf';
            logger.debug("filePath", filePath, "fileName", fileName);
            let paymentTypes = yield this.catalogRepository.findOne({ name: 'payment_method' });
            yield this.reportService.toFile(`${base}/invoice.html`, { invoice: invoiceFound, paymentTypes }, options, filePath + '/' + fileName);
            let email = {
                to: customer.email,
                subject: 'Factura Digital',
                template: 'invoice',
                context: {
                    firstName: customer.firstName,
                    lastName: customer.lastName
                },
                attachments: [{ filename: fileName, path: filePath + '/' + fileName }]
            };
            yield this.emailService.sendMail(email);
            return createdInvoice;
        });
        this.invoiceReport = (invoiceId, res) => __awaiter(this, void 0, void 0, function* () {
            logger.debug('Start invoiceReport invoiceId:', invoiceId);
            let invoice = yield this.invoiceRespository.findById(this.toObjectId(invoiceId));
            if (!invoice) {
                logger.error("Invoice Not Found");
            }
            const isWin = process.platform === "win32";
            let base = path_1.default.join(__dirname, '../report');
            if (isWin)
                base = base.replace(/\\/g, '/');
            const options = {
                base: 'file://' + base + path_1.default.sep,
                type: 'pdf',
                orientation: 'portrait'
            };
            let paymentTypes = yield this.catalogRepository.findOne({ name: 'payment_method' });
            yield this.reportService.toStream(`${base}/invoice.html`, { invoice, paymentTypes }, options, res);
        });
        this.branchRepository = new branch_repository_1.default();
        this.establishmentRepository = new establishment_repository_1.default();
        this.invoiceRespository = new invoice_repository_1.default();
        this.invoiceDetailRespository = new inovice_detail_repository_1.default();
        this.customerRepository = new customer_repository_1.default();
        this.reportService = new report_service_1.default();
        this.catalogRepository = new catalog_repository_1.default();
        this.emailService = new mail_service_1.EmailService();
    }
    retrieve(criteria, pageRequest) {
        return this.invoiceRespository.retrieve(criteria, pageRequest);
    }
    findById(_id) {
        return this.invoiceRespository.findById(this.toObjectId(_id));
    }
    queryInvoice(company, criteria, pageRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            criteria['company'] = company;
            for (const property in criteria) {
                if (this.isObjetcId(criteria[property])) {
                    criteria[property] = this.toObjectId(criteria[property]);
                }
                if (property == 'createdAt') {
                    if (criteria[property].$gte)
                        criteria[property].$gte = new Date(criteria[property].$gte);
                    if (criteria[property].$gt)
                        criteria[property].$gt = new Date(criteria[property].$gt);
                    if (criteria[property].$lte)
                        criteria[property].$lte = new Date(criteria[property].$lte);
                    if (criteria[property].$lt)
                        criteria[property].$lt = new Date(criteria[property].$lte);
                }
            }
            let searchFilter = [
                {
                    $match: criteria
                },
                {
                    $skip: pageRequest.pageSize * pageRequest.page
                },
                {
                    $limit: pageRequest.pageSize
                }
            ];
            if (pageRequest.sort) {
                let sortFilter = {};
                let fields = pageRequest.sort.split(',');
                fields.forEach(field => {
                    let order = field.indexOf('-') >= 0 ? -1 : 1;
                    sortFilter[field.replace(/\+|\-/ig, '')] = order;
                });
                searchFilter.push({ $sort: sortFilter });
            }
            let total = yield invoice_1.Invoice.countDocuments(criteria);
            let data = yield invoice_1.Invoice.aggregate(searchFilter);
            return { total, data };
        });
    }
    toObjectId(_id) {
        return new mongoose_1.Types.ObjectId(_id);
    }
    isObjetcId(_id) {
        return mongoose_1.Types.ObjectId.isValid(_id);
    }
}
Object.seal(InvoiceService);
module.exports = InvoiceService;
