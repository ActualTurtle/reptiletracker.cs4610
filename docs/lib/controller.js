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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.controller = void 0;
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../middleware/authentication");
const controller = (name, routes) => (app, client) => {
    const router = express_1.default.Router();
    routes.forEach(route => {
        if (!route.skipAuth) {
            router.use(route.path, (req, res, next) => {
                if (req.method.toLowerCase() === route.method) {
                    (0, authentication_1.authenticationMiddleware)(req, res, next);
                }
                else {
                    next();
                }
            });
        }
        router[route.method](route.path, route.endpointBuilder(client));
    });
    app.use(`/${name}`, router);
};
exports.controller = controller;
/**
 * helper function for getting the user before doing anything else. Could go in a middleware, but I couldn't quite figure that out, so this is the next best thing.
 */
function getUser(req, client) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userId = (_a = req.jwtBody) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("UserId: " + userId);
        if (userId == undefined) {
            return undefined;
        }
        const user = yield client.user.findFirst({
            where: {
                id: userId
            }
        });
        console.log(user);
        return user;
    });
}
exports.getUser = getUser;
