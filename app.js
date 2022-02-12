"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//librerias externas
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
//configuraciones
const log4js_1 = require("log4js");
const dotenv_1 = require("dotenv");
const check_jwt_1 = require("./controller/check-jwt");
//rutas
const auth_route_1 = require("./routes/auth.route");
const user_route_1 = require("./routes/user.route");
const admin_route_1 = require("./routes/admin.route");
const establishment_route_1 = require("./routes/establishment.route");
const product_route_1 = require("./routes/product.route");
const customer_route_1 = require("./routes/customer.route");
const invoice_route_1 = require("./routes/invoice.route");
const report_route_1 = require("./routes/report.route");
const product_category_route_1 = require("./routes/product.category.route");
const tax_value_route_1 = require("./routes/tax.value.route");
class App {
    //inicializa los métodos
    constructor() {
        this.app = (0, express_1.default)();
        this.setConfig();
        this.setMongoConfig(); //conecta a la base de datos
        this.routes();
    }
    routes() {
        // Rutas con autenticacion de token
        this.app.use("/auth", new auth_route_1.AuthRoutes().router);
        this.app.use("/api/user", [check_jwt_1.checkJwt], new user_route_1.UserRoutes().router);
        this.app.use("/api/establishment", [check_jwt_1.checkJwt], new establishment_route_1.EstablishmentRoutes().router);
        this.app.use("/api/admin", [check_jwt_1.checkJwt], new admin_route_1.AdminRoutes().router);
        this.app.use("/api/product", [check_jwt_1.checkJwt], new product_route_1.ProductRoutes().router);
        this.app.use("/api/product-category", [check_jwt_1.checkJwt], new product_category_route_1.ProductCategoryRoutes().router);
        this.app.use("/api/tax-value", [check_jwt_1.checkJwt], new tax_value_route_1.TaxValueRoutes().router);
        this.app.use("/api/customer", [check_jwt_1.checkJwt], new customer_route_1.CustomerRoutes().router);
        this.app.use("/api/invoice", [check_jwt_1.checkJwt], new invoice_route_1.InvoiceRoutes().router);
        this.app.use("/api/report", new report_route_1.ReportRoutes().router);
    }
    setConfig() {
        //inicializacion del log
        (0, log4js_1.configure)(__dirname + '/config/log4js.json');
        //configura las variabes de entorno con respecto a la base de datos
        (0, dotenv_1.config)({ path: '.env' });
        //limita las peticiones a 50mb
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        //habilita el cors(puertos)
        this.app.use((0, cors_1.default)());
        //Seteo de la cabecera de respuesta
        this.app.use((req, res, next) => {
            //Configura las cabeceras de la app
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, UPDATE, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
            res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
            next();
        });
    }
    //Conexión a MongoDB database
    setMongoConfig() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(process.env.DATABASE || '', {});
    }
}
exports.default = new App().app;
