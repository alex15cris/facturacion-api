"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
const express_1 = require("express");
const report_ctrl_1 = __importDefault(require("../controller/report.ctrl"));
class ReportRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        let controller = new report_ctrl_1.default();
        this.router.route("/:invoceId").get(controller.reportInvoice);
    }
}
exports.ReportRoutes = ReportRoutes;
