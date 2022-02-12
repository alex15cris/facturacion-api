"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const ProductController = require("../controller/product.ctrl");
const ProductCategoryController = require("../controller/product.category.ctrl");
class ProductRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        let controller = new ProductController();
        let categoryController = new ProductCategoryController();
        this.router.route("/category")
            .get(categoryController.retrieve)
            .post(categoryController.create);
        this.router.route("/category/:_id")
            .get(categoryController.findById)
            .put(categoryController.update)
            .delete(categoryController.delete);
        this.router.route("/")
            .get(controller.retrieve)
            .post(controller.create);
        this.router.route("/:_id")
            .get(controller.findById)
            .put(controller.update)
            .delete(controller.delete);
    }
}
exports.ProductRoutes = ProductRoutes;
