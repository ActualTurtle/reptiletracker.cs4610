"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiContext = void 0;
const react_1 = require("react");
const api_1 = require("../lib/api");
exports.ApiContext = (0, react_1.createContext)(new api_1.Api());
