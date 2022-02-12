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
const jwt = require("jsonwebtoken");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const log4js_1 = require("log4js");
const UserRepository = require("../repository/user.repository");
const CompanyRepository = require("../repository/company.repository");
const mail_service_1 = require("./mail.service");
const ServiceException = require("./service.exception");
const mongoose_1 = require("mongoose");
const logger = (0, log4js_1.getLogger)("AuthService");
class AuthService {
    constructor() {
        this._userRepository = new UserRepository();
        this._companyRepository = new CompanyRepository();
        this.emailService = new mail_service_1.EmailService();
    }
    register(company, user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //Metodo que registra el usuario nuevo
            logger.debug('Start register', company, user);
            //Crea la empresa
            let companyCreated = yield this._companyRepository.create(company);
            //resetea la id de la empresa
            user.company = companyCreated._id;
            //encripta la contraseña
            user.hash = bcryptjs_1.default.hashSync(password, 10);
            //usuario desactivado
            user.active = false;
            // asigna rol SUPERADMIN
            user.role = 'SUPERADMIN';
            //Crea el usuario
            let userCreated = yield this._userRepository.create(user);
            //Asigna cuenta de email 
            let email = {
                to: user.email,
                subject: 'Cuenta Creada Exitosamente',
                template: 'newaccount',
                context: { link: `${process.env.WEB_URL}/#/auth/activate-account/${userCreated._id}` }
            };
            //envia el correo
            this.emailService.sendMail(email);
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //envia a la base a buscar el email
            let user = yield this._userRepository.findOne({ role: 'SUPERADMIN', email });
            //si no existe el usuario 
            if (!user)
                throw new ServiceException(403, "No existe este usuario como dueño de una empresa");
            //si el usuario no esta activo
            if (!user.active)
                throw new ServiceException(403, "Tu cuenta no esta activa revisa to correo o comunicate con el administrador para activar tu cuenta");
            //si la contraseña no coincide 
            if (!bcryptjs_1.default.compareSync(password, String(user.hash)))
                throw new ServiceException(403, "Email o Password Incorrecto");
            let token = this.createToken(user);
            //genera el token
            return token;
        });
    }
    authenticateWithCompany(ruc, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let company = yield this._companyRepository.findOne({ ruc });
            //envia a la base a buscar el email
            let user = yield this._userRepository.findOne({ company: company._id, email });
            //si no existe el usuario 
            if (!user)
                throw new ServiceException(403, "Usuario no existe");
            //si el usuario no esta activo
            if (!user.active)
                throw new ServiceException(403, "Tu cuenta no esta activa revisa to correo para activar tu cuenta");
            //si la contraseña no coincide 
            if (!bcryptjs_1.default.compareSync(password, String(user.hash)))
                throw new ServiceException(403, "Email o Password Incorrecto");
            let token = this.createToken(user);
            //genera el token
            return token;
        });
    }
    //Olvido contraseña usuario propietario de empresa
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this._userRepository.findOne({ role: 'SUPERADMIN', email });
            if (!user)
                throw new ServiceException(403, 'No existe una cuenta raiz con este usuario');
            if (!user.active)
                throw new ServiceException(403, 'Tu cuenta no esta activa revisa tu correo o comunicate con el administrador para activar tu cuenta');
            let token = this.forgotPasswordToken(user);
            let emailDto = {
                to: email,
                subject: 'Cambia tu contraseña',
                template: 'changepassword',
                context: { link: `http://${process.env.WEB_URL}/#/auth/reset-password/${token}` }
            };
            this.emailService.sendMail(emailDto);
        });
    }
    //Olvido contraseña para usuario de la empresa
    forgotPasswordWithCompany(ruc, email) {
        return __awaiter(this, void 0, void 0, function* () {
            let company = yield this._companyRepository.findOne({ ruc });
            let user = yield this._userRepository.findOne({ company: company._id, email });
            if (!user)
                throw new ServiceException(403, 'Usuario no existe');
            let token = this.forgotPasswordToken(user);
            let emailDto = {
                to: email,
                subject: 'Cambia tu contraseña',
                template: 'forgotpassword',
                context: { link: `http://${process.env.WEB_URL}/#/auth/reset-password/${token}` }
            };
            this.emailService.sendMail(emailDto);
        });
    }
    //Cambio contraseña
    resetPassword(token, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let jwtPayload = jwt.verify(token, process.env.SECRET || '');
            let user = yield this._userRepository.findById(jwtPayload.sub);
            user.hash = bcryptjs_1.default.hashSync(password, 10);
            yield this._userRepository.update(user._id, user);
        });
    }
    //Activa cuenta usuario
    activateAccount(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.debug('Start activateAccount', userId);
            yield this._userRepository.update(this.toObjectId(userId), { active: true });
        });
    }
    //Crea el token válido por un día en el cual consta el rol y id del usuario
    createToken(user) {
        //genera una variable pero es constante la misma que no cambia su valor
        const expiresIn = 60 * 60 * 24; //60 seg x 60 min x 24 hours=1 día
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
            company: user.company,
            sub: user._id,
            role: user.role
        };
        //permite declarar una variable que puede cambiar su valor
        let token = {
            result: user,
            //firma el token
            token: jwt.sign(dataStoredInToken, secret, { expiresIn })
        };
        return token;
    }
    //Asigna token para cambio de contraseña
    forgotPasswordToken(user) {
        const expiresIn = 60 * 5; //60 seg x 5 min 
        const secret = process.env.SECRET || '';
        const dataStoredInToken = {
            company: user.company,
            sub: user._id
        };
        return jwt.sign(dataStoredInToken, secret, { expiresIn });
    }
    toObjectId(_id) {
        return new mongoose_1.Types.ObjectId(_id);
    }
}
Object.seal(AuthService);
module.exports = AuthService;
