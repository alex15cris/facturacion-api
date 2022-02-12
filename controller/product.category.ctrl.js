"use strict";
const ProductCategoryService = require("../service/product.category.service");
const BaseController = require("./base.ctrl");
class ProductCategoryController extends BaseController {
    constructor() {
        super(new ProductCategoryService());
    }
}
module.exports = ProductCategoryController;
