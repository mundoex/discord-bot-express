"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MiddlewareHandler_1 = require("./middlewares/MiddlewareHandler");
class AbstractCommand {
    /*
        Pops the last element of the middlewares
        The last element is the function that is going to be the runFunction
        Adds the remaining functions that are the actual middlewares to the middlewares handler
    */
    constructor(middlewares) {
        this.runFunction = middlewares.pop();
        this.middlewareHandler = new MiddlewareHandler_1.MiddlewareHandler();
        middlewares.forEach(middleware => this.middlewareHandler.use(middleware));
        this.description = "";
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setUsage(usage) {
        this.usage = usage;
        return this;
    }
}
exports.AbstractCommand = AbstractCommand;
