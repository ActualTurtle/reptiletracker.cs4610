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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api = void 0;
class Api {
    constructor() {
        this.token = "";
    }
    makeRequest(url, method, body = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": "Bearer <your token>" // for token auth
                },
                // credentials: 'include' // for session and cookies
            };
            if (method === 'post' || method === 'put') {
                options.body = JSON.stringify(body);
            }
            const result = yield fetch(url, options);
            return result.json();
        });
    }
    get(url) {
        return this.makeRequest(url, 'get');
    }
    post(url, body) {
        return this.makeRequest(url, 'post', body);
    }
    put(url, body) {
        return this.makeRequest(url, 'put', body);
    }
    del(url) {
        return this.makeRequest(url, 'del');
    }
}
exports.Api = Api;
