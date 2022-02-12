"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const base_repository_1 = __importDefault(require("./base.repository"));
const establishment_1 = require("../model/establishment");
class EstablishmentRepository extends base_repository_1.default {
    constructor() {
        super(establishment_1.Establishment);
    }
}
Object.seal(EstablishmentRepository);
module.exports = EstablishmentRepository;
