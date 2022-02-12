"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const catalog_1 = require("../model/catalog");
const base_repository_1 = __importDefault(require("./base.repository"));
class CatalogRepository extends base_repository_1.default {
    constructor() {
        super(catalog_1.Catalog);
    }
    retrieveWithCriteria(criteria) {
        return catalog_1.Catalog.find(criteria);
    }
}
Object.seal(CatalogRepository);
module.exports = CatalogRepository;
