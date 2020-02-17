"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MiddlewareHandler_1 = require("./middlewares/MiddlewareHandler");
class AbstractCommand {
    constructor(middlewares) {
        this.runFunction = middlewares.pop();
        this.middlewareHandler = new MiddlewareHandler_1.MiddlewareHandler();
        middlewares.forEach(middleware => this.middlewareHandler.use(middleware));
    }
}
exports.AbstractCommand = AbstractCommand;
