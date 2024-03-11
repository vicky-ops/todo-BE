"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No token, authorization denied'
        });
    }
    try {
        // const decoded = jwt.verify(token, 'jwtSecret') as { user: { id: string } };
        // (req as UserRequest).user = decoded.user; // Attach user information to req object
        // next(); // Call next middleware or route handler
        const decoded = jsonwebtoken_1.default.verify(token, 'jwtSecret');
        req.user = decoded.user;
        next();
    }
    catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
exports.default = auth;
