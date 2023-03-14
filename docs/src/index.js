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
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_controller_1 = require("./controllers/users_controller");
const reptiles_controller_1 = require("./controllers/reptiles_controller");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const client = new client_1.PrismaClient();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// log in
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield client.user.findFirst({
        where: {
            email,
        }
    });
    if (!user) {
        res.status(404).json({ message: "Invalid email or password" });
        return;
    }
    const isValid = yield bcrypt_1.default.compare(password, user.passwordHash);
    if (!isValid) {
        res.status(404).json({ message: "Invalid email or password" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({
        userId: user.id
    }, process.env.ENCRYPTION_KEY, {
        expiresIn: '10m'
    });
    res.json({
        user,
        token
    });
}));
(0, users_controller_1.usersController)(app, client); // "/user/"
(0, reptiles_controller_1.reptileController)(app, client); // "/reptile/"
app.get('/', (req, res) => {
    res.send('BUILD REPTILE TRACKER HERE');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
exports.default = app;
