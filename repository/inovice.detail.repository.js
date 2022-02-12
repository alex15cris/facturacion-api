"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const invoice_detail_1 = require("../model/invoice-detail");
const base_repository_1 = __importDefault(require("./base.repository"));
class InvoiceDetailRepository extends base_repository_1.default {
    constructor() {
        super(invoice_detail_1.InvoiceDetail);
    }
    findById(_id) {
        return new Promise((resolve, reject) => {
            invoice_detail_1.InvoiceDetail.findById(_id)
                .populate("company")
                .populate({ path: "invoice", populate: { path: "customer" } })
                .populate("product")
                .exec((error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
Object.seal(InvoiceDetailRepository);
module.exports = InvoiceDetailRepository;
