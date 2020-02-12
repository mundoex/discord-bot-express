"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractCommand_1 = require("./AbstractCommand");
class Trigger extends AbstractCommand_1.AbstractCommand {
    constructor(triggerMatchingFunction, triggerFunction) {
        super(triggerFunction);
        this.triggerMatchingFunction = triggerMatchingFunction;
    }
    matches(commandText) {
        return this.triggerMatchingFunction(commandText);
    }
    run(msg, client) {
        return this.runFunction(msg, client);
    }
}
exports.Trigger = Trigger;
