"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_ctrl_1 = require("../controller/user.ctrl");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    routes() {
        let controller = new user_ctrl_1.UserController();
        this.router.route("/profile-info")
            .get(controller.profileInfo);
        this.router.route("/profile-picture")
            .post(controller.uploadProfilePicture)
            .get(controller.getProfilePicture);
        this.router.route("/password")
            .put(controller.updatePassword);
        this.router.route("/")
            .get(controller.retrieve)
            .post(controller.createUser);
        this.router.route("/:_id")
            .get(controller.findById)
            .put(controller.update)
            .delete(controller.delete);
    }
}
exports.UserRoutes = UserRoutes;
