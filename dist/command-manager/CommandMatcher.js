"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandWord_1 = require("./CommandWord");
const WordType_1 = require("./WordType");
const CommandInterpreter_1 = require("./CommandInterpreter");
class CommandMatcher {
    constructor(commandString) {
        this.commandWords = this.initCommandWords(commandString);
        this.params = this.generateParams();
    }
    match(text) {
        var tokens = text.split(CommandWord_1.CommandWord.DELIMITTER);
        return CommandInterpreter_1.CommandInterpreter.handle(tokens, this.commandWords, this.params);
    }
    initCommandWords(commandString) {
        return CommandWord_1.CommandWord.generateCommandWords(commandString.split(CommandWord_1.CommandWord.DELIMITTER));
    }
    generateParams() {
        var params = {};
        this.commandWords.forEach(cmdWord => {
            switch (cmdWord.type) {
                case WordType_1.WordType.Word:
                    break;
                case WordType_1.WordType.Arg:
                    params[cmdWord.word] = undefined;
                    break;
                case WordType_1.WordType.Opt:
                    params[cmdWord.word] = undefined;
                    break;
                case WordType_1.WordType.Args:
                case WordType_1.WordType.Opts:
                    params[cmdWord.word] = new Array();
                    break;
            }
        });
        return params;
    }
}
exports.CommandMatcher = CommandMatcher;
