"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Establishment = void 0;
const mongoose_1 = require("mongoose");
let EstablishmentSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    address: {
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
EstablishmentSchema.index({ company: 1, code: 1 }, { unique: true });
exports.Establishment = (0, mongoose_1.model)("Establishment", EstablishmentSchema);
