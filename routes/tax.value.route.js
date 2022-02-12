"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxValueRoutes = void 0;
const express_1 = require("express");
const tax_value_ctrl_1 = __importDefault(require("../controller/tax.value.ctrl"));
class TaxValueRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        let taxValueController = new tax_value_ctrl_1.default();
        this.router.route("/")
            .get(taxValueController.retrieve)
            .post(taxValueController.create);
        this.router.route("/:_id")
            .get(taxValueController.findById)
            .put(taxValueController.update)
            .delete(taxValueController.delete);
    }
}
exports.TaxValueRoutes = TaxValueRoutes;
