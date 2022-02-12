"use strict";
const EstablishmentService = require("../service/establishment.service");
const BaseController = require("./base.ctrl");
class EstablishmentController extends BaseController {
    constructor() {
        super(new EstablishmentService());
    }
}
module.exports = EstablishmentController;
