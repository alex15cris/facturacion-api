"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const customer_repository_1 = __importDefault(require("./../repository/customer.repository"));
const crud_service_1 = __importDefault(require("./crud.service"));
class CustomerService extends crud_service_1.default {
    constructor() {
        super(new customer_repository_1.default());
    }
}
Object.seal(CustomerService);
module.exports = CustomerService;
