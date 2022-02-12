"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
let UserSchema = new mongoose_1.Schema({
    company: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    role: {
        type: String,
        ref: 'Role',
        required: true
    },
    branch: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Branch',
        required: false
    },
    firstName: {
        type: String,
        required: false,
        trim: true
    },
    lastName: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: false,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    hash: {
        type: String,
        required: true
    },
    urlImage: {
        type: String,
        required: false
    },
    country: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    postal: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    about: {
        type: String,
        required: false
    },
    hasToUpdatePassword: {
        type: Boolean,
        required: true,
        default: false
    },
});
UserSchema.index({ company: 1, email: 1 }, { unique: true });
//Creando un modelo
exports.User = (0, mongoose_1.model)("User", UserSchema);
