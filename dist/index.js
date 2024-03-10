"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const mongoURI = 'mongodb+srv://workmailvicky101:98nGHKRCzaQBjmtv@cluster0.5qhuqwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose_1.default
    .connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
app.get('/', (req, res) => {
    return res.status(200).send("working");
});
app.use('/api/users', userRoutes_1.default);
app.use('/api/todos', todoRoutes_1.default);
const PORT = process.env.PORT || 5008;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
