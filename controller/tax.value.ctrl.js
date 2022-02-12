"use strict";
const TaxValueService = require("../service/tax.value.service");
const BaseController = require("./base.ctrl");
class TaxValueController extends BaseController {
    constructor() {
        super(new TaxValueService());
    }
}
module.exports = TaxValueController;
