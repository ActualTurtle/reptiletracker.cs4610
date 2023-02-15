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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const client = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
// TODO: This is a test POST request, needs changing
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client.user.create({
        data: {
            firstName: "Test",
            lastName: "User",
            email: "testuser@email.com",
            passwordHash: "password",
        }
    });
    res.json({ user });
}));
app.get('/', (req, res) => {
    res.send('BUILD REPTILE TRACKER HERE');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
