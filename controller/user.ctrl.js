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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService = require("../service/user.service");
const BaseController = require("./base.ctrl");
const log4js_1 = require("log4js");
const multer = require("multer");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const logger = (0, log4js_1.getLogger)("UserController");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/cecy/profile_picture/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
class UserController extends BaseController {
    constructor() {
        super(new UserService());
        this.profileInfo = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let objectFound = yield new UserService().findById(res.locals.jwtPayload.sub);
                res.send(objectFound);
            }
            catch (error) {
                logger.error(error);
                res.send(error === null || error === void 0 ? void 0 : error.message);
            }
        });
        this.updatePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let objectFound = yield new UserService().updatePassword(res.locals.jwtPayload.sub, req.body.password);
                res.send(objectFound);
            }
            catch (error) {
                logger.error(error);
                res.send(error === null || error === void 0 ? void 0 : error.message);
            }
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.body.company = res.locals.jwtPayload.company;
                let user = yield new UserService().createUser(req.body, req.body.password);
                res.send(user);
            }
            catch (error) {
                logger.error(error);
                let message = error.message;
                if (error.code == 11000)
                    message = "Registro ya existe";
                res.send(error === null || error === void 0 ? void 0 : error.message);
            }
        });
        this.uploadProfilePicture = (req, res) => {
            let upload = multer({ storage: storage, fileFilter: this.imageFilter }).single('upload');
            upload(req, res, function (err) {
                var _a;
                // req.file contains information of uploaded file
                // req.body contains information of text fields, if there were any
                if (err instanceof multer.MulterError) {
                    return res.send(err);
                }
                else if (err) {
                    return res.send(err);
                }
                // Display uploaded image for user validation
                res.send(`You have uploaded this image: <hr/><img src="${(_a = req === null || req === void 0 ? void 0 : req.file) === null || _a === void 0 ? void 0 : _a.path}" width="500"><hr /><a href="./">Upload another image</a>`);
            });
        };
        this.getProfilePicture = (req, res) => {
            //read the image using fs and send the image content back in the response
            fs_1.default.readFile('/home/cecy/profile_picture/cecy.jpg', (err, content) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    logger.error(err);
                    res.end("No such image");
                }
                else {
                    //specify the content type in the response will be an image
                    res.writeHead(200, { 'Content-Type': 'image/jpg' });
                    res.end(content);
                }
            });
        };
        this.getFileExtension = (urlImage) => {
            let parts = urlImage.split('/');
            let fileName = '';
            logger.debug("url parts", parts);
            if (parts.length > 0) {
                fileName = parts[parts.length - 1];
            }
            return fileName.split('.')[1];
        };
        this.imageFilter = function (req, file, cb) {
            console.log("Entro a image filter");
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
                req.fileValidationError = 'Only image files are allowed!';
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        };
    }
}
exports.UserController = UserController;
