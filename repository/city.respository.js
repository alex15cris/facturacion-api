"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const city_1 = require("../model/city");
const base_repository_1 = __importDefault(require("./base.repository"));
class CityRepository extends base_repository_1.default {
    constructor() {
        super(city_1.City);
    }
}
Object.seal(CityRepository);
module.exports = CityRepository;
