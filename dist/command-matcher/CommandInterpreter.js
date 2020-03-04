"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WordType_1 = require("./WordType");
const CommandWord_1 = require("./CommandWord");
class CommandInterpreter {
    static interprete(commandString, text) {
        var tokens = text.split(CommandInterpreter.DELIMITTER);
        var cmdWords = CommandWord_1.CommandWord.generateCommandWords(commandString.split(CommandInterpreter.DELIMITTER));
        var params = CommandInterpreter.generateParams(cmdWords);
        return CommandInterpreter.handle(tokens, cmdWords, params);
    }
    //Recursive parsing of commands
    static handle(tokens, stack, params) {
        if (tokens.length === 0 && stack.length === 0) { //return params when there are no more tokens and didnt return undefined
            return params;
        }
        else {
            if (stack[0] === undefined) {
                return undefined;
            }
            switch (stack[0].type) {
                case WordType_1.WordType.Word: return CommandInterpreter.handleWord(tokens, stack, params);
                case WordType_1.WordType.Arg: return CommandInterpreter.handleArg(tokens, stack, params);
                case WordType_1.WordType.Args: return CommandInterpreter.handleArgs(tokens, stack, params);
                case WordType_1.WordType.Opt: return CommandInterpreter.handleOpt(tokens, stack, params);
                case WordType_1.WordType.Opts: return CommandInterpreter.handleOpts(tokens, stack, params);
                default: return undefined;
            }
        }
    }
    static generateParams(cmdWords) {
        var params = {};
        cmdWords.forEach(cmdWord => {
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
    static handleWord(tokens, cmdWords, params) {
        if (tokens[0] === cmdWords[0].word && cmdWords[0] !== undefined) { //if token matches next
            tokens.shift();
            cmdWords.shift();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
        else {
            return undefined; //else ends
        }
    }
    static handleArg(tokens, cmdWords, params) {
        if (tokens[0] !== undefined && tokens[0] !== "" && cmdWords[0] !== undefined) { //if token !invalid assign param to token next
            params[cmdWords[0].word] = tokens.shift();
            cmdWords.shift();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
        else {
            return undefined;
        }
    }
    static handleArgs(tokens, cmdWords, params) {
        if (cmdWords.length === 1) { //if is last param put all the other values into params end
            params[cmdWords[0].word] = params[cmdWords[0].word].concat(tokens);
            tokens = [];
            cmdWords = [];
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
        else { //check ahead if next word matches token
            if (tokens[0] === cmdWords[1].word) { //if matches
                if (params[cmdWords[0].word].length > 0) { //check if args is empty if !empty go to next token
                    cmdWords.shift();
                    return CommandInterpreter.handle(tokens, cmdWords, params);
                }
                else {
                    return undefined; //since args is required and is empty end
                }
            }
            else { //args isnt last word push token  into args next
                params[cmdWords[0].word].push(tokens.shift()); //push token into args
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
        }
    }
    static handleOpt(tokens, cmdWords, params) {
        if (cmdWords.length > 1) { //check ahead if there is next cmdWord
            if (cmdWords[1].word !== tokens[0]) { //if next cmdWord doesnt match token
                params[cmdWords[0].word] = tokens.shift(); //assign param
                cmdWords.shift();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
            else { //if next cmdWord matches token
                cmdWords.shift();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
        }
        else { //if there is no next cmdWord
            if (tokens.length === 0) {
                cmdWords.shift();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
            else {
                params[cmdWords[0].word] = tokens.shift();
                cmdWords.shift();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
        }
    }
    static handleOpts(tokens, cmdWords, params) {
        if (cmdWords.length === 1) {
            params[cmdWords[0].word] = params[cmdWords[0].word].concat(tokens);
            tokens = [];
            cmdWords = [];
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
        else {
            if (tokens[0] === cmdWords[1].word) {
                cmdWords.shift();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
            else {
                params[cmdWords[0].word].push(tokens.shift());
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
        }
    }
}
exports.CommandInterpreter = CommandInterpreter;
CommandInterpreter.DELIMITTER = " ";
