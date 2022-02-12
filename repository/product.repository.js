"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const product_1 = require("../model/product");
const base_repository_1 = __importDefault(require("./base.repository"));
class ProductRepository extends base_repository_1.default {
    constructor() {
        super(product_1.Product);
    }
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
            product_1.Product.find(criteria).countDocuments((error, count) => {
                if (error)
                    reject(error);
                else {
                    product_1.Product.find(criteria)
                        .select(pageRequest.fields)
                        .skip(pageRequest.pageSize * pageRequest.page)
                        .limit(pageRequest.pageSize)
                        .sort(pageRequest.sort)
                        .populate('taxes')
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
            product_1.Product.findById(_id)
                .populate("taxes")
                .exec((error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
Object.seal(ProductRepository);
module.exports = ProductRepository;
