"use strict";
const menu_1 = require("../model/menu");
class MenuRepository {
    constructor() { }
    retrieve(criteria) {
        return new Promise((resolve, reject) => {
            menu_1.Menu.find(criteria, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
Object.seal(MenuRepository);
module.exports = MenuRepository;
