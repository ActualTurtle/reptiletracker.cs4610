"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const express_1 = __importDefault(require("express"));
const controller = (name, routes) => (app, client) => {
    const router = express_1.default.Router();
    routes.forEach(route => {
        // if (!route.skipAuth) {                             !!! UNCOMMENT TO RENABLE AUTH
        //   router.use(route.path, (req, res, next) => {
        //     if (req.method.toLowerCase() === route.method) {
        //       authenticationMiddleware(req, res, next);
        //     } else {
        //       next();
        //     }
        //   });
        // }
        router[route.method](route.path, route.endpointBuilder(client));
    });
    app.use(`/${name}`, router);
};
exports.controller = controller;
