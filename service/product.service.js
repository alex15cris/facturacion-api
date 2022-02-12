"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const product_repository_1 = __importDefault(require("./../repository/product.repository"));
const crud_service_1 = __importDefault(require("./crud.service"));
class ProductService extends crud_service_1.default {
    constructor() {
        super(new product_repository_1.default());
    }
}
Object.seal(ProductService);
module.exports = ProductService;
