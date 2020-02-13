"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TriggerBuilder {
    static StartsWith(word) {
        return (commandText) => { return commandText.startsWith(word); };
    }
    static EndsWith(word) {
        return (commandText) => { return commandText.endsWith(word); };
    }
    static Includes(word) {
        return (commandText) => { return commandText.includes(word); };
    }
    static Regex(regex) {
        return (commandText) => { return commandText.match(regex) !== null; };
    }
    static Matches(word) {
        return (commandText) => { return word === commandText; };
    }
}
exports.TriggerBuilder = TriggerBuilder;
