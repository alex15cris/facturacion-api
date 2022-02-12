"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const tax_value_1 = require("../model/tax-value");
const base_repository_1 = __importDefault(require("./base.repository"));
class TaxValueRepository extends base_repository_1.default {
    constructor() {
        super(tax_value_1.TaxValue);
    }
}
Object.seal(TaxValueRepository);
module.exports = TaxValueRepository;
