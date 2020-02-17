"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = require("path-to-regexp");
const AbstractCommand_1 = require("./AbstractCommand");
const Middlewarehandler_1 = require("./tests/Middlewarehandler");
class Command extends AbstractCommand_1.AbstractCommand {
    /*
    Pops the last element of the middlewares
    The last element is the function that is going to be the runFunction
    Adds the remaining functions that are the actual middlewares to the middlewares handler
    */
    constructor(commandString, middlewares) {
        super(middlewares.pop());
        this.commandString = commandString;
        this.matchFunction = path_to_regexp_1.match(this.commandString);
        this.params = undefined;
        this.description = "";
        this.middlewareHandler = new Middlewarehandler_1.MiddlewareHandler();
        middlewares.forEach(middleware => this.middlewareHandler.use(middleware));
    }
    matches(msg, parsedCommandText) {
        let result = this.matchFunction(parsedCommandText);
        result !== false && !msg.author.bot ? this.params = result.params : this.params = undefined;
        return this.params !== undefined;
    }
    run(msg, client, params) {
        return this.middlewareHandler.handle(msg, client, params, (msg, client, params) => {
            params = this.params;
            return this.runFunction(msg, client, params);
        });
    }
    setDescription(description) {
        this.description = description;
    }
}
exports.Command = Command;
function needsReplace(commandText) {
    return commandText.includes(" ");
}
