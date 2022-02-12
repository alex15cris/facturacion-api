"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const company_1 = require("../model/company");
const base_repository_1 = __importDefault(require("./base.repository"));
class CompanyRepository extends base_repository_1.default {
    constructor() {
        super(company_1.Company);
    }
}
Object.seal(CompanyRepository);
module.exports = CompanyRepository;
