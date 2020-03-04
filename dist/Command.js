"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCommand_1 = require("./AbstractCommand");
const CommandInterpreter_1 = require("./command-matcher/CommandInterpreter");
class Command extends AbstractCommand_1.AbstractCommand {
    constructor(commandString, middlewares) {
        super(middlewares);
        this.commandString = commandString;
        this.params = undefined;
    }
    matches(userInputText) {
        let result = CommandInterpreter_1.CommandInterpreter.interprete(this.commandString, userInputText);
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
