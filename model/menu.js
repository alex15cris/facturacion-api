"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const mongoose_1 = require("mongoose");
let MenuSchema = new mongoose_1.Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    icontype: {
        type: String,
        required: false,
        trim: true
    },
    collapse: {
        type: String,
        required: false,
        trim: true
    },
    ab: {
        type: String,
        required: false,
        trim: true
    },
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Menu",
        required: false
    },
    roles: [{
            type: String,
            ref: 'Role',
            required: false
        }],
    children: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Menu',
            required: false
        }]
});
MenuSchema.index({ path: 1 }, { unique: true });
exports.Menu = (0, mongoose_1.model)("Menu", MenuSchema);
