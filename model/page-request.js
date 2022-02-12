"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageRequest = void 0;
class PageRequest {
    constructor(request) {
        this.q = request.query.q;
        this.page = parseInt(request.query.page);
        this.pageSize = parseInt(request.query.per_page);
        this.fields = request.query.fields;
        this.sort = request.query.sort;
    }
}
exports.PageRequest = PageRequest;
