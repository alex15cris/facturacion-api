"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const branch_1 = require("../model/branch");
const base_repository_1 = __importDefault(require("./base.repository"));
class BranchRepository extends base_repository_1.default {
    constructor() {
        super(branch_1.Branch);
    }
    //Consulta segun el criterio de busqueda con paginacion segun la busqueda
    retrieve(criteria, pageRequest) {
        let plus = /\+/g;
        let comma = /\,/g;
        if (pageRequest.q) {
            criteria.$text = { $search: pageRequest.q };
        }
        if (pageRequest.sort) {
            pageRequest.sort = pageRequest.sort.replace(plus, '');
            pageRequest.sort = pageRequest.sort.replace(comma, ' ');
        }
        if (pageRequest.fields) {
            pageRequest.fields = pageRequest.fields.replace(comma, ' ');
        }
        return new Promise((resolve, reject) => {
            let response = {};
            branch_1.Branch.find(criteria).countDocuments((error, count) => {
                if (error)
                    reject(error);
                else {
                    branch_1.Branch.find(criteria)
                        .select(pageRequest.fields)
                        .skip(pageRequest.pageSize * pageRequest.page)
                        .limit(pageRequest.pageSize)
                        .sort(pageRequest.sort)
                        .populate('establishment')
                        .exec((error, result) => {
                        if (error)
                            reject(error);
                        else {
                            response.total = count;
                            response.data = result;
                            resolve(response);
                        }
                    });
                }
            });
        });
    }
    findById(_id) {
        return new Promise((resolve, reject) => {
            branch_1.Branch.findById(_id)
                .populate("establishment")
                .exec((error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
Object.seal(BranchRepository);
module.exports = BranchRepository;
