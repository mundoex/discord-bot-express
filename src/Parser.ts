export enum WordType{
    Arg,Args,Opt,Opts,Word
}

export class CommandWord{
    type:WordType;
    word:string;

    private static readonly ARG_PREFIX=":";
    private static readonly OPT_PREFIX="?";
    private static readonly MULTI_SUFFIX="*";

    constructor(word:string, type:WordType){
        this.word=word;
        this.type=type;
    }

    private static stringToCommandWord(word:string) : CommandWord{
        if(word.startsWith(CommandWord.ARG_PREFIX)){
            return word.endsWith(CommandWord.MULTI_SUFFIX) ? 
                new CommandWord(word.substring(1,word.length-1), WordType.Args) :
                new CommandWord(word.substring(1,word.length),WordType.Arg);
        }else if(word.startsWith(CommandWord.OPT_PREFIX)){
            return word.endsWith(CommandWord.MULTI_SUFFIX) ? 
                new CommandWord(word.substring(1,word.length-1), WordType.Opts) :
                new CommandWord(word.substring(1,word.length),WordType.Opt);
        }else{
            return new CommandWord(word, WordType.Word);
        }
    }

    static generateCommandWords(commandTokens:Array<string>) : Array<CommandWord>{
        return commandTokens.map(cmdToken=>{
            return CommandWord.stringToCommandWord(cmdToken);
        });
    }
}

function gen(tokens:Array<string>, cmdWords?:Array<CommandWord>, params?:any) : any | boolean{
    var params:any={};
    if(tokens.length===0){  //return params when there are no more tokens and didnt return false
        return params;
    }else{
        switch(cmdWords[0].type){
            case WordType.Word:
                if(tokens[0]===cmdWords[0].word){   //if token matches next
                    tokens.pop();
                    cmdWords.pop();
                    return gen(tokens, cmdWords, params);
                }else{
                    return false;   //else ends
                }

            case WordType.Arg:
                if(tokens[0]!==undefined && tokens[0]!==""){    //if token !invalid assign param to token next
                    params[cmdWords[0].word]=tokens.pop();
                    cmdWords.pop();
                    return gen(tokens,cmdWords,params);
                }else{
                    return false;   //if token invalid ends
                }

            case WordType.Args:
                if(cmdWords.length===1){    //args is last param keep pushing tokens into array until tokens empty
                    params[cmdWords[0].word].push(tokens.pop());
                    return gen(tokens,cmdWords,params);
                }else{  //check ahead if next word matches token
                    if(cmdWords[1].word===tokens[0]){      //if matches
                        if(params[cmdWords[0].word].length>0){  //check if args is empty if !empty go to next token
                            cmdWords.pop();
                            return gen(tokens,cmdWords,params);
                        }else{
                            return false;   //since args is required and is empty end
                        }
                    }else{  //args isnt last word push token  into args next
                        params[cmdWords[0].word].push(tokens.pop());    //push token into args
                        return gen(tokens,cmdWords,params);
                    }
                }
            case WordType.Opt:
                if(cmdWords.length>1){  //check ahead if there is next cmdWord
                    if(cmdWords[1].word!==tokens[0]){   //if next cmdWord doesnt match token
                        params[cmdWords[0].word]=tokens.pop();  //assign param
                        cmdWords.pop();
                        return gen(tokens,cmdWords,params);
                    }else{  //if next cmdWord matches token 
                        cmdWords.pop();
                        return gen(tokens,cmdWords,params);
                    }
                }else{  //if there is no next cmdWord
                    cmdWords.pop();
                    params[cmdWords[0].word]=tokens.pop();
                    return gen(tokens,cmdWords,params);
                }
            case WordType.Opts:
                if(cmdWords.length>1){  //check ahead if there is next cmdWord
                    if(cmdWords[1].word!==tokens[0]){   //if next cmdWord doesnt match token
                        params[cmdWords[0].word].push(tokens.pop());  //assign param
                        cmdWords.pop();
                        return gen(tokens,cmdWords,params);
                    }else{  //if next cmdWord matches token 
                        cmdWords.pop();
                        return gen(tokens,cmdWords,params);
                    }
                }else{  //if there is no next cmdWord
                    cmdWords.pop();
                    params[cmdWords[0].word].push(tokens.pop());
                    return gen(tokens,cmdWords,params);
                }
        }
    }
}

