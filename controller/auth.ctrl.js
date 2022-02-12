"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
const AuthService = require("../service/auth.service");
const log4js_1 = require("log4js");
const logger = (0, log4js_1.getLogger)("AuthController");
class AuthController {
}
_a = AuthController;
AuthController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.debug("Iniciar Registro");
    try {
        let user = req.body.user;
        let company = req.body.company;
        let newUser = yield new AuthService().register(company, user, req.body.user.password);
        res.send(newUser);
    }
    catch (error) {
        logger.error(error);
        logger.error("Code ====>>", error.code);
        logger.error("Message ====>>", error.message);
        res.status(500).send(error.message);
    }
});
AuthController.authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.debug("Inicia Autenticación");
    try {
        var email = req.body.email;
        var password = req.body.password;
        let auth = yield new AuthService().authenticate(email, password);
        res.send(auth);
    }
    catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
});
AuthController.authenticateWithCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.debug("Inicia authenticateWithCompany");
    try {
        let ruc = req.params.ruc;
        var email = req.body.email;
        var password = req.body.password;
        let auth = yield new AuthService().authenticateWithCompany(ruc, email, password);
        res.send(auth);
    }
    catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
});
AuthController.forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.debug("Iniciar forgotPassword");
    try {
        yield new AuthService().forgotPassword(req.body.email);
        res.send();
    }
    catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
});
AuthController.forgotPasswordWithCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.debug("Inicia forgotPasswordWithCompany");
    try {
        yield new AuthService().forgotPasswordWithCompany(req.params.ruc, req.body.email);
        res.send();
    }
    catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
});
AuthController.resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.debug("Iniciar resetPassword");
    try {
        yield new AuthService().resetPassword(req.body.token, req.body.password);
        res.send();
    }
    catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
});
AuthController.activateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger.debug("Inicia activateAccount");
    try {
        yield new AuthService().activateAccount(req.params.userId);
        res.send();
    }
    catch (error) {
        logger.error(error);
        res.status(500).send(error.message);
    }
});
module.exports = AuthController;
