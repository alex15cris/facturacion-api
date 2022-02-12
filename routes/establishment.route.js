"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstablishmentRoutes = void 0;
const express_1 = require("express");
const EstablishmentController = require("../controller/establishment.ctrl");
const BranchController = require("../controller/branch.ctrl");
class EstablishmentRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        let branchCtrl = new BranchController();
        this.router.route("/:establishmentId/branch")
            .get(branchCtrl.retrieve)
            .post(branchCtrl.create);
        this.router.route("/:establishmentId/branch/:_id")
            .get(branchCtrl.findById)
            .put(branchCtrl.update)
            .delete(branchCtrl.delete);
        let establishmentCtrl = new EstablishmentController();
        this.router.route("/")
            .get(establishmentCtrl.retrieve)
            .post(establishmentCtrl.create);
        this.router.route("/:_id")
            .get(establishmentCtrl.findById)
            .put(establishmentCtrl.update)
            .delete(establishmentCtrl.delete);
    }
}
exports.EstablishmentRoutes = EstablishmentRoutes;