export class CommandInterpreter{

    static interprete(){

    }

    static handle(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any) : any|boolean{
        if(tokens.length===0){  //return params when there are no more tokens and didnt return false
            return params;
        }else{
            switch(cmdWords[0].type){
                case WordType.Word: return CommandInterpreter.handleWord(tokens,cmdWords,params);
                case WordType.Arg: return CommandInterpreter.handleArg(tokens,cmdWords,params);
                case WordType.Args: return CommandInterpreter.handleArgs(tokens,cmdWords,params);
                case WordType.Opt: return CommandInterpreter.handleOpt(tokens,cmdWords,params);
                case WordType.Opts: return CommandInterpreter.handleOpts(tokens,cmdWords,params);
            }
        }
    }

    static generateParams(cmdWords:Array<CommandWord>) : any {
        var params:any={};
        cmdWords.forEach(cmdWord=>{
           switch(cmdWord.type){
                case WordType.Word:
                   break;
                case WordType.Arg:
                    params[cmdWord.word]="";
                    break;
                case WordType.Opt:
                    params[cmdWord.word]=undefined;
                    break;
                case WordType.Args:
                case WordType.Opts:
                    params[cmdWord.word]=new Array<string>();
                    break;
           }
        });
        return params;
    }

    static handleWord(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(tokens[0]===cmdWords[0].word){   //if token matches next
            tokens.pop();
            cmdWords.pop();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }else{
            return false;   //else ends
        }
    }

    static handleArg(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(tokens[0]!==undefined && tokens[0]!==""){    //if token !invalid assign param to token next
            params[cmdWords[0].word]=tokens.pop();
            cmdWords.pop();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }else{
            return false;   //if token invalid ends
        }
    }

    static handleArgs(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(cmdWords.length===1){    //args is last param keep pushing tokens into array until tokens empty
            params[cmdWords[0].word].push(tokens.pop());
            return CommandInterpreter.handle(tokens,cmdWords,params);
        }else{  //check ahead if next word matches token
            if(cmdWords[1].word===tokens[0]){      //if matches
                if(params[cmdWords[0].word].length>0){  //check if args is empty if !empty go to next token
                    cmdWords.pop();
                    return CommandInterpreter.handle(tokens,cmdWords,params);
                }else{
                    return false;   //since args is required and is empty end
                }
            }else{  //args isnt last word push token  into args next
                params[cmdWords[0].word].push(tokens.pop());    //push token into args
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }
        }
    }

    static handleOpt(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(cmdWords.length>1){  //check ahead if there is next cmdWord
            if(cmdWords[1].word!==tokens[0]){   //if next cmdWord doesnt match token
                params[cmdWords[0].word]=tokens.pop();  //assign param
                cmdWords.pop();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }else{  //if next cmdWord matches token 
                cmdWords.pop();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }
        }else{  //if there is no next cmdWord
            cmdWords.pop();
            params[cmdWords[0].word]=tokens.pop();
            return CommandInterpreter.handle(tokens,cmdWords,params);
        }
    }
    
    static handleOpts(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(cmdWords.length>1){  //check ahead if there is next cmdWord
            if(cmdWords[1].word!==tokens[0]){   //if next cmdWord doesnt match token
                params[cmdWords[0].word].push(tokens.pop());  //assign param
                cmdWords.pop();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }else{  //if next cmdWord matches token 
                cmdWords.pop();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }
        }else{  //if there is no next cmdWord
            cmdWords.pop();
            params[cmdWords[0].word].push(tokens.pop());
            return CommandInterpreter.handle(tokens,cmdWords,params);
        }
    }

    
}