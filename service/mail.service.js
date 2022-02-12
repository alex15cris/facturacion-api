"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const log4js_1 = require("log4js");
const path_1 = __importDefault(require("path"));
// tslint:disable-next-line: no-var-requires
const hbs = require('nodemailer-express-handlebars');
const logger = (0, log4js_1.getLogger)("EmailService");
class EmailService {
    constructor() {
    }
    //Método que envía al correo
    sendMail(email) {
        logger.debug('Inicia el envío del correo:', email);
        // Configuración de handlebars
        const hbsConfig = {
            viewEngine: {
                extName: '.hbs',
                partialsDir: path_1.default.join(__dirname, '../views/'),
                layoutsDir: path_1.default.join(__dirname, '../views/'),
                defaultLayout: ''
            },
            viewPath: path_1.default.join(__dirname, '../views/'),
            extName: '.hbs'
        };
        // Creacion de parámetros del envío del correo
        let smtpTransport = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_SECRET
            }
        });
        smtpTransport.use('compile', hbs(hbsConfig));
        let mailOptions = {
            from: process.env.GMAIL_USER,
            to: email.to,
            subject: email.subject,
            template: email.template,
            context: email.context,
            attachments: email.attachments
        };
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error)
                logger.error(error);
            logger.debug(response);
        });
    }
}
exports.EmailService = EmailService;
