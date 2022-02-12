"use strict";
const ProductService = require("../service/product.service");
const BaseController = require("./base.ctrl");
class ProductController extends BaseController {
    constructor() {
        super(new ProductService());
    }
}
module.exports = ProductController;
