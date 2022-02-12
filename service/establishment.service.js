"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const crud_service_1 = __importDefault(require("./crud.service"));
const establishment_repository_1 = __importDefault(require("../repository/establishment.repository"));
class EstablishmentService extends crud_service_1.default {
    constructor() {
        super(new establishment_repository_1.default());
    }
}
Object.seal(EstablishmentService);
module.exports = EstablishmentService;
