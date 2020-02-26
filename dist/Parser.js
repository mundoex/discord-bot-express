"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WordType;
(function (WordType) {
    WordType[WordType["Arg"] = 0] = "Arg";
    WordType[WordType["Args"] = 1] = "Args";
    WordType[WordType["Opt"] = 2] = "Opt";
    WordType[WordType["Opts"] = 3] = "Opts";
    WordType[WordType["Word"] = 4] = "Word";
})(WordType = exports.WordType || (exports.WordType = {}));
class CommandWord {
    constructor(word, type) {
        this.word = word;
        this.type = type;
    }
    static stringToCommandWord(word) {
        if (word.startsWith(CommandWord.ARG_PREFIX)) {
            return word.endsWith(CommandWord.MULTI_SUFFIX) ?
                new CommandWord(word.substring(1, word.length - 1), WordType.Args) :
                new CommandWord(word.substring(1, word.length), WordType.Arg);
        }
        else if (word.startsWith(CommandWord.OPT_PREFIX)) {
            return word.endsWith(CommandWord.MULTI_SUFFIX) ?
                new CommandWord(word.substring(1, word.length - 1), WordType.Opts) :
                new CommandWord(word.substring(1, word.length), WordType.Opt);
        }
        else {
            return new CommandWord(word, WordType.Word);
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
function gen(tokens, cmdWords, params) {
    var params = {};
    if (tokens.length === 0) { //return params when there are no more tokens and didnt return false
        return params;
    }
    else {
        switch (cmdWords[0].type) {
            case WordType.Word:
                if (tokens[0] === cmdWords[0].word) { //if token matches next
                    tokens.pop();
                    cmdWords.pop();
                    return gen(tokens, cmdWords, params);
                }
                else {
                    return false; //else ends
                }
            case WordType.Arg:
                if (tokens[0] !== undefined && tokens[0] !== "") { //if token !invalid assign param to token next
                    params[cmdWords[0].word] = tokens.pop();
                    cmdWords.pop();
                    return gen(tokens, cmdWords, params);
                }
                else {
                    return false; //if token invalid ends
                }
            case WordType.Args:
                if (cmdWords.length === 1) { //args is last param keep pushing tokens into array until tokens empty
                    params[cmdWords[0].word].push(tokens.pop());
                    return gen(tokens, cmdWords, params);
                }
                else { //check ahead if next word matches token
                    if (cmdWords[1].word === tokens[0]) { //if matches
                        if (params[cmdWords[0].word].length > 0) { //check if args is empty if !empty go to next token
                            cmdWords.pop();
                            return gen(tokens, cmdWords, params);
                        }
                        else {
                            return false; //since args is required and is empty end
                        }
                    }
                    else { //args isnt last word push token  into args next
                        params[cmdWords[0].word].push(tokens.pop()); //push token into args
                        return gen(tokens, cmdWords, params);
                    }
                }
            case WordType.Opt:
                if (cmdWords.length > 1) { //check ahead if there is next cmdWord
                    if (cmdWords[1].word !== tokens[0]) { //if next cmdWord doesnt match token
                        params[cmdWords[0].word] = tokens.pop(); //assign param
                        cmdWords.pop();
                        return gen(tokens, cmdWords, params);
                    }
                    else { //if next cmdWord matches token 
                        cmdWords.pop();
                        return gen(tokens, cmdWords, params);
                    }
                }
                else { //if there is no next cmdWord
                    cmdWords.pop();
                    params[cmdWords[0].word] = tokens.pop();
                    return gen(tokens, cmdWords, params);
                }
            case WordType.Opts:
                if (cmdWords.length > 1) { //check ahead if there is next cmdWord
                    if (cmdWords[1].word !== tokens[0]) { //if next cmdWord doesnt match token
                        params[cmdWords[0].word].push(tokens.pop()); //assign param
                        cmdWords.pop();
                        return gen(tokens, cmdWords, params);
                    }
                    else { //if next cmdWord matches token 
                        cmdWords.pop();
                        return gen(tokens, cmdWords, params);
                    }
                }
                else { //if there is no next cmdWord
                    cmdWords.pop();
                    params[cmdWords[0].word].push(tokens.pop());
                    return gen(tokens, cmdWords, params);
                }
        }
    }
}
class CommandInterpreter {
    static interprete() {
    }
    static handle(tokens, cmdWords, params) {
        if (tokens.length === 0) { //return params when there are no more tokens and didnt return false
            return params;
        }
        else {
            switch (cmdWords[0].type) {
                case WordType.Word: return CommandInterpreter.handleWord(tokens, cmdWords, params);
                case WordType.Arg: return CommandInterpreter.handleArg(tokens, cmdWords, params);
                case WordType.Args: return CommandInterpreter.handleArgs(tokens, cmdWords, params);
                case WordType.Opt: return CommandInterpreter.handleOpt(tokens, cmdWords, params);
                case WordType.Opts: return CommandInterpreter.handleOpts(tokens, cmdWords, params);
            }
        }
    }
    static generateParams(cmdWords) {
        var params = {};
        cmdWords.forEach(cmdWord => {
            switch (cmdWord.type) {
                case WordType.Word:
                    break;
                case WordType.Arg:
                    params[cmdWord.word] = "";
                    break;
                case WordType.Opt:
                    params[cmdWord.word] = undefined;
                    break;
                case WordType.Args:
                case WordType.Opts:
                    params[cmdWord.word] = new Array();
                    break;
            }
        });
        return params;
    }
    static handleWord(tokens, cmdWords, params) {
        if (tokens[0] === cmdWords[0].word) { //if token matches next
            tokens.pop();
            cmdWords.pop();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
        else {
            return false; //else ends
        }
    }
    static handleArg(tokens, cmdWords, params) {
        if (tokens[0] !== undefined && tokens[0] !== "") { //if token !invalid assign param to token next
            params[cmdWords[0].word] = tokens.pop();
            cmdWords.pop();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
        else {
            return false; //if token invalid ends
        }
    }
    static handleArgs(tokens, cmdWords, params) {
        if (cmdWords.length === 1) { //args is last param keep pushing tokens into array until tokens empty
            params[cmdWords[0].word].push(tokens.pop());
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
        else { //check ahead if next word matches token
            if (cmdWords[1].word === tokens[0]) { //if matches
                if (params[cmdWords[0].word].length > 0) { //check if args is empty if !empty go to next token
                    cmdWords.pop();
                    return CommandInterpreter.handle(tokens, cmdWords, params);
                }
                else {
                    return false; //since args is required and is empty end
                }
            }
            else { //args isnt last word push token  into args next
                params[cmdWords[0].word].push(tokens.pop()); //push token into args
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
        }
    }
    static handleOpt(tokens, cmdWords, params) {
        if (cmdWords.length > 1) { //check ahead if there is next cmdWord
            if (cmdWords[1].word !== tokens[0]) { //if next cmdWord doesnt match token
                params[cmdWords[0].word] = tokens.pop(); //assign param
                cmdWords.pop();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
            else { //if next cmdWord matches token 
                cmdWords.pop();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
        }
        else { //if there is no next cmdWord
            cmdWords.pop();
            params[cmdWords[0].word] = tokens.pop();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
    }
    static handleOpts(tokens, cmdWords, params) {
        if (cmdWords.length > 1) { //check ahead if there is next cmdWord
            if (cmdWords[1].word !== tokens[0]) { //if next cmdWord doesnt match token
                params[cmdWords[0].word].push(tokens.pop()); //assign param
                cmdWords.pop();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
            else { //if next cmdWord matches token 
                cmdWords.pop();
                return CommandInterpreter.handle(tokens, cmdWords, params);
            }
        }
        else { //if there is no next cmdWord
            cmdWords.pop();
            params[cmdWords[0].word].push(tokens.pop());
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }
    }
}
exports.CommandInterpreter = CommandInterpreter;
