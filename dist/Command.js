"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_to_regexp_1 = require("path-to-regexp");
const AbstractCommand_1 = require("./AbstractCommand");
const utils_1 = require("./utils");
class Command extends AbstractCommand_1.AbstractCommand {
    constructor(commandString, commandFunction) {
        super(commandFunction);
        needsReplace(commandString) ? this.commandString = utils_1.replaceSpacesWithSlashes(commandString) : this.commandString = commandString;
        this.matchFunction = path_to_regexp_1.match(this.commandString);
        this.params = undefined;
    }
    matches(commandText) {
        let result = this.matchFunction(commandText);
        result !== false ? this.params = result.params : this.params = undefined;
        return this.params !== undefined;
    }
    run(msg, client) {
        return this.runFunction(msg, client, this.params);
    }
}
exports.Command = Command;
function needsReplace(commandText) {
    return commandText.includes(" ");
}
