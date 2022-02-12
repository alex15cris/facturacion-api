"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const invoice_1 = require("../model/invoice");
const base_repository_1 = __importDefault(require("./base.repository"));
class InvoiceRepository extends base_repository_1.default {
    constructor() {
        super(invoice_1.Invoice);
    }
    findById(_id) {
        return new Promise((resolve, reject) => {
            invoice_1.Invoice.findById(_id)
                .populate("company")
                .populate({ path: "branch", populate: { path: "establishment" } })
                .populate("customer")
                .populate({ path: "detail.product", model: "Product" })
                .exec((error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
Object.seal(InvoiceRepository);
module.exports = InvoiceRepository;
