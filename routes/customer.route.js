"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoutes = void 0;
const express_1 = require("express");
const CustomerController = require("../controller/customer.ctrl");
class CustomerRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        let controller = new CustomerController();
        this.router.route("/taxId/:taxId")
            .get(controller.findByTaxId);
        this.router.route("/")
            .get(controller.retrieve)
            .post(controller.create);
        this.router.route("/:_id")
            .get(controller.findById)
            .put(controller.update)
            .delete(controller.delete);
    }
}
exports.CustomerRoutes = CustomerRoutes;
