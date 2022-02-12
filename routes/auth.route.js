"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const AuthController = require("../controller/auth.ctrl");
class AuthRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        this.router.route("/register")
            .post(AuthController.register);
        this.router.route("/login")
            .put(AuthController.authenticate);
        this.router.route("/forgot-password")
            .post(AuthController.forgotPassword);
        this.router.route("/company/:ruc/login")
            .put(AuthController.authenticateWithCompany);
        this.router.route("/company/:ruc/forgot-password")
            .put(AuthController.forgotPasswordWithCompany);
        this.router.route("/reset-password")
            .put(AuthController.resetPassword);
        this.router.route("/activate-account/:userId")
            .put(AuthController.activateAccount);
    }
}
exports.AuthRoutes = AuthRoutes;
