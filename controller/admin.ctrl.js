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
const AdminService = require("../service/admin.service");
const mail_service_1 = require("../service/mail.service");
const log4js_1 = require("log4js");
const logger = (0, log4js_1.getLogger)("AdminController");
class AdminController {
    constructor() {
        this.getMenu = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let role = res.locals.jwtPayload.role;
                let menu = yield this.adminService.retrieveMenu(role);
                res.status(200).send(menu);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.getRoles = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let roles = yield this.adminService.retrieveRoles();
                res.status(200).send(roles);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.getCatalogByName = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.adminService.getCatalogByName(req.params.name);
                res.send(response);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.getCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let companyId = res.locals.jwtPayload.company;
                let response = yield this.adminService.getCompanyById(companyId);
                res.send(response);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.updateCompany = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let companyId = res.locals.jwtPayload.company;
                let response = yield this.adminService.updateCompany(companyId, req.body);
                res.send(response);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.testEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let companyId = res.locals.jwtPayload.company;
                let email = {
                    to: req.body.email,
                    subject: 'Prueba de Email',
                    template: 'emailtest',
                    context: { year: new Date().getFullYear() }
                };
                this.emailService.sendMail(email);
                res.sendStatus(200);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.getCountries = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.adminService.getCountries();
                res.send(response);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.getStates = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = [];
                let country = req.params.country;
                if (country != 'null') {
                    response = yield this.adminService.getStates(country);
                }
                res.send(response);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.getCities = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = [];
                if (req.params.state != 'null')
                    response = yield this.adminService.getCities(req.params.state);
                res.send(response);
            }
            catch (error) {
                logger.error(error);
                res.status(500).send(error.message);
            }
        });
        this.adminService = new AdminService();
        this.emailService = new mail_service_1.EmailService();
    }
}
module.exports = AdminController;
