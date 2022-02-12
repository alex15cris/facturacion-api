"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const country_1 = require("../model/country");
const base_repository_1 = __importDefault(require("./base.repository"));
class CountryRepository extends base_repository_1.default {
    constructor() {
        super(country_1.Country);
    }
}
Object.seal(CountryRepository);
module.exports = CountryRepository;
