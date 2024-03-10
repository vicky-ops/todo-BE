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
const Todo_1 = __importDefault(require("../models/Todo"));
const auth_1 = __importDefault(require("../middleware/auth"));
const router = express_1.default.Router();
// Addign todo
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newTodo = new Todo_1.default({
            title,
            user: req.body.user.id
        });
        const todo = yield newTodo.save();
        res.json(todo);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}));
// Update todo
router.put("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, completed } = req.body;
    try {
        let todo = yield Todo_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({
                msg: 'Todo not found'
            });
        }
        if (todo.user.toString() !== req.body.user.id) {
            return res.status(401).json({
                msg: 'Not Authorized'
            });
        }
        todo.title = title;
        todo.completed = completed;
        yield todo.save();
        res.json(todo);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}));
// Delete Todo
router.delete("/:id", auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let todo = yield Todo_1.default.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }
        if (todo.user.toString() !== req.body.user.id) {
            return res.status(401).json({ msg: 'Not Autorized' });
        }
        yield todo.deleteOne();
        res.json({ msg: 'Todo removed' });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}));
// get all the todos mapped to the authenticated user
router.get('/user', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get the userid f
        const userId = req.user.id;
        //Retive todos that are mapped to the user
        const todos = yield Todo_1.default.find({ user: userId });
        // if no tods found
        if (!todos || todos.length === 0) {
            return res.status(404).json({ msg: "No todos found for the user" });
        }
        res.json(todos);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}));
exports.default = router;
