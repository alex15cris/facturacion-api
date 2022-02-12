"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const state_1 = require("../model/state");
const base_repository_1 = __importDefault(require("./base.repository"));
class StateRepository extends base_repository_1.default {
    constructor() {
        super(state_1.State);
    }
}
Object.seal(StateRepository);
module.exports = StateRepository;
