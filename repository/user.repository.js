"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_1 = require("../model/user");
const base_repository_1 = __importDefault(require("./base.repository"));
class UserRepository extends base_repository_1.default {
    constructor() {
        super(user_1.User);
    }
    findById(_id) {
        return new Promise((resolve, reject) => {
            user_1.User.findById(_id)
                .populate("branch")
                .exec((error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
Object.seal(UserRepository);
module.exports = UserRepository;
