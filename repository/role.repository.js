"use strict";
const role_1 = require("../model/role");
class RoleRepository {
    constructor() { }
    retrieve(criteria) {
        return new Promise((resolve, reject) => {
            role_1.Role.find(criteria, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
    findById(_id) {
        return new Promise((resolve, reject) => {
            role_1.Role.findById(_id, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
Object.seal(RoleRepository);
module.exports = RoleRepository;
