"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const mongoose_1 = require("mongoose");
let CompanySchema = new mongoose_1.Schema({
    ruc: {
        type: String,
        required: true,
        maxLength: [13, 'Maximo 13 caracteres'],
        minLength: [13, 'Minimo 13 caracteres'],
        trim: true
    },
    name: {
        type: String,
        required: false,
        trim: true
    },
    address: {
        type: String,
        required: false
    },
    urlLogo: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: false,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});
//Crea indice para el codigo
CompanySchema.index({ ruc: 1 }, { unique: true });
exports.Company = (0, mongoose_1.model)("Company", CompanySchema);
