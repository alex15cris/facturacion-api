"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const checkJwt = (req, res, next) => {
    //Get the jwt token from the head
    //Try to validate the token and get data
    try {
        let token = req.headers["authorization"];
        if (token)
            token = token.split(' ')[1];
        else {
            res.status(403).send("Not token found");
            return;
        }
        let jwtPayload = jwt.verify(token, process.env.SECRET || '');
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send(error);
        return;
    }
    //The token is valid for 1 hour
    //We want to send a new token on every request
    /*const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, process.env.SECRET||'', {
      expiresIn: "1h"
    });
    res.setHeader("token", newToken);*/
    //Call the next middleware or controller
    next();
};
exports.checkJwt = checkJwt;
