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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_repository_1 = __importDefault(require("./../repository/user.repository"));
const company_repository_1 = __importDefault(require("../repository/company.repository"));
const crud_service_1 = __importDefault(require("./crud.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mail_service_1 = require("./mail.service");
const log4js_1 = require("log4js");
const mongoose_1 = require("mongoose");
const logger = (0, log4js_1.getLogger)("UserService");
class UserService extends crud_service_1.default {
    constructor() {
        super(new user_repository_1.default());
        this.companyRepository = new company_repository_1.default();
        this.emailService = new mail_service_1.EmailService();
    }
    retrieve(criteria, pageRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            criteria.role = { $nin: ['SUPERADMIN'] };
            return this._repository.retrieve(criteria, pageRequest);
        });
    }
    createUser(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            user.hasToUpdatePassword = true;
            user.hash = bcryptjs_1.default.hashSync(password, 10);
            let company = yield this.companyRepository.findById(user.company);
            let userCreated = yield this._repository.create(user);
            let email = {
                to: userCreated.email,
                subject: 'Cuenta Creada Exitosamente',
                template: 'newuser',
                context: { link: `${process.env.WEB_URL}/#/auth/login-company?ruc=${company.ruc}`, username: userCreated.email }
            };
            this.emailService.sendMail(email);
            return userCreated;
        });
    }
    updatePassword(userId, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let hash = bcryptjs_1.default.hashSync(password, 10);
            yield this._repository.update(this.toObjectId(userId), { hash, hasToUpdatePassword: false });
        });
    }
    toObjectId(_id) {
        return new mongoose_1.Types.ObjectId(_id);
    }
}
Object.seal(UserService);
module.exports = UserService;
