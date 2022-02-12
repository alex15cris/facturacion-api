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
const mongoose_1 = require("mongoose");
const catalog_repository_1 = __importDefault(require("../repository/catalog.repository"));
const menu_repository_1 = __importDefault(require("../repository/menu.repository"));
const role_repository_1 = __importDefault(require("../repository/role.repository"));
const company_repository_1 = __importDefault(require("../repository/company.repository"));
const country_repository_1 = __importDefault(require("../repository/country.repository"));
const state_repository_1 = __importDefault(require("../repository/state.repository"));
const city_respository_1 = __importDefault(require("../repository/city.respository"));
class AdminService {
    constructor() {
        this.retrieveByParent = (parentId, roleId) => __awaiter(this, void 0, void 0, function* () {
            let menus = yield this.menuRepository.retrieve({ parent: parentId === '' ? undefined : parentId, roles: { $in: roleId } });
            menus.forEach(m => m.roles = []);
            return menus;
        });
        this.retrieveMenu = (role) => __awaiter(this, void 0, void 0, function* () {
            let menus = yield this.retrieveByParent('', role);
            for (let menu of menus) {
                menu.children = yield this.retrieveByParent(menu._id, role);
            }
            return menus;
        });
        this.retrieveRoles = () => {
            return this.roleRepository.retrieve({ _id: { $nin: ['SUPERADMIN'] } });
        };
        this.getCatalogByName = (name) => {
            return this.catalogRepository.findOne({ name });
        };
        this.getCompanyById = (_id) => {
            return this.companyRepository.findById(this.toObjectId(_id));
        };
        this.updateCompany = (_id, company) => {
            return this.companyRepository.update(this.toObjectId(_id), company);
        };
        this.getCountries = () => {
            return this.countryRepository.retrieveAll({});
        };
        this.getStates = (country) => {
            return this.stateRepository.retrieveAll({ country: this.toObjectId(country) });
        };
        this.getCities = (state) => {
            return this.cityRepository.retrieveAll({ state: this.toObjectId(state) });
        };
        this.menuRepository = new menu_repository_1.default();
        this.roleRepository = new role_repository_1.default();
        this.catalogRepository = new catalog_repository_1.default();
        this.companyRepository = new company_repository_1.default();
        this.countryRepository = new country_repository_1.default();
        this.stateRepository = new state_repository_1.default();
        this.cityRepository = new city_respository_1.default();
    }
    toObjectId(_id) {
        return new mongoose_1.Types.ObjectId(_id);
    }
}
Object.seal(AdminService);
module.exports = AdminService;
