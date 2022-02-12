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
const log4js_1 = require("log4js");
const mongoose_1 = require("mongoose");
const invoice_detail_1 = require("../model/invoice-detail");
const logger = (0, log4js_1.getLogger)("IndicatorService");
class IndicatorService {
    constructor() {
        this.locale = 'es-ES';
    }
    monthly(company, year) {
        return __awaiter(this, void 0, void 0, function* () {
            let months = [
                { value: 1, description: 'ENE', total: 0 },
                { value: 2, description: 'FEB', total: 0 },
                { value: 3, description: 'MAR', total: 0 },
                { value: 4, description: 'ABR', total: 0 },
                { value: 5, description: 'MAY', total: 0 },
                { value: 6, description: 'JUN', total: 0 },
                { value: 7, description: 'JUL', total: 0 },
                { value: 8, description: 'AGO', total: 0 },
                { value: 9, description: 'SEP', total: 0 },
                { value: 10, description: 'OCT', total: 0 },
                { value: 11, description: 'NOV', total: 0 },
                { value: 12, description: 'DIC', total: 0 },
            ];
            const aggregation = [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$company', this.toObjectId(company)] },
                                { $eq: [{ $year: "$createdAt" }, year] }
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: { month: { $month: '$createdAt' } },
                        totalSaleAmount: { $sum: '$total' }
                    }
                }
            ];
            let result = yield invoice_detail_1.InvoiceDetail.aggregate(aggregation);
            let element;
            months.forEach(item => {
                element = result.find(e => e._id.month === item.value);
                if (element)
                    item.total = element.totalSaleAmount;
            });
            return months;
        });
    }
    daily(company, year, month, day) {
        return __awaiter(this, void 0, void 0, function* () {
            let date = new Date(year, month - 1, day);
            let days = [];
            let options = { weekday: 'short', day: 'numeric' };
            for (let i = 1; i <= 7; i++) {
                date.setDate(date.getDate() - date.getDay() + i);
                days.push({ value: date.getDate(), description: date.toLocaleDateString(this.locale, options), total: 0 });
            }
            const aggregation = [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ['$company', this.toObjectId(company)] },
                                { $eq: [{ $year: "$createdAt" }, year] },
                                { $eq: [{ $month: "$createdAt" }, month] },
                            ]
                        }
                    }
                },
                {
                    $group: {
                        _id: { day: { $dayOfMonth: '$createdAt' } },
                        totalSaleAmount: { $sum: '$total' }
                    }
                }
            ];
            let result = yield invoice_detail_1.InvoiceDetail.aggregate(aggregation);
            let element;
            days.forEach(item => {
                element = result.find(e => e._id.day === item.value);
                if (element)
                    item.total = element.totalSaleAmount;
            });
            return days;
        });
    }
    topProducts(company) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield invoice_detail_1.InvoiceDetail.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: 'product',
                        foreignField: '_id',
                        as: 'product'
                    },
                },
                {
                    $project: {
                        product: {
                            name: 1
                        },
                        quantity: 1,
                        company: 1
                    }
                },
                {
                    $match: {
                        $expr: {
                            $eq: ['$company', this.toObjectId(company)]
                        }
                    }
                },
                {
                    $group: {
                        _id: '$product',
                        quantity: { $sum: '$quantity' }
                    }
                },
                {
                    $sort: { quantity: -1 }
                },
                {
                    $limit: 5
                }
            ]);
            logger.debug("result", result);
            return result.map(element => ({ 'description': element._id[0].name, 'total': element.quantity }));
        });
    }
    toObjectId(_id) {
        return new mongoose_1.Types.ObjectId(_id);
    }
}
Object.seal(IndicatorService);
module.exports = IndicatorService;
