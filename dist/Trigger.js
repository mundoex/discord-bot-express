"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCommand_1 = require("./AbstractCommand");
class Trigger extends AbstractCommand_1.AbstractCommand {
    constructor(triggerMatchingFunction, middlewares) {
        super(middlewares);
        this.triggerMatchingFunction = triggerMatchingFunction;
    }
    matches(parsedCommandText) {
        return this.triggerMatchingFunction(parsedCommandText);
    }
    run(msg, client, params) {
        return this.middlewareHandler.handle(msg, client, params, (msg, client, params) => {
            return this.runFunction(msg, client, params);
        });
    }
}
exports.Trigger = Trigger;
