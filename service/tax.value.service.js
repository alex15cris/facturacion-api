"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const tax_value_repository_1 = __importDefault(require("./../repository/tax.value.repository"));
const crud_service_1 = __importDefault(require("./crud.service"));
class TaxValueService extends crud_service_1.default {
    constructor() {
        super(new tax_value_repository_1.default());
    }
}
Object.seal(TaxValueService);
module.exports = TaxValueService;
