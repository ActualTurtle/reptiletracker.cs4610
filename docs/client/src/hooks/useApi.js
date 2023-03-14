"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApi = void 0;
const react_1 = require("react");
const api_1 = require("../contexts/api");
const useApi = () => {
    const api = (0, react_1.useContext)(api_1.ApiContext);
    return api;
};
exports.useApi = useApi;
