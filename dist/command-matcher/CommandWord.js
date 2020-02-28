"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WordType_1 = require("./WordType");
class CommandWord {
    constructor(word, type) {
        this.word = word;
        this.type = type;
    }
    static stringToCommandWord(word) {
        if (word.startsWith(CommandWord.ARG_PREFIX)) {
            return word.endsWith(CommandWord.MULTI_SUFFIX) ?
                new CommandWord(word.substring(1, word.length - 1), WordType_1.WordType.Args) :
                new CommandWord(word.substring(1, word.length), WordType_1.WordType.Arg);
        }
        else if (word.startsWith(CommandWord.OPT_PREFIX)) {
            return word.endsWith(CommandWord.MULTI_SUFFIX) ?
                new CommandWord(word.substring(1, word.length - 1), WordType_1.WordType.Opts) :
                new CommandWord(word.substring(1, word.length), WordType_1.WordType.Opt);
        }
        else {
            return new CommandWord(word, WordType_1.WordType.Word);
        }
    }
    static generateCommandWords(commandTokens) {
        return commandTokens.map(cmdToken => {
            return CommandWord.stringToCommandWord(cmdToken);
        });
    }
}
exports.CommandWord = CommandWord;
CommandWord.ARG_PREFIX = ":";
CommandWord.OPT_PREFIX = "?";
CommandWord.MULTI_SUFFIX = "*";
CommandWord.DELIMITTER = " ";
