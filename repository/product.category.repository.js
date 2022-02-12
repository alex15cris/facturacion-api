"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const product_category_1 = require("../model/product-category");
const base_repository_1 = __importDefault(require("./base.repository"));
class ProductCategoryRepository extends base_repository_1.default {
    constructor() {
        super(product_category_1.ProductCategory);
    }
}
Object.seal(ProductCategoryRepository);
module.exports = ProductCategoryRepository;
