"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
class CommandBuilder {
    static Arg(argName) {
        return `:${argName}`;
    }
    static Args(argsName) {
        return `:${argsName}(.*)`;
    }
    static Optional(optName) {
        return `:${optName}?`;
    }
}
exports.CommandBuilder = CommandBuilder;
function Build(commandText) {
    return utils_1.replaceSpacesWithSlashes(commandText);
}
exports.Build = Build;
