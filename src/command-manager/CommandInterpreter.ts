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
    static handle(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any) : any{
        if(tokens.length===0){  //return params when there are no more tokens and didnt return undefined
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
        if(tokens[0]===cmdWords[0].word){   //if token matches next
            tokens.shift();
            cmdWords.shift();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }else{
            return undefined;   //else ends
        }
    }

    private static handleArg(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(tokens[0]!==undefined && tokens[0]!==""){    //if token !invalid assign param to token next
            params[cmdWords[0].word]=tokens.shift();
            cmdWords.shift();
            return CommandInterpreter.handle(tokens, cmdWords, params);
        }else{
            return undefined;   //if token invalid ends
        }
    }

    private static handleArgs(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(cmdWords.length===1){    //args is last param keep pushing tokens into array until tokens empty
            params[cmdWords[0].word].push(tokens.shift());
            return CommandInterpreter.handle(tokens,cmdWords,params);
        }else{  //check ahead if next word matches token
            if(cmdWords[1].word===tokens[0]){      //if matches
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
            params[cmdWords[0].word]=tokens.shift();
            cmdWords.shift();
            return CommandInterpreter.handle(tokens,cmdWords,params);
        }
    }
    
    private static handleOpts(tokens:Array<string>, cmdWords:Array<CommandWord>, params:any){
        if(cmdWords.length>1){  //check ahead if there is next cmdWord
            if(cmdWords[1].word!==tokens[0]){   //if next cmdWord doesnt match token
                params[cmdWords[0].word].push(tokens.shift());  //assign param
                cmdWords.shift();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }else{  //if next cmdWord matches token 
                cmdWords.shift();
                return CommandInterpreter.handle(tokens,cmdWords,params);
            }
        }else{  //if there is no next cmdWord
            params[cmdWords[0].word].push(tokens.shift());
            return CommandInterpreter.handle(tokens,cmdWords,params);
        }
    }
}