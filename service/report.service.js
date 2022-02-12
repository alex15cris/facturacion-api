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
const html_pdf_1 = __importDefault(require("html-pdf"));
const fs_1 = require("fs");
const ejs_1 = __importDefault(require("ejs"));
const log4js_1 = require("log4js");
const logger = (0, log4js_1.getLogger)("ReportService");
class ReportService {
    constructor() {
        this.toStream = (template, data, options, response) => __awaiter(this, void 0, void 0, function* () {
            let compiled = yield ejs_1.default.compile((0, fs_1.readFileSync)(template, 'utf-8'));
            let html = compiled(data);
            html_pdf_1.default.create(html, options).toStream((error, stream) => {
                if (error)
                    logger.error(error);
                stream.pipe(response);
            });
        });
        this.toFile = (template, data, options, path) => __awaiter(this, void 0, void 0, function* () {
            let compiled = yield ejs_1.default.compile((0, fs_1.readFileSync)(template, 'utf-8'));
            let html = compiled(data);
            html_pdf_1.default.create(html, options).toFile(path, (error, stream) => {
                if (error)
                    logger.error(error);
            });
        });
    }
}
Object.seal(ReportService);
module.exports = ReportService;
