import { WordType } from "./WordType";
import { CommandWord } from "./CommandWord";

export class CommandInterpreter{
    static DELIMITTER=" ";

    static interprete(commandString:string, text:string){
        var tokens:Array<string>=text.split(CommandInterpreter.DELIMITTER);
        var cmdWords:Array<CommandWord>=CommandWord.generateCommandWords(commandString.split(CommandInterpreter.DELIMITTER));
        var params:any=CommandInterpreter.generateParams(cmdWords);
        return CommandInterpreter.handle(tokens,cmdWords,params);
    }
    //Recursive parsing of commands
    private static handle(tokens:Array<string>, stack:Array<CommandWord>, params:any) : any{
        if(tokens.length===0 && stack.length===0){  //return params when there are no more tokens and didnt return undefined
            return params;
        }else{
            if(stack[0]===undefined){ return undefined;}
            switch(stack[0].type){
                case WordType.Word: return CommandInterpreter.handleWord(tokens, stack, params);
                case WordType.Arg: return CommandInterpreter.handleArg(tokens, stack, params);
                case WordType.Args: return CommandInterpreter.handleArgs(tokens, stack, params);
                case WordType.Opt: return CommandInterpreter.handleOpt(tokens, stack, params);
                case WordType.Opts: return CommandInterpreter.handleOpts(tokens, stack, params);
                default : return undefined;
            }
        }
    }

    private static generateParams(cmdWords:Array<CommandWord>) : any {
        var params:any={};
        cmdWords.forEach(cmdWord=>{
           switch(cmdWord.type){
                case WordType.Word:
                   break;
                case WordType.Arg:
                    params[cmdWord.word]=undefined;
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

    private static handleWord(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(tokens[0]===cmdWords[0].word && cmdWords[0]!==undefined){   //if token matches next
            tokens.shift();
            cmdWords.shift();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }else{
            return undefined;   //else ends
        }
    }

    private static handleArg(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(tokens[0]!==undefined && tokens[0]!=="" && cmdWords[0]!==undefined){    //if token !invalid assign param to token next
            params[cmdWords[0].word]=tokens.shift();
            cmdWords.shift();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }else{
            return undefined;
        }
    }

    private static handleArgs(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(cmdWords.length===1){    //if is last param put all the other values into params end
            params[cmdWords[0].word]=params[cmdWords[0].word].concat(tokens);
            tokens=[];
            cmdWords=[];
            return CommandInterpreter.handle(tokens,cmdWords,params);
        }else{  //check ahead if next word matches token
            if(tokens[0]===cmdWords[1].word){    //if matches
                if(params[cmdWords[0].word].length>0){  //check if args is empty if !empty go to next token
                    cmdWords.shift();
                    return CommandInterpreter.handle(tokens,cmdWords,params);
                }else{
                    return undefined;   //since args is required and is empty end
                }
            }else{  //args isnt last word push token  into args next
                params[cmdWords[0].word].push(tokens.shift());    //push token into args
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }
        }
    }

    private static handleOpt(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(cmdWords.length>1){  //check ahead if there is next cmdWord
            if(cmdWords[1].word!==tokens[0]){   //if next cmdWord doesnt match token
                params[cmdWords[0].word]=tokens.shift();  //assign param
                cmdWords.shift();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }else{  //if next cmdWord matches token
                cmdWords.shift();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }
        }else{  //if there is no next cmdWord
            if(tokens.length===0){
                cmdWords.shift();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }else{
                params[cmdWords[0].word]=tokens.shift();
                cmdWords.shift();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }
        }
    }
    
    private static handleOpts(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(cmdWords.length===1){
            params[cmdWords[0].word]=params[cmdWords[0].word].concat(tokens);
            tokens=[];
            cmdWords=[];
            return CommandInterpreter.handle(tokens,cmdWords,params);
        }else{
            if(tokens[0]===cmdWords[1].word){
                cmdWords.shift();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }else{
                params[cmdWords[0].word].push(tokens.shift());
            return CommandInterpreter.handle(tokens,cmdWords,params);
            }
        }
    }
}