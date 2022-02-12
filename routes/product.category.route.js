"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryRoutes = void 0;
const express_1 = require("express");
const ProductCategoryController = require("../controller/product.category.ctrl");
class ProductCategoryRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        let categoryController = new ProductCategoryController();
        this.router.route("/")
            .get(categoryController.retrieve)
            .post(categoryController.create);
        this.router.route("/:_id")
            .get(categoryController.findById)
            .put(categoryController.update)
            .delete(categoryController.delete);
    }
}
exports.ProductCategoryRoutes = ProductCategoryRoutes;
