"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRoutes = void 0;
const express_1 = require("express");
const InvoiceController = require("../controller/invoice.ctrl");
class InvoiceRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        let controller = new InvoiceController();
        this.router.route("/").get(controller.retrieve);
        this.router.route("/:_id").get(controller.findById);
        this.router.route("/branch/:branchId")
            .post(controller.createInvoice);
        this.router.route("/indicator/:indicator").get(controller.indicators);
        this.router.route("/query").put(controller.queryInvoices);
    }
}
exports.InvoiceRoutes = InvoiceRoutes;
