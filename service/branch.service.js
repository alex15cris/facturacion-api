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
const branch_repository_1 = __importDefault(require("./../repository/branch.repository"));
const crud_service_1 = __importDefault(require("./crud.service"));
const mongoose_1 = require("mongoose");
class BranchService extends crud_service_1.default {
    constructor() {
        super(new branch_repository_1.default());
        this.createWithEstablishment = (establishment, branch) => __awaiter(this, void 0, void 0, function* () {
            branch.establishment = this.toObjectId(establishment);
            return this._repository.create(branch);
        });
    }
    toObjectId(_id) {
        return new mongoose_1.Types.ObjectId(_id);
    }
}
Object.seal(BranchService);
module.exports = BranchService;
