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
class CrudService {
    constructor(repository) {
        this._repository = repository;
    }
    create(item) {
        return this._repository.create(item);
    }
    retrieve(criteria, pageRequest) {
        return this._repository.retrieve(criteria, pageRequest);
    }
    retrieveAll() {
        return this._repository.retrieveAll();
    }
    update(_id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = yield this._repository.findById(_id);
            return this._repository.update(obj._id, item);
        });
    }
    delete(_id) {
        return this._repository.delete(_id);
    }
    findById(_id) {
        return this._repository.findById(_id);
    }
    findOne(criteria) {
        return this._repository.findOne(criteria);
    }
}
Object.seal(CrudService);
module.exports = CrudService;
