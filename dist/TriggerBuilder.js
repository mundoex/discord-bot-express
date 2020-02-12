"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TriggerBuilder {
    static StartsWith(word) {
        return new RegExp(`^${word}`).test;
    }
    static EndsWith(word) {
        return new RegExp(`${word}$`).test;
    }
    static Includes(word) {
        return new RegExp('\\b' + word + '\\b').test;
    }
    static Regex(regex) {
        return regex.test;
    }
    static Matches(word) {
        return (commandText) => { return word === commandText; };
    }
}
exports.TriggerBuilder = TriggerBuilder;
