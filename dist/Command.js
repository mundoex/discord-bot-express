"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCommand_1 = require("./AbstractCommand");
const CommandMatcher_1 = require("./command-matcher/CommandMatcher");
class Command extends AbstractCommand_1.AbstractCommand {
    constructor(commandString, middlewares) {
        super(middlewares);
        this.commandString = commandString;
        this.commandMatcher = new CommandMatcher_1.CommandMatcher(commandString);
        this.params = undefined;
    }
    matches(userInputText) {
        let result = this.commandMatcher.match(userInputText);
        this.params = result;
        return result !== undefined;
    }
    run(msg, client, params) {
        return this.middlewareHandler.handle(msg, client, params, (msg, client, params) => {
            params = this.params;
            return this.runFunction(msg, client, params);
        });
    }
}
exports.Command = Command;
