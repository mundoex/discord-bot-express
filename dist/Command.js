"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = require("path-to-regexp");
const AbstractCommand_1 = require("./AbstractCommand");
class Command extends AbstractCommand_1.AbstractCommand {
    constructor(commandString, commandFunction) {
        super(commandFunction);
        this.commandString = commandString;
        this.params = undefined;
    }
    matches(commandText) {
        const matchFunction = path_to_regexp_1.match(this.commandString);
        let result = matchFunction(commandText);
        result !== false ? this.params = result.params : this.params = undefined;
        return this.params !== undefined;
    }
    run(msg, client) {
        return this.runFunction(msg, client, this.params);
    }
}
exports.Command = Command;
