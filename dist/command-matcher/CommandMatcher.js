"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandInterpreter_1 = require("./CommandInterpreter");
class CommandMatcher {
    constructor(commandString) {
        this.commandString = commandString;
    }
    match(userInput) {
        return CommandInterpreter_1.CommandInterpreter.interprete(this.commandString, userInput);
    }
}
exports.CommandMatcher = CommandMatcher;
