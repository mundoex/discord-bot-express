import { WordType } from "./WordType";

export class CommandWord{
    type:WordType;
    word:string;

    private static readonly ARG_PREFIX=":";
    private static readonly OPT_PREFIX="?";
    private static readonly MULTI_SUFFIX="*";
    static DELIMITTER=" ";
    
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