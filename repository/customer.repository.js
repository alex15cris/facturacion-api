"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const customer_1 = require("../model/customer");
const base_repository_1 = __importDefault(require("./base.repository"));
class CustomerRepository extends base_repository_1.default {
    constructor() {
        super(customer_1.Customer);
    }
}
Object.seal(CustomerRepository);
module.exports = CustomerRepository;
