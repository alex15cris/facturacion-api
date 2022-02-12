"use strict";
class RepositoryBase {
    constructor(schemaModel) {
        this._model = schemaModel;
    }
    create(item) {
        return new Promise((resolve, reject) => {
            this._model.create(item, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
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
            this._model.find(criteria).countDocuments((error, count) => {
                if (error)
                    reject(error);
                else {
                    this._model.find(criteria)
                        .select(pageRequest.fields)
                        .skip(pageRequest.pageSize * pageRequest.page)
                        .limit(pageRequest.pageSize)
                        .sort(pageRequest.sort)
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
    retrieveAll(criteria) {
        return new Promise((resolve, reject) => {
            this._model.find(criteria, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
    update(_id, item) {
        return new Promise((resolve, reject) => {
            this._model.findByIdAndUpdate({ _id }, item, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
    delete(_id) {
        return new Promise((resolve, reject) => {
            this._model.deleteOne({ _id }, (error) => {
                if (error)
                    reject(error);
                else
                    resolve(_id);
            });
        });
    }
    findById(_id) {
        return new Promise((resolve, reject) => {
            this._model.findById(_id, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
    findOne(searchCriteria) {
        return new Promise((resolve, reject) => {
            this._model.findOne(searchCriteria, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
module.exports = RepositoryBase;
