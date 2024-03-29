"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuilder = void 0;
class CommandBuilder {
    static Arg(argName) {
        return `:${argName}`;
    }
    static Args(argsName) {
        return `:${argsName}*`;
    }
    static Optional(optName) {
        return `?${optName}`;
    }
    static Optionals(optName) {
        return `?${optName}*`;
    }
}
exports.CommandBuilder = CommandBuilder;
