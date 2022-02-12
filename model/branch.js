"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Branch = void 0;
const mongoose_1 = require("mongoose");
let BranchSchema = new mongoose_1.Schema({
    establishment: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Establishment',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: false
    },
    next: {
        type: Number,
        required: true,
        default: 0
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});
//crea indice 
BranchSchema.index({ establishment: 1, code: 1 }, { unique: true });
exports.Branch = (0, mongoose_1.model)("Branch", BranchSchema);
